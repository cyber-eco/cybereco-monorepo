"use client";
// Presumed structure of ProtectedRouter.tsx
import { useAuth } from '../../context/JustSplitAuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { debugLog, debugWarn, debugAuthState } from '../../utils/debug-auth';

// Define public paths that don't require authentication
const PUBLIC_PATHS = [
  '/landing',
  '/auth/signin',
  '/auth/signup',
  '/about',
  '/tos',
  '/privacy',
  '/help',
  '/contact'
];

export default function ProtectedRouter({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoading, redirectToHub } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Check if we're coming from Hub
  const [isFromHub, setIsFromHub] = useState(false);
  const [hasProcessedHubAuth, setHasProcessedHubAuth] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const fromHub = urlParams.has('fromHub');
      setIsFromHub(fromHub);
      debugLog('ProtectedRoute', 'Initial URL check', { fromHub, pathname, search: window.location.search });
    }
  }, [pathname]);

  debugLog('ProtectedRoute', 'Component rendered', { 
    user: currentUser?.uid, 
    isLoading, 
    pathname,
    hasRedirected,
    isFromHub,
    hasProcessedHubAuth,
    authCheckComplete
  });
  
  // Log auth state on first render
  useEffect(() => {
    debugAuthState();
  }, []);

  useEffect(() => {
    // If we're coming from Hub, give the auth context time to process
    if (isFromHub && !hasProcessedHubAuth) {
      debugLog('ProtectedRoute', 'Detected fromHub=true, waiting for auth processing...');
      setHasProcessedHubAuth(true);
      
      // Give AuthContext 5 seconds to process Hub auth and shared state
      const timeout = setTimeout(() => {
        debugWarn('ProtectedRoute', 'Auth processing timeout reached (5s)');
        debugAuthState(); // Check what's in storage after timeout
        setAuthCheckComplete(true);
        
        // Check if we have user after timeout
        if (!currentUser) {
          debugWarn('ProtectedRoute', 'No user after timeout, will allow redirect');
          setHasRedirected(false); // Allow redirect
        } else {
          debugLog('ProtectedRoute', 'User found after timeout', { uid: currentUser.uid });
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }

    // Mark auth check as complete if not from Hub
    if (!isFromHub && !authCheckComplete) {
      setAuthCheckComplete(true);
    }
  }, [isFromHub, hasProcessedHubAuth, currentUser]);
  
  useEffect(() => {
    // Only check for redirects after auth check is complete
    if (!authCheckComplete) return;
    
    // Allow access to public paths without authentication
    const isPublicPath = PUBLIC_PATHS.some(path => pathname?.startsWith(path));
    
    debugLog('ProtectedRoute', 'Auth check in effect', {
      authCheckComplete,
      isLoading,
      hasUser: !!currentUser,
      isPublicPath,
      hasRedirected,
      isFromHub
    });
    
    // Only redirect if auth check is complete and no user
    if (!isLoading && !currentUser && !isPublicPath && !hasRedirected) {
      debugWarn('ProtectedRoute', 'No user found, redirecting to Hub for authentication');
      setHasRedirected(true);
      
      // Small delay to prevent race conditions
      setTimeout(() => {
        debugLog('ProtectedRoute', 'Executing redirect to Hub');
        redirectToHub('signin');
      }, 100);
    }
  }, [currentUser, isLoading, pathname, redirectToHub, hasRedirected, authCheckComplete]);

  // Show loading while processing auth
  if (isLoading || (isFromHub && !authCheckComplete)) {
    debugLog('ProtectedRoute', 'Showing loading state', { 
      isLoading, 
      isFromHub, 
      authCheckComplete,
      hasProcessedHubAuth,
      currentUser: !!currentUser 
    });
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isFromHub ? 'Authenticating with Hub...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}