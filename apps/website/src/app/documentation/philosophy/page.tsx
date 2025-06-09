'use client';

import { useI18n } from '@cybereco/i18n';
import { useEffect, useState } from 'react';
import { 
  FaHeart, 
  FaShieldAlt, 
  FaUsers, 
  FaLock,
  FaLeaf,
  FaCode,
  FaHandshake,
  FaBrain,
  FaGlobe,
  FaLightbulb,
  FaChartLine,
  FaRocket
} from 'react-icons/fa';
import DocumentationHero from '../components/DocumentationHero';
import styles from './page.module.css';

export default function PhilosophyDocs() {
  const { t, language } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  // Ensure client-side rendering for translations
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Force re-render when language changes
  useEffect(() => {
    // This effect will re-run when language changes
  }, [language]);

  // Show loading state during SSR/initial mount to prevent flash of untranslated content
  if (!mounted) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaHeart />}
        title={t('common:philosophyPage.title') || 'Platform Philosophy'}
        subtitle={t('common:philosophyPage.subtitle') || 'The foundational principles and values that guide the CyberEco ecosystem'}
        gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)"
      />

      {/* Core Philosophy Section */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaLightbulb /> {t('common:philosophyPage.manifestoTitle') || 'Our Manifesto'}
        </h2>
        
        <div className={styles.alertBox}>
          <blockquote className={styles.quote}>
            {t('common:philosophyPage.manifestoQuote') || "A human-centered digital ecosystem for conscious, connected, and sustainable living."}
          </blockquote>
        </div>
        
        <p className={styles.contentText}>
          {t('common:philosophyPage.manifestoText') || "We believe in a world where digital tools enhance human potential rather than exploit it. Where privacy is a right, not a luxury. Where communities thrive through connection, not manipulation. Where technology serves consciousness, creativity, and collective wellbeing."}
        </p>
        
        <h3 className={styles.subTitle}>
          {t('common:philosophyPage.manifestoBeliefTitle') || 'We stand for:'}
        </h3>
        <ul className={styles.principleList}>
          <li>
            <FaShieldAlt className={styles.listIcon} />
            <span>{t('common:philosophyPage.manifestoBelief1') || 'Digital sovereignty - You own your data, your identity, your digital life'}</span>
          </li>
          <li>
            <FaHeart className={styles.listIcon} />
            <span>{t('common:philosophyPage.manifestoBelief2') || 'Human flourishing - Technology that nurtures wellbeing, not addiction'}</span>
          </li>
          <li>
            <FaUsers className={styles.listIcon} />
            <span>{t('common:philosophyPage.manifestoBelief3') || 'Meaningful connection - Real relationships over engagement metrics'}</span>
          </li>
          <li>
            <FaHandshake className={styles.listIcon} />
            <span>{t('common:philosophyPage.manifestoBelief4') || 'Open collaboration - Transparent, community-driven development'}</span>
          </li>
        </ul>
      </div>

      {/* Guiding Principles Section */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaShieldAlt /> {t('common:philosophyPage.principlesSectionTitle') || 'Core Principles'}
        </h2>

        {/* Digital Sovereignty */}
        <div className={styles.principleCard}>
          <div className={styles.cardHeader}>
            <FaLock className={styles.cardIcon} />
            <h3>{t('common:philosophyPage.digitalSovereigntyTitle') || 'Digital Sovereignty'}</h3>
          </div>
          
          <p className={styles.highlightText}>
            {t('common:philosophyPage.digitalSovereigntyQuote') || "Your data is yours. Your identity is yours. Your digital life is yours."}
          </p>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.digitalSovereigntyMeansTitle') || 'What this means:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.digitalSovereigntyMeans1') || 'You control who sees your data and how it\'s used'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyMeans2') || 'You can export, delete, or transfer your information anytime'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyMeans3') || 'Your privacy settings are respected across all our applications'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyMeans4') || 'No hidden tracking, no selling your data, no dark patterns'}</li>
          </ul>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.digitalSovereigntyImplTitle') || 'How we implement this:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.digitalSovereigntyImpl1') || 'End-to-end encryption for sensitive data'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyImpl2') || 'Local-first architecture where possible'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyImpl3') || 'Clear, granular privacy controls'}</li>
            <li>{t('common:philosophyPage.digitalSovereigntyImpl4') || 'Regular security audits and transparency reports'}</li>
          </ul>
        </div>

        {/* Wellbeing by Design */}
        <div className={styles.principleCard}>
          <div className={styles.cardHeader}>
            <FaBrain className={styles.cardIcon} />
            <h3>{t('common:philosophyPage.wellbeingTitle') || 'Human Wellbeing First'}</h3>
          </div>
          
          <p className={styles.highlightText}>
            {t('common:philosophyPage.wellbeingQuote') || "Technology should reduce stress, not create it. It should save time, not waste it."}
          </p>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.wellbeingMeansTitle') || 'What this means:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.wellbeingMeans1') || 'Intuitive interfaces that respect your cognitive load'}</li>
            <li>{t('common:philosophyPage.wellbeingMeans2') || 'Features designed to reduce screen time, not maximize it'}</li>
            <li>{t('common:philosophyPage.wellbeingMeans3') || 'No addictive mechanisms or manipulative design'}</li>
            <li>{t('common:philosophyPage.wellbeingMeans4') || 'Tools that promote balance and mindful technology use'}</li>
          </ul>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.wellbeingImplTitle') || 'How we implement this:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.wellbeingImpl1') || 'Clean, distraction-free interfaces'}</li>
            <li>{t('common:philosophyPage.wellbeingImpl2') || 'Usage insights and wellbeing metrics'}</li>
            <li>{t('common:philosophyPage.wellbeingImpl3') || 'Batch notifications and focus modes'}</li>
            <li>{t('common:philosophyPage.wellbeingImpl4') || 'Emphasis on quality interactions over quantity'}</li>
          </ul>
        </div>

        {/* Interconnection with Purpose */}
        <div className={styles.principleCard}>
          <div className={styles.cardHeader}>
            <FaGlobe className={styles.cardIcon} />
            <h3>{t('common:philosophyPage.interconnectionTitle') || 'Interconnected Solutions'}</h3>
          </div>
          
          <p className={styles.highlightText}>
            {t('common:philosophyPage.interconnectionQuote') || "Life doesn't happen in silos. Neither should your digital tools."}
          </p>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.interconnectionMeansTitle') || 'What this means:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.interconnectionMeans1') || 'Applications that work together seamlessly'}</li>
            <li>{t('common:philosophyPage.interconnectionMeans2') || 'Shared data and insights across your digital ecosystem'}</li>
            <li>{t('common:philosophyPage.interconnectionMeans3') || 'One identity, multiple solutions'}</li>
            <li>{t('common:philosophyPage.interconnectionMeans4') || 'Holistic approach to digital life management'}</li>
          </ul>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.interconnectionImplTitle') || 'How we implement this:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.interconnectionImpl1') || 'Unified authentication through Hub'}</li>
            <li>{t('common:philosophyPage.interconnectionImpl2') || 'Standardized data formats and APIs'}</li>
            <li>{t('common:philosophyPage.interconnectionImpl3') || 'Cross-application insights and analytics'}</li>
            <li>{t('common:philosophyPage.interconnectionImpl4') || 'Modular architecture for flexibility'}</li>
          </ul>
        </div>

        {/* Community is Core */}
        <div className={styles.principleCard}>
          <div className={styles.cardHeader}>
            <FaUsers className={styles.cardIcon} />
            <h3>{t('common:philosophyPage.communityTitle') || 'Community-Driven'}</h3>
          </div>
          
          <p className={styles.highlightText}>
            {t('common:philosophyPage.communityQuote') || "The best solutions come from the people who use them every day."}
          </p>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.communityMeansTitle') || 'What this means:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.communityMeans1') || 'Open source development and transparency'}</li>
            <li>{t('common:philosophyPage.communityMeans2') || 'User feedback shapes our roadmap'}</li>
            <li>{t('common:philosophyPage.communityMeans3') || 'Community contributions are welcomed and valued'}</li>
            <li>{t('common:philosophyPage.communityMeans4') || 'Decisions made in the open, not behind closed doors'}</li>
          </ul>
          
          <h4 className={styles.cardSubtitle}>
            {t('common:philosophyPage.communityImplTitle') || 'How we implement this:'}
          </h4>
          <ul className={styles.featureList}>
            <li>{t('common:philosophyPage.communityImpl1') || 'Public roadmaps and development process'}</li>
            <li>{t('common:philosophyPage.communityImpl2') || 'Regular community calls and forums'}</li>
            <li>{t('common:philosophyPage.communityImpl3') || 'Contributor recognition and rewards'}</li>
            <li>{t('common:philosophyPage.communityImpl4') || 'Community governance for major decisions'}</li>
          </ul>
        </div>
      </div>

      {/* Vision for the Future */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaRocket /> {t('common:philosophyPage.visionSectionTitle') || 'Our Vision for the Future'}
        </h2>
        
        <p className={styles.contentText}>
          {t('common:philosophyPage.visionText') || 'We\'re building more than software. We\'re creating a movement towards conscious technology use, genuine human connection, and sustainable digital practices.'}
        </p>
        
        <div className={styles.visionGrid}>
          <div className={styles.visionCard}>
            <FaLeaf className={styles.visionIcon} />
            <h4>{t('common:philosophyPage.visionSustainable') || 'Sustainable Technology'}</h4>
            <p>{t('common:philosophyPage.visionSustainableDesc') || 'Minimal resource usage, maximum human benefit'}</p>
          </div>
          
          <div className={styles.visionCard}>
            <FaGlobe className={styles.visionIcon} />
            <h4>{t('common:philosophyPage.visionDecentralized') || 'Decentralized Future'}</h4>
            <p>{t('common:philosophyPage.visionDecentralizedDesc') || 'No single point of failure or control'}</p>
          </div>
          
          <div className={styles.visionCard}>
            <FaCode className={styles.visionIcon} />
            <h4>{t('common:philosophyPage.visionOpenSource') || 'Open Source Everything'}</h4>
            <p>{t('common:philosophyPage.visionOpenSourceDesc') || 'Transparency and collaboration at every level'}</p>
          </div>
          
          <div className={styles.visionCard}>
            <FaChartLine className={styles.visionIcon} />
            <h4>{t('common:philosophyPage.visionEthical') || 'Ethical Business'}</h4>
            <p>{t('common:philosophyPage.visionEthicalDesc') || 'Success measured in human wellbeing, not just profit'}</p>
          </div>
        </div>
      </div>

      {/* Join the Movement */}
      <div className={styles.callToAction}>
        <h2>{t('common:philosophyPage.joinTitle') || 'Join the Movement'}</h2>
        <p>{t('common:philosophyPage.joinText') || 'Be part of building a more conscious, connected, and sustainable digital future.'}</p>
        <div className={styles.ctaButtons}>
          <a href="/documentation" className={styles.ctaButton}>
            {t('common:philosophyPage.joinCTA') || 'Read Our Documentation'}
          </a>
          <a href="/community" className={styles.ctaButtonSecondary}>
            {t('common:philosophyPage.communityCTA') || 'Join Our Community'}
          </a>
        </div>
      </div>
    </div>
  );
}