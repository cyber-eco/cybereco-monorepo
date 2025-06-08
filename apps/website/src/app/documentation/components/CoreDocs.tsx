'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaChevronRight } from 'react-icons/fa';

interface CoreDocProps {
  docKey: string;
}

export function CoreDoc({ docKey }: CoreDocProps) {
  const { t } = useI18n();

  const renderPhilosophy = () => (
    <div className={styles.coreDocSection}>
      <div className={styles.coreDocHeader}>
        <div className={styles.coreDocIcon}>📖</div>
        <div className={styles.docTypeTag}>
          <span>{t('documentation:documentationPage.coreDocument')}</span>
        </div>
        <p className={styles.coreDocSummary}>
          {t('documentation:documentationPage.philosophyDocSummary')}
        </p>
      </div>
      
      <div className={`${styles.contentSection} ${styles.coreDocContent}`}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.keyPrinciples')}</h3>
        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.digitalSovereigntyPrinciple')}</h4>
            <p>{t('documentation:documentationPage.digitalSovereigntyDesc')}</p>
          </div>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.humanCenteredPrinciple')}</h4>
            <p>{t('documentation:documentationPage.humanCenteredDesc')}</p>
          </div>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.sustainablePrinciple')}</h4>
            <p>{t('documentation:documentationPage.sustainableDesc')}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.previewCard}>
          <p>{t('documentation:documentationPage.philosophyDocPreview')}</p>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:documentationPage.completePhilosophyDoc')}</h4>
          <p>{t('documentation:documentationPage.completePhilosophyDesc')}</p>
          <a href="/philosophy" className={styles.redirectButton}>
            {t('documentation:documentationPage.viewFullPhilosophy')}
            <FaChevronRight />
          </a>
        </div>
      </div>
    </div>
  );

  const renderVision = () => (
    <div className={styles.coreDocSection}>
      <div className={styles.coreDocHeader}>
        <div className={styles.coreDocIcon}>🔮</div>
        <div className={styles.docTypeTag}>
          <span>{t('documentation:documentationPage.futureVision')}</span>
        </div>
        <p className={styles.coreDocSummary}>
          {t('documentation:documentationPage.visionDocSummary')}
        </p>
      </div>
      
      <div className={`${styles.contentSection} ${styles.coreDocContent}`}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.visionComponents')}</h3>
        <div className={styles.visionGrid}>
          <div className={styles.visionCard}>
            <h4>{t('documentation:documentationPage.mobileP2PComponent')}</h4>
            <p>{t('documentation:documentationPage.mobileP2PDesc')}</p>
          </div>
          <div className={styles.visionCard}>
            <h4>{t('documentation:documentationPage.dataSovereigntyComponent')}</h4>
            <p>{t('documentation:documentationPage.dataSovereigntyDesc')}</p>
          </div>
          <div className={styles.visionCard}>
            <h4>{t('documentation:documentationPage.tokenEconomicsComponent')}</h4>
            <p>{t('documentation:documentationPage.tokenEconomicsDesc')}</p>
          </div>
          <div className={styles.visionCard}>
            <h4>{t('documentation:documentationPage.globalAccessComponent')}</h4>
            <p>{t('documentation:documentationPage.globalAccessDesc')}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.previewCard}>
          <p>{t('documentation:documentationPage.visionDocPreview')}</p>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:documentationPage.completeVisionDoc')}</h4>
          <p>{t('documentation:documentationPage.completeVisionDesc')}</p>
          <a href="/vision" className={styles.redirectButton}>
            {t('documentation:documentationPage.viewFullVision')}
            <FaChevronRight />
          </a>
        </div>
      </div>
    </div>
  );

  const renderRoadmap = () => (
    <div className={styles.coreDocSection}>
      <div className={styles.coreDocHeader}>
        <div className={styles.coreDocIcon}>🛠️</div>
        <div className={styles.docTypeTag}>
          <span>{t('documentation:documentationPage.developmentPlan')}</span>
        </div>
        <p className={styles.coreDocSummary}>
          {t('documentation:documentationPage.roadmapDocSummary')}
        </p>
      </div>
      
      <div className={`${styles.contentSection} ${styles.coreDocContent}`}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.developmentPhases')}</h3>
        <div className={styles.phaseTimeline}>
          <div className={styles.phaseItem}>
            <div className={styles.phaseNumber}>1</div>
            <div className={styles.phaseContent}>
              <h4 className={styles.phaseTitle}>{t('documentation:documentationPage.foundationPhase')}</h4>
              <p className={styles.phaseDescription}>{t('documentation:documentationPage.foundationDesc')}</p>
            </div>
          </div>
          <div className={styles.phaseItem}>
            <div className={styles.phaseNumber}>2</div>
            <div className={styles.phaseContent}>
              <h4 className={styles.phaseTitle}>{t('documentation:documentationPage.growthPhase')}</h4>
              <p className={styles.phaseDescription}>{t('documentation:documentationPage.growthDesc')}</p>
            </div>
          </div>
          <div className={styles.phaseItem}>
            <div className={styles.phaseNumber}>3</div>
            <div className={styles.phaseContent}>
              <h4 className={styles.phaseTitle}>{t('documentation:documentationPage.integrationPhase')}</h4>
              <p className={styles.phaseDescription}>{t('documentation:documentationPage.integrationDesc')}</p>
            </div>
          </div>
          <div className={styles.phaseItem}>
            <div className={styles.phaseNumber}>4</div>
            <div className={styles.phaseContent}>
              <h4 className={styles.phaseTitle}>{t('documentation:documentationPage.decentralizationPhase')}</h4>
              <p className={styles.phaseDescription}>{t('documentation:documentationPage.decentralizationDesc')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:documentationPage.completeRoadmapDoc')}</h4>
          <p>{t('documentation:documentationPage.completeRoadmapDesc')}</p>
          <a href="/roadmap" className={styles.redirectButton}>
            {t('documentation:documentationPage.viewFullRoadmap')}
            <FaChevronRight />
          </a>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className={styles.coreDocSection}>
      <div className={styles.coreDocHeader}>
        <div className={styles.coreDocIcon}>🚀</div>
        <div className={styles.docTypeTag}>
          <span>{t('documentation:documentationPage.solutionsOverview')}</span>
        </div>
        <p className={styles.coreDocSummary}>
          {t('documentation:documentationPage.portfolioDocSummary')}
        </p>
      </div>
      
      <div className={`${styles.contentSection} ${styles.coreDocContent}`}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.solutionCategories')}</h3>
        <div className={styles.solutionCategories}>
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>✅ {t('documentation:documentationPage.currentSolutions')}</h4>
            <div className={styles.categoryApps}>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>Hub</span>
                <span className={styles.statusBadge} data-status="live">🟢 Live</span>
              </div>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>JustSplit</span>
                <span className={styles.statusBadge} data-status="live">🟢 Live</span>
              </div>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>Website</span>
                <span className={styles.statusBadge} data-status="live">🟢 Live</span>
              </div>
            </div>
          </div>
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>🎯 {t('documentation:documentationPage.priorityApplications')}</h4>
            <div className={styles.categoryApps}>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>Somos</span>
                <span className={styles.statusBadge} data-status="development">🟡 {t('documentation:documentationPage.inDevelopment')}</span>
              </div>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>Demos</span>
                <span className={styles.statusBadge} data-status="development">🟡 {t('documentation:documentationPage.inDevelopment')}</span>
              </div>
              <div className={styles.appChipWithStatus}>
                <span className={styles.appChip}>Plantopia</span>
                <span className={styles.statusBadge} data-status="development">🟡 {t('documentation:documentationPage.inDevelopment')}</span>
              </div>
            </div>
          </div>
          <div className={styles.categorySection}>
            <h4 className={styles.categoryTitle}>🌟 {t('documentation:documentationPage.futureEcosystem')}</h4>
            <div className={styles.categoryApps}>
              <span className={styles.appCount}>{t('documentation:documentationPage.thirtyPlusApplications')}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.previewCard}>
          <p>{t('documentation:documentationPage.portfolioDocPreview')}</p>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:documentationPage.completeSolutionsPortfolio')}</h4>
          <p>{t('documentation:documentationPage.completeSolutionsDesc')}</p>
          <a href="/portfolio" className={styles.redirectButton}>
            {t('documentation:documentationPage.viewFullPortfolio')}
            <FaChevronRight />
          </a>
        </div>
      </div>
    </div>
  );

  switch (docKey) {
    case 'philosophy':
      return renderPhilosophy();
    case 'vision':
      return renderVision();
    case 'roadmap':
      return renderRoadmap();
    case 'portfolio':
      return renderPortfolio();
    default:
      return null;
  }
}