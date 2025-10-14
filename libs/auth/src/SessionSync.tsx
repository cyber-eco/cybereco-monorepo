'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, Auth } from 'firebase/auth';

interface SessionSyncConfig {
  auth: Auth;
  onSessionChange?: (isAuthenticated: boolean) => void;
  syncAcrossTabs?: boolean;
}

// Broadcast channel for cross-tab synchronization
const SESSION_CHANNEL = 'cybereco-auth-sync';
const SESSION_STORAGE_KEY = 'cybereco-auth-session';

export function useSessionSync({ auth, onSessionChange, syncAcrossTabs = true }: SessionSyncConfig) {
  useEffect(() => {
    // Create broadcast channel for cross-tab sync
    let channel: BroadcastChannel | null = null;
    
    if (syncAcrossTabs && typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      channel = new BroadcastChannel(SESSION_CHANNEL);
      
      // Listen for auth changes from other tabs
      channel.onmessage = (event) => {
        if (event.data.type === 'auth-state-change') {
          const { isAuthenticated, userId } = event.data;
          
          // Update localStorage (shared across ports on same domain)
          if (isAuthenticated) {
            localStorage.setItem(SESSION_STORAGE_KEY, userId);
          } else {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
          
          // Notify listener
          onSessionChange?.(isAuthenticated);
        }
      };
    }
    
    // Listen for auth state changes in current tab
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthenticated = !!user;
      
      // Update localStorage (shared across ports on same domain)
      if (isAuthenticated && user.uid) {
        localStorage.setItem(SESSION_STORAGE_KEY, user.uid);
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
      
      // Broadcast to other tabs
      if (channel) {
        channel.postMessage({
          type: 'auth-state-change',
          isAuthenticated,
          userId: user?.uid || null,
        });
      }
      
      // Notify listener
      onSessionChange?.(isAuthenticated);
    });
    
    // Cleanup
    return () => {
      unsubscribe();
      channel?.close();
    };
  }, [auth, onSessionChange, syncAcrossTabs]);
}

// Hook to detect if user is authenticated in another tab/app
export function useSharedAuthState(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if we have a session in localStorage (shared across ports)
  const hasSession = localStorage.getItem(SESSION_STORAGE_KEY) !== null;
  return hasSession;
}

// Utility to clear shared auth state (for sign out)
export function clearSharedAuthState() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(SESSION_STORAGE_KEY);
  
  // Broadcast sign out to other tabs
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(SESSION_CHANNEL);
    channel.postMessage({
      type: 'auth-state-change',
      isAuthenticated: false,
      userId: null,
    });
    channel.close();
  }
}