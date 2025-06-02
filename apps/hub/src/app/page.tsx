'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import { AppGrid } from '../components/AppGrid';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function Home() {
  const { userProfile: user, isLoading: loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  // Redirect to signin page if not authenticated, or to dashboard if authenticated
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>{t('hub.loading') || 'Loading...'}</p>
      </div>
    );
  }

  // Show loading while redirecting unauthenticated users
  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>{t('hub.loading') || 'Redirecting...'}</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.welcomeTitle}>
            {t('hub.welcomeBack', { name: user.name || user.email || 'User' }) || 
             `Welcome back, ${user.name || user.email}!`}
          </h1>
          <p className={styles.welcomeSubtitle}>
            {t('hub.ecosystem.subtitle') || 'Your digital ecosystem awaits'}
          </p>
        </div>
      </section>
      
      <section className={styles.appSection}>
        <div className="container">
          <h2>{t('hub.apps.title') || 'Your Applications'}</h2>
          <AppGrid />
        </div>
      </section>
    </main>
  );
}