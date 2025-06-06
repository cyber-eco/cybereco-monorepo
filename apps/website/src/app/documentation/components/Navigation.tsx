'use client';

import styles from '../page.module.css';
import { useLanguage } from '@cybereco/ui-components';
import { FaChevronRight } from 'react-icons/fa';

interface NavigationProps {
  activeDoc: string;
  setActiveDoc: (doc: string) => void;
  searchQuery: string;
  filteredDocs: string[];
}

export function Navigation({ activeDoc, setActiveDoc, searchQuery, filteredDocs }: NavigationProps) {
  const { t } = useLanguage();

  const docTitles: {[key: string]: string} = {
    'getting-started': t('documentationPage.introductionNavItem') || 'Introduction',
    'key-concepts': t('documentationPage.keyConceptsTitle'),
    'philosophy': t('documentationPage.philosophyDocTitle'),
    'vision': t('documentationPage.visionDocTitle'),
    'roadmap': t('documentationPage.roadmapDocTitle'),
    'portfolio': t('documentationPage.portfolioDocTitle'),
    'community-governance': t('documentationPage.communityGovernanceNavItem') || 'Community & Governance',
    'finance-economy': t('documentationPage.financeEconomyNavItem') || 'Finance & Economy',
    'sustainability-home': t('documentationPage.sustainabilityHomeNavItem') || 'Sustainability & Home',
    'education-growth': t('documentationPage.educationGrowthNavItem') || 'Education & Growth',
    'api-reference': t('documentationPage.apiReferenceNavItem') || 'API Reference',
    'user-guides': t('documentationPage.userGuidesNavItem') || 'User Guides',
    'faq': t('documentationPage.faqNavItem') || 'FAQ',
    'troubleshooting': t('documentationPage.troubleshootingNavItem') || 'Troubleshooting',
    'community': t('documentationPage.communityNavItem') || 'Community & Support',
    'development-setup': t('documentationPage.developmentNavItem') || 'Development Setup',
    'architecture': t('documentationPage.architectureNavItem') || 'System Architecture',
    'hub-gateway': t('documentationPage.hubGatewayNavItem') || 'Hub Gateway & Proxy'
  };

  return (
    <nav className={styles.sidebarNav}>
      {searchQuery && filteredDocs.length > 0 && (
        <div className={`${styles.navSection} ${styles.searchSection}`}>
          <h3 className={`${styles.navTitle} ${styles.searchTitle}`}>🔍 Search Results ({filteredDocs.length})</h3>
          {filteredDocs.map(docKey => (
            <button 
              key={docKey}
              onClick={() => setActiveDoc(docKey)}
              className={`${styles.navItem} ${styles.searchResult} ${activeDoc === docKey ? styles.active : ''}`}
            >
              {docTitles[docKey]}
              <FaChevronRight size={10} />
            </button>
          ))}
        </div>
      )}
      
      {searchQuery && filteredDocs.length === 0 && (
        <div className={styles.navSection}>
          <div className={styles.noResults}>
            <p>No results found for "{searchQuery}"</p>
          </div>
        </div>
      )}
      
      {!searchQuery && (
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>{t('documentationPage.gettingStartedNavTitle') || 'Getting Started'}</h3>
          <button 
            onClick={() => setActiveDoc('getting-started')}
            className={`${styles.navItem} ${activeDoc === 'getting-started' ? styles.active : ''}`}
          >
            {t('documentationPage.introductionNavItem') || 'Introduction'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('key-concepts')}
            className={`${styles.navItem} ${activeDoc === 'key-concepts' ? styles.active : ''}`}
          >
            {t('documentationPage.keyConceptsTitle')}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('development-setup')}
            className={`${styles.navItem} ${activeDoc === 'development-setup' ? styles.active : ''}`}
          >
            💻 {t('documentationPage.developmentNavItem') || 'Development Setup'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('architecture')}
            className={`${styles.navItem} ${activeDoc === 'architecture' ? styles.active : ''}`}
          >
            🏗️ {t('documentationPage.architectureNavItem') || 'System Architecture'}
            <FaChevronRight size={10} />
          </button>
        </div>
      )}
      
      {!searchQuery && (
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>{t('documentationPage.coreDocumentationTitle')}</h3>
          <button 
            onClick={() => setActiveDoc('philosophy')}
            className={`${styles.navItem} ${activeDoc === 'philosophy' ? styles.active : ''}`}
          >
            📖 {t('documentationPage.philosophyDocTitle')}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('vision')}
            className={`${styles.navItem} ${activeDoc === 'vision' ? styles.active : ''}`}
          >
            🔮 {t('documentationPage.visionDocTitle')}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('roadmap')}
            className={`${styles.navItem} ${activeDoc === 'roadmap' ? styles.active : ''}`}
          >
            🛠️ {t('documentationPage.roadmapDocTitle')}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('portfolio')}
            className={`${styles.navItem} ${activeDoc === 'portfolio' ? styles.active : ''}`}
          >
            🚀 {t('documentationPage.portfolioDocTitle')}
            <FaChevronRight size={10} />
          </button>
        </div>
      )}
      
      {!searchQuery && (
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>{t('documentationPage.applicationsNavTitle') || 'Solution Categories'}</h3>
          <button 
            onClick={() => setActiveDoc('community-governance')}
            className={`${styles.navItem} ${activeDoc === 'community-governance' ? styles.active : ''}`}
          >
            {t('documentationPage.communityGovernanceNavItem') || 'Community & Governance'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('finance-economy')}
            className={`${styles.navItem} ${activeDoc === 'finance-economy' ? styles.active : ''}`}
          >
            {t('documentationPage.financeEconomyNavItem') || 'Finance & Economy'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('sustainability-home')}
            className={`${styles.navItem} ${activeDoc === 'sustainability-home' ? styles.active : ''}`}
          >
            {t('documentationPage.sustainabilityHomeNavItem') || 'Sustainability & Home'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('education-growth')}
            className={`${styles.navItem} ${activeDoc === 'education-growth' ? styles.active : ''}`}
          >
            {t('documentationPage.educationGrowthNavItem') || 'Education & Growth'}
            <FaChevronRight size={10} />
          </button>
        </div>
      )}
      
      {!searchQuery && (
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>{t('documentationPage.userResourcesNavTitle') || 'User Resources'}</h3>
          <button 
            onClick={() => setActiveDoc('user-guides')}
            className={`${styles.navItem} ${activeDoc === 'user-guides' ? styles.active : ''}`}
          >
            📚 {t('documentationPage.userGuidesNavItem') || 'User Guides'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('faq')}
            className={`${styles.navItem} ${activeDoc === 'faq' ? styles.active : ''}`}
          >
            ❓ {t('documentationPage.faqNavItem') || 'FAQ'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('troubleshooting')}
            className={`${styles.navItem} ${activeDoc === 'troubleshooting' ? styles.active : ''}`}
          >
            🛠️ {t('documentationPage.troubleshootingNavItem') || 'Troubleshooting'}
            <FaChevronRight size={10} />
          </button>
          <button 
            onClick={() => setActiveDoc('community')}
            className={`${styles.navItem} ${activeDoc === 'community' ? styles.active : ''}`}
          >
            🤝 {t('documentationPage.communityNavItem') || 'Community & Support'}
            <FaChevronRight size={10} />
          </button>
        </div>
      )}
      
      {!searchQuery && (
        <div className={styles.navSection}>
          <h3 className={styles.navTitle}>{t('documentationPage.developerNavTitle') || 'Developer'}</h3>
          <button 
            onClick={() => setActiveDoc('api-reference')}
            className={`${styles.navItem} ${activeDoc === 'api-reference' ? styles.active : ''}`}
          >
            {t('documentationPage.apiReferenceNavItem') || 'API Reference'}
            <FaChevronRight size={10} />
          </button>
          <a 
            href="/documentation/jwt-authentication"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            🔐 {t('documentationPage.jwtAuthNavItem') || 'JWT Authentication'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/sso-integration"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            🔗 {t('documentationPage.ssoIntegrationNavItem') || 'SSO Integration'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/auth-logging"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            📊 {t('documentationPage.authLoggingNavItem') || 'Auth Logging'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/authentication"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            {t('documentationPage.authenticationNavItem') || 'Authentication Integration'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/data-architecture"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            {t('documentationPage.dataArchitectureNavItem') || 'Data Layer Architecture'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/hub-gateway"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            {t('documentationPage.hubGatewayNavItem') || 'Hub Gateway & Proxy'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/privacy-controls"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            🛡️ {t('documentationPage.privacyControlsNavItem') || 'Privacy Controls & GDPR'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/two-factor-auth"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            🔒 {t('documentationPage.twoFactorAuthNavItem') || 'Two-Factor Authentication'}
            <FaChevronRight size={10} />
          </a>
          <a 
            href="/documentation/data-export"
            className={styles.navItem}
            style={{ textDecoration: 'none' }}
          >
            💾 {t('documentationPage.dataExportNavItem') || 'Data Export & Portability'}
            <FaChevronRight size={10} />
          </a>
        </div>
      )}
    </nav>
  );
}