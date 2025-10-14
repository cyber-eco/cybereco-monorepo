'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@cybereco/i18n';
import styles from './CallToAction.module.css';

export default function CallToAction() {
  const { t } = useI18n();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.ctaTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('home:homePage.cta.title') || 'Ready to Join the Future of Digital Living?'}
        </motion.h2>
        <motion.p 
          className={styles.ctaDescription}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('home:homePage.cta.subtitle') || 'Start with our flagship applications or explore our vision for tomorrow'}
        </motion.p>
        <motion.div 
          className={styles.ctaButtons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/portfolio" className={styles.primaryButton}>
            {t('home:homePage.cta.primaryButton') || 'Get Started with Hub'}
          </Link>
          <Link href="/help" className={styles.secondaryButton}>
            {t('home:homePage.cta.secondaryButton') || 'Explore Our Vision'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}