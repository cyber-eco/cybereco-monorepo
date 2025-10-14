'use client';

import { useEffect, useState } from 'react';
import { Card, useLanguage } from '@cybereco/ui-components';
import { getHubFirestore, queryDocuments, getCurrentUser } from '@cybereco/firebase-config';
import { where } from 'firebase/firestore';
import type { App } from '@cybereco/shared-types';
import { useHubAuth } from '../hooks/useHubAuth';
import { saveSharedAuthState } from '@cybereco/auth';
import { prepareAuthForApp } from '../services/auth-bridge';
import { AuthTokenService } from '../services/authTokenService';
import type { SharedAuthUser, AuthUser } from '@cybereco/auth';
import styles from './AppGrid.module.css';

export function AppGrid() {
  const { userProfile: user, currentUser } = useHubAuth();
  const { t } = useLanguage();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoadedFromDB, setHasLoadedFromDB] = useState(false);

  // Default apps to show immediately
  const defaultApps: App[] = [
    {
      id: 'justsplit',
      name: 'JustSplit',
      description: t('apps.justsplit.description') || 'Split expenses with friends and family',
      icon: '💰',
      url: 'http://localhost:40002',
      proxyPath: '/app/justsplit',
      category: 'finance',
      status: 'active',
      requiresAuth: true,
      features: [
        t('apps.features.expenseTracking') || 'Expense tracking',
        t('apps.features.groupManagement') || 'Group management',
        t('apps.features.settlementTracking') || 'Settlement tracking'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    async function loadApps() {
      // Show default apps immediately
      if (!hasLoadedFromDB) {
        setApps(defaultApps);
        setLoading(false);
      }

      // Then try to load from database if user is available
      if (!user) return;

      try {
        // Double-check auth state before querying
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          console.log('No auth state, skipping apps query');
          return;
        }
        
        const db = getHubFirestore();
        const availableApps = await queryDocuments<App>(
          db,
          'apps',
          where('status', '==', 'active')
        );

        // If we got apps from DB, use them; otherwise keep defaults
        if (availableApps.length > 0) {
          setApps(availableApps);
        }
        setHasLoadedFromDB(true);
      } catch (error) {
        console.error('Failed to load apps:', error);
        // Keep showing default apps on error
      }
    }

    loadApps();
  }, [user, hasLoadedFromDB, t]);

  // Always show apps grid (default apps load immediately)
  return (
    <div className={styles.grid}>
      {apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  const { userProfile: user, currentUser } = useHubAuth();
  const { t } = useLanguage();

  const handleLaunch = async () => {
    if (!user || !currentUser) return;

    // Make sure shared auth is saved before navigating
    const sharedUser: SharedAuthUser = {
      uid: user.id,
      email: user.email || null,
      displayName: user.name,
      photoURL: user.avatarUrl || null,
      emailVerified: true
    };
    
    // Use auth bridge for reliable auth transfer
    console.log('🚀 AppGrid: Preparing auth for app launch', app.id);
    await prepareAuthForApp(sharedUser, app.id);
    
    // Convert to AuthUser for token generation
    const authUser: AuthUser = {
      uid: sharedUser.uid,
      email: sharedUser.email || undefined,
      displayName: sharedUser.displayName || undefined,
      photoURL: sharedUser.photoURL,
      emailVerified: sharedUser.emailVerified
    };
    
    // Generate secure app URL with auth token
    const targetUrl = await AuthTokenService.generateAppUrl(
      app.url,
      authUser,
      app.id
    );
    
    console.log('🚀 AppGrid: Launching app with auth token', targetUrl);
    // Use window.open to keep Hub running
    window.open(targetUrl, '_self');
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