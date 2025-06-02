'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from './theme';
import { LanguageProvider, TranslationsMap } from './i18n';
import { ToastProvider, setToastInstance, useToast } from './Toast';

interface GlobalProviderProps {
  children: React.ReactNode;
  translations?: TranslationsMap;
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

// Component to set up the toast instance
function ToastSetup() {
  const { showToast } = useToast();
  
  useEffect(() => {
    setToastInstance(showToast);
  }, [showToast]);
  
  return null;
}

// Using regular function declaration for better Next.js compatibility
export function GlobalProvider({ children, translations, toastPosition = 'bottom-right' }: GlobalProviderProps) {
  return (
    <ThemeProvider>
      <LanguageProvider initialTranslations={translations}>
        <ToastProvider position={toastPosition}>
          <ToastSetup />
          {children}
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}