'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@cybereco/auth';
import { ConsentType } from '@cybereco/auth';
import { Button } from '@cybereco/ui-components';
import { FaCookie, FaTimes } from 'react-icons/fa';
import styles from './ConsentBanner.module.css';

interface ConsentBannerProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
}

export default function ConsentBanner({ 
  onAcceptAll, 
  onRejectAll, 
  onCustomize 
}: ConsentBannerProps) {
  const { currentUser: user } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consents, setConsents] = useState({
    [ConsentType.NECESSARY]: true,
    [ConsentType.FUNCTIONAL]: true,
    [ConsentType.ANALYTICS]: false,
    [ConsentType.MARKETING]: false,
    [ConsentType.PERSONALIZATION]: false
  });

  useEffect(() => {
    checkConsentStatus();
  }, [user]);

  const checkConsentStatus = async () => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cybereco_consent_given');
    
    if (!hasConsent) {
      setShowBanner(true);
    } else if (user) {
      // Load user's consent preferences
      try {
        const response = await fetch('/api/privacy/consent');
        if (response.ok) {
          const userConsents = await response.json();
          setConsents(userConsents);
        }
      } catch (error) {
        console.error('Error loading consent preferences:', error);
      }
    }
  };

  const handleAcceptAll = async () => {
    setLoading(true);
    
    try {
      if (user) {
        // Record all consents as granted
        await Promise.all([
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.FUNCTIONAL, granted: true })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.ANALYTICS, granted: true })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.MARKETING, granted: true })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.PERSONALIZATION, granted: true })
          })
        ]);
      }

      // Mark consent as given
      localStorage.setItem('cybereco_consent_given', 'true');
      localStorage.setItem('cybereco_consent_preferences', JSON.stringify({
        ...consents,
        [ConsentType.FUNCTIONAL]: true,
        [ConsentType.ANALYTICS]: true,
        [ConsentType.MARKETING]: true,
        [ConsentType.PERSONALIZATION]: true
      }));

      setShowBanner(false);
      if (onAcceptAll) onAcceptAll();
    } catch (error) {
      console.error('Error recording consent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectAll = async () => {
    setLoading(true);
    
    try {
      if (user) {
        // Record only necessary consent
        await Promise.all([
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.FUNCTIONAL, granted: false })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.ANALYTICS, granted: false })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.MARKETING, granted: false })
          }),
          fetch('/api/privacy/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consentType: ConsentType.PERSONALIZATION, granted: false })
          })
        ]);
      }

      // Mark consent as given (with minimal permissions)
      localStorage.setItem('cybereco_consent_given', 'true');
      localStorage.setItem('cybereco_consent_preferences', JSON.stringify({
        [ConsentType.NECESSARY]: true,
        [ConsentType.FUNCTIONAL]: false,
        [ConsentType.ANALYTICS]: false,
        [ConsentType.MARKETING]: false,
        [ConsentType.PERSONALIZATION]: false
      }));

      setShowBanner(false);
      if (onRejectAll) onRejectAll();
    } catch (error) {
      console.error('Error recording consent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    
    try {
      if (user) {
        // Record individual consents
        await Promise.all(
          Object.entries(consents).map(([type, granted]) => {
            if (type !== ConsentType.NECESSARY) {
              return fetch('/api/privacy/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ consentType: type as ConsentType, granted })
              });
            }
          })
        );
      }

      // Save preferences
      localStorage.setItem('cybereco_consent_given', 'true');
      localStorage.setItem('cybereco_consent_preferences', JSON.stringify(consents));

      setShowBanner(false);
      if (onCustomize) onCustomize();
    } catch (error) {
      console.error('Error saving consent preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleConsent = (type: ConsentType) => {
    if (type === ConsentType.NECESSARY) return; // Can't toggle necessary cookies
    
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.header}>
          <FaCookie className={styles.icon} />
          <h3>Cookie Consent</h3>
          <button 
            className={styles.closeButton}
            onClick={() => setShowBanner(false)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <p className={styles.description}>
          We use cookies to enhance your experience. By continuing to visit this site 
          you agree to our use of cookies. You can manage your preferences below.
        </p>

        {showDetails && (
          <div className={styles.details}>
            <div className={styles.consentOption}>
              <label>
                <input
                  type="checkbox"
                  checked={consents[ConsentType.NECESSARY]}
                  disabled
                />
                <div>
                  <strong>Necessary</strong>
                  <span>Essential for the website to function properly</span>
                </div>
              </label>
            </div>

            <div className={styles.consentOption}>
              <label>
                <input
                  type="checkbox"
                  checked={consents[ConsentType.FUNCTIONAL]}
                  onChange={() => toggleConsent(ConsentType.FUNCTIONAL)}
                />
                <div>
                  <strong>Functional</strong>
                  <span>Enable enhanced functionality and personalization</span>
                </div>
              </label>
            </div>

            <div className={styles.consentOption}>
              <label>
                <input
                  type="checkbox"
                  checked={consents[ConsentType.ANALYTICS]}
                  onChange={() => toggleConsent(ConsentType.ANALYTICS)}
                />
                <div>
                  <strong>Analytics</strong>
                  <span>Help us understand how you use our services</span>
                </div>
              </label>
            </div>

            <div className={styles.consentOption}>
              <label>
                <input
                  type="checkbox"
                  checked={consents[ConsentType.MARKETING]}
                  onChange={() => toggleConsent(ConsentType.MARKETING)}
                />
                <div>
                  <strong>Marketing</strong>
                  <span>Show you relevant advertisements and offers</span>
                </div>
              </label>
            </div>

            <div className={styles.consentOption}>
              <label>
                <input
                  type="checkbox"
                  checked={consents[ConsentType.PERSONALIZATION]}
                  onChange={() => toggleConsent(ConsentType.PERSONALIZATION)}
                />
                <div>
                  <strong>Personalization</strong>
                  <span>Remember your preferences and settings</span>
                </div>
              </label>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={() => setShowDetails(!showDetails)}
            disabled={loading}
          >
            {showDetails ? 'Hide Details' : 'Customize'}
          </Button>

          {showDetails ? (
            <Button
              onClick={handleSavePreferences}
              disabled={loading}
            >
              Save Preferences
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={handleRejectAll}
                disabled={loading}
              >
                Reject All
              </Button>
              <Button
                onClick={handleAcceptAll}
                disabled={loading}
              >
                Accept All
              </Button>
            </>
          )}
        </div>

        <a 
          href="/privacy" 
          className={styles.privacyLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}