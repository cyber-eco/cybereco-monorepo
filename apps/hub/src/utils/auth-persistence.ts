/**
 * Authentication persistence helper for Hub
 * Ensures auth state survives navigation
 */

import { Auth, onAuthStateChanged } from 'firebase/auth';

const AUTH_CHECK_KEY = 'cybereco-hub-auth-check';
const AUTH_CHECK_TIMEOUT = 5000; // 5 seconds

export function markAuthCheckInProgress() {
  localStorage.setItem(AUTH_CHECK_KEY, Date.now().toString());
}

export function clearAuthCheck() {
  localStorage.removeItem(AUTH_CHECK_KEY);
}

export function isAuthCheckRecent(): boolean {
  const timestamp = localStorage.getItem(AUTH_CHECK_KEY);
  if (!timestamp) return false;
  
  const elapsed = Date.now() - parseInt(timestamp);
  return elapsed < AUTH_CHECK_TIMEOUT;
}

export function setupAuthPersistence(auth: Auth) {
  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🔐 Hub: Auth state persisted, user:', user.uid);
      // Clear the check flag when auth is confirmed
      clearAuthCheck();
    } else if (!isAuthCheckRecent()) {
      // Only log out if we're not in the middle of a navigation
      console.log('🔐 Hub: No auth and not navigating');
    }
  });
}