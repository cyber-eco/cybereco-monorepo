'use client';

import styles from '../page.module.css';
import portfolioStyles from './page.module.css';
import { useI18n } from '@cybereco/i18n';
import Link from 'next/link';
import { FaCubes } from 'react-icons/fa';
import DocumentationHero from '../components/DocumentationHero';

export default function PortfolioDocPage() {
  const { t } = useI18n();

  // Define application data with proper typing
  const currentApplications = [
    {
      id: 'hub',
      name: 'Hub',
      description: t('portfolio:portfolioPage.applications.hub.description'),
      tagline: t('portfolio:portfolioPage.applications.hub.tagline'),
      status: 'live',
      url: 'https://hub.cybere.co',
      category: 'tech'
    },
    {
      id: 'justsplit',
      name: 'JustSplit',
      description: t('portfolio:portfolioPage.applications.justsplit.description'),
      tagline: t('portfolio:portfolioPage.applications.justsplit.tagline'),
      status: 'live',
      url: 'https://justsplit.cybere.co',
      category: 'finance'
    },
    {
      id: 'website',
      name: 'Website',
      description: t('portfolio:portfolioPage.applications.website.description'),
      tagline: t('portfolio:portfolioPage.applications.website.tagline'),
      status: 'live',
      url: '/',
      category: 'tech'
    }
  ];

  const priorityApplications = [
    {
      id: 'somos',
      name: 'Somos',
      description: t('portfolio:portfolioPage.applications.somos.description'),
      tagline: t('portfolio:portfolioPage.applications.somos.tagline'),
      status: 'development',
      category: 'identity'
    },
    {
      id: 'demos',
      name: 'Demos',
      description: t('portfolio:portfolioPage.applications.demos.description'),
      tagline: t('portfolio:portfolioPage.applications.demos.tagline'),
      status: 'development',
      category: 'community'
    },
    {
      id: 'plantopia',
      name: 'Plantopia',
      description: t('portfolio:portfolioPage.applications.plantopia.description'),
      tagline: t('portfolio:portfolioPage.applications.plantopia.tagline'),
      status: 'development',
      category: 'sustainability'
    }
  ];

  const solutionCategories = [
    {
      id: 'community',
      title: t('portfolio:portfolioPage.categories.community.title'),
      description: t('portfolio:portfolioPage.categories.community.description'),
      icon: '🏛️',
      apps: ['Demos', 'Community Manager', 'MyCommunity', 'Conciliation', 'CrowdPool']
    },
    {
      id: 'finance',
      title: t('portfolio:portfolioPage.categories.finance.title'),
      description: t('portfolio:portfolioPage.categories.finance.description'),
      icon: '💰',
      apps: ['JustSplit', 'MyWealth', 'MyBusiness', 'CrowdFund', 'OfferMe', 'CyberBank']
    },
    {
      id: 'sustainability',
      title: t('portfolio:portfolioPage.categories.sustainability.title'),
      description: t('portfolio:portfolioPage.categories.sustainability.description'),
      icon: '🌱',
      apps: ['Plantopia', 'EcoTul', 'MyHome']
    },
    {
      id: 'education',
      title: t('portfolio:portfolioPage.categories.education.title'),
      description: t('portfolio:portfolioPage.categories.education.description'),
      icon: '📚',
      apps: ['Education Hub', 'Skill Share', 'Habits', 'OneStep']
    },
    {
      id: 'health',
      title: t('portfolio:portfolioPage.categories.health.title'),
      description: t('portfolio:portfolioPage.categories.health.description'),
      icon: '❤️',
      apps: ['Healthy', 'PetPal']
    },
    {
      id: 'identity',
      title: t('portfolio:portfolioPage.categories.identity.title') || 'Identity & Legal',
      description: t('portfolio:portfolioPage.categories.identity.description') || 'Personal identity management and legal assistance',
      icon: '🔐',
      apps: ['Somos', 'LawPal', 'MyData', 'DigitalMe', 'MyDocs']
    },
    {
      id: 'travel',
      title: t('portfolio:portfolioPage.categories.travel.title') || 'Travel & Discovery',
      description: t('portfolio:portfolioPage.categories.travel.description') || 'Travel planning and local exploration',
      icon: '✈️',
      apps: ['TravelMate', 'EventConnect', 'LocalWonders']
    },
    {
      id: 'tech',
      title: t('portfolio:portfolioPage.categories.tech.title') || 'Tech & Social',
      description: t('portfolio:portfolioPage.categories.tech.description') || 'Technical infrastructure and social connectivity',
      icon: '💻',
      apps: ['Hub', 'Website', 'Nexus', 'TimeSync']
    }
  ];

  return (
    <div className={portfolioStyles.container || styles.pageContainer}>
      <DocumentationHero
        icon={<FaCubes />}
        title={t('documentation:documentationPage.portfolioDocTitle') || 'Solutions Portfolio'}
        subtitle={t('documentation:documentationPage.portfolioDocSummary') || 'Our comprehensive suite of applications covering all aspects of digital life'}
        gradient="linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #6366f1 100%)"
      />

      {/* Overview Section */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>📋 {t('documentation:documentationPage.portfolio.overview.title') || 'Overview'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.overview.description1') || 'The CyberEco ecosystem is designed as a comprehensive digital lifestyle platform that empowers users with sovereignty over their digital lives. Our suite of applications covers essential life domains - from financial management and community governance to sustainable living and personal growth.'}
        </p>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.overview.description2') || 'Each application is built with privacy-first principles, seamless integration, and human-centered design at its core. Together, they form an interconnected ecosystem where data flows securely between applications while remaining under user control.'}
        </p>
      </div>

      {/* Current Applications */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>✅ {t('documentation:documentationPage.portfolio.currentApps.title') || 'Current Applications'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.currentApps.description') || 'These applications are live and ready to use today, forming the foundation of the CyberEco ecosystem.'}
        </p>
        <div className={styles.cardGrid}>
          {currentApplications.map((app) => (
            <div key={app.id} className={styles.docCard}>
              <div className={styles.cardIcon}>{app.category === 'tech' ? '💻' : '💰'}</div>
              <h3 className={styles.cardTitle}>{app.name}</h3>
              <p className={styles.cardDescription}>
                <strong>{app.tagline}</strong><br />
                {app.description}
              </p>
              {app.url && (
                <a href={app.url} target={app.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className={styles.cardLink}>
                  {t('documentation:documentationPage.portfolio.tryApp') || 'Try'} {app.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Applications */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>🎯 {t('documentation:documentationPage.portfolio.priorityApps.title') || 'Priority Applications (2025-2026)'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.priorityApps.description') || 'Our next wave of applications focuses on community building, cultural heritage, and sustainable living. These are currently under active development.'}
        </p>
        <div className={styles.cardGrid}>
          {priorityApplications.map((app) => (
            <div key={app.id} className={styles.docCard}>
              <div className={styles.cardIcon}>
                {app.category === 'identity' ? '🔐' : app.category === 'community' ? '🏛️' : '🌱'}
              </div>
              <h3 className={styles.cardTitle}>{app.name}</h3>
              <p className={styles.cardDescription}>
                <strong>{app.tagline}</strong><br />
                {app.description}
              </p>
              <span className={styles.badge} style={{ backgroundColor: '#F59E0B' }}>
                {t('documentation:documentationPage.inDevelopment') || 'In Development'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Categories */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>📊 {t('documentation:documentationPage.portfolio.solutionCategories.title') || 'Solution Categories'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.solutionCategories.description') || 'Our applications are organized into focused categories, each addressing specific aspects of modern digital life.'}
        </p>
        <div className={styles.solutionCategories}>
          {solutionCategories.map((category) => (
            <div key={category.id} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>
                {category.icon} {category.title}
              </h3>
              <p className={styles.contentText}>{category.description}</p>
              <div className={styles.categoryApps}>
                {category.apps.map((appName) => (
                  <span key={appName} className={styles.appChip}>
                    {appName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ecosystem */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>🌟 {t('documentation:documentationPage.portfolio.futureEcosystem.title') || 'Future Ecosystem (2026+)'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.futureEcosystem.description') || 'Our vision extends to over 30+ specialized applications, each designed to work seamlessly within the CyberEco ecosystem while respecting user privacy and data sovereignty.'}
        </p>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💡</div>
            <h4 className={styles.featureTitle}>{t('documentation:documentationPage.portfolio.futureEcosystem.modularArchitecture.title') || 'Modular Architecture'}</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.portfolio.futureEcosystem.modularArchitecture.description') || 'Each app can function independently while benefiting from ecosystem integration'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔗</div>
            <h4 className={styles.featureTitle}>{t('documentation:documentationPage.portfolio.futureEcosystem.seamlessIntegration.title') || 'Seamless Integration'}</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.portfolio.futureEcosystem.seamlessIntegration.description') || 'Data flows securely between apps with user consent and control'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h4 className={styles.featureTitle}>{t('documentation:documentationPage.portfolio.futureEcosystem.privacyByDesign.title') || 'Privacy by Design'}</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.portfolio.futureEcosystem.privacyByDesign.description') || 'Every application follows strict privacy principles and GDPR compliance'}
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h4 className={styles.featureTitle}>{t('documentation:documentationPage.portfolio.futureEcosystem.decentralizedFuture.title') || 'Decentralized Future'}</h4>
            <p className={styles.featureDescription}>
              {t('documentation:documentationPage.portfolio.futureEcosystem.decentralizedFuture.description') || 'Preparing for transition to fully decentralized infrastructure'}
            </p>
          </div>
        </div>
      </div>

      {/* Development Philosophy */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>💭 {t('documentation:documentationPage.portfolio.developmentPhilosophy.title') || 'Development Philosophy'}</h2>
        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.portfolio.developmentPhilosophy.userCentric.title') || 'User-Centric Design'}</h4>
            <p>{t('documentation:documentationPage.portfolio.developmentPhilosophy.userCentric.description') || 'Every feature is designed with real user needs in mind, avoiding dark patterns and addictive mechanisms'}</p>
          </div>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.portfolio.developmentPhilosophy.progressiveEnhancement.title') || 'Progressive Enhancement'}</h4>
            <p>{t('documentation:documentationPage.portfolio.developmentPhilosophy.progressiveEnhancement.description') || 'Start with core functionality and progressively add features based on community feedback'}</p>
          </div>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.portfolio.developmentPhilosophy.openDevelopment.title') || 'Open Development'}</h4>
            <p>{t('documentation:documentationPage.portfolio.developmentPhilosophy.openDevelopment.description') || 'Transparent roadmaps, open-source components, and community involvement in decision-making'}</p>
          </div>
          <div className={styles.principleCard}>
            <h4>{t('documentation:documentationPage.portfolio.developmentPhilosophy.sustainableGrowth.title') || 'Sustainable Growth'}</h4>
            <p>{t('documentation:documentationPage.portfolio.developmentPhilosophy.sustainableGrowth.description') || 'Building for long-term sustainability rather than rapid growth at any cost'}</p>
          </div>
        </div>
      </div>

      {/* Application Status Overview */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>📈 {t('documentation:documentationPage.portfolio.applicationStatus.title') || 'Application Status Overview'}</h2>
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:documentationPage.portfolio.applicationStatus.statusColumn') || 'Status'}</th>
                <th>{t('documentation:documentationPage.portfolio.applicationStatus.applicationsColumn') || 'Applications'}</th>
                <th>{t('documentation:documentationPage.portfolio.applicationStatus.timelineColumn') || 'Timeline'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span style={{ color: 'var(--success)' }}>🟢 {t('documentation:documentationPage.portfolio.applicationStatus.liveStatus') || 'Live'}</span></td>
                <td>Hub, JustSplit, Website</td>
                <td>{t('documentation:documentationPage.portfolio.applicationStatus.availableNow') || 'Available Now'}</td>
              </tr>
              <tr>
                <td><span style={{ color: 'var(--warning)' }}>🟡 {t('documentation:documentationPage.portfolio.applicationStatus.inDevelopmentStatus') || 'In Development'}</span></td>
                <td>Somos, Demos, Plantopia</td>
                <td>{t('documentation:documentationPage.portfolio.applicationStatus.timeline2025') || '2025-2026'}</td>
              </tr>
              <tr>
                <td><span style={{ color: 'var(--info)' }}>🔵 {t('documentation:documentationPage.portfolio.applicationStatus.plannedStatus') || 'Planned'}</span></td>
                <td>CyberBank, MyWealth, MyBusiness, and 25+ more</td>
                <td>{t('documentation:documentationPage.portfolio.applicationStatus.timeline2026') || '2026 and beyond'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Integration */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>🔧 {t('documentation:documentationPage.portfolio.technicalIntegration.title') || 'Technical Integration'}</h2>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.portfolio.technicalIntegration.description') || 'All CyberEco applications share common technical foundations that enable seamless integration:'}
        </p>
        <ul className={styles.featureList}>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.sso') || 'Single Sign-On (SSO):'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.ssoDesc') || 'One account for all applications through the Hub'}</li>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.sharedData') || 'Shared Data Models:'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.sharedDataDesc') || 'Common data structures enable cross-app functionality'}</li>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.unifiedUI') || 'Unified UI Components:'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.unifiedUIDesc') || 'Consistent user experience across all applications'}</li>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.permissions') || 'Permission System:'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.permissionsDesc') || 'Granular control over what each app can access'}</li>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.apiStandards') || 'API Standards:'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.apiStandardsDesc') || 'RESTful APIs with JWT authentication for all services'}</li>
          <li><strong>{t('documentation:documentationPage.portfolio.technicalIntegration.privacyControls') || 'Privacy Controls:'}</strong> {t('documentation:documentationPage.portfolio.technicalIntegration.privacyControlsDesc') || 'User-managed data visibility and sharing preferences'}</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className={styles.contentSection}>
        <div className={styles.redirectCard}>
          <h4>{t('documentation:documentationPage.completeSolutionsPortfolio') || 'Explore the Full Portfolio'}</h4>
          <p>
            {t('documentation:documentationPage.portfolio.description') || 'Visit our main portfolio page for detailed information about each application, including features, screenshots, and development updates.'}
          </p>
          <Link href="/portfolio" className={styles.redirectButton}>
            {t('documentation:documentationPage.viewFullPortfolio') || 'View Full Portfolio'}
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Related Documentation */}
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>📚 {t('documentation:documentationPage.portfolio.relatedDocs.title') || 'Related Documentation'}</h3>
        <div className={styles.docGrid}>
          <Link href="/documentation/philosophy" className={styles.docLink}>
            <div className={styles.docLinkIcon}>🎯</div>
            <div>
              <h4>{t('documentation:documentationPage.portfolio.relatedDocs.philosophy.title') || 'Platform Philosophy'}</h4>
              <p>{t('documentation:documentationPage.portfolio.relatedDocs.philosophy.description') || 'Understand the principles guiding our development'}</p>
            </div>
          </Link>
          <Link href="/documentation/roadmap" className={styles.docLink}>
            <div className={styles.docLinkIcon}>🗺️</div>
            <div>
              <h4>{t('documentation:documentationPage.portfolio.relatedDocs.roadmap.title') || 'Development Roadmap'}</h4>
              <p>{t('documentation:documentationPage.portfolio.relatedDocs.roadmap.description') || 'See our timeline and upcoming features'}</p>
            </div>
          </Link>
          <Link href="/documentation/vision" className={styles.docLink}>
            <div className={styles.docLinkIcon}>🔮</div>
            <div>
              <h4>{t('documentation:documentationPage.portfolio.relatedDocs.vision.title') || 'Decentralized Vision'}</h4>
              <p>{t('documentation:documentationPage.portfolio.relatedDocs.vision.description') || 'Learn about our long-term vision'}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}