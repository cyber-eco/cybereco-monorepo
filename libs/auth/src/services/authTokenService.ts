/**
 * Simple auth token service for lightweight apps
 */

const AUTH_STORAGE_KEY = 'cybereco-app-auth';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export interface AuthUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string | null;
  emailVerified?: boolean;
  permissions?: string[];
  apps?: string[];
}

export class AuthTokenService {
  private static readonly SECRET_KEY = 'cybereco-hub-auth-2025';

  /**
   * Process auth token from URL and store locally
   */
  static async processUrlAuthToken(): Promise<AuthUser | null> {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authToken');
    const fromHub = urlParams.get('fromHub');

    if (!authToken || fromHub !== 'true') {
      return null;
    }

    try {
      // Decode from base64url
      const base64 = authToken.replace(/-/g, '+').replace(/_/g, '/');
      const padding = '='.repeat((4 - (base64.length % 4)) % 4);
      const decoded = atob(base64 + padding);
      const token = JSON.parse(decoded);

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

      // Store auth locally
      this.storeAuth(token.user);

      // Clear URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('authToken');
      url.searchParams.delete('fromHub');
      url.searchParams.delete('appId');
      url.searchParams.delete('timestamp');
      window.history.replaceState({}, '', url.toString());

      return token.user;
    } catch (error) {
      console.error('Failed to process auth token:', error);
      return null;
    }
  }

  /**
   * Get stored auth if still valid
   */
  static getStoredAuth(): AuthUser | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;

      const { user, timestamp } = JSON.parse(stored);
      
      // Check if still valid (24 hours)
      if (Date.now() - timestamp > TOKEN_EXPIRY) {
        this.clearAuth();
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error reading stored auth:', error);
      return null;
    }
  }

  /**
   * Store auth locally
   */
  private static storeAuth(user: AuthUser): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      user,
      timestamp: Date.now()
    }));
  }

  /**
   * Clear stored auth
   */
  static clearAuth(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  /**
   * Generate hash for signature verification
   */
  private static async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}