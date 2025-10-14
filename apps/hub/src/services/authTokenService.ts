import { type AuthUser, createLogger } from '@cybereco/auth';
import { getHubAuth } from '@cybereco/firebase-config';

const logger = createLogger('AuthTokenService');

// JWT-based secure token generation for auth data passing
export class AuthTokenService {

  // Generate app launch URL with auth token
  static async generateAppUrl(appUrl: string, user: AuthUser, appId: string): Promise<string> {
    try {
      // Get current user's ID token for API authentication
      const auth = getHubAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('No authenticated user');
      }
      
      const idToken = await currentUser.getIdToken();
      
      // Call API route to generate auth token
      const response = await fetch('/api/auth/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ appId, appUrl })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate auth token');
      }
      
      const { url } = await response.json();
      
      logger.info('Generated auth URL', {
        userEmail: user.email,
        targetUrl: url,
        appId
      });
      
      return url;
    } catch (error) {
      logger.error('Failed to generate app URL:', error);
      throw error;
    }
  }
}