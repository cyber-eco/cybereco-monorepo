import { privacyAwareDataService, PrivacySettings } from '../privacyAwareDataService';
import { gdprService, ConsentType } from '../gdprService';
import { authLogger } from '../authLogger';
import { getHubFirestore } from '@cybereco/firebase-config';
import { 
  collection, 
  doc, 
  getDocs, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';

// Mock Firebase
jest.mock('@cybereco/firebase-config');
jest.mock('firebase/firestore');

// Mock other services
jest.mock('../gdprService');
jest.mock('../authLogger');

describe('PrivacyAwareDataService', () => {
  const mockUserId = 'user123';
  const mockViewerId = 'viewer456';
  
  const defaultPrivacySettings: PrivacySettings = {
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

  beforeEach(() => {
    jest.clearAllMocks();
    (getHubFirestore as jest.Mock).mockReturnValue({});
  });

  describe('getUserPrivacySettings', () => {
    it('should return user privacy settings if they exist', async () => {
      const mockDoc = {
        data: () => defaultPrivacySettings
      };
      
      (getDocs as jest.Mock).mockResolvedValue({
        empty: false,
        docs: [mockDoc]
      });

      const settings = await privacyAwareDataService.getUserPrivacySettings(mockUserId);
      
      expect(settings).toEqual(defaultPrivacySettings);
      expect(query).toHaveBeenCalled();
      expect(where).toHaveBeenCalledWith('userId', '==', mockUserId);
    });

    it('should return default settings if none exist', async () => {
      (getDocs as jest.Mock).mockResolvedValue({
        empty: true,
        docs: []
      });

      const settings = await privacyAwareDataService.getUserPrivacySettings(mockUserId);
      
      expect(settings.profileVisibility).toBe('friends');
      expect(settings.dataSharing.analytics).toBe(false);
      expect(settings.activityVisibility.expenses).toBe('friends');
    });
  });

  describe('canViewData', () => {
    beforeEach(() => {
      // Mock getUserPrivacySettings
      jest.spyOn(privacyAwareDataService, 'getUserPrivacySettings')
        .mockResolvedValue(defaultPrivacySettings);
    });

    it('should allow users to view their own data', async () => {
      const canView = await privacyAwareDataService.canViewData({
        viewerId: mockUserId,
        targetUserId: mockUserId,
        dataType: 'expenses'
      });

      expect(canView).toBe(true);
    });

    it('should block viewers who are in blocked list', async () => {
      const settingsWithBlocked = {
        ...defaultPrivacySettings,
        blockedUsers: [mockViewerId]
      };
      
      jest.spyOn(privacyAwareDataService, 'getUserPrivacySettings')
        .mockResolvedValue(settingsWithBlocked);

      const canView = await privacyAwareDataService.canViewData({
        viewerId: mockViewerId,
        targetUserId: mockUserId,
        dataType: 'expenses'
      });

      expect(canView).toBe(false);
    });

    it('should allow viewing when visibility is everyone', async () => {
      const publicSettings = {
        ...defaultPrivacySettings,
        activityVisibility: {
          ...defaultPrivacySettings.activityVisibility,
          expenses: 'everyone' as const
        }
      };
      
      jest.spyOn(privacyAwareDataService, 'getUserPrivacySettings')
        .mockResolvedValue(publicSettings);

      const canView = await privacyAwareDataService.canViewData({
        viewerId: mockViewerId,
        targetUserId: mockUserId,
        dataType: 'expenses'
      });

      expect(canView).toBe(true);
    });

    it('should restrict viewing when visibility is friends-only and viewer is not a friend', async () => {
      const canView = await privacyAwareDataService.canViewData({
        viewerId: mockViewerId,
        targetUserId: mockUserId,
        dataType: 'expenses',
        relationship: 'stranger'
      });

      expect(canView).toBe(false);
    });

    it('should allow friends to view friends-only data', async () => {
      const canView = await privacyAwareDataService.canViewData({
        viewerId: mockViewerId,
        targetUserId: mockUserId,
        dataType: 'expenses',
        relationship: 'friend'
      });

      expect(canView).toBe(true);
    });
  });

  describe('filterResults', () => {
    const mockResults = [
      { id: '1', userId: mockUserId, amount: 100 },
      { id: '2', userId: 'otherUser', amount: 200 },
      { id: '3', ownerId: mockUserId, amount: 300 }
    ];

    beforeEach(() => {
      jest.spyOn(privacyAwareDataService, 'canViewData')
        .mockImplementation(async ({ targetUserId }) => {
          // Allow viewing own data, block others
          return targetUserId === mockUserId;
        });
      
      (gdprService.getUserConsent as jest.Mock).mockResolvedValue({
        [ConsentType.ANALYTICS]: false,
        [ConsentType.PERSONALIZATION]: false
      });

      (authLogger.logSessionEvent as jest.Mock).mockResolvedValue(undefined);
    });

    it('should filter results based on privacy settings', async () => {
      const filtered = await privacyAwareDataService.filterResults(
        mockResults,
        mockViewerId,
        'expenses'
      );

      expect(filtered).toHaveLength(2); // Only user's own data
      expect(filtered[0].id).toBe('1');
      expect(filtered[1].id).toBe('3');
    });

    it('should remove analytics data when no consent', async () => {
      const dataWithAnalytics = [
        { 
          id: '1', 
          userId: mockUserId, 
          amount: 100,
          analyticsData: { views: 10 },
          personalData: { preferences: {} }
        }
      ];

      const filtered = await privacyAwareDataService.filterResults(
        dataWithAnalytics,
        mockViewerId,
        'expenses'
      );

      expect(filtered[0].analyticsData).toBeUndefined();
      expect(filtered[0].personalData).toBeUndefined();
    });

    it('should log data access', async () => {
      await privacyAwareDataService.filterResults(
        mockResults,
        mockViewerId,
        'expenses'
      );

      expect(authLogger.logSessionEvent).toHaveBeenCalledWith(
        expect.any(String),
        mockViewerId,
        expect.objectContaining({
          targetUserId: expect.any(String),
          dataType: 'expenses',
          accessLevel: expect.any(String)
        })
      );
    });
  });

  describe('anonymizeData', () => {
    const mockData = {
      id: '1',
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: 'https://example.com/photo.jpg',
      phoneNumber: '+1234567890',
      amount: 100
    };

    beforeEach(() => {
      jest.spyOn(privacyAwareDataService, 'canViewData')
        .mockResolvedValue(false);
    });

    it('should not anonymize data for the owner', async () => {
      const result = await privacyAwareDataService.anonymizeData(
        mockData,
        mockUserId,
        mockUserId
      );

      expect(result).toEqual(mockData);
      expect(result.displayName).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
    });

    it('should anonymize personal information when viewer cannot access', async () => {
      const result = await privacyAwareDataService.anonymizeData(
        mockData,
        mockViewerId,
        mockUserId
      );

      expect(result.displayName).toBe('Anonymous User');
      expect(result.email).toBe('hidden@example.com');
      expect(result.photoURL).toBeUndefined();
      expect(result.phoneNumber).toBeUndefined();
      expect(result.amount).toBe(100); // Non-personal data retained
    });

    it('should not anonymize when viewer has permission', async () => {
      jest.spyOn(privacyAwareDataService, 'canViewData')
        .mockResolvedValue(true);

      const result = await privacyAwareDataService.anonymizeData(
        mockData,
        mockViewerId,
        mockUserId
      );

      expect(result).toEqual(mockData);
    });
  });

  describe('updatePrivacySettings', () => {
    it('should update existing privacy settings', async () => {
      const mockDocRef = { update: jest.fn() };
      const mockExistingDoc = {
        empty: false,
        docs: [{ ref: mockDocRef }]
      };

      (getDocs as jest.Mock).mockResolvedValue(mockExistingDoc);

      const newSettings = {
        profileVisibility: 'public' as const
      };

      await privacyAwareDataService.updatePrivacySettings(mockUserId, newSettings);

      expect(mockDocRef.update).toHaveBeenCalledWith(
        expect.objectContaining({
          profileVisibility: 'public',
          updatedAt: expect.any(Timestamp)
        })
      );
    });

    it('should log privacy settings update', async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] });
      (collection as jest.Mock).mockReturnValue({ add: jest.fn() });

      await privacyAwareDataService.updatePrivacySettings(mockUserId, {});

      expect(authLogger.logSessionEvent).toHaveBeenCalledWith(
        expect.any(String),
        mockUserId,
        expect.objectContaining({
          changes: expect.any(Array)
        })
      );
    });
  });
});