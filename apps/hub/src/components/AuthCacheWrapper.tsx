'use client';

import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getCachedAuthState } from '../lib/auth-persistence';
import { useAuth } from './AuthContext';

interface AuthCacheWrapperProps {
  children: React.ReactNode;
}

export function AuthCacheWrapper({ children }: AuthCacheWrapperProps) {
  const { user, loading } = useAuth();
  const [cachedUser, setCachedUser] = useState<User | null>(null);
  const [isCacheChecked, setIsCacheChecked] = useState(false);

  useEffect(() => {
    // Check for cached auth state immediately
    const checkCache = () => {
      try {
        const cached = getCachedAuthState();
        setCachedUser(cached);
      } catch (error) {
        console.error('Error checking auth cache:', error);
      } finally {
        setIsCacheChecked(true);
      }
    };
    
    checkCache();
  }, []);

  // Determine what to show based on the current state
  const shouldShowLoading = () => {
    // If we haven't checked the cache yet, show loading
    if (!isCacheChecked) {
      return true;
    }

    // If Firebase is still loading but we have cached auth, show the app
    if (loading && cachedUser) {
      return false;
    }

    // If Firebase is still loading and no cached auth, show loading
    if (loading) {
      return true;
    }

    // Otherwise, Firebase has loaded so show the app
    return false;
  };

  if (shouldShowLoading()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If we have cached auth but Firebase hasn't confirmed yet, show the app
  // This prevents the flash of unauthenticated content
  return <>{children}</>;
}