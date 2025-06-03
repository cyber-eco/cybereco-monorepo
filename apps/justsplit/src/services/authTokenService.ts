import type { AuthUser } from '@cybereco/shared-types';
import { saveSharedAuthState } from '@cybereco/auth';
import { debugLog } from '../utils/debug-auth';

interface AuthToken {
  user: AuthUser;
  timestamp: number;
  expires: number;
  signature: string;
}

// Handle auth tokens from Hub
export class AuthTokenService {
  private static readonly SECRET_KEY = 'cybereco-hub-auth-2025'; // Must match Hub's secret

  // Generate a simple hash for integrity check
  private static async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Verify and decode auth token from URL
  static async verifyAuthToken(tokenString: string): Promise<AuthUser | null> {
    try {
      // Decode from base64url
      const base64 = tokenString.replace(/-/g, '+').replace(/_/g, '/');
      const padding = '='.repeat((4 - (base64.length % 4)) % 4);
      const decoded = atob(base64 + padding);
      const token: AuthToken = JSON.parse(decoded);

      // Check expiry
      if (Date.now() > token.expires) {
        debugLog('AuthTokenService', 'Auth token expired');
        return null;
      }

      // Verify signature
      const { signature, ...tokenData } = token;
      const dataString = JSON.stringify(tokenData);
      const expectedSignature = await this.generateHash(dataString + this.SECRET_KEY);

      if (signature !== expectedSignature) {
        debugLog('AuthTokenService', 'Auth token signature mismatch');
        return null;
      }

      debugLog('AuthTokenService', 'Auth token verified successfully', token.user);
      return token.user;
    } catch (error) {
      debugLog('AuthTokenService', 'Failed to verify auth token', error);
      return null;
    }
  }

  // Process auth token from URL and save to shared auth
  static async processUrlAuthToken(): Promise<AuthUser | null> {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authToken');
    const fromHub = urlParams.get('fromHub');
    const appId = urlParams.get('appId');

    debugLog('AuthTokenService', 'Checking URL params', { 
      hasAuthToken: !!authToken,
      authTokenLength: authToken?.length || 0,
      fromHub,
      appId,
      allParams: Array.from(urlParams.entries())
    });

    if (!authToken || fromHub !== 'true') {
      debugLog('AuthTokenService', 'No valid auth token in URL');
      return null;
    }

    debugLog('AuthTokenService', 'Processing auth token from URL', { appId, fromHub, tokenLength: authToken.length });

    try {
      // Verify and decode the auth token
      const authUser = await this.verifyAuthToken(authToken);
      
      if (authUser) {
        debugLog('AuthTokenService', 'Successfully verified auth token', authUser);
        
        // Save to shared auth state
        await saveSharedAuthState(authUser);
        debugLog('AuthTokenService', 'Saved auth to shared state', authUser);

        // Also save to localStorage as backup
        localStorage.setItem('hub-auth-backup', JSON.stringify({
          user: authUser,
          timestamp: Date.now()
        }));
        debugLog('AuthTokenService', 'Saved auth backup to localStorage');

        // Clear sensitive URL parameters
        const url = new URL(window.location.href);
        url.searchParams.delete('authToken');
        url.searchParams.delete('fromHub');
        url.searchParams.delete('appId');
        url.searchParams.delete('timestamp');
        window.history.replaceState({}, '', url.toString());
        debugLog('AuthTokenService', 'Cleared auth token from URL');

        return authUser;
      } else {
        debugLog('AuthTokenService', 'Auth token verification failed');
      }
    } catch (error) {
      debugLog('AuthTokenService', 'Error processing auth token', error);
    }

    return null;
  }

  // Get auth from backup if available
  static getBackupAuth(): AuthUser | null {
    if (typeof window === 'undefined') return null;

    try {
      const backup = localStorage.getItem('hub-auth-backup');
      if (!backup) return null;

      const { user, timestamp } = JSON.parse(backup);
      
      // Check if backup is less than 5 minutes old
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        debugLog('AuthTokenService', 'Using backup auth', user);
        return user;
      }

      // Clear expired backup
      localStorage.removeItem('hub-auth-backup');
    } catch (error) {
      debugLog('AuthTokenService', 'Error reading backup auth', error);
    }

    return null;
  }
}