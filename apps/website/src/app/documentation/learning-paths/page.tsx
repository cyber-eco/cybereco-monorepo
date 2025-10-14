'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaUsers, FaCode } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function LearningPathsPage() {
  const { t } = useI18n();

  const paths = [
    {
      href: '/documentation/learning-paths/developer',
      icon: <FaCode />,
      title: t('documentation:learningPaths.developer.title') || 'Developer Path',
      description: t('documentation:learningPaths.developer.description') || 'Learn to build and contribute to the CyberEco ecosystem',
      level: t('documentation:learningPaths.advanced') || 'Advanced',
      duration: t('documentation:learningPaths.developer.duration') || '8-12 weeks'
    },
    {
      href: '/documentation/learning-paths/business-user',
      icon: <FaBriefcase />,
      title: t('documentation:learningPaths.businessUser.title') || 'Business User Path',
      description: t('documentation:learningPaths.businessUser.description') || 'Master CyberEco tools for your business needs',
      level: t('documentation:learningPaths.intermediate') || 'Intermediate',
      duration: t('documentation:learningPaths.businessUser.duration') || '4-6 weeks'
    },
    {
      href: '/documentation/learning-paths/community-leader',
      icon: <FaUsers />,
      title: t('documentation:learningPaths.communityLeader.title') || 'Community Leader Path',
      description: t('documentation:learningPaths.communityLeader.description') || 'Lead and grow communities using CyberEco platforms',
      level: t('documentation:learningPaths.intermediate') || 'Intermediate',
      duration: t('documentation:learningPaths.communityLeader.duration') || '6-8 weeks'
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
          <FaGraduationCap /> {t('documentation:learningPaths.title') || 'Learning Paths'}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('documentation:learningPaths.subtitle') || 'Structured learning journeys to master the CyberEco ecosystem'}
        </motion.p>
      </header>

      <div className={styles.pathsGrid}>
        {paths.map((path, index) => (
          <motion.div
            key={path.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={path.href} className={styles.pathCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {path.icon}
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.level}>{path.level}</span>
                  <span className={styles.duration}>{path.duration}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{path.title}</h3>
              <p className={styles.cardDescription}>{path.description}</p>
              <div className={styles.cardAction}>
                {t('documentation:learningPaths.startLearning') || 'Start Learning'} →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>{t('documentation:learningPaths.chooseYourPath') || 'Choose Your Path'}</h2>
        <p className={styles.sectionText}>
          {t('documentation:learningPaths.chooseYourPathDesc') || 
          'Each learning path is designed to help you achieve specific goals within the CyberEco ecosystem. Whether you\'re a developer looking to contribute, a business user seeking efficiency, or a community leader building connections, we have a path for you.'}
        </p>
      </section>
    </div>
  );
}