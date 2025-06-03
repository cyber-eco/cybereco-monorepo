'use client';

import { AuthProvider } from './AuthContext';
import { AuthCacheWrapper } from './AuthCacheWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthCacheWrapper>
        {children}
      </AuthCacheWrapper>
    </AuthProvider>
  );
}