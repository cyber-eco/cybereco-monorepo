'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

interface Solution {
  id: string;
  title: string;
  description: string;
  color: string;
  image?: string;
  url?: string;
  category: string;
  phase: string;
}

const getSolutions = (t: (key: string) => string): Solution[] => [
  // CURRENT APPLICATIONS (Live/In Development) - Now properly categorized
  { id: 'hub', title: t('portfolioPage.hubTitle'), description: t('portfolioPage.hubDesc'), color: '#006241', url: 'https://hub.cybere.co', category: 'tech', phase: 'current' },
  { id: 'justsplit', title: t('portfolioPage.justSplitTitle'), description: t('portfolioPage.justSplitDesc'), color: '#006241', image: '/portfolio/justsplit.png', url: 'https://justsplit.cybere.co', category: 'finance', phase: 'current' },
  { id: 'website', title: t('portfolioPage.websiteTitle'), description: t('portfolioPage.websiteDesc'), color: '#006241', url: '/', category: 'tech', phase: 'current' },
  
  // PRIORITY APPLICATIONS (Next Wave 2025-2026) - Now properly categorized
  { id: 'somos', title: t('portfolioPage.somosTitle'), description: t('portfolioPage.somosDesc'), color: '#8B4513', category: 'identity', phase: 'priority' },
  { id: 'demos', title: t('portfolioPage.demosTitle'), description: t('portfolioPage.demosDesc'), color: '#4A5568', category: 'community', phase: 'priority' },
  { id: 'plantopia', title: t('portfolioPage.plantopiaTitle'), description: t('portfolioPage.plantopiaDesc'), color: '#48BB78', category: 'sustainability', phase: 'priority' },
  
  // FUTURE ECOSYSTEM - Finance & Economy
  { id: 'mywealth', title: t('portfolioPage.myWealthTitle'), description: t('portfolioPage.myWealthDesc'), color: '#F57C00', category: 'finance', phase: 'future' },
  { id: 'mybusiness', title: t('portfolioPage.myBusinessTitle'), description: t('portfolioPage.myBusinessDesc'), color: '#303F9F', category: 'finance', phase: 'future' },
  { id: 'crowdfund', title: t('portfolioPage.crowdFundTitle'), description: t('portfolioPage.crowdFundDesc'), color: '#00796B', category: 'finance', phase: 'future' },
  { id: 'offerme', title: t('portfolioPage.offerMeTitle'), description: t('portfolioPage.offerMeDesc'), color: '#C2185B', category: 'finance', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Community & Governance
  { id: 'community-manager', title: t('portfolioPage.communityManagerTitle'), description: t('portfolioPage.communityManagerDesc'), color: '#8E24AA', category: 'community', phase: 'future' },
  { id: 'mycommunity', title: t('portfolioPage.myCommunityTitle'), description: t('portfolioPage.myCommunityDesc'), color: '#757575', category: 'community', phase: 'future' },
  { id: 'conciliation', title: t('portfolioPage.conciliationTitle'), description: t('portfolioPage.conciliationDesc'), color: '#388E3C', category: 'community', phase: 'future' },
  { id: 'crowdpool', title: t('portfolioPage.crowdPoolTitle'), description: t('portfolioPage.crowdPoolDesc'), color: '#0288D1', category: 'community', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Sustainability & Home
  { id: 'ecotul', title: t('portfolioPage.ecoTulTitle'), description: t('portfolioPage.ecoTulDesc'), color: '#689F38', category: 'sustainability', phase: 'future' },
  { id: 'myhome', title: t('portfolioPage.myHomeTitle'), description: t('portfolioPage.myHomeDesc'), color: '#795548', category: 'sustainability', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Education & Growth
  { id: 'education-hub', title: t('portfolioPage.educationHubTitle'), description: t('portfolioPage.educationHubDesc'), color: '#FFA000', category: 'education', phase: 'future' },
  { id: 'skill-share', title: t('portfolioPage.skillShareTitle'), description: t('portfolioPage.skillShareDesc'), color: '#5E35B1', category: 'education', phase: 'future' },
  { id: 'habits', title: t('portfolioPage.habitsTitle'), description: t('portfolioPage.habitsDesc'), color: '#43A047', category: 'education', phase: 'future' },
  { id: 'one-step', title: t('portfolioPage.oneStepTitle'), description: t('portfolioPage.oneStepDesc'), color: '#00ACC1', category: 'education', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Health & Wellness
  { id: 'healthy', title: t('portfolioPage.healthyTitle'), description: t('portfolioPage.healthyDesc'), color: '#D32F2F', category: 'health', phase: 'future' },
  { id: 'petpal', title: t('portfolioPage.petPalTitle'), description: t('portfolioPage.petPalDesc'), color: '#F4511E', category: 'health', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Identity & Legal
  { id: 'lawpal', title: t('portfolioPage.lawPalTitle'), description: t('portfolioPage.lawPalDesc'), color: '#616161', category: 'identity', phase: 'future' },
  { id: 'mydata', title: t('portfolioPage.myDataTitle'), description: t('portfolioPage.myDataDesc'), color: '#455A64', category: 'identity', phase: 'future' },
  { id: 'digitalme', title: t('portfolioPage.digitalMeTitle'), description: t('portfolioPage.digitalMeDesc'), color: '#0097A7', category: 'identity', phase: 'future' },
  { id: 'mydocs', title: t('portfolioPage.myDocsTitle'), description: t('portfolioPage.myDocsDesc'), color: '#7B1FA2', category: 'identity', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Travel & Discovery
  { id: 'travelmate', title: t('portfolioPage.travelMateTitle'), description: t('portfolioPage.travelMateDesc'), color: '#039BE5', category: 'travel', phase: 'future' },
  { id: 'eventconnect', title: t('portfolioPage.eventConnectTitle'), description: t('portfolioPage.eventConnectDesc'), color: '#FB8C00', category: 'travel', phase: 'future' },
  { id: 'localwonders', title: t('portfolioPage.localWondersTitle'), description: t('portfolioPage.localWondersDesc'), color: '#795548', category: 'travel', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Tech & Social
  { id: 'nexus', title: t('portfolioPage.nexusTitle'), description: t('portfolioPage.nexusDesc'), color: '#E91E63', category: 'tech', phase: 'future' },
  { id: 'timesync', title: t('portfolioPage.timeSyncTitle'), description: t('portfolioPage.timeSyncDesc'), color: '#607D8B', category: 'tech', phase: 'future' },
];

const getCategories = (t: (key: string) => string) => [
  { id: 'all', name: t('portfolioPage.allSolutions'), icon: '🎯' },
  { id: 'finance', name: t('portfolioPage.financeEconomy'), icon: '💰' },
  { id: 'community', name: t('portfolioPage.communityGovernance'), icon: '🏛️' },
  { id: 'sustainability', name: t('portfolioPage.sustainabilityHome'), icon: '🌱' },
  { id: 'education', name: t('portfolioPage.educationGrowth'), icon: '📚' },
  { id: 'health', name: t('portfolioPage.healthWellness'), icon: '❤️' },
  { id: 'identity', name: t('portfolioPage.identityLegal'), icon: '🔐' },
  { id: 'travel', name: t('portfolioPage.travelDiscovery'), icon: '✈️' },
  { id: 'tech', name: t('portfolioPage.techSocial'), icon: '💻' },
];

const getStatusFilters = (t: (key: string) => string) => [
  { id: 'all', name: t('portfolioPage.allStatuses'), icon: '📊' },
  { id: 'live', name: t('portfolioPage.liveLabel'), icon: '✅' },
  { id: 'development', name: t('portfolioPage.planning2025Label'), icon: '🔄' },
  { id: 'planned', name: t('portfolioPage.futureEcosystemLabel'), icon: '🌟' },
];

const getPhaseInfo = (t: (key: string) => string) => ({
  current: { label: t('portfolioPage.liveLabel'), color: '#006241' },
  priority: { label: t('portfolioPage.planning2025Label'), color: '#F57C00' },
  future: { label: t('portfolioPage.futureEcosystemLabel'), color: '#1976D2' },
});

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Check if hash matches a category
        const categories = getCategories(t);
        const matchingCategory = categories.find(cat => cat.id === hash);
        if (matchingCategory) {
          setSelectedCategory(hash);
          // Scroll to the category section
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          // Check if hash matches a specific solution
          const solutions = getSolutions(t);
          const matchingSolution = solutions.find(sol => sol.id === hash);
          if (matchingSolution) {
            setSelectedCategory(matchingSolution.category);
            setTimeout(() => {
              const element = document.getElementById(hash);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [t]);

  const solutions = getSolutions(t);
  const categories = getCategories(t);
  const statusFilters = getStatusFilters(t);

  // Apply both category and status filters
  const filteredSolutions = solutions.filter(solution => {
    const categoryMatch = selectedCategory === 'all' || solution.category === selectedCategory;
    let statusMatch = true;
    
    if (selectedStatus !== 'all') {
      switch (selectedStatus) {
        case 'live':
          statusMatch = solution.phase === 'current';
          break;
        case 'development':
          statusMatch = solution.phase === 'priority';
          break;
        case 'planned':
          statusMatch = solution.phase === 'future';
          break;
      }
    }
    
    return categoryMatch && statusMatch;
  });


  const groupedSolutions = selectedCategory === 'all'
    ? [
        // Category-based grouping for all applications
        { category: { id: 'finance', name: t('portfolioPage.financeEconomy'), icon: '💰' }, solutions: filteredSolutions.filter(s => s.category === 'finance') },
        { category: { id: 'community', name: t('portfolioPage.communityGovernance'), icon: '🏛️' }, solutions: filteredSolutions.filter(s => s.category === 'community') },
        { category: { id: 'tech', name: t('portfolioPage.techSocial'), icon: '💻' }, solutions: filteredSolutions.filter(s => s.category === 'tech') },
        { category: { id: 'sustainability', name: t('portfolioPage.sustainabilityHome'), icon: '🌱' }, solutions: filteredSolutions.filter(s => s.category === 'sustainability') },
        { category: { id: 'identity', name: t('portfolioPage.identityLegal'), icon: '🔐' }, solutions: filteredSolutions.filter(s => s.category === 'identity') },
        { category: { id: 'education', name: t('portfolioPage.educationGrowth'), icon: '📚' }, solutions: filteredSolutions.filter(s => s.category === 'education') },
        { category: { id: 'health', name: t('portfolioPage.healthWellness'), icon: '❤️' }, solutions: filteredSolutions.filter(s => s.category === 'health') },
        { category: { id: 'travel', name: t('portfolioPage.travelDiscovery'), icon: '✈️' }, solutions: filteredSolutions.filter(s => s.category === 'travel') },
      ].filter(group => group.solutions.length > 0)
    : null;

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1>{t('portfolioPage.title')}</h1>
          <p className={styles.heroDescription}>
            {t('portfolioPage.subtitle')}
          </p>
        </div>
      </section>
      
      <section className={styles.statusSection}>
        <div className={styles.container}>
          <h2 className={styles.statusTitle}>🚀 {t('portfolioPage.statusTitle')}</h2>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>✅</div>
              <h3>{t('portfolioPage.currentAppsTitle')}</h3>
              <p>{t('portfolioPage.currentAppsDesc')}</p>
              <div className={styles.statusApps}>
                <span>Hub</span>
                <span>JustSplit</span>
                <span>Website</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🔄</div>
              <h3>{t('portfolioPage.priorityDevTitle')}</h3>
              <p>{t('portfolioPage.priorityDevDesc')}</p>
              <div className={styles.statusApps}>
                <span>Somos</span>
                <span>Demos</span>
                <span>Plantopia</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🌟</div>
              <h3>{t('portfolioPage.futureEcosystemTitle')}</h3>
              <p>{t('portfolioPage.futureEcosystemDesc')}</p>
              <div className={styles.statusApps}>
                <span>{t('portfolioPage.financeArea')}</span>
                <span>{t('portfolioPage.communityArea')}</span>
                <span>{t('portfolioPage.sustainabilityArea')}</span>
                <span>{t('portfolioPage.educationArea')}</span>
                <span>{t('portfolioPage.healthArea')}</span>
                <span>{t('portfolioPage.identityArea')}</span>
                <span>{t('portfolioPage.travelArea')}</span>
                <span>{t('portfolioPage.techArea')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
            <div className={styles.filterSection}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Category</h3>
                <div className={styles.categoryTabs}>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`${styles.categoryTab} ${selectedCategory === category.id ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      <span className={styles.categoryName}>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Development Status</h3>
                <div className={styles.statusTabs}>
                  {statusFilters.map(status => (
                    <button
                      key={status.id}
                      className={`${styles.statusTab} ${selectedStatus === status.id ? styles.active : ''}`}
                      onClick={() => setSelectedStatus(status.id)}
                    >
                      <span className={styles.statusIcon}>{status.icon}</span>
                      <span className={styles.statusName}>{status.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedCategory === 'all' && groupedSolutions ? (
              <div className={styles.groupedContainer}>
                {groupedSolutions.map(group => (
                  <div key={group.category.id} id={group.category.id} className={styles.categoryGroup}>
                    <h2 className={styles.categoryTitle}>
                      <span className={styles.categoryIcon}>{group.category.icon}</span>
                      {group.category.name}
                    </h2>
                    <div className={styles.projectGrid}>
                      {group.solutions.map(solution => (
                        <SolutionCard key={solution.id} solution={solution} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.projectGrid}>
                {filteredSolutions.map(solution => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))}
              </div>
            )}
          </div>
        </section>
    </>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const { t } = useLanguage();
  const phaseInfo = getPhaseInfo(t);
  const phase = phaseInfo[solution.phase as keyof typeof phaseInfo];
  
  return (
    <div id={solution.id} className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        {solution.image ? (
          <img 
            src={solution.image} 
            alt={solution.title}
            className={styles.projectImage}
          />
        ) : (
          <div 
            className={styles.projectPlaceholder}
            style={{ backgroundColor: solution.color }}
          >
            <span className={styles.placeholderText}>{t('portfolioPage.comingSoon')}</span>
          </div>
        )}
        <div 
          className={styles.phaseBadge}
          style={{ backgroundColor: phase.color }}
        >
          {phase.label}
        </div>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{solution.title}</h3>
        <p className={styles.projectDescription}>{solution.description}</p>
        {solution.url && (
          <a 
            href={solution.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            {t('portfolioPage.viewSolution')} →
          </a>
        )}
      </div>
    </div>
  );
}