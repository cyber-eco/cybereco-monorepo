'use client';

import React from 'react';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero } from '../components';
import { 
  FaShieldAlt, 
  FaUsers, 
  FaLock, 
  FaHandshake,
  FaGlobe,
  FaUserShield,
  FaBalanceScale,
  FaKey,
  FaExchangeAlt
} from 'react-icons/fa';
import styles from './page.module.css';

export default function DataPhilosophyPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaShieldAlt />}
        title={t('documentation:dataPhilosophy.title') || 'Data Philosophy'}
        subtitle={t('documentation:dataPhilosophy.subtitle') || 'Your data, your control. A new paradigm for digital ownership.'}
        gradient="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)"
      />

      <section className={styles.contentSection}>
        <div className={styles.philosophyIntro}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataPhilosophy.intro.title') || 'A Revolution in Data Ownership'}
          </h2>
          <p className={styles.introText}>
            {t('documentation:dataPhilosophy.intro.description') || 
            'In the traditional digital world, your data is scattered across countless servers, owned by corporations, and used in ways you can\'t control. CyberEco fundamentally reimagines this relationship, putting you at the center of your digital universe.'}
          </p>
        </div>

        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaUserShield />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.sovereignty.title') || 'Data Sovereignty'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.sovereignty.description') || 
              'You are the sovereign owner of your data. No company, government, or third party can access, modify, or delete your information without your explicit consent.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.sovereignty.example') || 'Your personal vault, your encryption keys, your rules.'}</code>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaUsers />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.shared.title') || 'Shared Ownership'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.shared.description') || 
              'When data involves multiple parties, ownership is shared. Changes require consensus, ensuring fairness and preventing unilateral modifications.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.shared.example') || 'Group expenses need approval from all participants.'}</code>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaLock />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.privacy.title') || 'Privacy by Design'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.privacy.description') || 
              'Privacy isn\'t an afterthought—it\'s the foundation. End-to-end encryption, zero-knowledge architecture, and local-first computing protect your digital life.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.privacy.example') || 'Even we can\'t see your data.'}</code>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaHandshake />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.consent.title') || 'Explicit Consent'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.consent.description') || 
              'Every data interaction requires clear, informed consent. No hidden terms, no assumed permissions, no data exploitation.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.consent.example') || 'You decide who sees what, when, and why.'}</code>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaGlobe />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.community.title') || 'Community Governance'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.community.description') || 
              'Public data belongs to the community. Democratic processes govern shared resources, with transparency and accountability built in.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.community.example') || 'Political data verified by citizens, not corporations.'}</code>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <FaExchangeAlt />
            </div>
            <h3>{t('documentation:dataPhilosophy.principles.portability.title') || 'True Portability'}</h3>
            <p>{t('documentation:dataPhilosophy.principles.portability.description') || 
              'Your data moves with you. Export, import, or migrate your entire digital life without lock-in or data loss.'}</p>
            <div className={styles.principleExample}>
              <code>{t('documentation:dataPhilosophy.principles.portability.example') || 'Change providers without losing your history.'}</code>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:dataPhilosophy.paradigm.title') || 'The Paradigm Shift'}
        </h2>
        
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <h3 className={styles.oldWay}>{t('documentation:dataPhilosophy.paradigm.traditional.title') || 'Traditional Model'}</h3>
            <ul className={styles.comparisonList}>
              <li>{t('documentation:dataPhilosophy.paradigm.traditional.item1') || 'Data stored on corporate servers'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.traditional.item2') || 'Terms of service grant broad usage rights'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.traditional.item3') || 'Deletion requests may be ignored'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.traditional.item4') || 'Data monetized without compensation'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.traditional.item5') || 'Limited or no portability'}</li>
            </ul>
          </div>
          
          <div className={styles.comparisonCard}>
            <h3 className={styles.newWay}>{t('documentation:dataPhilosophy.paradigm.cybereco.title') || 'CyberEco Model'}</h3>
            <ul className={styles.comparisonList}>
              <li>{t('documentation:dataPhilosophy.paradigm.cybereco.item1') || 'Data in your personal encrypted vault'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.cybereco.item2') || 'You grant specific, revocable permissions'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.cybereco.item3') || 'Instant, verifiable data deletion'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.cybereco.item4') || 'You control and benefit from your data'}</li>
              <li>{t('documentation:dataPhilosophy.paradigm.cybereco.item5') || 'Export everything, anytime, anywhere'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:dataPhilosophy.implementation.title') || 'Philosophy in Practice'}
        </h2>
        
        <div className={styles.implementationGrid}>
          <div className={styles.implementationCard}>
            <div className={styles.implementationHeader}>
              <FaKey />
              <h3>{t('documentation:dataPhilosophy.implementation.ownership.title') || 'Ownership Types'}</h3>
            </div>
            <p>{t('documentation:dataPhilosophy.implementation.ownership.description') || 
              'Different data requires different ownership models. Personal data stays private, shared data requires consensus, and public data serves the community.'}</p>
            <div className={styles.learnMore}>
              <a href="/documentation/data-model">
                {t('documentation:dataPhilosophy.implementation.ownership.link') || 'Explore Data Models →'}
              </a>
            </div>
          </div>

          <div className={styles.implementationCard}>
            <div className={styles.implementationHeader}>
              <FaExchangeAlt />
              <h3>{t('documentation:dataPhilosophy.implementation.sync.title') || 'Synchronization'}</h3>
            </div>
            <p>{t('documentation:dataPhilosophy.implementation.sync.description') || 
              'Advanced protocols ensure data consistency across multiple owners while respecting sovereignty. Conflict-free replicated data types enable seamless collaboration.'}</p>
            <div className={styles.learnMore}>
              <a href="/documentation/data-sync">
                {t('documentation:dataPhilosophy.implementation.sync.link') || 'Learn About Sync →'}
              </a>
            </div>
          </div>

          <div className={styles.implementationCard}>
            <div className={styles.implementationHeader}>
              <FaBalanceScale />
              <h3>{t('documentation:dataPhilosophy.implementation.governance.title') || 'Governance'}</h3>
            </div>
            <p>{t('documentation:dataPhilosophy.implementation.governance.description') || 
              'Smart contracts and community consensus mechanisms ensure fair governance of shared resources. Democracy meets technology for transparent decision-making.'}</p>
            <div className={styles.learnMore}>
              <a href="/documentation/demos-app">
                {t('documentation:dataPhilosophy.implementation.governance.link') || 'See Demos App →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.callToAction}>
          <h2>{t('documentation:dataPhilosophy.cta.title') || 'Join the Data Revolution'}</h2>
          <p>{t('documentation:dataPhilosophy.cta.description') || 
            'CyberEco is more than technology—it\'s a movement towards digital freedom. Together, we\'re building a future where privacy is default, ownership is real, and communities thrive.'}</p>
          <div className={styles.ctaButtons}>
            <a href="/documentation" className={styles.primaryButton}>
              {t('documentation:dataPhilosophy.cta.startButton') || 'Get Started'}
            </a>
            <a href="/documentation/data-model" className={styles.secondaryButton}>
              {t('documentation:dataPhilosophy.cta.learnButton') || 'Technical Details'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}