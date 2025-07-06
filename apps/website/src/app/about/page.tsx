'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function AboutPage() {
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
          {t('about:aboutPage.title') || 'Building Technology for Human Flourishing'}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('about:aboutPage.subtitle') || 'CyberEco is on a mission to create digital tools that empower individuals and strengthen communities'}
        </motion.p>
      </header>

      <section className={styles.section}>
        <div className={styles.aboutContent}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.story.title') || 'Our Story'}</h2>
            <p>
              {t('about:aboutPage.sections.story.content') || 'CyberEco was born from the frustration of seeing technology increasingly designed to extract value from users rather than provide it. We witnessed social media platforms optimizing for addiction, financial apps charging hidden fees, and data being harvested without consent. We knew there had to be a better way.'}
            </p>
            <p>
              {t('about:aboutPage.sections.story.continuation') || 'Starting with JustSplit, a simple expense-sharing app, we proved that useful software doesn\'t need to exploit users. Now we\'re building an entire ecosystem of applications based on principles of digital sovereignty, privacy, and human-centered design.'}
            </p>
          </div>
          <div className={styles.logoContainer}>
            <img src="/logo.svg" alt="CyberEco Logo" className={styles.logoImage} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.mission.title') || 'Mission & Values'}</h2>
        <blockquote className={styles.manifestoQuote}>
          {t('about:aboutPage.sections.story.quote') || '"Technology is best when it brings people together." - Matt Mullenweg'}
        </blockquote>
        <p>{t('about:aboutPage.sections.mission.missionStatement') || 'To create a digital ecosystem that enhances human well-being, fosters authentic connections, and supports sustainable living through technology that respects user sovereignty and privacy.'}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.approach.title') || 'Our Approach'}</h2>
        <p>{t('about:aboutPage.sections.approach.subtitle') || 'Building Different'}</p>
        <ul>
          <li>{t('about:aboutPage.sections.approach.principles.openSource.title') || 'Open Source When Possible'} - {t('about:aboutPage.sections.approach.principles.openSource.description') || 'We believe in transparency and community contribution'}</li>
          <li>{t('about:aboutPage.sections.approach.principles.privacyFirst.title') || 'Privacy by Design'} - {t('about:aboutPage.sections.approach.principles.privacyFirst.description') || 'Your data stays yours, always'}</li>
          <li>{t('about:aboutPage.sections.approach.principles.noVenture.title') || 'No Venture Capital'} - {t('about:aboutPage.sections.approach.principles.noVenture.description') || 'We grow sustainably without pressure to exploit users'}</li>
          <li>{t('about:aboutPage.sections.approach.principles.community.title') || 'Community Governance'} - {t('about:aboutPage.sections.approach.principles.community.description') || 'Users have a real voice in platform development'}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.future.title') || 'The Future We\'re Building'}</h2>
        <div className={styles.aboutContent}>
          <div className={styles.textContent}>
            <p>
              {t('about:aboutPage.sections.future.description') || 'By 2030, we envision CyberEco as a fully decentralized ecosystem where users have complete sovereignty over their digital lives. No central servers, no data harvesting, no surveillance capitalism - just useful tools that make life better.'}
            </p>
            <p>
              {t('about:aboutPage.sections.future.callToAction') || 'Join us in building a more human digital future.'}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.values.title') || 'Core Values'}</h2>
        <div className={styles.valuesGrid}>
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.valueTitle}>{t('about:aboutPage.sections.mission.values.sovereignty.title') || 'Digital Sovereignty'}</h3>
            <p>{t('about:aboutPage.sections.mission.values.sovereignty.description') || 'Users own their data, identity, and digital presence'}</p>
          </motion.div>
          
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.valueTitle}>{t('about:aboutPage.sections.mission.values.humanCentered.title') || 'Human-Centered Design'}</h3>
            <p>{t('about:aboutPage.sections.mission.values.humanCentered.description') || 'Technology serves people, not profit metrics'}</p>
          </motion.div>
          
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.valueTitle}>{t('about:aboutPage.sections.mission.values.transparency.title') || 'Radical Transparency'}</h3>
            <p>{t('about:aboutPage.sections.mission.values.transparency.description') || 'Open development, clear business models, honest communication'}</p>
          </motion.div>
          
          <motion.div 
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.valueTitle}>{t('about:aboutPage.sections.mission.values.sustainability.title') || 'Long-term Thinking'}</h3>
            <p>{t('about:aboutPage.sections.mission.values.sustainability.description') || 'Building for decades, not quarterly reports'}</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about:aboutPage.sections.team.title') || 'The Team'}</h2>
        <p className={styles.teamDescription}>
          {t('about:aboutPage.sections.team.description') || 'CyberEco is built by a distributed team of developers, designers, and dreamers who believe in a better digital future.'}
        </p>
      </section>

      <motion.div 
        className={styles.joinSection}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.iconContainer}>
          <FaHandshake />
        </div>
        <h2 className={styles.joinTitle}>{t('about:aboutPage.cta.joinCommunity') || 'Join Our Community'}</h2>
        <p className={styles.joinText}>{t('about:aboutPage.sections.future.callToAction') || 'Join us in building a more human digital future.'}</p>
      </motion.div>
    </div>
  );
}