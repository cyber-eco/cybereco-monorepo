'use client';

import styles from '../../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function EducationGrowthPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.educationGrowthItem') || 'Education & Growth'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.educationGrowthSubtitle') || 'Lifelong learning and personal development tools'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentation:documentationPage.learningPlatformsTitle') || 'Learning & Development Platforms'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.learningPlatformsText') || 'Empowering individuals and communities through accessible education and skill development.'}
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎓</div>
            <h4 className={styles.featureTitle}>Academy</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.academyDescription') || 'Peer-to-peer learning and skill sharing platform'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🧠</div>
            <h4 className={styles.featureTitle}>MindGrow</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.mindGrowDescription') || 'Personal development and wellness tracking'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👨‍👩‍👧‍👦</div>
            <h4 className={styles.featureTitle}>Somos</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.somosDescription') || 'Family history and cultural heritage preservation'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:documentationPage.educationPrinciplesTitle') || 'Educational Principles'}</h3>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.educationPrinciple1') || 'Accessible education for all'}</li>
          <li>{t('documentation:documentationPage.educationPrinciple2') || 'Community-based learning'}</li>
          <li>{t('documentation:documentationPage.educationPrinciple3') || 'Practical skill development'}</li>
          <li>{t('documentation:documentationPage.educationPrinciple4') || 'Cultural knowledge preservation'}</li>
        </ul>
      </div>
    </div>
  );
}