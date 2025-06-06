import { v4 as uuidv4 } from 'uuid';
import { jwtService } from './jwtService.server';
import { createLogger } from '../../utils/logger';
import { AuthenticationError, ValidationError } from '../../utils/errors';
import { validate, userIdSchema } from '../../utils/validation';

// Simple in-memory store for client-side usage
// In production, this would use Redis on the server
class InMemoryStore {
  private store = new Map<string, any>();
  
  async get(key: string): Promise<string | null> {
    const value = this.store.get(key);
    return value ? JSON.stringify(value) : null;
  }
  
  async set(key: string, value: string, mode?: string, duration?: number): Promise<void> {
    try {
      this.store.set(key, JSON.parse(value));
    } catch {
      this.store.set(key, value);
    }
    if (duration) {
      setTimeout(() => this.store.delete(key), duration * 1000);
    }
  }
  
  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

const logger = createLogger('SSOService');

export interface SSOToken {
  token: string;
  expiresIn: number;
}

export interface SSOClaims {
  userId: string;
  sourceApp: string;
  targetApp: string;
  ssoSession: string;
  permissions?: string[];
}

export interface SSOSessionInfo {
  sessionId: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  sourceApp: string;
  activeApps: string[];
}

class SSOService {
  private store: InMemoryStore;
  private readonly ssoTokenExpiry = 300; // 5 minutes
  private readonly allowedApps = ['hub', 'justsplit', 'website', 'somos', 'demos', 'plantopia'];
  
  private readonly appDomains = {
    development: {
      hub: 'http://localhost:40000',
      justsplit: 'http://localhost:40002',
      website: 'http://localhost:40001',
      somos: 'http://localhost:40003',
      demos: 'http://localhost:40004',
      plantopia: 'http://localhost:40005',
    },
    production: {
      hub: 'https://hub.cybere.co',
      justsplit: 'https://justsplit.cybere.co',
      website: 'https://cybere.co',
      somos: 'https://somos.cybere.co',
      demos: 'https://demos.cybere.co',
      plantopia: 'https://plantopia.cybere.co',
    },
  };

  constructor() {
    if (process.env.REDIS_URL) {
      this.redis = new Redis(process.env.REDIS_URL);
      this.redis.on('error', (err) => {
        logger.error('Redis connection error', { error: err.message });
      });
    }
  }

  /**
   * Generate an SSO token for cross-app authentication
   */
  async generateSSOToken(
    userId: string,
    sourceApp: string,
    targetApp: string,
    permissions?: string[]
  ): Promise<SSOToken> {
    try {
      // Validate inputs
      validate(userIdSchema, userId);
      this.validateAppName(sourceApp);
      this.validateAppName(targetApp);

      const ssoSession = uuidv4();
      const claims: SSOClaims = {
        userId,
        sourceApp,
        targetApp,
        ssoSession,
        permissions,
        iat: Math.floor(Date.now() / 1000),
      };

      // Generate token with short expiry
      const { accessToken } = await jwtService.generateTokens(userId, claims);

      // Store session info in Redis
      if (this.redis) {
        const sessionKey = `sso:session:${ssoSession}`;
        const sessionInfo: SSOSessionInfo = {
          sessionId: ssoSession,
          userId,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + this.ssoTokenExpiry * 1000),
          sourceApp,
          activeApps: [sourceApp, targetApp],
        };

        await this.redis.setex(
          sessionKey,
          this.ssoTokenExpiry,
          JSON.stringify(sessionInfo)
        );
      }

      logger.info('Generated SSO token', { userId, sourceApp, targetApp, ssoSession });

      return {
        token: accessToken,
        expiresIn: this.ssoTokenExpiry,
      };
    } catch (error) {
      logger.error('Failed to generate SSO token', { error, userId, sourceApp, targetApp });
      throw error;
    }
  }

  /**
   * Verify an SSO token
   */
  async verifySSOToken(token: string, expectedTargetApp: string): Promise<SSOClaims> {
    try {
      const decoded = await jwtService.verifyAccessToken(token);

      // Verify SSO claims exist
      if (!decoded.sourceApp || !decoded.targetApp || !decoded.ssoSession) {
        throw new AuthenticationError('Invalid SSO token');
      }

      // Verify target app matches
      if (decoded.targetApp !== expectedTargetApp) {
        throw new AuthenticationError('Token not valid for this application');
      }

      // Check session validity in Redis
      if (this.redis) {
        const sessionKey = `sso:session:${decoded.ssoSession}`;
        const sessionData = await this.redis.get(sessionKey);
        
        if (!sessionData) {
          throw new AuthenticationError('SSO session expired or invalid');
        }
      }

      logger.info('Verified SSO token', { 
        userId: decoded.userId, 
        sourceApp: decoded.sourceApp,
        targetApp: decoded.targetApp 
      });

      return {
        userId: decoded.userId,
        sourceApp: decoded.sourceApp,
        targetApp: decoded.targetApp,
        ssoSession: decoded.ssoSession,
        permissions: decoded.permissions,
      };
    } catch (error) {
      logger.error('SSO token verification failed', { error });
      throw error;
    }
  }

  /**
   * Generate redirect URL for SSO flow
   */
  generateRedirectUrl(targetApp: string, token: string, returnPath?: string): string {
    const env = process.env.NODE_ENV || 'development';
    const baseUrl = this.getAppUrl(targetApp);
    
    const params = new URLSearchParams({
      ssoToken: token,
    });

    if (returnPath) {
      params.append('returnPath', returnPath);
    }

    return `${baseUrl}/auth/sso/callback?${params.toString()}`;
  }

  /**
   * Validate return URL to prevent open redirects
   */
  validateReturnUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      const env = process.env.NODE_ENV || 'development';

      // In development, allow localhost
      if (env === 'development') {
        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
          return true;
        }
      }

      // Check against allowed domains
      const allowedDomains = [
        'cybere.co',
        'hub.cybere.co',
        'justsplit.cybere.co',
        'somos.cybere.co',
        'demos.cybere.co',
        'plantopia.cybere.co',
        'www.cybere.co',
      ];

      return allowedDomains.some(domain => 
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  }

  /**
   * Handle SSO callback
   */
  async handleSSOCallback(token: string, targetApp: string): Promise<{
    success: boolean;
    userId?: string;
    session?: string;
    error?: string;
  }> {
    try {
      const claims = await this.verifySSOToken(token, targetApp);
      
      // Mark app as active in session
      if (this.redis && claims.ssoSession) {
        const sessionKey = `sso:session:${claims.ssoSession}`;
        const sessionData = await this.redis.get(sessionKey);
        
        if (sessionData) {
          const session = JSON.parse(sessionData) as SSOSessionInfo;
          if (!session.activeApps.includes(targetApp)) {
            session.activeApps.push(targetApp);
            await this.redis.setex(
              sessionKey,
              this.ssoTokenExpiry,
              JSON.stringify(session)
            );
          }
        }
      }

      return {
        success: true,
        userId: claims.userId,
        session: claims.ssoSession,
      };
    } catch (error) {
      logger.error('SSO callback failed', { error });
      return {
        success: false,
        error: 'Invalid or expired SSO token',
      };
    }
  }

  /**
   * Revoke an SSO session
   */
  async revokeSSOSession(sessionId: string): Promise<void> {
    if (this.redis) {
      const sessionKey = `sso:session:${sessionId}`;
      await this.redis.del(sessionKey);
      logger.info('Revoked SSO session', { sessionId });
    }
  }

  /**
   * Get SSO session information
   */
  async getSSOSessionInfo(sessionId: string): Promise<SSOSessionInfo | null> {
    if (!this.redis) {
      return null;
    }

    const sessionKey = `sso:session:${sessionId}`;
    const sessionData = await this.redis.get(sessionKey);

    if (!sessionData) {
      return null;
    }

    return JSON.parse(sessionData) as SSOSessionInfo;
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      // Use Redis SCAN to find expired sessions
      const stream = this.redis.scanStream({
        match: 'sso:session:*',
        count: 100,
      });

      stream.on('data', async (keys: string[]) => {
        for (const key of keys) {
          const ttl = await this.redis.ttl(key);
          if (ttl === -2) {
            // Key doesn't exist (already expired)
            continue;
          }
          if (ttl === -1) {
            // Key exists but has no TTL (shouldn't happen)
            await this.redis.del(key);
          }
        }
      });

      stream.on('end', () => {
        logger.info('Completed SSO session cleanup');
      });
    } catch (error) {
      logger.error('Failed to cleanup SSO sessions', { error });
    }
  }

  /**
   * Validate app name
   */
  private validateAppName(appName: string): void {
    if (!this.allowedApps.includes(appName)) {
      throw new ValidationError(`Invalid app name: ${appName}`);
    }
  }

  /**
   * Get app URL based on environment
   */
  private getAppUrl(appName: string): string {
    const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    
    // Check for environment variable override
    const envVarName = `${appName.toUpperCase()}_URL`;
    if (process.env[envVarName]) {
      return process.env[envVarName];
    }

    return this.appDomains[env][appName as keyof typeof this.appDomains.development];
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}

// Export singleton instance
export const ssoService = new SSOService();