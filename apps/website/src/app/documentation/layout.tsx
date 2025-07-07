'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, FaSearch, FaChevronRight, FaChevronDown, FaShieldAlt, FaKey, 
  FaUserShield, FaDatabase, FaFileExport, FaServer, FaCode,
  FaLock, FaUsers, FaMobileAlt, FaBars, FaTimes, FaRocket,
  FaChartBar, FaGraduationCap, FaQuestionCircle, FaTools, FaSync,
  FaShoppingCart, FaExchangeAlt, FaArrowUp
} from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

interface NavSection {
  id: string;
  title: string;
  icon?: React.ReactElement;
  sections?: NavItem[];
  externalLinks?: ExternalLink[];
}

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactElement;
}

interface ExternalLink {
  href: string;
  label: string;
  icon?: string;
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['nav-getting-started']);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  // Add keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('documentation-search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      
      // Arrow keys for navigation when sidebar is focused
      const sidebar = document.querySelector(`.${styles.sidebar}`);
      if (sidebar && sidebar.contains(document.activeElement)) {
        const currentLink = document.activeElement as HTMLElement;
        const allLinks = Array.from(sidebar.querySelectorAll(`.${styles.navItem}`));
        const currentIndex = allLinks.indexOf(currentLink);
        
        if (e.key === 'ArrowDown' && currentIndex < allLinks.length - 1) {
          e.preventDefault();
          (allLinks[currentIndex + 1] as HTMLElement).focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          e.preventDefault();
          (allLinks[currentIndex - 1] as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll position for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      // Use window scroll instead of sidebar scroll
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Fix overflow issues on mobile
    const fixOverflow = () => {
      if (window.innerWidth <= 768) {
        // Find all containers that might have overflow
        const containers = document.querySelectorAll('div[class*="container"], div[class*="pageContainer"]');
        containers.forEach(container => {
          const computed = window.getComputedStyle(container);
          if (computed.overflowY === 'auto' || computed.overflowY === 'scroll') {
            (container as HTMLElement).style.overflow = 'visible';
            (container as HTMLElement).style.overflowY = 'visible';
            (container as HTMLElement).style.overflowX = 'visible';
          }
        });
      }
    };
    
    // Run on mount and resize
    fixOverflow();
    window.addEventListener('resize', fixOverflow);
    
    // Fallback: Check if sticky is supported and working
    const checkStickySupport = () => {
      const testEl = document.createElement('div');
      testEl.style.position = 'sticky';
      return testEl.style.position === 'sticky';
    };
    
    const sidebar = document.querySelector(`.${styles.sidebar}`);
    // If sticky is not supported or not working properly, use fixed positioning
    if (!checkStickySupport() && sidebar) {
      sidebar.style.position = 'fixed';
      sidebar.style.top = 'calc(var(--header-height, 70px) + var(--spacing-md))';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', fixOverflow);
    };
  }, []);

  // Load and save expanded sections to localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('doc-expanded-sections');
    if (saved) {
      try {
        setExpandedSections(JSON.parse(saved));
      } catch (e) {
        // Invalid JSON, use defaults
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('doc-expanded-sections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  // Ensure the section containing the active page is always expanded
  React.useEffect(() => {
    const activeSection = navStructure.find(section => 
      section.sections?.some(item => item.path === pathname)
    );
    
    if (activeSection && !expandedSections.includes(activeSection.id)) {
      setExpandedSections(prev => [...prev, activeSection.id]);
    }
  }, [pathname]);

  // Navigation structure with all sections and subpages
  const navStructure: NavSection[] = [
    {
      id: 'nav-getting-started',
      title: t('documentation:documentationPage.gettingStartedTitle') || 'GETTING STARTED',
      sections: [
        {
          id: 'introduction',
          title: t('documentation:documentationPage.introductionNavItem') || 'Introduction',
          path: '/documentation',
          icon: <FaBook />
        },
        {
          id: 'key-concepts',
          title: t('documentation:documentationPage.keyConceptsNavItem') || 'Key Concepts & Architecture',
          path: '/documentation/key-concepts',
          icon: <FaRocket />
        },
        {
          id: 'development',
          title: t('documentation:documentationPage.developmentNavItem') || 'Development Setup',
          path: '/documentation/development',
          icon: <FaCode />
        },
        {
          id: 'architecture',
          title: t('documentation:documentationPage.architectureNavItem') || 'System Architecture',
          path: '/documentation/architecture',
          icon: <FaServer />
        }
      ]
    },
    {
      id: 'nav-core-docs',
      title: t('documentation:documentationPage.centralDocumentationTitle') || 'CENTRAL DOCUMENTATION',
      sections: [
        {
          id: 'philosophy',
          title: t('documentation:documentationPage.philosophyNavItem') || 'Platform Philosophy',
          path: '/documentation/philosophy',
          icon: <FaBook />
        },
        {
          id: 'vision',
          title: t('documentation:documentationPage.visionNavItem') || 'Future Vision Decentralized',
          path: '/documentation/vision',
          icon: <FaChartBar />
        },
        {
          id: 'roadmap',
          title: t('documentation:documentationPage.roadmapNavItem') || 'Development Roadmap',
          path: '/documentation/roadmap',
          icon: <FaTools />
        },
        {
          id: 'portfolio',
          title: t('documentation:documentationPage.portfolioNavItem') || 'Solutions Portfolio',
          path: '/documentation/portfolio',
          icon: <FaRocket />
        }
      ]
    },
    {
      id: 'nav-solution-categories',
      title: t('documentation:documentationPage.solutionCategoriesTitle') || 'SOLUTION CATEGORIES',
      sections: [
        {
          id: 'solutions-overview',
          title: t('documentation:documentationPage.solutionsOverviewItem') || 'Solutions Overview',
          path: '/documentation/solutions',
          icon: <FaExchangeAlt />
        },
        {
          id: 'community-governance',
          title: t('documentation:documentationPage.communityGovernanceItem') || 'Community & Governance',
          path: '/documentation/solutions/community-governance',
          icon: <FaUsers />
        },
        {
          id: 'finance-economy',
          title: t('documentation:documentationPage.financeEconomyItem') || 'Finance & Economy',
          path: '/documentation/solutions/finance-economy',
          icon: <FaChartBar />
        },
        {
          id: 'sustainability-home',
          title: t('documentation:documentationPage.sustainabilityHomeItem') || 'Sustainability & Home',
          path: '/documentation/solutions/sustainability-home',
          icon: <FaRocket />
        },
        {
          id: 'education-growth',
          title: t('documentation:documentationPage.educationGrowthItem') || 'Education & Growth',
          path: '/documentation/solutions/education-growth',
          icon: <FaGraduationCap />
        },
        {
          id: 'marketplace-commerce',
          title: t('documentation:documentationPage.marketplaceCommerceItem') || 'Marketplace & Commerce',
          path: '/documentation/solutions/marketplace-commerce',
          icon: <FaShoppingCart />
        }
      ]
    },
    {
      id: 'nav-user-resources',
      title: t('documentation:documentationPage.userResourcesTitle') || 'USER RESOURCES',
      sections: [
        {
          id: 'user-guides',
          title: t('documentation:documentationPage.userGuidesNavItem') || 'User Guides',
          path: '/documentation/guides',
          icon: <FaBook />
        },
        {
          id: 'learning-paths',
          title: t('documentation:documentationPage.learningPathsNavItem') || 'Learning Paths',
          path: '/documentation/learning-paths',
          icon: <FaGraduationCap />
        },
        {
          id: 'faq',
          title: t('documentation:documentationPage.faqNavItem') || 'Frequently Asked Questions',
          path: '/documentation/faq',
          icon: <FaQuestionCircle />
        },
        {
          id: 'troubleshooting',
          title: t('documentation:documentationPage.troubleshootingNavItem') || 'Troubleshooting',
          path: '/documentation/troubleshooting',
          icon: <FaTools />
        },
        {
          id: 'community-support',
          title: t('documentation:documentationPage.communitySupportNavItem') || 'Community & Support',
          path: '/documentation/community',
          icon: <FaUsers />
        }
      ]
    },
    {
      id: 'nav-developer',
      title: t('documentation:documentationPage.developerTitle') || 'DEVELOPER',
      sections: [
        {
          id: 'api',
          title: t('documentation:documentationPage.apiReferenceNavItem') || 'API Reference',
          path: '/documentation/api',
          icon: <FaCode />
        },
        {
          id: 'authentication',
          title: t('documentation:documentationPage.authenticationNavItem') || 'Authentication Integration',
          path: '/documentation/authentication',
          icon: <FaKey />
        },
        {
          id: 'jwt-authentication',
          title: t('documentation:documentationPage.jwt.title') || 'JWT Authentication',
          path: '/documentation/jwt-authentication',
          icon: <FaLock />
        },
        {
          id: 'sso-integration',
          title: t('documentation:documentationPage.sso.title') || 'SSO Integration',
          path: '/documentation/sso-integration',
          icon: <FaUsers />
        },
        {
          id: 'two-factor-auth',
          title: t('documentation:documentationPage.twoFactor.title') || 'Two-Factor Authentication (2FA)',
          path: '/documentation/two-factor-auth',
          icon: <FaMobileAlt />
        },
        {
          id: 'auth-logging',
          title: t('documentation:documentationPage.authLogging.title') || 'Auth Logging & Monitoring',
          path: '/documentation/auth-logging',
          icon: <FaDatabase />
        },
        {
          id: 'data-privacy',
          title: t('documentation:documentationPage.dataPrivacyNavItem') || 'Data & Privacy',
          path: '/documentation/data-privacy',
          icon: <FaShieldAlt />
        },
        {
          id: 'privacy-controls',
          title: t('documentation:documentationPage.privacy.title') || 'Privacy Controls & GDPR',
          path: '/documentation/privacy-controls',
          icon: <FaShieldAlt />
        },
        {
          id: 'data-export',
          title: t('documentation:documentationPage.dataExport.title') || 'Data Export & Portability',
          path: '/documentation/data-export',
          icon: <FaFileExport />
        },
        {
          id: 'data-architecture',
          title: t('documentation:documentationPage.dataArchitectureNavItem') || 'Data Layer Architecture',
          path: '/documentation/data-architecture',
          icon: <FaServer />
        },
        {
          id: 'data-philosophy',
          title: t('documentation:dataPhilosophy.title') || 'Data Philosophy',
          path: '/documentation/data-philosophy',
          icon: <FaShieldAlt />
        },
        {
          id: 'data-model',
          title: t('documentation:dataModel.title') || 'Data Ownership Model',
          path: '/documentation/data-model',
          icon: <FaDatabase />
        },
        {
          id: 'data-sync',
          title: t('documentation:dataSync.title') || 'Data Synchronization',
          path: '/documentation/data-sync',
          icon: <FaSync />
        },
        {
          id: 'hub-gateway',
          title: t('documentation:documentationPage.hubGatewayNavItem') || 'Hub Gateway & Proxy',
          path: '/documentation/hub-gateway',
          icon: <FaServer />
        }
      ]
    }
  ];

  // Get all navigation items for search
  const allNavItems = navStructure.flatMap(section => 
    section.sections?.map(item => ({
      ...item,
      sectionTitle: section.title
    })) || []
  );

  // Search functionality
  const filteredItems = searchQuery
    ? allNavItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get current page title for breadcrumb
  const currentPage = allNavItems.find(item => item.path === pathname);
  const isMainPage = pathname === '/documentation';

  return (
    <div className={styles.container}>
      <div className={styles.documentationLayout}>
        {/* Mobile menu toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle documentation menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar Navigation */}
        <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2>{t('documentation:documentationPage.title') || 'Documentation'}</h2>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.searchIcon} />
              <input
                id="documentation-search-input"
                type="text"
                placeholder={t('documentation:documentationPage.search') || 'Search docs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label={t('documentation:documentationPage.searchAriaLabel') || 'Search documentation'}
              />
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {/* Search Results */}
            {searchQuery && filteredItems.length > 0 && (
              <div className={`${styles.navSection} ${styles.searchSection}`}>
                <h3 className={`${styles.navTitle} ${styles.searchTitle}`}>
                  🔍 Search Results ({filteredItems.length})
                </h3>
                {filteredItems.map(item => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`${styles.navItem} ${styles.searchResult} ${pathname === item.path ? styles.active : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                    title={item.title}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <FaChevronRight size={10} />
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {searchQuery && filteredItems.length === 0 && (
              <div className={styles.navSection}>
                <div className={styles.noResults}>
                  <p>{t('documentation:layout.noResultsFound') || 'No results found for'} "{searchQuery}"</p>
                </div>
              </div>
            )}

            {/* Navigation Sections */}
            {!searchQuery && navStructure.map(navGroup => (
              <div key={navGroup.id} className={`${styles.navSection} ${expandedSections.includes(navGroup.id) ? styles.expanded : ''}`}>
                <div
                  className={styles.navSectionHeader}
                  onClick={() => toggleSection(navGroup.id)}
                  aria-expanded={expandedSections.includes(navGroup.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.navSectionTitle}>
                    {navGroup.title}
                  </div>
                  <div className={styles.expandIcon}>
                    {expandedSections.includes(navGroup.id) ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSections.includes(navGroup.id) && (
                    <motion.ul
                      className={styles.navList}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {navGroup.sections?.map(item => (
                        <li key={item.id}>
                          <Link
                            href={item.path}
                            className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                            title={item.title}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                            <FaChevronRight size={10} />
                          </Link>
                        </li>
                      ))}

                      {navGroup.externalLinks?.map(link => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={styles.navItem}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                            <FaChevronRight size={10} />
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Breadcrumb */}
            {!isMainPage && currentPage && (
              <div className={styles.pageHeader}>
                <div className={styles.breadcrumb}>
                  <Link href="/documentation">
                    {t('documentation:documentationPage.title') || 'Documentation'}
                  </Link>
                  <FaChevronRight />
                  <span>{currentPage.title}</span>
                </div>
              </div>
            )}
            {children}
          </motion.div>
        </main>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              className={styles.backToTop}
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}