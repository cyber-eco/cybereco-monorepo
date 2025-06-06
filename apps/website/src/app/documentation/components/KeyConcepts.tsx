'use client';

import styles from '../page.module.css';
import { useLanguage } from '@cybereco/ui-components';

export function KeyConcepts() {
  const { t } = useLanguage();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🔑 {t('documentationPage.digitalSovereigntyConceptTitle') || 'Digital Sovereignty'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.digitalSovereigntyConceptText') || 'At the core of CyberEco is the principle of digital sovereignty - the idea that individuals should own and control their digital identity and data. Our architecture ensures that:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentationPage.digitalSovereigntyPoint1') || 'Users maintain ownership of their personal data'}</li>
          <li>{t('documentationPage.digitalSovereigntyPoint2') || 'Applications are designed to be interoperable and user-controlled'}</li>
          <li>{t('documentationPage.digitalSovereigntyPoint3') || 'No single entity has monopolistic control over user information'}</li>
          <li>{t('documentationPage.digitalSovereigntyPoint4') || 'Privacy is built into the core design, not added as an afterthought'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🏗️ {t('documentationPage.ecosystemArchitectureTitle') || 'Ecosystem Architecture'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.ecosystemArchitectureText') || 'CyberEco is built as a modular ecosystem where each application serves a specific purpose while contributing to the greater whole:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentationPage.architecturePoint1') || 'Hub: Central authentication and identity management'}</li>
          <li>{t('documentationPage.architecturePoint2') || 'Application Layer: Specialized apps for different life domains'}</li>
          <li>{t('documentationPage.architecturePoint3') || 'Data Layer: User-controlled data storage and sharing'}</li>
          <li>{t('documentationPage.architecturePoint4') || 'Integration Layer: APIs and protocols for seamless interaction'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>❤️ {t('documentationPage.humanCenteredDesignTitle') || 'Human-Centered Design'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.humanCenteredDesignText') || 'Every application in the CyberEco ecosystem is designed with human well-being and authentic connection at its center. This means:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentationPage.humanCenteredPoint1') || 'Minimizing addictive design patterns'}</li>
          <li>{t('documentationPage.humanCenteredPoint2') || 'Promoting real-world relationships and activities'}</li>
          <li>{t('documentationPage.humanCenteredPoint3') || 'Supporting individual growth and community building'}</li>
          <li>{t('documentationPage.humanCenteredPoint4') || 'Respecting human attention and mental health'}</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🤝 {t('documentationPage.communityDrivenTitle') || 'Community-Driven Development'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.communityDrivenText') || 'Our development process is guided by actual community needs rather than profit maximization. We prioritize:'}
        </p>
        <ul className={styles.conceptList}>
          <li>{t('documentationPage.communityDrivenPoint1') || 'Open-source development where possible'}</li>
          <li>{t('documentationPage.communityDrivenPoint2') || 'Community feedback and involvement in feature development'}</li>
          <li>{t('documentationPage.communityDrivenPoint3') || 'Transparent roadmaps and decision-making processes'}</li>
          <li>{t('documentationPage.communityDrivenPoint4') || 'Sustainable business models that align with user interests'}</li>
        </ul>
      </div>
    </>
  );
}