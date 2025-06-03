'use client';

import { useEffect, useState } from 'react';
import { getHubAuth, getHubFirestore, initializeFirebase } from '@cybereco/firebase-config';
import { 
  createAuthContext, 
  BaseUser, 
  type AuthConfig, 
  useSessionSync, 
  clearSharedAuthState, 
  useCrossOriginAuth,
  saveSharedAuthState,
  type SharedAuthUser
} from '@cybereco/auth';
import type { AppPermission } from '@cybereco/auth';
import { getCachedAuthState, setCachedAuthState, clearCachedAuthState } from '../lib/auth-persistence';

// Hub-specific user profile extending BaseUser
export interface HubUser extends BaseUser {
  // Hub-specific fields
  apps: string[]; // List of app IDs the user has access to
  permissions: AppPermission[]; // App-specific permissions
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'es';
    notifications: boolean;
  };
  lastLoginAt?: string;
  isAdmin?: boolean;
}

// Create Hub-specific auth context
const { AuthProvider: BaseAuthProvider, useAuth, AuthContext } = createAuthContext<HubUser>();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);

  useEffect(() => {
    // Initialize Firebase with hub configuration (fallback to main Firebase config)
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_HUB_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain: process.env.NEXT_PUBLIC_HUB_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.NEXT_PUBLIC_HUB_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.NEXT_PUBLIC_HUB_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.NEXT_PUBLIC_HUB_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.NEXT_PUBLIC_HUB_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    };

    initializeFirebase({
      hubConfig: firebaseConfig,
      useEmulators: process.env.NODE_ENV === 'development',
      emulatorPorts: {
        auth: 9099,
        firestore: 8080,
      },
    });

    // Set up auth configuration
    const config: AuthConfig = {
      auth: getHubAuth(),
      db: getHubFirestore(),
      userCollection: 'users',
      enableIndexedDBRecovery: true,
    };

    setAuthConfig(config);
  }, []);

  // Create Hub-specific user profile
  const createHubUserProfile = (firebaseUser: any): HubUser => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      avatarUrl: firebaseUser.photoURL || '',
      apps: ['justsplit'], // Default apps
      permissions: [
        {
          appId: 'justsplit',
          roles: ['user'],
          features: ['expense-tracking', 'group-management']
        }
      ],
      preferences: {
        theme: 'auto',
        language: 'en',
        notifications: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isAdmin: false,
    };
  };

  const handleUserProfileLoaded = (userProfile: HubUser) => {
    // Update last login time
    // console.log('🏠 [Hub] User profile loaded:', userProfile);
    
    // Cache the user profile for faster navigation
    setCachedAuthState<HubUser>(userProfile);
    
    // Save to shared auth state for cross-app SSO
    const sharedUser: SharedAuthUser = {
      uid: userProfile.id,
      email: userProfile.email,
      displayName: userProfile.name,
      photoURL: userProfile.avatarUrl || null,
      emailVerified: true // Assuming verified since they're logged in
    };
    // console.log('🏠 [Hub] Calling saveSharedAuthState with:', sharedUser);
    saveSharedAuthState(sharedUser);
    
    // Verify it was saved
    // setTimeout(() => {
    //   const saved = localStorage.getItem('cybereco-shared-auth');
    //   console.log('🏠 [Hub] Verification - SharedAuth in localStorage:', saved ? 'YES' : 'NO');
    //   if (saved) {
    //     console.log('🏠 [Hub] SharedAuth content:', JSON.parse(saved));
    //   }
    // }, 100);
  };

  if (!authConfig) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'var(--text-secondary)' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <BaseAuthProvider
      config={authConfig}
      createUserProfile={createHubUserProfile}
      onUserProfileLoaded={handleUserProfileLoaded}
      enableCorruptionRecovery={true}
    >
      <AuthContextWrapper>
        {children}
      </AuthContextWrapper>
    </BaseAuthProvider>
  );
}

// Wrapper to add session synchronization and cross-origin auth
function AuthContextWrapper({ children }: { children: React.ReactNode }) {
  const authContext = useAuth();
  const auth = getHubAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  // Set up cross-origin auth sharing
  useCrossOriginAuth(auth);
  
  // Detect navigation to prevent clearing auth
  useEffect(() => {
    const handleBeforeUnload = () => {
      // console.log('🚪 Hub: Page unloading, marking navigation');
      setIsNavigating(true);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Set up session synchronization
  useSessionSync({
    auth,
    onSessionChange: (isAuthenticated) => {
      // Hub is the central auth provider, so we don't redirect on sign out
      // Apps will handle their own redirects
      // console.log('Hub auth state changed:', isAuthenticated);
    },
    syncAcrossTabs: true
  });

  // Save shared auth state whenever auth state changes
  useEffect(() => {
    // console.log('Hub AuthContext: Auth state changed', { 
    //   hasProfile: !!authContext.userProfile,
    //   uid: authContext.userProfile?.id,
    //   isNavigating,
    //   isLoading: authContext.isLoading
    // });
    
    // Don't do anything while auth is still loading
    if (authContext.isLoading) {
      // console.log('Hub AuthContext: Auth is still loading, waiting...');
      return;
    }
    
    if (authContext.userProfile) {
      // Cache the user profile for faster navigation
      setCachedAuthState<HubUser>(authContext.userProfile);
      
      const sharedUser: SharedAuthUser = {
        uid: authContext.userProfile.id,
        email: authContext.userProfile.email,
        displayName: authContext.userProfile.name,
        photoURL: authContext.userProfile.avatarUrl || null,
        emailVerified: true
      };
      // console.log('Hub AuthContext: Saving shared auth state', sharedUser);
      saveSharedAuthState(sharedUser);
    } else if (!isNavigating) {
      // Only clear if we're not navigating away and auth has finished loading
      // console.log('Hub AuthContext: User profile is null, not navigating, and auth finished loading - user may have signed out');
      // Don't clear immediately - wait to see if it's really a sign out
      setTimeout(() => {
        if (!authContext.userProfile && !isNavigating && !authContext.isLoading) {
          // console.log('Hub AuthContext: Confirmed sign out, clearing shared auth');
          clearSharedAuthState();
        }
      }, 100); // Reduced from 1000ms to 100ms for faster response
    } else {
      // console.log('Hub AuthContext: User profile is null but navigating - preserving shared auth');
    }
  }, [authContext.userProfile, isNavigating, authContext.isLoading]);

  // Enhanced context with session management
  const enhancedContext = {
    ...authContext,
    signOut: async () => {
      // console.log('Hub AuthContext: User explicitly signing out, clearing shared auth');
      // Clear all auth caches when user explicitly signs out
      clearSharedAuthState();
      clearCachedAuthState();
      await authContext.signOut();
    }
  };

  return (
    <AuthContext.Provider value={enhancedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };