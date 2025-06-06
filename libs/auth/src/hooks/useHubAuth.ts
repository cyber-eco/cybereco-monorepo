'use client';

/**
 * Lightweight auth hook for CyberEco apps
 * Apps consume Hub authentication without managing users
 */

import { useEffect, useState } from 'react';
import { AuthTokenService } from '../services/authTokenService';

export interface HubUser {
  id: string;
  email: string;
  name: string;
  photoURL?: string | null;
  permissions?: string[];
}

export interface HubAuthState {
  user: HubUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
  goToHub: () => void;
  goToProfile: () => void;
}

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';

/**
 * Simple hook for lightweight apps to consume Hub authentication
 * No Firebase, no user management, just auth tokens
 */
export function useHubAuth(): HubAuthState {
  const [user, setUser] = useState<HubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // 1. Check for auth token in URL
        const authUser = await AuthTokenService.processUrlAuthToken();
        
        if (authUser) {
          setUser({
            id: authUser.uid,
            email: authUser.email || '',
            name: authUser.displayName || 'User',
            photoURL: authUser.photoURL,
            permissions: authUser.permissions
          });
        } else {
          // 2. Check for existing auth in storage
          const storedAuth = AuthTokenService.getStoredAuth();
          if (storedAuth) {
            setUser({
              id: storedAuth.uid,
              email: storedAuth.email || '',
              name: storedAuth.displayName || 'User',
              photoURL: storedAuth.photoURL,
              permissions: storedAuth.permissions
            });
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const signOut = () => {
    // Clear local auth
    AuthTokenService.clearAuth();
    setUser(null);
    
    // Redirect to Hub for actual sign out
    window.location.href = `${HUB_URL}/auth/signout`;
  };

  const goToHub = () => {
    window.location.href = HUB_URL;
  };

  const goToProfile = () => {
    window.location.href = `${HUB_URL}/profile`;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    goToHub,
    goToProfile
  };
}