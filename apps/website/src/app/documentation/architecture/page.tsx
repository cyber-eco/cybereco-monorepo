'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCubes, FaLayerGroup, FaProjectDiagram, FaServer } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function ArchitecturePage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaCubes /> {t('documentation:architecture.title') || 'Architecture Overview'}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('documentation:architecture.subtitle') || 'Understanding the CyberEco platform architecture'}
        </motion.p>
      </header>

      <div className={styles.architectureContent}>
        <section className={styles.section}>
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
        </section>

        <section className={styles.section}>
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
        </section>

        <section className={styles.section}>
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
        </section>

        <div className={styles.relatedLinks}>
          <h3>{t('documentation:architecture.relatedDocumentation.title') || 'Related Documentation'}</h3>
          <div className={styles.linkGrid}>
            <Link href="/documentation/data-architecture" className={styles.docLink}>
              {t('documentation:architecture.relatedDocumentation.dataArchitecture') || 'Data Architecture'}
            </Link>
            <Link href="/documentation/authentication" className={styles.docLink}>
              {t('documentation:architecture.relatedDocumentation.authenticationSystem') || 'Authentication System'}
            </Link>
            <Link href="/documentation/development" className={styles.docLink}>
              {t('documentation:architecture.relatedDocumentation.developmentSetup') || 'Development Setup'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}