'use client';

import { useLanguage } from '@cybereco/ui-components';
import { useHubAuth } from '../../hooks/useHubAuth';
import { AppGrid } from '../../components/AppGrid';
import { FaThLarge, FaRocket } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Apps() {
  const { userProfile: user, isLoading: loading } = useHubAuth();
  const { t } = useLanguage();

  // Show sign in message only if auth is loaded and no user
  if (!loading && !user) {
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
          <h2 className={styles.sectionTitle}>
            {t('hub.apps.available') || 'Available Applications'}
          </h2>
          <p className={styles.sectionDescription}>
            {t('hub.apps.explore') || 'Explore our suite of integrated applications designed to enhance your digital lifestyle'}
          </p>
          <AppGrid />
        </section>
      </div>
    </div>
  );
}