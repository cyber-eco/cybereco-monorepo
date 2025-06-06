'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaRocket, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function DocumentationPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaBook /> {t('documentation:documentationPage.title') || 'Documentation Overview'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.subtitle') || 'Comprehensive guides and technical documentation for the CyberEco digital ecosystem'}
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.quickStart}>
          <h2>{t('documentation:documentationPage.gettingStartedTitle') || 'Getting Started with CyberEco'}</h2>
          <p>
            {t('documentation:documentationPage.introductionText') || 'Welcome to CyberEco documentation! This guide will help you get started with our digital ecosystem. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity, all within a human-centered framework for conscious, connected, and sustainable living.'}
          </p>

          <div className={styles.stepByStepGuide}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:documentationPage.step1Title') || 'Create Your Account'}</h4>
                <p>{t('documentation:documentationPage.step1Desc') || 'Sign up for a CyberEco Hub account to access all applications with a single identity.'}</p>
                <Link href="/auth/signup" className={styles.actionButton}>
                  {t('documentation:documentationPage.signUpNow') || 'Sign Up Now'} <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:documentationPage.step2Title') || 'Explore Applications'}</h4>
                <p>{t('documentation:documentationPage.step2Desc') || 'Start with JustSplit for expense sharing, then discover our growing ecosystem.'}</p>
                <Link href="/portfolio" className={styles.actionButton}>
                  {t('documentation:documentationPage.exploreApps') || 'Explore Apps'} <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:documentationPage.step3Title') || 'Join the Community'}</h4>
                <p>{t('documentation:documentationPage.step3Desc') || 'Connect with other users and contribute to our human-centered technology vision.'}</p>
                <Link href="/community" className={styles.actionButton}>
                  {t('documentation:documentationPage.joinCommunity') || 'Join Community'} <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.keyConceptsTitle') || 'Key Concepts & Architecture'}</h2>
        
        <div className={styles.coreDocPreview}>
          <h3 className={styles.subTitle}>{t('documentation:documentationPage.digitalSovereigntyConceptTitle') || 'Digital Sovereignty'}</h3>
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
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.coreDocumentationTitle') || 'Core Documentation'}</h2>
        
        <div className={styles.docLinksGrid}>
          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/authentication">
              <span className={styles.docLinkIcon}>🔐</span>
              <h4>{t('documentation:documentationPage.authenticationNavItem') || 'Authentication'}</h4>
              <p>{t('documentation:documentationPage.authentication.subtitle') || 'Learn about our secure, centralized authentication system'}</p>
            </Link>
          </motion.div>

          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/jwt-authentication">
              <span className={styles.docLinkIcon}>🎫</span>
              <h4>{t('documentation:documentationPage.jwt.title') || 'JWT Authentication'}</h4>
              <p>{t('documentation:documentationPage.jwtAuthNavItem') || 'Token-based authentication implementation'}</p>
            </Link>
          </motion.div>

          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/sso-integration">
              <span className={styles.docLinkIcon}>🔗</span>
              <h4>{t('documentation:documentationPage.sso.title') || 'SSO Integration'}</h4>
              <p>{t('documentation:documentationPage.ssoIntegrationNavItem') || 'Single Sign-On implementation guide'}</p>
            </Link>
          </motion.div>

          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/privacy-controls">
              <span className={styles.docLinkIcon}>🛡️</span>
              <h4>{t('documentation:documentationPage.privacy.title') || 'Privacy Controls'}</h4>
              <p>{t('documentation:documentationPage.privacy.description') || 'GDPR compliance and privacy features'}</p>
            </Link>
          </motion.div>

          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/data-export">
              <span className={styles.docLinkIcon}>📦</span>
              <h4>{t('documentation:documentationPage.dataExport.title') || 'Data Export'}</h4>
              <p>{t('documentation:documentationPage.dataExport.description') || 'Export and portability features'}</p>
            </Link>
          </motion.div>

          <motion.div
            className={styles.docLinkCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/documentation/auth-logging">
              <span className={styles.docLinkIcon}>📊</span>
              <h4>{t('documentation:documentationPage.authLogging.title') || 'Auth Logging'}</h4>
              <p>{t('documentation:documentationPage.authLoggingNavItem') || 'Security audit and monitoring'}</p>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.developerNavTitle') || 'Developer Resources'}</h2>
        
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <FaBook className={styles.resourceIcon} />
            <h3>{t('documentation:documentationPage.apiReferenceNavItem') || 'API Reference'}</h3>
            <p>{t('documentation:documentationPage.apiReference.description') || 'Complete API documentation and endpoints'}</p>
            <Link href="/documentation/api" className={styles.resourceLink}>
              {t('common:actions.viewDocs') || 'View Docs'} <FaArrowRight />
            </Link>
          </div>

          <div className={styles.resourceCard}>
            <FaRocket className={styles.resourceIcon} />
            <h3>{t('documentation:documentationPage.developmentNavItem') || 'Development Setup'}</h3>
            <p>{t('documentation:documentationPage.development.description') || 'Get your local environment running'}</p>
            <Link href="/documentation/development" className={styles.resourceLink}>
              {t('common:actions.getStarted') || 'Get Started'} <FaArrowRight />
            </Link>
          </div>

          <div className={styles.resourceCard}>
            <FaUsers className={styles.resourceIcon} />
            <h3>{t('documentation:documentationPage.communityNavItem') || 'Community & Support'}</h3>
            <p>{t('documentation:documentationPage.community.description') || 'Join our developer community'}</p>
            <Link href="/community" className={styles.resourceLink}>
              {t('common:actions.joinNow') || 'Join Now'} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}