import { createLogger } from '../utils/logger';
import { InvalidTwoFactorCodeError, ValidationError, NotFoundError } from '../utils/errors';
import { validate, userIdSchema, emailSchema, twoFactorCodeSchema, backupCodeSchema } from '../utils/validation';

const logger = createLogger('TwoFactorService');

export interface TwoFactorSecret {
  ascii: string;
  hex: string;
  base32: string;
  qr_code_ascii: string;
  qr_code_hex: string;
  qr_code_base32: string;
  google_auth_qr: string;
  otpauth_url: string;
  dataURL?: string;
  backupCodes?: string[];
}

export interface DeviceInfo {
  userAgent: string;
  lastUsed: Date;
  trusted: boolean;
  deviceId?: string;
}

// Client-side stub implementation
class TwoFactorService {
  async generateSecret(userId: string, email: string): Promise<TwoFactorSecret> {
    logger.warn('TwoFactorService.generateSecret called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async verifyToken(userId: string, token: string): Promise<boolean> {
    logger.warn('TwoFactorService.verifyToken called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async verifyAndEnable(
    userId: string,
    secret: string,
    verificationCode: string,
    backupCodes?: string[],
    deviceInfo?: DeviceInfo
  ): Promise<boolean> {
    logger.warn('TwoFactorService.verifyAndEnable called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async disable(userId: string): Promise<void> {
    logger.warn('TwoFactorService.disable called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async verifyBackupCode(userId: string, backupCode: string): Promise<boolean> {
    logger.warn('TwoFactorService.verifyBackupCode called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async regenerateBackupCodes(userId: string): Promise<string[]> {
    logger.warn('TwoFactorService.regenerateBackupCodes called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async isEnabled(userId: string): Promise<boolean> {
    logger.warn('TwoFactorService.isEnabled called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async getTrustedDevices(userId: string): Promise<DeviceInfo[]> {
    logger.warn('TwoFactorService.getTrustedDevices called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }

  async removeTrustedDevice(userId: string, deviceId: string): Promise<void> {
    logger.warn('TwoFactorService.removeTrustedDevice called on client - use API routes instead');
    throw new Error('2FA operations must be performed server-side');
  }
}

// Export singleton instance
export const twoFactorService = new TwoFactorService();