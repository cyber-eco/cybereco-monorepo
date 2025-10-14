// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getAuthFromAnySource, clearBridgedAuth } from '../services/auth-bridge';
import { debugLog } from '../utils/debug-auth';
import { AuthTokenService } from '../services/authTokenService';
import type { AuthUser } from '@cybereco/shared-types';

export interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: User | null;
  isLoading: boolean;
  redirectToHub: (action: 'signin' | 'signup' | 'signout' | 'profile') => void;
  refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hub URL configuration
  const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';

  // Function to redirect to Hub for authentication actions
  const redirectToHub = (action: 'signin' | 'signup' | 'signout' | 'profile') => {
    const returnUrl = encodeURIComponent(window.location.href);
    const actionUrls = {
      signin: `${HUB_URL}/auth/signin?returnUrl=${returnUrl}`,
      signup: `${HUB_URL}/auth/signup?returnUrl=${returnUrl}`,
      signout: `${HUB_URL}/auth/signout?returnUrl=${returnUrl}`,
      profile: `${HUB_URL}/profile?returnUrl=${returnUrl}`
    };
    
    window.location.href = actionUrls[action];
  };

  // Function to refresh authentication from Hub
  const refreshAuth = async () => {
    setIsLoading(true);
    
    try {
      // Try to get auth from token service or bridge
      const authData = await AuthTokenService.processUrlAuthToken() || 
                      AuthTokenService.getBackupAuth() || 
                      getAuthFromAnySource();
      
      if (authData) {
        setCurrentUser(authData);
        
        // Create a local user profile from Hub auth data
        const localUserProfile: User = {
          id: authData.uid,
          name: authData.displayName || authData.email?.split('@')[0] || 'User',
          email: authData.email || '',
          avatarUrl: authData.photoURL || undefined,
          balance: 0,
          preferredCurrency: 'USD',
          friends: [],
          friendRequestsSent: [],
          friendRequestsReceived: []
        };
        
        setUserProfile(localUserProfile);
        debugLog('AuthContext', 'Refreshed auth from Hub', authData);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      debugLog('AuthContext', 'Error refreshing auth', error);
      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for Hub authentication on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkHubAuth = async () => {
      // First, try to process auth token from URL
      const authFromToken = await AuthTokenService.processUrlAuthToken();
      
      if (authFromToken) {
        debugLog('AuthContext', 'Successfully processed auth token from URL', authFromToken);
        setCurrentUser(authFromToken);
        
        // Create a local user profile from Hub auth data
        const localUserProfile: User = {
          id: authFromToken.uid,
          name: authFromToken.displayName || authFromToken.email?.split('@')[0] || 'User',
          email: authFromToken.email || '',
          avatarUrl: authFromToken.photoURL || undefined,
          balance: 0,
          preferredCurrency: 'USD',
          friends: [],
          friendRequestsSent: [],
          friendRequestsReceived: []
        };
        
        setUserProfile(localUserProfile);
        setIsLoading(false);
        
        debugLog('AuthContext', 'Set user profile from auth token', localUserProfile);
        return;
      }

      // Check for other auth sources
      const authData = AuthTokenService.getBackupAuth() || getAuthFromAnySource();
      
      if (authData) {
        debugLog('AuthContext', 'Found Hub authentication data', authData);
        setCurrentUser(authData);
        
        // Create a local user profile from Hub auth data
        const localUserProfile: User = {
          id: authData.uid,
          name: authData.displayName || authData.email?.split('@')[0] || 'User',
          email: authData.email || '',
          avatarUrl: authData.photoURL || undefined,
          balance: 0,
          preferredCurrency: 'USD',
          friends: [],
          friendRequestsSent: [],
          friendRequestsReceived: []
        };
        
        setUserProfile(localUserProfile);
        clearBridgedAuth();
      } else {
        debugLog('AuthContext', 'No Hub auth found');
        
        // Check if we were supposed to have auth (came from Hub)
        const urlParams = new URLSearchParams(window.location.search);
        const fromHub = urlParams.get('fromHub');
        
        if (fromHub === 'true') {
          debugLog('AuthContext', 'Expected auth from Hub but none found, redirecting back');
          redirectToHub('signin');
          return;
        }
      }
      
      setIsLoading(false);
    };

    checkHubAuth();
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

  const value = {
    currentUser,
    userProfile,
    isLoading,
    redirectToHub,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}