'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/JustSplitAuthContext';
import styles from '../page.module.css';

export default function SignUp() {
  const { currentUser, userProfile, isLoading, redirectToHub } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (userProfile && !isLoading) {
      router.push('/');
    }
    // If not authenticated and not loading, redirect to Hub
    else if (!currentUser && !isLoading) {
      redirectToHub('signup');
    }
  }, [currentUser, userProfile, isLoading, router, redirectToHub]);

  // Show loading state while checking auth
  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Creating Account...</h1>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-600">Redirecting to CyberEco Hub to create your account...</p>
        </div>
      </div>
    </div>
  );
}