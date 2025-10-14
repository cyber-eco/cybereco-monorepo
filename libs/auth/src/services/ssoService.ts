import { createLogger } from '../utils/logger';

const logger = createLogger('SSOService');

export interface SSOToken {
  token: string;
  expiresAt: Date;
  appId: string;
  userId: string;
  permissions: string[];
  metadata?: Record<string, any>;
}

export interface SSOClaims {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  appId: string;
  permissions: string[];
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface SSOSessionInfo {
  sessionId: string;
  userId: string;
  appId: string;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
}

// Client-side stub implementation
class SSOService {
  async generateSSOToken(claims: SSOClaims, expiresIn?: number): Promise<SSOToken> {
    logger.warn('SSOService.generateSSOToken called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async validateSSOToken(token: string, appId: string): Promise<SSOClaims | null> {
    logger.warn('SSOService.validateSSOToken called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async createSSOSession(token: string): Promise<SSOSessionInfo> {
    logger.warn('SSOService.createSSOSession called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async getSSOSession(sessionId: string): Promise<SSOSessionInfo | null> {
    logger.warn('SSOService.getSSOSession called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async revokeSSOToken(token: string): Promise<void> {
    logger.warn('SSOService.revokeSSOToken called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async getUserSSOSessions(userId: string): Promise<SSOSessionInfo[]> {
    logger.warn('SSOService.getUserSSOSessions called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async revokeUserSSOSessions(userId: string, appId?: string): Promise<number> {
    logger.warn('SSOService.revokeUserSSOSessions called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async cleanupExpiredSessions(): Promise<number> {
    logger.warn('SSOService.cleanupExpiredSessions called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async getAppPermissions(appId: string): Promise<string[]> {
    logger.warn('SSOService.getAppPermissions called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }

  async validateAppAccess(userId: string, appId: string): Promise<boolean> {
    logger.warn('SSOService.validateAppAccess called on client - use API routes instead');
    throw new Error('SSO operations must be performed server-side');
  }
}

// Export singleton instance
export const ssoService = new SSOService();