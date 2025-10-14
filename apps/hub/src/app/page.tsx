'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHubAuth } from '../hooks/useHubAuth';
import LandingPage from './landing/page';
import styles from './page.module.css';

export default function Home() {
  const { userProfile: user, isLoading: loading } = useHubAuth();
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(true);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    // If we have a user (cached or fresh), redirect immediately
    if (user) {
      // Give a tiny delay to prevent flash
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // If loading finished and no user, definitely show landing
    if (!loading && !user) {
      setShowLanding(true);
    }
  }, [user, loading, router]);

  // Show redirect screen only if we have a confirmed user
  if (user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

  // Show landing page by default (even while checking auth)
  // This ensures instant display for logged-out users
  return <LandingPage />;
}