'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaDiscord, FaGithub, FaComments } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function CommunityPage() {
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
          <FaUsers /> Community Hub
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join the CyberEco community and help shape the future of digital sovereignty
        </motion.p>
      </header>

      <motion.div
        className={styles.comingSoonCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.iconGrid}>
          <FaDiscord className={styles.socialIcon} />
          <FaGithub className={styles.socialIcon} />
          <FaComments className={styles.socialIcon} />
        </div>
        
        <h2 className={styles.comingSoonTitle}>Community Features Coming Soon!</h2>
        <p className={styles.comingSoonText}>
          We're building a vibrant community platform where you can:
        </p>
        
        <ul className={styles.featureList}>
          <li>Connect with other CyberEco users</li>
          <li>Share ideas and best practices</li>
          <li>Contribute to open-source projects</li>
          <li>Participate in community governance</li>
          <li>Access exclusive resources and events</li>
        </ul>

        <p className={styles.ctaText}>
          In the meantime, you can:
        </p>

        <div className={styles.actionButtons}>
          <Link href="/contact" className={styles.primaryButton}>
            Contact Us
          </Link>
          <Link href="/documentation" className={styles.secondaryButton}>
            Read Documentation
          </Link>
        </div>
      </motion.div>
    </div>
  );
}