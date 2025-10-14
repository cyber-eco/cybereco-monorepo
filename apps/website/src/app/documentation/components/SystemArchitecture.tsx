'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaDatabase, FaLock, FaServer, FaCloud, FaMobile, FaChevronRight } from 'react-icons/fa';

export function SystemArchitecture() {
  const { t } = useI18n();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🏗️ {t('documentationPage.systemArchitectureTitle') || 'System Architecture'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.systemArchitectureIntro') || 'CyberEco is built on a modern, scalable architecture designed for privacy, performance, and extensibility.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>📐 {t('documentationPage.architectureOverviewTitle') || 'Architecture Overview'}</h4>
        <div className={styles.architectureDiagram}>
          <div className={styles.architectureLayer}>
            <div className={styles.layerHeader}>
              <FaMobile className={styles.layerIcon} />
              <h5>{t('documentationPage.clientLayer') || 'Client Layer'}</h5>
            </div>
            <div className={styles.layerComponents}>
              <div className={styles.componentChip}>Next.js Apps</div>
              <div className={styles.componentChip}>React Components</div>
              <div className={styles.componentChip}>PWA Support</div>
              <div className={styles.componentChip}>Service Workers</div>
            </div>
          </div>

          <div className={styles.architectureLayer}>
            <div className={styles.layerHeader}>
              <FaServer className={styles.layerIcon} />
              <h5>{t('documentationPage.applicationLayer') || 'Application Layer'}</h5>
            </div>
            <div className={styles.layerComponents}>
              <div className={styles.componentChip}>Hub (Auth)</div>
              <div className={styles.componentChip}>JustSplit</div>
              <div className={styles.componentChip}>Somos</div>
              <div className={styles.componentChip}>Demos</div>
              <div className={styles.componentChip}>Gateway Proxy</div>
            </div>
          </div>

          <div className={styles.architectureLayer}>
            <div className={styles.layerHeader}>
              <FaCloud className={styles.layerIcon} />
              <h5>{t('documentationPage.serviceLayer') || 'Service Layer'}</h5>
            </div>
            <div className={styles.layerComponents}>
              <div className={styles.componentChip}>Firebase Auth</div>
              <div className={styles.componentChip}>Firestore DB</div>
              <div className={styles.componentChip}>Cloud Functions</div>
              <div className={styles.componentChip}>Storage</div>
            </div>
          </div>

          <div className={styles.architectureLayer}>
            <div className={styles.layerHeader}>
              <FaDatabase className={styles.layerIcon} />
              <h5>{t('documentationPage.dataLayer') || 'Data Layer'}</h5>
            </div>
            <div className={styles.layerComponents}>
              <div className={styles.componentChip}>User Data</div>
              <div className={styles.componentChip}>App Data</div>
              <div className={styles.componentChip}>Encrypted Storage</div>
              <div className={styles.componentChip}>Backup Systems</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔐 {t('documentationPage.securityArchitectureTitle') || 'Security Architecture'}</h4>
        <div className={styles.securityGrid}>
          <div className={styles.securityCard}>
            <FaLock className={styles.securityIcon} />
            <h5>{t('documentationPage.authenticationSecurity') || 'Authentication & Authorization'}</h5>
            <ul className={styles.securityList}>
              <li>{t('documentationPage.jwtTokens') || 'JWT tokens with refresh mechanism'}</li>
              <li>{t('documentationPage.ssoSupport') || 'Single Sign-On across all apps'}</li>
              <li>{t('documentationPage.twoFactorAuth') || 'Two-factor authentication'}</li>
              <li>{t('documentationPage.rbacSystem') || 'Role-based access control'}</li>
            </ul>
          </div>

          <div className={styles.securityCard}>
            <FaLock className={styles.securityIcon} />
            <h5>{t('documentationPage.dataProtection') || 'Data Protection'}</h5>
            <ul className={styles.securityList}>
              <li>{t('documentationPage.e2eEncryption') || 'End-to-end encryption for sensitive data'}</li>
              <li>{t('documentationPage.atRestEncryption') || 'Encryption at rest in databases'}</li>
              <li>{t('documentationPage.transitEncryption') || 'TLS 1.3 for data in transit'}</li>
              <li>{t('documentationPage.gdprCompliance') || 'GDPR-compliant data handling'}</li>
            </ul>
          </div>

          <div className={styles.securityCard}>
            <FaLock className={styles.securityIcon} />
            <h5>{t('documentationPage.privacyFeatures') || 'Privacy Features'}</h5>
            <ul className={styles.securityList}>
              <li>{t('documentationPage.dataMinimization') || 'Data minimization principles'}</li>
              <li>{t('documentationPage.userConsent') || 'Explicit user consent management'}</li>
              <li>{t('documentationPage.dataExport') || 'Data export and portability'}</li>
              <li>{t('documentationPage.rightToErasure') || 'Right to erasure implementation'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>⚡ {t('documentationPage.performanceArchitectureTitle') || 'Performance Architecture'}</h4>
        <div className={styles.performanceSection}>
          <div className={styles.performanceMetrics}>
            <div className={styles.metricCard}>
              <h5>{t('documentationPage.cachingStrategy') || 'Caching Strategy'}</h5>
              <p>{t('documentationPage.cachingStrategyDesc') || 'Multi-level caching with CDN, service workers, and browser cache'}</p>
              <div className={styles.metricValue}>{'< 50ms'}</div>
              <span className={styles.metricLabel}>{t('documentationPage.cacheResponseTime') || 'Cache response time'}</span>
            </div>

            <div className={styles.metricCard}>
              <h5>{t('documentationPage.loadBalancing') || 'Load Balancing'}</h5>
              <p>{t('documentationPage.loadBalancingDesc') || 'Automatic scaling with Firebase hosting and cloud functions'}</p>
              <div className={styles.metricValue}>99.9%</div>
              <span className={styles.metricLabel}>{t('documentationPage.uptime') || 'Uptime SLA'}</span>
            </div>

            <div className={styles.metricCard}>
              <h5>{t('documentationPage.codeOptimization') || 'Code Optimization'}</h5>
              <p>{t('documentationPage.codeOptimizationDesc') || 'Tree shaking, code splitting, and lazy loading'}</p>
              <div className={styles.metricValue}>{'< 2s'}</div>
              <span className={styles.metricLabel}>{t('documentationPage.pageLoadTime') || 'Page load time'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔄 {t('documentationPage.dataFlowTitle') || 'Data Flow Architecture'}</h4>
        <div className={styles.dataFlowDiagram}>
          <div className={styles.flowStep}>
            <div className={styles.flowNumber}>1</div>
            <div className={styles.flowContent}>
              <h5>{t('documentationPage.userRequest') || 'User Request'}</h5>
              <p>{t('documentationPage.userRequestDesc') || 'Client sends request through secure HTTPS connection'}</p>
            </div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowNumber}>2</div>
            <div className={styles.flowContent}>
              <h5>{t('documentationPage.gatewayProcessing') || 'Gateway Processing'}</h5>
              <p>{t('documentationPage.gatewayProcessingDesc') || 'Authentication verification and request routing'}</p>
            </div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowNumber}>3</div>
            <div className={styles.flowContent}>
              <h5>{t('documentationPage.businessLogic') || 'Business Logic'}</h5>
              <p>{t('documentationPage.businessLogicDesc') || 'Application processes request with proper authorization'}</p>
            </div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowNumber}>4</div>
            <div className={styles.flowContent}>
              <h5>{t('documentationPage.dataAccess') || 'Data Access'}</h5>
              <p>{t('documentationPage.dataAccessDesc') || 'Secure database operations with encryption'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🌐 {t('documentationPage.deploymentArchitectureTitle') || 'Deployment Architecture'}</h4>
        <div className={styles.deploymentGrid}>
          <div className={styles.deploymentCard}>
            <h5>{t('documentationPage.productionEnvironment') || 'Production Environment'}</h5>
            <p>{t('documentationPage.productionEnvironmentDesc') || 'Multi-region deployment with automatic failover'}</p>
            <ul className={styles.deploymentList}>
              <li>{t('documentationPage.firebaseHosting') || 'Firebase Hosting with CDN'}</li>
              <li>{t('documentationPage.autoScaling') || 'Auto-scaling cloud functions'}</li>
              <li>{t('documentationPage.globalDistribution') || 'Global edge distribution'}</li>
            </ul>
          </div>

          <div className={styles.deploymentCard}>
            <h5>{t('documentationPage.developmentEnvironment') || 'Development Environment'}</h5>
            <p>{t('documentationPage.developmentEnvironmentDesc') || 'Local emulators for rapid development'}</p>
            <ul className={styles.deploymentList}>
              <li>{t('documentationPage.firebaseEmulators') || 'Firebase emulator suite'}</li>
              <li>{t('documentationPage.hotReloading') || 'Hot module reloading'}</li>
              <li>{t('documentationPage.localTesting') || 'Local testing environment'}</li>
            </ul>
          </div>

          <div className={styles.deploymentCard}>
            <h5>{t('documentationPage.cicdPipeline') || 'CI/CD Pipeline'}</h5>
            <p>{t('documentationPage.cicdPipelineDesc') || 'Automated testing and deployment workflow'}</p>
            <ul className={styles.deploymentList}>
              <li>{t('documentationPage.automatedTesting') || 'Automated test suites'}</li>
              <li>{t('documentationPage.stagingDeployment') || 'Staging environment validation'}</li>
              <li>{t('documentationPage.rollbackCapability') || 'One-click rollback capability'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.architectureResources}>
          <h4>{t('documentationPage.architectureResourcesTitle') || '📚 Architecture Resources'}</h4>
          <div className={styles.resourceLinks}>
            <a href="#" className={styles.architectureLink}>
              {t('documentationPage.detailedDiagrams') || 'Detailed Architecture Diagrams'} <FaChevronRight />
            </a>
            <a href="#" className={styles.architectureLink}>
              {t('documentationPage.scalingGuide') || 'Scaling Guide'} <FaChevronRight />
            </a>
            <a href="#" className={styles.architectureLink}>
              {t('documentationPage.securityWhitepaper') || 'Security Whitepaper'} <FaChevronRight />
            </a>
            <a href="#" className={styles.architectureLink}>
              {t('documentationPage.performanceBenchmarks') || 'Performance Benchmarks'} <FaChevronRight />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}