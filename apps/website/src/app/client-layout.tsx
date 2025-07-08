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
  const i18nContext = useI18n();
  
  // Make sure window has the latest i18n module and context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__cybereco_i18n = i18nModule;
      (window as any).__cybereco_current_i18n = i18nContext;
    }
  }, [i18nContext]);

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
  // Always start with 'en' to ensure consistent SSR/hydration
  const [language, setLanguage] = React.useState<'en' | 'es'>('en');
  const [isLoading, setIsLoading] = React.useState(true);
  
  // After hydration, check saved language preference and update if needed
  React.useEffect(() => {
    // Check what language was saved by the user
    const savedLanguage = localStorage.getItem('cybereco-language');
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    // Clear loading state after language is set
    setIsLoading(false);
  }, []);
  
  return (
    <ThemeProvider>
      <I18nProvider
        key={language} // Force clean initialization when language changes
        defaultLanguage={language}
        fallbackLanguage="en"
        supportedLanguages={['en', 'es']}
        namespaces={['common', 'documentation', 'home', 'portfolio', 'about', 'help', 'community', 'philosophy', 'vision', 'roadmap', 'faq', 'contact', 'privacy', 'terms', 'support', 'status', 'guides', 'learning-paths']}
      >
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </I18nProvider>
    </ThemeProvider>
  );
}