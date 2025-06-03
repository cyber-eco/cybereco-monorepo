'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHub, FaNetworkWired, FaLock, FaRocket, FaCode, FaServer } from 'react-icons/fa';
import { useLanguage } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function HubGatewayDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>{language}</span>
      </div>
      <pre className={styles.codeContent}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <FaHub className={styles.titleIcon} />
            {t('hubGateway.title') || 'Hub as Gateway'}
          </h1>
          <p className={styles.subtitle}>
            {t('hubGateway.subtitle') || 'Unified entry point and intelligent proxy for all CyberEco applications'}
          </p>
        </div>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('hubGateway.tabs.overview') || 'Overview'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          {t('hubGateway.tabs.architecture') || 'Architecture'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'proxy' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('proxy')}
        >
          {t('hubGateway.tabs.proxy') || 'Proxy Features'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'deployment' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('deployment')}
        >
          {t('hubGateway.tabs.deployment') || 'Deployment'}
        </button>
      </nav>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <section className={styles.section}>
            <h2>{t('hubGateway.overview.title') || 'Hub: Your Gateway to CyberEco'}</h2>
            <p className={styles.lead}>
              {t('hubGateway.overview.description') || 
              'The Hub serves as both the authentication center and intelligent proxy for the entire CyberEco ecosystem, providing seamless access to all applications through a single entry point.'}
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaLock />
                </div>
                <h3>{t('hubGateway.overview.ssoTitle') || 'Single Sign-On'}</h3>
                <p>{t('hubGateway.overview.ssoDesc') || 'Authenticate once and access all CyberEco applications seamlessly'}</p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaNetworkWired />
                </div>
                <h3>{t('hubGateway.overview.proxyTitle') || 'Intelligent Proxy'}</h3>
                <p>{t('hubGateway.overview.proxyDesc') || 'Routes requests to appropriate applications while maintaining authentication'}</p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaRocket />
                </div>
                <h3>{t('hubGateway.overview.discoveryTitle') || 'App Discovery'}</h3>
                <p>{t('hubGateway.overview.discoveryDesc') || 'Beautiful landing page showcasing all available CyberEco applications'}</p>
              </div>
            </div>

            <div className={styles.accessUrls}>
              <h3>{t('hubGateway.overview.accessTitle') || 'Access Points'}</h3>
              <table className={styles.urlTable}>
                <thead>
                  <tr>
                    <th>{t('hubGateway.overview.appCol') || 'Application'}</th>
                    <th>{t('hubGateway.overview.localCol') || 'Local Access'}</th>
                    <th>{t('hubGateway.overview.proxyCol') || 'Via Hub Proxy'}</th>
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
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'architecture' && (
          <section className={styles.section}>
            <h2>{t('hubGateway.architecture.title') || 'Gateway Architecture'}</h2>
            
            <div className={styles.architectureFlow}>
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>🌐</div>
                <h3>{t('hubGateway.architecture.userRequest') || 'User Request'}</h3>
                <p>{t('hubGateway.architecture.userRequestDesc') || 'User accesses Hub or proxied app URL'}</p>
              </div>
              
              <div className={styles.flowArrow}>→</div>
              
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>🔍</div>
                <h3>{t('hubGateway.architecture.middleware') || 'Middleware'}</h3>
                <p>{t('hubGateway.architecture.middlewareDesc') || 'Next.js middleware analyzes request path'}</p>
              </div>
              
              <div className={styles.flowArrow}>→</div>
              
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>🔐</div>
                <h3>{t('hubGateway.architecture.authCheck') || 'Auth Check'}</h3>
                <p>{t('hubGateway.architecture.authCheckDesc') || 'Verifies user authentication status'}</p>
              </div>
              
              <div className={styles.flowArrow}>→</div>
              
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>📡</div>
                <h3>{t('hubGateway.architecture.routing') || 'Routing'}</h3>
                <p>{t('hubGateway.architecture.routingDesc') || 'Routes to app or shows landing page'}</p>
              </div>
            </div>

            <div className={styles.middlewareSection}>
              <h3>{t('hubGateway.architecture.middlewareTitle') || 'Middleware Configuration'}</h3>
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
            </div>
          </section>
        )}

        {activeTab === 'proxy' && (
          <section className={styles.section}>
            <h2>{t('hubGateway.proxy.title') || 'Proxy Features'}</h2>
            
            <div className={styles.proxyFeatures}>
              <div className={styles.proxyFeature}>
                <h3>{t('hubGateway.proxy.routingTitle') || '🛣️ Intelligent Routing'}</h3>
                <ul>
                  <li>{t('hubGateway.proxy.routing1') || 'Path-based routing to different applications'}</li>
                  <li>{t('hubGateway.proxy.routing2') || 'Automatic authentication token injection'}</li>
                  <li>{t('hubGateway.proxy.routing3') || 'Request/response header manipulation'}</li>
                </ul>
              </div>

              <div className={styles.proxyFeature}>
                <h3>{t('hubGateway.proxy.securityTitle') || '🔒 Security Features'}</h3>
                <ul>
                  <li>{t('hubGateway.proxy.security1') || 'CORS handling for cross-origin requests'}</li>
                  <li>{t('hubGateway.proxy.security2') || 'Security headers (CSP, X-Frame-Options)'}</li>
                  <li>{t('hubGateway.proxy.security3') || 'Authentication verification'}</li>
                </ul>
              </div>

              <div className={styles.proxyFeature}>
                <h3>{t('hubGateway.proxy.performanceTitle') || '⚡ Performance'}</h3>
                <ul>
                  <li>{t('hubGateway.proxy.performance1') || 'Request caching for static assets'}</li>
                  <li>{t('hubGateway.proxy.performance2') || 'Automatic compression'}</li>
                  <li>{t('hubGateway.proxy.performance3') || 'Connection pooling'}</li>
                </ul>
              </div>
            </div>

            <div className={styles.configSection}>
              <h3>{t('hubGateway.proxy.configTitle') || 'Proxy Configuration'}</h3>
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
            </div>
          </section>
        )}

        {activeTab === 'deployment' && (
          <section className={styles.section}>
            <h2>{t('hubGateway.deployment.title') || 'Deployment Configuration'}</h2>
            
            <div className={styles.deploymentSteps}>
              <h3>{t('hubGateway.deployment.firebaseTitle') || 'Firebase Deployment'}</h3>
              
              <div className={styles.step}>
                <h4>{t('hubGateway.deployment.step1') || '1. Configure Firebase'}</h4>
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

              <div className={styles.step}>
                <h4>{t('hubGateway.deployment.step2') || '2. Deploy Hub'}</h4>
                <CodeBlock
                  code={`# Build and deploy Hub with proxy features
npm run build:hub
firebase deploy --only hosting:hub`}
                />
              </div>

              <div className={styles.step}>
                <h4>{t('hubGateway.deployment.step3') || '3. Environment Variables'}</h4>
                <CodeBlock
                  code={`# Production environment variables
NEXT_PUBLIC_JUSTSPLIT_URL=https://justsplit.cybere.co
NEXT_PUBLIC_WEBSITE_URL=https://cybere.co
NEXT_PUBLIC_USE_PROXY=true`}
                />
              </div>
            </div>

            <div className={styles.lanSection}>
              <h3>{t('hubGateway.deployment.lanTitle') || 'LAN Access'}</h3>
              <p>{t('hubGateway.deployment.lanDesc') || 'For development and testing on your local network:'}</p>
              <CodeBlock
                code={`# Start Hub with LAN access
npm run dev:hub:lan

# Access from other devices
http://[your-hostname].local:40000
http://[your-hostname].local:40000/app/justsplit
http://[your-hostname].local:40000/app/website`}
              />
            </div>
          </section>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{t('hubGateway.footer.relatedDocs') || 'Related Documentation'}</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/documentation">{t('hubGateway.footer.allDocs') || 'All Documentation'}</Link></li>
              <li><Link href="/documentation/authentication">{t('hubGateway.footer.authentication') || 'Authentication'}</Link></li>
              <li><Link href="/documentation/data-architecture">{t('hubGateway.footer.dataArchitecture') || 'Data Architecture'}</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>{t('hubGateway.footer.resources') || 'Resources'}</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://github.com/cybereco">{t('hubGateway.footer.github') || 'GitHub'}</a></li>
              <li><Link href="/roadmap">{t('hubGateway.footer.roadmap') || 'Roadmap'}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}