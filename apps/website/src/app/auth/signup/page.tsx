'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function SignupRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Hub signup after a brief delay
    const timer = setTimeout(() => {
      window.location.href = 'https://hub.cybere.co/auth/signup';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Redirecting to CyberEco Hub...</h1>
        <p className={styles.text}>
          You'll be redirected to the CyberEco Hub to create your account.
        </p>
        <div className={styles.spinner}></div>
        <p className={styles.linkText}>
          If you're not redirected automatically, 
          <a href="https://hub.cybere.co/auth/signup" className={styles.link}> click here</a>.
        </p>
      </div>
    </div>
  );
}