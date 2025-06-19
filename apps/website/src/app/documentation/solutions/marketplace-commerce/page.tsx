'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaShoppingCart, FaHandshake, FaShieldAlt, FaUsers, FaCubes, FaChartLine, FaGlobe, FaLock, FaBolt, FaBalanceScale } from 'react-icons/fa';
import styles from '../../page.module.css';

export default function MarketplaceCommercePage() {
  const { t } = useI18n();
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaShoppingCart /> {t('documentation:solutions.marketplace.title') || 'Marketplace'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutions.marketplace.subtitle') || 'Decentralized peer-to-peer commerce with data sovereignty'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:solutions.marketplace.problem.title') || 'The Problem'}
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏢</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.problem.monopoly.title') || 'Platform Monopolies'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.problem.monopoly.description') || 
                'Traditional marketplaces control everything: your data, customer relationships, and business rules. They can change fees, suspend accounts, or alter algorithms at will.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.problem.data.title') || 'Data Exploitation'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.problem.data.description') || 
                'Your sales data, customer information, and business insights become the platform\'s property, used to compete against you or sold to the highest bidder.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚖️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.problem.disputes.title') || 'Unfair Dispute Resolution'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.problem.disputes.description') || 
                'Dispute resolution favors buyers over sellers, lacks transparency, and offers no real recourse for unfair decisions.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💸</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.problem.fees.title') || 'Excessive Fees'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.problem.fees.description') || 
                'Commission fees of 15-30% eat into profits, while additional charges for payments, advertising, and features make sustainable business difficult.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaBolt /> {t('documentation:solutions.marketplace.solution.title') || 'The CyberEco Solution'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutions.marketplace.solution.description') || 
            'CyberEco Marketplace reimagines commerce as a decentralized ecosystem where vendors maintain control, buyers enjoy privacy, and communities facilitate fair trade through transparent governance.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:solutions.marketplace.features.title') || 'Key Features'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.decentralized.title') || 'Decentralized Architecture'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.decentralized.description') || 
                'No central server controls your store. Product catalogs live in vendor-controlled data vaults, synchronized peer-to-peer with interested buyers.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.sovereignty.title') || 'Data Sovereignty'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.sovereignty.description') || 
                'You own your product data, customer relationships, and sales history. Export anytime, integrate anywhere, no platform lock-in.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.realtime.title') || 'Real-time Sync'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.realtime.description') || 
                'CRDT technology ensures inventory updates instantly across all nodes. No overselling, no conflicts, no central bottleneck.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.conciliation.title') || 'Fair Conciliation'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.conciliation.description') || 
                'Community-certified mediators resolve disputes through transparent conciliation, not arbitrary platform decisions.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.zeroFees.title') || 'Zero Platform Fees'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.zeroFees.description') || 
                'No commissions, no listing fees, no hidden charges. Vendors only pay for optional services they choose to use.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.features.privacy.title') || 'Privacy-First Shopping'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.features.privacy.description') || 
                'Browse anonymously, share only necessary data, pay securely. Your shopping habits remain your business.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>⚙️ {t('documentation:solutions.marketplace.implementation.title') || 'Technical Implementation'}</h3>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.marketplace.implementation.vendorCatalog.title') || 'Vendor Catalogs'}</h4>
            <p>{t('documentation:solutions.marketplace.implementation.vendorCatalog.description') || 
              'Each vendor maintains their product catalog in a personal data vault, with CRDT-based inventory management for real-time accuracy.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.marketplace.implementation.buyerDiscovery.title') || 'Buyer Discovery'}</h4>
            <p>{t('documentation:solutions.marketplace.implementation.buyerDiscovery.description') || 
              'Decentralized search indexes help buyers find products while preserving vendor control and buyer privacy.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.marketplace.implementation.orderProcessing.title') || 'Order Processing'}</h4>
            <p>{t('documentation:solutions.marketplace.implementation.orderProcessing.description') || 
              'Multi-signature orders ensure both parties agree to terms. Smart escrow protects payments until delivery confirmation.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.marketplace.implementation.disputeResolution.title') || 'Dispute Resolution'}</h4>
            <p>{t('documentation:solutions.marketplace.implementation.disputeResolution.description') || 
              'Certified conciliators from the community mediate disputes, with transparent processes and fair outcomes.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>✅ {t('documentation:solutions.marketplace.benefits.title') || 'Benefits'}</h3>
        
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:solutions.marketplace.benefits.stakeholder') || 'Stakeholder'}</th>
                <th>{t('documentation:solutions.marketplace.benefits.advantages') || 'Key Advantages'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('documentation:solutions.marketplace.benefits.forVendors.title') || 'For Vendors'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.marketplace.benefits.forVendors.control') || 'Complete control over your store and data'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forVendors.noFees') || 'No platform fees eating into profits'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forVendors.relationships') || 'Direct customer relationships'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forVendors.flexibility') || 'Flexible business rules and policies'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.marketplace.benefits.forBuyers.title') || 'For Buyers'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.marketplace.benefits.forBuyers.privacy') || 'Shop privately without tracking'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forBuyers.directPrices') || 'Better prices without platform markups'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forBuyers.transparency') || 'Transparent seller information'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forBuyers.fairDisputes') || 'Fair dispute resolution process'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.marketplace.benefits.forCommunities.title') || 'For Communities'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.marketplace.benefits.forCommunities.localFirst') || 'Support local businesses directly'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forCommunities.governance') || 'Participate in marketplace governance'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forCommunities.mediation') || 'Become certified mediators'}</li>
                    <li>{t('documentation:solutions.marketplace.benefits.forCommunities.standards') || 'Set community commerce standards'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💡 {t('documentation:solutions.marketplace.useCases.title') || 'Use Cases'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.useCases.artisans.title') || 'Artisan Crafts'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.useCases.artisans.description') || 
                'Craftspeople sell directly to customers without platform fees'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌾</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.useCases.farmers.title') || 'Farmers Markets'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.useCases.farmers.description') || 
                'Local farmers coordinate with community members for fresh produce'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💼</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.useCases.services.title') || 'Professional Services'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.useCases.services.description') || 
                'Service providers manage bookings and payments seamlessly'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.marketplace.useCases.cooperatives.title') || 'Cooperatives'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.marketplace.useCases.cooperatives.description') || 
                'Worker cooperatives organize collective commerce'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutions.marketplace.technicalDocs') || 'Technical Documentation'}</h4>
          <p>
            {t('documentation:solutions.marketplace.technicalDocsDesc') || 'Learn more about implementing marketplace features in your applications.'}
          </p>
          <Link href="/docs/apps/marketplace" className={styles.redirectButton}>
            {t('documentation:solutions.marketplace.viewDocs') || 'View Technical Docs'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}