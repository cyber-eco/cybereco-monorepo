import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../utils/logger';
import { NotFoundError, ValidationError } from '../utils/errors';
import { validate, userIdSchema, sessionIdSchema } from '../utils/validation';

const logger = createLogger('SessionService');

export interface DeviceInfo {
  userAgent: string;
  ipAddress: string;
  fingerprint?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser?: string;
  os?: string;
}

export interface GeolocationData {
  city?: string;
  country?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

export interface Session {
  sessionId: string;
  userId: string;
  deviceInfo: DeviceInfo;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  location?: GeolocationData;
  revokedAt?: Date;
}

// Client-side stub implementation
class SessionService {
  private readonly sessionDuration = 30 * 24 * 60 * 60 * 1000; // 30 days

  async createSession(
    userId: string,
    deviceInfo: DeviceInfo,
    location?: GeolocationData
  ): Promise<Session> {
    logger.warn('SessionService.createSession called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  async getSession(sessionId: string): Promise<Session | null> {
    logger.warn('SessionService.getSession called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    logger.warn('SessionService.getUserSessions called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  async updateActivity(sessionId: string, location?: GeolocationData): Promise<void> {
    logger.warn('SessionService.updateActivity called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  async revokeSession(sessionId: string): Promise<void> {
    logger.warn('SessionService.revokeSession called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  async revokeAllUserSessions(userId: string, exceptSessionId?: string): Promise<number> {
    logger.warn('SessionService.revokeAllUserSessions called on client - use API routes instead');
    throw new Error('Session operations must be performed server-side');
  }

  private isSessionExpired(session: Session): boolean {
    return session.expiresAt < new Date() || !!session.revokedAt;
  }
}

// Export singleton instance
export const sessionService = new SessionService();