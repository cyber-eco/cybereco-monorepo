'use client';

import React from 'react';
import { AppProvider } from './AppContext';
import { JustSplitAuthProvider } from './JustSplitAuthContext';
import { NotificationProvider } from './NotificationContext';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
// Temporarily disable GlobalProvider for SSR compatibility
// import { GlobalProvider } from '@cybereco/ui-components';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <JustSplitAuthProvider>
          <AppProvider initialState={{}}>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </AppProvider>
        </JustSplitAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default Providers;
