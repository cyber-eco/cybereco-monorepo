'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import Link from 'next/link';

export default function UserGuidesPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.userGuidesTitle') || 'User Guides'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.userGuidesSubtitle') || 'Step-by-step guides for using CyberEco applications'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentation:documentationPage.guideCategoriesTitle') || 'Guide Categories'}</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/guides/account-setup" className={styles.docCard}>
            <div className={styles.cardIcon}>🚀</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.accountSetupTitle') || 'Account Setup'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.accountSetupDesc') || 'Get started with your CyberEco account and configure your profile.'}
            </p>
          </Link>

          <Link href="/documentation/guides/justsplit" className={styles.docCard}>
            <div className={styles.cardIcon}>💰</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.justSplitGuideTitle') || 'JustSplit Guide'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.justSplitGuideDesc') || 'Learn how to manage group expenses and settlements efficiently.'}
            </p>
          </Link>

          <Link href="/documentation/guides/group-management" className={styles.docCard}>
            <div className={styles.cardIcon}>👥</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.groupManagementTitle') || 'Group Management'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.groupManagementDesc') || 'Create and manage groups for expense sharing.'}
            </p>
          </Link>

          <Link href="/documentation/guides/data-export" className={styles.docCard}>
            <div className={styles.cardIcon}>📊</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.dataExportTitle') || 'Data Export'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.dataExportDesc') || 'Export your data for backup or analysis.'}
            </p>
          </Link>

          <Link href="/documentation/guides/privacy-settings" className={styles.docCard}>
            <div className={styles.cardIcon}>🔐</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.privacySettingsTitle') || 'Privacy Settings'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.privacySettingsDesc') || 'Configure your privacy and security preferences.'}
            </p>
          </Link>

          <Link href="/documentation/guides/mobile-app" className={styles.docCard}>
            <div className={styles.cardIcon}>📱</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.mobileAppTitle') || 'Mobile App'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.mobileAppDesc') || 'Use CyberEco apps on your mobile device.'}
            </p>
          </Link>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🎯 {t('documentation:documentationPage.popularGuidesTitle') || 'Popular Guides'}</h3>
        <div className={styles.guidesList}>
          <Link href="/documentation/guides/justsplit" className={styles.guideLink}>
            <span className={styles.guideNumber}>1</span>
            <span className={styles.guideTitle}>{t('documentation:documentationPage.guide1Title') || 'How to create your first group in JustSplit'}</span>
          </Link>
          <Link href="/documentation/guides/account-setup" className={styles.guideLink}>
            <span className={styles.guideNumber}>2</span>
            <span className={styles.guideTitle}>{t('documentation:documentationPage.guide2Title') || 'Setting up two-factor authentication'}</span>
          </Link>
          <Link href="/documentation/guides/privacy-settings" className={styles.guideLink}>
            <span className={styles.guideNumber}>3</span>
            <span className={styles.guideTitle}>{t('documentation:documentationPage.guide3Title') || 'Managing privacy settings and data export'}</span>
          </Link>
          <Link href="/documentation/guides/justsplit" className={styles.guideLink}>
            <span className={styles.guideNumber}>4</span>
            <span className={styles.guideTitle}>{t('documentation:documentationPage.guide4Title') || 'Understanding expense calculations and settlements'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}