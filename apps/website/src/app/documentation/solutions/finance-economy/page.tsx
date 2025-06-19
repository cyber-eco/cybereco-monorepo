'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaChartBar, FaHandshake, FaShieldAlt, FaGlobe, FaBolt, FaBalanceScale, FaCoins, FaPiggyBank } from 'react-icons/fa';
import styles from '../../page.module.css';

export default function FinanceEconomyPage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaChartBar /> {t('documentation:solutions.finance.title') || 'Finance & Economy'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutions.finance.subtitle') || 'Financial management, expense sharing, and economic tools for individuals and businesses'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:solutions.finance.problem.title') || 'The Problem'}
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏦</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.problem.exclusion.title') || 'Financial Exclusion'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.problem.exclusion.description') || 
                'Traditional banking systems exclude billions, with high fees, minimum balances, and discriminatory practices limiting access to financial services.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💸</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.problem.complexity.title') || 'Expense Tracking Complexity'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.problem.complexity.description') || 
                'Managing shared expenses in groups is cumbersome, leading to conflicts, forgotten debts, and damaged relationships.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.problem.opacity.title') || 'Lack of Transparency'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.problem.opacity.description') || 
                'Financial institutions operate opaquely, with hidden fees, unclear terms, and algorithms that work against user interests.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.problem.control.title') || 'No User Control'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.problem.control.description') || 
                'Your financial data is owned by banks and fintech companies, used for profit without your consent or benefit.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaBolt /> {t('documentation:solutions.finance.solution.title') || 'The CyberEco Solution'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutions.finance.solution.description') || 
            'CyberEco democratizes financial tools with transparent, user-owned systems for expense sharing, budgeting, and economic collaboration. Our platform puts financial sovereignty back in your hands.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:solutions.finance.features.title') || 'Key Features'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.splitting.title') || 'Smart Expense Splitting'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.splitting.description') || 
                'JustSplit automatically tracks, calculates, and settles group expenses with multiple split methods and fair algorithms.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏦</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.banking.title') || 'Community Banking'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.banking.description') || 
                'Peer-to-peer lending, savings circles, and mutual aid systems that bypass traditional banking monopolies.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.budgeting.title') || 'Collaborative Budgeting'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.budgeting.description') || 
                'Group budgeting tools for families, organizations, and communities with transparent tracking and accountability.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.ownership.title') || 'Data Ownership'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.ownership.description') || 
                'Your financial data stays yours. Export anytime, integrate anywhere, with full control over who sees what.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.realtime.title') || 'Real-time Settlement'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.realtime.description') || 
                'Instant settlement calculations and payment integrations reduce conflicts and simplify group finances.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.features.inclusive.title') || 'Financial Inclusion'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.features.inclusive.description') || 
                'No minimum balances, no discrimination, no exclusion. Financial tools accessible to everyone, everywhere.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>⚙️ {t('documentation:solutions.finance.implementation.title') || 'Technical Implementation'}</h3>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.finance.implementation.justsplit.title') || 'JustSplit Engine'}</h4>
            <p>{t('documentation:solutions.finance.implementation.justsplit.description') || 
              'Advanced algorithms for expense tracking, fair splitting methods, and automated settlement calculations with multi-currency support.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.finance.implementation.cyberbank.title') || 'CyberBank Platform'}</h4>
            <p>{t('documentation:solutions.finance.implementation.cyberbank.description') || 
              'Decentralized banking infrastructure supporting peer-to-peer transactions, savings pools, and community lending.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.finance.implementation.analytics.title') || 'Financial Analytics'}</h4>
            <p>{t('documentation:solutions.finance.implementation.analytics.description') || 
              'Privacy-preserving analytics giving users insights into spending patterns, budgets, and financial health.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.finance.implementation.integration.title') || 'Payment Integration'}</h4>
            <p>{t('documentation:solutions.finance.implementation.integration.description') || 
              'Seamless integration with various payment systems while maintaining user privacy and data sovereignty.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>✅ {t('documentation:solutions.finance.benefits.title') || 'Benefits'}</h3>
        
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:solutions.finance.benefits.stakeholder') || 'Stakeholder'}</th>
                <th>{t('documentation:solutions.finance.benefits.advantages') || 'Key Advantages'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('documentation:solutions.finance.benefits.forIndividuals.title') || 'For Individuals'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.finance.benefits.forIndividuals.control') || 'Complete control over financial data'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forIndividuals.transparency') || 'Transparent expense tracking'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forIndividuals.inclusion') || 'Access to financial services'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forIndividuals.privacy') || 'Privacy-preserving transactions'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.finance.benefits.forGroups.title') || 'For Groups'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.finance.benefits.forGroups.harmony') || 'Reduced financial conflicts'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forGroups.efficiency') || 'Automated expense management'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forGroups.fairness') || 'Fair and transparent splitting'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forGroups.accountability') || 'Clear financial accountability'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.finance.benefits.forCommunities.title') || 'For Communities'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.finance.benefits.forCommunities.resilience') || 'Economic resilience through mutual aid'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forCommunities.circulation') || 'Keep money circulating locally'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forCommunities.empowerment') || 'Financial empowerment for all'}</li>
                    <li>{t('documentation:solutions.finance.benefits.forCommunities.solidarity') || 'Strengthen community bonds'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💡 {t('documentation:solutions.finance.useCases.title') || 'Use Cases'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏠</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.useCases.household.title') || 'Shared Households'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.useCases.household.description') || 
                'Roommates and families managing rent, utilities, groceries, and household expenses fairly'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✈️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.useCases.travel.title') || 'Group Travel'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.useCases.travel.description') || 
                'Friends splitting vacation costs, tracking shared expenses, and settling debts easily'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.useCases.organizations.title') || 'Organizations'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.useCases.organizations.description') || 
                'Clubs, teams, and organizations managing member contributions and shared expenses'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.finance.useCases.mutual.title') || 'Mutual Aid'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.finance.useCases.mutual.description') || 
                'Community support networks pooling resources for emergency assistance and solidarity'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutions.finance.technicalDocs') || 'Technical Documentation'}</h4>
          <p>
            {t('documentation:solutions.finance.technicalDocsDesc') || 'Learn more about implementing financial management features in your applications.'}
          </p>
          <Link href="/documentation/guides/justsplit" className={styles.redirectButton}>
            {t('documentation:solutions.finance.viewDocs') || 'View Technical Docs'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}