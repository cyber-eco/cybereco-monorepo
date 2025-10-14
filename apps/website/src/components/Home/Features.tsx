'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLeaf, FaLock, FaLaptopCode } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './Features.module.css';

const featuresData = [
  {
    id: 1,
    icon: FaUsers,
    titleKey: 'home:homePage.mission.transparency',
    descKey: 'home:homePage.mission.transparencyDesc',
    defaultTitle: 'Transparency',
    defaultDesc: 'Open development and clear data practices',
  },
  {
    id: 2,
    icon: FaLock,
    titleKey: 'home:homePage.mission.privacy',
    descKey: 'home:homePage.mission.privacyDesc',
    defaultTitle: 'Privacy First',
    defaultDesc: 'Your data belongs to you, always',
  },
  {
    id: 3,
    icon: FaUsers,
    titleKey: 'home:homePage.mission.community',
    descKey: 'home:homePage.mission.communityDesc',
    defaultTitle: 'Community Driven',
    defaultDesc: 'Built by and for the people who use it',
  },
  {
    id: 4,
    icon: FaLeaf,
    titleKey: 'home:homePage.mission.sustainable',
    descKey: 'home:homePage.mission.sustainableDesc',
    defaultTitle: 'Sustainable',
    defaultDesc: 'Long-term thinking over short-term profits',
  },
];

export default function Features() {
  const { t } = useI18n();

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('home:homePage.mission.approach') || 'Our Approach'}
        </motion.h2>
        <motion.p 
          className={styles.sectionDescription}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('home:homePage.mission.subtitle') || 'Building digital tools that empower people and communities'}
        </motion.p>
        
        <div className={styles.featuresGrid}>
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={feature.id} 
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.featureTitle}>
                  {t(feature.titleKey) || feature.defaultTitle}
                </h3>
                <p className={styles.featureDescription}>
                  {t(feature.descKey) || feature.defaultDesc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}