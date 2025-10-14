'use client';

import React from 'react';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  providers?: React.ComponentType<{ children: React.ReactNode }>[];
  className?: string;
}

export default function AppLayout({
  children,
  header,
  footer,
  providers = [],
  className
}: AppLayoutProps) {
  // Wrap children with providers in reverse order
  const wrappedChildren = providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>
      {header}
      <main className={styles.main}>
        {children}
      </main>
      {footer}
    </>
  );

  return (
    <div className={`${styles.appLayout} ${className || ''}`}>
      {wrappedChildren}
    </div>
  );
}