'use client';

import { useEffect, useState } from 'react';
import { getHubAuth, getHubFirestore, initializeFirebase } from '@cybereco/firebase-config';
import { createAuthContext, BaseUser, type AuthConfig } from '@cybereco/auth';
import type { AppPermission } from '@cybereco/auth';

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
const { AuthProvider: BaseAuthProvider, useAuth } = createAuthContext<HubUser>();

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
    console.log('Hub user profile loaded:', userProfile);
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
      {children}
    </BaseAuthProvider>
  );
}

export { useAuth };