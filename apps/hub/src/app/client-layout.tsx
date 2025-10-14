'use client';

import React from 'react';
import { ThemeProvider, LanguageProvider } from '@cybereco/ui-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './client-layout.module.css';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className={styles.layoutContainer}>
          <Header />
          <main className={styles.mainContent}>
            {children}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}