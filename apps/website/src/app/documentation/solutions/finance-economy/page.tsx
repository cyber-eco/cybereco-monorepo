'use client';

import styles from '../../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function FinanceEconomyPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.financeEconomyItem') || 'Finance & Economy'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.financeEconomySubtitle') || 'Ethical financial tools for collaborative economy'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💰 {t('documentation:documentationPage.financialToolsTitle') || 'Financial Collaboration Tools'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.financialToolsText') || 'Creating fair and transparent financial tools that promote collaboration over competition.'}
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h4 className={styles.featureTitle}>JustSplit</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.justSplitDescription') || 'Fair expense sharing for groups and communities'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏦</div>
            <h4 className={styles.featureTitle}>CyberBank</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.cyberBankDescription') || 'Community banking and mutual aid platform'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h4 className={styles.featureTitle}>Budget</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.budgetDescription') || 'Collaborative budgeting and financial planning'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:documentationPage.principlesTitle') || 'Core Principles'}</h3>
        <ul className={styles.conceptList}>
          <li>{t('documentation:documentationPage.financePrinciple1') || 'Transparency in all transactions'}</li>
          <li>{t('documentation:documentationPage.financePrinciple2') || 'Fair distribution of resources'}</li>
          <li>{t('documentation:documentationPage.financePrinciple3') || 'Community-driven economics'}</li>
          <li>{t('documentation:documentationPage.financePrinciple4') || 'Sustainable financial practices'}</li>
        </ul>
      </div>
    </div>
  );
}