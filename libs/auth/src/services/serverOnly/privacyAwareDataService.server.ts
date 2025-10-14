import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  updateDoc,
  DocumentData,
  QueryConstraint,
  Timestamp,
  DocumentSnapshot
} from 'firebase/firestore';
import { getHubFirestore } from '../../../../firebase-config/src/index';
import { gdprService, ConsentType } from './gdprService.server';
import { authLogger, AuthEventType } from '../authLogger';

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  dataSharing: {
    analytics: boolean;
    personalizedAds: boolean;
    thirdPartyApps: boolean;
  };
  activityVisibility: {
    expenses: 'everyone' | 'friends' | 'only-me';
    groups: 'everyone' | 'friends' | 'only-me';
    settlements: 'everyone' | 'friends' | 'only-me';
    profile: 'everyone' | 'friends' | 'only-me';
  };
  blockedUsers: string[];
  trustedUsers: string[];
}

export interface PrivacyFilter {
  viewerId: string;
  targetUserId: string;
  dataType: keyof PrivacySettings['activityVisibility'];
  relationship?: 'friend' | 'stranger' | 'blocked';
}

export interface DataAccessLog {
  id: string;
  viewerId: string;
  targetUserId: string;
  dataType: string;
  accessLevel: string;
  timestamp: Timestamp;
  appId?: string;
  metadata?: Record<string, any>;
}

export class PrivacyAwareDataService {
  private static instance: PrivacyAwareDataService;

  private constructor() {}

  static getInstance(): PrivacyAwareDataService {
    if (!PrivacyAwareDataService.instance) {
      PrivacyAwareDataService.instance = new PrivacyAwareDataService();
    }
    return PrivacyAwareDataService.instance;
  }

  /**
   * Get user's privacy settings
   */
  async getUserPrivacySettings(userId: string): Promise<PrivacySettings> {
    const db = getHubFirestore();
    const settingsDoc = await getDocs(
      query(collection(db, 'privacySettings'), where('userId', '==', userId))
    );

    if (settingsDoc.empty) {
      // Return default privacy settings
      return this.getDefaultPrivacySettings();
    }

    return settingsDoc.docs[0].data() as PrivacySettings;
  }

  /**
   * Update user's privacy settings
   */
  async updatePrivacySettings(
    userId: string, 
    settings: Partial<PrivacySettings>
  ): Promise<void> {
    const db = getHubFirestore();
    const settingsRef = collection(db, 'privacySettings');
    
    // Check if settings exist
    const existingQuery = query(settingsRef, where('userId', '==', userId));
    const existing = await getDocs(existingQuery);

    if (existing.empty) {
      // Create new settings
      await addDoc(settingsRef, {
        userId,
        ...this.getDefaultPrivacySettings(),
        ...settings,
        updatedAt: Timestamp.now()
      });
    } else {
      // Update existing settings
      await updateDoc(existing.docs[0].ref, {
        ...settings,
        updatedAt: Timestamp.now()
      });
    }

    // Log the privacy settings update
    authLogger.logSessionEvent(AuthEventType.PRIVACY_SETTINGS_UPDATED, userId, {
      changes: Object.keys(settings)
    });
  }

  /**
   * Check if viewer can access target user's data
   */
  async canViewData(filter: PrivacyFilter): Promise<boolean> {
    // Self can always view own data
    if (filter.viewerId === filter.targetUserId) {
      return true;
    }

    // Get target user's privacy settings
    const settings = await this.getUserPrivacySettings(filter.targetUserId);

    // Check if viewer is blocked
    if (settings.blockedUsers.includes(filter.viewerId)) {
      return false;
    }

    // Check visibility settings for the data type
    const visibility = settings.activityVisibility[filter.dataType];

    switch (visibility) {
      case 'everyone':
        return true;
      case 'friends':
        return filter.relationship === 'friend';
      case 'only-me':
        return false;
      default:
        return false;
    }
  }

  /**
   * Apply privacy filters to a query
   */
  async applyPrivacyFilters(
    baseQuery: QueryConstraint[],
    viewerId: string,
    dataType: keyof PrivacySettings['activityVisibility']
  ): Promise<QueryConstraint[]> {
    // Get viewer's relationships
    const friendIds = await this.getUserFriends(viewerId);
    const trustedByIds = await this.getTrustedByUsers(viewerId);

    // Build privacy-aware constraints
    const privacyConstraints: QueryConstraint[] = [
      ...baseQuery,
      // Include data where viewer is the owner
      where('userId', '==', viewerId),
      // Or where data is public
      where('privacy.visibility', '==', 'everyone'),
      // Or where viewer is in allowed list
      where('privacy.allowedUsers', 'array-contains', viewerId),
      // Or where data is friends-only and viewer is a friend
      ...(friendIds.length > 0 ? [
        where('privacy.visibility', '==', 'friends'),
        where('userId', 'in', friendIds)
      ] : [])
    ];

    return privacyConstraints;
  }

  /**
   * Log data access for audit purposes
   */
  async logDataAccess(
    viewerId: string,
    targetUserId: string,
    dataType: string,
    accessLevel: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const db = getHubFirestore();
    const logEntry: DataAccessLog = {
      id: `${viewerId}_${targetUserId}_${Date.now()}`,
      viewerId,
      targetUserId,
      dataType,
      accessLevel,
      timestamp: Timestamp.now(),
      metadata
    };

    await addDoc(collection(db, 'dataAccessLogs'), logEntry);

    // Also log to auth logger
    authLogger.logSessionEvent(AuthEventType.DATA_ACCESS, viewerId, {
      targetUserId,
      dataType,
      accessLevel
    });
  }

  /**
   * Filter query results based on privacy settings
   */
  async filterResults<T extends DocumentData>(
    results: T[],
    viewerId: string,
    dataType: keyof PrivacySettings['activityVisibility']
  ): Promise<T[]> {
    const filteredResults: T[] = [];

    for (const result of results) {
      const targetUserId = result.userId || result.ownerId;
      
      if (!targetUserId) {
        // If no owner, include the result
        filteredResults.push(result);
        continue;
      }

      const canView = await this.canViewData({
        viewerId,
        targetUserId,
        dataType,
        relationship: await this.getRelationship(viewerId, targetUserId)
      });

      if (canView) {
        // Check consent for analytics/tracking
        const consent = await gdprService.getUserConsent(targetUserId);
        
        // Remove sensitive data if no consent
        if (!consent[ConsentType.ANALYTICS]) {
          delete result.analyticsData;
        }
        if (!consent[ConsentType.PERSONALIZATION]) {
          delete result.personalData;
        }

        filteredResults.push(result);

        // Log the access
        await this.logDataAccess(
          viewerId,
          targetUserId,
          dataType,
          'granted',
          { resultId: result.id }
        );
      } else {
        // Log denied access
        await this.logDataAccess(
          viewerId,
          targetUserId,
          dataType,
          'denied'
        );
      }
    }

    return filteredResults;
  }

  /**
   * Get user's friends list
   */
  private async getUserFriends(userId: string): Promise<string[]> {
    const db = getHubFirestore();
    const friendshipsQuery = query(
      collection(db, 'friendships'),
      where('users', 'array-contains', userId),
      where('status', '==', 'accepted')
    );
    
    const snapshot = await getDocs(friendshipsQuery);
    const friends: string[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const friendId = data.users.find((id: string) => id !== userId);
      if (friendId) {
        friends.push(friendId);
      }
    });

    return friends;
  }

  /**
   * Get users who trust the viewer
   */
  private async getTrustedByUsers(viewerId: string): Promise<string[]> {
    const db = getHubFirestore();
    const settingsQuery = query(
      collection(db, 'privacySettings'),
      where('trustedUsers', 'array-contains', viewerId)
    );

    const snapshot = await getDocs(settingsQuery);
    return snapshot.docs.map(doc => doc.data().userId);
  }

  /**
   * Get relationship between two users
   */
  private async getRelationship(
    userId1: string, 
    userId2: string
  ): Promise<'friend' | 'stranger' | 'blocked'> {
    const [settings, friends] = await Promise.all([
      this.getUserPrivacySettings(userId1),
      this.getUserFriends(userId1)
    ]);

    if (settings.blockedUsers.includes(userId2)) {
      return 'blocked';
    }

    if (friends.includes(userId2)) {
      return 'friend';
    }

    return 'stranger';
  }

  /**
   * Get default privacy settings
   */
  private getDefaultPrivacySettings(): PrivacySettings {
    return {
      profileVisibility: 'friends',
      dataSharing: {
        analytics: false,
        personalizedAds: false,
        thirdPartyApps: false
      },
      activityVisibility: {
        expenses: 'friends',
        groups: 'friends',
        settlements: 'friends',
        profile: 'friends'
      },
      blockedUsers: [],
      trustedUsers: []
    };
  }

  /**
   * Anonymize data based on privacy settings
   */
  async anonymizeData<T extends DocumentData>(
    data: T,
    viewerId: string,
    ownerId: string
  ): Promise<T> {
    if (viewerId === ownerId) {
      return data; // No anonymization for own data
    }

    const canView = await this.canViewData({
      viewerId,
      targetUserId: ownerId,
      dataType: 'profile',
      relationship: await this.getRelationship(viewerId, ownerId)
    });

    if (!canView) {
      // Anonymize personal information
      const anonymized: any = { ...data };
      
      // Replace personal info with anonymized versions
      if ('displayName' in anonymized && anonymized.displayName) {
        anonymized.displayName = 'Anonymous User';
      }
      if ('email' in anonymized && anonymized.email) {
        anonymized.email = 'hidden@example.com';
      }
      if ('photoURL' in anonymized) {
        delete anonymized.photoURL;
      }
      if ('phoneNumber' in anonymized) {
        delete anonymized.phoneNumber;
      }

      return anonymized as T;
    }

    return data;
  }
}

export const privacyAwareDataService = PrivacyAwareDataService.getInstance();