import { gdprService, ConsentType, ConsentRecord } from '../gdprService';
import { authLogger, AuthEventType } from '../authLogger';
import { getHubFirestore } from '@cybereco/firebase-config';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';

// Mock Firebase
jest.mock('@cybereco/firebase-config');
jest.mock('firebase/firestore');
jest.mock('../authLogger');

describe('GDPRService', () => {
  const mockUserId = 'user123';
  const mockDb = {};
  
  beforeEach(() => {
    jest.clearAllMocks();
    (getHubFirestore as jest.Mock).mockReturnValue(mockDb);
  });

  describe('recordConsent', () => {
    it('should record user consent with metadata', async () => {
      const mockDocRef = {};
      (doc as jest.Mock).mockReturnValue(mockDocRef);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const metadata = {
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...'
      };

      await gdprService.recordConsent(
        mockUserId,
        ConsentType.ANALYTICS,
        true,
        metadata
      );

      expect(setDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          userId: mockUserId,
          type: ConsentType.ANALYTICS,
          granted: true,
          version: '1.0.0',
          ipAddress: metadata.ipAddress,
          userAgent: metadata.userAgent,
          timestamp: expect.any(Timestamp)
        })
      );
    });

    it('should update current consent status', async () => {
      const existingDoc = {
        exists: () => true
      };
      const mockDocRef = {};
      
      (getDoc as jest.Mock).mockResolvedValue(existingDoc);
      (doc as jest.Mock).mockReturnValue(mockDocRef);
      (updateDoc as jest.Mock).mockResolvedValue(undefined);

      await gdprService.recordConsent(
        mockUserId,
        ConsentType.FUNCTIONAL,
        false
      );

      expect(updateDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          [ConsentType.FUNCTIONAL]: false,
          lastUpdated: expect.any(Timestamp)
        })
      );
    });

    it('should log consent recording', async () => {
      (doc as jest.Mock).mockReturnValue({});
      (setDoc as jest.Mock).mockResolvedValue(undefined);
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      await gdprService.recordConsent(mockUserId, ConsentType.MARKETING, true);

      expect(authLogger.logSessionEvent).toHaveBeenCalledWith(
        AuthEventType.CONSENT_GRANTED,
        mockUserId,
        expect.objectContaining({
          consentType: ConsentType.MARKETING,
          granted: true
        })
      );
    });
  });

  describe('getUserConsent', () => {
    it('should return user consents if they exist', async () => {
      const mockConsents = {
        [ConsentType.FUNCTIONAL]: true,
        [ConsentType.ANALYTICS]: true,
        [ConsentType.MARKETING]: false
      };

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockConsents
      });

      const consents = await gdprService.getUserConsent(mockUserId);

      expect(consents[ConsentType.NECESSARY]).toBe(true); // Always true
      expect(consents[ConsentType.FUNCTIONAL]).toBe(true);
      expect(consents[ConsentType.ANALYTICS]).toBe(true);
      expect(consents[ConsentType.MARKETING]).toBe(false);
      expect(consents[ConsentType.PERSONALIZATION]).toBe(false); // Default
    });

    it('should return default consents if none exist', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false
      });

      const consents = await gdprService.getUserConsent(mockUserId);

      expect(consents[ConsentType.NECESSARY]).toBe(true);
      expect(consents[ConsentType.FUNCTIONAL]).toBe(false);
      expect(consents[ConsentType.ANALYTICS]).toBe(false);
      expect(consents[ConsentType.MARKETING]).toBe(false);
      expect(consents[ConsentType.PERSONALIZATION]).toBe(false);
    });
  });

  describe('getConsentHistory', () => {
    it('should return user consent history', async () => {
      const mockHistory: ConsentRecord[] = [
        {
          userId: mockUserId,
          consentId: 'consent1',
          type: ConsentType.ANALYTICS,
          granted: true,
          timestamp: Timestamp.now(),
          version: '1.0.0'
        },
        {
          userId: mockUserId,
          consentId: 'consent2',
          type: ConsentType.MARKETING,
          granted: false,
          timestamp: Timestamp.now(),
          version: '1.0.0'
        }
      ];

      const mockDocs = mockHistory.map(record => ({
        data: () => record
      }));

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockDocs
      });

      const history = await gdprService.getConsentHistory(mockUserId);

      expect(history).toHaveLength(2);
      expect(history[0].type).toBe(ConsentType.ANALYTICS);
      expect(history[1].type).toBe(ConsentType.MARKETING);
      expect(query).toHaveBeenCalled();
      expect(where).toHaveBeenCalledWith('userId', '==', mockUserId);
    });
  });

  describe('requestDataDeletion', () => {
    it('should create a data deletion request', async () => {
      const mockCollectionRef = { add: jest.fn() };
      (collection as jest.Mock).mockReturnValue(mockCollectionRef);
      (doc as jest.Mock).mockReturnValue({});
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const reason = 'User requested account deletion';
      const metadata = { source: 'web' };

      const requestId = await gdprService.requestDataDeletion(
        mockUserId,
        reason,
        metadata
      );

      expect(requestId).toContain('deletion_');
      expect(requestId).toContain(mockUserId);
      
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          id: requestId,
          type: 'deletion',
          userId: mockUserId,
          reason,
          status: 'pending',
          requestedAt: expect.any(Timestamp),
          metadata
        })
      );
    });
  });

  describe('requestDataPortability', () => {
    it('should create a data portability request', async () => {
      (doc as jest.Mock).mockReturnValue({});
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const requestId = await gdprService.requestDataPortability(
        mockUserId,
        'json',
        { requestedVia: 'api' }
      );

      expect(requestId).toContain('portability_');
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'portability',
          format: 'json',
          status: 'pending'
        })
      );
    });
  });

  describe('getDataProcessingActivities', () => {
    it('should return data processing activities', async () => {
      const activities = await gdprService.getDataProcessingActivities();

      expect(activities).toBeInstanceOf(Array);
      expect(activities.length).toBeGreaterThan(0);
      
      const authActivity = activities.find(a => a.id === 'auth');
      expect(authActivity).toBeDefined();
      expect(authActivity?.purpose).toBe('User authentication and account management');
      expect(authActivity?.legalBasis).toBe('Contract');
      expect(authActivity?.dataCategories).toContain('Email');
    });
  });

  describe('generatePrivacyReport', () => {
    it('should generate comprehensive privacy report', async () => {
      const mockConsents = {
        [ConsentType.NECESSARY]: true,
        [ConsentType.FUNCTIONAL]: true,
        [ConsentType.ANALYTICS]: false,
        [ConsentType.MARKETING]: false,
        [ConsentType.PERSONALIZATION]: false
      };

      const mockPreferences = {
        userId: mockUserId,
        dataCollection: true,
        dataSharing: false,
        emailMarketing: false,
        pushNotifications: true,
        activityTracking: true,
        thirdPartyIntegrations: false,
        updatedAt: Timestamp.now()
      };

      jest.spyOn(gdprService, 'getUserConsent').mockResolvedValue(mockConsents);
      jest.spyOn(gdprService, 'getPrivacyPreferences').mockResolvedValue(mockPreferences);
      jest.spyOn(gdprService, 'getConsentHistory').mockResolvedValue([]);
      jest.spyOn(gdprService, 'getDataProcessingActivities').mockResolvedValue([]);

      const report = await gdprService.generatePrivacyReport(mockUserId);

      expect(report).toHaveProperty('consents');
      expect(report).toHaveProperty('preferences');
      expect(report).toHaveProperty('consentHistory');
      expect(report).toHaveProperty('processingActivities');
      expect(report.consents).toEqual(mockConsents);
      expect(report.preferences).toEqual(mockPreferences);
    });
  });

  describe('canTrackUser', () => {
    it('should check if user can be tracked for specific consent type', async () => {
      const mockConsents = {
        [ConsentType.NECESSARY]: true,
        [ConsentType.FUNCTIONAL]: false,
        [ConsentType.ANALYTICS]: true,
        [ConsentType.MARKETING]: false,
        [ConsentType.PERSONALIZATION]: false
      };

      jest.spyOn(gdprService, 'getUserConsent').mockResolvedValue(mockConsents);

      const canTrackAnalytics = await gdprService.canTrackUser(
        mockUserId,
        ConsentType.ANALYTICS
      );
      const canTrackMarketing = await gdprService.canTrackUser(
        mockUserId,
        ConsentType.MARKETING
      );

      expect(canTrackAnalytics).toBe(true);
      expect(canTrackMarketing).toBe(false);
    });
  });

  describe('anonymizeUserData', () => {
    it('should anonymize user data', async () => {
      const mockDocRef = {};
      (doc as jest.Mock).mockReturnValue(mockDocRef);
      (updateDoc as jest.Mock).mockResolvedValue(undefined);

      await gdprService.anonymizeUserData(mockUserId);

      expect(updateDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          email: `anonymized_${mockUserId}@deleted.com`,
          displayName: 'Deleted User',
          photoURL: null,
          phoneNumber: null,
          anonymizedAt: expect.any(Timestamp)
        })
      );
    });
  });

  describe('updatePrivacyPreferences', () => {
    it('should update privacy preferences', async () => {
      const mockDocRef = {};
      (doc as jest.Mock).mockReturnValue(mockDocRef);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const preferences = {
        dataCollection: false,
        emailMarketing: true
      };

      await gdprService.updatePrivacyPreferences(mockUserId, preferences);

      expect(setDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          ...preferences,
          userId: mockUserId,
          updatedAt: expect.any(Timestamp)
        }),
        { merge: true }
      );
    });
  });
});