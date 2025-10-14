import jwt from 'jsonwebtoken';
import { AuthUser } from './authTokenService';

// JWT configuration
const JWT_SECRET = process.env.NEXT_PUBLIC_AUTH_SECRET || 'development-secret-key-min-32-characters-long';
const JWT_ISSUER = 'cybereco-hub';
const JWT_AUDIENCE = ['cybereco-hub', 'cybereco-justsplit', 'cybereco-website'];
const JWT_EXPIRY = '1h'; // 1 hour
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

export interface JWTPayload {
  sub: string; // User ID
  email: string;
  name: string;
  iss: string; // Issuer
  aud: string[]; // Audience
  iat: number; // Issued at
  exp: number; // Expiry
  permissions?: string[];
  apps?: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class JWTAuthService {
  private static instance: JWTAuthService;

  private constructor() {}

  static getInstance(): JWTAuthService {
    if (!JWTAuthService.instance) {
      JWTAuthService.instance = new JWTAuthService();
    }
    return JWTAuthService.instance;
  }

  /**
   * Generate a JWT token pair for a user
   */
  generateTokenPair(user: AuthUser): TokenPair {
    const now = Math.floor(Date.now() / 1000);
    
    // Access token payload
    const accessPayload: JWTPayload = {
      sub: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      iat: now,
      exp: now + 3600, // 1 hour
      permissions: user.permissions || [],
      apps: user.apps || []
    };

    // Refresh token payload (minimal data)
    const refreshPayload = {
      sub: user.uid,
      type: 'refresh',
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      iat: now,
      exp: now + 604800 // 7 days
    };

    const accessToken = jwt.sign(accessPayload, JWT_SECRET, {
      algorithm: 'HS256'
    });

    const refreshToken = jwt.sign(refreshPayload, JWT_SECRET + '-refresh', {
      algorithm: 'HS256'
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    };
  }

  /**
   * Verify and decode a JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        algorithms: ['HS256']
      }) as JWTPayload;

      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }

  /**
   * Verify a refresh token
   */
  verifyRefreshToken(token: string): { sub: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET + '-refresh', {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        algorithms: ['HS256']
      }) as any;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return { sub: decoded.sub };
    } catch (error) {
      console.error('Refresh token verification failed:', error);
      return null;
    }
  }

  /**
   * Refresh an access token using a refresh token
   */
  async refreshAccessToken(refreshToken: string, getUserData: (userId: string) => Promise<AuthUser | null>): Promise<TokenPair | null> {
    const decoded = this.verifyRefreshToken(refreshToken);
    if (!decoded) {
      return null;
    }

    // Get fresh user data
    const user = await getUserData(decoded.sub);
    if (!user) {
      return null;
    }

    // Generate new token pair
    return this.generateTokenPair(user);
  }

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Create a secure HTTP-only cookie string for the token
   */
  createSecureCookie(name: string, value: string, maxAge: number): string {
    const isProduction = process.env.NODE_ENV === 'production';
    const secure = isProduction ? '; Secure' : '';
    const sameSite = '; SameSite=Strict';
    const httpOnly = '; HttpOnly';
    const path = '; Path=/';
    const maxAgeStr = `; Max-Age=${maxAge}`;
    
    return `${name}=${value}${path}${maxAgeStr}${httpOnly}${secure}${sameSite}`;
  }

  /**
   * Parse cookies from cookie string
   */
  parseCookies(cookieString: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    if (!cookieString) return cookies;

    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });

    return cookies;
  }

  /**
   * Generate a CSRF token for additional security
   */
  generateCSRFToken(): string {
    const token = jwt.sign(
      { 
        type: 'csrf',
        nonce: Math.random().toString(36).substring(2),
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { 
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    );
    return token;
  }

  /**
   * Verify CSRF token
   */
  verifyCSRFToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256']
      }) as any;
      return decoded.type === 'csrf';
    } catch {
      return false;
    }
  }

  /**
   * Check if token is expired or will expire soon
   */
  isTokenExpiringSoon(token: string, bufferSeconds: number = 300): boolean {
    try {
      const decoded = jwt.decode(token) as JWTPayload;
      if (!decoded || !decoded.exp) {
        return true;
      }
      
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp - now <= bufferSeconds;
    } catch {
      return true;
    }
  }
}