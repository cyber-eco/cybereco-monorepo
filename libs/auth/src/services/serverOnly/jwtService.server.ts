import jwt from 'jsonwebtoken';
import { createLogger } from '../../utils/logger';
import { InvalidTokenError, TokenExpiredError, InternalError } from '../../utils/errors';
import { validate, jwtTokenSchema, userIdSchema } from '../../utils/validation';

// Simple in-memory cache for client-side usage
// In production, this would use Redis on the server
class InMemoryCache {
  private cache = new Map<string, string>();
  
  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }
  
  async set(key: string, value: string, mode?: string, duration?: number): Promise<void> {
    this.cache.set(key, value);
    if (duration) {
      setTimeout(() => this.cache.delete(key), duration * 1000);
    }
  }
  
  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }
}

const logger = createLogger('JWTService');

export interface TokenPayload {
  userId: string;
  type: 'access' | 'refresh';
  [key: string]: any;
}

export interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
  iss?: string;
  sub?: string;
  aud?: string | string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

class JWTService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtIssuer: string;
  private readonly jwtAudience: string;
  private readonly accessTokenExpiry = '24h';
  private readonly refreshTokenExpiry = '7d';
  private cache: InMemoryCache;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || '';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || '';
    this.jwtIssuer = process.env.JWT_ISSUER || 'https://api.cybere.co';
    this.jwtAudience = process.env.JWT_AUDIENCE || 'https://cybere.co';

    if (!this.jwtSecret || !this.jwtRefreshSecret) {
      logger.error('JWT secrets not configured');
      throw new InternalError('JWT configuration missing');
    }

    // Initialize cache
    this.cache = new InMemoryCache();
    logger.info('Using in-memory cache for JWT service');
  }

  /**
   * Generate access and refresh tokens for a user
   */
  async generateTokens(userId: string, additionalClaims?: Record<string, any>): Promise<TokenPair> {
    try {
      validate(userIdSchema, userId);

      const accessTokenPayload: TokenPayload = {
        userId,
        type: 'access',
        ...additionalClaims,
      };

      const refreshTokenPayload: TokenPayload = {
        userId,
        type: 'refresh',
      };

      const accessToken = jwt.sign(accessTokenPayload, this.jwtSecret, {
        expiresIn: this.accessTokenExpiry,
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
        subject: userId,
      });

      const refreshToken = jwt.sign(refreshTokenPayload, this.jwtRefreshSecret, {
        expiresIn: this.refreshTokenExpiry,
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
        subject: userId,
      });

      logger.info('Generated token pair', { userId });

      return {
        accessToken,
        refreshToken,
        expiresIn: 86400, // 24 hours in seconds
      };
    } catch (error) {
      logger.error('Failed to generate tokens', { error, userId });
      throw error;
    }
  }

  /**
   * Verify and decode an access token
   */
  async verifyAccessToken(token: string): Promise<DecodedToken> {
    try {
      validate(jwtTokenSchema, token);

      const decoded = jwt.verify(token, this.jwtSecret, {
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
      }) as DecodedToken;

      if (decoded.type !== 'access') {
        throw new InvalidTokenError('Invalid token type');
      }

      // Check if token is revoked
      if (await this.isTokenRevoked(decoded.userId)) {
        throw new InvalidTokenError('Token has been revoked');
      }

      return decoded;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw error;
      }
      
      if (error instanceof jwt.TokenExpiredError || (error as any).name === 'TokenExpiredError') {
        throw new TokenExpiredError();
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        throw new InvalidTokenError('Invalid token');
      }

      logger.error('Token verification failed', { error });
      throw new InvalidTokenError('Token verification failed');
    }
  }

  /**
   * Verify and decode a refresh token
   */
  async verifyRefreshToken(token: string): Promise<DecodedToken> {
    try {
      validate(jwtTokenSchema, token);

      const decoded = jwt.verify(token, this.jwtRefreshSecret, {
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
      }) as DecodedToken;

      if (decoded.type !== 'refresh') {
        throw new InvalidTokenError('Invalid token type');
      }

      // Check if token is revoked
      if (await this.isTokenRevoked(decoded.userId)) {
        throw new InvalidTokenError('Token has been revoked');
      }

      return decoded;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw error;
      }
      
      if (error instanceof jwt.TokenExpiredError || (error as any).name === 'TokenExpiredError') {
        throw new TokenExpiredError('Refresh token expired');
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        throw new InvalidTokenError('Invalid refresh token');
      }

      logger.error('Refresh token verification failed', { error });
      throw new InvalidTokenError('Refresh token verification failed');
    }
  }

  /**
   * Refresh tokens using a valid refresh token
   */
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const decoded = await this.verifyRefreshToken(refreshToken);
      
      // Generate new token pair
      const newTokens = await this.generateTokens(decoded.userId || decoded.sub!);
      
      logger.info('Refreshed tokens', { userId: decoded.userId });
      
      return newTokens;
    } catch (error) {
      logger.error('Token refresh failed', { error });
      throw error;
    }
  }

  /**
   * Revoke all tokens for a user
   */
  async revokeTokens(userId: string): Promise<void> {
    try {
      validate(userIdSchema, userId);

      const key = `revoked:${userId}`;
      await this.cache.set(key, Date.now().toString(), 'EX', 604800); // 7 days
      
      logger.info('Revoked tokens', { userId });
    } catch (error) {
      logger.error('Failed to revoke tokens', { error, userId });
      throw error;
    }
  }

  /**
   * Check if a user's tokens are revoked
   */
  async isTokenRevoked(userId: string): Promise<boolean> {
    try {
      const revoked = await this.cache.get(`revoked:${userId}`);
      return revoked !== null;
    } catch (error) {
      logger.error('Failed to check token revocation', { error, userId });
      return false;
    }
  }

  /**
   * Decode a token without verification (unsafe)
   */
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwt.decode(token) as DecodedToken;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get token expiry time
   */
  getTokenExpiry(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    // No cleanup needed for in-memory cache
  }
}

// Export singleton instance
export const jwtService = new JWTService();