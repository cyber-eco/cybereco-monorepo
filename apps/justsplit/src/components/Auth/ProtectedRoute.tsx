"use client";
// Presumed structure of ProtectedRouter.tsx
import { useAuth, useHubAuth } from '../../context/JustSplitAuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const { currentUser, isLoading } = useAuth();
  const { redirectToHub } = useHubAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  // DEVELOPMENT ONLY: Check if we have user info in URL from Hub
  const urlParams = new URLSearchParams(window.location.search);
  const hasHubUserInfo = urlParams.has('uid') && urlParams.has('email');
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.log('ProtectedRouter - Auth State:', { 
    user: currentUser?.uid, 
    isLoading, 
    pathname,
    hasRedirected,
    hasHubUserInfo,
    isDevelopment
  });

  useEffect(() => {
    // Allow access to public paths without authentication
    const isPublicPath = PUBLIC_PATHS.some(path => pathname?.startsWith(path));
    
    // Check if we just came from Hub with a token
    const hasToken = urlParams.has('token');
    
    // DEVELOPMENT BYPASS: If we have Hub user info in dev mode, don't redirect
    const shouldBypassAuth = isDevelopment && hasHubUserInfo;
    
    if (!isLoading && !currentUser && !isPublicPath && !hasRedirected && !hasToken && !shouldBypassAuth) {
      console.log('ProtectedRouter: No user, redirecting to Hub');
      setHasRedirected(true);
      // Add a small delay to prevent immediate redirects
      setTimeout(() => {
        redirectToHub('signin');
      }, 100);
    }
  }, [currentUser, isLoading, pathname, redirectToHub, hasRedirected, hasHubUserInfo, isDevelopment]);

  if (isLoading) {
    console.log('ProtectedRouter: Loading auth state...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // DEVELOPMENT MODE: Show warning if using bypass
  if (isDevelopment && hasHubUserInfo && !currentUser) {
    console.warn('DEVELOPMENT MODE: Bypassing auth check - Hub user info present in URL');
  }

  return <>{children}</>;
}