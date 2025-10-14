'use client';

import React from 'react';
import Link from 'next/link';
import { FaCode, FaKey, FaDatabase, FaShieldAlt, FaRocket, FaBook } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from './page.module.css';

export default function ApiDocumentationPage() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <>
      <div className={styles.apiGrid}>
        <Link href="/documentation/authentication" className={styles.apiCard}>
          <div className={styles.iconWrapper}>
            <FaKey />
          </div>
          <h3 className={styles.cardTitle}>{t('documentation:documentationPage.api.sections.authentication.title') || 'Authentication API'}</h3>
          <p className={styles.cardDescription}>{t('documentation:documentationPage.api.sections.authentication.description') || 'OAuth2, JWT tokens, and session management'}</p>
        </Link>
        
        <Link href="/documentation/data-export" className={styles.apiCard}>
          <div className={styles.iconWrapper}>
            <FaDatabase />
          </div>
          <h3 className={styles.cardTitle}>{t('documentation:documentationPage.api.sections.data.title') || 'Data API'}</h3>
          <p className={styles.cardDescription}>{t('documentation:documentationPage.api.sections.data.description') || 'CRUD operations and data export endpoints'}</p>
        </Link>
        
        <Link href="/documentation/two-factor-auth" className={styles.apiCard}>
          <div className={styles.iconWrapper}>
            <FaShieldAlt />
          </div>
          <h3 className={styles.cardTitle}>{t('documentation:documentationPage.api.sections.security.title') || 'Security API'}</h3>
          <p className={styles.cardDescription}>{t('documentation:documentationPage.api.sections.security.description') || 'Two-factor auth and security settings'}</p>
        </Link>
      </div>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.api.overview.title') || 'API Overview'}</h2>
        <p>{t('documentation:documentationPage.api.overview.description') || 'The CyberEco API provides programmatic access to all platform features. Built on REST principles, it uses JSON for data exchange and JWT tokens for authentication.'}</p>
        
        <h3>{t('documentation:documentationPage.api.overview.features') || 'Key Features'}</h3>
        <ul>
          <li>{t('documentation:documentationPage.api.overview.feature1') || 'RESTful API design with predictable endpoints'}</li>
          <li>{t('documentation:documentationPage.api.overview.feature2') || 'JWT-based authentication with refresh tokens'}</li>
          <li>{t('documentation:documentationPage.api.overview.feature3') || 'Rate limiting and request throttling'}</li>
          <li>{t('documentation:documentationPage.api.overview.feature4') || 'Comprehensive error handling with clear messages'}</li>
          <li>{t('documentation:documentationPage.api.overview.feature5') || 'WebSocket support for real-time updates'}</li>
        </ul>
      </section>
    </>
  );

  const renderQuickStartTab = () => (
    <>
      <section className={styles.codeSection}>
        <h2>{t('documentation:documentationPage.api.quickstart.title') || 'Quick Start'}</h2>
        <p>{t('documentation:documentationPage.api.quickstart.description') || 'Get started with the CyberEco API in minutes.'}</p>
        
        <h3>{t('documentation:documentationPage.api.quickstart.baseUrl') || 'Base URL'}</h3>
        <div className={styles.codeBlock}>
          <pre>
{`// Production
const API_BASE = 'https://api.cybere.co/v1';

// Development
const API_BASE = 'http://localhost:40000/api/v1';`}
          </pre>
        </div>

        <h3>{t('documentation:documentationPage.api.quickstart.authentication') || 'Authentication'}</h3>
        <div className={styles.codeBlock}>
          <pre>
{`// Login
const response = await fetch(\`\${API_BASE}/auth/login\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepassword'
  })
});

const { token, refreshToken } = await response.json();

// Use token in subsequent requests
const userData = await fetch(\`\${API_BASE}/users/me\`, {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});`}
          </pre>
        </div>

        <h3>{t('documentation:documentationPage.api.quickstart.errorHandling') || 'Error Handling'}</h3>
        <div className={styles.codeBlock}>
          <pre>
{`try {
  const response = await fetch(\`\${API_BASE}/users/me\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.message);
    // Handle specific error codes
    if (response.status === 401) {
      // Token expired, refresh it
    }
  }
  
  const data = await response.json();
} catch (error) {
  console.error('Network error:', error);
}`}
          </pre>
        </div>
      </section>
    </>
  );

  const renderEndpointsTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.api.endpoints.title') || 'API Endpoints'}</h2>
        
        <h3>{t('documentation:documentationPage.api.endpoints.auth.title') || 'Authentication'}</h3>
        <table className={styles.endpointTable}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.method}>POST</span></td>
              <td><code>/auth/login</code></td>
              <td>Login with email and password</td>
            </tr>
            <tr>
              <td><span className={styles.method}>POST</span></td>
              <td><code>/auth/register</code></td>
              <td>Create new account</td>
            </tr>
            <tr>
              <td><span className={styles.method}>POST</span></td>
              <td><code>/auth/refresh</code></td>
              <td>Refresh access token</td>
            </tr>
            <tr>
              <td><span className={styles.method}>POST</span></td>
              <td><code>/auth/logout</code></td>
              <td>Logout and invalidate tokens</td>
            </tr>
          </tbody>
        </table>

        <h3>{t('documentation:documentationPage.api.endpoints.users.title') || 'Users'}</h3>
        <table className={styles.endpointTable}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.method}>GET</span></td>
              <td><code>/users/me</code></td>
              <td>Get current user profile</td>
            </tr>
            <tr>
              <td><span className={styles.method}>PUT</span></td>
              <td><code>/users/me</code></td>
              <td>Update user profile</td>
            </tr>
            <tr>
              <td><span className={styles.method}>DELETE</span></td>
              <td><code>/users/me</code></td>
              <td>Delete user account</td>
            </tr>
            <tr>
              <td><span className={styles.method}>GET</span></td>
              <td><code>/users/:id</code></td>
              <td>Get user by ID</td>
            </tr>
          </tbody>
        </table>

        <h3>{t('documentation:documentationPage.api.endpoints.data.title') || 'Data Management'}</h3>
        <table className={styles.endpointTable}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.method}>POST</span></td>
              <td><code>/export</code></td>
              <td>Request data export</td>
            </tr>
            <tr>
              <td><span className={styles.method}>GET</span></td>
              <td><code>/export/:id</code></td>
              <td>Check export status</td>
            </tr>
            <tr>
              <td><span className={styles.method}>GET</span></td>
              <td><code>/export/:id/download</code></td>
              <td>Download export file</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );

  const renderAuthenticationTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.api.auth.title') || 'Authentication'}</h2>
        <p>{t('documentation:documentationPage.api.auth.description') || 'All API requests require authentication using JWT tokens. Tokens are obtained through the login endpoint and must be included in the Authorization header.'}</p>

        <h3>{t('documentation:documentationPage.api.auth.flow.title') || 'Authentication Flow'}</h3>
        <ol>
          <li>{t('documentation:documentationPage.api.auth.flow.step1') || 'Login with email/password to receive tokens'}</li>
          <li>{t('documentation:documentationPage.api.auth.flow.step2') || 'Include access token in Authorization header'}</li>
          <li>{t('documentation:documentationPage.api.auth.flow.step3') || 'Refresh token when access token expires'}</li>
          <li>{t('documentation:documentationPage.api.auth.flow.step4') || 'Handle 401 errors by refreshing tokens'}</li>
        </ol>

        <h3>{t('documentation:documentationPage.api.auth.headers.title') || 'Request Headers'}</h3>
        <div className={styles.codeBlock}>
          <pre>
{`// Required headers for authenticated requests
{
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json',
  'X-App-ID': 'your-app-id' // Optional, for app-specific requests
}`}
          </pre>
        </div>

        <h3>{t('documentation:documentationPage.api.auth.oauth.title') || 'OAuth2 Integration'}</h3>
        <p>{t('documentation:documentationPage.api.auth.oauth.description') || 'Support for social login providers including Google, GitHub, and LinkedIn.'}</p>
        
        <div className={styles.codeBlock}>
          <pre>
{`// OAuth2 flow
// 1. Redirect to provider
window.location.href = \`\${API_BASE}/auth/oauth/google\`;

// 2. Handle callback
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

// 3. Exchange code for tokens
const response = await fetch(\`\${API_BASE}/auth/oauth/callback\`, {
  method: 'POST',
  body: JSON.stringify({ code, provider: 'google' })
});`}
          </pre>
        </div>
      </section>
    </>
  );

  const renderBestPracticesTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.api.bestPractices.title') || 'Best Practices'}</h2>
        
        <h3>{t('documentation:documentationPage.api.bestPractices.security.title') || 'Security'}</h3>
        <ul>
          <li>{t('documentation:documentationPage.api.bestPractices.security.item1') || 'Always use HTTPS in production'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.security.item2') || 'Store tokens securely (not in localStorage)'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.security.item3') || 'Implement token refresh logic'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.security.item4') || 'Validate all input data'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.security.item5') || 'Use rate limiting to prevent abuse'}</li>
        </ul>

        <h3>{t('documentation:documentationPage.api.bestPractices.performance.title') || 'Performance'}</h3>
        <ul>
          <li>{t('documentation:documentationPage.api.bestPractices.performance.item1') || 'Use pagination for large data sets'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.performance.item2') || 'Implement caching strategies'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.performance.item3') || 'Minimize payload sizes'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.performance.item4') || 'Use field filtering when available'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.performance.item5') || 'Batch requests when possible'}</li>
        </ul>

        <h3>{t('documentation:documentationPage.api.bestPractices.errors.title') || 'Error Handling'}</h3>
        <div className={styles.codeBlock}>
          <pre>
{`// Comprehensive error handling
class ApiClient {
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': \`Bearer \${this.token}\`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      // Handle different status codes
      if (response.status === 401) {
        await this.refreshToken();
        return this.request(url, options);
      }
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        const retryAfter = response.headers.get('Retry-After');
        await this.wait(retryAfter);
        return this.request(url, options);
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.message, response.status);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new NetworkError('Network request failed');
    }
  }
}`}
          </pre>
        </div>

        <h3>{t('documentation:documentationPage.api.bestPractices.versioning.title') || 'API Versioning'}</h3>
        <p>{t('documentation:documentationPage.api.bestPractices.versioning.description') || 'Always use versioned endpoints to ensure compatibility:'}</p>
        <ul>
          <li>{t('documentation:documentationPage.api.bestPractices.versioning.item1') || 'Current version: v1'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.versioning.item2') || 'Include version in URL path'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.versioning.item3') || 'Check deprecation headers'}</li>
          <li>{t('documentation:documentationPage.api.bestPractices.versioning.item4') || 'Monitor changelog for updates'}</li>
        </ul>
      </section>
    </>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.api.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'quickstart',
      label: t('documentation:documentationPage.api.tabs.quickstart') || 'Quick Start',
      content: renderQuickStartTab()
    },
    {
      id: 'endpoints',
      label: t('documentation:documentationPage.api.tabs.endpoints') || 'Endpoints',
      content: renderEndpointsTab()
    },
    {
      id: 'authentication',
      label: t('documentation:documentationPage.api.tabs.authentication') || 'Authentication',
      content: renderAuthenticationTab()
    },
    {
      id: 'bestPractices',
      label: t('documentation:documentationPage.api.tabs.bestPractices') || 'Best Practices',
      content: renderBestPracticesTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaCode />}
        title={t('documentation:documentationPage.api.title') || 'API Reference'}
        subtitle={t('documentation:documentationPage.api.subtitle') || 'Complete API documentation for the CyberEco platform'}
        gradient="linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />
    </div>
  );
}