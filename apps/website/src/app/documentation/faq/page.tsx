'use client';

import { FAQ } from '../components/FAQ';
import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function FAQPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.faqTitle') || 'FAQ'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.faqSubtitle') || 'Frequently asked questions about CyberEco'}
        </p>
      </div>
      <FAQ />
    </div>
  );
}