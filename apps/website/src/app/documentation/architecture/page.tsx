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
          <FaCubes /> Architecture Overview
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Understanding the CyberEco platform architecture
        </motion.p>
      </header>

      <div className={styles.architectureContent}>
        <section className={styles.section}>
          <h2><FaLayerGroup /> Monorepo Structure</h2>
          <p>
            CyberEco uses an NX-powered monorepo architecture that enables code sharing, 
            consistent tooling, and efficient builds across all applications.
          </p>
          <div className={styles.diagramContainer}>
            <div className={styles.architectureDiagram}>
              <div className={styles.layer}>
                <h3>Applications Layer</h3>
                <div className={styles.components}>
                  <div className={styles.component}>Hub</div>
                  <div className={styles.component}>JustSplit</div>
                  <div className={styles.component}>Website</div>
                  <div className={styles.component}>Future Apps</div>
                </div>
              </div>
              <div className={styles.layer}>
                <h3>Shared Libraries</h3>
                <div className={styles.components}>
                  <div className={styles.component}>UI Components</div>
                  <div className={styles.component}>Auth Library</div>
                  <div className={styles.component}>i18n</div>
                  <div className={styles.component}>Shared Types</div>
                </div>
              </div>
              <div className={styles.layer}>
                <h3>Infrastructure</h3>
                <div className={styles.components}>
                  <div className={styles.component}>Firebase</div>
                  <div className={styles.component}>Authentication</div>
                  <div className={styles.component}>Hosting</div>
                  <div className={styles.component}>Database</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><FaProjectDiagram /> Key Design Principles</h2>
          <div className={styles.principlesGrid}>
            <div className={styles.principle}>
              <h3>Digital Sovereignty</h3>
              <p>Users own and control their data with export and portability features</p>
            </div>
            <div className={styles.principle}>
              <h3>Modular Architecture</h3>
              <p>Independent apps that share common infrastructure and components</p>
            </div>
            <div className={styles.principle}>
              <h3>Privacy by Design</h3>
              <p>GDPR compliance and privacy controls built into the core</p>
            </div>
            <div className={styles.principle}>
              <h3>Open Standards</h3>
              <p>Using open protocols and standards for interoperability</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><FaServer /> Technical Stack</h2>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>
              <h4>Frontend</h4>
              <ul>
                <li>Next.js 15</li>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>CSS Modules</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>Backend</h4>
              <ul>
                <li>Firebase Auth</li>
                <li>Firestore</li>
                <li>Cloud Functions</li>
                <li>Firebase Hosting</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>Development</h4>
              <ul>
                <li>NX Monorepo</li>
                <li>Jest Testing</li>
                <li>ESLint</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </section>

        <div className={styles.relatedLinks}>
          <h3>Related Documentation</h3>
          <div className={styles.linkGrid}>
            <Link href="/documentation/data-architecture" className={styles.docLink}>
              Data Architecture
            </Link>
            <Link href="/documentation/authentication" className={styles.docLink}>
              Authentication System
            </Link>
            <Link href="/documentation/development" className={styles.docLink}>
              Development Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}