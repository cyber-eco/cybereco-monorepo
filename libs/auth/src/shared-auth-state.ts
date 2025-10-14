/**
 * Shared authentication state management for cross-app SSO
 * This bypasses Firebase Auth emulator limitations in development
 */

export interface SharedAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface SharedAuthState {
  user: SharedAuthUser | null;
  token: string | null;
  timestamp: number;
}

const STORAGE_KEY = 'cybereco-shared-auth';
const STATE_CHANGE_EVENT = 'cybereco-auth-changed';

/**
 * Save authentication state to be shared across apps
 */
export function saveSharedAuthState(user: SharedAuthUser | null, token: string | null = null) {
  const state: SharedAuthState = {
    user,
    token,
    timestamp: Date.now()
  };
  
  try {
    console.log('[SharedAuth] Saving auth state:', state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // Dispatch event to notify other tabs/windows
    window.dispatchEvent(new CustomEvent(STATE_CHANGE_EVENT, { 
      detail: state 
    }));
    
    // Verify it was saved
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log('[SharedAuth] Verified saved state:', saved ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error('[SharedAuth] Failed to save shared auth state:', error);
  }
}

/**
 * Get shared authentication state
 */
export function getSharedAuthState(): SharedAuthState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('[SharedAuth] Getting auth state, found:', !!stored);
    
    if (!stored) {
      console.log('[SharedAuth] No stored auth state found');
      return null;
    }
    
    const state = JSON.parse(stored) as SharedAuthState;
    
    // Check if state is still valid (within 24 hours)
    const age = Date.now() - state.timestamp;
    const isValid = age < 24 * 60 * 60 * 1000;
    
    console.log('[SharedAuth] Auth state age:', Math.round(age / 1000), 'seconds, valid:', isValid);
    
    return isValid ? state : null;
  } catch (error) {
    console.error('[SharedAuth] Failed to get shared auth state:', error);
    return null;
  }
}

/**
 * Clear shared authentication state
 */
export function clearSharedAuthState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    
    // Dispatch event to notify other tabs/windows
    window.dispatchEvent(new CustomEvent(STATE_CHANGE_EVENT, { 
      detail: null 
    }));
    
    console.log('Cleared shared auth state');
  } catch (error) {
    console.error('Failed to clear shared auth state:', error);
  }
}

/**
 * Subscribe to authentication state changes
 */
export function subscribeToAuthStateChanges(callback: (state: SharedAuthState | null) => void) {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<SharedAuthState | null>;
    callback(customEvent.detail);
  };
  
  window.addEventListener(STATE_CHANGE_EVENT, handler);
  
  // Return unsubscribe function
  return () => {
    window.removeEventListener(STATE_CHANGE_EVENT, handler);
  };
}

/**
 * Wait for authentication to be available (with timeout)
 */
export async function waitForAuth(timeout: number = 5000): Promise<SharedAuthState | null> {
  const startTime = Date.now();
  console.log('[SharedAuth] Waiting for auth, timeout:', timeout, 'ms');
  
  let checkCount = 0;
  while (Date.now() - startTime < timeout) {
    checkCount++;
    const state = getSharedAuthState();
    
    if (state?.user) {
      console.log('[SharedAuth] Found auth after', checkCount, 'checks,', Date.now() - startTime, 'ms');
      return state;
    }
    
    // Wait 100ms before checking again
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('[SharedAuth] Timeout reached after', checkCount, 'checks, no auth found');
  return null;
}