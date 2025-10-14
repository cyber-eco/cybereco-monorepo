'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';

export function KeyConcepts() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.keyConceptsTitle') || 'Key Concepts & Architecture'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.keyConceptsSubtitle') || 'Understanding the core principles and architecture of CyberEco'}
        </p>
      </div>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🔑 {t('documentation:documentationPage.digitalSovereigntyConceptTitle') || 'Digital Sovereignty'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.digitalSovereigntyConceptText') || 'At the core of CyberEco is the principle of digital sovereignty - the idea that individuals should own and control their digital identity and data. Our architecture ensures that:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.digitalSovereigntyPoint1') || 'Users maintain ownership of their personal data'}</li>
          <li>{t('documentation:documentationPage.digitalSovereigntyPoint2') || 'Applications are designed to be interoperable and user-controlled'}</li>
          <li>{t('documentation:documentationPage.digitalSovereigntyPoint3') || 'No single entity has monopolistic control over user information'}</li>
          <li>{t('documentation:documentationPage.digitalSovereigntyPoint4') || 'Privacy is built into the core design, not added as an afterthought'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🏗️ {t('documentation:documentationPage.ecosystemArchitectureTitle') || 'Ecosystem Architecture'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.ecosystemArchitectureText') || 'CyberEco is built as a modular ecosystem where each application serves a specific purpose while contributing to the greater whole:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.architecturePoint1') || 'Hub: Central authentication and identity management'}</li>
          <li>{t('documentation:documentationPage.architecturePoint2') || 'Application Layer: Specialized apps for different life domains'}</li>
          <li>{t('documentation:documentationPage.architecturePoint3') || 'Data Layer: User-controlled data storage and sharing'}</li>
          <li>{t('documentation:documentationPage.architecturePoint4') || 'Integration Layer: APIs and protocols for seamless interaction'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>❤️ {t('documentation:documentationPage.humanCenteredDesignTitle') || 'Human-Centered Design'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.humanCenteredDesignText') || 'Every application in the CyberEco ecosystem is designed with human well-being and authentic connection at its center. This means:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.humanCenteredPoint1') || 'Minimizing addictive design patterns'}</li>
          <li>{t('documentation:documentationPage.humanCenteredPoint2') || 'Promoting real-world relationships and activities'}</li>
          <li>{t('documentation:documentationPage.humanCenteredPoint3') || 'Supporting individual growth and community building'}</li>
          <li>{t('documentation:documentationPage.humanCenteredPoint4') || 'Respecting human attention and mental health'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🤝 {t('documentation:documentationPage.communityDrivenTitle') || 'Community-Driven Development'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.communityDrivenText') || 'Our development process is guided by actual community needs rather than profit maximization. We prioritize:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.communityDrivenPoint1') || 'Open-source development where possible'}</li>
          <li>{t('documentation:documentationPage.communityDrivenPoint2') || 'Community feedback and involvement in feature development'}</li>
          <li>{t('documentation:documentationPage.communityDrivenPoint3') || 'Transparent roadmaps and decision-making processes'}</li>
          <li>{t('documentation:documentationPage.communityDrivenPoint4') || 'Sustainable business models that align with user interests'}</li>
        </ul>
      </div>
    </div>
  );
}