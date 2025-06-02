'use client';

import { useAuth } from '../components/AuthContext';
import { AppGrid } from '../components/AppGrid';
import { LoginForm } from '../components/LoginForm';
import styles from './page.module.css';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Welcome to CyberEco Hub</h1>
          <p className={styles.subtitle}>Sign in to access your digital ecosystem</p>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.welcomeTitle}>
            Welcome back, {user.displayName || user.email}!
          </h1>
          <p className={styles.welcomeSubtitle}>
            Your digital ecosystem awaits
          </p>
        </div>
      </section>
      
      <section className={styles.appSection}>
        <div className="container">
          <h2>Your Applications</h2>
          <AppGrid />
        </div>
      </section>
    </main>
  );
}