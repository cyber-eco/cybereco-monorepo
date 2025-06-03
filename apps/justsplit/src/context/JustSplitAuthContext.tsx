'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { JustSplitUser, AuthUser } from '@cybereco/shared-types';
import { debugLog, debugError, debugWarn } from '../utils/debug-auth';
import { 
  generateAuthRedirectUrl,
  clearSharedAuth,
  getSharedAuth
} from '@cybereco/auth';
import { getAuthFromAnySource, clearBridgedAuth } from '../services/auth-bridge';
import { AuthTokenService } from '../services/authTokenService';

// Auth context interface
export interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: JustSplitUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  redirectToHub: (action: 'signin' | 'signup') => void;
  refreshAuth: () => Promise<void>;
}

// Create auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// JustSplit auth provider that only consumes Hub authentication
export function JustSplitAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<JustSplitUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';

  // Function to create a local user profile from Hub auth data
  const createLocalUserProfile = (authUser: AuthUser): JustSplitUser => {
    return {
      id: authUser.uid,
      name: authUser.displayName || authUser.email?.split('@')[0] || 'User',
      email: authUser.email || undefined,
      avatarUrl: authUser.photoURL || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // JustSplit specific fields (local only, not synced with Hub)
      balance: 0,
      preferredCurrency: 'USD',
      friends: [],
      friendRequestsSent: [],
      friendRequestsReceived: [],
      
      // Hub integration
      hubUserId: authUser.uid,
    };
  };

  // Function to redirect to Hub for authentication
  const redirectToHub = (action: 'signin' | 'signup' = 'signin') => {
    const currentUrl = new URL(window.location.href);
    // Clean URL before using as return URL
    currentUrl.searchParams.delete('authToken');
    currentUrl.searchParams.delete('fromHub');
    currentUrl.searchParams.delete('appId');
    currentUrl.searchParams.delete('timestamp');
    const returnUrl = currentUrl.toString();
    window.location.href = generateAuthRedirectUrl(hubUrl, returnUrl, action);
  };

  // Function to refresh authentication from Hub
  const refreshAuth = async () => {
    setIsLoading(true);
    
    try {
      // Try to get auth from various sources
      const authData = await AuthTokenService.processUrlAuthToken() || 
                      AuthTokenService.getBackupAuth() || 
                      getAuthFromAnySource();
      
      if (authData) {
        setCurrentUser(authData);
        setUserProfile(createLocalUserProfile(authData));
        debugLog('JustSplitAuth', 'Refreshed auth from Hub', authData);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      debugError('JustSplitAuth', 'Error refreshing auth', error);
      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function that clears local state and redirects to Hub
  const signOut = async () => {
    // Clear local auth state
    setCurrentUser(null);
    setUserProfile(null);
    
    // Clear any shared auth state
    clearSharedAuth();
    
    // Clear any local storage
    localStorage.removeItem('cybereco-hub-user-id');
    localStorage.removeItem('hub-auth-backup');
    
    // Redirect to Hub for sign out
    window.location.href = `${hubUrl}/auth/signout`;
  };

  // Check for Hub authentication on mount
  useEffect(() => {
    let mounted = true;

    const checkHubAuth = async () => {
      try {
        // First, try to process auth token from URL
        const authFromToken = await AuthTokenService.processUrlAuthToken();
        
        if (authFromToken) {
          if (mounted) {
            debugLog('JustSplitAuth', 'Successfully processed auth token from URL', authFromToken);
            setCurrentUser(authFromToken);
            setUserProfile(createLocalUserProfile(authFromToken));
            setIsLoading(false);
          }
          return;
        }

        // Check for other auth sources
        const authData = AuthTokenService.getBackupAuth() || getAuthFromAnySource();
        
        if (authData) {
          if (mounted) {
            debugLog('JustSplitAuth', 'Found Hub authentication data', authData);
            setCurrentUser(authData);
            setUserProfile(createLocalUserProfile(authData));
            clearBridgedAuth();
          }
        } else {
          debugLog('JustSplitAuth', 'No Hub auth found');
          
          // Check if we were supposed to have auth (came from Hub)
          const urlParams = new URLSearchParams(window.location.search);
          const fromHub = urlParams.get('fromHub');
          
          if (fromHub === 'true') {
            debugWarn('JustSplitAuth', 'Expected auth from Hub but none found, redirecting back');
            redirectToHub('signin');
            return;
          }
        }
      } catch (error) {
        debugError('JustSplitAuth', 'Auth initialization error', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkHubAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Clear URL parameters after processing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const url = new URL(window.location.href);
    if (url.searchParams.has('authToken') || url.searchParams.has('fromHub')) {
      url.searchParams.delete('authToken');
      url.searchParams.delete('fromHub');
      url.searchParams.delete('appId');
      url.searchParams.delete('timestamp');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Connecting to Hub...</p>
        </div>
      </div>
    );
  }

  const value: AuthContextType = {
    currentUser,
    userProfile,
    isLoading,
    signOut,
    redirectToHub,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export types
export type { JustSplitUser };