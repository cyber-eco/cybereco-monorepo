'use client';

import { useEffect, useState } from 'react';
import { Card, useLanguage } from '@cybereco/ui-components';
import { getHubFirestore, queryDocuments, getCurrentUser } from '@cybereco/firebase-config';
import { where } from 'firebase/firestore';
import type { App } from '@cybereco/shared-types';
import { useAuth } from './AuthContext';
import { createAppToken, generateAppUrl } from '../services/tokenService';
import styles from './AppGrid.module.css';

export function AppGrid() {
  const { userProfile: user, currentUser } = useAuth();
  const { t } = useLanguage();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApps() {
      if (!user) return;

      try {
        const db = getHubFirestore();
        const availableApps = await queryDocuments<App>(
          db,
          'apps',
          where('status', '==', 'active')
        );

        // In production, filter by user permissions
        setApps(availableApps);
      } catch (error) {
        console.error('Failed to load apps:', error);
      } finally {
        setLoading(false);
      }
    }

    loadApps();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>{t('apps.loading') || 'Loading applications...'}</div>;
  }

  if (apps.length === 0) {
    // Show default JustSplit app
    const defaultApps: App[] = [{
      id: 'justsplit',
      name: 'JustSplit',
      description: t('apps.justsplit.description') || 'Split expenses with friends and family',
      icon: '💰',
      url: process.env.NEXT_PUBLIC_JUSTSPLIT_URL || 'http://localhost:40002',
      category: 'finance',
      status: 'active',
      requiresAuth: true,
      features: [
        t('apps.features.expenseTracking') || 'Expense tracking',
        t('apps.features.groupManagement') || 'Group management',
        t('apps.features.settlementTracking') || 'Settlement tracking'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }];

    return (
      <div className={styles.grid}>
        {defaultApps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  const { userProfile: user, currentUser } = useAuth();
  const { t } = useLanguage();

  const handleLaunch = async () => {
    if (!user || !currentUser) return;

    try {
      // Create a token for the app
      const token = await createAppToken();
      
      // Generate the app URL with token
      const appUrl = generateAppUrl(app.url, token);
      
      // Redirect to app
      window.location.href = appUrl;
    } catch (error) {
      console.error('Error launching app:', error);
      // Fall back to launching without token
      window.location.href = app.url;
    }
  };

  return (
    <Card className={styles.appCard} onClick={handleLaunch} hoverable>
      <div className={styles.appIcon}>{app.icon}</div>
      <h3 className={styles.appName}>{app.name}</h3>
      <p className={styles.appDescription}>{app.description}</p>
      <div className={styles.appFeatures}>
        {app.features.slice(0, 3).map((feature, index) => (
          <span key={index} className={styles.feature}>
            {feature}
          </span>
        ))}
      </div>
      <button className={styles.launchButton}>
        {t('apps.launch') || 'Launch App'} →
      </button>
    </Card>
  );
}