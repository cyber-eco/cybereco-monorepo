'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaRocket, FaUsers, FaShieldAlt, FaMobile, FaFileExport } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function GuidesPage() {
  const { t } = useI18n();

  const guides = [
    {
      href: '/guides/account-setup',
      icon: <FaRocket />,
      title: 'Account Setup',
      description: 'Get started with your CyberEco account and configure your profile'
    },
    {
      href: '/guides/justsplit',
      icon: <FaUsers />,
      title: 'JustSplit Guide',
      description: 'Learn how to use JustSplit for expense sharing and group management'
    },
    {
      href: '/guides/group-management',
      icon: <FaUsers />,
      title: 'Group Management',
      description: 'Create and manage groups for expense sharing'
    },
    {
      href: '/guides/data-export',
      icon: <FaFileExport />,
      title: 'Data Export',
      description: 'Export your data for backup or analysis'
    },
    {
      href: '/guides/privacy-settings',
      icon: <FaShieldAlt />,
      title: 'Privacy Settings',
      description: 'Configure your privacy and security preferences'
    },
    {
      href: '/guides/mobile-app',
      icon: <FaMobile />,
      title: 'Mobile App',
      description: 'Use CyberEco apps on your mobile device'
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
          <FaBook /> User Guides
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Step-by-step guides to help you get the most out of CyberEco
        </motion.p>
      </header>

      <div className={styles.guidesGrid}>
        {guides.map((guide, index) => (
          <motion.div
            key={guide.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={guide.href} className={styles.guideCard}>
              <div className={styles.iconWrapper}>
                {guide.icon}
              </div>
              <h3 className={styles.cardTitle}>{guide.title}</h3>
              <p className={styles.cardDescription}>{guide.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}