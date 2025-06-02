'use client';

import React from 'react';
import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationContext';
import { GlobalProvider } from '@cybereco/ui-components';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <AppProvider initialState={{}}>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AppProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default Providers;
