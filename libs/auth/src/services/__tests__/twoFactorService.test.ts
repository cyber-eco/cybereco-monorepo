import { twoFactorService } from '../twoFactorService';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { InvalidTwoFactorCodeError, ValidationError } from '../../utils/errors';

// Mock dependencies
jest.mock('speakeasy');
jest.mock('qrcode');
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
  })),
  runTransaction: jest.fn((callback) => callback({
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  })),
};

jest.mock('firebase-admin', () => ({
  firestore: () => mockFirestore,
}));

describe('TwoFactorService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateSecret', () => {
    it('should generate a valid 2FA secret', async () => {
      const userId = 'test-user-123';
      const email = 'test@example.com';
      const mockSecret = {
        ascii: 'secret-ascii',
        hex: 'secret-hex',
        base32: 'JBSWY3DPEHPK3PXP',
        qr_code_ascii: 'qr-ascii',
        qr_code_hex: 'qr-hex',
        qr_code_base32: 'qr-base32',
        google_auth_qr: 'google-auth-qr',
        otpauth_url: 'otpauth://totp/CyberEco%20Hub:test@example.com?secret=JBSWY3DPEHPK3PXP&issuer=CyberEco%20Hub',
      };

      (speakeasy.generateSecret as jest.Mock).mockReturnValue(mockSecret);
      (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64,mockQRCode');

      const result = await twoFactorService.generateSecret(userId, email);

      expect(result).toEqual({
        ...mockSecret,
        dataURL: 'data:image/png;base64,mockQRCode',
        backupCodes: expect.arrayContaining([
          expect.stringMatching(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/),
        ]),
      });

      expect(result.backupCodes).toHaveLength(10);
      expect(speakeasy.generateSecret).toHaveBeenCalledWith({
        length: 32,
        name: 'CyberEco Hub:test@example.com',
        issuer: 'CyberEco Hub',
      });
    });

    it('should validate email format', async () => {
      const userId = 'test-user-123';
      const invalidEmail = 'not-an-email';

      await expect(
        twoFactorService.generateSecret(userId, invalidEmail)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid TOTP code', async () => {
      const userId = 'test-user-123';
      const token = '123456';
      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: true,
          twoFactorSecret: 'encrypted-secret',
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      (speakeasy.totp.verify as jest.Mock).mockReturnValue(true);

      const result = await twoFactorService.verifyToken(userId, token);

      expect(result).toBe(true);
      expect(speakeasy.totp.verify).toHaveBeenCalledWith({
        secret: 'encrypted-secret',
        encoding: 'base32',
        token,
        window: 1,
      });
    });

    it('should reject invalid TOTP code', async () => {
      const userId = 'test-user-123';
      const token = '000000';
      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: true,
          twoFactorSecret: 'encrypted-secret',
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      (speakeasy.totp.verify as jest.Mock).mockReturnValue(false);

      const result = await twoFactorService.verifyToken(userId, token);

      expect(result).toBe(false);
    });

    it('should return false if 2FA not enabled', async () => {
      const userId = 'test-user-123';
      const token = '123456';
      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: false,
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.verifyToken(userId, token);

      expect(result).toBe(false);
      expect(speakeasy.totp.verify).not.toHaveBeenCalled();
    });

    it('should validate token format', async () => {
      const userId = 'test-user-123';
      const invalidToken = 'abc123'; // Not 6 digits

      await expect(
        twoFactorService.verifyToken(userId, invalidToken)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('verifyAndEnable', () => {
    it('should enable 2FA after successful verification', async () => {
      const userId = 'test-user-123';
      const secret = 'JBSWY3DPEHPK3PXP';
      const verificationCode = '123456';
      const backupCodes = ['CODE1', 'CODE2'];
      const deviceInfo = { userAgent: 'Test Browser' };

      (speakeasy.totp.verify as jest.Mock).mockReturnValue(true);
      
      const mockTransaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({ twoFactorEnabled: false }),
        }),
        update: jest.fn(),
      };

      mockFirestore.runTransaction.mockImplementation((callback) => 
        callback(mockTransaction)
      );

      const result = await twoFactorService.verifyAndEnable(
        userId,
        secret,
        verificationCode,
        backupCodes,
        deviceInfo
      );

      expect(result).toBe(true);
      expect(mockTransaction.update).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          twoFactorEnabled: true,
          twoFactorSecret: secret,
          twoFactorBackupCodes: expect.any(Array),
          twoFactorEnabledAt: expect.any(Object),
          twoFactorDevices: expect.arrayContaining([
            expect.objectContaining({
              userAgent: 'Test Browser',
              trusted: true,
            }),
          ]),
        })
      );
    });

    it('should reject if already enabled', async () => {
      const userId = 'test-user-123';
      const secret = 'JBSWY3DPEHPK3PXP';
      const verificationCode = '123456';

      const mockTransaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({ twoFactorEnabled: true }),
        }),
      };

      mockFirestore.runTransaction.mockImplementation((callback) => 
        callback(mockTransaction)
      );

      await expect(
        twoFactorService.verifyAndEnable(userId, secret, verificationCode)
      ).rejects.toThrow('2FA is already enabled');
    });
  });

  describe('disable', () => {
    it('should disable 2FA', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: true }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      mockFirestore.collection().doc().update.mockResolvedValue({});

      await twoFactorService.disable(userId);

      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: null,
        twoFactorDevices: [],
        twoFactorDisabledAt: expect.any(Object),
      });
    });
  });

  describe('verifyBackupCode', () => {
    it('should verify valid backup code', async () => {
      const userId = 'test-user-123';
      const backupCode = 'ABCD-1234-EFGH-5678';
      const hashedBackupCodes = [
        'hashed-code-1',
        'hashed-code-2',
        'hashed-code-3',
      ];

      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: true,
          twoFactorBackupCodes: hashedBackupCodes,
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      
      // Mock bcrypt comparison
      jest.spyOn(require('bcryptjs'), 'compare')
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true); // Second code matches

      mockFirestore.collection().doc().update.mockResolvedValue({});

      const result = await twoFactorService.verifyBackupCode(userId, backupCode);

      expect(result).toBe(true);
      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        twoFactorBackupCodes: ['hashed-code-1', 'hashed-code-3'], // Second code removed
      });
    });

    it('should reject invalid backup code', async () => {
      const userId = 'test-user-123';
      const backupCode = 'INVALID-CODE';

      await expect(
        twoFactorService.verifyBackupCode(userId, backupCode)
      ).rejects.toThrow(ValidationError);
    });

    it('should return false if no backup codes match', async () => {
      const userId = 'test-user-123';
      const backupCode = 'ABCD-1234-EFGH-5678';
      const hashedBackupCodes = ['hashed-code-1'];

      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: true,
          twoFactorBackupCodes: hashedBackupCodes,
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(false);

      const result = await twoFactorService.verifyBackupCode(userId, backupCode);

      expect(result).toBe(false);
    });
  });

  describe('regenerateBackupCodes', () => {
    it('should generate new backup codes', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: true }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);
      mockFirestore.collection().doc().update.mockResolvedValue({});

      const result = await twoFactorService.regenerateBackupCodes(userId);

      expect(result).toHaveLength(10);
      expect(result[0]).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      expect(mockFirestore.collection().doc().update).toHaveBeenCalledWith({
        twoFactorBackupCodes: expect.any(Array),
        twoFactorBackupCodesGeneratedAt: expect.any(Object),
      });
    });

    it('should throw if 2FA not enabled', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: false }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      await expect(
        twoFactorService.regenerateBackupCodes(userId)
      ).rejects.toThrow('2FA is not enabled');
    });
  });

  describe('isEnabled', () => {
    it('should return true if 2FA enabled', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: true }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.isEnabled(userId);

      expect(result).toBe(true);
    });

    it('should return false if 2FA not enabled', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: false }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.isEnabled(userId);

      expect(result).toBe(false);
    });

    it('should return false if user not found', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: false,
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.isEnabled(userId);

      expect(result).toBe(false);
    });
  });

  describe('getTrustedDevices', () => {
    it('should return list of trusted devices', async () => {
      const userId = 'test-user-123';
      const trustedDevices = [
        { userAgent: 'Chrome', lastUsed: new Date(), trusted: true },
        { userAgent: 'Firefox', lastUsed: new Date(), trusted: true },
      ];

      const mockUserDoc = {
        exists: true,
        data: () => ({
          twoFactorEnabled: true,
          twoFactorDevices: trustedDevices,
        }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.getTrustedDevices(userId);

      expect(result).toEqual(trustedDevices);
    });

    it('should return empty array if no devices', async () => {
      const userId = 'test-user-123';
      const mockUserDoc = {
        exists: true,
        data: () => ({ twoFactorEnabled: true }),
      };

      mockFirestore.collection().doc().get.mockResolvedValue(mockUserDoc);

      const result = await twoFactorService.getTrustedDevices(userId);

      expect(result).toEqual([]);
    });
  });
});