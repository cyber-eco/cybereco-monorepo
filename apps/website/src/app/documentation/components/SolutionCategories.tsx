'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaChevronRight } from 'react-icons/fa';

export function SolutionCategories() {
  const { t } = useI18n();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🗂️ {t('documentationPage.solutionCategoriesTitle') || 'Solution Categories'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.solutionCategoriesIntro') || 'CyberEco offers a comprehensive suite of digital solutions organized into strategic categories to serve diverse user needs.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>💰</div>
            <h4>{t('documentationPage.financialCollaborationCategory') || 'Financial Collaboration'}</h4>
            <p>{t('documentationPage.financialCollaborationDesc') || 'Tools for expense sharing, budget management, and financial transparency.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>JustSplit</span>
              <span className={styles.appChip}>BudgetWise</span>
              <span className={styles.appChip}>InvestTogether</span>
            </div>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🏛️</div>
            <h4>{t('documentationPage.communityGovernanceCategory') || 'Community Governance'}</h4>
            <p>{t('documentationPage.communityGovernanceDesc') || 'Democratic decision-making and community management platforms.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>Demos</span>
              <span className={styles.appChip}>Consensus</span>
              <span className={styles.appChip}>CitizenVoice</span>
            </div>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🌍</div>
            <h4>{t('documentationPage.socialConnectionCategory') || 'Social Connection'}</h4>
            <p>{t('documentationPage.socialConnectionDesc') || 'Build meaningful relationships and explore cultural heritage.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>Somos</span>
              <span className={styles.appChip}>CultureBridge</span>
              <span className={styles.appChip}>FamilyTree</span>
            </div>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🌱</div>
            <h4>{t('documentationPage.sustainableLivingCategory') || 'Sustainable Living'}</h4>
            <p>{t('documentationPage.sustainableLivingDesc') || 'Environmental stewardship and sustainable lifestyle management.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>Plantopia</span>
              <span className={styles.appChip}>EcoTracker</span>
              <span className={styles.appChip}>GreenHome</span>
            </div>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>📚</div>
            <h4>{t('documentationPage.knowledgeSharingCategory') || 'Knowledge Sharing'}</h4>
            <p>{t('documentationPage.knowledgeSharingDesc') || 'Educational platforms and collaborative learning environments.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>LearnHub</span>
              <span className={styles.appChip}>SkillShare</span>
              <span className={styles.appChip}>MentorMatch</span>
            </div>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>🔐</div>
            <h4>{t('documentationPage.digitalSovereigntyCategory') || 'Digital Sovereignty'}</h4>
            <p>{t('documentationPage.digitalSovereigntyDesc') || 'Privacy-first tools for data ownership and identity management.'}</p>
            <div className={styles.categoryApps}>
              <span className={styles.appChip}>Hub</span>
              <span className={styles.appChip}>DataVault</span>
              <span className={styles.appChip}>IdentityChain</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.infoBox}>
          <h4>{t('documentationPage.categoryNavigationTitle') || 'Navigate by Category'}</h4>
          <p>{t('documentationPage.categoryNavigationDesc') || 'Each category represents a key area of human life where technology can enhance collaboration and connection. Click on any application to learn more about its features and implementation status.'}</p>
        </div>
      </div>
    </>
  );
}