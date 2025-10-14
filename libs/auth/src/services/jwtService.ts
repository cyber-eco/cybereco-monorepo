import { createLogger } from '../utils/logger';

const logger = createLogger('JWTService');

export interface TokenPayload {
  userId: string;
  email: string;
  roles?: string[];
  permissions?: string[];
  sessionId?: string;
}

export interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  aud: string | string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

// Client-side stub implementation
class JWTService {
  async generateTokens(payload: TokenPayload): Promise<TokenPair> {
    logger.warn('JWTService.generateTokens called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async verifyAccessToken(token: string): Promise<DecodedToken> {
    logger.warn('JWTService.verifyAccessToken called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async verifyRefreshToken(token: string): Promise<DecodedToken> {
    logger.warn('JWTService.verifyRefreshToken called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    logger.warn('JWTService.refreshTokens called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async revokeTokens(userId: string, sessionId?: string): Promise<void> {
    logger.warn('JWTService.revokeTokens called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async isTokenRevoked(tokenId: string): Promise<boolean> {
    logger.warn('JWTService.isTokenRevoked called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  decodeToken(token: string): DecodedToken | null {
    logger.warn('JWTService.decodeToken called on client - use API routes instead');
    return null;
  }

  async validateTokenPermissions(token: string, requiredPermissions: string[]): Promise<boolean> {
    logger.warn('JWTService.validateTokenPermissions called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async getActiveTokens(userId: string): Promise<string[]> {
    logger.warn('JWTService.getActiveTokens called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }

  async cleanupExpiredTokens(): Promise<number> {
    logger.warn('JWTService.cleanupExpiredTokens called on client - use API routes instead');
    throw new Error('JWT operations must be performed server-side');
  }
}

// Export singleton instance
export const jwtService = new JWTService();