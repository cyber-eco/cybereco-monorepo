import { getHubAuth } from '@cybereco/firebase-config';

/**
 * Token service for cross-app authentication
 * 
 * In production, this would:
 * 1. Create custom tokens server-side
 * 2. Verify tokens with proper security
 * 
 * For development with emulators, we use ID tokens
 * and rely on shared localStorage for auth state
 */

export async function createAppToken(): Promise<string | null> {
  try {
    const auth = getHubAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('No authenticated user');
      return null;
    }

    // Get the ID token
    const idToken = await user.getIdToken();
    
    // In production, you would:
    // 1. Send this ID token to your backend
    // 2. Verify the ID token server-side
    // 3. Create a custom token for the target app
    // 4. Return the custom token
    
    // For development, we'll use the ID token directly
    // and rely on shared auth state
    return idToken;
  } catch (error) {
    console.error('Error creating app token:', error);
    return null;
  }
}

export function generateAppUrl(appUrl: string, token: string | null): string {
  if (!token) {
    return appUrl;
  }
  
  const url = new URL(appUrl);
  url.searchParams.set('token', token);
  
  // Also set a flag in localStorage to indicate auth is available
  // This helps JustSplit know to wait for auth state
  try {
    // Note: localStorage might not be shared across different ports
    localStorage.setItem('cybereco-auth-pending', 'true');
    
    // Also add user info to the URL as a workaround
    const auth = getHubAuth();
    const user = auth.currentUser;
    if (user) {
      // Add minimal user info to help JustSplit bootstrap
      url.searchParams.set('uid', user.uid);
      url.searchParams.set('email', user.email || '');
      url.searchParams.set('name', user.displayName || '');
    }
  } catch (error) {
    console.error('Error setting auth pending flag:', error);
  }
  
  return url.toString();
}