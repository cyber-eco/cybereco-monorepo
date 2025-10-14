'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { 
  FaUsers, FaChartBar, FaLeaf, FaGraduationCap, FaShoppingCart,
  FaHandshake, FaCoins, FaHome, FaBook, FaExchangeAlt
} from 'react-icons/fa';
import styles from '../page.module.css';

export default function SolutionsOverviewPage() {
  const { t } = useI18n();

  const solutionCategories = [
    {
      id: 'community-governance',
      title: t('documentation:solutionsOverview.community.title') || 'Community & Governance',
      description: t('documentation:solutionsOverview.community.description') || 'Digital tools for community building, democratic governance, and collective decision-making',
      icon: <FaUsers />,
      color: '#8B5CF6',
      path: '/documentation/solutions/community-governance',
      examples: [
        t('documentation:solutionsOverview.community.example1') || 'Demos - Transparent voting',
        t('documentation:solutionsOverview.community.example2') || 'Conciliation - Fair dispute resolution',
        t('documentation:solutionsOverview.community.example3') || 'Community forums'
      ]
    },
    {
      id: 'finance-economy',
      title: t('documentation:solutionsOverview.finance.title') || 'Finance & Economy',
      description: t('documentation:solutionsOverview.finance.description') || 'Financial management, expense sharing, and economic tools for individuals and businesses',
      icon: <FaChartBar />,
      color: '#10B981',
      path: '/documentation/solutions/finance-economy',
      examples: [
        t('documentation:solutionsOverview.finance.example1') || 'JustSplit - Expense sharing',
        t('documentation:solutionsOverview.finance.example2') || 'CyberBank - Digital banking',
        t('documentation:solutionsOverview.finance.example3') || 'MyWealth - Asset management'
      ]
    },
    {
      id: 'marketplace-commerce',
      title: t('documentation:solutionsOverview.marketplace.title') || 'Marketplace & Commerce',
      description: t('documentation:solutionsOverview.marketplace.description') || 'Decentralized peer-to-peer commerce with data sovereignty and fair trade practices',
      icon: <FaShoppingCart />,
      color: '#E91E63',
      path: '/documentation/solutions/marketplace-commerce',
      examples: [
        t('documentation:solutionsOverview.marketplace.example1') || 'Vendor-controlled catalogs',
        t('documentation:solutionsOverview.marketplace.example2') || 'Zero platform fees',
        t('documentation:solutionsOverview.marketplace.example3') || 'Fair conciliation system'
      ]
    },
    {
      id: 'sustainability-home',
      title: t('documentation:solutionsOverview.sustainability.title') || 'Sustainability & Home',
      description: t('documentation:solutionsOverview.sustainability.description') || 'Tools for sustainable living, smart home management, and environmental consciousness',
      icon: <FaLeaf />,
      color: '#22C55E',
      path: '/documentation/solutions/sustainability-home',
      examples: [
        t('documentation:solutionsOverview.sustainability.example1') || 'Plantopia - Smart gardening',
        t('documentation:solutionsOverview.sustainability.example2') || 'MyHome - Home automation',
        t('documentation:solutionsOverview.sustainability.example3') || 'EcoTul - Green marketplace'
      ]
    },
    {
      id: 'education-growth',
      title: t('documentation:solutionsOverview.education.title') || 'Education & Growth',
      description: t('documentation:solutionsOverview.education.description') || 'Learning platforms, skill development, and personal growth tools',
      icon: <FaGraduationCap />,
      color: '#F59E0B',
      path: '/documentation/solutions/education-growth',
      examples: [
        t('documentation:solutionsOverview.education.example1') || 'Education Hub - Learning platform',
        t('documentation:solutionsOverview.education.example2') || 'Skill Share - Knowledge exchange',
        t('documentation:solutionsOverview.education.example3') || 'Habits - Personal development'
      ]
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaExchangeAlt /> {t('documentation:solutionsOverview.title') || 'Solutions Overview'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutionsOverview.subtitle') || 'Comprehensive digital solutions for every aspect of modern life, built with privacy and human dignity at the core'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <p className={styles.contentText}>
          {t('documentation:solutionsOverview.intro') || 'CyberEco offers a comprehensive suite of applications organized into solution categories. Each category addresses specific life domains while maintaining seamless integration across the ecosystem.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:solutionsOverview.categoriesTitle') || 'Solution Categories'}
        </h2>
        
        <div className={styles.solutionGrid}>
          {solutionCategories.map((category) => (
            <Link 
              key={category.id} 
              href={category.path} 
              className={styles.solutionCard}
              style={{ borderTopColor: category.color }}
            >
              <div className={styles.solutionHeader}>
                <div className={styles.solutionIcon} style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className={styles.solutionTitle}>{category.title}</h3>
              </div>
              <p className={styles.solutionDescription}>
                {category.description}
              </p>
              <div className={styles.solutionExamples}>
                <h4>{t('documentation:solutionsOverview.keyApplications') || 'Key Applications:'}</h4>
                <ul>
                  {category.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.solutionLink}>
                {t('documentation:solutionsOverview.explore') || 'Explore'} →
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          {t('documentation:solutionsOverview.integrationTitle') || 'Seamless Integration'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutionsOverview.integrationText') || 'All solutions work together through shared authentication, data models, and user interfaces. Your data flows securely between applications while remaining under your control.'}
        </p>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutionsOverview.singleSignOn') || 'Single Sign-On'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutionsOverview.singleSignOnDesc') || 'One account for all applications through CyberEco Hub'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔄</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutionsOverview.dataPortability') || 'Data Portability'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutionsOverview.dataPortabilityDesc') || 'Your data moves seamlessly between applications'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutionsOverview.consistentUX') || 'Consistent Experience'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutionsOverview.consistentUXDesc') || 'Familiar interface across all applications'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutionsOverview.portfolioTitle') || 'View Complete Portfolio'}</h4>
          <p>
            {t('documentation:solutionsOverview.portfolioDesc') || 'Explore our full application portfolio including current apps, priority developments, and future vision.'}
          </p>
          <Link href="/documentation/portfolio" className={styles.redirectButton}>
            {t('documentation:solutionsOverview.viewPortfolio') || 'View Portfolio'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}