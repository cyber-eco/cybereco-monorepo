'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from '@cybereco/ui-components';
import { I18nProvider, useI18n } from '@cybereco/i18n';
import * as i18nModule from '@cybereco/i18n';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './client-layout.module.css';

// Make i18n available globally for ui-components
if (typeof window !== 'undefined') {
  (window as any).__cybereco_i18n = i18nModule;
}

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  // Make sure window has the latest i18n module
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__cybereco_i18n = i18nModule;
    }
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get saved language preference from localStorage
  const [defaultLanguage, setDefaultLanguage] = React.useState<'en' | 'es'>('en');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('cybereco-language');
      if (savedLanguage === 'es' || savedLanguage === 'en') {
        setDefaultLanguage(savedLanguage);
      }
    }
  }, []);
  
  return (
    <ThemeProvider>
      <I18nProvider
        defaultLanguage={defaultLanguage}
        fallbackLanguage="en"
        supportedLanguages={['en', 'es']}
        namespaces={['common', 'documentation', 'home', 'portfolio', 'about', 'help']}
      >
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </I18nProvider>
    </ThemeProvider>
  );
}