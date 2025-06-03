import type { AuthUser } from '@cybereco/shared-types';

interface AuthToken {
  user: AuthUser;
  timestamp: number;
  expires: number;
  signature: string;
}

// Simple but secure token generation for auth data passing
export class AuthTokenService {
  private static readonly TOKEN_EXPIRY_MS = 30 * 1000; // 30 seconds
  private static readonly SECRET_KEY = 'cybereco-hub-auth-2025'; // In production, use env variable

  // Generate a simple hash for integrity check
  private static async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Create a secure auth token
  static async createAuthToken(user: AuthUser): Promise<string> {
    const timestamp = Date.now();
    const expires = timestamp + this.TOKEN_EXPIRY_MS;
    
    const tokenData = {
      user,
      timestamp,
      expires
    };

    // Create signature for integrity
    const dataString = JSON.stringify(tokenData);
    const signature = await this.generateHash(dataString + this.SECRET_KEY);

    const token: AuthToken = {
      ...tokenData,
      signature
    };

    // Encode as base64url for URL safety
    const tokenString = JSON.stringify(token);
    const base64 = btoa(tokenString);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  // Verify and decode auth token
  static async verifyAuthToken(tokenString: string): Promise<AuthUser | null> {
    try {
      // Decode from base64url
      const base64 = tokenString.replace(/-/g, '+').replace(/_/g, '/');
      const padding = '='.repeat((4 - (base64.length % 4)) % 4);
      const decoded = atob(base64 + padding);
      const token: AuthToken = JSON.parse(decoded);

      // Check expiry
      if (Date.now() > token.expires) {
        console.warn('Auth token expired');
        return null;
      }

      // Verify signature
      const { signature, ...tokenData } = token;
      const dataString = JSON.stringify(tokenData);
      const expectedSignature = await this.generateHash(dataString + this.SECRET_KEY);

      if (signature !== expectedSignature) {
        console.error('Auth token signature mismatch');
        return null;
      }

      return token.user;
    } catch (error) {
      console.error('Failed to verify auth token:', error);
      return null;
    }
  }

  // Generate app launch URL with auth token
  static async generateAppUrl(appUrl: string, user: AuthUser, appId: string): Promise<string> {
    const token = await this.createAuthToken(user);
    const url = new URL(appUrl);
    
    // Add auth token and metadata
    url.searchParams.set('authToken', token);
    url.searchParams.set('fromHub', 'true');
    url.searchParams.set('appId', appId);
    url.searchParams.set('timestamp', Date.now().toString());
    
    console.log('🔐 AuthTokenService: Generated auth token for', user.email);
    console.log('🔐 AuthTokenService: Token length:', token.length);
    console.log('🔐 AuthTokenService: Target URL:', url.toString());
    
    return url.toString();
  }
}