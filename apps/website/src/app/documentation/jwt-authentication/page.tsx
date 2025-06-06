'use client';

import styles from './page.module.css';
import { useLanguage } from '@cybereco/ui-components';

export default function JWTAuthenticationDocs() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <h1>{t('documentation:documentationPage.jwt.title') || 'JWT Authentication'}</h1>
      
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.overview.title') || 'Overview'}</h2>
        <p>{t('documentation:documentationPage.jwt.overview.description') || 'CyberEco uses JSON Web Tokens (JWT) for secure authentication across all applications. This modern approach provides better security, scalability, and features compared to traditional session-based authentication.'}</p>
        
        <div className={styles.features}>
          <h3>{t('documentation:documentationPage.jwt.features.title') || 'Key Features'}</h3>
          <ul>
            <li>{t('documentation:documentationPage.jwt.features.secure') || 'Secure token generation with HS256 algorithm'}</li>
            <li>{t('documentation:documentationPage.jwt.features.shortLived') || 'Short-lived access tokens (1 hour) with refresh tokens (7 days)'}</li>
            <li>{t('documentation:documentationPage.jwt.features.crossApp') || 'Cross-application authentication with shared audience claims'}</li>
            <li>{t('documentation:documentationPage.jwt.features.csrf') || 'CSRF protection for form submissions'}</li>
            <li>{t('documentation:documentationPage.jwt.features.autoRefresh') || 'Automatic token refresh before expiry'}</li>
            <li>{t('documentation:documentationPage.jwt.features.secureCookie') || 'Secure cookie management with HttpOnly and SameSite flags'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.structure.title') || 'Token Structure'}</h2>
        <p>{t('documentation:documentationPage.jwt.structure.description') || 'JWT tokens consist of three parts: header, payload, and signature. Here\'s what our tokens contain:'}</p>
        
        <div className={styles.codeBlock}>
          <h4>{t('documentation:documentationPage.jwt.structure.accessToken') || 'Access Token Payload'}</h4>
          <pre>
            <code>{`{
  "sub": "user-id-123",        // User ID
  "email": "user@example.com", // User email
  "name": "John Doe",          // Display name
  "iss": "cybereco-hub",       // Issuer
  "aud": [                     // Audience
    "cybereco-hub",
    "cybereco-justsplit",
    "cybereco-website"
  ],
  "iat": 1709726400,          // Issued at
  "exp": 1709730000,          // Expiry
  "permissions": ["read", "write"],
  "apps": ["hub", "justsplit"]
}`}</code>
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.flow.title') || 'Authentication Flow'}</h2>
        <ol className={styles.flowList}>
          <li>
            <strong>{t('documentation:documentationPage.jwt.flow.step1.title') || 'Initial Login'}</strong>
            <p>{t('documentation:documentationPage.jwt.flow.step1.description') || 'User logs in with Firebase Auth credentials'}</p>
          </li>
          <li>
            <strong>{t('documentation:documentationPage.jwt.flow.step2.title') || 'Token Generation'}</strong>
            <p>{t('documentation:documentationPage.jwt.flow.step2.description') || 'Server generates JWT access and refresh tokens'}</p>
          </li>
          <li>
            <strong>{t('documentation:documentationPage.jwt.flow.step3.title') || 'Token Storage'}</strong>
            <p>{t('documentation:documentationPage.jwt.flow.step3.description') || 'Tokens stored securely in sessionStorage/cookies'}</p>
          </li>
          <li>
            <strong>{t('documentation:documentationPage.jwt.flow.step4.title') || 'Cross-App Navigation'}</strong>
            <p>{t('documentation:documentationPage.jwt.flow.step4.description') || 'Tokens used for seamless SSO between applications'}</p>
          </li>
          <li>
            <strong>{t('documentation:documentationPage.jwt.flow.step5.title') || 'Token Refresh'}</strong>
            <p>{t('documentation:documentationPage.jwt.flow.step5.description') || 'Automatic refresh when access token expires'}</p>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.security.title') || 'Security Best Practices'}</h2>
        <div className={styles.securityGrid}>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.jwt.security.storage.title') || 'Token Storage'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.jwt.security.storage.access') || 'Access tokens: sessionStorage or memory'}</li>
              <li>{t('documentation:documentationPage.jwt.security.storage.refresh') || 'Refresh tokens: httpOnly cookies'}</li>
              <li>{t('documentation:documentationPage.jwt.security.storage.never') || 'Never store in localStorage for production'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.jwt.security.expiry.title') || 'Token Expiry'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.jwt.security.expiry.access') || 'Access tokens: 1 hour'}</li>
              <li>{t('documentation:documentationPage.jwt.security.expiry.refresh') || 'Refresh tokens: 7 days'}</li>
              <li>{t('documentation:documentationPage.jwt.security.expiry.check') || 'Always verify before use'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.jwt.security.csrf.title') || 'CSRF Protection'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.jwt.security.csrf.generate') || 'Generate tokens for forms'}</li>
              <li>{t('documentation:documentationPage.jwt.security.csrf.verify') || 'Verify on submission'}</li>
              <li>{t('documentation:documentationPage.jwt.security.csrf.samesite') || 'Use SameSite cookies'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.implementation.title') || 'Implementation Example'}</h2>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// Login and generate tokens
const userCredential = await signInWithEmailAndPassword(
  auth, email, password
);
const tokens = AuthTokenService.generateTokenPair(
  userCredential.user
);

// Store tokens securely
setAuthTokens(
  tokens.accessToken,
  tokens.refreshToken,
  tokens.expiresIn
);

// Verify token before API calls
const decoded = jwtService.verifyToken(accessToken);
if (!decoded) {
  // Redirect to login
}

// Automatic token refresh
if (isTokenExpiringSoon(accessToken)) {
  const newTokens = await refreshAccessToken(
    refreshToken
  );
}`}</code>
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.migration.title') || 'Migration Guide'}</h2>
        <p>{t('documentation:documentationPage.jwt.migration.description') || 'If you\'re migrating from the old token system to JWT:'}</p>
        <div className={styles.migrationTable}>
          <table>
            <thead>
              <tr>
                <th>{t('documentation:documentationPage.jwt.migration.aspect') || 'Aspect'}</th>
                <th>{t('documentation:documentationPage.jwt.migration.old') || 'Old System'}</th>
                <th>{t('documentation:documentationPage.jwt.migration.new') || 'JWT System'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('documentation:documentationPage.jwt.migration.format') || 'Token Format'}</td>
                <td>SHA-256 hash</td>
                <td>JWT (header.payload.signature)</td>
              </tr>
              <tr>
                <td>{t('documentation:documentationPage.jwt.migration.expiry') || 'Expiry'}</td>
                <td>30 seconds</td>
                <td>1 hour (access), 7 days (refresh)</td>
              </tr>
              <tr>
                <td>{t('documentation:documentationPage.jwt.migration.validation') || 'Validation'}</td>
                <td>Hash comparison</td>
                <td>Signature verification</td>
              </tr>
              <tr>
                <td>{t('documentation:documentationPage.jwt.migration.storage') || 'Storage'}</td>
                <td>localStorage</td>
                <td>sessionStorage + cookies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.jwt.resources.title') || 'Additional Resources'}</h2>
        <ul className={styles.resourcesList}>
          <li>
            <a href="/documentation/api">{t('documentation:documentationPage.jwt.resources.api') || 'API Reference'}</a>
          </li>
          <li>
            <a href="/documentation/sso-integration">{t('documentation:documentationPage.jwt.resources.sso') || 'SSO Integration Guide'}</a>
          </li>
          <li>
            <a href="/documentation/auth-logging">{t('documentation:documentationPage.jwt.resources.logging') || 'Authentication Logging'}</a>
          </li>
          <li>
            <a href="/documentation/troubleshooting">{t('documentation:documentationPage.jwt.resources.troubleshooting') || 'Troubleshooting Guide'}</a>
          </li>
        </ul>
      </section>
    </div>
  );
}