'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaChevronRight, FaDownload, FaPlay } from 'react-icons/fa';

export function UserGuides() {
  const { t } = useI18n();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentationPage.userGuidesTitle') || 'User Guides'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.userGuidesIntro') || 'Step-by-step guides to help you get the most out of CyberEco applications.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🚀 {t('documentationPage.gettingStartedGuidesTitle') || 'Getting Started'}</h4>
        <div className={styles.guideGrid}>
          <div className={styles.guideCard}>
            <div className={styles.guideIcon}>👤</div>
            <h5>{t('documentationPage.accountSetupGuide') || 'Account Setup'}</h5>
            <p>{t('documentationPage.accountSetupDesc') || 'Create your CyberEco Hub account and configure your profile.'}</p>
            <div className={styles.guideActions}>
              <button className={styles.primaryButton}>
                <FaPlay /> {t('documentationPage.startTutorial') || 'Start Tutorial'}
              </button>
              <button className={styles.secondaryButton}>
                <FaDownload /> {t('documentationPage.downloadPDF') || 'PDF'}
              </button>
            </div>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideIcon}>🔒</div>
            <h5>{t('documentationPage.securitySetupGuide') || 'Security Setup'}</h5>
            <p>{t('documentationPage.securitySetupDesc') || 'Enable two-factor authentication and configure privacy settings.'}</p>
            <div className={styles.guideActions}>
              <button className={styles.primaryButton}>
                <FaPlay /> {t('documentationPage.startTutorial') || 'Start Tutorial'}
              </button>
              <button className={styles.secondaryButton}>
                <FaDownload /> {t('documentationPage.downloadPDF') || 'PDF'}
              </button>
            </div>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideIcon}>🎯</div>
            <h5>{t('documentationPage.firstAppGuide') || 'Your First App'}</h5>
            <p>{t('documentationPage.firstAppDesc') || 'Navigate and use your first CyberEco application.'}</p>
            <div className={styles.guideActions}>
              <button className={styles.primaryButton}>
                <FaPlay /> {t('documentationPage.startTutorial') || 'Start Tutorial'}
              </button>
              <button className={styles.secondaryButton}>
                <FaDownload /> {t('documentationPage.downloadPDF') || 'PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>💰 {t('documentationPage.justSplitGuidesTitle') || 'JustSplit Guides'}</h4>
        <div className={styles.guideList}>
          <div className={styles.guideListItem}>
            <h5>{t('documentationPage.createGroupGuide') || 'Creating Your First Group'}</h5>
            <p>{t('documentationPage.createGroupDesc') || 'Set up expense groups and invite friends to collaborate.'}</p>
            <a href="#" className={styles.guideLink}>
              {t('documentationPage.readGuide') || 'Read Guide'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.guideListItem}>
            <h5>{t('documentationPage.addExpenseGuide') || 'Adding and Splitting Expenses'}</h5>
            <p>{t('documentationPage.addExpenseDesc') || 'Learn different splitting methods and expense categories.'}</p>
            <a href="#" className={styles.guideLink}>
              {t('documentationPage.readGuide') || 'Read Guide'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.guideListItem}>
            <h5>{t('documentationPage.settlementsGuide') || 'Understanding Settlements'}</h5>
            <p>{t('documentationPage.settlementsDesc') || 'How to settle debts and track payment history.'}</p>
            <a href="#" className={styles.guideLink}>
              {t('documentationPage.readGuide') || 'Read Guide'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.guideListItem}>
            <h5>{t('documentationPage.reportsGuide') || 'Generating Reports'}</h5>
            <p>{t('documentationPage.reportsDesc') || 'Export data and create financial summaries.'}</p>
            <a href="#" className={styles.guideLink}>
              {t('documentationPage.readGuide') || 'Read Guide'} <FaChevronRight />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🏛️ {t('documentationPage.advancedGuidesTitle') || 'Advanced Features'}</h4>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h5>{t('documentationPage.multiCurrencyGuide') || 'Multi-Currency Support'}</h5>
            <p>{t('documentationPage.multiCurrencyDesc') || 'Handle expenses in different currencies with automatic conversion.'}</p>
            <span className={styles.difficulty}>{t('documentationPage.intermediate') || 'Intermediate'}</span>
          </div>

          <div className={styles.featureCard}>
            <h5>{t('documentationPage.recurringExpensesGuide') || 'Recurring Expenses'}</h5>
            <p>{t('documentationPage.recurringExpensesDesc') || 'Set up automatic expense tracking for subscriptions and regular payments.'}</p>
            <span className={styles.difficulty}>{t('documentationPage.intermediate') || 'Intermediate'}</span>
          </div>

          <div className={styles.featureCard}>
            <h5>{t('documentationPage.apiIntegrationGuide') || 'API Integration'}</h5>
            <p>{t('documentationPage.apiIntegrationDesc') || 'Connect JustSplit with external services and automate workflows.'}</p>
            <span className={styles.difficulty}>{t('documentationPage.advanced') || 'Advanced'}</span>
          </div>

          <div className={styles.featureCard}>
            <h5>{t('documentationPage.customReportsGuide') || 'Custom Reports'}</h5>
            <p>{t('documentationPage.customReportsDesc') || 'Build custom dashboards and analytics for your financial data.'}</p>
            <span className={styles.difficulty}>{t('documentationPage.advanced') || 'Advanced'}</span>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.videoSection}>
          <h4>{t('documentationPage.videoTutorialsTitle') || '🎥 Video Tutorials'}</h4>
          <p>{t('documentationPage.videoTutorialsDesc') || 'Visual learner? Check out our comprehensive video tutorial series.'}</p>
          <button className={styles.ctaButton}>
            {t('documentationPage.watchVideos') || 'Watch Tutorial Videos'} →
          </button>
        </div>
      </div>
    </>
  );
}