'use client';

import styles from './page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaUsers, FaShieldAlt, FaRocket, FaTachometerAlt, FaCog, FaServer, FaCloud, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaCode, FaKey, FaLock, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';

export default function SSOIntegrationDocs() {
  const { t } = useI18n();

  // Define tab content functions
  const renderOverviewTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.overview.title') || 'Overview'}</h2>
        <p>{t('documentation:documentationPage.sso.overview.description') || 'CyberEco\'s Single Sign-On (SSO) system allows users to authenticate once through the Hub and seamlessly access all ecosystem applications without re-entering credentials.'}</p>
        
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <FaRocket className={styles.benefitIcon} />
            <h3>Seamless Experience</h3>
            <p>{t('documentation:documentationPage.sso.benefits.seamless') || 'One login for all CyberEco applications - users authenticate once and access everything.'}</p>
          </div>
          <div className={styles.benefitCard}>
            <FaShieldAlt className={styles.benefitIcon} />
            <h3>Enhanced Security</h3>
            <p>{t('documentation:documentationPage.sso.benefits.security') || 'Centralized authentication with JWT tokens and secure session management.'}</p>
          </div>
          <div className={styles.benefitCard}>
            <FaCog className={styles.benefitIcon} />
            <h3>Easy Management</h3>
            <p>{t('documentation:documentationPage.sso.benefits.management') || 'Centralized user management and permission control across the ecosystem.'}</p>
          </div>
          <div className={styles.benefitCard}>
            <FaUsers className={styles.benefitIcon} />
            <h3>Better UX</h3>
            <p>{t('documentation:documentationPage.sso.benefits.consistent') || 'Consistent interface and reduced authentication friction.'}</p>
          </div>
        </div>

        <div className={styles.infoBox}>
          <h3><FaLightbulb /> Quick Start</h3>
          <p>Get started with SSO integration in under 10 minutes using our pre-built authentication components and shared libraries.</p>
          <div className={styles.quickLinks}>
            <a href="#implementation" className={styles.quickLink}>
              <FaCode /> View Implementation Guide
            </a>
            <a href="#configuration" className={styles.quickLink}>
              <FaCog /> Setup Configuration
            </a>
          </div>
        </div>
      </section>
    </>
  );

  const renderArchitectureTab = () => (
    <>
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
    </>
  );

  const renderImplementationTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.implementation.title') || 'Implementation Guide'}</h2>
        
        <div className={styles.implementationStep}>
          <h3><FaServer /> {t('documentation:documentationPage.sso.implementation.hub.title') || '1. Hub Setup (Authentication Provider)'}</h3>
          <p>The Hub acts as the central authentication authority, managing user sessions and issuing JWT tokens.</p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Hub Auth Service</span>
              <span className={styles.fileName}>services/authTokenService.ts</span>
            </div>
            <pre><code>{`// Hub authentication service
import { jwtService } from '@cybereco/auth';
import type { AuthUser, TokenPair } from '@cybereco/shared-types';

export class AuthTokenService {
  /**
   * Generate authenticated URL for app navigation
   * @param baseUrl - Target app URL
   * @param user - Authenticated user
   * @param appId - Target application ID
   */
  static async generateAppUrl(
    baseUrl: string,
    user: AuthUser,
    appId: string
  ): Promise<string> {
    // Generate JWT token pair
    const tokenPair: TokenPair = jwtService.generateTokenPair(user);
    
    // Include app permissions in token
    const appPermissions = await this.getAppPermissions(user.uid, appId);
    
    const params = new URLSearchParams({
      authToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      appId: appId,
      permissions: JSON.stringify(appPermissions)
    });
    
    return \`\${baseUrl}?\${params.toString()}\`;
  }
  
  /**
   * Get user permissions for specific app
   */
  private static async getAppPermissions(
    userId: string, 
    appId: string
  ): Promise<string[]> {
    // Implementation for fetching user app permissions
    const permissions = await db.collection('userPermissions')
      .where('userId', '==', userId)
      .where('appId', '==', appId)
      .get();
      
    return permissions.docs.map(doc => doc.data().permission);
  }
}`}</code></pre>
          </div>
        </div>

        <div className={styles.implementationStep}>
          <h3><FaCode /> {t('documentation:documentationPage.sso.implementation.app.title') || '2. App Integration (Consumer)'}</h3>
          <p>Integrate SSO into your app using the shared authentication library.</p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>App Authentication Setup</span>
              <span className={styles.fileName}>app/layout.tsx</span>
            </div>
            <pre><code>{`import { createAuthContext } from '@cybereco/auth';
import { AppUser } from '@cybereco/shared-types';
import { getHubAuth, getHubFirestore } from '@cybereco/firebase-config';

// Create typed auth context for your app
const { AuthProvider, useAuth } = createAuthContext<AppUser>();

// App layout with authentication
export default function AppLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AuthProvider 
      config={{
        auth: getHubAuth(),
        db: getHubFirestore(),
        onAuthStateChange: (user) => {
          // Handle auth state changes
          console.log('Auth state changed:', user);
        },
        redirectTo: '/auth/signin'
      }}
    >
      <div className="app-container">
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

// Using auth in components
export function UserProfile() {
  const { user, signOut, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return (
    <div className="user-profile">
      <h2>Welcome, {user.displayName}</h2>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}`}</code></pre>
          </div>
        </div>

        <div className={styles.implementationStep}>
          <h3><FaLock /> {t('documentation:documentationPage.sso.implementation.middleware.title') || '3. Middleware Protection'}</h3>
          <p>Protect routes and API endpoints using Next.js middleware with token verification.</p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Route Protection Middleware</span>
              <span className={styles.fileName}>middleware.ts</span>
            </div>
            <pre><code>{`import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, refreshTokenIfNeeded } from '@cybereco/auth';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/api/protected'
];

// Public routes that don't require auth
const PUBLIC_ROUTES = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/public'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes and static files
  if (PUBLIC_ROUTES.includes(pathname) || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }
  
  // Check if route requires protection
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Get tokens from cookies or headers
  const authToken = request.cookies.get('authToken')?.value || 
                    request.headers.get('authorization')?.replace('Bearer ', '');
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  if (!authToken) {
    return redirectToSignIn(request);
  }
  
  try {
    // Verify the token
    const verified = await verifyToken(authToken);
    
    if (verified) {
      // Token is valid, allow access
      return NextResponse.next();
    }
    
    // Try to refresh the token
    if (refreshToken) {
      const newTokens = await refreshTokenIfNeeded(refreshToken);
      
      if (newTokens) {
        // Set new tokens in response cookies
        const response = NextResponse.next();
        response.cookies.set('authToken', newTokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 // 1 hour
        });
        return response;
      }
    }
    
    // Both tokens invalid, redirect to sign in
    return redirectToSignIn(request);
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    return redirectToSignIn(request);
  }
}

function redirectToSignIn(request: NextRequest) {
  const signInUrl = new URL('/auth/signin', request.url);
  signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/public (public API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/public|_next/static|_next/image|favicon.ico).*)',
  ],
};`}</code></pre>
          </div>
        </div>

        <div className={styles.implementationStep}>
          <h3><FaKey /> 4. API Route Protection</h3>
          <p>Secure your API endpoints with SSO token verification.</p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Protected API Route</span>
              <span className={styles.fileName}>api/protected/user/route.ts</span>
            </div>
            <pre><code>{`import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken, getUserFromToken } from '@cybereco/auth';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }
    
    // Verify token and get user
    const user = await getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Check permissions for this endpoint
    if (!user.permissions.includes('read:profile')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      user: {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        permissions: user.permissions
      }
    });
    
  } catch (error) {
    console.error('API auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}`}</code></pre>
          </div>
        </div>
      </section>
    </>
  );

  const renderConfigurationTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.configuration.title') || 'Configuration'}</h2>
        
        <div className={styles.configSection}>
          <h3><FaCog /> {t('documentation:documentationPage.sso.configuration.development.title') || 'Development Setup'}</h3>
          <p>{t('documentation:documentationPage.sso.configuration.development.description') || 'For local development, SSO works through shared authentication state:'}</p>
          
          <div className={styles.configGrid}>
            <div className={styles.configCard}>
              <FaServer className={styles.configIcon} />
              <h4>Firebase Emulator</h4>
              <p>Centralized auth at localhost:9099</p>
            </div>
            <div className={styles.configCard}>
              <FaLink className={styles.configIcon} />
              <h4>Shared State</h4>
              <p>localStorage for cross-app sessions</p>
            </div>
            <div className={styles.configCard}>
              <FaRocket className={styles.configIcon} />
              <h4>Port Mapping</h4>
              <p>Hub:40000, Website:40001, JustSplit:40002</p>
            </div>
            <div className={styles.configCard}>
              <FaCloud className={styles.configIcon} />
              <h4>Gateway Proxy</h4>
              <p>Unified access on port 3000</p>
            </div>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Environment Configuration</span>
              <span className={styles.fileName}>.env.local</span>
            </div>
            <pre><code>{`# Firebase Emulator Configuration
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost:8080
NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST=localhost:5001

# App URLs for development
NEXT_PUBLIC_HUB_URL=http://localhost:40000
NEXT_PUBLIC_WEBSITE_URL=http://localhost:40001
NEXT_PUBLIC_JUSTSPLIT_URL=http://localhost:40002
NEXT_PUBLIC_GATEWAY_URL=http://localhost:3000

# SSO Configuration
NEXT_PUBLIC_SSO_DOMAIN=localhost
NEXT_PUBLIC_SSO_SECURE=false
NEXT_PUBLIC_SSO_SAME_SITE=lax

# JWT Configuration
JWT_SECRET=your-dev-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d`}</code></pre>
          </div>
        </div>

        <div className={styles.configSection}>
          <h3><FaCloud /> {t('documentation:documentationPage.sso.configuration.production.title') || 'Production Setup'}</h3>
          <p>{t('documentation:documentationPage.sso.configuration.production.description') || 'Production SSO uses secure cookies and domain configuration:'}</p>
          
          <div className={styles.warningBox}>
            <h4><FaExclamationTriangle /> Production Security</h4>
            <p>Ensure all domains use HTTPS and proper cookie security settings for production deployment.</p>
          </div>
          
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Production Environment</span>
              <span className={styles.fileName}>.env.production</span>
            </div>
            <pre><code>{`# Production Firebase Configuration
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cybereco-prod
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth.cybere.co
NEXT_PUBLIC_FIREBASE_API_KEY=your-production-api-key

# Production App URLs
NEXT_PUBLIC_HUB_URL=https://hub.cybere.co
NEXT_PUBLIC_WEBSITE_URL=https://cybere.co
NEXT_PUBLIC_JUSTSPLIT_URL=https://justsplit.cybere.co

# Production SSO Configuration
NEXT_PUBLIC_SSO_DOMAIN=.cybere.co
NEXT_PUBLIC_SSO_SECURE=true
NEXT_PUBLIC_SSO_SAME_SITE=lax

# JWT Configuration (use strong secrets in production)
JWT_SECRET=your-super-secure-production-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Security Headers
NEXT_PUBLIC_CSP_REPORT_URI=https://cybere.co/api/csp-report`}</code></pre>
          </div>
          
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Cookie Configuration</span>
              <span className={styles.fileName}>lib/cookies.ts</span>
            </div>
            <pre><code>{`import { NextResponse } from 'next/server';

// Production cookie configuration
const PRODUCTION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  domain: '.cybere.co', // Shared across subdomains
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Development cookie configuration
const DEVELOPMENT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax' as const,
  domain: 'localhost',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export function getSSoCookieOptions() {
  return process.env.NODE_ENV === 'production' 
    ? PRODUCTION_COOKIE_OPTIONS 
    : DEVELOPMENT_COOKIE_OPTIONS;
}

export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string
) {
  const options = getSSoCookieOptions();
  
  response.cookies.set('authToken', accessToken, {
    ...options,
    maxAge: 60 * 60 * 1000 // 1 hour for access token
  });
  
  response.cookies.set('refreshToken', refreshToken, {
    ...options,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days for refresh token
  });
  
  return response;
}

export function clearAuthCookies(response: NextResponse) {
  const options = getSSoCookieOptions();
  
  response.cookies.set('authToken', '', {
    ...options,
    maxAge: 0
  });
  
  response.cookies.set('refreshToken', '', {
    ...options,
    maxAge: 0
  });
  
  return response;
}`}</code></pre>
          </div>
        </div>

        <div className={styles.configSection}>
          <h3><FaServer /> {t('documentation:documentationPage.sso.configuration.cors.title') || 'CORS Configuration'}</h3>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// CORS setup for cross-app requests
const corsOptions = {
  origin: [
    'https://hub.cybere.co',
    'https://justsplit.cybere.co',
    'https://cybere.co'
  ],
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type']
};`}</code>
            </pre>
          </div>
        </div>
      </section>
    </>
  );

  const renderBestPracticesTab = () => (
    <>
      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.bestPractices.title') || 'Best Practices'}</h2>
        
        <div className={styles.bestPractice}>
          <h3><FaShieldAlt /> {t('documentation:documentationPage.sso.bestPractices.security.title') || 'Security Best Practices'}</h3>
          <div className={styles.securityTips}>
            <div className={styles.securityTip}>
              <FaLock className={styles.tipIcon} />
              <div>
                <strong>HTTPS Everywhere</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.https') || 'Always use HTTPS in production for secure token transmission'}</span>
              </div>
            </div>
            <div className={styles.securityTip}>
              <FaKey className={styles.tipIcon} />
              <div>
                <strong>Token Rotation</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.rotation') || 'Implement automatic token rotation for long-lived sessions'}</span>
              </div>
            </div>
            <div className={styles.securityTip}>
              <FaCheckCircle className={styles.tipIcon} />
              <div>
                <strong>Token Validation</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.validation') || 'Verify tokens on every protected endpoint request'}</span>
              </div>
            </div>
            <div className={styles.securityTip}>
              <FaCog className={styles.tipIcon} />
              <div>
                <strong>Short Expiry</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.expiry') || 'Use 1-hour expiry for access tokens, 7 days for refresh tokens'}</span>
              </div>
            </div>
            <div className={styles.securityTip}>
              <FaShieldAlt className={styles.tipIcon} />
              <div>
                <strong>{t('documentation:documentationPage.sso.bestPractices.security.storageTitle') || 'Secure Storage'}</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.storageDesc') || 'Store tokens in httpOnly cookies, never in localStorage'}</span>
              </div>
            </div>
            <div className={styles.securityTip}>
              <FaExclamationTriangle className={styles.tipIcon} />
              <div>
                <strong>{t('documentation:documentationPage.sso.bestPractices.security.rateLimiting') || 'Rate Limiting'}</strong>
                <span>{t('documentation:documentationPage.sso.bestPractices.security.rateLimitingDesc') || 'Implement rate limiting on authentication endpoints'}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Security Implementation</span>
              <span className={styles.fileName}>lib/security.ts</span>
            </div>
            <pre><code>{`import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting for auth endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts',
  standardHeaders: true,
  legacyHeaders: false
});

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://apis.google.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.cybere.co'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false
});

// JWT token validation
export async function validateJWTToken(token: string): Promise<boolean> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Check token expiry
    if (typeof decoded === 'object' && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        return false;
      }
    }
    
    // Additional validation logic
    return true;
  } catch (error) {
    console.error('JWT validation error:', error);
    return false;
  }
}`}</code></pre>
          </div>
        </div>

        <div className={styles.bestPractice}>
          <h3><FaRocket /> {t('documentation:documentationPage.sso.bestPractices.ux.title') || 'User Experience'}</h3>
          <ul>
            <li>{t('documentation:documentationPage.sso.bestPractices.ux.seamless') || 'Provide seamless navigation between apps'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.ux.loading') || 'Show loading states during authentication'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.ux.errors') || 'Handle authentication errors gracefully'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.ux.logout') || 'Implement global logout across all apps'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.ux.remember') || 'Offer "Remember me" functionality'}</li>
          </ul>
        </div>

        <div className={styles.bestPractice}>
          <h3><FaTachometerAlt /> {t('documentation:documentationPage.sso.bestPractices.performance.title') || 'Performance'}</h3>
          <ul>
            <li>{t('documentation:documentationPage.sso.bestPractices.performance.cache') || 'Cache user profiles locally'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.performance.prefetch') || 'Prefetch authentication state'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.performance.lazy') || 'Lazy load authentication components'}</li>
            <li>{t('documentation:documentationPage.sso.bestPractices.performance.batch') || 'Batch permission checks'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('documentation:documentationPage.sso.troubleshooting.title') || 'Common Issues'}</h2>
        
        <div className={styles.warningBox}>
          <h4>⚠️ {t('documentation:documentationPage.sso.troubleshooting.note') || 'Troubleshooting Tips'}</h4>
          <p>{t('documentation:documentationPage.sso.troubleshooting.description') || 'Most SSO issues are related to configuration mismatches between environments.'}</p>
        </div>
        
        <div className={styles.troubleshootingItem}>
          <h4>{t('documentation:documentationPage.sso.troubleshooting.crossOrigin.title') || 'Cross-Origin Authentication Failed'}</h4>
          <p>{t('documentation:documentationPage.sso.troubleshooting.crossOrigin.solution') || 'Ensure CORS is properly configured and cookies have correct domain settings.'}</p>
        </div>
        
        <div className={styles.troubleshootingItem}>
          <h4>{t('documentation:documentationPage.sso.troubleshooting.tokenExpired.title') || 'Token Expired During Navigation'}</h4>
          <p>{t('documentation:documentationPage.sso.troubleshooting.tokenExpired.solution') || 'Implement automatic token refresh before navigation to other apps.'}</p>
        </div>
        
        <div className={styles.troubleshootingItem}>
          <h4>{t('documentation:documentationPage.sso.troubleshooting.sessionSync.title') || 'Sessions Not Syncing'}</h4>
          <p>{t('documentation:documentationPage.sso.troubleshooting.sessionSync.solution') || 'Check that all apps are using the same auth domain and cookie settings.'}</p>
        </div>
      </section>
    </>
  );

  // Define tabs
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.sso.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'architecture',
      label: t('documentation:documentationPage.sso.tabs.architecture') || 'Architecture',
      content: renderArchitectureTab()
    },
    {
      id: 'implementation',
      label: t('documentation:documentationPage.sso.tabs.implementation') || 'Implementation',
      content: renderImplementationTab()
    },
    {
      id: 'configuration',
      label: t('documentation:documentationPage.sso.tabs.configuration') || 'Configuration',
      content: renderConfigurationTab()
    },
    {
      id: 'bestPractices',
      label: t('documentation:documentationPage.sso.tabs.bestPractices') || 'Best Practices',
      content: renderBestPracticesTab()
    }
  ];

  return (
    <div className={styles.container}>
      <DocumentationHero
        icon={<FaUsers />}
        title={t('documentation:documentationPage.sso.title') || 'Single Sign-On (SSO) Integration'}
        subtitle={t('documentation:documentationPage.sso.subtitle') || 'Seamless authentication across all CyberEco applications'}
        gradient="linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #6366f1 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />
    </div>
  );
}