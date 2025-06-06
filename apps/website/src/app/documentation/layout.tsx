'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaBook, FaSearch, FaChevronRight, FaShieldAlt, FaKey, 
  FaUserShield, FaDatabase, FaFileExport, FaServer, FaCode,
  FaLock, FaUsers, FaMobileAlt
} from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactElement;
  path: string;
  description: string;
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { t } = useI18n();

  const docSections: DocSection[] = [
    {
      id: 'overview',
      title: t('documentation:documentationPage.title') || 'Documentation Overview',
      icon: <FaBook />,
      path: '/documentation',
      description: t('documentation:documentationPage.subtitle') || 'Getting started and key concepts'
    },
    {
      id: 'authentication',
      title: t('documentation:documentationPage.authenticationNavItem') || 'Authentication',
      icon: <FaKey />,
      path: '/documentation/authentication',
      description: t('documentation:documentationPage.authenticationNavItem') || 'Authentication system and SSO'
    },
    {
      id: 'jwt-authentication',
      title: t('documentation:documentationPage.jwt.title') || 'JWT Authentication',
      icon: <FaLock />,
      path: '/documentation/jwt-authentication',
      description: t('documentation:documentationPage.jwtAuthNavItem') || 'Token-based authentication'
    },
    {
      id: 'sso-integration',
      title: t('documentation:documentationPage.sso.title') || 'SSO Integration',
      icon: <FaUsers />,
      path: '/documentation/sso-integration',
      description: t('documentation:documentationPage.ssoIntegrationNavItem') || 'Single Sign-On implementation'
    },
    {
      id: 'two-factor-auth',
      title: t('documentation:documentationPage.twoFactor.title') || 'Two-Factor Authentication',
      icon: <FaMobileAlt />,
      path: '/documentation/two-factor-auth',
      description: t('documentation:documentationPage.twoFactor.description') || '2FA setup and configuration'
    },
    {
      id: 'privacy-controls',
      title: t('documentation:documentationPage.privacy.title') || 'Privacy Controls',
      icon: <FaShieldAlt />,
      path: '/documentation/privacy-controls',
      description: t('documentation:documentationPage.privacy.description') || 'GDPR compliance and privacy'
    },
    {
      id: 'data-export',
      title: t('documentation:documentationPage.dataExport.title') || 'Data Export',
      icon: <FaFileExport />,
      path: '/documentation/data-export',
      description: t('documentation:documentationPage.dataExport.description') || 'Export and portability features'
    },
    {
      id: 'auth-logging',
      title: t('documentation:documentationPage.authLogging.title') || 'Auth Logging & Monitoring',
      icon: <FaDatabase />,
      path: '/documentation/auth-logging',
      description: t('documentation:documentationPage.authLoggingNavItem') || 'Security audit and monitoring'
    },
    {
      id: 'data-architecture',
      title: t('documentation:documentationPage.dataArchitectureNavItem') || 'Data Architecture',
      icon: <FaServer />,
      path: '/documentation/data-architecture',
      description: t('documentation:documentationPage.dataArchitectureNavItem') || 'Platform data structure'
    },
    {
      id: 'hub-gateway',
      title: t('documentation:documentationPage.hubGatewayNavItem') || 'Hub Gateway',
      icon: <FaCode />,
      path: '/documentation/hub-gateway',
      description: t('documentation:documentationPage.hubGatewayNavItem') || 'Gateway architecture'
    }
  ];

  const currentSection = docSections.find(section => section.path === pathname);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredSections = docSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.documentationLayout}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>{t('documentation:documentationPage.title') || 'Documentation'}</h2>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder={t('documentation:documentationPage.search') || 'Search docs...'}
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {filteredSections.map((section) => {
              const isActive = pathname === section.path;
              return (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <div className={styles.navItemIcon}>{section.icon}</div>
                  <div className={styles.navItemContent}>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                  {isActive && <FaChevronRight className={styles.navItemArrow} />}
                </Link>
              );
            })}
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
            {currentSection && (
              <div className={styles.pageHeader}>
                <div className={styles.breadcrumb}>
                  <Link href="/documentation">
                    {t('documentation:documentationPage.title') || 'Documentation'}
                  </Link>
                  <FaChevronRight />
                  <span>{currentSection.title}</span>
                </div>
              </div>
            )}
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}