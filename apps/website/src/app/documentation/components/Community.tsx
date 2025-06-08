'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaGithub, FaDiscord, FaLinkedin, FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';

export function Community() {
  const { t } = useI18n();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌍 {t('documentationPage.communityTitle') || 'Community & Support'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.communityIntro') || 'Join our vibrant community of users, developers, and contributors building the future of human-centered technology.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>💬 {t('documentationPage.communityChannelsTitle') || 'Community Channels'}</h4>
        <div className={styles.channelGrid}>
          <div className={styles.channelCard}>
            <div className={styles.channelIcon}>
              <FaDiscord />
            </div>
            <h5>{t('documentationPage.discordChannel') || 'Discord Community'}</h5>
            <p>{t('documentationPage.discordDesc') || 'Real-time chat with 5,000+ members. Get help, share ideas, and connect with the team.'}</p>
            <div className={styles.channelStats}>
              <span className={styles.statItem}>👥 5,234 members</span>
              <span className={styles.statItem}>🟢 Active now</span>
            </div>
            <button className={styles.joinButton}>
              {t('documentationPage.joinDiscord') || 'Join Discord'} <FaExternalLinkAlt />
            </button>
          </div>

          <div className={styles.channelCard}>
            <div className={styles.channelIcon}>
              <FaGithub />
            </div>
            <h5>{t('documentationPage.githubChannel') || 'GitHub Discussions'}</h5>
            <p>{t('documentationPage.githubDesc') || 'Technical discussions, feature requests, and open-source collaboration.'}</p>
            <div className={styles.channelStats}>
              <span className={styles.statItem}>⭐ 2.3k stars</span>
              <span className={styles.statItem}>🔀 156 contributors</span>
            </div>
            <button className={styles.joinButton}>
              {t('documentationPage.viewGithub') || 'View on GitHub'} <FaExternalLinkAlt />
            </button>
          </div>

          <div className={styles.channelCard}>
            <div className={styles.channelIcon}>
              <FaLinkedin />
            </div>
            <h5>{t('documentationPage.linkedinChannel') || 'LinkedIn Community'}</h5>
            <p>{t('documentationPage.linkedinDesc') || 'Professional networking and business use cases discussion.'}</p>
            <div className={styles.channelStats}>
              <span className={styles.statItem}>👔 1,200 professionals</span>
              <span className={styles.statItem}>📈 Growing</span>
            </div>
            <button className={styles.joinButton}>
              {t('documentationPage.followLinkedIn') || 'Follow on LinkedIn'} <FaExternalLinkAlt />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🤝 {t('documentationPage.waysToContributeTitle') || 'Ways to Contribute'}</h4>
        <div className={styles.contributeGrid}>
          <div className={styles.contributeCard}>
            <div className={styles.contributeIcon}>💻</div>
            <h5>{t('documentationPage.codeContribution') || 'Code Contributions'}</h5>
            <p>{t('documentationPage.codeContributionDesc') || 'Submit pull requests, fix bugs, or develop new features.'}</p>
            <ul className={styles.contributeList}>
              <li>{t('documentationPage.checkIssues') || 'Check open issues on GitHub'}</li>
              <li>{t('documentationPage.followGuidelines') || 'Follow contribution guidelines'}</li>
              <li>{t('documentationPage.writeTests') || 'Write tests for your code'}</li>
            </ul>
          </div>

          <div className={styles.contributeCard}>
            <div className={styles.contributeIcon}>📝</div>
            <h5>{t('documentationPage.documentationContribution') || 'Documentation'}</h5>
            <p>{t('documentationPage.documentationContributionDesc') || 'Improve guides, write tutorials, or translate content.'}</p>
            <ul className={styles.contributeList}>
              <li>{t('documentationPage.fixTypos') || 'Fix typos and clarify content'}</li>
              <li>{t('documentationPage.writeGuides') || 'Write user guides'}</li>
              <li>{t('documentationPage.translateDocs') || 'Translate documentation'}</li>
            </ul>
          </div>

          <div className={styles.contributeCard}>
            <div className={styles.contributeIcon}>🐛</div>
            <h5>{t('documentationPage.testingContribution') || 'Testing & Feedback'}</h5>
            <p>{t('documentationPage.testingContributionDesc') || 'Report bugs, test new features, and provide feedback.'}</p>
            <ul className={styles.contributeList}>
              <li>{t('documentationPage.reportBugs') || 'Report bugs with details'}</li>
              <li>{t('documentationPage.testBeta') || 'Test beta features'}</li>
              <li>{t('documentationPage.suggestImprovements') || 'Suggest improvements'}</li>
            </ul>
          </div>

          <div className={styles.contributeCard}>
            <div className={styles.contributeIcon}>🎨</div>
            <h5>{t('documentationPage.designContribution') || 'Design & UX'}</h5>
            <p>{t('documentationPage.designContributionDesc') || 'Create mockups, improve UI, or enhance user experience.'}</p>
            <ul className={styles.contributeList}>
              <li>{t('documentationPage.createMockups') || 'Create UI mockups'}</li>
              <li>{t('documentationPage.improveAccessibility') || 'Improve accessibility'}</li>
              <li>{t('documentationPage.designAssets') || 'Design visual assets'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>📚 {t('documentationPage.communityResourcesTitle') || 'Community Resources'}</h4>
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <h5>{t('documentationPage.contributorGuide') || 'Contributor Guide'}</h5>
            <p>{t('documentationPage.contributorGuideDesc') || 'Everything you need to start contributing to CyberEco.'}</p>
            <a href="#" className={styles.resourceLink}>
              {t('documentationPage.readGuide') || 'Read Guide'} →
            </a>
          </div>

          <div className={styles.resourceCard}>
            <h5>{t('documentationPage.codeOfConduct') || 'Code of Conduct'}</h5>
            <p>{t('documentationPage.codeOfConductDesc') || 'Our community guidelines for respectful collaboration.'}</p>
            <a href="#" className={styles.resourceLink}>
              {t('documentationPage.viewCode') || 'View Code'} →
            </a>
          </div>

          <div className={styles.resourceCard}>
            <h5>{t('documentationPage.brandAssets') || 'Brand Assets'}</h5>
            <p>{t('documentationPage.brandAssetsDesc') || 'Logos, colors, and brand guidelines for community use.'}</p>
            <a href="#" className={styles.resourceLink}>
              {t('documentationPage.downloadAssets') || 'Download Assets'} →
            </a>
          </div>

          <div className={styles.resourceCard}>
            <h5>{t('documentationPage.ambassadorProgram') || 'Ambassador Program'}</h5>
            <p>{t('documentationPage.ambassadorProgramDesc') || 'Become a CyberEco ambassador and help grow our community.'}</p>
            <a href="#" className={styles.resourceLink}>
              {t('documentationPage.learnMore') || 'Learn More'} →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.eventsSection}>
          <h4>{t('documentationPage.upcomingEventsTitle') || '📅 Upcoming Events'}</h4>
          <div className={styles.eventsList}>
            <div className={styles.eventItem}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>{t('documentationPage.eventMonth1') || 'JAN'}</span>
                <span className={styles.eventDay}>15</span>
              </div>
              <div className={styles.eventDetails}>
                <h5>{t('documentationPage.event1Title') || 'Monthly Community Call'}</h5>
                <p>{t('documentationPage.event1Desc') || 'Join us for updates, demos, and Q&A with the team.'}</p>
              </div>
            </div>

            <div className={styles.eventItem}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>{t('documentationPage.eventMonth2') || 'JAN'}</span>
                <span className={styles.eventDay}>22</span>
              </div>
              <div className={styles.eventDetails}>
                <h5>{t('documentationPage.event2Title') || 'Developer Workshop: API Integration'}</h5>
                <p>{t('documentationPage.event2Desc') || 'Deep dive into CyberEco APIs with live coding examples.'}</p>
              </div>
            </div>

            <div className={styles.eventItem}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>{t('documentationPage.eventMonth3') || 'FEB'}</span>
                <span className={styles.eventDay}>5</span>
              </div>
              <div className={styles.eventDetails}>
                <h5>{t('documentationPage.event3Title') || 'Hackathon: Build for Good'}</h5>
                <p>{t('documentationPage.event3Desc') || '48-hour hackathon focused on social impact applications.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.socialBox}>
          <h4>{t('documentationPage.followUsTitle') || 'Follow Us'}</h4>
          <p>{t('documentationPage.followUsDesc') || 'Stay updated with the latest news and announcements.'}</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className={styles.socialLink} aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Discord">
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}