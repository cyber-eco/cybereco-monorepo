'use client';

import { useLanguage } from '@cybereco/ui-components';
import { useAuth } from '../../components/AuthContext';
import { AppGrid } from '../../components/AppGrid';
import { FaThLarge, FaRocket } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Apps() {
  const { userProfile: user, isLoading: loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>{t('hub.loading') || 'Loading applications...'}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaRocket className={styles.titleIcon} />
          <h2>{t('auth.signInError') || 'Please sign in to access your applications'}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaThLarge className={styles.titleIcon} />
            {t('navigation.apps') || 'Applications'}
          </h1>
          <p className={styles.subtitle}>
            {t('hub.apps.description') || 'Access all your CyberEco applications from one central hub'}
          </p>
        </header>

        <section className={styles.appsSection}>
          <AppGrid />
        </section>
      </div>
    </div>
  );
}