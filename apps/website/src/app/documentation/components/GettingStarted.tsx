'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';

export function GettingStarted() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.introductionTitle') || 'Introduction'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.subtitle') || 'Comprehensive guides and technical documentation for the CyberEco digital ecosystem'}
        </p>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.progressIndicator}>
          <span className={styles.progressLabel}>{t('documentation:documentationPage.quickStartLabel') || '📍 Quick Start Guide'}</span>
          <div className={styles.estimatedTime}>{t('documentation:documentationPage.quickStartTime') || '⏱️ 5 minutes'}</div>
        </div>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.introductionTitle') || 'Introduction'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.introductionText') || 'Welcome to CyberEco documentation! This guide will help you get started with our digital ecosystem. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity, all within a human-centered framework for conscious, connected, and sustainable living.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🚀 {t('documentation:documentationPage.quickStartTitle') || 'Quick Start'}</h3>
        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.step1Title') || 'Create Your Account'}</h4>
              <p>{t('documentation:documentationPage.step1Desc') || 'Sign up for a CyberEco Hub account to access all applications with a single identity.'}</p>
              <button className={styles.actionButton}>
                {t('documentation:documentationPage.signUpNow') || 'Sign Up Now'} →
              </button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.step2Title') || 'Explore Applications'}</h4>
              <p>{t('documentation:documentationPage.step2Desc') || 'Start with JustSplit for expense sharing, then discover our growing ecosystem.'}</p>
              <button className={styles.actionButton}>
                {t('documentation:documentationPage.exploreApps') || 'Explore Apps'} →
              </button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.step3Title') || 'Join the Community'}</h4>
              <p>{t('documentation:documentationPage.step3Desc') || 'Connect with other users and contribute to our human-centered technology vision.'}</p>
              <button className={styles.actionButton}>
                {t('documentation:documentationPage.joinCommunity') || 'Join Community'} →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentation:documentationPage.learningPathTitle') || 'Choose Your Learning Path'}</h3>
        <div className={styles.learningPaths}>
          <div className={styles.pathCard}>
            <h4>{t('documentation:documentationPage.businessUserPath') || 'Business User'}</h4>
            <p>{t('documentation:documentationPage.businessUserDesc') || 'Learn to use applications for team collaboration and expense management.'}</p>
            <span className={styles.pathMeta}>{t('documentation:documentationPage.fiveTopics') || '📚 5 topics'}</span>
          </div>
          <div className={styles.pathCard}>
            <h4>{t('documentation:documentationPage.developerPath') || 'Developer'}</h4>
            <p>{t('documentation:documentationPage.developerDesc') || 'Technical integration, API usage, and platform architecture.'}</p>
            <span className={styles.pathMeta}>{t('documentation:documentationPage.twelveTopics') || '📚 12 topics'}</span>
          </div>
          <div className={styles.pathCard}>
            <h4>{t('documentation:documentationPage.communityPath') || 'Community Leader'}</h4>
            <p>{t('documentation:documentationPage.communityDesc') || 'Governance, digital sovereignty, and platform philosophy.'}</p>
            <span className={styles.pathMeta}>{t('documentation:documentationPage.eightTopics') || '📚 8 topics'}</span>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📖 {t('documentation:documentationPage.coreDocumentationTitle') || 'Core Documentation'}</h3>
        <div className={styles.cardGrid}>
          <a href="/documentation/philosophy" className={styles.docCard}>
            <div className={styles.cardIcon}>💡</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.philosophyTitle') || 'Philosophy'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.philosophyDesc') || 'Human-centered technology principles'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.learnMore') || 'Learn more'}
            </span>
          </a>

          <a href="/documentation/vision" className={styles.docCard}>
            <div className={styles.cardIcon}>🔮</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.visionTitle') || 'Vision'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.visionDesc') || 'The future of digital living'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.discover') || 'Discover'}
            </span>
          </a>

          <a href="/documentation/roadmap" className={styles.docCard}>
            <div className={styles.cardIcon}>🗺️</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.roadmapTitle') || 'Roadmap'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.roadmapDesc') || 'Upcoming features and timeline'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.viewRoadmap') || 'View roadmap'}
            </span>
          </a>

          <a href="/documentation/portfolio" className={styles.docCard}>
            <div className={styles.cardIcon}>🎯</div>
            <h3 className={styles.cardTitle}>
              {t('documentation:documentationPage.portfolioTitle') || 'Portfolio'}
            </h3>
            <p className={styles.cardDescription}>
              {t('documentation:documentationPage.portfolioDesc') || 'Our applications and solutions'}
            </p>
            <span className={styles.cardLink}>
              {t('documentation:documentationPage.explore') || 'Explore'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}