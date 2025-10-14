import { getHubFirestore } from '../../../../firebase-config/src/index';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';

export interface ConsentRecord {
  userId: string;
  consentId: string;
  type: ConsentType;
  granted: boolean;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  version: string;
}

export enum ConsentType {
  NECESSARY = 'necessary',
  FUNCTIONAL = 'functional',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  PERSONALIZATION = 'personalization'
}

export interface PrivacyPreferences {
  userId: string;
  dataCollection: boolean;
  dataSharing: boolean;
  emailMarketing: boolean;
  pushNotifications: boolean;
  activityTracking: boolean;
  thirdPartyIntegrations: boolean;
  updatedAt: Timestamp;
}

export interface DataProcessingActivity {
  id: string;
  purpose: string;
  legalBasis: string;
  dataCategories: string[];
  recipients: string[];
  retentionPeriod: string;
  safeguards: string[];
}

export class GDPRService {
  private static instance: GDPRService;
  private readonly consentVersion = '1.0.0';

  private constructor() {}

  static getInstance(): GDPRService {
    if (!GDPRService.instance) {
      GDPRService.instance = new GDPRService();
    }
    return GDPRService.instance;
  }

  /**
   * Record user consent
   */
  async recordConsent(
    userId: string,
    consentType: ConsentType,
    granted: boolean,
    metadata?: {
      ipAddress?: string;
      userAgent?: string;
    }
  ): Promise<void> {
    const db = getHubFirestore();
    const consentId = `${userId}_${consentType}_${Date.now()}`;
    
    const consentRecord: ConsentRecord = {
      userId,
      consentId,
      type: consentType,
      granted,
      timestamp: Timestamp.now(),
      version: this.consentVersion,
      ...metadata
    };

    await setDoc(
      doc(db, 'gdprConsents', consentId),
      consentRecord
    );

    // Update user's current consent status
    await this.updateCurrentConsent(userId, consentType, granted);
  }

  /**
   * Update current consent status
   */
  private async updateCurrentConsent(
    userId: string,
    consentType: ConsentType,
    granted: boolean
  ): Promise<void> {
    const db = getHubFirestore();
    const userConsentRef = doc(db, 'userConsents', userId);
    
    const existing = await getDoc(userConsentRef);
    
    if (existing.exists()) {
      await updateDoc(userConsentRef, {
        [consentType]: granted,
        lastUpdated: Timestamp.now()
      });
    } else {
      await setDoc(userConsentRef, {
        userId,
        [consentType]: granted,
        lastUpdated: Timestamp.now()
      });
    }
  }

  /**
   * Get user's current consent status
   */
  async getUserConsent(userId: string): Promise<Record<ConsentType, boolean>> {
    const db = getHubFirestore();
    const userConsentDoc = await getDoc(doc(db, 'userConsents', userId));
    
    if (!userConsentDoc.exists()) {
      // Return default consents (only necessary is true by default)
      return {
        [ConsentType.NECESSARY]: true,
        [ConsentType.FUNCTIONAL]: false,
        [ConsentType.ANALYTICS]: false,
        [ConsentType.MARKETING]: false,
        [ConsentType.PERSONALIZATION]: false
      };
    }
    
    const data = userConsentDoc.data();
    return {
      [ConsentType.NECESSARY]: true, // Always true
      [ConsentType.FUNCTIONAL]: data[ConsentType.FUNCTIONAL] || false,
      [ConsentType.ANALYTICS]: data[ConsentType.ANALYTICS] || false,
      [ConsentType.MARKETING]: data[ConsentType.MARKETING] || false,
      [ConsentType.PERSONALIZATION]: data[ConsentType.PERSONALIZATION] || false
    };
  }

  /**
   * Get consent history
   */
  async getConsentHistory(userId: string): Promise<ConsentRecord[]> {
    const db = getHubFirestore();
    const consentsQuery = query(
      collection(db, 'gdprConsents'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(consentsQuery);
    return snapshot.docs.map(doc => doc.data() as ConsentRecord);
  }

  /**
   * Update privacy preferences
   */
  async updatePrivacyPreferences(
    userId: string,
    preferences: Partial<PrivacyPreferences>
  ): Promise<void> {
    const db = getHubFirestore();
    const preferencesRef = doc(db, 'privacyPreferences', userId);
    
    await setDoc(preferencesRef, {
      ...preferences,
      userId,
      updatedAt: Timestamp.now()
    }, { merge: true });
  }

  /**
   * Get privacy preferences
   */
  async getPrivacyPreferences(userId: string): Promise<PrivacyPreferences> {
    const db = getHubFirestore();
    const preferencesDoc = await getDoc(doc(db, 'privacyPreferences', userId));
    
    if (!preferencesDoc.exists()) {
      // Return default preferences
      return {
        userId,
        dataCollection: true,
        dataSharing: false,
        emailMarketing: false,
        pushNotifications: true,
        activityTracking: true,
        thirdPartyIntegrations: false,
        updatedAt: Timestamp.now()
      };
    }
    
    return preferencesDoc.data() as PrivacyPreferences;
  }

  /**
   * Request data deletion (Right to Erasure)
   */
  async requestDataDeletion(
    userId: string,
    reason?: string,
    metadata?: Record<string, any>
  ): Promise<string> {
    const db = getHubFirestore();
    const requestId = `deletion_${userId}_${Date.now()}`;
    
    await setDoc(doc(db, 'dataRequests', requestId), {
      id: requestId,
      type: 'deletion',
      userId,
      reason,
      status: 'pending',
      requestedAt: Timestamp.now(),
      metadata
    });
    
    // TODO: Implement actual deletion logic
    // This would typically trigger a backend process
    
    return requestId;
  }

  /**
   * Request data portability
   */
  async requestDataPortability(
    userId: string,
    format: 'json' | 'csv',
    metadata?: Record<string, any>
  ): Promise<string> {
    const db = getHubFirestore();
    const requestId = `portability_${userId}_${Date.now()}`;
    
    await setDoc(doc(db, 'dataRequests', requestId), {
      id: requestId,
      type: 'portability',
      userId,
      format,
      status: 'pending',
      requestedAt: Timestamp.now(),
      metadata
    });
    
    return requestId;
  }

  /**
   * Get data processing activities
   */
  async getDataProcessingActivities(): Promise<DataProcessingActivity[]> {
    // This would typically be stored in a configuration
    return [
      {
        id: 'auth',
        purpose: 'User authentication and account management',
        legalBasis: 'Contract',
        dataCategories: ['Email', 'Name', 'Authentication tokens'],
        recipients: ['Firebase Auth', 'Internal systems'],
        retentionPeriod: 'Until account deletion',
        safeguards: ['Encryption at rest', 'TLS in transit', 'Access controls']
      },
      {
        id: 'analytics',
        purpose: 'Service improvement and usage analytics',
        legalBasis: 'Legitimate interest',
        dataCategories: ['Usage data', 'Device information', 'Location (country)'],
        recipients: ['Analytics service', 'Internal analytics team'],
        retentionPeriod: '2 years',
        safeguards: ['Anonymization', 'Data minimization', 'Access controls']
      },
      {
        id: 'support',
        purpose: 'Customer support and service',
        legalBasis: 'Contract',
        dataCategories: ['Contact information', 'Support tickets', 'Communication history'],
        recipients: ['Support team', 'Ticketing system'],
        retentionPeriod: '3 years after last interaction',
        safeguards: ['Access controls', 'Encryption', 'Audit logging']
      }
    ];
  }

  /**
   * Generate privacy report
   */
  async generatePrivacyReport(userId: string): Promise<{
    consents: Record<ConsentType, boolean>;
    preferences: PrivacyPreferences;
    consentHistory: ConsentRecord[];
    processingActivities: DataProcessingActivity[];
  }> {
    const [consents, preferences, consentHistory, processingActivities] = await Promise.all([
      this.getUserConsent(userId),
      this.getPrivacyPreferences(userId),
      this.getConsentHistory(userId),
      this.getDataProcessingActivities()
    ]);
    
    return {
      consents,
      preferences,
      consentHistory,
      processingActivities
    };
  }

  /**
   * Check if user can be tracked
   */
  async canTrackUser(userId: string, trackingType: ConsentType): Promise<boolean> {
    const consents = await this.getUserConsent(userId);
    return consents[trackingType] || false;
  }

  /**
   * Anonymize user data
   */
  async anonymizeUserData(userId: string): Promise<void> {
    const db = getHubFirestore();
    
    // Update user profile
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      email: `anonymized_${userId}@deleted.com`,
      displayName: 'Deleted User',
      photoURL: null,
      phoneNumber: null,
      anonymizedAt: Timestamp.now()
    });
    
    // Remove from search indices
    // Clear personal data from logs
    // etc.
  }
}

export const gdprService = GDPRService.getInstance();