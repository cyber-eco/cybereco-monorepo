'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import Link from 'next/link';

export default function DataPrivacyPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.dataPrivacyNavItem') || 'Data & Privacy'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.dataPrivacySubtitle') || 'Comprehensive data protection and privacy controls'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🔒 {t('documentation:documentationPage.privacyOverviewTitle') || 'Privacy-First Architecture'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.privacyOverviewText') || 'CyberEco is built with privacy at its core. Every feature is designed to protect user data and give individuals complete control over their information.'}
        </p>
      </div>

      <div className={styles.docSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:documentationPage.privacyFeaturesTitle') || 'Privacy Features'}
        </h2>
        <div className={styles.cardGrid}>
          <Link href="/documentation/privacy-controls" className={styles.docCard}>
            <div className={styles.cardIcon}>🛡️</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.privacyControlsTitle') || 'Privacy Controls & GDPR'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.privacyControlsDesc') || 'User consent management and GDPR compliance tools'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.learnMore') || 'Learn more'}
            </span>
          </Link>

          <Link href="/documentation/data-export" className={styles.docCard}>
            <div className={styles.cardIcon}>📤</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.dataExportTitle') || 'Data Export & Portability'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.dataExportDesc') || 'Export your data anytime in standard formats'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.explore') || 'Explore'}
            </span>
          </Link>

          <Link href="/documentation/data-architecture" className={styles.docCard}>
            <div className={styles.cardIcon}>🏗️</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.dataArchitectureTitle') || 'Data Layer Architecture'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.dataArchitectureDesc') || 'How we structure and protect your data'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.viewDetails') || 'View details'}
            </span>
          </Link>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🎯 {t('documentation:documentationPage.privacyPrinciplesTitle') || 'Privacy Principles'}</h3>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.privacyPrinciple1') || 'Data minimization - we only collect what\'s necessary'}</li>
          <li>{t('documentation:documentationPage.privacyPrinciple2') || 'Purpose limitation - data is used only for stated purposes'}</li>
          <li>{t('documentation:documentationPage.privacyPrinciple3') || 'User control - you decide how your data is used'}</li>
          <li>{t('documentation:documentationPage.privacyPrinciple4') || 'Transparency - clear information about data practices'}</li>
        </ul>
      </div>
    </div>
  );
}