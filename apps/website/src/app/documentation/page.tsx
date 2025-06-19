'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaBook, FaRocket, FaCode, FaUsers, FaQuestionCircle, 
  FaTools, FaGraduationCap, FaKey, FaDatabase, FaShieldAlt,
  FaChartBar, FaMobileAlt, FaLightbulb, FaMap, FaEye
} from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function DocumentationIndexPage() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaBook /> {t('documentation:documentationPage.title') || 'Documentation Center'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.subtitle') || 'Everything you need to understand, use, and build with CyberEco'}
        </p>
      </div>

      {/* Quick Start Section */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaRocket /> {t('documentation:documentationPage.quickStartTitle') || 'Quick Start'}
        </h2>
        <div className={styles.quickStartGrid}>
          <Link href="/documentation/key-concepts" className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>📚</div>
            <h3>{t('documentation:documentationPage.firstTimeTitle') || 'First Time Here?'}</h3>
            <p>{t('documentation:documentationPage.firstTimeDesc') || 'Start with key concepts and architecture overview'}</p>
          </Link>
          <Link href="/documentation/guides/account-setup" className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>🚀</div>
            <h3>{t('documentation:documentationPage.getStartedTitle') || 'Get Started'}</h3>
            <p>{t('documentation:documentationPage.getStartedDesc') || 'Create your account and explore the ecosystem'}</p>
          </Link>
          <Link href="/documentation/api" className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>⚡</div>
            <h3>{t('documentation:documentationPage.buildTitle') || 'Start Building'}</h3>
            <p>{t('documentation:documentationPage.buildDesc') || 'Jump into our API docs and start developing'}</p>
          </Link>
        </div>
      </div>

      {/* Main Documentation Sections */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          📖 {t('documentation:documentationPage.browseDocsTitle') || 'Browse Documentation'}
        </h2>
        
        {/* Getting Started */}
        <div className={styles.docSection}>
          <h3 className={styles.docSectionTitle}>
            <FaRocket /> {t('documentation:documentationPage.gettingStartedSection') || 'Getting Started'}
          </h3>
          <div className={styles.docGrid}>
            <Link href="/documentation/key-concepts" className={styles.docLink}>
              <FaLightbulb className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.keyConceptsTitle') || 'Key Concepts'}</h4>
                <p>{t('documentation:documentationPage.keyConceptsDesc') || 'Core concepts and terminology'}</p>
              </div>
            </Link>
            <Link href="/documentation/architecture" className={styles.docLink}>
              <FaDatabase className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.architectureTitle') || 'Architecture'}</h4>
                <p>{t('documentation:documentationPage.architectureDesc') || 'System design and data flow'}</p>
              </div>
            </Link>
            <Link href="/documentation/development" className={styles.docLink}>
              <FaCode className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.developmentTitle') || 'Development Setup'}</h4>
                <p>{t('documentation:documentationPage.developmentDesc') || 'Set up your local environment'}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Platform Overview */}
        <div className={styles.docSection}>
          <h3 className={styles.docSectionTitle}>
            <FaEye /> {t('documentation:documentationPage.platformSection') || 'Platform Overview'}
          </h3>
          <div className={styles.docGrid}>
            <Link href="/documentation/philosophy" className={styles.docLink}>
              <FaLightbulb className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.philosophyTitle') || 'Philosophy'}</h4>
                <p>{t('documentation:documentationPage.philosophyDesc') || 'Our human-centered approach'}</p>
              </div>
            </Link>
            <Link href="/documentation/vision" className={styles.docLink}>
              <FaEye className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.visionTitle') || 'Vision'}</h4>
                <p>{t('documentation:documentationPage.visionDesc') || 'The future we\'re building'}</p>
              </div>
            </Link>
            <Link href="/documentation/roadmap" className={styles.docLink}>
              <FaMap className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.roadmapTitle') || 'Roadmap'}</h4>
                <p>{t('documentation:documentationPage.roadmapDesc') || 'Upcoming features and timeline'}</p>
              </div>
            </Link>
            <Link href="/documentation/portfolio" className={styles.docLink}>
              <FaChartBar className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.portfolioTitle') || 'Portfolio'}</h4>
                <p>{t('documentation:documentationPage.portfolioDesc') || 'Complete application portfolio'}</p>
              </div>
            </Link>
            <Link href="/documentation/solutions" className={styles.docLink}>
              <FaTools className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.solutionsTitle') || 'Solutions'}</h4>
                <p>{t('documentation:documentationPage.solutionsDesc') || 'Browse solution categories'}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* User Resources */}
        <div className={styles.docSection}>
          <h3 className={styles.docSectionTitle}>
            <FaUsers /> {t('documentation:documentationPage.userSection') || 'User Resources'}
          </h3>
          <div className={styles.docGrid}>
            <Link href="/documentation/guides" className={styles.docLink}>
              <FaBook className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.guidesTitle') || 'User Guides'}</h4>
                <p>{t('documentation:documentationPage.guidesDesc') || 'Step-by-step tutorials'}</p>
              </div>
            </Link>
            <Link href="/documentation/learning-paths" className={styles.docLink}>
              <FaGraduationCap className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.learningTitle') || 'Learning Paths'}</h4>
                <p>{t('documentation:documentationPage.learningDesc') || 'Structured learning journeys'}</p>
              </div>
            </Link>
            <Link href="/documentation/faq" className={styles.docLink}>
              <FaQuestionCircle className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.faqTitle') || 'FAQ'}</h4>
                <p>{t('documentation:documentationPage.faqDesc') || 'Common questions answered'}</p>
              </div>
            </Link>
            <Link href="/documentation/troubleshooting" className={styles.docLink}>
              <FaTools className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.troubleshootingTitle') || 'Troubleshooting'}</h4>
                <p>{t('documentation:documentationPage.troubleshootingDesc') || 'Solve common issues'}</p>
              </div>
            </Link>
            <Link href="/documentation/community" className={styles.docLink}>
              <FaUsers className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.communityTitle') || 'Community'}</h4>
                <p>{t('documentation:documentationPage.communityDesc') || 'Get help and connect'}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Developer Resources */}
        <div className={styles.docSection}>
          <h3 className={styles.docSectionTitle}>
            <FaCode /> {t('documentation:documentationPage.developerSection') || 'Developer Resources'}
          </h3>
          <div className={styles.docGrid}>
            <Link href="/documentation/api" className={styles.docLink}>
              <FaCode className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.apiTitle') || 'API Reference'}</h4>
                <p>{t('documentation:documentationPage.apiDesc') || 'Complete API documentation'}</p>
              </div>
            </Link>
            <Link href="/documentation/authentication" className={styles.docLink}>
              <FaKey className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.authTitle') || 'Authentication'}</h4>
                <p>{t('documentation:documentationPage.authDesc') || 'Auth integration guide'}</p>
              </div>
            </Link>
            <Link href="/documentation/hub-gateway" className={styles.docLink}>
              <FaShieldAlt className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.hubTitle') || 'Hub Gateway'}</h4>
                <p>{t('documentation:documentationPage.hubDesc') || 'Central hub architecture'}</p>
              </div>
            </Link>
            <Link href="/documentation/data-architecture" className={styles.docLink}>
              <FaDatabase className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.dataTitle') || 'Data Architecture'}</h4>
                <p>{t('documentation:documentationPage.dataDesc') || 'Data models and flow'}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className={styles.docSection}>
          <h3 className={styles.docSectionTitle}>
            <FaShieldAlt /> {t('documentation:documentationPage.securitySection') || 'Security & Privacy'}
          </h3>
          <div className={styles.docGrid}>
            <Link href="/documentation/two-factor-auth" className={styles.docLink}>
              <FaMobileAlt className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.twoFactorTitle') || 'Two-Factor Auth'}</h4>
                <p>{t('documentation:documentationPage.twoFactorDesc') || 'Enhanced security setup'}</p>
              </div>
            </Link>
            <Link href="/documentation/privacy-controls" className={styles.docLink}>
              <FaShieldAlt className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.privacyTitle') || 'Privacy Controls'}</h4>
                <p>{t('documentation:documentationPage.privacyDesc') || 'Manage your privacy'}</p>
              </div>
            </Link>
            <Link href="/documentation/data-export" className={styles.docLink}>
              <FaDatabase className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.exportTitle') || 'Data Export'}</h4>
                <p>{t('documentation:documentationPage.exportDesc') || 'Export your data'}</p>
              </div>
            </Link>
            <Link href="/documentation/auth-logging" className={styles.docLink}>
              <FaKey className={styles.docLinkIcon} />
              <div>
                <h4>{t('documentation:documentationPage.loggingTitle') || 'Auth Logging'}</h4>
                <p>{t('documentation:documentationPage.loggingDesc') || 'Security audit logs'}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          🔥 {t('documentation:documentationPage.popularTitle') || 'Popular Topics'}
        </h2>
        <div className={styles.popularGrid}>
          <Link href="/documentation/guides/account-setup" className={styles.popularCard}>
            <span className={styles.popularNumber}>1</span>
            <div>
              <h4>{t('documentation:documentationPage.popular1') || 'Create Your First Account'}</h4>
              <p>{t('documentation:documentationPage.popular1Desc') || 'Get started with CyberEco'}</p>
            </div>
          </Link>
          <Link href="/documentation/guides/justsplit" className={styles.popularCard}>
            <span className={styles.popularNumber}>2</span>
            <div>
              <h4>{t('documentation:documentationPage.popular2') || 'JustSplit Quick Start'}</h4>
              <p>{t('documentation:documentationPage.popular2Desc') || 'Share expenses with friends'}</p>
            </div>
          </Link>
          <Link href="/documentation/api" className={styles.popularCard}>
            <span className={styles.popularNumber}>3</span>
            <div>
              <h4>{t('documentation:documentationPage.popular3') || 'API Authentication'}</h4>
              <p>{t('documentation:documentationPage.popular3Desc') || 'Integrate with our APIs'}</p>
            </div>
          </Link>
          <Link href="/documentation/troubleshooting" className={styles.popularCard}>
            <span className={styles.popularNumber}>4</span>
            <div>
              <h4>{t('documentation:documentationPage.popular4') || 'Common Issues'}</h4>
              <p>{t('documentation:documentationPage.popular4Desc') || 'Quick fixes and solutions'}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Search Hint */}
      <div className={styles.searchHint}>
        <p>
          💡 {t('documentation:documentationPage.searchHint') || 'Tip: Use Ctrl/Cmd + K to search documentation quickly'}
        </p>
      </div>
    </div>
  );
}