'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@cybereco/i18n';
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
  { id: 'hub', title: t('portfolio:portfolioPage.applications.hub.name'), description: t('portfolio:portfolioPage.applications.hub.description'), color: '#006241', url: 'https://hub.cybere.co', category: 'tech', phase: 'current' },
  { id: 'justsplit', title: t('portfolio:portfolioPage.applications.justsplit.name'), description: t('portfolio:portfolioPage.applications.justsplit.description'), color: '#006241', image: '/portfolio/justsplit.png', url: 'https://justsplit.cybere.co', category: 'finance', phase: 'current' },
  { id: 'website', title: t('portfolio:portfolioPage.applications.website.name'), description: t('portfolio:portfolioPage.applications.website.description'), color: '#006241', url: '/', category: 'tech', phase: 'current' },
  
  // PRIORITY APPLICATIONS (Next Wave 2025-2026) - Now properly categorized
  { id: 'somos', title: t('portfolio:portfolioPage.applications.somos.name'), description: t('portfolio:portfolioPage.applications.somos.description'), color: '#8B4513', category: 'identity', phase: 'priority' },
  { id: 'demos', title: t('portfolio:portfolioPage.applications.demos.name'), description: t('portfolio:portfolioPage.applications.demos.description'), color: '#4A5568', category: 'community', phase: 'priority' },
  { id: 'plantopia', title: t('portfolio:portfolioPage.applications.plantopia.name'), description: t('portfolio:portfolioPage.applications.plantopia.description'), color: '#48BB78', category: 'sustainability', phase: 'priority' },
  { id: 'marketplace', title: t('portfolio:portfolioPage.applications.marketplace.name'), description: t('portfolio:portfolioPage.applications.marketplace.description'), color: '#E91E63', category: 'finance', phase: 'priority' },
  
  // FUTURE ECOSYSTEM - Finance & Economy
  { id: 'mywealth', title: t('portfolio:portfolioPage.applications.mywealth.name'), description: t('portfolio:portfolioPage.applications.mywealth.description'), color: '#F57C00', category: 'finance', phase: 'future' },
  { id: 'mybusiness', title: t('portfolio:portfolioPage.applications.mybusiness.name'), description: t('portfolio:portfolioPage.applications.mybusiness.description'), color: '#303F9F', category: 'finance', phase: 'future' },
  { id: 'crowdfund', title: t('portfolio:portfolioPage.applications.crowdfund.name'), description: t('portfolio:portfolioPage.applications.crowdfund.description'), color: '#00796B', category: 'finance', phase: 'future' },
  { id: 'offerme', title: t('portfolio:portfolioPage.applications.offerme.name'), description: t('portfolio:portfolioPage.applications.offerme.description'), color: '#C2185B', category: 'finance', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Community & Governance
  { id: 'community-manager', title: t('portfolio:portfolioPage.applications.communitymanager.name'), description: t('portfolio:portfolioPage.applications.communitymanager.description'), color: '#8E24AA', category: 'community', phase: 'future' },
  { id: 'mycommunity', title: t('portfolio:portfolioPage.applications.mycommunity.name'), description: t('portfolio:portfolioPage.applications.mycommunity.description'), color: '#757575', category: 'community', phase: 'future' },
  { id: 'conciliation', title: t('portfolio:portfolioPage.applications.conciliation.name'), description: t('portfolio:portfolioPage.applications.conciliation.description'), color: '#388E3C', category: 'community', phase: 'future' },
  { id: 'crowdpool', title: t('portfolio:portfolioPage.applications.crowdpool.name'), description: t('portfolio:portfolioPage.applications.crowdpool.description'), color: '#0288D1', category: 'community', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Sustainability & Home
  { id: 'ecotul', title: t('portfolio:portfolioPage.applications.ecotul.name'), description: t('portfolio:portfolioPage.applications.ecotul.description'), color: '#689F38', category: 'sustainability', phase: 'future' },
  { id: 'myhome', title: t('portfolio:portfolioPage.applications.myhome.name'), description: t('portfolio:portfolioPage.applications.myhome.description'), color: '#795548', category: 'sustainability', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Education & Growth
  { id: 'education-hub', title: t('portfolio:portfolioPage.applications.educationhub.name'), description: t('portfolio:portfolioPage.applications.educationhub.description'), color: '#FFA000', category: 'education', phase: 'future' },
  { id: 'skill-share', title: t('portfolio:portfolioPage.applications.skillshare.name'), description: t('portfolio:portfolioPage.applications.skillshare.description'), color: '#5E35B1', category: 'education', phase: 'future' },
  { id: 'habits', title: t('portfolio:portfolioPage.applications.habits.name'), description: t('portfolio:portfolioPage.applications.habits.description'), color: '#43A047', category: 'education', phase: 'future' },
  { id: 'one-step', title: t('portfolio:portfolioPage.applications.onestep.name'), description: t('portfolio:portfolioPage.applications.onestep.description'), color: '#00ACC1', category: 'education', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Health & Wellness
  { id: 'healthy', title: t('portfolio:portfolioPage.applications.healthy.name'), description: t('portfolio:portfolioPage.applications.healthy.description'), color: '#D32F2F', category: 'health', phase: 'future' },
  { id: 'petpal', title: t('portfolio:portfolioPage.applications.petpal.name'), description: t('portfolio:portfolioPage.applications.petpal.description'), color: '#F4511E', category: 'health', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Identity & Legal
  { id: 'lawpal', title: t('portfolio:portfolioPage.applications.lawpal.name'), description: t('portfolio:portfolioPage.applications.lawpal.description'), color: '#616161', category: 'identity', phase: 'future' },
  { id: 'mydata', title: t('portfolio:portfolioPage.applications.mydata.name'), description: t('portfolio:portfolioPage.applications.mydata.description'), color: '#455A64', category: 'identity', phase: 'future' },
  { id: 'digitalme', title: t('portfolio:portfolioPage.applications.digitalme.name'), description: t('portfolio:portfolioPage.applications.digitalme.description'), color: '#0097A7', category: 'identity', phase: 'future' },
  { id: 'mydocs', title: t('portfolio:portfolioPage.applications.mydocs.name'), description: t('portfolio:portfolioPage.applications.mydocs.description'), color: '#7B1FA2', category: 'identity', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Travel & Discovery
  { id: 'travelmate', title: t('portfolio:portfolioPage.applications.travelmate.name'), description: t('portfolio:portfolioPage.applications.travelmate.description'), color: '#039BE5', category: 'travel', phase: 'future' },
  { id: 'eventconnect', title: t('portfolio:portfolioPage.applications.eventconnect.name'), description: t('portfolio:portfolioPage.applications.eventconnect.description'), color: '#FB8C00', category: 'travel', phase: 'future' },
  { id: 'localwonders', title: t('portfolio:portfolioPage.applications.localwonders.name'), description: t('portfolio:portfolioPage.applications.localwonders.description'), color: '#795548', category: 'travel', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Tech & Social
  { id: 'nexus', title: t('portfolio:portfolioPage.applications.nexus.name'), description: t('portfolio:portfolioPage.applications.nexus.description'), color: '#E91E63', category: 'tech', phase: 'future' },
  { id: 'timesync', title: t('portfolio:portfolioPage.applications.timesync.name'), description: t('portfolio:portfolioPage.applications.timesync.description'), color: '#607D8B', category: 'tech', phase: 'future' },
];

const getCategories = (t: (key: string) => string) => [
  { id: 'all', name: t('portfolio:portfolioPage.categories.all.title'), icon: '🎯' },
  { id: 'finance', name: t('portfolio:portfolioPage.categories.finance.title'), icon: '💰' },
  { id: 'community', name: t('portfolio:portfolioPage.categories.community.title'), icon: '🏛️' },
  { id: 'sustainability', name: t('portfolio:portfolioPage.categories.sustainability.title'), icon: '🌱' },
  { id: 'education', name: t('portfolio:portfolioPage.categories.education.title'), icon: '📚' },
  { id: 'health', name: t('portfolio:portfolioPage.categories.health.title'), icon: '❤️' },
  { id: 'identity', name: t('portfolio:portfolioPage.categories.identity.title'), icon: '🔐' },
  { id: 'travel', name: t('portfolio:portfolioPage.categories.travel.title'), icon: '✈️' },
  { id: 'tech', name: t('portfolio:portfolioPage.categories.tech.title'), icon: '💻' },
];

const getStatusFilters = (t: (key: string) => string) => [
  { id: 'all', name: t('portfolio:portfolioPage.statusFilters.all'), icon: '📊' },
  { id: 'live', name: t('portfolio:portfolioPage.statusFilters.live'), icon: '✅' },
  { id: 'development', name: t('portfolio:portfolioPage.statusFilters.development'), icon: '🔄' },
  { id: 'planned', name: t('portfolio:portfolioPage.statusFilters.planned'), icon: '🌟' },
];

const getPhaseInfo = (t: (key: string) => string) => ({
  current: { label: t('portfolio:portfolioPage.stats.current'), color: '#006241' },
  priority: { label: t('portfolio:portfolioPage.stats.priority'), color: '#F57C00' },
  future: { label: t('portfolio:portfolioPage.stats.planned'), color: '#1976D2' },
});

export default function PortfolioPage() {
  const { t } = useI18n();
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
        { category: { id: 'finance', name: t('portfolio:portfolioPage.categories.finance.title'), icon: '💰' }, solutions: filteredSolutions.filter(s => s.category === 'finance') },
        { category: { id: 'community', name: t('portfolio:portfolioPage.categories.community.title'), icon: '🏛️' }, solutions: filteredSolutions.filter(s => s.category === 'community') },
        { category: { id: 'tech', name: t('portfolio:portfolioPage.categories.tech.title'), icon: '💻' }, solutions: filteredSolutions.filter(s => s.category === 'tech') },
        { category: { id: 'sustainability', name: t('portfolio:portfolioPage.categories.sustainability.title'), icon: '🌱' }, solutions: filteredSolutions.filter(s => s.category === 'sustainability') },
        { category: { id: 'identity', name: t('portfolio:portfolioPage.categories.identity.title'), icon: '🔐' }, solutions: filteredSolutions.filter(s => s.category === 'identity') },
        { category: { id: 'education', name: t('portfolio:portfolioPage.categories.education.title'), icon: '📚' }, solutions: filteredSolutions.filter(s => s.category === 'education') },
        { category: { id: 'health', name: t('portfolio:portfolioPage.categories.health.title'), icon: '❤️' }, solutions: filteredSolutions.filter(s => s.category === 'health') },
        { category: { id: 'travel', name: t('portfolio:portfolioPage.categories.travel.title'), icon: '✈️' }, solutions: filteredSolutions.filter(s => s.category === 'travel') },
      ].filter(group => group.solutions.length > 0)
    : null;

  return (
    <div className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1>{t('portfolio:portfolioPage.title')}</h1>
          <p className={styles.heroDescription}>
            {t('portfolio:portfolioPage.subtitle')}
          </p>
        </div>
      </section>
      
      <section className={styles.statusSection}>
        <div className={styles.container}>
          <h2 className={styles.statusTitle}>{t('portfolio:portfolioPage.developmentRoadmap.title')}</h2>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>✅</div>
              <h3>{t('portfolio:portfolioPage.developmentRoadmap.current.title')}</h3>
              <p>{t('portfolio:portfolioPage.developmentRoadmap.current.description')}</p>
              <div className={styles.statusApps}>
                <span>{t('portfolio:portfolioPage.applications.hub.name')}</span>
                <span>{t('portfolio:portfolioPage.applications.justsplit.name')}</span>
                <span>{t('portfolio:portfolioPage.applications.website.name')}</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🔄</div>
              <h3>{t('portfolio:portfolioPage.developmentRoadmap.priority.title')}</h3>
              <p>{t('portfolio:portfolioPage.developmentRoadmap.priority.description')}</p>
              <div className={styles.statusApps}>
                <span>{t('portfolio:portfolioPage.applications.somos.name')}</span>
                <span>{t('portfolio:portfolioPage.applications.demos.name')}</span>
                <span>{t('portfolio:portfolioPage.applications.plantopia.name')}</span>
                <span>{t('portfolio:portfolioPage.applications.marketplace.name')}</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🌟</div>
              <h3>{t('portfolio:portfolioPage.developmentRoadmap.future.title')}</h3>
              <p>{t('portfolio:portfolioPage.developmentRoadmap.future.description')}</p>
              <div className={styles.statusApps}>
                <span>{t('portfolio:portfolioPage.categories.finance.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.community.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.sustainability.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.education.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.health.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.identity.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.travel.title')}</span>
                <span>{t('portfolio:portfolioPage.categories.tech.title')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
            <div className={styles.filterSection}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>{t('portfolio:portfolioPage.filterSection.categoryTitle')}</h3>
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
                <h3 className={styles.filterTitle}>{t('portfolio:portfolioPage.filterSection.statusTitle')}</h3>
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
    </div>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const { t } = useI18n();
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
            <span className={styles.placeholderText}>{t('portfolio:portfolioPage.cta.comingSoon')}</span>
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
            {t('portfolio:portfolioPage.cta.learnMore')} →
          </a>
        )}
      </div>
    </div>
  );
}