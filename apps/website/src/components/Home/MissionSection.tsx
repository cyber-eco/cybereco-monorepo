'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@cybereco/i18n';
import styles from './MissionSection.module.css';

export default function MissionSection() {
  const { t } = useI18n();

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.missionContent}>
          <div className={styles.textContent}>
            <motion.p 
              className={styles.sectionSubtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('home:homePage.mission.approach') || 'Our Approach'}
            </motion.p>
            
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('home:homePage.mission.title') || 'Human-Centered Technology'}
            </motion.h2>
            
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('home:homePage.mission.text') || 'We believe technology should serve humanity, not exploit it. Our mission is to create digital solutions that enhance human well-being, foster authentic connections, and support sustainable living.'}
            </motion.p>
            
            <motion.div 
              className={styles.buttonContainer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <a href="/about" className={styles.learnMoreButton}>
                {t('common:actions.learnMore') || 'Learn More'}
              </a>
            </motion.div>
          </div>
          <div className={styles.imageWrapper}>
            <motion.div 
              className={styles.missionImage}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}