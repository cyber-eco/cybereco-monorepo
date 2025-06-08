'use client';

import styles from '../../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function SustainabilityHomePage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.sustainabilityHomeItem') || 'Sustainability & Home'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.sustainabilityHomeSubtitle') || 'Smart solutions for sustainable living and home management'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌱 {t('documentation:documentationPage.sustainableLivingTitle') || 'Sustainable Living Solutions'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.sustainableLivingText') || 'Technology that helps you live more sustainably and manage your home intelligently.'}
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌿</div>
            <h4 className={styles.featureTitle}>Plantopia</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.plantopiaDescription') || 'Smart gardening assistant for sustainable food production'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏠</div>
            <h4 className={styles.featureTitle}>HomeHub</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.homeHubDescription') || 'Intelligent home management and automation'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>♻️</div>
            <h4 className={styles.featureTitle}>EcoTrack</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.ecoTrackDescription') || 'Carbon footprint tracking and reduction tools'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🎯 {t('documentation:documentationPage.sustainabilityGoalsTitle') || 'Sustainability Goals'}</h3>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.sustainabilityGoal1') || 'Reduce environmental impact'}</li>
          <li>{t('documentation:documentationPage.sustainabilityGoal2') || 'Promote local food production'}</li>
          <li>{t('documentation:documentationPage.sustainabilityGoal3') || 'Optimize resource consumption'}</li>
          <li>{t('documentation:documentationPage.sustainabilityGoal4') || 'Build resilient communities'}</li>
        </ul>
      </div>
    </div>
  );
}