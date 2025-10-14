'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHubAuth } from '../../../hooks/useHubAuth';
import { type Session } from '@cybereco/auth';
import { securityService } from '../../../services/securityService';
import { 
  FaDesktop,
  FaMobileAlt,
  FaTabletAlt,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaTrash,
  FaShieldAlt,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import styles from './page.module.css';

export default function SessionsPage() {
  const { userProfile: user, isLoading } = useHubAuth();
  const router = useRouter();
  interface ExtendedSession extends Session {
  isCurrent?: boolean;
}

const [sessions, setSessions] = useState<ExtendedSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [revokingSession, setRevokingSession] = useState<string | null>(null);
  const [currentSessionId] = useState<string>(() => {
    // In production, get this from the auth token
    return typeof window !== 'undefined' 
      ? localStorage.getItem('currentSessionId') || 'current-session'
      : 'current-session';
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      const userSessions = await securityService.getSessions();
      setSessions(userSessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!user || !confirm('Are you sure you want to sign out of this device?')) {
      return;
    }

    setRevokingSession(sessionId);
    try {
      await securityService.revokeSession(sessionId);
      await fetchSessions();
    } catch (error) {
      console.error('Error revoking session:', error);
      alert('Failed to revoke session. Please try again.');
    } finally {
      setRevokingSession(null);
    }
  };

  const handleRevokeAllSessions = async () => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to sign out of all other devices? You will remain signed in on this device.')) {
      return;
    }

    setRevokingSession('all');
    try {
      await securityService.revokeAllSessions();
      await fetchSessions();
    } catch (error) {
      console.error('Error revoking all sessions:', error);
      alert('Failed to revoke sessions. Please try again.');
    } finally {
      setRevokingSession(null);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <FaMobileAlt />;
      case 'tablet':
        return <FaTabletAlt />;
      default:
        return <FaDesktop />;
    }
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaDesktop className={styles.titleIcon} />
            Active Sessions
          </h1>
          <p className={styles.subtitle}>
            Manage devices and browsers that are signed in to your account
          </p>
        </header>

        {sessions.length > 1 && (
          <div className={styles.actionBar}>
            <button 
              className={styles.revokeAllButton}
              onClick={handleRevokeAllSessions}
              disabled={revokingSession === 'all'}
            >
              {revokingSession === 'all' ? (
                <><FaSpinner className={styles.spinner} /> Revoking...</>
              ) : (
                <>Sign Out All Other Sessions</>
              )}
            </button>
          </div>
        )}

        <div className={styles.sessionsList}>
          {isLoadingSessions ? (
            <div className={styles.loading}>
              <FaSpinner className={styles.spinner} />
              Loading sessions...
            </div>
          ) : sessions.length === 0 ? (
            <div className={styles.emptyState}>
              <FaDesktop className={styles.emptyIcon} />
              <h3>No Active Sessions</h3>
              <p>You don't have any active sessions.</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.sessionId} 
                className={`${styles.sessionCard} ${session.isCurrent ? styles.currentSession : ''}`}
              >
                <div className={styles.sessionIcon}>
                  {getDeviceIcon(session.deviceInfo.deviceType || 'desktop')}
                </div>
                
                <div className={styles.sessionInfo}>
                  <div className={styles.sessionHeader}>
                    <h3>
                      {session.deviceInfo.browser || 'Unknown Browser'} on {session.deviceInfo.os || 'Unknown OS'}
                      {session.isCurrent && (
                        <span className={styles.currentBadge}>Current Session</span>
                      )}
                    </h3>
                    {!session.isCurrent && (
                      <button
                        className={styles.revokeButton}
                        onClick={() => handleRevokeSession(session.sessionId)}
                        disabled={revokingSession === session.sessionId}
                        title="Revoke session"
                      >
                        {revokingSession === session.sessionId ? (
                          <FaSpinner className={styles.spinner} />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.sessionDetails}>
                    {session.location && (
                      <div className={styles.detail}>
                        <FaMapMarkerAlt />
                        <span>
                          {session.location.city || 'Unknown'}, {session.location.country || 'Unknown'}
                        </span>
                      </div>
                    )}
                    
                    <div className={styles.detail}>
                      <FaClock />
                      <span>
                        Last active {formatDistanceToNow(new Date(session.lastActivity), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <div className={styles.detail}>
                      <FaGlobe />
                      <span className={styles.userAgent}>
                        {session.deviceInfo.userAgent}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.securityNote}>
          <FaShieldAlt className={styles.noteIcon} />
          <div>
            <h4>Security Tip</h4>
            <p>
              If you see any unfamiliar devices or locations, revoke those sessions immediately 
              and change your password.
            </p>
          </div>
        </div>

        {sessions.some(s => !s.isCurrent) && (
          <div className={styles.warningNote}>
            <FaExclamationTriangle className={styles.warningIcon} />
            <div>
              <h4>Multiple Sessions Detected</h4>
              <p>
                You're signed in on {sessions.length} device{sessions.length > 1 ? 's' : ''}. 
                Make sure you recognize all of them.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}