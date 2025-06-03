'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/JustSplitAuthContext';
// Temporarily disable AppLayout for SSR compatibility
// import { AppLayout } from '@cybereco/ui-components';
import Providers from '../context/Providers'; // Ensure path is correct
import Header from '../components/Header/Header';     // Ensure path is correct
import Footer from '../components/Footer/Footer';     // Import Footer
import ProtectedRoute from '../components/Auth/ProtectedRoute'; // Ensure path is correct
import DatabaseErrorRecovery from '../components/ui/DatabaseErrorRecovery'; // Import the recovery component

function PermissionWrapper({ children }: { children: React.ReactNode }) {
  // In the lightweight architecture, JustSplit accepts any authenticated Hub user
  // No permission checks needed - if you're authenticated, you can use JustSplit
  return <>{children}</>;
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const isAuthRoute = pathname.startsWith('/auth/');

  return (
    <Providers>
      {/* This component will render only when there is a database corruption error */}
      <DatabaseErrorRecovery />
      
      {isAuthRoute ? (
        // For /auth/signin, /auth/signup, etc.
        // No Header, no ProtectedRoute wrapper here.
        children
      ) : (
        // For all other routes (e.g., /dashboard, /profile)
        <ProtectedRoute>
          <PermissionWrapper>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </div>
          </PermissionWrapper>
        </ProtectedRoute>
      )}
    </Providers>
  );
}

export default function ClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR/SSG, provide minimal providers to avoid context errors
  if (!isClient) {
    return <Providers>{children}</Providers>;
  }

  return <ClientLayout>{children}</ClientLayout>;
}