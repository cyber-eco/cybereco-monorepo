'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaExclamationTriangle, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

export function Troubleshooting() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.troubleshootingTitle') || 'Troubleshooting'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.troubleshootingSubtitle') || 'Quick solutions to common issues and problems'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🔧 {t('documentation:documentationPage.commonIssuesTitle') || 'Common Issues'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.troubleshootingIntro') || 'Quick solutions to common issues. Most problems can be resolved with these simple steps.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔑 {t('documentation:documentationPage.authenticationIssuesTitle') || 'Authentication Issues'}</h4>
        <div className={styles.troubleshootingGrid}>
          <div className={styles.issueCard}>
            <div className={styles.issueHeader}>
              <FaExclamationTriangle className={styles.warningIcon} />
              <h5>{t('documentation:documentationPage.cantSignInIssue') || 'Can\'t Sign In'}</h5>
            </div>
            <div className={styles.issueSolutions}>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.checkCredentials') || 'Verify email and password are correct'}</span>
              </div>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.clearCache') || 'Clear browser cache and cookies'}</span>
              </div>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.disableExtensions') || 'Disable browser extensions temporarily'}</span>
              </div>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.resetPassword') || 'Use "Forgot Password" to reset credentials'}</span>
              </div>
            </div>
          </div>

          <div className={styles.issueCard}>
            <div className={styles.issueHeader}>
              <FaExclamationTriangle className={styles.warningIcon} />
              <h5>{t('documentation:documentationPage.sessionExpiredIssue') || 'Session Keeps Expiring'}</h5>
            </div>
            <div className={styles.issueSolutions}>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.enableCookies') || 'Ensure cookies are enabled'}</span>
              </div>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.checkDateTime') || 'Verify system date/time is correct'}</span>
              </div>
              <div className={styles.solution}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{t('documentation:documentationPage.stableConnection') || 'Use a stable internet connection'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>📱 {t('documentation:documentationPage.appSpecificIssuesTitle') || 'Application-Specific Issues'}</h4>
        <div className={styles.appIssuesContainer}>
          <div className={styles.appIssueSection}>
            <h5>{t('documentation:documentationPage.justSplitIssues') || 'JustSplit Issues'}</h5>
            <div className={styles.issueList}>
              <div className={styles.issueItem}>
                <strong>{t('documentation:documentationPage.expensesNotSyncing') || 'Expenses not syncing:'}</strong>
                <p>{t('documentation:documentationPage.expensesNotSyncingSolution') || 'Check internet connection and refresh the page. Offline changes sync automatically when online.'}</p>
              </div>
              <div className={styles.issueItem}>
                <strong>{t('documentation:documentationPage.wrongCalculations') || 'Settlement calculations seem wrong:'}</strong>
                <p>{t('documentation:documentationPage.wrongCalculationsSolution') || 'Verify all expenses are assigned correctly and currency conversions are up to date.'}</p>
              </div>
              <div className={styles.issueItem}>
                <strong>{t('documentation:documentationPage.cantInviteFriends') || 'Can\'t invite friends:'}</strong>
                <p>{t('documentation:documentationPage.cantInviteFriendsSolution') || 'Ensure you have the correct email address and they haven\'t already joined the group.'}</p>
              </div>
            </div>
          </div>

          <div className={styles.appIssueSection}>
            <h5>{t('documentation:documentationPage.hubIssues') || 'Hub Issues'}</h5>
            <div className={styles.issueList}>
              <div className={styles.issueItem}>
                <strong>{t('documentation:documentationPage.ssoNotWorking') || 'SSO not working across apps:'}</strong>
                <p>{t('documentation:documentationPage.ssoNotWorkingSolution') || 'Sign out from all apps and sign in again through Hub. Check that third-party cookies are enabled.'}</p>
              </div>
              <div className={styles.issueItem}>
                <strong>{t('documentation:documentationPage.twoFactorLocked') || 'Locked out by 2FA:'}</strong>
                <p>{t('documentation:documentationPage.twoFactorLockedSolution') || 'Use backup codes or contact support with account verification details.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>⚡ {t('documentation:documentationPage.performanceIssuesTitle') || 'Performance Issues'}</h4>
        <div className={styles.performanceGrid}>
          <div className={styles.performanceCard}>
            <h5>{t('documentation:documentationPage.slowLoadingIssue') || 'Slow Loading Times'}</h5>
            <ul className={styles.performanceList}>
              <li>{t('documentation:documentationPage.checkInternetSpeed') || 'Check internet connection speed'}</li>
              <li>{t('documentation:documentationPage.updateBrowser') || 'Update to latest browser version'}</li>
              <li>{t('documentation:documentationPage.disableVPN') || 'Disable VPN if experiencing delays'}</li>
              <li>{t('documentation:documentationPage.reduceDataUsage') || 'Enable data saver mode in settings'}</li>
            </ul>
          </div>

          <div className={styles.performanceCard}>
            <h5>{t('documentation:documentationPage.appCrashingIssue') || 'App Crashing or Freezing'}</h5>
            <ul className={styles.performanceList}>
              <li>{t('documentation:documentationPage.clearAppData') || 'Clear app data and cache'}</li>
              <li>{t('documentation:documentationPage.checkDeviceStorage') || 'Ensure sufficient device storage'}</li>
              <li>{t('documentation:documentationPage.closeOtherApps') || 'Close unnecessary browser tabs'}</li>
              <li>{t('documentation:documentationPage.reportBug') || 'Report persistent issues to support'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.tipBox}>
          <FaLightbulb className={styles.tipIcon} />
          <h4>{t('documentation:documentationPage.proTipsTitle') || 'Pro Tips'}</h4>
          <ul className={styles.tipsList}>
            <li>{t('documentation:documentationPage.bookmarkHub') || 'Bookmark the Hub URL for quick access'}</li>
            <li>{t('documentation:documentationPage.usePasswordManager') || 'Use a password manager for secure credentials'}</li>
            <li>{t('documentation:documentationPage.enableNotifications') || 'Enable notifications for important updates'}</li>
            <li>{t('documentation:documentationPage.joinBeta') || 'Join our beta program to test new features early'}</li>
          </ul>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.emergencyBox}>
          <h4>{t('documentation:documentationPage.emergencySupportTitle') || '🚨 Emergency Support'}</h4>
          <p>{t('documentation:documentationPage.emergencySupportDesc') || 'For critical issues affecting your account security or data:'}</p>
          <div className={styles.emergencyContacts}>
            <div className={styles.contactMethod}>
              <strong>{t('documentation:documentationPage.emailSupport') || 'Email:'}</strong>
              <a href="mailto:emergency@cybere.co">emergency@cybere.co</a>
            </div>
            <div className={styles.contactMethod}>
              <strong>{t('documentation:documentationPage.responseTime') || 'Response Time:'}</strong>
              <span>{t('documentation:documentationPage.within24Hours') || 'Within 24 hours'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}