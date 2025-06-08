'use client';

import React from 'react';
import Link from 'next/link';
import { FaNetworkWired, FaLock, FaRocket, FaCode, FaServer } from 'react-icons/fa';
import { FaHubspot as FaHub } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:hubGateway.title', 'Hub as Gateway')}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:hubGateway.subtitle', 'Unified entry point and intelligent proxy for all CyberEco applications')}
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.contentSection}>
          <h2 className={styles.subTitle}>
            <FaHub />
            {t('documentation:hubGateway.overview.title', 'Hub: Your Gateway to CyberEco')}
          </h2>
          <p className={styles.contentText}>
            {t('documentation:hubGateway.overview.description', 
            'The Hub serves as both the authentication center and intelligent proxy for the entire CyberEco ecosystem, providing seamless access to all applications through a single entry point.')}
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaLock style={{ color: 'white' }} />
              </div>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.overview.ssoTitle', 'Single Sign-On')}</h3>
              <p className={styles.featureDescription}>{t('documentation:hubGateway.overview.ssoDesc', 'Authenticate once and access all CyberEco applications seamlessly')}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaNetworkWired style={{ color: 'white' }} />
              </div>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.overview.proxyTitle', 'Intelligent Proxy')}</h3>
              <p className={styles.featureDescription}>{t('documentation:hubGateway.overview.proxyDesc', 'Routes requests to appropriate applications while maintaining authentication')}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaRocket style={{ color: 'white' }} />
              </div>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.overview.discoveryTitle', 'App Discovery')}</h3>
              <p className={styles.featureDescription}>{t('documentation:hubGateway.overview.discoveryDesc', 'Beautiful landing page showcasing all available CyberEco applications')}</p>
            </div>
          </div>

          <h3>{t('documentation:hubGateway.overview.accessTitle', 'Access Points')}</h3>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>{t('documentation:hubGateway.overview.appCol', 'Application')}</th>
                <th>{t('documentation:hubGateway.overview.localCol', 'Local Access')}</th>
                <th>{t('documentation:hubGateway.overview.proxyCol', 'Via Hub Proxy')}</th>
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
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.subTitle}>
            <FaNetworkWired />
            {t('documentation:hubGateway.architecture.title', 'Gateway Architecture')}
          </h2>

          <div className={styles.stepByStepGuide}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:hubGateway.architecture.userRequest', 'User Request')}</h4>
                <p>{t('documentation:hubGateway.architecture.userRequestDesc', 'User accesses Hub or proxied app URL')}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:hubGateway.architecture.middleware', 'Middleware')}</h4>
                <p>{t('documentation:hubGateway.architecture.middlewareDesc', 'Next.js middleware analyzes request path')}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:hubGateway.architecture.authCheck', 'Auth Check')}</h4>
                <p>{t('documentation:hubGateway.architecture.authCheckDesc', 'Verifies user authentication status')}</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:hubGateway.architecture.routing', 'Routing')}</h4>
                <p>{t('documentation:hubGateway.architecture.routingDesc', 'Routes to app or shows landing page')}</p>
              </div>
            </div>
          </div>

          <h3>{t('documentation:hubGateway.architecture.middlewareTitle', 'Middleware Configuration')}</h3>
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

        <section className={styles.contentSection}>
          <h2 className={styles.subTitle}>
            <FaServer />
            {t('documentation:hubGateway.proxy.title', 'Proxy Features')}
          </h2>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.proxy.routingTitle', 'Intelligent Routing')}</h3>
              <ul className={styles.conceptList}>
                <li>{t('documentation:hubGateway.proxy.routing1', 'Path-based routing to different applications')}</li>
                <li>{t('documentation:hubGateway.proxy.routing2', 'Automatic authentication token injection')}</li>
                <li>{t('documentation:hubGateway.proxy.routing3', 'Request/response header manipulation')}</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.proxy.securityTitle', 'Security Features')}</h3>
              <ul className={styles.conceptList}>
                <li>{t('documentation:hubGateway.proxy.security1', 'CORS handling for cross-origin requests')}</li>
                <li>{t('documentation:hubGateway.proxy.security2', 'Security headers (CSP, X-Frame-Options)')}</li>
                <li>{t('documentation:hubGateway.proxy.security3', 'Authentication verification')}</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{t('documentation:hubGateway.proxy.performanceTitle', 'Performance')}</h3>
              <ul className={styles.conceptList}>
                <li>{t('documentation:hubGateway.proxy.performance1', 'Request caching for static assets')}</li>
                <li>{t('documentation:hubGateway.proxy.performance2', 'Automatic compression')}</li>
                <li>{t('documentation:hubGateway.proxy.performance3', 'Connection pooling')}</li>
              </ul>
            </div>
          </div>

          <h3>{t('documentation:hubGateway.proxy.configTitle', 'Proxy Configuration')}</h3>
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

        <section className={styles.contentSection}>
          <h2 className={styles.subTitle}>
            <FaRocket />
            {t('documentation:hubGateway.deployment.title', 'Deployment Configuration')}
          </h2>

          <h3>{t('documentation:hubGateway.deployment.firebaseTitle', 'Firebase Deployment')}</h3>
          
          <div className={styles.stepByStepGuide}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>{t('documentation:hubGateway.deployment.step1', 'Configure Firebase')}</h4>
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
                <h4>{t('documentation:hubGateway.deployment.step2', 'Deploy Hub')}</h4>
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
                <h4>{t('documentation:hubGateway.deployment.step3', 'Environment Variables')}</h4>
                <CodeBlock
                  code={`# Production environment variables
NEXT_PUBLIC_JUSTSPLIT_URL=https://justsplit.cybere.co
NEXT_PUBLIC_WEBSITE_URL=https://cybere.co
NEXT_PUBLIC_USE_PROXY=true`}
                />
              </div>
            </div>
          </div>

          <h3>{t('documentation:hubGateway.deployment.lanTitle', 'LAN Access')}</h3>
          <p className={styles.contentText}>{t('documentation:hubGateway.deployment.lanDesc', 'For development and testing on your local network:')}</p>
          <CodeBlock
            code={`# Start Hub with LAN access
npm run dev:hub:lan

# Access from other devices
http://[your-hostname].local:40000
http://[your-hostname].local:40000/app/justsplit
http://[your-hostname].local:40000/app/website`}
          />
        </section>

        <div className={styles.divider} />

        <section className={styles.contentSection}>
          <h3>{t('documentation:hubGateway.footer.relatedDocs', 'Related Documentation')}</h3>
          <div className={styles.cardGrid}>
            <Link href="/documentation" className={styles.docCard}>
              <div className={styles.cardIcon}>📚</div>
              <h4 className={styles.cardTitle}>{t('documentation:hubGateway.footer.allDocs', 'All Documentation')}</h4>
              <p className={styles.cardDescription}>Browse all available documentation</p>
            </Link>
            
            <Link href="/documentation/authentication" className={styles.docCard}>
              <div className={styles.cardIcon}>🔐</div>
              <h4 className={styles.cardTitle}>{t('documentation:hubGateway.footer.authentication', 'Authentication')}</h4>
              <p className={styles.cardDescription}>Learn about our authentication system</p>
            </Link>
            
            <Link href="/documentation/data-architecture" className={styles.docCard}>
              <div className={styles.cardIcon}>🏗️</div>
              <h4 className={styles.cardTitle}>{t('documentation:hubGateway.footer.dataArchitecture', 'Data Architecture')}</h4>
              <p className={styles.cardDescription}>Understand our data architecture</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}