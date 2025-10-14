'use client';

import React from 'react';
import Link from 'next/link';
import { FaCubes, FaLayerGroup, FaProjectDiagram, FaServer } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from './page.module.css';

export default function ArchitecturePage() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <div className={styles.architectureContent}>
        <div className={styles.section}>
          <h2><FaLayerGroup /> {t('documentation:architecture.monorepo.title') || 'Monorepo Structure'}</h2>
          <p>
            {t('documentation:architecture.monorepo.description') || 'CyberEco uses an NX-powered monorepo architecture that enables code sharing, consistent tooling, and efficient builds across all applications.'}
          </p>
          <div className={styles.diagramContainer}>
            <div className={styles.architectureDiagram}>
              <div className={styles.layer}>
                <h3>{t('documentation:architecture.layers.applications') || 'Applications Layer'}</h3>
                <div className={styles.components}>
                  <div className={styles.component}>{t('documentation:architecture.components.hub') || 'Hub'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.justsplit') || 'JustSplit'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.website') || 'Website'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.futureApps') || 'Future Apps'}</div>
                </div>
              </div>
              <div className={styles.layer}>
                <h3>{t('documentation:architecture.layers.sharedLibraries') || 'Shared Libraries'}</h3>
                <div className={styles.components}>
                  <div className={styles.component}>{t('documentation:architecture.components.uiComponents') || 'UI Components'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.authLibrary') || 'Auth Library'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.i18n') || 'i18n'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.sharedTypes') || 'Shared Types'}</div>
                </div>
              </div>
              <div className={styles.layer}>
                <h3>{t('documentation:architecture.layers.infrastructure') || 'Infrastructure'}</h3>
                <div className={styles.components}>
                  <div className={styles.component}>{t('documentation:architecture.components.firebase') || 'Firebase'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.authentication') || 'Authentication'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.hosting') || 'Hosting'}</div>
                  <div className={styles.component}>{t('documentation:architecture.components.database') || 'Database'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );

  const renderPrinciplesTab = () => (
    <div className={styles.architectureContent}>

        <div className={styles.section}>
          <h2><FaProjectDiagram /> {t('documentation:architecture.principles.title') || 'Key Design Principles'}</h2>
          <div className={styles.principlesGrid}>
            <div className={styles.principle}>
              <h3>{t('documentation:architecture.principles.digitalSovereignty.title') || 'Digital Sovereignty'}</h3>
              <p>{t('documentation:architecture.principles.digitalSovereignty.description') || 'Users own and control their data with export and portability features'}</p>
            </div>
            <div className={styles.principle}>
              <h3>{t('documentation:architecture.principles.modularArchitecture.title') || 'Modular Architecture'}</h3>
              <p>{t('documentation:architecture.principles.modularArchitecture.description') || 'Independent apps that share common infrastructure and components'}</p>
            </div>
            <div className={styles.principle}>
              <h3>{t('documentation:architecture.principles.privacyByDesign.title') || 'Privacy by Design'}</h3>
              <p>{t('documentation:architecture.principles.privacyByDesign.description') || 'GDPR compliance and privacy controls built into the core'}</p>
            </div>
            <div className={styles.principle}>
              <h3>{t('documentation:architecture.principles.openStandards.title') || 'Open Standards'}</h3>
              <p>{t('documentation:architecture.principles.openStandards.description') || 'Using open protocols and standards for interoperability'}</p>
            </div>
          </div>
        </div>
    </div>
  );

  const renderTechnicalStackTab = () => (
    <div className={styles.architectureContent}>

        <div className={styles.section}>
          <h2><FaServer /> {t('documentation:architecture.technicalStack.title') || 'Technical Stack'}</h2>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>
              <h4>{t('documentation:architecture.technicalStack.frontend.title') || 'Frontend'}</h4>
              <ul>
                <li>{t('documentation:architecture.technicalStack.frontend.nextjs') || 'Next.js 15'}</li>
                <li>{t('documentation:architecture.technicalStack.frontend.react') || 'React 18'}</li>
                <li>{t('documentation:architecture.technicalStack.frontend.typescript') || 'TypeScript'}</li>
                <li>{t('documentation:architecture.technicalStack.frontend.cssModules') || 'CSS Modules'}</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>{t('documentation:architecture.technicalStack.backend.title') || 'Backend'}</h4>
              <ul>
                <li>{t('documentation:architecture.technicalStack.backend.firebaseAuth') || 'Firebase Auth'}</li>
                <li>{t('documentation:architecture.technicalStack.backend.firestore') || 'Firestore'}</li>
                <li>{t('documentation:architecture.technicalStack.backend.cloudFunctions') || 'Cloud Functions'}</li>
                <li>{t('documentation:architecture.technicalStack.backend.firebaseHosting') || 'Firebase Hosting'}</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>{t('documentation:architecture.technicalStack.development.title') || 'Development'}</h4>
              <ul>
                <li>{t('documentation:architecture.technicalStack.development.nxMonorepo') || 'NX Monorepo'}</li>
                <li>{t('documentation:architecture.technicalStack.development.jestTesting') || 'Jest Testing'}</li>
                <li>{t('documentation:architecture.technicalStack.development.eslint') || 'ESLint'}</li>
                <li>{t('documentation:architecture.technicalStack.development.githubActions') || 'GitHub Actions'}</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  );

  const renderIntegrationTab = () => (
    <div className={styles.architectureContent}>
        <div className={styles.section}>
          <h2>{t('documentation:architecture.integration.title') || 'Integration Patterns'}</h2>
          <p>{t('documentation:architecture.integration.description') || 'Learn how CyberEco applications integrate and communicate with each other.'}</p>
          
          <h3>{t('documentation:architecture.integration.sso.title') || 'Single Sign-On (SSO)'}</h3>
          <p>{t('documentation:architecture.integration.sso.description') || 'Centralized authentication through the Hub ensures users sign in once and access all applications seamlessly.'}</p>
          
          <h3>{t('documentation:architecture.integration.sharedData.title') || 'Shared Data Models'}</h3>
          <p>{t('documentation:architecture.integration.sharedData.description') || 'Common TypeScript interfaces and data structures enable consistent data handling across applications.'}</p>
          
          <h3>{t('documentation:architecture.integration.eventBus.title') || 'Event Bus Architecture'}</h3>
          <p>{t('documentation:architecture.integration.eventBus.description') || 'Applications communicate through a centralized event system for real-time updates and notifications.'}</p>
          
          <h3>{t('documentation:architecture.integration.apis.title') || 'REST APIs'}</h3>
          <p>{t('documentation:architecture.integration.apis.description') || 'Well-documented REST APIs allow external integrations and cross-application data access.'}</p>
        </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className={styles.architectureContent}>

        <div className={styles.section}>
          <h2>{t('documentation:architecture.relatedDocumentation.title') || 'Related Documentation'}</h2>
          <div className={styles.linkGrid}>
            <Link href="/documentation/data-architecture" className={styles.docLink}>
              <FaLayerGroup className={styles.linkIcon} />
              <div>
                <h4>{t('documentation:architecture.relatedDocumentation.dataArchitecture') || 'Data Architecture'}</h4>
                <p>{t('documentation:architecture.relatedDocumentation.dataArchitectureDesc') || 'Deep dive into data models and database design'}</p>
              </div>
            </Link>
            <Link href="/documentation/authentication" className={styles.docLink}>
              <FaCubes className={styles.linkIcon} />
              <div>
                <h4>{t('documentation:architecture.relatedDocumentation.authenticationSystem') || 'Authentication System'}</h4>
                <p>{t('documentation:architecture.relatedDocumentation.authenticationSystemDesc') || 'Learn about our secure authentication implementation'}</p>
              </div>
            </Link>
            <Link href="/documentation/development" className={styles.docLink}>
              <FaProjectDiagram className={styles.linkIcon} />
              <div>
                <h4>{t('documentation:architecture.relatedDocumentation.developmentSetup') || 'Development Setup'}</h4>
                <p>{t('documentation:architecture.relatedDocumentation.developmentSetupDesc') || 'Get started with local development environment'}</p>
              </div>
            </Link>
            <Link href="/documentation/api" className={styles.docLink}>
              <FaServer className={styles.linkIcon} />
              <div>
                <h4>{t('documentation:architecture.relatedDocumentation.apiReference') || 'API Reference'}</h4>
                <p>{t('documentation:architecture.relatedDocumentation.apiReferenceDesc') || 'Explore our comprehensive API documentation'}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.section}>
          <h2>{t('documentation:architecture.resources.title') || 'Additional Resources'}</h2>
          <ul className={styles.resourcesList}>
            <li>
              <a href="https://nx.dev" target="_blank" rel="noopener noreferrer">
                {t('documentation:architecture.resources.nxDocs') || 'NX Documentation'}
              </a>
              <span className={styles.resourceDesc}> - {t('documentation:architecture.resources.nxDocsDesc') || 'Learn more about NX monorepo tools'}</span>
            </li>
            <li>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                {t('documentation:architecture.resources.nextjsDocs') || 'Next.js Documentation'}
              </a>
              <span className={styles.resourceDesc}> - {t('documentation:architecture.resources.nextjsDocsDesc') || 'Official Next.js framework documentation'}</span>
            </li>
            <li>
              <a href="https://firebase.google.com/docs" target="_blank" rel="noopener noreferrer">
                {t('documentation:architecture.resources.firebaseDocs') || 'Firebase Documentation'}
              </a>
              <span className={styles.resourceDesc}> - {t('documentation:architecture.resources.firebaseDocsDesc') || 'Firebase platform and services documentation'}</span>
            </li>
            <li>
              <a href="/documentation/contributing">
                {t('documentation:architecture.resources.contributing') || 'Contributing Guide'}
              </a>
              <span className={styles.resourceDesc}> - {t('documentation:architecture.resources.contributingDesc') || 'Learn how to contribute to CyberEco'}</span>
            </li>
          </ul>
        </div>
    </div>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:architecture.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'principles',
      label: t('documentation:architecture.tabs.principles') || 'Design Principles',
      content: renderPrinciplesTab()
    },
    {
      id: 'stack',
      label: t('documentation:architecture.tabs.stack') || 'Technical Stack',
      content: renderTechnicalStackTab()
    },
    {
      id: 'integration',
      label: t('documentation:architecture.tabs.integration') || 'Integration',
      content: renderIntegrationTab()
    },
    {
      id: 'resources',
      label: t('documentation:architecture.tabs.resources') || 'Resources',
      content: renderResourcesTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaCubes />}
        title={t('documentation:architecture.title') || 'Architecture Overview'}
        subtitle={t('documentation:architecture.subtitle') || 'Understanding the CyberEco platform architecture'}
        gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #dc2626 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />
    </div>
  );
}