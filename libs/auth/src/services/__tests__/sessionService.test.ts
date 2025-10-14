import { sessionService } from '../sessionService';
import { NotFoundError, ValidationError } from '../../utils/errors';
import { v4 as uuidv4 } from 'uuid';

// Mock dependencies
jest.mock('uuid');
jest.mock('../../utils/logger', () => ({
  createLogger: () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }),
}));

// Mock Firebase Admin
const mockFirestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
    where: jest.fn(() => ({
      get: jest.fn(),
      limit: jest.fn(() => ({
        get: jest.fn(),
      })),
      orderBy: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  })),
  batch: jest.fn(() => ({
    delete: jest.fn(),
    commit: jest.fn(),
  })),
};

jest.mock('firebase-admin', () => ({
  firestore: () => mockFirestore,
}));

describe('SessionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (uuidv4 as jest.Mock).mockReturnValue('test-session-id');
  });

  describe('createSession', () => {
    it('should create a new session', async () => {
      const userId = 'test-user-123';
      const deviceInfo = {
        userAgent: 'Mozilla/5.0 Test Browser',
        ipAddress: '192.168.1.1',
        deviceType: 'desktop' as const,
        browser: 'Chrome',
        os: 'Windows',
      };

      mockFirestore.collection().doc().set.mockResolvedValue({});

      const result = await sessionService.createSession(userId, deviceInfo);

      expect(result).toEqual({
        sessionId: 'sess_test-session-id',
        userId,
        deviceInfo: expect.objectContaining({
          ...deviceInfo,
          fingerprint: expect.any(String),
        }),
        createdAt: expect.any(Date),
        lastActivity: expect.any(Date),
        expiresAt: expect.any(Date),
      });

      expect(mockFirestore.collection().doc().set).toHaveBeenCalledWith(
        expect.objectContaining({
          sessionId: 'sess_test-session-id',
          userId,
          deviceInfo: expect.objectContaining(deviceInfo),
        })
      );
    });

    it('should validate user ID', async () => {
      const invalidUserId = 'invalid-id!';
      const deviceInfo = {
        userAgent: 'Test',
        ipAddress: '192.168.1.1',
      };

      await expect(
        sessionService.createSession(invalidUserId, deviceInfo)
      ).rejects.toThrow(ValidationError);
    });

    it('should include location data if available', async () => {
      const userId = 'test-user-123';
      const deviceInfo = {
        userAgent: 'Test',
        ipAddress: '192.168.1.1',
      };
      const location = {
        city: 'San Francisco',
        country: 'US',
        latitude: 37.7749,
        longitude: -122.4194,
      };

      mockFirestore.collection().doc().set.mockResolvedValue({});

      const result = await sessionService.createSession(userId, deviceInfo, location);

      expect(result.location).toEqual(location);
    });
  });

  describe('getSession', () => {
    it('should retrieve existing session', async () => {
      const sessionId = 'sess_test-session-id';
      const mockSession = {
        sessionId,
        userId: 'test-user-123',
        deviceInfo: { userAgent: 'Test' },
        createdAt: { toDate: () => new Date() },
        lastActivity: { toDate: () => new Date() },
        expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
      };

      mockFirestore.collection().doc().get.mockResolvedValue({
        exists: true,
        data: () => mockSession,
      });

      const result = await sessionService.getSession(sessionId);

      expect(result).toEqual({
        ...mockSession,
        createdAt: expect.any(Date),
        lastActivity: expect.any(Date),
        expiresAt: expect.any(Date),
      });
    });

    it('should return null for non-existent session', async () => {
      const sessionId = 'sess_non-existent';

      mockFirestore.collection().doc().get.mockResolvedValue({
        exists: false,
      });

      const result = await sessionService.getSession(sessionId);

      expect(result).toBeNull();
    });

    it('should return null for expired session', async () => {
      const sessionId = 'sess_expired';
      const mockSession = {
        sessionId,
        userId: 'test-user-123',
        expiresAt: { toDate: () => new Date(Date.now() - 1000) }, // Expired
      };

      mockFirestore.collection().doc().get.mockResolvedValue({
        exists: true,
        data: () => mockSession,
      });

      const result = await sessionService.getSession(sessionId);

      expect(result).toBeNull();
    });
  });

  describe('getUserSessions', () => {
    it('should get all active sessions for user', async () => {
      const userId = 'test-user-123';
      const mockSessions = [
        {
          data: () => ({
            sessionId: 'sess_1',
            userId,
            createdAt: { toDate: () => new Date() },
            lastActivity: { toDate: () => new Date() },
            expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
          }),
        },
        {
          data: () => ({
            sessionId: 'sess_2',
            userId,
            createdAt: { toDate: () => new Date() },
            lastActivity: { toDate: () => new Date() },
            expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
          }),
        },
      ];

      mockFirestore.collection().where().get.mockResolvedValue({
        empty: false,
        docs: mockSessions,
      });

      const result = await sessionService.getUserSessions(userId);

      expect(result).toHaveLength(2);
      expect(result[0].sessionId).toBe('sess_1');
      expect(result[1].sessionId).toBe('sess_2');
    });

    it('should filter out expired sessions', async () => {
      const userId = 'test-user-123';
      const mockSessions = [
        {
          data: () => ({
            sessionId: 'sess_active',
            expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
          }),
        },
        {
          data: () => ({
            sessionId: 'sess_expired',
            expiresAt: { toDate: () => new Date(Date.now() - 1000) },
          }),
        },
      ];

      mockFirestore.collection().where().get.mockResolvedValue({
        empty: false,
        docs: mockSessions,
      });

      const result = await sessionService.getUserSessions(userId);

      expect(result).toHaveLength(1);
      expect(result[0].sessionId).toBe('sess_active');
    });
  });

  describe('updateActivity', () => {
    it('should update session last activity', async () => {
      const sessionId = 'sess_test-session-id';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);
      mockFirestore.collection().doc().update.mockResolvedValue({});

      await sessionService.updateActivity(sessionId);

      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        lastActivity: expect.any(Object),
      });
    });

    it('should not update expired session', async () => {
      const sessionId = 'sess_expired';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          expiresAt: { toDate: () => new Date(Date.now() - 1000) },
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);

      await sessionService.updateActivity(sessionId);

      expect(mockFirestore.collection().doc().update).not.toHaveBeenCalled();
    });
  });

  describe('revokeSession', () => {
    it('should revoke a session', async () => {
      const sessionId = 'sess_test-session-id';
      const mockSession = {
        exists: true,
        data: () => ({ sessionId }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);
      mockFirestore.collection().doc().update.mockResolvedValue({});

      await sessionService.revokeSession(sessionId);

      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        revokedAt: expect.any(Object),
        expiresAt: expect.any(Object),
      });
    });

    it('should throw for non-existent session', async () => {
      const sessionId = 'sess_non-existent';

      mockFirestore.collection().doc().get.mockResolvedValue({
        exists: false,
      });

      await expect(
        sessionService.revokeSession(sessionId)
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('revokeAllUserSessions', () => {
    it('should revoke all user sessions', async () => {
      const userId = 'test-user-123';
      const currentSessionId = 'sess_current';
      const mockSessions = [
        { id: 'sess_1', data: () => ({ sessionId: 'sess_1' }) },
        { id: 'sess_2', data: () => ({ sessionId: 'sess_2' }) },
        { id: currentSessionId, data: () => ({ sessionId: currentSessionId }) },
      ];

      mockFirestore.collection().where().get.mockResolvedValue({
        empty: false,
        docs: mockSessions,
      });

      const mockBatch = {
        update: jest.fn(),
        commit: jest.fn().mockResolvedValue({}),
      };
      mockFirestore.batch.mockReturnValue(mockBatch);

      const result = await sessionService.revokeAllUserSessions(userId, currentSessionId);

      expect(result).toBe(2); // Should not revoke current session
      expect(mockBatch.update).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalled();
    });
  });

  describe('cleanupExpiredSessions', () => {
    it('should delete expired sessions', async () => {
      const mockExpiredSessions = [
        { ref: { delete: jest.fn() }, id: 'sess_1' },
        { ref: { delete: jest.fn() }, id: 'sess_2' },
      ];

      mockFirestore.collection().where().limit().get.mockResolvedValue({
        empty: false,
        docs: mockExpiredSessions,
      });

      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValue({}),
      };
      mockFirestore.batch.mockReturnValue(mockBatch);

      const result = await sessionService.cleanupExpiredSessions();

      expect(result).toBe(2);
      expect(mockBatch.delete).toHaveBeenCalledTimes(2);
    });
  });

  describe('getSessionByFingerprint', () => {
    it('should find session by device fingerprint', async () => {
      const fingerprint = 'device-fingerprint-123';
      const userId = 'test-user-123';
      const mockSession = {
        data: () => ({
          sessionId: 'sess_found',
          userId,
          deviceInfo: { fingerprint },
          expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
        }),
      };

      mockFirestore.collection().where().where.mockReturnValue({
        get: jest.fn().mockResolvedValue({
          empty: false,
          docs: [mockSession],
        }),
      });

      const result = await sessionService.getSessionByFingerprint(userId, fingerprint);

      expect(result).toBeTruthy();
      expect(result?.sessionId).toBe('sess_found');
    });
  });

  describe('validateSession', () => {
    it('should validate active session', async () => {
      const sessionId = 'sess_valid';
      const userId = 'test-user-123';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          userId,
          expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
          revokedAt: null,
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);

      const result = await sessionService.validateSession(sessionId, userId);

      expect(result).toBe(true);
    });

    it('should reject session with wrong user', async () => {
      const sessionId = 'sess_valid';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          userId: 'different-user',
          expiresAt: { toDate: () => new Date(Date.now() + 86400000) },
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);

      const result = await sessionService.validateSession(sessionId, 'test-user-123');

      expect(result).toBe(false);
    });

    it('should reject revoked session', async () => {
      const sessionId = 'sess_revoked';
      const userId = 'test-user-123';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          userId,
          revokedAt: { toDate: () => new Date() },
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);

      const result = await sessionService.validateSession(sessionId, userId);

      expect(result).toBe(false);
    });
  });

  describe('extendSession', () => {
    it('should extend session expiry', async () => {
      const sessionId = 'sess_test';
      const mockSession = {
        exists: true,
        data: () => ({
          sessionId,
          expiresAt: { toDate: () => new Date(Date.now() + 3600000) }, // 1 hour left
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockSession);
      mockFirestore.collection().doc().update.mockResolvedValue({});

      await sessionService.extendSession(sessionId);

      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        expiresAt: expect.any(Object),
        lastActivity: expect.any(Object),
      });
    });
  });
});