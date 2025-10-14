import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { firestore } from 'firebase-admin';
import { createLogger } from '../../utils/logger';
import { NotFoundError, ValidationError } from '../../utils/errors';
import { validate, userIdSchema, sessionIdSchema } from '../../utils/validation';
import type { Session, DeviceInfo, GeolocationData } from '../sessionService';

const logger = createLogger('SessionService');

class SessionService {
  private readonly collectionName = 'sessions';
  private readonly sessionDuration = 30 * 24 * 60 * 60 * 1000; // 30 days
  private readonly activityUpdateThreshold = 5 * 60 * 1000; // 5 minutes
  private readonly db = firestore();

  /**
   * Create a new session
   */
  async createSession(
    userId: string,
    deviceInfo: DeviceInfo,
    location?: GeolocationData
  ): Promise<Session> {
    try {
      validate(userIdSchema, userId);

      const sessionId = `sess_${uuidv4()}`;
      const now = new Date();
      const expiresAt = new Date(now.getTime() + this.sessionDuration);

      // Generate device fingerprint if not provided
      if (!deviceInfo.fingerprint) {
        deviceInfo.fingerprint = this.generateDeviceFingerprint(deviceInfo);
      }

      const session: Session = {
        sessionId,
        userId,
        deviceInfo,
        createdAt: now,
        lastActivity: now,
        expiresAt,
        location,
      };

      await this.db.collection(this.collectionName).doc(sessionId).set({
        ...session,
        createdAt: firestore.Timestamp.fromDate(session.createdAt),
        lastActivity: firestore.Timestamp.fromDate(session.lastActivity),
        expiresAt: firestore.Timestamp.fromDate(session.expiresAt),
      });

      logger.info('Created session', { sessionId, userId });

      return session;
    } catch (error) {
      logger.error('Failed to create session', { error, userId });
      throw error;
    }
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<Session | null> {
    try {
      validate(sessionIdSchema, sessionId);

      const doc = await this.db.collection(this.collectionName).doc(sessionId).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      const session: Session = {
        sessionId: data.sessionId,
        userId: data.userId,
        deviceInfo: data.deviceInfo,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastActivity: data.lastActivity?.toDate() || new Date(),
        expiresAt: data.expiresAt?.toDate() || new Date(),
        location: data.location,
        revokedAt: data.revokedAt?.toDate(),
      };

      return session;
    } catch (error) {
      logger.error('Failed to get session', { error, sessionId });
      return null;
    }
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<Session[]> {
    try {
      validate(userIdSchema, userId);

      const snapshot = await this.db
        .collection(this.collectionName)
        .where('userId', '==', userId)
        .get();

      if (snapshot.empty) {
        return [];
      }

      const sessions: Session[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const session: Session = {
          sessionId: data.sessionId,
          userId: data.userId,
          deviceInfo: data.deviceInfo,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastActivity: data.lastActivity?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate() || new Date(),
          location: data.location,
          revokedAt: data.revokedAt?.toDate(),
        };

        // Only include active sessions
        if (!this.isSessionExpired(session) && !session.revokedAt) {
          sessions.push(session);
        }
      });

      // Sort by last activity (most recent first)
      sessions.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());

      return sessions;
    } catch (error) {
      logger.error('Failed to get user sessions', { error, userId });
      return [];
    }
  }

  /**
   * Update session activity
   */
  async updateActivity(sessionId: string, location?: GeolocationData): Promise<void> {
    try {
      validate(sessionIdSchema, sessionId);

      const doc = await this.db.collection(this.collectionName).doc(sessionId).get();
      
      if (!doc.exists) {
        return;
      }

      const data = doc.data()!;
      const lastActivity = data.lastActivity?.toDate() || new Date();
      const now = new Date();

      // Only update if enough time has passed since last activity
      if (now.getTime() - lastActivity.getTime() < this.activityUpdateThreshold) {
        return;
      }

      // Check if session is expired
      const expiresAt = data.expiresAt?.toDate();
      if (expiresAt && expiresAt < now) {
        return;
      }

      const updateData: any = {
        lastActivity: firestore.FieldValue.serverTimestamp(),
      };

      if (location) {
        updateData.location = location;
      }

      await this.db.collection(this.collectionName).doc(sessionId).update(updateData);

      logger.debug('Updated session activity', { sessionId });
    } catch (error) {
      logger.error('Failed to update session activity', { error, sessionId });
    }
  }

  /**
   * Revoke a session
   */
  async revokeSession(sessionId: string): Promise<void> {
    try {
      validate(sessionIdSchema, sessionId);

      const doc = await this.db.collection(this.collectionName).doc(sessionId).get();
      
      if (!doc.exists) {
        throw new NotFoundError('Session not found');
      }

      await this.db.collection(this.collectionName).doc(sessionId).update({
        revokedAt: firestore.FieldValue.serverTimestamp(),
        expiresAt: firestore.FieldValue.serverTimestamp(), // Expire immediately
      });

      logger.info('Revoked session', { sessionId });
    } catch (error) {
      logger.error('Failed to revoke session', { error, sessionId });
      throw error;
    }
  }

  /**
   * Revoke all sessions for a user
   */
  async revokeAllUserSessions(userId: string, exceptSessionId?: string): Promise<number> {
    try {
      validate(userIdSchema, userId);

      const snapshot = await this.db
        .collection(this.collectionName)
        .where('userId', '==', userId)
        .get();

      if (snapshot.empty) {
        return 0;
      }

      const batch = this.db.batch();
      let count = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        
        // Skip the current session if specified
        if (exceptSessionId && data.sessionId === exceptSessionId) {
          return;
        }

        // Skip already revoked sessions
        if (data.revokedAt) {
          return;
        }

        batch.update(doc.ref, {
          revokedAt: firestore.FieldValue.serverTimestamp(),
          expiresAt: firestore.FieldValue.serverTimestamp(),
        });
        count++;
      });

      if (count > 0) {
        await batch.commit();
        logger.info('Revoked user sessions', { userId, count });
      }

      return count;
    } catch (error) {
      logger.error('Failed to revoke user sessions', { error, userId });
      throw error;
    }
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const now = firestore.Timestamp.now();
      let totalDeleted = 0;

      // Process in batches to avoid memory issues
      const batchSize = 500;
      let hasMore = true;

      while (hasMore) {
        const snapshot = await this.db
          .collection(this.collectionName)
          .where('expiresAt', '<', now)
          .limit(batchSize)
          .get();

        if (snapshot.empty) {
          hasMore = false;
          break;
        }

        const batch = this.db.batch();
        
        snapshot.forEach(doc => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        totalDeleted += snapshot.size;

        hasMore = snapshot.size === batchSize;
      }

      if (totalDeleted > 0) {
        logger.info('Cleaned up expired sessions', { count: totalDeleted });
      }

      return totalDeleted;
    } catch (error) {
      logger.error('Failed to cleanup expired sessions', { error });
      return 0;
    }
  }

  /**
   * Get session by device fingerprint
   */
  async getSessionByFingerprint(
    userId: string,
    fingerprint: string
  ): Promise<Session | null> {
    try {
      validate(userIdSchema, userId);

      const snapshot = await this.db
        .collection(this.collectionName)
        .where('userId', '==', userId)
        .where('deviceInfo.fingerprint', '==', fingerprint)
        .get();

      if (snapshot.empty) {
        return null;
      }

      // Get the most recent session
      let mostRecent: Session | null = null;
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const session: Session = {
          sessionId: data.sessionId,
          userId: data.userId,
          deviceInfo: data.deviceInfo,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastActivity: data.lastActivity?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate() || new Date(),
          location: data.location,
          revokedAt: data.revokedAt?.toDate(),
        };

        if (!this.isSessionExpired(session) && !session.revokedAt) {
          if (!mostRecent || session.lastActivity > mostRecent.lastActivity) {
            mostRecent = session;
          }
        }
      });

      return mostRecent;
    } catch (error) {
      logger.error('Failed to get session by fingerprint', { error, userId });
      return null;
    }
  }

  /**
   * Validate session
   */
  async validateSession(sessionId: string, userId?: string): Promise<boolean> {
    try {
      const session = await this.getSession(sessionId);
      
      if (!session) {
        return false;
      }

      // Check if session belongs to the specified user
      if (userId && session.userId !== userId) {
        return false;
      }

      // Check if session is revoked
      if (session.revokedAt) {
        return false;
      }

      // Check if session is expired
      if (this.isSessionExpired(session)) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Failed to validate session', { error, sessionId });
      return false;
    }
  }

  /**
   * Extend session expiry
   */
  async extendSession(sessionId: string): Promise<void> {
    try {
      validate(sessionIdSchema, sessionId);

      const doc = await this.db.collection(this.collectionName).doc(sessionId).get();
      
      if (!doc.exists) {
        throw new NotFoundError('Session not found');
      }

      const data = doc.data()!;
      
      // Don't extend revoked sessions
      if (data.revokedAt) {
        return;
      }

      const newExpiresAt = new Date(Date.now() + this.sessionDuration);

      await this.db.collection(this.collectionName).doc(sessionId).update({
        expiresAt: firestore.Timestamp.fromDate(newExpiresAt),
        lastActivity: firestore.FieldValue.serverTimestamp(),
      });

      logger.info('Extended session', { sessionId });
    } catch (error) {
      logger.error('Failed to extend session', { error, sessionId });
      throw error;
    }
  }

  /**
   * Generate device fingerprint
   */
  private generateDeviceFingerprint(deviceInfo: DeviceInfo): string {
    const data = [
      deviceInfo.userAgent,
      deviceInfo.deviceType || 'unknown',
      deviceInfo.browser || 'unknown',
      deviceInfo.os || 'unknown',
    ].join('|');

    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Check if session is expired
   */
  private isSessionExpired(session: Session): boolean {
    return session.expiresAt < new Date();
  }

  /**
   * Update device last used time (for 2FA integration)
   */
  private async updateDeviceLastUsed(userId: string, deviceId?: string): Promise<void> {
    try {
      const userRef = this.db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return;
      }

      const userData = userDoc.data();
      const devices = (userData?.twoFactorDevices || []) as DeviceInfo[];
      
      // Update last used time for current device
      const updatedDevices = devices.map((device: any) => {
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
export const sessionService = new SessionService();