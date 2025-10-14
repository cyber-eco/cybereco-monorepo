'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';

export function ApiReference() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.contentSection}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>🔌 {t('documentationPage.apiReferenceTitle') || 'API Reference'}</h3>
        <p className={styles.contentText}>
          {t('documentationPage.apiReferenceIntro') || 'Complete API documentation for integrating with CyberEco services and building custom applications.'}
        </p>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🔐 {t('documentationPage.authenticationAPIsTitle') || 'Authentication APIs'}</h4>
        <div className={styles.apiGrid}>
          <div className={styles.apiCard}>
            <h5>{t('documentationPage.jwtAuthTitle') || 'JWT Authentication'}</h5>
            <p>{t('documentationPage.jwtAuthDesc') || 'Token-based authentication with refresh tokens and secure session management.'}</p>
            <div className={styles.apiEndpoints}>
              <code>POST /api/auth/signin</code>
              <code>POST /api/auth/refresh</code>
              <code>POST /api/auth/signout</code>
            </div>
            <a href="/documentation/jwt-authentication" className={styles.apiLink}>
              {t('documentationPage.viewDocs') || 'View Documentation'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.apiCard}>
            <h5>{t('documentationPage.ssoIntegrationTitle') || 'SSO Integration'}</h5>
            <p>{t('documentationPage.ssoIntegrationDesc') || 'Single Sign-On across all CyberEco applications with SAML and OAuth support.'}</p>
            <div className={styles.apiEndpoints}>
              <code>GET /api/auth/sso/config</code>
              <code>POST /api/auth/sso/validate</code>
              <code>GET /api/auth/sso/metadata</code>
            </div>
            <a href="/documentation/sso-integration" className={styles.apiLink}>
              {t('documentationPage.viewDocs') || 'View Documentation'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.apiCard}>
            <h5>{t('documentationPage.twoFactorTitle') || 'Two-Factor Authentication'}</h5>
            <p>{t('documentationPage.twoFactorDesc') || 'Enhanced security with TOTP and SMS-based two-factor authentication.'}</p>
            <div className={styles.apiEndpoints}>
              <code>POST /api/auth/2fa/enable</code>
              <code>POST /api/auth/2fa/verify</code>
              <code>POST /api/auth/2fa/disable</code>
            </div>
            <a href="/documentation/two-factor-auth" className={styles.apiLink}>
              {t('documentationPage.viewDocs') || 'View Documentation'} <FaChevronRight />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>📊 {t('documentationPage.dataAPIsTitle') || 'Data Management APIs'}</h4>
        <div className={styles.apiGrid}>
          <div className={styles.apiCard}>
            <h5>{t('documentationPage.dataExportTitle') || 'Data Export API'}</h5>
            <p>{t('documentationPage.dataExportDesc') || 'GDPR-compliant data export with multiple format support.'}</p>
            <div className={styles.apiEndpoints}>
              <code>GET /api/export/user-data</code>
              <code>POST /api/export/request</code>
              <code>GET /api/export/status/:id</code>
            </div>
            <a href="/documentation/data-export" className={styles.apiLink}>
              {t('documentationPage.viewDocs') || 'View Documentation'} <FaChevronRight />
            </a>
          </div>

          <div className={styles.apiCard}>
            <h5>{t('documentationPage.privacyControlsTitle') || 'Privacy Controls'}</h5>
            <p>{t('documentationPage.privacyControlsDesc') || 'User consent management and privacy preference APIs.'}</p>
            <div className={styles.apiEndpoints}>
              <code>GET /api/privacy/preferences</code>
              <code>PUT /api/privacy/consent</code>
              <code>DELETE /api/privacy/data</code>
            </div>
            <a href="/documentation/privacy-controls" className={styles.apiLink}>
              {t('documentationPage.viewDocs') || 'View Documentation'} <FaChevronRight />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h4 className={styles.sectionTitle}>🛠️ {t('documentationPage.developerToolsTitle') || 'Developer Tools'}</h4>
        <div className={styles.toolsGrid}>
          <div className={styles.toolCard}>
            <h5>{t('documentationPage.sdksTitle') || 'SDKs & Libraries'}</h5>
            <p>{t('documentationPage.sdksDesc') || 'Official SDKs for popular programming languages and frameworks.'}</p>
            <div className={styles.toolLinks}>
              <a href="#" className={styles.toolLink}>JavaScript/TypeScript <FaExternalLinkAlt /></a>
              <a href="#" className={styles.toolLink}>Python <FaExternalLinkAlt /></a>
              <a href="#" className={styles.toolLink}>React Components <FaExternalLinkAlt /></a>
            </div>
          </div>

          <div className={styles.toolCard}>
            <h5>{t('documentationPage.postmanTitle') || 'Postman Collection'}</h5>
            <p>{t('documentationPage.postmanDesc') || 'Pre-configured API requests for testing and development.'}</p>
            <button className={styles.downloadButton}>
              {t('documentationPage.downloadCollection') || 'Download Collection'} ↓
            </button>
          </div>

          <div className={styles.toolCard}>
            <h5>{t('documentationPage.openAPITitle') || 'OpenAPI Specification'}</h5>
            <p>{t('documentationPage.openAPIDesc') || 'Complete API specification in OpenAPI 3.0 format.'}</p>
            <button className={styles.downloadButton}>
              {t('documentationPage.downloadSpec') || 'Download Spec'} ↓
            </button>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.rateLimitBox}>
          <h4>{t('documentationPage.rateLimitsTitle') || '⚡ Rate Limits'}</h4>
          <p>{t('documentationPage.rateLimitsDesc') || 'API rate limits to ensure fair usage and system stability:'}</p>
          <ul className={styles.rateLimitList}>
            <li>{t('documentationPage.authLimit') || 'Authentication: 10 requests/minute'}</li>
            <li>{t('documentationPage.dataLimit') || 'Data APIs: 100 requests/minute'}</li>
            <li>{t('documentationPage.exportLimit') || 'Export APIs: 5 requests/hour'}</li>
          </ul>
        </div>
      </div>
    </>
  );
}