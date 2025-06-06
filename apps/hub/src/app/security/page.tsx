'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHubAuth } from '../../hooks/useHubAuth';
import { securityService } from '../../services/securityService';
import { 
  FaShieldAlt, 
  FaKey,
  FaHistory,
  FaDesktop,
  FaLock,
  FaBell,
  FaUserShield,
  FaChevronRight,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import styles from './page.module.css';

export default function SecurityPage() {
  const { userProfile: user, isLoading } = useHubAuth();
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [activeSessionCount, setActiveSessionCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      check2FAStatus();
      fetchActiveSessions();
    }
  }, [user]);

  const check2FAStatus = async () => {
    if (!user) return;
    
    try {
      const { enabled } = await securityService.check2FAStatus();
      setIs2FAEnabled(enabled);
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const fetchActiveSessions = async () => {
    // In a real implementation, this would fetch from the API
    setActiveSessionCount(1);
  };

  if (isLoading || !user) {
    return null;
  }

  const securityItems = [
    {
      icon: FaShieldAlt,
      title: 'Two-Factor Authentication',
      description: is2FAEnabled 
        ? 'Your account is protected with 2FA' 
        : 'Add an extra layer of security to your account',
      status: is2FAEnabled ? 'enabled' : 'recommended',
      href: '/security/two-factor'
    },
    {
      icon: FaKey,
      title: 'Password',
      description: 'Change your password or update security settings',
      status: 'secure',
      href: '/security/password'
    },
    {
      icon: FaDesktop,
      title: 'Active Sessions',
      description: `${activeSessionCount} active session${activeSessionCount !== 1 ? 's' : ''} on your account`,
      status: activeSessionCount > 3 ? 'warning' : 'normal',
      href: '/security/sessions'
    },
    {
      icon: FaHistory,
      title: 'Security Activity',
      description: 'Review recent security events and login attempts',
      status: 'normal',
      href: '/security/activity'
    },
    {
      icon: FaBell,
      title: 'Security Alerts',
      description: 'Configure how you receive security notifications',
      status: 'normal',
      href: '/security/alerts'
    },
    {
      icon: FaUserShield,
      title: 'Privacy Settings',
      description: 'Control your data sharing and privacy preferences',
      status: 'normal',
      href: '/privacy'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaLock className={styles.titleIcon} />
            Security Settings
          </h1>
          <p className={styles.subtitle}>
            Manage your account security and privacy settings
          </p>
        </header>

        <div className={styles.securityScore}>
          <div className={styles.scoreHeader}>
            <h2>Security Score</h2>
            <div className={styles.scoreValue}>
              <span className={styles.score}>{is2FAEnabled ? '85' : '60'}</span>
              <span className={styles.scoreMax}>/100</span>
            </div>
          </div>
          <div className={styles.scoreBar}>
            <div 
              className={styles.scoreProgress} 
              style={{ width: `${is2FAEnabled ? 85 : 60}%` }}
            />
          </div>
          <p className={styles.scoreMessage}>
            {is2FAEnabled 
              ? 'Your account has strong security. Keep it up!'
              : 'Enable two-factor authentication to improve your security score.'}
          </p>
        </div>

        <div className={styles.securityItems}>
          {securityItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={styles.securityItem}
            >
              <div className={styles.itemIcon}>
                <item.icon />
              </div>
              <div className={styles.itemContent}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className={styles.itemStatus}>
                {item.status === 'enabled' && (
                  <span className={`${styles.status} ${styles.statusEnabled}`}>
                    <FaCheck /> Enabled
                  </span>
                )}
                {item.status === 'recommended' && (
                  <span className={`${styles.status} ${styles.statusRecommended}`}>
                    <FaExclamationTriangle /> Recommended
                  </span>
                )}
                {item.status === 'warning' && (
                  <span className={`${styles.status} ${styles.statusWarning}`}>
                    <FaExclamationTriangle /> Review
                  </span>
                )}
                <FaChevronRight className={styles.chevron} />
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.tips}>
          <h2>Security Tips</h2>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <FaKey className={styles.tipIcon} />
              <div>
                <h4>Use a strong, unique password</h4>
                <p>Don't reuse passwords across different services</p>
              </div>
            </div>
            <div className={styles.tip}>
              <FaShieldAlt className={styles.tipIcon} />
              <div>
                <h4>Enable two-factor authentication</h4>
                <p>Add an extra layer of protection to your account</p>
              </div>
            </div>
            <div className={styles.tip}>
              <FaDesktop className={styles.tipIcon} />
              <div>
                <h4>Review active sessions regularly</h4>
                <p>Sign out of devices you don't recognize</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}