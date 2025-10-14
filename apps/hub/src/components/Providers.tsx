'use client';

import { AuthProvider } from './AuthContext';
import { AuthCacheWrapper } from './AuthCacheWrapper';
import ConsentBannerWrapper from './ConsentBannerWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthCacheWrapper>
        {children}
        <ConsentBannerWrapper />
      </AuthCacheWrapper>
    </AuthProvider>
  );
}