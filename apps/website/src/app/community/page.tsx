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
          <FaUsers /> {t('community:title')}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('community:subtitle')}
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
        
        <h2 className={styles.comingSoonTitle}>{t('community:comingSoon.title')}</h2>
        <p className={styles.comingSoonText}>
          {t('community:comingSoon.description')}
        </p>
        
        <ul className={styles.featureList}>
          <li>{t('community:comingSoon.features.connect')}</li>
          <li>{t('community:comingSoon.features.share')}</li>
          <li>{t('community:comingSoon.features.contribute')}</li>
          <li>{t('community:comingSoon.features.participate')}</li>
          <li>{t('community:comingSoon.features.access')}</li>
        </ul>

        <p className={styles.ctaText}>
          {t('community:comingSoon.cta')}
        </p>

        <div className={styles.actionButtons}>
          <Link href="/contact" className={styles.primaryButton}>
            {t('community:comingSoon.buttons.contact')}
          </Link>
          <Link href="/documentation" className={styles.secondaryButton}>
            {t('community:comingSoon.buttons.documentation')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}