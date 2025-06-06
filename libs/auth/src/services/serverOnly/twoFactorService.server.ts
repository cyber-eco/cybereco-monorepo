import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { firestore } from 'firebase-admin';
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

class TwoFactorService {
  private readonly appName = process.env.TWO_FACTOR_APP_NAME || 'CyberEco Hub';
  private readonly db = firestore();
  private readonly collection = 'users';
  private readonly backupCodeCount = 10;
  private readonly saltRounds = 10;

  /**
   * Generate a new 2FA secret for user
   */
  async generateSecret(userId: string, email: string): Promise<TwoFactorSecret> {
    try {
      validate(userIdSchema, userId);
      validate(emailSchema, email);

      const secret = speakeasy.generateSecret({
        length: 32,
        name: `${this.appName}:${email}`,
        issuer: this.appName,
      });

      // Generate QR code as data URL
      const dataURL = await QRCode.toDataURL(secret.otpauth_url);

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      logger.info('Generated 2FA secret', { userId });

      return {
        ...secret,
        dataURL,
        backupCodes,
      };
    } catch (error) {
      logger.error('Failed to generate 2FA secret', { error, userId });
      throw error;
    }
  }

  /**
   * Verify a TOTP token
   */
  async verifyToken(userId: string, token: string): Promise<boolean> {
    try {
      validate(userIdSchema, userId);
      validate(twoFactorCodeSchema, token);

      const userDoc = await this.db.collection(this.collection).doc(userId).get();
      
      if (!userDoc.exists) {
        return false;
      }

      const userData = userDoc.data();
      if (!userData?.twoFactorEnabled || !userData?.twoFactorSecret) {
        return false;
      }

      const verified = speakeasy.totp.verify({
        secret: userData.twoFactorSecret,
        encoding: 'base32',
        token,
        window: 1, // Allow 1 time step before/after
      });

      if (verified) {
        // Update last used time for device
        await this.updateDeviceLastUsed(userId);
        logger.info('2FA token verified', { userId });
      }

      return verified;
    } catch (error) {
      logger.error('Failed to verify 2FA token', { error, userId });
      throw error;
    }
  }

  /**
   * Verify token and enable 2FA
   */
  async verifyAndEnable(
    userId: string,
    secret: string,
    verificationCode: string,
    backupCodes?: string[],
    deviceInfo?: DeviceInfo
  ): Promise<boolean> {
    try {
      validate(userIdSchema, userId);
      validate(twoFactorCodeSchema, verificationCode);

      // Verify the code first
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: verificationCode,
        window: 1,
      });

      if (!verified) {
        throw new InvalidTwoFactorCodeError('Invalid verification code');
      }

      // Use transaction to ensure atomicity
      await this.db.runTransaction(async (transaction) => {
        const userRef = this.db.collection(this.collection).doc(userId);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
          throw new NotFoundError('User not found');
        }

        const userData = userDoc.data();
        if (userData?.twoFactorEnabled) {
          throw new ValidationError('2FA is already enabled');
        }

        // Hash backup codes
        const hashedBackupCodes = backupCodes 
          ? await Promise.all(backupCodes.map(code => bcrypt.hash(code, this.saltRounds)))
          : [];

        // Prepare device info
        const device: DeviceInfo = {
          userAgent: deviceInfo?.userAgent || 'Unknown',
          lastUsed: new Date(),
          trusted: true,
          deviceId: crypto.randomBytes(16).toString('hex'),
        };

        transaction.update(userRef, {
          twoFactorEnabled: true,
          twoFactorSecret: secret,
          twoFactorBackupCodes: hashedBackupCodes,
          twoFactorEnabledAt: firestore.FieldValue.serverTimestamp(),
          twoFactorDevices: [device],
        });
      });

      logger.info('2FA enabled', { userId });
      return true;
    } catch (error) {
      logger.error('Failed to enable 2FA', { error, userId });
      throw error;
    }
  }

  /**
   * Disable 2FA for user
   */
  async disable(userId: string): Promise<void> {
    try {
      validate(userIdSchema, userId);

      const userRef = this.db.collection(this.collection).doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new NotFoundError('User not found');
      }

      await userRef.update({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: null,
        twoFactorDevices: [],
        twoFactorDisabledAt: firestore.FieldValue.serverTimestamp(),
      });

      logger.info('2FA disabled', { userId });
    } catch (error) {
      logger.error('Failed to disable 2FA', { error, userId });
      throw error;
    }
  }

  /**
   * Verify a backup code
   */
  async verifyBackupCode(userId: string, backupCode: string): Promise<boolean> {
    try {
      validate(userIdSchema, userId);
      validate(backupCodeSchema, backupCode);

      const userDoc = await this.db.collection(this.collection).doc(userId).get();
      
      if (!userDoc.exists) {
        return false;
      }

      const userData = userDoc.data();
      if (!userData?.twoFactorEnabled || !userData?.twoFactorBackupCodes) {
        return false;
      }

      const hashedCodes = userData.twoFactorBackupCodes as string[];
      
      // Find matching backup code
      for (let i = 0; i < hashedCodes.length; i++) {
        const matches = await bcrypt.compare(backupCode, hashedCodes[i]);
        if (matches) {
          // Remove used backup code
          hashedCodes.splice(i, 1);
          await this.db.collection(this.collection).doc(userId).update({
            twoFactorBackupCodes: hashedCodes,
          });
          
          logger.info('Backup code used', { userId, remainingCodes: hashedCodes.length });
          return true;
        }
      }

      return false;
    } catch (error) {
      logger.error('Failed to verify backup code', { error, userId });
      throw error;
    }
  }

  /**
   * Regenerate backup codes
   */
  async regenerateBackupCodes(userId: string): Promise<string[]> {
    try {
      validate(userIdSchema, userId);

      const userDoc = await this.db.collection(this.collection).doc(userId).get();
      
      if (!userDoc.exists) {
        throw new NotFoundError('User not found');
      }

      const userData = userDoc.data();
      if (!userData?.twoFactorEnabled) {
        throw new ValidationError('2FA is not enabled');
      }

      const backupCodes = this.generateBackupCodes();
      const hashedBackupCodes = await Promise.all(
        backupCodes.map(code => bcrypt.hash(code, this.saltRounds))
      );

      await this.db.collection(this.collection).doc(userId).update({
        twoFactorBackupCodes: hashedBackupCodes,
        twoFactorBackupCodesGeneratedAt: firestore.FieldValue.serverTimestamp(),
      });

      logger.info('Regenerated backup codes', { userId });
      return backupCodes;
    } catch (error) {
      logger.error('Failed to regenerate backup codes', { error, userId });
      throw error;
    }
  }

  /**
   * Check if 2FA is enabled for user
   */
  async isEnabled(userId: string): Promise<boolean> {
    try {
      validate(userIdSchema, userId);

      const userDoc = await this.db.collection(this.collection).doc(userId).get();
      
      if (!userDoc.exists) {
        return false;
      }

      const userData = userDoc.data();
      return userData?.twoFactorEnabled === true;
    } catch (error) {
      logger.error('Failed to check 2FA status', { error, userId });
      return false;
    }
  }

  /**
   * Get list of trusted devices
   */
  async getTrustedDevices(userId: string): Promise<DeviceInfo[]> {
    try {
      validate(userIdSchema, userId);

      const userDoc = await this.db.collection(this.collection).doc(userId).get();
      
      if (!userDoc.exists) {
        return [];
      }

      const userData = userDoc.data();
      return userData?.twoFactorDevices || [];
    } catch (error) {
      logger.error('Failed to get trusted devices', { error, userId });
      return [];
    }
  }

  /**
   * Remove a trusted device
   */
  async removeTrustedDevice(userId: string, deviceId: string): Promise<void> {
    try {
      validate(userIdSchema, userId);

      const userRef = this.db.collection(this.collection).doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new NotFoundError('User not found');
      }

      const userData = userDoc.data();
      const devices = (userData?.twoFactorDevices || []) as DeviceInfo[];
      const updatedDevices = devices.filter(d => d.deviceId !== deviceId);

      await userRef.update({
        twoFactorDevices: updatedDevices,
      });

      logger.info('Removed trusted device', { userId, deviceId });
    } catch (error) {
      logger.error('Failed to remove trusted device', { error, userId, deviceId });
      throw error;
    }
  }

  /**
   * Generate backup codes
   */
  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < this.backupCodeCount; i++) {
      const code = this.generateBackupCode();
      codes.push(code);
    }

    return codes;
  }

  /**
   * Generate a single backup code
   */
  private generateBackupCode(): string {
    const segments = 4;
    const segmentLength = 4;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    const codeSegments: string[] = [];
    
    for (let i = 0; i < segments; i++) {
      let segment = '';
      for (let j = 0; j < segmentLength; j++) {
        const randomIndex = crypto.randomInt(charset.length);
        segment += charset[randomIndex];
      }
      codeSegments.push(segment);
    }

    return codeSegments.join('-');
  }

  /**
   * Update device last used time
   */
  private async updateDeviceLastUsed(userId: string, deviceId?: string): Promise<void> {
    try {
      const userRef = this.db.collection(this.collection).doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return;
      }

      const userData = userDoc.data();
      const devices = (userData?.twoFactorDevices || []) as DeviceInfo[];
      
      // Update last used time for current device
      const updatedDevices = devices.map(device => {
        if (!deviceId || device.deviceId === deviceId) {
          return { ...device, lastUsed: new Date() };
        }
        return device;
      });

      await userRef.update({
        twoFactorDevices: updatedDevices,
      });
    } catch (error) {
      logger.error('Failed to update device last used', { error, userId });
    }
  }
}

// Export singleton instance
export const twoFactorService = new TwoFactorService();