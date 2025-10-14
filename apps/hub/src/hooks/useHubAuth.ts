import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../components/AuthContext';
import { getCachedAuthState } from '../lib/auth-persistence';
import type { HubUser } from '../components/AuthContext';

export function useHubAuth() {
  const baseAuth = useAuth();
  
  // Get cached state on every render to ensure we always have the latest
  const cachedUser = useMemo(() => {
    if (typeof window !== 'undefined') {
      const cached = getCachedAuthState<HubUser>();
      // console.log('[HubAuth] Checking cached state:', cached ? 'Found user ' + cached.id : 'No cache');
      return cached;
    }
    return null;
  }, []); // Empty deps means this runs once per component mount
  
  // Memoize the auth state to prevent unnecessary re-renders
  const authState = useMemo(() => {
    // If we have cached user and base auth hasn't loaded yet, use cached state
    if (cachedUser && (baseAuth.isLoading || !baseAuth.userProfile)) {
      // console.log('[HubAuth] Returning cached user state:', cachedUser.id);
      return {
        ...baseAuth,
        userProfile: cachedUser,
        isLoading: false,
        isAuthenticated: true,
        currentUser: {
          uid: cachedUser.id,
          email: cachedUser.email,
          displayName: cachedUser.name,
          photoURL: cachedUser.avatarUrl || null,
        } as any,
      };
    }
    
    // If no cached user and base auth is still loading, return not loading
    // This prevents showing loading state when user is not logged in
    if (!cachedUser && baseAuth.isLoading && !baseAuth.userProfile) {
      // console.log('[HubAuth] No cached user, returning not loading state');
      return {
        ...baseAuth,
        isLoading: false,
        isAuthenticated: false,
        userProfile: null,
        currentUser: null,
      };
    }
    
    // Once base auth loads, always use it (even if null)
    // console.log('[HubAuth] Returning base auth state:', {
    //   isLoading: baseAuth.isLoading,
    //   hasProfile: !!baseAuth.userProfile,
    //   userId: baseAuth.userProfile?.id
    // });
    return baseAuth;
  }, [baseAuth, cachedUser]);

  return authState;
}