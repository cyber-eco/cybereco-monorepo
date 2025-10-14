'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../app/redirect.module.css';

interface RedirectPageProps {
  to: string;
  message?: string;
}

export default function RedirectPage({ to, message = 'Redirecting to documentation...' }: RedirectPageProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
      </noscript>
      <div className={styles.redirectContainer}>
        <p className={styles.redirectMessage}>{message}</p>
        <p className={styles.redirectSubtext}>
          If you are not redirected, <a href={to} className={styles.redirectLink}>click here</a>.
        </p>
      </div>
    </>
  );
}