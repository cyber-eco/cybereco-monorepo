'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, Auth, User } from 'firebase/auth';

/**
 * Cross-origin authentication helper
 * 
 * Since Firebase Auth state is not shared across different ports,
 * we use localStorage to share minimal auth info that can be used
 * to verify authentication status across apps.
 */

const AUTH_STATE_KEY = 'cybereco-auth-state';
const AUTH_STATE_VERSION = '1.0';

interface SharedAuthState {
  version: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  timestamp: number;
  expiresAt: number; // 1 hour expiry
}

export function useCrossOriginAuth(auth: Auth) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Save auth state to localStorage
        const authState: SharedAuthState = {
          version: AUTH_STATE_VERSION,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          timestamp: Date.now(),
          expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
        };
        
        localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authState));
        console.log('Saved cross-origin auth state for user:', user.uid);
      } else {
        // Clear auth state
        localStorage.removeItem(AUTH_STATE_KEY);
        console.log('Cleared cross-origin auth state');
      }
    });

    return () => unsubscribe();
  }, [auth]);
}

export function getSharedAuthState(): SharedAuthState | null {
  try {
    const stored = localStorage.getItem(AUTH_STATE_KEY);
    console.log('[CrossOriginAuth] Checking localStorage for key:', AUTH_STATE_KEY, 'Found:', !!stored);
    
    if (!stored) {
      console.log('[CrossOriginAuth] No auth state in localStorage');
      return null;
    }
    
    const authState = JSON.parse(stored) as SharedAuthState;
    console.log('[CrossOriginAuth] Parsed auth state:', { uid: authState.uid, timestamp: authState.timestamp });
    
    // Check version
    if (authState.version !== AUTH_STATE_VERSION) {
      console.log('[CrossOriginAuth] Version mismatch:', authState.version, 'vs', AUTH_STATE_VERSION);
      localStorage.removeItem(AUTH_STATE_KEY);
      return null;
    }
    
    // Check expiry
    if (Date.now() > authState.expiresAt) {
      console.log('[CrossOriginAuth] Auth state expired');
      localStorage.removeItem(AUTH_STATE_KEY);
      return null;
    }
    
    console.log('[CrossOriginAuth] Valid auth state found for user:', authState.uid);
    return authState;
  } catch (error) {
    console.error('[CrossOriginAuth] Error reading shared auth state:', error);
    return null;
  }
}

export function clearSharedAuthState() {
  localStorage.removeItem(AUTH_STATE_KEY);
}

// Helper to wait for auth state from another app
export async function waitForSharedAuth(timeout: number = 5000): Promise<SharedAuthState | null> {
  console.log('[CrossOriginAuth] Waiting for shared auth state...');
  const startTime = Date.now();
  
  return new Promise((resolve) => {
    // Check immediately
    const existing = getSharedAuthState();
    if (existing) {
      console.log('[CrossOriginAuth] Found existing auth state immediately:', existing.uid);
      resolve(existing);
      return;
    }
    
    // Poll for auth state
    let checkCount = 0;
    const interval = setInterval(() => {
      checkCount++;
      const authState = getSharedAuthState();
      
      if (checkCount % 10 === 0) {
        console.log(`[CrossOriginAuth] Still waiting... (${checkCount * 100}ms elapsed)`);
      }
      
      if (authState) {
        console.log(`[CrossOriginAuth] Found auth state after ${Date.now() - startTime}ms:`, authState.uid);
        clearInterval(interval);
        resolve(authState);
        return;
      }
      
      // Timeout
      if (Date.now() - startTime > timeout) {
        console.log(`[CrossOriginAuth] Timeout after ${timeout}ms - no auth state found`);
        clearInterval(interval);
        resolve(null);
      }
    }, 100); // Check every 100ms
  });
}