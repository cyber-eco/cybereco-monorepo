'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaRocket, FaCheckCircle, FaCode, FaUsers, FaCubes, FaShieldAlt, 
  FaChartLine, FaGlobe, FaMobileAlt, FaLeaf, FaDatabase, FaLock,
  FaNetworkWired, FaCoins, FaArrowRight, FaClock, FaLightbulb,
  FaHandshake, FaGraduationCap, FaBrain, FaCloud, FaExchangeAlt,
  FaShoppingCart
} from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import DocumentationHero from '../components/DocumentationHero';
import DocumentationTabs, { Tab } from '../components/DocumentationTabs';
import styles from './page.module.css';

export default function RoadmapDocs() {
  const { t } = useI18n();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (phase: string) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  const renderOverviewTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.overview.title') || 'Development Roadmap Overview'}</h2>
      
      <div className={styles.evolutionPath}>
        <h3 className={styles.evolutionTitle}>
          {t('documentation:documentationPage.roadmap.overview.evolutionTitle') || 'Three-Phase Evolution Strategy'}
        </h3>
        
        <div className={styles.evolutionCards}>
          <div className={styles.evolutionCard}>
            <div className={styles.evolutionIcon}>
              <FaCloud />
            </div>
            <div className={styles.evolutionContent}>
              <h4>{t('documentation:documentationPage.roadmap.overview.phase1Title') || 'Centralized Foundation'}</h4>
              <span className={styles.evolutionTime}>2025-2026</span>
              <p>{t('documentation:documentationPage.roadmap.overview.phase1Desc') || 'Build robust applications on traditional infrastructure'}</p>
            </div>
          </div>

          <div className={styles.evolutionArrow}>
            <FaArrowRight />
          </div>

          <div className={styles.evolutionCard}>
            <div className={styles.evolutionIcon}>
              <FaExchangeAlt />
            </div>
            <div className={styles.evolutionContent}>
              <h4>{t('documentation:documentationPage.roadmap.overview.phase2Title') || 'Hybrid Transition'}</h4>
              <span className={styles.evolutionTime}>2030-2035</span>
              <p>{t('documentation:documentationPage.roadmap.overview.phase2Desc') || 'Introduce decentralized features while maintaining compatibility'}</p>
            </div>
          </div>

          <div className={styles.evolutionArrow}>
            <FaArrowRight />
          </div>

          <div className={styles.evolutionCard}>
            <div className={styles.evolutionIcon}>
              <FaGlobe />
            </div>
            <div className={styles.evolutionContent}>
              <h4>{t('documentation:documentationPage.roadmap.overview.phase3Title') || 'Decentralized Ecosystem'}</h4>
              <span className={styles.evolutionTime}>2035+</span>
              <p>{t('documentation:documentationPage.roadmap.overview.phase3Desc') || 'Full peer-to-peer, blockchain-native architecture'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.principlesSection}>
        <h3>{t('documentation:documentationPage.roadmap.overview.guidingPrinciples') || 'Guiding Principles'}</h3>
        <div className={styles.principlesGrid}>
          <div className={styles.principleCard}>
            <FaUsers className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.roadmap.overview.userFirst') || 'User First'}</h4>
            <p>{t('documentation:documentationPage.roadmap.overview.userFirstDesc') || 'Deliver value immediately while building for the future'}</p>
          </div>
          
          <div className={styles.principleCard}>
            <FaShieldAlt className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.roadmap.overview.privacyCore') || 'Privacy at Core'}</h4>
            <p>{t('documentation:documentationPage.roadmap.overview.privacyCoreDesc') || 'Data protection and user sovereignty from day one'}</p>
          </div>
          
          <div className={styles.principleCard}>
            <FaCubes className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.roadmap.overview.modularDesign') || 'Modular Design'}</h4>
            <p>{t('documentation:documentationPage.roadmap.overview.modularDesignDesc') || 'Build components that work today and tomorrow'}</p>
          </div>
          
          <div className={styles.principleCard}>
            <FaHandshake className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.roadmap.overview.communityDriven') || 'Community Driven'}</h4>
            <p>{t('documentation:documentationPage.roadmap.overview.communityDrivenDesc') || 'Open source collaboration and transparent development'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStatusTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.currentStatus.title') || 'Current Development Status'}</h2>
      
      <div className={styles.statusOverview}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '20%' }}>
            <span className={styles.progressLabel}>20%</span>
          </div>
        </div>
        <p className={styles.progressText}>
          {t('documentation:documentationPage.roadmap.currentStatus.progressText') || 'Phase 2 of 8 - Stabilization & Core Features'}
        </p>
      </div>

      <div className={styles.completedSection}>
        <h3>
          <FaCheckCircle className={styles.sectionIcon} />
          {t('documentation:documentationPage.roadmap.currentStatus.completedTitle') || 'Phase 1: Foundation (Completed)'}
        </h3>
        
        <div className={styles.achievementGrid}>
          <div className={styles.achievementCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h4>{t('documentation:documentationPage.roadmap.currentStatus.nxSetup') || 'NX Monorepo Setup'}</h4>
              <p>{t('documentation:documentationPage.roadmap.currentStatus.nxSetupDesc') || 'Advanced build system with caching and parallel execution'}</p>
            </div>
          </div>
          
          <div className={styles.achievementCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h4>{t('documentation:documentationPage.roadmap.currentStatus.sharedLibraries') || 'Shared Libraries'}</h4>
              <p>{t('documentation:documentationPage.roadmap.currentStatus.sharedLibrariesDesc') || 'UI components, types, Firebase config, and i18n system'}</p>
            </div>
          </div>
          
          <div className={styles.achievementCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h4>{t('documentation:documentationPage.roadmap.currentStatus.authSystem') || 'Authentication System'}</h4>
              <p>{t('documentation:documentationPage.roadmap.currentStatus.authSystemDesc') || 'Multi-project Firebase setup with SSO capabilities'}</p>
            </div>
          </div>
          
          <div className={styles.achievementCard}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <h4>{t('documentation:documentationPage.roadmap.currentStatus.documentation') || 'Comprehensive Documentation'}</h4>
              <p>{t('documentation:documentationPage.roadmap.currentStatus.documentationDesc') || 'Architecture guides, API references, and user documentation'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.activeSection}>
        <h3>
          <FaRocket className={styles.sectionIcon} />
          {t('documentation:documentationPage.roadmap.currentStatus.activeTitle') || 'Phase 2: Stabilization (Active)'}
        </h3>
        
        <div className={styles.priorityList}>
          <div className={styles.priorityItem}>
            <span className={styles.priorityBadge}>
              {t('documentation:documentationPage.roadmap.currentStatus.critical') || 'CRITICAL'}
            </span>
            <h4>{t('documentation:documentationPage.roadmap.currentStatus.fixRuntime') || 'Fix JustSplit Runtime Errors'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.propTypes') || 'Component prop type errors'}</li>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.dataFlow') || 'Data flow and state management'}</li>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.errorBoundaries') || 'Error boundaries and fallbacks'}</li>
            </ul>
          </div>
          
          <div className={styles.priorityItem}>
            <span className={styles.priorityBadge}>
              {t('documentation:documentationPage.roadmap.currentStatus.high') || 'HIGH'}
            </span>
            <h4>{t('documentation:documentationPage.roadmap.currentStatus.hubFeatures') || 'Hub Core Features'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.dashboard') || 'App launcher dashboard'}</li>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.userProfile') || 'User profile management'}</li>
              <li>{t('documentation:documentationPage.roadmap.currentStatus.navigation') || 'Cross-app navigation'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShortTermTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.shortTerm.title') || 'Short-Term Roadmap (1-6 Months)'}</h2>
      
      <div className={styles.timeline}>
        <div className={styles.timelineItem} onClick={() => togglePhase('stabilization')}>
          <div className={styles.timelineMarker}>
            <FaCode />
          </div>
          <div className={styles.timelineContent}>
            <h3>
              {t('documentation:documentationPage.roadmap.shortTerm.phase2Title') || 'Phase 2: Stabilization'}
              <span className={styles.timelineDate}>
                {t('documentation:documentationPage.roadmap.shortTerm.phase2Date') || 'Months 1-2'}
              </span>
            </h3>
            <p>{t('documentation:documentationPage.roadmap.shortTerm.phase2Desc') || 'Make core applications stable and production-ready'}</p>
            
            {expandedPhase === 'stabilization' && (
              <div className={styles.phaseDetails}>
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.week1') || 'Week 1-2: JustSplit Fixes'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.fixTypes') || 'Fix TypeScript compilation errors'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.fixUseEffect') || 'Resolve useEffect infinite loops'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.addLoading') || 'Add proper loading states'}</li>
                </ul>
                
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.week3') || 'Week 3-4: Hub Development'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.authForms') || 'Complete authentication forms'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.appLauncher') || 'Build app launcher dashboard'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.integration') || 'Test Hub-JustSplit integration'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={styles.timelineItem} onClick={() => togglePhase('integration')}>
          <div className={styles.timelineMarker}>
            <FaNetworkWired />
          </div>
          <div className={styles.timelineContent}>
            <h3>
              {t('documentation:documentationPage.roadmap.shortTerm.phase3Title') || 'Phase 3: Integration & MVPs'}
              <span className={styles.timelineDate}>
                {t('documentation:documentationPage.roadmap.shortTerm.phase3Date') || 'Months 3-4'}
              </span>
            </h3>
            <p>{t('documentation:documentationPage.roadmap.shortTerm.phase3Desc') || 'Create seamless cross-app experience and launch priority applications'}</p>
            
            {expandedPhase === 'integration' && (
              <div className={styles.phaseDetails}>
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.crossApp') || 'Cross-App Features'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.tokenAuth') || 'JWT token authentication'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.sessionMgmt') || 'Unified session management'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.sharedState') || 'Shared state across apps'}</li>
                </ul>
                
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.priorityApps') || 'Priority Applications'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.demosMvp') || 'Demos MVP - Community governance'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.marketplace') || 'Marketplace MVP - Decentralized commerce'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.ethicalAds') || 'EthicalAds integration'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.conciliation') || 'Conciliation MVP - Legal workflows'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={styles.timelineItem} onClick={() => togglePhase('marketplace')}>
          <div className={styles.timelineMarker}>
            <FaShoppingCart />
          </div>
          <div className={styles.timelineContent}>
            <h3>
              {t('documentation:documentationPage.roadmap.shortTerm.phase4Title') || 'Phase 4: Marketplace Launch'}
              <span className={styles.timelineDate}>
                {t('documentation:documentationPage.roadmap.shortTerm.phase4Date') || 'Months 5-6'}
              </span>
            </h3>
            <p>{t('documentation:documentationPage.roadmap.shortTerm.phase4Desc') || 'Launch decentralized marketplace with vendor onboarding'}</p>
            
            {expandedPhase === 'marketplace' && (
              <div className={styles.phaseDetails}>
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.marketplaceCore') || 'Core Features'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.vendorOnboarding') || 'Vendor onboarding and verification'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.productCatalog') || 'Decentralized product catalog with CRDT sync'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.orderManagement') || 'Multi-signature order management'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.justSplitPayments') || 'JustSplit integration for payments'}</li>
                </ul>
                
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.trustLayer') || 'Trust & Safety'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.reviewSystem') || 'Cryptographically signed review system'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.conciliationIntegration') || 'Conciliation system for dispute resolution'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.vendorBadges') || 'Community-verified vendor badges'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={styles.timelineItem} onClick={() => togglePhase('green')}>
          <div className={styles.timelineMarker}>
            <FaLeaf />
          </div>
          <div className={styles.timelineContent}>
            <h3>
              {t('documentation:documentationPage.roadmap.shortTerm.phase5Title') || 'Phase 5: Green Impact'}
              <span className={styles.timelineDate}>
                {t('documentation:documentationPage.roadmap.shortTerm.phase5Date') || 'Months 7-8'}
              </span>
            </h3>
            <p>{t('documentation:documentationPage.roadmap.shortTerm.phase5Desc') || 'Launch sustainability and wellness applications'}</p>
            
            {expandedPhase === 'green' && (
              <div className={styles.phaseDetails}>
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.greenApps') || 'Sustainability Suite'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.plantopia') || 'Plantopia - Smart gardening with IoT'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.ecotul') || 'EcoTul - Sustainable product recommendations'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.healthy') || 'Healthy - Wellness tracking community'}</li>
                </ul>
                
                <h4>{t('documentation:documentationPage.roadmap.shortTerm.infrastructure') || 'Infrastructure'}</h4>
                <ul>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.privacyLayer') || 'Privacy layer implementation'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.dataControls') || 'User data sovereignty controls'}</li>
                  <li>{t('documentation:documentationPage.roadmap.shortTerm.community') || 'Community workshop program'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLongTermTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.longTerm.title') || 'Long-Term Vision (1-10+ Years)'}</h2>
      
      <div className={styles.visionTimeline}>
        <div className={styles.visionPhase}>
          <div className={styles.visionHeader}>
            <FaBrain className={styles.visionIcon} />
            <div>
              <h3>{t('documentation:documentationPage.roadmap.longTerm.personalization') || 'Phase 5: Personalization'}</h3>
              <span className={styles.visionTime}>
                {t('documentation:documentationPage.roadmap.longTerm.personalizationTime') || 'Year 1-2'}
              </span>
            </div>
          </div>
          <p>{t('documentation:documentationPage.roadmap.longTerm.personalizationDesc') || 'Identity-based tools and personal digital empowerment'}</p>
          <div className={styles.visionFeatures}>
            <span className={styles.featureChip}>MyProjects</span>
            <span className={styles.featureChip}>DigitalMe</span>
            <span className={styles.featureChip}>Somos</span>
            <span className={styles.featureChip}>RememberMe</span>
          </div>
        </div>

        <div className={styles.visionPhase}>
          <div className={styles.visionHeader}>
            <FaGlobe className={styles.visionIcon} />
            <div>
              <h3>{t('documentation:documentationPage.roadmap.longTerm.platform') || 'Phase 6: Platform Integration'}</h3>
              <span className={styles.visionTime}>
                {t('documentation:documentationPage.roadmap.longTerm.platformTime') || 'Year 2-3'}
              </span>
            </div>
          </div>
          <p>{t('documentation:documentationPage.roadmap.longTerm.platformDesc') || 'Unified ecosystem with B2B capabilities and decentralized marketplace'}</p>
          <div className={styles.visionFeatures}>
            <span className={styles.featureChip}>B2B Integration</span>
            <span className={styles.featureChip}>One-Subscription</span>
            <span className={styles.featureChip}>P2P Marketplace</span>
            <span className={styles.featureChip}>API Gateway</span>
          </div>
        </div>

        <div className={styles.visionPhase}>
          <div className={styles.visionHeader}>
            <FaExchangeAlt className={styles.visionIcon} />
            <div>
              <h3>{t('documentation:documentationPage.roadmap.longTerm.transition') || 'Phase 7: Decentralized Transition'}</h3>
              <span className={styles.visionTime}>
                {t('documentation:documentationPage.roadmap.longTerm.transitionTime') || 'Year 5-10'}
              </span>
            </div>
          </div>
          <p>{t('documentation:documentationPage.roadmap.longTerm.transitionDesc') || 'Begin transition to decentralized architecture'}</p>
          <div className={styles.visionFeatures}>
            <span className={styles.featureChip}>DID System</span>
            <span className={styles.featureChip}>Zero-Knowledge</span>
            <span className={styles.featureChip}>P2P Prototype</span>
            <span className={styles.featureChip}>Hybrid Mode</span>
          </div>
        </div>

        <div className={styles.visionPhase}>
          <div className={styles.visionHeader}>
            <FaCoins className={styles.visionIcon} />
            <div>
              <h3>{t('documentation:documentationPage.roadmap.longTerm.decentralized') || 'Phase 8: Full Decentralization'}</h3>
              <span className={styles.visionTime}>
                {t('documentation:documentationPage.roadmap.longTerm.decentralizedTime') || 'Year 10+'}
              </span>
            </div>
          </div>
          <p>{t('documentation:documentationPage.roadmap.longTerm.decentralizedDesc') || 'Complete transition to decentralized ecosystem'}</p>
          <div className={styles.visionFeatures}>
            <span className={styles.featureChip}>Token Economy</span>
            <span className={styles.featureChip}>P2P Network</span>
            <span className={styles.featureChip}>DAO Governance</span>
            <span className={styles.featureChip}>100% Sovereignty</span>
          </div>
        </div>
      </div>

      <div className={styles.futureVision}>
        <h3>{t('documentation:documentationPage.roadmap.longTerm.ultimateVision') || 'The Ultimate Vision'}</h3>
        <div className={styles.visionCard}>
          <p>
            {t('documentation:documentationPage.roadmap.longTerm.visionStatement') || 
            'By 2040, CyberEco will be a fully decentralized ecosystem where users have complete sovereignty over their digital lives. Mobile devices form a global P2P network, data is encrypted and user-controlled, and participation is rewarded through a sustainable token economy.'}
          </p>
          <div className={styles.visionMetrics}>
            <div className={styles.visionMetric}>
              <span className={styles.metricValue}>100%</span>
              <span className={styles.metricLabel}>
                {t('documentation:documentationPage.roadmap.longTerm.dataSovereignty') || 'Data Sovereignty'}
              </span>
            </div>
            <div className={styles.visionMetric}>
              <span className={styles.metricValue}>1M+</span>
              <span className={styles.metricLabel}>
                {t('documentation:documentationPage.roadmap.longTerm.activeNodes') || 'Active Nodes'}
              </span>
            </div>
            <div className={styles.visionMetric}>
              <span className={styles.metricValue}>Zero</span>
              <span className={styles.metricLabel}>
                {t('documentation:documentationPage.roadmap.longTerm.centralPoints') || 'Central Points'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetricsTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.metrics.title') || 'Success Metrics & Milestones'}</h2>
      
      <div className={styles.metricsOverview}>
        <p>
          {t('documentation:documentationPage.roadmap.metrics.overview') || 
          'Clear, measurable goals for each phase ensure we stay on track and deliver value to our community.'}
        </p>
      </div>

      <div className={styles.metricsPhases}>
        <div className={styles.metricPhase}>
          <h3>
            <FaChartLine className={styles.phaseIcon} />
            {t('documentation:documentationPage.roadmap.metrics.nearTerm') || 'Near-Term Metrics (2025-2026)'}
          </h3>
          
          <div className={styles.metricCards}>
            <div className={styles.metricCard}>
              <h4>{t('documentation:documentationPage.roadmap.metrics.technical') || 'Technical Excellence'}</h4>
              <ul>
                <li>{t('documentation:documentationPage.roadmap.metrics.zeroErrors') || 'Zero runtime errors'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.coverage') || '70%+ test coverage'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.lighthouse') || '90+ Lighthouse score'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.cicd') || 'Automated CI/CD'}</li>
              </ul>
            </div>
            
            <div className={styles.metricCard}>
              <h4>{t('documentation:documentationPage.roadmap.metrics.userGrowth') || 'User Growth'}</h4>
              <ul>
                <li>{t('documentation:documentationPage.roadmap.metrics.activeUsers') || '500+ active users'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.retention') || '60% monthly retention'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.satisfaction') || '4.5+ user satisfaction'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.contributors') || '10+ contributors'}</li>
              </ul>
            </div>
            
            <div className={styles.metricCard}>
              <h4>{t('documentation:documentationPage.roadmap.metrics.ecosystem') || 'Ecosystem Health'}</h4>
              <ul>
                <li>{t('documentation:documentationPage.roadmap.metrics.apps') || '3 production apps'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.integrations') || 'Cross-app integration'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.documentation') || 'Complete documentation'}</li>
                <li>{t('documentation:documentationPage.roadmap.metrics.community') || 'Active community'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.metricPhase}>
          <h3>
            <FaRocket className={styles.phaseIcon} />
            {t('documentation:documentationPage.roadmap.metrics.midTerm') || 'Mid-Term Goals (2027-2030)'}
          </h3>
          
          <div className={styles.goalGrid}>
            <div className={styles.goalCard}>
              <div className={styles.goalValue}>50K+</div>
              <div className={styles.goalLabel}>
                {t('documentation:documentationPage.roadmap.metrics.globalUsers') || 'Global Users'}
              </div>
            </div>
            
            <div className={styles.goalCard}>
              <div className={styles.goalValue}>15+</div>
              <div className={styles.goalLabel}>
                {t('documentation:documentationPage.roadmap.metrics.applications') || 'Applications'}
              </div>
            </div>
            
            <div className={styles.goalCard}>
              <div className={styles.goalValue}>100%</div>
              <div className={styles.goalLabel}>
                {t('documentation:documentationPage.roadmap.metrics.sustainable') || 'Sustainable'}
              </div>
            </div>
            
            <div className={styles.goalCard}>
              <div className={styles.goalValue}>20+</div>
              <div className={styles.goalLabel}>
                {t('documentation:documentationPage.roadmap.metrics.partnerships') || 'Partnerships'}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.metricPhase}>
          <h3>
            <FaGlobe className={styles.phaseIcon} />
            {t('documentation:documentationPage.roadmap.metrics.longTerm') || 'Long-Term Vision (2035+)'}
          </h3>
          
          <div className={styles.visionMetrics}>
            <div className={styles.visionMetricCard}>
              <FaMobileAlt className={styles.metricIcon} />
              <h4>{t('documentation:documentationPage.roadmap.metrics.p2pNetwork') || 'P2P Network'}</h4>
              <p>{t('documentation:documentationPage.roadmap.metrics.p2pDesc') || '1M+ mobile nodes forming global network'}</p>
            </div>
            
            <div className={styles.visionMetricCard}>
              <FaLock className={styles.metricIcon} />
              <h4>{t('documentation:documentationPage.roadmap.metrics.privacy') || 'Complete Privacy'}</h4>
              <p>{t('documentation:documentationPage.roadmap.metrics.privacyDesc') || 'Zero data breaches, 100% user control'}</p>
            </div>
            
            <div className={styles.visionMetricCard}>
              <FaCoins className={styles.metricIcon} />
              <h4>{t('documentation:documentationPage.roadmap.metrics.tokenEconomy') || 'Token Economy'}</h4>
              <p>{t('documentation:documentationPage.roadmap.metrics.tokenDesc') || 'Self-sustaining economic model'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContributeTab = () => (
    <div className={styles.tabSection}>
      <h2>{t('documentation:documentationPage.roadmap.contribute.title') || 'How to Contribute'}</h2>
      
      <div className={styles.contributeIntro}>
        <p>
          {t('documentation:documentationPage.roadmap.contribute.intro') || 
          'CyberEco is an open-source project, and we welcome contributions from developers, designers, and community members worldwide. Here\'s how you can help shape the future of digital sovereignty.'}
        </p>
      </div>

      <div className={styles.contributionPaths}>
        <div className={styles.contributionPath}>
          <div className={styles.pathHeader}>
            <FaCode className={styles.pathIcon} />
            <h3>{t('documentation:documentationPage.roadmap.contribute.developers') || 'For Developers'}</h3>
          </div>
          
          <div className={styles.pathSteps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h4>{t('documentation:documentationPage.roadmap.contribute.pickIssue') || 'Pick an Issue'}</h4>
                <p>{t('documentation:documentationPage.roadmap.contribute.pickIssueDesc') || 'Browse our GitHub issues labeled "good first issue" or "help wanted"'}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h4>{t('documentation:documentationPage.roadmap.contribute.forkClone') || 'Fork & Clone'}</h4>
                <p>{t('documentation:documentationPage.roadmap.contribute.forkCloneDesc') || 'Fork the repository and clone it to your local machine'}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h4>{t('documentation:documentationPage.roadmap.contribute.createBranch') || 'Create Branch'}</h4>
                <p>{t('documentation:documentationPage.roadmap.contribute.createBranchDesc') || 'Create a feature branch: git checkout -b feature/your-feature'}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <span className={styles.stepNumber}>4</span>
              <div>
                <h4>{t('documentation:documentationPage.roadmap.contribute.submitPR') || 'Submit PR'}</h4>
                <p>{t('documentation:documentationPage.roadmap.contribute.submitPRDesc') || 'Push your changes and create a pull request with clear description'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contributionPath}>
          <div className={styles.pathHeader}>
            <FaLightbulb className={styles.pathIcon} />
            <h3>{t('documentation:documentationPage.roadmap.contribute.community') || 'For Community Members'}</h3>
          </div>
          
          <div className={styles.communityWays}>
            <div className={styles.wayCard}>
              <h4>{t('documentation:documentationPage.roadmap.contribute.feedback') || 'Provide Feedback'}</h4>
              <p>{t('documentation:documentationPage.roadmap.contribute.feedbackDesc') || 'Test applications and report bugs or suggest improvements'}</p>
            </div>
            
            <div className={styles.wayCard}>
              <h4>{t('documentation:documentationPage.roadmap.contribute.documentation') || 'Improve Documentation'}</h4>
              <p>{t('documentation:documentationPage.roadmap.contribute.documentationDesc') || 'Help write guides, tutorials, and translate content'}</p>
            </div>
            
            <div className={styles.wayCard}>
              <h4>{t('documentation:documentationPage.roadmap.contribute.spread') || 'Spread the Word'}</h4>
              <p>{t('documentation:documentationPage.roadmap.contribute.spreadDesc') || 'Share CyberEco with others who value digital privacy'}</p>
            </div>
            
            <div className={styles.wayCard}>
              <h4>{t('documentation:documentationPage.roadmap.contribute.ideas') || 'Share Ideas'}</h4>
              <p>{t('documentation:documentationPage.roadmap.contribute.ideasDesc') || 'Propose new features in GitHub discussions'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contributionResources}>
        <h3>{t('documentation:documentationPage.roadmap.contribute.resources') || 'Contribution Resources'}</h3>
        <div className={styles.resourceLinks}>
          <a href="https://github.com/CyberEco/monorepo" className={styles.resourceLink}>
            <FaCode />
            <span>{t('documentation:documentationPage.roadmap.contribute.github') || 'GitHub Repository'}</span>
          </a>
          <Link href="/documentation/development" className={styles.resourceLink}>
            <FaGraduationCap />
            <span>{t('documentation:documentationPage.roadmap.contribute.devGuide') || 'Developer Guide'}</span>
          </Link>
          <a href="https://discord.gg/cybereco" className={styles.resourceLink}>
            <FaUsers />
            <span>{t('documentation:documentationPage.roadmap.contribute.discord') || 'Discord Community'}</span>
          </a>
        </div>
      </div>
    </div>
  );

  // Define tabs for the roadmap page
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.roadmap.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'current',
      label: t('documentation:documentationPage.roadmap.tabs.currentStatus') || 'Current Status',
      content: renderCurrentStatusTab()
    },
    {
      id: 'shortTerm',
      label: t('documentation:documentationPage.roadmap.tabs.shortTerm') || 'Short-Term',
      content: renderShortTermTab()
    },
    {
      id: 'longTerm',
      label: t('documentation:documentationPage.roadmap.tabs.longTerm') || 'Long-Term',
      content: renderLongTermTab()
    },
    {
      id: 'metrics',
      label: t('documentation:documentationPage.roadmap.tabs.metrics') || 'Metrics',
      content: renderMetricsTab()
    },
    {
      id: 'contribute',
      label: t('documentation:documentationPage.roadmap.tabs.contribute') || 'Contribute',
      content: renderContributeTab()
    }
  ];

  return (
    <div className={styles.container}>
      <DocumentationHero
        icon={<FaRocket />}
        title={t('documentation:documentationPage.roadmap.title') || 'Development Roadmap'}
        subtitle={t('documentation:documentationPage.roadmap.subtitle') || 
          'Our phased approach to building a decentralized, human-centered digital ecosystem'}
        gradient="linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
      />

      <DocumentationTabs
        tabs={tabs}
        defaultTab="overview"
      />

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{t('documentation:documentationPage.roadmap.relatedDocs') || 'Related Documentation'}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/documentation/vision">
                  <FaLightbulb /> {t('documentation:documentationPage.roadmap.visionDoc') || 'Vision & Future'}
                </Link>
              </li>
              <li>
                <Link href="/documentation/philosophy">
                  <FaGraduationCap /> {t('documentation:documentationPage.roadmap.philosophyDoc') || 'Core Philosophy'}
                </Link>
              </li>
              <li>
                <Link href="/documentation/architecture">
                  <FaCubes /> {t('documentation:documentationPage.roadmap.architectureDoc') || 'System Architecture'}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t('documentation:documentationPage.roadmap.getStarted') || 'Get Started'}</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/documentation/development">
                  <FaCode /> {t('documentation:documentationPage.roadmap.setupGuide') || 'Development Setup'}
                </Link>
              </li>
              <li>
                <a href="https://github.com/CyberEco/monorepo" target="_blank" rel="noopener noreferrer">
                  <FaGlobe /> {t('documentation:documentationPage.roadmap.viewGithub') || 'View on GitHub'}
                </a>
              </li>
              <li>
                <Link href="/community">
                  <FaUsers /> {t('documentation:documentationPage.roadmap.joinCommunity') || 'Join Community'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}