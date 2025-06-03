'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaRocket, FaBell } from 'react-icons/fa';
import { useState } from 'react';
import styles from './page.module.css';

const appInfo = {
  somos: {
    name: 'Somos',
    icon: '🌳',
    description: 'Explore your family roots and heritage',
    color: '#8B4513',
    features: [
      'Interactive family tree builder',
      'Cultural heritage documentation',
      'Photo and story archiving',
      'DNA integration support'
    ]
  },
  demos: {
    name: 'Demos',
    icon: '🗳️',
    description: 'Community governance made simple',
    color: '#4169E1',
    features: [
      'Transparent voting systems',
      'Proposal management',
      'Community discussions',
      'Decision tracking'
    ]
  },
  plantopia: {
    name: 'Plantopia',
    icon: '🌱',
    description: 'Smart gardening companion',
    color: '#00A86B',
    features: [
      'Plant care reminders',
      'Garden planning tools',
      'Weather integration',
      'Community plant exchange'
    ]
  }
};

export default function ComingSoonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const appName = searchParams.get('app') || 'unknown';
  const app = appInfo[appName as keyof typeof appInfo] || appInfo.somos;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.backButton}>
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <div className={styles.content}>
          <div className={styles.appIcon} style={{ backgroundColor: `${app.color}20` }}>
            <span>{app.icon}</span>
          </div>

          <h1 className={styles.title}>{app.name} is Coming Soon!</h1>
          <p className={styles.description}>{app.description}</p>

          <div className={styles.features}>
            <h2>What to expect:</h2>
            <ul>
              {app.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles.notify}>
            <h3>
              <FaBell /> Get notified when {app.name} launches
            </h3>
            {subscribed ? (
              <div className={styles.success}>
                <FaRocket /> Thanks! We'll notify you when {app.name} is ready.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.button}>
                  Notify Me
                </button>
              </form>
            )}
          </div>

          <div className={styles.timeline}>
            <p>Expected launch: <strong>Q2 2025</strong></p>
          </div>
        </div>
      </div>
    </main>
  );
}