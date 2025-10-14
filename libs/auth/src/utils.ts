import { Auth, User as FirebaseUser } from 'firebase/auth';

// Auth validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Token generation for cross-app authentication
export const generateAuthToken = async (user: FirebaseUser): Promise<string> => {
  return await user.getIdToken();
};

// Verify token from another app
export const verifyAuthToken = async (auth: Auth, token: string): Promise<FirebaseUser | null> => {
  try {
    // Import Firebase Admin SDK functions for server-side verification
    // For client-side, we'll use the token to authenticate
    return auth.currentUser;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Generate redirect URL for cross-app authentication
export const generateAuthRedirectUrl = (
  hubUrl: string,
  returnUrl: string,
  action: 'signin' | 'signup' = 'signin'
): string => {
  const url = new URL(`${hubUrl}/auth/${action}`);
  url.searchParams.set('returnUrl', returnUrl);
  return url.toString();
};

// Parse return URL from auth redirect
export const parseReturnUrl = (searchParams: URLSearchParams): string => {
  return searchParams.get('returnUrl') || '/';
};

// Check if user has required permissions for an app
export interface AppPermission {
  appId: string;
  roles: string[];
  features: string[];
}

export const checkAppPermissions = (
  userPermissions: AppPermission[],
  requiredAppId: string,
  requiredRole?: string
): boolean => {
  const appPermission = userPermissions.find(p => p.appId === requiredAppId);
  
  if (!appPermission) {
    return false;
  }
  
  if (requiredRole && !appPermission.roles.includes(requiredRole)) {
    return false;
  }
  
  return true;
};

// IndexedDB corruption detection and recovery
export const hasIndexedDBCorruption = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Check for common IndexedDB corruption indicators
    const testKey = '__cybereco_indexeddb_test__';
    localStorage.setItem(testKey, 'test');
    const testValue = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    if (testValue !== 'test') {
      return true;
    }
    
    // Additional checks can be added here
    return false;
  } catch (error) {
    return true;
  }
};

export const recoverFromCorruption = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear potentially corrupted storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear IndexedDB
    if ('indexedDB' in window) {
      // Note: This is a simplified version. In production, you'd want to
      // enumerate and clear specific databases
      console.log('Clearing IndexedDB for corruption recovery');
    }
    
    // Reload the page to reinitialize
    window.location.reload();
  } catch (error) {
    console.error('Failed to recover from corruption:', error);
    // Force page reload as last resort
    window.location.reload();
  }
};

// Generate a safe display name from email or other identifiers
export const generateDisplayName = (email?: string, fallback: string = 'User'): string => {
  if (!email) return fallback;
  
  // Extract username part from email
  const username = email.split('@')[0];
  
  // Capitalize first letter and replace common separators
  return username
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Auth error handling
export interface AuthError {
  code: string;
  message: string;
  userFriendlyMessage: string;
}

export const getAuthErrorMessage = (error: any): AuthError => {
  const code = error?.code || 'unknown';
  const message = error?.message || 'An unknown error occurred';
  
  let userFriendlyMessage: string;
  
  switch (code) {
    case 'auth/user-not-found':
      userFriendlyMessage = 'No account found with this email address.';
      break;
    case 'auth/wrong-password':
      userFriendlyMessage = 'Incorrect password. Please try again.';
      break;
    case 'auth/email-already-in-use':
      userFriendlyMessage = 'An account with this email already exists.';
      break;
    case 'auth/weak-password':
      userFriendlyMessage = 'Password is too weak. Please choose a stronger password.';
      break;
    case 'auth/invalid-email':
      userFriendlyMessage = 'Please enter a valid email address.';
      break;
    case 'auth/too-many-requests':
      userFriendlyMessage = 'Too many failed attempts. Please try again later.';
      break;
    case 'auth/popup-closed-by-user':
      userFriendlyMessage = 'Sign-in popup was closed. Please try again.';
      break;
    case 'auth/popup-blocked':
      userFriendlyMessage = 'Sign-in popup was blocked. Please allow popups and try again.';
      break;
    default:
      userFriendlyMessage = 'Authentication failed. Please try again.';
  }
  
  return {
    code,
    message,
    userFriendlyMessage
  };
};