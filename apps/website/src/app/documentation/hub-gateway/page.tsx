'use client';

import React from 'react';
import Link from 'next/link';
import { FaNetworkWired, FaLock, FaRocket, FaCode, FaServer } from 'react-icons/fa';
import { FaHubspot as FaHub } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from '../page.module.css';

export default function HubGatewayDocumentation() {
  const { t } = useI18n();

  const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => (
    <div className={styles.codeSection}>
      <div className={styles.codeTitle}>{language}</div>
      <pre style={{ margin: 0, padding: '1rem', overflow: 'auto' }}>
        <code>{code}</code>
      </pre>
    </div>
  );

  const renderOverviewTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>
          {t('documentation:hubGateway.overview.title') || 'Hub: Your Gateway to CyberEco'}
        </h3>
        <p>
          {t('documentation:hubGateway.overview.description') || 
          'The Hub serves as both the authentication center and intelligent proxy for the entire CyberEco ecosystem, providing seamless access to all applications through a single entry point.'}
        </p>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaLock className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.overview.ssoTitle') || 'Single Sign-On'}</h3>
            <p>{t('documentation:hubGateway.overview.ssoDesc') || 'Authenticate once and access all CyberEco applications seamlessly'}</p>
          </div>

          <div className={styles.featureCard}>
            <FaNetworkWired className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.overview.proxyTitle') || 'Intelligent Proxy'}</h3>
            <p>{t('documentation:hubGateway.overview.proxyDesc') || 'Routes requests to appropriate applications while maintaining authentication'}</p>
          </div>

          <div className={styles.featureCard}>
            <FaRocket className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.overview.discoveryTitle') || 'App Discovery'}</h3>
            <p>{t('documentation:hubGateway.overview.discoveryDesc') || 'Beautiful landing page showcasing all available CyberEco applications'}</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3>{t('documentation:hubGateway.overview.accessTitle') || 'Access Points'}</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t('documentation:hubGateway.overview.appCol') || 'Application'}</th>
              <th>{t('documentation:hubGateway.overview.localCol') || 'Local Access'}</th>
              <th>{t('documentation:hubGateway.overview.proxyCol') || 'Via Hub Proxy'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hub</td>
              <td><code>http://localhost:40000</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td>JustSplit</td>
              <td><code>http://localhost:40002</code></td>
              <td><code>http://localhost:40000/app/justsplit</code></td>
            </tr>
            <tr>
              <td>Website</td>
              <td><code>http://localhost:40001</code></td>
              <td><code>http://localhost:40000/app/website</code></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );

  const renderArchitectureTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>
          {t('documentation:hubGateway.architecture.title') || 'Gateway Architecture'}
        </h3>

        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.architecture.userRequest') || 'User Request'}</h4>
              <p>{t('documentation:hubGateway.architecture.userRequestDesc') || 'User accesses Hub or proxied app URL'}</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.architecture.middleware') || 'Middleware'}</h4>
              <p>{t('documentation:hubGateway.architecture.middlewareDesc') || 'Next.js middleware analyzes request path'}</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.architecture.authCheck') || 'Auth Check'}</h4>
              <p>{t('documentation:hubGateway.architecture.authCheckDesc') || 'Verifies user authentication status'}</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.architecture.routing') || 'Routing'}</h4>
              <p>{t('documentation:hubGateway.architecture.routingDesc') || 'Routes to app or shows landing page'}</p>
            </div>
          </div>
        </div>

        <h3>{t('documentation:hubGateway.architecture.middlewareTitle') || 'Middleware Configuration'}</h3>
        <CodeBlock
          language="typescript"
          code={`// apps/hub/src/middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Proxy routes for apps
  if (pathname.startsWith('/app/')) {
    const appName = pathname.split('/')[2];
    
    // Add authentication token to proxied requests
    const headers = new Headers(request.headers);
    headers.set('x-hub-proxy', 'true');
    
    return NextResponse.rewrite(
      new URL(pathname, request.url),
      { headers }
    );
  }
  
  // Show landing page for unauthenticated root access
  if (pathname === '/' && !isAuthenticated(request)) {
    return NextResponse.rewrite(
      new URL('/landing', request.url)
    );
  }
}`}
        />
      </section>
    </>
  );

  const renderProxyFeaturesTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>
          {t('documentation:hubGateway.proxy.title') || 'Proxy Features'}
        </h3>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaNetworkWired className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.proxy.routingTitle') || 'Intelligent Routing'}</h3>
            <ul>
              <li>{t('documentation:hubGateway.proxy.routing1') || 'Path-based routing to different applications'}</li>
              <li>{t('documentation:hubGateway.proxy.routing2') || 'Automatic authentication token injection'}</li>
              <li>{t('documentation:hubGateway.proxy.routing3') || 'Request/response header manipulation'}</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <FaLock className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.proxy.securityTitle') || 'Security Features'}</h3>
            <ul>
              <li>{t('documentation:hubGateway.proxy.security1') || 'CORS handling for cross-origin requests'}</li>
              <li>{t('documentation:hubGateway.proxy.security2') || 'Security headers (CSP, X-Frame-Options)'}</li>
              <li>{t('documentation:hubGateway.proxy.security3') || 'Authentication verification'}</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <FaRocket className={styles.featureIcon} />
            <h3>{t('documentation:hubGateway.proxy.performanceTitle') || 'Performance'}</h3>
            <ul>
              <li>{t('documentation:hubGateway.proxy.performance1') || 'Request caching for static assets'}</li>
              <li>{t('documentation:hubGateway.proxy.performance2') || 'Automatic compression'}</li>
              <li>{t('documentation:hubGateway.proxy.performance3') || 'Connection pooling'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3>{t('documentation:hubGateway.proxy.configTitle') || 'Proxy Configuration'}</h3>
        <CodeBlock
          language="javascript"
          code={`// apps/hub/next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/app/justsplit/:path*',
        destination: 'http://localhost:40002/:path*',
      },
      {
        source: '/app/website/:path*',
        destination: 'http://localhost:40001/:path*',
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};`}
        />
      </section>
    </>
  );

  const renderDeploymentTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>
          {t('documentation:hubGateway.deployment.title') || 'Deployment Configuration'}
        </h3>

        <h4>{t('documentation:hubGateway.deployment.firebaseTitle') || 'Firebase Deployment'}</h4>
        
        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.deployment.step1') || 'Configure Firebase'}</h4>
              <CodeBlock
                language="json"
                code={`// firebase/hub/firebase.json
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "/app/**",
        "function": "hubProxy"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`}
              />
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.deployment.step2') || 'Deploy Hub'}</h4>
              <CodeBlock
                code={`# Build and deploy Hub with proxy features
npm run build:hub
firebase deploy --only hosting:hub`}
              />
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:hubGateway.deployment.step3') || 'Environment Variables'}</h4>
              <CodeBlock
                code={`# Production environment variables
NEXT_PUBLIC_JUSTSPLIT_URL=https://justsplit.cybere.co
NEXT_PUBLIC_WEBSITE_URL=https://cybere.co
NEXT_PUBLIC_USE_PROXY=true`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3>{t('documentation:hubGateway.deployment.lanTitle') || 'LAN Access'}</h3>
        <p>{t('documentation:hubGateway.deployment.lanDesc') || 'For development and testing on your local network:'}</p>
        <CodeBlock
          code={`# Start Hub with LAN access
npm run dev:hub:lan

# Access from other devices
http://[your-hostname].local:40000
http://[your-hostname].local:40000/app/justsplit
http://[your-hostname].local:40000/app/website`}
        />
      </section>
    </>
  );

  const renderImplementationTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>
          {t('documentation:hubGateway.implementation.title') || 'Implementation Guide'}
        </h3>
        <p>{t('documentation:hubGateway.implementation.description') || 'How to integrate your application with the Hub gateway system.'}</p>

        <h4>{t('documentation:hubGateway.implementation.appIntegration') || '1. Application Integration'}</h4>
        <CodeBlock
          language="typescript"
          code={`// In your app's authentication setup
import { getHubAuth } from '@cybereco/auth';

// Check if running behind Hub proxy
const isProxied = request.headers.get('x-hub-proxy') === 'true';

if (isProxied) {
  // Use Hub's authentication
  const auth = getHubAuth();
  const user = await auth.currentUser;
} else {
  // Direct access - handle auth locally
  redirectToHub();
}`}
        />

        <h4>{t('documentation:hubGateway.implementation.routeHandling') || '2. Route Handling'}</h4>
        <CodeBlock
          language="javascript"
          code={`// Handle proxy-aware routing
export function getAppUrl(path = '') {
  const baseUrl = process.env.NEXT_PUBLIC_HUB_URL;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  
  if (process.env.NEXT_PUBLIC_USE_PROXY === 'true') {
    return \`\${baseUrl}/app/\${appName}\${path}\`;
  }
  
  return \`\${process.env.NEXT_PUBLIC_APP_URL}\${path}\`;
}`}
        />

        <h4>{t('documentation:hubGateway.implementation.authFlow') || '3. Authentication Flow'}</h4>
        <CodeBlock
          language="typescript"
          code={`// Seamless authentication flow
async function authenticateViaHub(request: Request) {
  // Extract auth token from Hub
  const authToken = request.cookies.get('hub-auth-token');
  
  if (!authToken) {
    // Redirect to Hub login
    return Response.redirect(\`\${HUB_URL}/auth/signin?return=\${request.url}\`);
  }
  
  // Verify token with Hub
  const user = await verifyHubToken(authToken);
  if (!user) {
    return Response.redirect(\`\${HUB_URL}/auth/signin\`);
  }
  
  // User authenticated successfully
  return { user, token: authToken };
}`}
        />
      </section>
    </>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:hubGateway.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'architecture',
      label: t('documentation:hubGateway.tabs.architecture') || 'Architecture',
      content: renderArchitectureTab()
    },
    {
      id: 'proxy',
      label: t('documentation:hubGateway.tabs.proxy') || 'Proxy Features',
      content: renderProxyFeaturesTab()
    },
    {
      id: 'deployment',
      label: t('documentation:hubGateway.tabs.deployment') || 'Deployment',
      content: renderDeploymentTab()
    },
    {
      id: 'implementation',
      label: t('documentation:hubGateway.tabs.implementation') || 'Implementation',
      content: renderImplementationTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaHub />}
        title={t('documentation:hubGateway.title') || 'Hub as Gateway'}
        subtitle={t('documentation:hubGateway.subtitle') || 'Unified entry point and intelligent proxy for all CyberEco applications'}
        gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/authentication" className={styles.docCard}>
            <FaLock />
            <span>{t('documentation:hubGateway.footer.authentication') || 'Authentication'}</span>
          </Link>
          <Link href="/documentation/data-architecture" className={styles.docCard}>
            <FaServer />
            <span>{t('documentation:hubGateway.footer.dataArchitecture') || 'Data Architecture'}</span>
          </Link>
          <Link href="/documentation/api" className={styles.docCard}>
            <FaCode />
            <span>{t('documentation:documentationPage.api.title') || 'API Reference'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}