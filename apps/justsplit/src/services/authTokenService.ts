import type { AuthUser } from '@cybereco/shared-types';
import { saveSharedAuthState, JWTAuthService } from '@cybereco/auth';
import { debugLog } from '../utils/debug-auth';

// Handle JWT auth tokens from Hub
export class AuthTokenService {
  private static jwtService = JWTAuthService.getInstance();

  // Verify and decode JWT auth token from URL
  static async verifyAuthToken(tokenString: string): Promise<AuthUser | null> {
    try {
      // Verify JWT token
      const decoded = this.jwtService.verifyToken(tokenString);
      
      if (!decoded) {
        debugLog('AuthTokenService', 'Invalid or expired auth token');
        return null;
      }

      // Reconstruct AuthUser from JWT payload
      const user: AuthUser = {
        uid: decoded.sub,
        email: decoded.email || '',
        displayName: decoded.name || '',
        photoURL: null,
        emailVerified: true,
        permissions: decoded.permissions || [],
        apps: decoded.apps || []
      };

      debugLog('AuthTokenService', 'Auth token verified successfully', user);
      return user;
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