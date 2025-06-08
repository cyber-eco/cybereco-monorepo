'use client';

import styles from '../../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function CommunityGovernancePage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.communityGovernanceItem') || 'Community & Governance'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.communityGovernanceSubtitle') || 'Digital tools for community building and democratic governance'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🏛️ {t('documentation:documentationPage.democraticPlatformsTitle') || 'Democratic Platforms'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.democraticPlatformsText') || 'Building technology that empowers communities to make collective decisions and manage shared resources effectively.'}
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🗳️</div>
            <h4 className={styles.featureTitle}>Demos</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.demosDescription') || 'Transparent voting and decision-making platform for communities'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h4 className={styles.featureTitle}>Commune</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.communeDescription') || 'Resource sharing and community management tools'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📢</div>
            <h4 className={styles.featureTitle}>Forum</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.forumDescription') || 'Discussion and consensus-building platform'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🎯 {t('documentation:documentationPage.keyFeaturesTitle') || 'Key Features'}</h3>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.governanceFeature1') || 'Transparent voting mechanisms'}</li>
          <li>{t('documentation:documentationPage.governanceFeature2') || 'Consensus-building tools'}</li>
          <li>{t('documentation:documentationPage.governanceFeature3') || 'Resource allocation management'}</li>
          <li>{t('documentation:documentationPage.governanceFeature4') || 'Community proposal systems'}</li>
        </ul>
      </div>
    </div>
  );
}