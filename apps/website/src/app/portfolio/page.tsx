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
  { id: 'crowdfund', title: 'CrowdFund', description: 'Community-driven funding platform', color: '#00796B', category: 'finance', phase: 'future' },
  { id: 'offerme', title: 'OfferMe', description: 'Local services marketplace', color: '#C2185B', category: 'finance', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Community & Governance
  { id: 'community-manager', title: 'Community Manager', description: 'Community organization tools', color: '#8E24AA', category: 'community', phase: 'future' },
  { id: 'mycommunity', title: 'MyCommunity', description: 'Local community networking', color: '#757575', category: 'community', phase: 'future' },
  { id: 'conciliation', title: 'Conciliation', description: 'Dispute resolution platform', color: '#388E3C', category: 'community', phase: 'future' },
  { id: 'crowdpool', title: 'CrowdPool', description: 'Resource sharing network', color: '#0288D1', category: 'community', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Sustainability & Home
  { id: 'ecotul', title: 'EcoTul', description: 'Eco-friendly lifestyle tracker', color: '#689F38', category: 'sustainability', phase: 'future' },
  { id: 'myhome', title: t('portfolio:portfolioPage.applications.myhome.name'), description: t('portfolio:portfolioPage.applications.myhome.description'), color: '#795548', category: 'sustainability', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Education & Growth
  { id: 'education-hub', title: t('portfolio:portfolioPage.applications.educationhub.name'), description: t('portfolio:portfolioPage.applications.educationhub.description'), color: '#FFA000', category: 'education', phase: 'future' },
  { id: 'skill-share', title: t('portfolio:portfolioPage.applications.skillshare.name'), description: t('portfolio:portfolioPage.applications.skillshare.description'), color: '#5E35B1', category: 'education', phase: 'future' },
  { id: 'habits', title: t('portfolio:portfolioPage.applications.habits.name'), description: t('portfolio:portfolioPage.applications.habits.description'), color: '#43A047', category: 'education', phase: 'future' },
  { id: 'one-step', title: 'OneStep', description: 'Daily micro-learning platform', color: '#00ACC1', category: 'education', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Health & Wellness
  { id: 'healthy', title: 'Healthy', description: 'Personal wellness tracker', color: '#D32F2F', category: 'health', phase: 'future' },
  { id: 'petpal', title: 'PetPal', description: 'Pet care management', color: '#F4511E', category: 'health', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Identity & Legal
  { id: 'lawpal', title: 'LawPal', description: 'Legal assistance platform', color: '#616161', category: 'identity', phase: 'future' },
  { id: 'mydata', title: 'MyData', description: 'Personal data vault', color: '#455A64', category: 'identity', phase: 'future' },
  { id: 'digitalme', title: 'DigitalMe', description: 'Digital identity management', color: '#0097A7', category: 'identity', phase: 'future' },
  { id: 'mydocs', title: 'MyDocs', description: 'Document management system', color: '#7B1FA2', category: 'identity', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Travel & Discovery
  { id: 'travelmate', title: 'TravelMate', description: 'Travel planning companion', color: '#039BE5', category: 'travel', phase: 'future' },
  { id: 'eventconnect', title: 'EventConnect', description: 'Local event discovery', color: '#FB8C00', category: 'travel', phase: 'future' },
  { id: 'localwonders', title: 'LocalWonders', description: 'Hidden gems explorer', color: '#795548', category: 'travel', phase: 'future' },
  
  // FUTURE ECOSYSTEM - Tech & Social
  { id: 'nexus', title: 'Nexus', description: 'Social networking hub', color: '#E91E63', category: 'tech', phase: 'future' },
  { id: 'timesync', title: 'TimeSync', description: 'Time management tool', color: '#607D8B', category: 'tech', phase: 'future' },
];

const getCategories = (t: (key: string) => string) => [
  { id: 'all', name: 'All Solutions', icon: '🎯' },
  { id: 'finance', name: t('portfolio:portfolioPage.categories.finance.title'), icon: '💰' },
  { id: 'community', name: t('portfolio:portfolioPage.categories.community.title'), icon: '🏛️' },
  { id: 'sustainability', name: t('portfolio:portfolioPage.categories.sustainability.title'), icon: '🌱' },
  { id: 'education', name: t('portfolio:portfolioPage.categories.education.title'), icon: '📚' },
  { id: 'health', name: t('portfolio:portfolioPage.categories.health.title'), icon: '❤️' },
  { id: 'identity', name: 'Identity & Legal', icon: '🔐' },
  { id: 'travel', name: 'Travel & Discovery', icon: '✈️' },
  { id: 'tech', name: 'Tech & Social', icon: '💻' },
];

const getStatusFilters = (t: (key: string) => string) => [
  { id: 'all', name: 'All Statuses', icon: '📊' },
  { id: 'live', name: 'Live', icon: '✅' },
  { id: 'development', name: 'In Development', icon: '🔄' },
  { id: 'planned', name: 'Planned', icon: '🌟' },
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
        { category: { id: 'tech', name: 'Tech & Social', icon: '💻' }, solutions: filteredSolutions.filter(s => s.category === 'tech') },
        { category: { id: 'sustainability', name: t('portfolio:portfolioPage.categories.sustainability.title'), icon: '🌱' }, solutions: filteredSolutions.filter(s => s.category === 'sustainability') },
        { category: { id: 'identity', name: 'Identity & Legal', icon: '🔐' }, solutions: filteredSolutions.filter(s => s.category === 'identity') },
        { category: { id: 'education', name: t('portfolio:portfolioPage.categories.education.title'), icon: '📚' }, solutions: filteredSolutions.filter(s => s.category === 'education') },
        { category: { id: 'health', name: t('portfolio:portfolioPage.categories.health.title'), icon: '❤️' }, solutions: filteredSolutions.filter(s => s.category === 'health') },
        { category: { id: 'travel', name: 'Travel & Discovery', icon: '✈️' }, solutions: filteredSolutions.filter(s => s.category === 'travel') },
      ].filter(group => group.solutions.length > 0)
    : null;

  return (
    <>
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
          <h2 className={styles.statusTitle}>🚀 Development Roadmap</h2>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>✅</div>
              <h3>Current Applications</h3>
              <p>Ready to use today</p>
              <div className={styles.statusApps}>
                <span>Hub</span>
                <span>JustSplit</span>
                <span>Website</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🔄</div>
              <h3>Priority Development</h3>
              <p>Coming 2025-2026</p>
              <div className={styles.statusApps}>
                <span>Somos</span>
                <span>Demos</span>
                <span>Plantopia</span>
                <span>Marketplace</span>
              </div>
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>🌟</div>
              <h3>Future Ecosystem</h3>
              <p>Planned applications</p>
              <div className={styles.statusApps}>
                <span>Finance</span>
                <span>Community</span>
                <span>Sustainability</span>
                <span>Education</span>
                <span>Health</span>
                <span>Identity</span>
                <span>Travel</span>
                <span>Tech</span>
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