'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaNetworkWired, FaShieldAlt, FaCode, FaChevronRight } from 'react-icons/fa';

export function HubGateway() {
  const { t } = useI18n();

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🌐 {t('documentationPage.hubGatewayTitle') || 'Hub Gateway Architecture'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.hubGatewayIntro') || 'The Hub Gateway is a critical component that enables Single Sign-On (SSO) across all CyberEco applications by solving cross-port authentication challenges.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🎯 {t('documentationPage.problemSolutionTitle') || 'Problem & Solution'}</h4>
        <div className={styles.problemSolutionGrid}>
          <div className={styles.problemCard}>
            <h5>{t('documentationPage.theProblem') || '❌ The Problem'}</h5>
            <p>{t('documentationPage.problemDesc') || 'Firebase Auth tokens are tied to the origin (protocol + domain + port). Apps running on different ports cannot share authentication state, breaking the SSO experience.'}</p>
            <div className={styles.problemExample}>
              <code>hub.localhost:40000</code>
              <span className={styles.notEqual}>≠</span>
              <code>justsplit.localhost:40002</code>
            </div>
          </div>

          <div className={styles.solutionCard}>
            <h5>{t('documentationPage.theSolution') || '✅ The Solution'}</h5>
            <p>{t('documentationPage.solutionDesc') || 'Gateway proxies all apps through a single port (3000), maintaining one auth origin while routing to different applications internally.'}</p>
            <div className={styles.solutionExample}>
              <code>localhost:3000/hub</code>
              <span className={styles.equals}>=</span>
              <code>localhost:3000/justsplit</code>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔄 {t('documentationPage.howItWorksTitle') || 'How It Works'}</h4>
        <div className={styles.gatewayFlow}>
          <div className={styles.flowDiagram}>
            <div className={styles.userBox}>
              <FaNetworkWired />
              <span>{t('documentationPage.userBrowser') || 'User Browser'}</span>
            </div>
            
            <div className={styles.flowArrowDown}>↓</div>
            
            <div className={styles.gatewayBox}>
              <FaShieldAlt />
              <span>{t('documentationPage.gatewayProxy') || 'Gateway (Port 3000)'}</span>
              <div className={styles.gatewayRoutes}>
                <div className={styles.route}>
                  <code>/hub/*</code> → <code>40000</code>
                </div>
                <div className={styles.route}>
                  <code>/website/*</code> → <code>40001</code>
                </div>
                <div className={styles.route}>
                  <code>/justsplit/*</code> → <code>40002</code>
                </div>
              </div>
            </div>
            
            <div className={styles.flowArrowDown}>↓</div>
            
            <div className={styles.appsContainer}>
              <div className={styles.appBox}>Hub App</div>
              <div className={styles.appBox}>Website</div>
              <div className={styles.appBox}>JustSplit</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>⚙️ {t('documentationPage.configurationTitle') || 'Configuration'}</h4>
        <div className={styles.configSection}>
          <h5>{t('documentationPage.routeConfigTitle') || 'Route Configuration'}</h5>
          <div className={styles.codeExample}>
            <pre className={styles.codeBlock}>
{`// Gateway route configuration
const routes = {
  beforeFiles: [
    // Auth routes (highest priority)
    { source: '/auth/:path*', destination: 'http://localhost:40000/auth/:path*' },
    { source: '/api/auth/:path*', destination: 'http://localhost:40000/api/auth/:path*' },
  ],
  afterFiles: [
    // App-specific routes
    { source: '/hub/:path*', destination: 'http://localhost:40000/:path*' },
    { source: '/website/:path*', destination: 'http://localhost:40001/:path*' },
    { source: '/justsplit/:path*', destination: 'http://localhost:40002/:path*' },
  ],
  fallback: [
    // Default redirect
    { source: '/', destination: '/website' }
  ]
};`}</pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🚀 {t('documentationPage.implementationTitle') || 'Implementation Details'}</h4>
        <div className={styles.implementationGrid}>
          <div className={styles.implementationCard}>
            <FaCode className={styles.implementationIcon} />
            <h5>{t('documentationPage.developmentMode') || 'Development Mode'}</h5>
            <p>{t('documentationPage.developmentModeDesc') || 'Uses Next.js rewrites to proxy requests during local development.'}</p>
            <ul className={styles.implementationList}>
              <li>{t('documentationPage.noExtraProcess') || 'No extra process required'}</li>
              <li>{t('documentationPage.hotReload') || 'Hot reload support'}</li>
              <li>{t('documentationPage.debugFriendly') || 'Debug-friendly setup'}</li>
            </ul>
          </div>

          <div className={styles.implementationCard}>
            <FaCode className={styles.implementationIcon} />
            <h5>{t('documentationPage.productionMode') || 'Production Mode'}</h5>
            <p>{t('documentationPage.productionModeDesc') || 'Uses subdomain-based routing with shared cookies across domains.'}</p>
            <ul className={styles.implementationList}>
              <li>{t('documentationPage.subdomainRouting') || 'hub.cybere.co, justsplit.cybere.co'}</li>
              <li>{t('documentationPage.sharedAuthCookies') || 'Shared auth cookies'}</li>
              <li>{t('documentationPage.cdnOptimized') || 'CDN-optimized delivery'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔑 {t('documentationPage.keyFeaturesTitle') || 'Key Features'}</h4>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <h5>{t('documentationPage.centralizedAuth') || 'Centralized Authentication'}</h5>
            <p>{t('documentationPage.centralizedAuthDesc') || 'All auth flows go through Hub, ensuring consistent user experience.'}</p>
          </div>
          <div className={styles.featureItem}>
            <h5>{t('documentationPage.transparentRouting') || 'Transparent Routing'}</h5>
            <p>{t('documentationPage.transparentRoutingDesc') || 'Users see clean URLs while gateway handles internal routing.'}</p>
          </div>
          <div className={styles.featureItem}>
            <h5>{t('documentationPage.sessionPersistence') || 'Session Persistence'}</h5>
            <p>{t('documentationPage.sessionPersistenceDesc') || 'Auth state persists across all applications seamlessly.'}</p>
          </div>
          <div className={styles.featureItem}>
            <h5>{t('documentationPage.performanceOptimized') || 'Performance Optimized'}</h5>
            <p>{t('documentationPage.performanceOptimizedDesc') || 'Minimal overhead with intelligent caching and routing.'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>💻 {t('documentationPage.developerGuideTitle') || 'Developer Guide'}</h4>
        <div className={styles.developerSteps}>
          <div className={styles.devStep}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>1</div>
              <h5>{t('documentationPage.accessAppsTitle') || 'Accessing Apps Through Gateway'}</h5>
            </div>
            <p>{t('documentationPage.accessAppsDesc') || 'Always access apps through the gateway URL in development:'}</p>
            <div className={styles.urlExamples}>
              <code>http://localhost:3000/hub</code>
              <code>http://localhost:3000/justsplit</code>
              <code>http://localhost:3000/website</code>
            </div>
          </div>

          <div className={styles.devStep}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>2</div>
              <h5>{t('documentationPage.handlingLinksTitle') || 'Handling Internal Links'}</h5>
            </div>
            <p>{t('documentationPage.handlingLinksDesc') || 'Use relative paths or the gateway-aware link component:'}</p>
            <pre className={styles.codeBlock}>
{`// ✅ Good: Relative path
<Link href="/dashboard">Dashboard</Link>

// ✅ Good: Gateway-aware navigation
<Link href="/justsplit/expenses">View Expenses</Link>

// ❌ Bad: Direct port reference
<Link href="http://localhost:40002/expenses">Bad Link</Link>`}</pre>
          </div>

          <div className={styles.devStep}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>3</div>
              <h5>{t('documentationPage.apiCallsTitle') || 'Making API Calls'}</h5>
            </div>
            <p>{t('documentationPage.apiCallsDesc') || 'API calls should use relative paths or environment variables:'}</p>
            <pre className={styles.codeBlock}>
{`// ✅ Good: Relative API call
const response = await fetch('/api/auth/user');

// ✅ Good: Environment-based URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const response = await fetch(\`\${API_URL}/api/data\`);`}</pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.troubleshootingBox}>
          <h4>{t('documentationPage.commonIssuesTitle') || '⚠️ Common Issues'}</h4>
          <div className={styles.issuesList}>
            <div className={styles.issueItem}>
              <strong>{t('documentationPage.authNotPersisting') || 'Auth not persisting:'}</strong>
              <p>{t('documentationPage.authNotPersistingFix') || 'Ensure you\'re accessing apps through the gateway URL, not direct ports.'}</p>
            </div>
            <div className={styles.issueItem}>
              <strong>{t('documentationPage.corsErrors') || 'CORS errors:'}</strong>
              <p>{t('documentationPage.corsErrorsFix') || 'Check that API calls use relative paths or proper CORS headers are configured.'}</p>
            </div>
            <div className={styles.issueItem}>
              <strong>{t('documentationPage.routingIssues') || 'Routing issues:'}</strong>
              <p>{t('documentationPage.routingIssuesFix') || 'Verify gateway is running and route configuration matches your app structure.'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.resourcesBox}>
          <h4>{t('documentationPage.additionalResourcesTitle') || '📚 Additional Resources'}</h4>
          <div className={styles.resourceGrid}>
            <a href="/documentation/sso-integration" className={styles.resourceLink}>
              {t('documentationPage.ssoImplementation') || 'SSO Implementation Guide'} <FaChevronRight />
            </a>
            <a href="/documentation/authentication" className={styles.resourceLink}>
              {t('documentationPage.authenticationDocs') || 'Authentication Documentation'} <FaChevronRight />
            </a>
            <a href="#" className={styles.resourceLink}>
              {t('documentationPage.gatewayAPI') || 'Gateway API Reference'} <FaChevronRight />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}