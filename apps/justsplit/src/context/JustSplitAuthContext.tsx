'use client';

import React, { useEffect, useState } from 'react';
import { createAuthContext, BaseUser, AuthProviderProps } from '@cybereco/auth';
import { JustSplitUser } from '@cybereco/shared-types';
import { auth, db } from '../firebase/config';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  signInWithCustomToken,
  signInAnonymously,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  hasIndexedDBCorruption, 
  recoverFromCorruption,
  parseReturnUrl,
  generateAuthRedirectUrl,
  useSessionSync,
  clearSharedAuthState,
  waitForSharedAuth,
  getSharedAuthState
} from '@cybereco/auth';

// Create JustSplit-specific auth context
const { AuthProvider: BaseAuthProvider, useAuth, AuthContext } = createAuthContext<JustSplitUser>();

// Custom auth provider that handles Hub token authentication
export function JustSplitAuthProvider({ children }: { children: React.ReactNode }) {
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';

  // Initialize auth and check for Hub token
  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;
    
    const initializeAuth = async () => {
      try {
        // Enable persistence first
        await setPersistence(auth, browserLocalPersistence);
        
        // Check if we have a token in URL params or auth pending flag
        const params = new URLSearchParams(window.location.search);
        const hasToken = params.get('token') !== null;
        const authPending = localStorage.getItem('cybereco-auth-pending') === 'true';
        
        if (hasToken || authPending) {
          console.log('Auth pending from Hub...');
          
          // Get user info from URL if available
          const uid = params.get('uid');
          const email = params.get('email');
          const name = params.get('name');
          
          console.log('User info from URL:', { uid, email, name });
          
          // Clean up URL
          if (hasToken) {
            params.delete('token');
            params.delete('uid');
            params.delete('email');
            params.delete('name');
            const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
            window.history.replaceState({}, '', newUrl);
          }
          
          // For development with emulators, we need to wait for the auth state
          // The issue is that Firebase Auth state doesn't persist across different ports
          // So we'll wait and see if the auth propagates
          
          console.log('Waiting for Firebase auth to propagate...');
          
          let authResolved = false;
          let waitTime = 0;
          const checkInterval = 200; // Check every 200ms
          const maxWaitTime = 5000; // Wait up to 5 seconds
          
          while (!authResolved && waitTime < maxWaitTime) {
            // Check current user
            const currentUser = auth.currentUser;
            if (currentUser) {
              console.log('Firebase auth found!', currentUser.uid);
              authResolved = true;
              break;
            }
            
            // Wait a bit
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            waitTime += checkInterval;
            
            if (waitTime % 1000 === 0) {
              console.log(`Still waiting for auth... ${waitTime/1000}s`);
            }
          }
          
          if (!authResolved) {
            console.log('Firebase auth did not propagate after 5 seconds');
            
            // DEVELOPMENT ONLY: Create anonymous session with user info
            // This is a workaround for Firebase emulator not sharing auth across ports
            if (process.env.NODE_ENV === 'development' && uid && email && name) {
              console.log('Development mode: Creating anonymous session with user info');
              try {
                // Sign in anonymously first
                const result = await signInAnonymously(auth);
                
                // Update the profile with Hub user info
                await updateProfile(result.user, {
                  displayName: name,
                  // We'll store the real user ID and email in a custom claim or user doc
                });
                
                console.log('Created anonymous session for development');
                authResolved = true;
              } catch (error) {
                console.error('Failed to create anonymous session:', error);
              }
            }
          }
        } else {
          // No token, check for existing auth
          console.log('No token in URL, checking existing auth...');
          
          // Check shared auth state first
          const sharedAuth = getSharedAuthState();
          if (sharedAuth) {
            console.log('Found existing shared auth state:', sharedAuth.uid);
          }
          
          const existingUser = auth.currentUser;
          if (existingUser) {
            console.log('Already authenticated as:', existingUser.uid);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setIsCheckingToken(false);
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Custom user profile creator
  const createJustSplitUserProfile = (firebaseUser: FirebaseUser, extraData?: Partial<JustSplitUser>): JustSplitUser => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || undefined,
      avatarUrl: firebaseUser.photoURL || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // JustSplit specific fields
      balance: 0,
      preferredCurrency: 'USD',
      friends: [],
      friendRequestsSent: [],
      friendRequestsReceived: [],
      
      // Hub integration
      hubUserId: firebaseUser.uid,
      
      // Merge any extra data
      ...extraData
    };
  };

  // Custom sign out that redirects to Hub
  const customSignOut = async () => {
    await firebaseSignOut(auth);
    // Redirect to Hub after sign out
    window.location.href = hubUrl;
  };

  if (isCheckingToken || isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Connecting to Hub...</p>
        </div>
      </div>
    );
  }

  // Provide auth configuration
  const authConfig = {
    auth,
    db,
    userCollection: 'users',
    enableIndexedDBRecovery: true
  };

  return (
    <BaseAuthProvider
      config={authConfig}
      createUserProfile={createJustSplitUserProfile}
      enableCorruptionRecovery={true}
    >
      <AuthContextWrapper>
        {children}
      </AuthContextWrapper>
    </BaseAuthProvider>
  );
}

// Wrapper to override sign out behavior and add session sync
function AuthContextWrapper({ children }: { children: React.ReactNode }) {
  const authContext = useAuth();
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';
  const [mockUser, setMockUser] = useState<JustSplitUser | null>(null);

  // DEVELOPMENT: Check for mock user from URL
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !authContext.currentUser) {
      const params = new URLSearchParams(window.location.search);
      const uid = params.get('uid');
      const email = params.get('email');
      const name = params.get('name');
      
      if (uid && email && name) {
        console.log('DEVELOPMENT: Creating mock user from URL params');
        const mockUserProfile: JustSplitUser = {
          id: uid,
          name: name,
          email: email,
          avatarUrl: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          balance: 0,
          preferredCurrency: 'USD',
          friends: [],
          friendRequestsSent: [],
          friendRequestsReceived: [],
          hubUserId: uid,
        };
        setMockUser(mockUserProfile);
      }
    }
  }, [authContext.currentUser]);

  // Set up session synchronization
  useSessionSync({
    auth,
    onSessionChange: (isAuthenticated) => {
      if (!isAuthenticated) {
        // If user signed out in another tab/app, redirect to Hub
        window.location.href = hubUrl;
      }
    },
    syncAcrossTabs: true
  });

  // Enhanced context with Hub integration and dev mock
  const enhancedContext = {
    ...authContext,
    // Override userProfile to include mock user in development
    userProfile: authContext.userProfile || mockUser,
    signOut: async () => {
      await authContext.signOut();
      // Clear shared auth state
      clearSharedAuthState();
      // Clear mock user
      setMockUser(null);
      // Redirect to Hub after sign out
      window.location.href = hubUrl;
    },
    redirectToHub: (action: 'signin' | 'signup' = 'signin') => {
      // Clean the current URL to avoid nested returnUrl parameters
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('returnUrl');
      currentUrl.searchParams.delete('token');
      currentUrl.searchParams.delete('uid');
      currentUrl.searchParams.delete('email');
      currentUrl.searchParams.delete('name');
      const returnUrl = currentUrl.toString();
      window.location.href = generateAuthRedirectUrl(hubUrl, returnUrl, action);
    }
  };

  return (
    <AuthContext.Provider value={enhancedContext}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the auth hook and types
export { useAuth };
export type { JustSplitUser };

// Export utility for checking if user is authenticated via Hub
export const useHubAuth = () => {
  const { currentUser, userProfile, isLoading } = useAuth();
  const [needsHubAuth, setNeedsHubAuth] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      setNeedsHubAuth(true);
    } else {
      setNeedsHubAuth(false);
    }
  }, [currentUser, isLoading]);

  const redirectToHub = (action: 'signin' | 'signup' = 'signin') => {
    const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';
    // Clean the current URL to avoid nested returnUrl parameters
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('returnUrl');
    currentUrl.searchParams.delete('token');
    const returnUrl = currentUrl.toString();
    window.location.href = generateAuthRedirectUrl(hubUrl, returnUrl, action);
  };

  return {
    isAuthenticated: !!currentUser,
    needsHubAuth,
    redirectToHub,
    userProfile
  };
};