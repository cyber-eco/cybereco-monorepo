'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@cybereco/i18n';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className={styles.heroContainer}>
      <div className={styles.circleDecoration} aria-hidden="true" />
      <div className={styles.circleDecoration2} aria-hidden="true" />
      
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.primaryText}>
              {t('home:homePage.hero.title') || 'Digital Solutions for a Connected World'}
            </span>
          </motion.h1>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('home:homePage.hero.subtitle') || 'CyberEco creates innovative applications that improve how people manage finances, participate in communities, and connect with each other in the digital age.'}
          </motion.p>
          
          <motion.div 
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/portfolio" className={styles.primaryButton}>
              {t('home:homePage.hero.exploreSolutions') || 'Explore Solutions'}
            </Link>
            <Link href="/about" className={styles.secondaryButton}>
              {t('home:homePage.hero.learnMore') || 'Learn More'}
            </Link>
          </motion.div>
        </div>
        
        <div className={styles.heroImageWrapper}>
          <motion.div 
            className={styles.heroImage}
            role="img" 
            aria-label="Digital collaboration illustration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
}