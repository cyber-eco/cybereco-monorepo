/**
 * Lightweight auth hook for JustSplit
 * Just consumes Hub authentication, no user management
 */

import { useHubAuth } from '@cybereco/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useJustSplitAuth() {
  const hubAuth = useHubAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, redirect to Hub
    if (!hubAuth.isLoading && !hubAuth.isAuthenticated) {
      const currentUrl = window.location.href;
      const hubSignInUrl = `${process.env.NEXT_PUBLIC_HUB_URL}/auth/signin?returnUrl=${encodeURIComponent(currentUrl)}`;
      window.location.href = hubSignInUrl;
    }
  }, [hubAuth.isLoading, hubAuth.isAuthenticated]);

  return {
    ...hubAuth,
    // JustSplit-specific auth helpers
    hubUserId: hubAuth.user?.id || null,
    canCreateExpense: hubAuth.isAuthenticated,
    canJoinGroup: hubAuth.isAuthenticated,
  };
}