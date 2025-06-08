'use client';

import styles from './page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function SSOIntegrationDocs() {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <h1>{t('documentation:documentationPage.sso.title') || 'Single Sign-On (SSO) Integration'}</h1>
      
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.overview.title') || 'Overview'}</h2>
        <p>{t('documentation:documentationPage.sso.overview.description') || 'CyberEco\'s Single Sign-On (SSO) system allows users to authenticate once through the Hub and seamlessly access all ecosystem applications without re-entering credentials.'}</p>
        
        <div className={styles.benefits}>
          <h3>{t('documentation:documentationPage.sso.benefits.title') || 'Benefits'}</h3>
          <ul>
            <li>{t('documentation:documentationPage.sso.benefits.seamless') || 'Seamless user experience across all applications'}</li>
            <li>{t('documentation:documentationPage.sso.benefits.security') || 'Enhanced security with centralized authentication'}</li>
            <li>{t('documentation:documentationPage.sso.benefits.management') || 'Simplified user account management'}</li>
            <li>{t('documentation:documentationPage.sso.benefits.consistent') || 'Consistent login experience'}</li>
            <li>{t('documentation:documentationPage.sso.benefits.reduced') || 'Reduced password fatigue'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.architecture.title') || 'Architecture'}</h2>
        <p>{t('documentation:documentationPage.sso.architecture.description') || 'The SSO system is built on these key components:'}</p>
        
        <div className={styles.architectureGrid}>
          <div className={styles.component}>
            <h3>{t('documentation:documentationPage.sso.architecture.hub.title') || 'CyberEco Hub'}</h3>
            <p>{t('documentation:documentationPage.sso.architecture.hub.description') || 'Central authentication provider that manages user sessions and issues JWT tokens for other applications.'}</p>
          </div>
          <div className={styles.component}>
            <h3>{t('documentation:documentationPage.sso.architecture.jwt.title') || 'JWT Tokens'}</h3>
            <p>{t('documentation:documentationPage.sso.architecture.jwt.description') || 'Secure tokens containing user identity and permissions, valid across all ecosystem applications.'}</p>
          </div>
          <div className={styles.component}>
            <h3>{t('documentation:documentationPage.sso.architecture.shared.title') || 'Shared Auth State'}</h3>
            <p>{t('documentation:documentationPage.sso.architecture.shared.description') || 'Cross-app authentication state management for seamless navigation between applications.'}</p>
          </div>
          <div className={styles.component}>
            <h3>{t('documentation:documentationPage.sso.architecture.firebase.title') || 'Firebase Auth'}</h3>
            <p>{t('documentation:documentationPage.sso.architecture.firebase.description') || 'Underlying authentication service providing secure user management and multiple auth providers.'}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.flow.title') || 'SSO Flow'}</h2>
        <div className={styles.flowDiagram}>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>1</div>
            <h4>{t('documentation:documentationPage.sso.flow.step1.title') || 'User Login'}</h4>
            <p>{t('documentation:documentationPage.sso.flow.step1.description') || 'User authenticates at the Hub using email/password or social providers'}</p>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>2</div>
            <h4>{t('documentation:documentationPage.sso.flow.step2.title') || 'Token Generation'}</h4>
            <p>{t('documentation:documentationPage.sso.flow.step2.description') || 'Hub generates JWT access and refresh tokens with user permissions'}</p>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>3</div>
            <h4>{t('documentation:documentationPage.sso.flow.step3.title') || 'App Navigation'}</h4>
            <p>{t('documentation:documentationPage.sso.flow.step3.description') || 'User navigates to another app (e.g., JustSplit) with auth token'}</p>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>4</div>
            <h4>{t('documentation:documentationPage.sso.flow.step4.title') || 'Token Verification'}</h4>
            <p>{t('documentation:documentationPage.sso.flow.step4.description') || 'Target app verifies token and creates local session'}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.implementation.title') || 'Implementation Guide'}</h2>
        
        <div className={styles.implementationStep}>
          <h3>{t('documentation:documentationPage.sso.implementation.hub.title') || '1. Hub Setup (Authentication Provider)'}</h3>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Hub authentication service
export class AuthTokenService {
  static async generateAppUrl(
    baseUrl: string,
    user: AuthUser,
    appId: string
  ): Promise<string> {
    const tokenPair = jwtService.generateTokenPair(user);
    const params = new URLSearchParams({
      authToken: tokenPair.accessToken,
      appId: appId
    });
    return \`\${baseUrl}?\${params}\`;
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.implementationStep}>
          <h3>{t('documentation:documentationPage.sso.implementation.app.title') || '2. Application Setup (SSO Consumer)'}</h3>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Application authentication check
const checkSSO = async () => {
  // Check URL for auth token
  const urlParams = new URLSearchParams(window.location.search);
  const authToken = urlParams.get('authToken');
  
  if (authToken) {
    const user = await AuthTokenService.verifyAuthToken(authToken);
    if (user) {
      await saveSharedAuthState(user);
      // Remove token from URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }
  
  // Check shared auth state
  const sharedAuth = await getSharedAuthState();
  if (sharedAuth) {
    setUser(sharedAuth);
  }
};`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.implementationStep}>
          <h3>{t('documentation:documentationPage.sso.implementation.middleware.title') || '3. Middleware Protection'}</h3>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Next.js middleware for protected routes
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('cybereco-hub-auth');
  const pathname = request.nextUrl.pathname;
  
  // Protected routes
  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  const isProtected = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  if (isProtected && !authCookie) {
    // Redirect to Hub login
    return NextResponse.redirect(
      new URL('/auth/signin', 'https://hub.cybere.co')
    );
  }
  
  return NextResponse.next();
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.development.title') || 'Development Environment'}</h2>
        <p>{t('documentation:documentationPage.sso.development.description') || 'In development, SSO works across different ports using shared authentication state:'}</p>
        
        <div className={styles.portMapping}>
          <h3>{t('documentation:documentationPage.sso.development.ports.title') || 'Application Ports'}</h3>
          <ul>
            <li><strong>Hub:</strong> http://localhost:40000</li>
            <li><strong>Website:</strong> http://localhost:40001</li>
            <li><strong>JustSplit:</strong> http://localhost:40002</li>
          </ul>
        </div>

        <div className={styles.devNote}>
          <h4>{t('documentation:documentationPage.sso.development.note.title') || 'Development Note'}</h4>
          <p>{t('documentation:documentationPage.sso.development.note.description') || 'Firebase Auth tokens are origin-specific. In development, we use shared localStorage state to simulate SSO across different ports. In production, use proper subdomain configuration with shared cookies.'}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.production.title') || 'Production Setup'}</h2>
        
        <div className={styles.productionConfig}>
          <h3>{t('documentation:documentationPage.sso.production.domains.title') || 'Domain Configuration'}</h3>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`# Production domains
hub.cybere.co     # Authentication hub
justsplit.cybere.co   # JustSplit app
somos.cybere.co       # Somos app
demos.cybere.co       # Demos app

# Cookie configuration
Set-Cookie: auth-token=...; 
  Domain=.cybere.co; 
  Path=/; 
  Secure; 
  HttpOnly; 
  SameSite=Strict`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.productionConfig}>
          <h3>{t('documentation:documentationPage.sso.production.firebase.title') || 'Firebase Configuration'}</h3>
          <ul>
            <li>{t('documentation:documentationPage.sso.production.firebase.domains') || 'Add all subdomains to Firebase authorized domains'}</li>
            <li>{t('documentation:documentationPage.sso.production.firebase.cors') || 'Configure CORS for cross-subdomain requests'}</li>
            <li>{t('documentation:documentationPage.sso.production.firebase.cookies') || 'Enable cross-subdomain cookie sharing'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.security.title') || 'Security Considerations'}</h2>
        
        <div className={styles.securityGrid}>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.sso.security.tokens.title') || 'Token Security'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.sso.security.tokens.https') || 'Always use HTTPS in production'}</li>
              <li>{t('documentation:documentationPage.sso.security.tokens.expiry') || 'Implement short token expiry times'}</li>
              <li>{t('documentation:documentationPage.sso.security.tokens.rotation') || 'Rotate refresh tokens on use'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.sso.security.validation.title') || 'Token Validation'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.sso.security.validation.signature') || 'Verify JWT signature'}</li>
              <li>{t('documentation:documentationPage.sso.security.validation.audience') || 'Check audience claims'}</li>
              <li>{t('documentation:documentationPage.sso.security.validation.expiry') || 'Validate expiry time'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h3>{t('documentation:documentationPage.sso.security.session.title') || 'Session Management'}</h3>
            <ul>
              <li>{t('documentation:documentationPage.sso.security.session.logout') || 'Implement global logout'}</li>
              <li>{t('documentation:documentationPage.sso.security.session.monitor') || 'Monitor active sessions'}</li>
              <li>{t('documentation:documentationPage.sso.security.session.revoke') || 'Allow token revocation'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.troubleshooting.title') || 'Troubleshooting'}</h2>
        
        <div className={styles.troubleshootingItem}>
          <h3>{t('documentation:documentationPage.sso.troubleshooting.loops.title') || 'Authentication Loops'}</h3>
          <p>{t('documentation:documentationPage.sso.troubleshooting.loops.description') || 'If users experience redirect loops:'}</p>
          <ul>
            <li>{t('documentation:documentationPage.sso.troubleshooting.loops.check1') || 'Verify token validation logic'}</li>
            <li>{t('documentation:documentationPage.sso.troubleshooting.loops.check2') || 'Check redirect URLs'}</li>
            <li>{t('documentation:documentationPage.sso.troubleshooting.loops.check3') || 'Ensure cookies are properly set'}</li>
          </ul>
        </div>

        <div className={styles.troubleshootingItem}>
          <h3>{t('documentation:documentationPage.sso.troubleshooting.cors.title') || 'CORS Issues'}</h3>
          <p>{t('documentation:documentationPage.sso.troubleshooting.cors.description') || 'For cross-origin authentication:'}</p>
          <ul>
            <li>{t('documentation:documentationPage.sso.troubleshooting.cors.headers') || 'Configure proper CORS headers'}</li>
            <li>{t('documentation:documentationPage.sso.troubleshooting.cors.credentials') || 'Enable credentials in requests'}</li>
            <li>{t('documentation:documentationPage.sso.troubleshooting.cors.origins') || 'Whitelist allowed origins'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.resources.title') || 'Related Documentation'}</h2>
        <ul className={styles.resourcesList}>
          <li>
            <a href="/documentation/jwt-authentication">{t('documentation:documentationPage.sso.resources.jwt') || 'JWT Authentication Guide'}</a>
          </li>
          <li>
            <a href="/documentation/auth-logging">{t('documentation:documentationPage.sso.resources.logging') || 'Authentication Logging'}</a>
          </li>
          <li>
            <a href="/documentation/api">{t('documentation:documentationPage.sso.resources.api') || 'API Reference'}</a>
          </li>
          <li>
            <a href="https://github.com/cybereco/examples/sso">{t('documentation:documentationPage.sso.resources.examples') || 'Example Implementations'}</a>
          </li>
        </ul>
      </section>
    </div>
  );
}