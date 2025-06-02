'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePermissions } from '@cybereco/auth';
import { useAuth } from '../context/JustSplitAuthContext';
// Temporarily disable AppLayout for SSR compatibility
// import { AppLayout } from '@cybereco/ui-components';
import Providers from '../context/Providers'; // Ensure path is correct
import Header from '../components/Header/Header';     // Ensure path is correct
import Footer from '../components/Footer/Footer';     // Import Footer
import ProtectedRoute from '../components/Auth/ProtectedRoute'; // Ensure path is correct
import DatabaseErrorRecovery from '../components/ui/DatabaseErrorRecovery'; // Import the recovery component

function PermissionWrapper({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuth();
  const { hasAccess, isLoading } = usePermissions({
    appId: 'justsplit',
    user: userProfile,
    requiredFeatures: ['expense-tracking'] // Basic feature required for JustSplit
  });

  // Only check permissions for authenticated users
  if (!userProfile) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You do not have permission to access JustSplit.
          </p>
          <a 
            href={process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000'} 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Hub
          </a>
        </div>
      </div>
    );
  }

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