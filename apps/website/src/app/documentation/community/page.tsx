'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaGithub, FaDiscord, FaLinkedin, FaEnvelope, FaUsers, FaBook, FaComments, FaHandsHelping, FaBug, FaLanguage, FaPencilAlt, FaShare, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './page.module.css';

export default function CommunityPage() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <FaUsers className={styles.headerIcon} />
        <h1 className={styles.title}>
          {t('documentation:documentationPage.communitySupportTitle') || 'Community & Support'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.communitySupportSubtitle') || 'Join our community and get help when you need it'}
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <FaHandsHelping className={styles.sectionIcon} />
          <h2>{t('documentation:documentationPage.joinCommunityTitle') || 'Join the Community'}</h2>
        </div>
        
        <p className={styles.sectionDescription}>
          {t('documentation:documentationPage.joinCommunityText') || 'Connect with other CyberEco users, share experiences, and contribute to our growing ecosystem.'}
        </p>
        
        <div className={styles.communityGrid}>
          <a 
            href="https://github.com/cybereco" 
            className={styles.communityCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.communityIcon} />
            <h3>{t('documentation:documentationPage.githubTitle') || 'GitHub'}</h3>
            <p>{t('documentation:documentationPage.githubDesc') || 'Contribute to open source development'}</p>
            <FaExternalLinkAlt className={styles.linkIcon} />
          </a>
          
          <a 
            href="#" 
            className={styles.communityCard}
            onClick={(e) => { e.preventDefault(); alert('Discord link coming soon!'); }}
          >
            <FaDiscord className={styles.communityIcon} />
            <h3>{t('documentation:documentationPage.discordTitle') || 'Discord'}</h3>
            <p>{t('documentation:documentationPage.discordDesc') || 'Chat with the community in real-time'}</p>
            <span className={styles.comingSoon}>{t('documentation:documentationPage.comingSoon') || 'Coming Soon'}</span>
          </a>
          
          <a 
            href="#" 
            className={styles.communityCard}
            onClick={(e) => { e.preventDefault(); alert('LinkedIn page coming soon!'); }}
          >
            <FaLinkedin className={styles.communityIcon} />
            <h3>{t('documentation:documentationPage.linkedinTitle') || 'LinkedIn'}</h3>
            <p>{t('documentation:documentationPage.linkedinDesc') || 'Professional networking and updates'}</p>
            <span className={styles.comingSoon}>{t('documentation:documentationPage.comingSoon') || 'Coming Soon'}</span>
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <FaComments className={styles.sectionIcon} />
          <h2>{t('documentation:documentationPage.getSupportTitle') || 'Get Support'}</h2>
        </div>
        
        <div className={styles.supportGrid}>
          <div className={styles.supportCard}>
            <FaBook className={styles.supportIcon} />
            <h3>{t('documentation:documentationPage.documentationSupportTitle') || 'Documentation'}</h3>
            <p>{t('documentation:documentationPage.documentationSupportDesc') || 'Start with our comprehensive documentation for answers to common questions.'}</p>
            <Link href="/documentation" className={styles.supportLink}>
              {t('documentation:documentationPage.viewDocumentation') || 'View Documentation'}
            </Link>
          </div>
          
          <div className={styles.supportCard}>
            <FaComments className={styles.supportIcon} />
            <h3>{t('documentation:documentationPage.communitySupportTitle') || 'Community Forum'}</h3>
            <p>{t('documentation:documentationPage.communitySupportDesc') || 'Ask questions and share knowledge with other users in our community forum.'}</p>
            <a 
              href="#" 
              className={styles.supportLink}
              onClick={(e) => { e.preventDefault(); alert('Community forum coming soon!'); }}
            >
              {t('documentation:documentationPage.visitForum') || 'Visit Forum'}
            </a>
          </div>
          
          <div className={styles.supportCard}>
            <FaEnvelope className={styles.supportIcon} />
            <h3>{t('documentation:documentationPage.emailSupportTitle') || 'Email Support'}</h3>
            <p>{t('documentation:documentationPage.emailSupportDesc') || 'For technical issues or account problems, reach out to our support team.'}</p>
            <a 
              href="mailto:support@cybere.co" 
              className={styles.emailLink}
            >
              <FaEnvelope /> support@cybere.co
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <FaHandsHelping className={styles.sectionIcon} />
          <h2>{t('documentation:documentationPage.contributeTitle') || 'Ways to Contribute'}</h2>
        </div>
        
        <div className={styles.contributeList}>
          <div className={styles.contributeItem}>
            <FaBug className={styles.contributeIcon} />
            <div className={styles.contributeContent}>
              <h4>{t('documentation:documentationPage.contribute1') || 'Report bugs and suggest features on GitHub'}</h4>
              <p>{t('documentation:documentationPage.contribute1Desc') || 'Help us improve by reporting issues and proposing new features'}</p>
            </div>
          </div>
          
          <div className={styles.contributeItem}>
            <FaLanguage className={styles.contributeIcon} />
            <div className={styles.contributeContent}>
              <h4>{t('documentation:documentationPage.contribute2') || 'Help translate CyberEco to your language'}</h4>
              <p>{t('documentation:documentationPage.contribute2Desc') || 'Make CyberEco accessible to more people worldwide'}</p>
            </div>
          </div>
          
          <div className={styles.contributeItem}>
            <FaPencilAlt className={styles.contributeIcon} />
            <div className={styles.contributeContent}>
              <h4>{t('documentation:documentationPage.contribute3') || 'Write documentation and tutorials'}</h4>
              <p>{t('documentation:documentationPage.contribute3Desc') || 'Share your knowledge and help others learn'}</p>
            </div>
          </div>
          
          <div className={styles.contributeItem}>
            <FaShare className={styles.contributeIcon} />
            <div className={styles.contributeContent}>
              <h4>{t('documentation:documentationPage.contribute4') || 'Share CyberEco with your community'}</h4>
              <p>{t('documentation:documentationPage.contribute4Desc') || 'Spread the word about our ecosystem'}</p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.guidelinesAlert}>
        <div className={styles.alertHeader}>
          <span className={styles.alertIcon}>ℹ️</span>
          <h3>{t('documentation:documentationPage.communityGuidelines') || 'Community Guidelines'}</h3>
        </div>
        <p>{t('documentation:documentationPage.communityGuidelinesText') || 'Be respectful, helpful, and inclusive. We\'re all here to build something amazing together!'}</p>
      </div>
    </div>
  );
}