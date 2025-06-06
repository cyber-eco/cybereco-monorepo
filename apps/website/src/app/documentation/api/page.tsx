'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCode, FaKey, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function ApiDocumentationPage() {
  const { t } = useI18n();

  const apiSections = [
    {
      icon: <FaKey />,
      title: 'Authentication API',
      description: 'OAuth2, JWT tokens, and session management',
      link: '/documentation/authentication'
    },
    {
      icon: <FaDatabase />,
      title: 'Data API',
      description: 'CRUD operations and data export endpoints',
      link: '/documentation/data-export'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security API',
      description: 'Two-factor auth and security settings',
      link: '/documentation/two-factor-auth'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaCode /> API Reference
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Complete API documentation for the CyberEco platform
        </motion.p>
      </header>

      <div className={styles.apiGrid}>
        {apiSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={section.link} className={styles.apiCard}>
              <div className={styles.iconWrapper}>
                {section.icon}
              </div>
              <h3 className={styles.cardTitle}>{section.title}</h3>
              <p className={styles.cardDescription}>{section.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <section className={styles.codeSection}>
        <h2>Quick Start</h2>
        <div className={styles.codeBlock}>
          <pre>
{`// Base URL
const API_BASE = 'https://api.cybere.co/v1';

// Authentication
const response = await fetch(\`\${API_BASE}/auth/login\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepassword'
  })
});

const { token } = await response.json();`}
          </pre>
        </div>
      </section>
    </div>
  );
}