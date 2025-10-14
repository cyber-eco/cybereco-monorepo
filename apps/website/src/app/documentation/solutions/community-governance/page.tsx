'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@cybereco/i18n';
import { FaUsers, FaHandshake, FaShieldAlt, FaGlobe, FaBolt, FaBalanceScale, FaVoteYea, FaComments } from 'react-icons/fa';
import styles from '../../page.module.css';

export default function CommunityGovernancePage() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaUsers /> {t('documentation:solutions.community.title') || 'Community & Governance'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:solutions.community.subtitle') || 'Digital tools for community building, democratic governance, and collective decision-making'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> {t('documentation:solutions.community.problem.title') || 'The Problem'}
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏢</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.problem.centralization.title') || 'Centralized Control'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.problem.centralization.description') || 
                'Traditional platforms control community data, rules, and decision-making, leaving members powerless to shape their digital spaces.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.problem.transparency.title') || 'Lack of Transparency'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.problem.transparency.description') || 
                'Decisions are made behind closed doors, voting systems are opaque, and community funds are managed without accountability.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💔</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.problem.engagement.title') || 'Low Engagement'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.problem.engagement.description') || 
                'Members feel disconnected from decision-making, leading to apathy and reduced participation in community life.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚖️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.problem.representation.title') || 'Poor Representation'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.problem.representation.description') || 
                'Traditional governance structures fail to represent diverse voices and perspectives within communities.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          <FaBolt /> {t('documentation:solutions.community.solution.title') || 'The CyberEco Solution'}
        </h2>
        <p className={styles.contentText}>
          {t('documentation:solutions.community.solution.description') || 
            'CyberEco empowers communities with democratic governance tools, transparent decision-making processes, and collective ownership of digital spaces. Our platform ensures every voice is heard and every vote counts.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌟 {t('documentation:solutions.community.features.title') || 'Key Features'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🗳️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.voting.title') || 'Transparent Voting'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.voting.description') || 
                'Cryptographically secure voting systems ensure transparency while maintaining voter privacy. Every vote is verifiable and tamper-proof.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💬</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.deliberation.title') || 'Deliberation Tools'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.deliberation.description') || 
                'Structured discussion forums and consensus-building tools help communities explore issues thoroughly before making decisions.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.proposals.title') || 'Proposal System'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.proposals.description') || 
                'Any member can submit proposals for community consideration, with built-in thresholds and review processes.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.treasury.title') || 'Community Treasury'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.treasury.description') || 
                'Transparent management of community funds with multi-signature controls and public audit trails.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.conciliation.title') || 'Fair Conciliation'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.conciliation.description') || 
                'Community-certified mediators resolve disputes through transparent conciliation processes, not arbitrary decisions.'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.features.ownership.title') || 'Collective Ownership'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.features.ownership.description') || 
                'Communities truly own their platforms, data, and governance rules. No external entity can override community decisions.'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>⚙️ {t('documentation:solutions.community.implementation.title') || 'Technical Implementation'}</h3>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.community.implementation.demos.title') || 'Demos Platform'}</h4>
            <p>{t('documentation:solutions.community.implementation.demos.description') || 
              'Secure voting system with cryptographic proofs, supporting various voting methods from simple majority to ranked choice.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.community.implementation.forum.title') || 'Community Forum'}</h4>
            <p>{t('documentation:solutions.community.implementation.forum.description') || 
              'Structured discussion spaces with reputation systems, moderation tools, and consensus-tracking features.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.community.implementation.governance.title') || 'Governance Engine'}</h4>
            <p>{t('documentation:solutions.community.implementation.governance.description') || 
              'Flexible framework supporting various governance models from direct democracy to delegated representation.'}</p>
          </div>
          <div className={styles.conceptCard}>
            <h4>{t('documentation:solutions.community.implementation.integration.title') || 'Cross-App Integration'}</h4>
            <p>{t('documentation:solutions.community.implementation.integration.description') || 
              'Seamless integration with other CyberEco apps for identity, payments, and resource management.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>✅ {t('documentation:solutions.community.benefits.title') || 'Benefits'}</h3>
        
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:solutions.community.benefits.stakeholder') || 'Stakeholder'}</th>
                <th>{t('documentation:solutions.community.benefits.advantages') || 'Key Advantages'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('documentation:solutions.community.benefits.forMembers.title') || 'For Members'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.community.benefits.forMembers.voice') || 'Equal voice in community decisions'}</li>
                    <li>{t('documentation:solutions.community.benefits.forMembers.transparency') || 'Full transparency in governance'}</li>
                    <li>{t('documentation:solutions.community.benefits.forMembers.ownership') || 'True ownership of community assets'}</li>
                    <li>{t('documentation:solutions.community.benefits.forMembers.participation') || 'Meaningful participation opportunities'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.community.benefits.forLeaders.title') || 'For Leaders'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.community.benefits.forLeaders.legitimacy') || 'Democratic legitimacy for decisions'}</li>
                    <li>{t('documentation:solutions.community.benefits.forLeaders.tools') || 'Powerful governance tools'}</li>
                    <li>{t('documentation:solutions.community.benefits.forLeaders.engagement') || 'Higher member engagement'}</li>
                    <li>{t('documentation:solutions.community.benefits.forLeaders.accountability') || 'Clear accountability structures'}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>{t('documentation:solutions.community.benefits.forSociety.title') || 'For Society'}</strong></td>
                <td>
                  <ul className={styles.conceptList}>
                    <li>{t('documentation:solutions.community.benefits.forSociety.democracy') || 'Strengthened democratic practices'}</li>
                    <li>{t('documentation:solutions.community.benefits.forSociety.social') || 'Enhanced social cohesion'}</li>
                    <li>{t('documentation:solutions.community.benefits.forSociety.innovation') || 'Grassroots innovation'}</li>
                    <li>{t('documentation:solutions.community.benefits.forSociety.resilience') || 'Resilient local communities'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💡 {t('documentation:solutions.community.useCases.title') || 'Use Cases'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏘️</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.useCases.neighborhood.title') || 'Neighborhood Associations'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.useCases.neighborhood.description') || 
                'Local communities managing shared resources, organizing events, and making collective decisions'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.useCases.organizations.title') || 'Non-Profit Organizations'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.useCases.organizations.description') || 
                'Transparent governance for NGOs with member voting and public accountability'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏢</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.useCases.cooperatives.title') || 'Worker Cooperatives'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.useCases.cooperatives.description') || 
                'Democratic workplace governance with equal participation in decision-making'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h4 className={styles.featureTitle}>
              {t('documentation:solutions.community.useCases.online.title') || 'Online Communities'}
            </h4>
            <p className={styles.featureDescription}>
              {t('documentation:solutions.community.useCases.online.description') || 
                'Digital-first communities with democratic moderation and collective ownership'}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:solutions.community.technicalDocs') || 'Technical Documentation'}</h4>
          <p>
            {t('documentation:solutions.community.technicalDocsDesc') || 'Learn more about implementing community governance features in your applications.'}
          </p>
          <Link href="/documentation/guides/community-governance" className={styles.redirectButton}>
            {t('documentation:solutions.community.viewDocs') || 'View Technical Docs'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}