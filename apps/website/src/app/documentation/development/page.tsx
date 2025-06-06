'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTerminal, FaGitAlt, FaNpm, FaDocker } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function DevelopmentSetupPage() {
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
          <FaTerminal /> Development Setup
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get your local CyberEco development environment up and running
        </motion.p>
      </header>

      <div className={styles.setupSteps}>
        <section className={styles.step}>
          <div className={styles.stepHeader}>
            <div className={styles.stepNumber}>1</div>
            <h2>Prerequisites</h2>
          </div>
          <div className={styles.stepContent}>
            <ul className={styles.requirementsList}>
              <li><FaGitAlt /> Git version 2.0 or higher</li>
              <li><FaNpm /> Node.js 18.x or higher</li>
              <li><FaNpm /> npm 9.x or higher</li>
              <li><FaDocker /> Docker (optional, for containerized setup)</li>
            </ul>
          </div>
        </section>

        <section className={styles.step}>
          <div className={styles.stepHeader}>
            <div className={styles.stepNumber}>2</div>
            <h2>Clone the Repository</h2>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.codeBlock}>
              <pre>
{`git clone https://github.com/cybereco/cybereco-monorepo.git
cd cybereco-monorepo`}
              </pre>
            </div>
          </div>
        </section>

        <section className={styles.step}>
          <div className={styles.stepHeader}>
            <div className={styles.stepNumber}>3</div>
            <h2>Install Dependencies</h2>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.codeBlock}>
              <pre>
{`# Install all dependencies
npm install

# Install Firebase tools globally
npm install -g firebase-tools`}
              </pre>
            </div>
          </div>
        </section>

        <section className={styles.step}>
          <div className={styles.stepHeader}>
            <div className={styles.stepNumber}>4</div>
            <h2>Start Development Servers</h2>
          </div>
          <div className={styles.stepContent}>
            <div className={styles.codeBlock}>
              <pre>
{`# Start all apps with Firebase emulators
npm run dev

# Or start individual apps
nx serve hub          # Hub at localhost:40000
nx serve website      # Website at localhost:40001
nx serve justsplit    # JustSplit at localhost:40002`}
              </pre>
            </div>
          </div>
        </section>

        <section className={styles.nextSteps}>
          <h2>Next Steps</h2>
          <div className={styles.linkGrid}>
            <Link href="/documentation/architecture" className={styles.nextLink}>
              Architecture Overview
            </Link>
            <Link href="/documentation/api" className={styles.nextLink}>
              API Documentation
            </Link>
            <Link href="/learning-paths/developer" className={styles.nextLink}>
              Developer Learning Path
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}