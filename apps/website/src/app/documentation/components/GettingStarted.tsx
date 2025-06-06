'use client';

import styles from '../page.module.css';
import { useLanguage } from '@cybereco/ui-components';

export function GettingStarted() {
  const { t } = useLanguage();

  return (
    <>
      <div className={styles.contentSection}>
        <div className={styles.progressIndicator}>
          <span className={styles.progressLabel}>{t('documentationPage.quickStartLabel') || '📍 Quick Start Guide'}</span>
          <div className={styles.estimatedTime}>{t('documentationPage.quickStartTime') || '⏱️ 5 minutes'}</div>
        </div>
        <h3 className={styles.subTitle}>{t('documentationPage.introductionTitle') || 'Introduction'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.introductionText') || 'Welcome to CyberEco documentation! This guide will help you get started with our digital ecosystem. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity, all within a human-centered framework for conscious, connected, and sustainable living.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🚀 {t('documentationPage.quickStartTitle') || 'Quick Start'}</h3>
        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{t('documentationPage.step1Title') || 'Create Your Account'}</h4>
              <p>{t('documentationPage.step1Desc') || 'Sign up for a CyberEco Hub account to access all applications with a single identity.'}</p>
              <button className={styles.actionButton}>
                {t('documentationPage.signUpNow') || 'Sign Up Now'} →
              </button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{t('documentationPage.step2Title') || 'Explore Applications'}</h4>
              <p>{t('documentationPage.step2Desc') || 'Start with JustSplit for expense sharing, then discover our growing ecosystem.'}</p>
              <button className={styles.actionButton}>
                {t('documentationPage.exploreApps') || 'Explore Apps'} →
              </button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{t('documentationPage.step3Title') || 'Join the Community'}</h4>
              <p>{t('documentationPage.step3Desc') || 'Connect with other users and contribute to our human-centered technology vision.'}</p>
              <button className={styles.actionButton}>
                {t('documentationPage.joinCommunity') || 'Join Community'} →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentationPage.learningPathTitle') || 'Choose Your Learning Path'}</h3>
        <div className={styles.learningPaths}>
          <div className={styles.pathCard}>
            <h4>{t('documentationPage.businessUserPath') || 'Business User'}</h4>
            <p>{t('documentationPage.businessUserDesc') || 'Learn to use applications for team collaboration and expense management.'}</p>
            <span className={styles.pathMeta}>{t('documentationPage.fiveTopics') || '📚 5 topics'}</span>
          </div>
          <div className={styles.pathCard}>
            <h4>{t('documentationPage.developerPath') || 'Developer'}</h4>
            <p>{t('documentationPage.developerDesc') || 'Technical integration, API usage, and platform architecture.'}</p>
            <span className={styles.pathMeta}>{t('documentationPage.twelveTopics') || '📚 12 topics'}</span>
          </div>
          <div className={styles.pathCard}>
            <h4>{t('documentationPage.communityPath') || 'Community Leader'}</h4>
            <p>{t('documentationPage.communityDesc') || 'Governance, digital sovereignty, and platform philosophy.'}</p>
            <span className={styles.pathMeta}>{t('documentationPage.eightTopics') || '📚 8 topics'}</span>
          </div>
        </div>
      </div>
    </>
  );
}