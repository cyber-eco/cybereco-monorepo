'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLock, FaKey, FaUsers, FaShieldAlt, FaCode, FaBook, FaArrowRight, FaCheck, FaCopy } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from '../page.module.css';

export default function AuthenticationDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { t } = useI18n();

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = 'typescript', id }: { code: string; language?: string; id: string }) => (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>{language}</span>
        <button
          className={styles.copyButton}
          onClick={() => copyToClipboard(code, id)}
          aria-label="Copy code"
        >
          {copiedCode === id ? <FaCheck /> : <FaCopy />}
        </button>
      </div>
      <pre className={styles.codeContent}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <>
      <div className={styles.docHeader}>
        <h1>
          <FaLock /> {t('documentation:documentationPage.authenticationNavItem') || 'Authentication Integration'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.authentication.subtitle') || 'Secure, centralized authentication for the entire CyberEco ecosystem'}
        </p>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('documentation:documentationPage.authentication.tabs.overview') || 'Overview'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quickstart' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('quickstart')}
        >
          {t('documentation:documentationPage.authentication.tabs.quickstart') || 'Quick Start'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          {t('documentation:documentationPage.authentication.tabs.architecture') || 'Architecture'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'api' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('api')}
        >
          {t('documentation:documentationPage.authentication.tabs.api') || 'API Reference'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'examples' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          {t('documentation:documentationPage.authentication.tabs.examples') || 'Examples'}
        </button>
      </nav>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <section className={styles.section}>
            <h2>{t('documentation:documentationPage.authentication.overview.title') || 'Unified Authentication System'}</h2>
            <p className={styles.lead}>
              {t('documentation:documentationPage.authentication.overview.description') || 'CyberEco\'s authentication system provides a single sign-on experience across all applications, with centralized user management, permission control, and secure session handling.'}
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <FaKey className={styles.featureIcon} />
                <h3>{t('documentation:documentationPage.authentication.features.sso.title') || 'Single Sign-On'}</h3>
                <p>{t('documentation:documentationPage.authentication.features.sso.description') || 'One account for all CyberEco applications. Sign in once, access everything.'}</p>
              </div>

              <div className={styles.featureCard}>
                <FaUsers className={styles.featureIcon} />
                <h3>{t('documentation:documentationPage.authentication.features.profiles.title') || 'Centralized Profiles'}</h3>
                <p>{t('documentation:documentationPage.authentication.features.profiles.description') || 'User profiles managed in Hub, accessible across all connected applications.'}</p>
              </div>

              <div className={styles.featureCard}>
                <FaShieldAlt className={styles.featureIcon} />
                <h3>{t('documentation:documentationPage.authentication.features.permissions.title') || 'Permission Control'}</h3>
                <p>{t('documentation:documentationPage.authentication.features.permissions.description') || 'Fine-grained permissions for app access, features, and resource-level control.'}</p>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h3>{t('documentation:documentationPage.authentication.benefits.title') || 'Key Benefits'}</h3>
              <ul>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit1') || 'Seamless user experience across applications'}</li>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit2') || 'Reduced authentication complexity for developers'}</li>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit3') || 'Enhanced security with centralized access control'}</li>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit4') || 'Cross-tab and cross-app session synchronization'}</li>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit5') || 'Support for social login providers'}</li>
                <li>{t('documentation:documentationPage.authentication.benefits.benefit6') || 'Built-in permission and role management'}</li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'quickstart' && (
          <section className={styles.section}>
            <h2>{t('documentation:documentationPage.authentication.quickstart.title') || 'Quick Start Guide'}</h2>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>{t('documentation:documentationPage.authentication.quickstart.step1.title') || 'Install Dependencies'}</h3>
                  <CodeBlock
                    id="install"
                    language="bash"
                    code={`npm install @cybereco/auth @cybereco/shared-types @cybereco/firebase-config`}
                  />
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>{t('documentation:documentationPage.authentication.quickstart.step2.title') || 'Define Your User Type'}</h3>
                  <CodeBlock
                    id="usertype"
                    code={`import { BaseUser } from '@cybereco/auth';

interface MyAppUser extends BaseUser {
  subscription: 'free' | 'pro';
  credits: number;
}`}
                  />
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>{t('documentation:documentationPage.authentication.quickstart.step3.title') || 'Create Auth Context'}</h3>
                  <CodeBlock
                    id="context"
                    code={`import { createAuthContext } from '@cybereco/auth';

const { AuthProvider, useAuth } = createAuthContext<MyAppUser>();`}
                  />
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>{t('documentation:documentationPage.authentication.quickstart.step4.title') || 'Wrap Your App'}</h3>
                  <CodeBlock
                    id="provider"
                    code={`<AuthProvider
  config={{
    auth: getHubAuth(),
    db: getHubFirestore()
  }}
  createUserProfile={(user) => ({
    id: user.uid,
    name: user.displayName || 'User',
    subscription: 'free',
    credits: 100
  })}
>
  <App />
</AuthProvider>`}
                  />
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3>{t('documentation:documentationPage.authentication.quickstart.step5.title') || 'Use in Components'}</h3>
                  <CodeBlock
                    id="usage"
                    code={`function Profile() {
  const { userProfile, signOut } = useAuth();
  
  if (!userProfile) return <SignInPrompt />;
  
  return (
    <div>
      <h1>Welcome, {userProfile.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}`}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'architecture' && (
          <section className={styles.section}>
            <h2>{t('documentation:documentationPage.authentication.architecture.title') || 'System Architecture'}</h2>
            
            <div className={styles.architectureFlow}>
              <div className={styles.architectureCard}>
                <h3>{t('documentation:documentationPage.authentication.architecture.hub.title') || 'Hub (Central Auth)'}</h3>
                <ul>
                  <li>{t('documentation:documentationPage.authentication.architecture.hub.item1') || 'User registration & sign-in'}</li>
                  <li>{t('documentation:documentationPage.authentication.architecture.hub.item2') || 'Profile management'}</li>
                  <li>{t('documentation:documentationPage.authentication.architecture.hub.item3') || 'Permission control'}</li>
                  <li>{t('documentation:documentationPage.authentication.architecture.hub.item4') || 'Token generation'}</li>
                </ul>
              </div>
              
              <div className={styles.flowArrow}>
                <FaArrowRight />
              </div>
              
              <div className={styles.architectureCard}>
                <h3>{t('documentation:documentationPage.authentication.architecture.libraries.title') || 'Shared Libraries'}</h3>
                <ul>
                  <li>@cybereco/auth</li>
                  <li>@cybereco/shared-types</li>
                  <li>@cybereco/firebase-config</li>
                </ul>
              </div>
              
              <div className={styles.flowArrow}>
                <FaArrowRight />
              </div>
              
              <div className={styles.architectureCard}>
                <h3>{t('documentation:documentationPage.authentication.architecture.applications.title') || 'Applications'}</h3>
                <ul>
                  <li>JustSplit</li>
                  <li>Somos</li>
                  <li>Demos</li>
                  <li>Plantopia</li>
                </ul>
              </div>
            </div>

            <h3>{t('documentation:documentationPage.authentication.architecture.flow.title') || 'Authentication Flow'}</h3>
            <div className={styles.flowDiagram}>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>1</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step1') || 'User accesses app without auth'}
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>2</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step2') || 'App redirects to Hub sign-in'}
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>3</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step3') || 'User authenticates at Hub'}
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>4</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step4') || 'Hub generates auth token'}
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>5</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step5') || 'Redirect back to app with token'}
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>6</span>
                {t('documentation:documentationPage.authentication.architecture.flow.step6') || 'App validates token & creates session'}
              </div>
            </div>

            <h3>{t('documentation:documentationPage.authentication.architecture.models.title') || 'Data Models'}</h3>
            <div className={styles.dataModels}>
              <div className={styles.model}>
                <h4>BaseUser</h4>
                <p>{t('documentation:documentationPage.authentication.architecture.models.baseUser') || 'Core user fields shared across all apps'}</p>
                <ul>
                  <li>id: string</li>
                  <li>name: string</li>
                  <li>email?: string</li>
                  <li>avatarUrl?: string</li>
                  <li>createdAt?: string</li>
                  <li>updatedAt?: string</li>
                </ul>
              </div>

              <div className={styles.model}>
                <h4>AppPermission</h4>
                <p>{t('documentation:documentationPage.authentication.architecture.models.appPermission') || 'Permission configuration per app'}</p>
                <ul>
                  <li>appId: string</li>
                  <li>roles: string[]</li>
                  <li>features: string[]</li>
                </ul>
              </div>

              <div className={styles.model}>
                <h4>SharedUserProfile</h4>
                <p>{t('documentation:documentationPage.authentication.architecture.models.sharedUserProfile') || 'Extended profile with cross-app data'}</p>
                <ul>
                  <li>...BaseUser fields</li>
                  <li>preferences: object</li>
                  <li>appData: Record</li>
                  <li>permissions: AppPermission[]</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'api' && (
          <section className={styles.section}>
            <h2>{t('documentation:documentationPage.authentication.api.title') || 'API Reference'}</h2>

            <div className={styles.apiSection}>
              <h3>{t('documentation:documentationPage.authentication.api.coreFunctions') || 'Core Functions'}</h3>
              
              <div className={styles.apiMethod}>
                <h4>createAuthContext&lt;T&gt;()</h4>
                <p>{t('documentation:documentationPage.authentication.api.createAuthContext') || 'Factory function for creating type-safe auth contexts'}</p>
                <CodeBlock
                  id="createauth"
                  code={`const { AuthProvider, useAuth, AuthContext } = createAuthContext<MyUserType>();`}
                />
              </div>

              <div className={styles.apiMethod}>
                <h4>useAuth()</h4>
                <p>{t('documentation:documentationPage.authentication.api.useAuth') || 'Hook to access authentication state and methods'}</p>
                <CodeBlock
                  id="useauth"
                  code={`const {
  currentUser,    // Firebase user object
  userProfile,    // App-specific profile
  isLoading,      // Loading state
  signIn,         // Email/password sign in
  signUp,         // Create new account
  signOut,        // Sign out user
  signInWithProvider,  // OAuth sign in
  updateProfile   // Update user data
} = useAuth();`}
                />
              </div>

              <div className={styles.apiMethod}>
                <h4>usePermissions()</h4>
                <p>{t('documentation:documentationPage.authentication.api.usePermissions') || 'Check user permissions for features and roles'}</p>
                <CodeBlock
                  id="usepermissions"
                  code={`const { hasAccess, hasFeature, hasRole } = usePermissions({
  appId: 'myapp',
  user: userProfile,
  requiredFeatures: ['premium-access'],
  requiredRoles: ['admin']
});`}
                />
              </div>

              <div className={styles.apiMethod}>
                <h4>useSessionSync()</h4>
                <p>{t('documentation:documentationPage.authentication.api.useSessionSync') || 'Synchronize auth state across tabs and apps'}</p>
                <CodeBlock
                  id="sessionsync"
                  code={`useSessionSync({
  auth: firebaseAuth,
  onSessionChange: (isAuthenticated) => {
    console.log('Auth changed:', isAuthenticated);
  },
  syncAcrossTabs: true
});`}
                />
              </div>
            </div>

            <div className={styles.apiSection}>
              <h3>{t('documentation:documentationPage.authentication.api.utilityFunctions') || 'Utility Functions'}</h3>
              
              <div className={styles.utilityGrid}>
                <div className={styles.utility}>
                  <code>validateEmail(email)</code>
                  <p>{t('documentation:documentationPage.authentication.api.validateEmail') || 'Validate email format'}</p>
                </div>
                <div className={styles.utility}>
                  <code>validatePassword(password)</code>
                  <p>{t('documentation:documentationPage.authentication.api.validatePassword') || 'Check password strength'}</p>
                </div>
                <div className={styles.utility}>
                  <code>generateAuthRedirectUrl(...)</code>
                  <p>{t('documentation:documentationPage.authentication.api.generateAuthRedirectUrl') || 'Create auth redirect URLs'}</p>
                </div>
                <div className={styles.utility}>
                  <code>getAuthErrorMessage(error)</code>
                  <p>{t('documentation:documentationPage.authentication.api.getAuthErrorMessage') || 'User-friendly error messages'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'examples' && (
          <section className={styles.section}>
            <h2>{t('documentation:documentationPage.authentication.examples.title') || 'Implementation Examples'}</h2>

            <div className={styles.example}>
              <h3>{t('documentation:documentationPage.authentication.examples.protectedRoute.title') || 'Protected Route Component'}</h3>
              <CodeBlock
                id="protectedroute"
                code={`import { useAuth, usePermissions } from '@cybereco/auth';

function ProtectedRoute({ children, requiredFeature }) {
  const { userProfile, isLoading } = useAuth();
  const { hasAccess } = usePermissions({
    appId: 'myapp',
    user: userProfile,
    requiredFeatures: requiredFeature ? [requiredFeature] : []
  });
  
  if (isLoading) return <LoadingSpinner />;
  if (!userProfile) return <Redirect to="/auth/signin" />;
  if (!hasAccess) return <AccessDenied />;
  
  return children;
}`}
              />
            </div>

            <div className={styles.example}>
              <h3>{t('documentation:documentationPage.authentication.examples.crossApp.title') || 'Cross-App Navigation'}</h3>
              <CodeBlock
                id="crossapp"
                code={`function AppLauncher({ targetApp }) {
  const { currentUser } = useAuth();
  
  const launchApp = async () => {
    if (!currentUser) return;
    
    const token = await currentUser.getIdToken();
    const targetUrl = new URL(targetApp.url);
    targetUrl.searchParams.set('token', token);
    
    window.location.href = targetUrl.toString();
  };
  
  return (
    <button onClick={launchApp}>
      Launch {targetApp.name}
    </button>
  );
}`}
              />
            </div>

            <div className={styles.example}>
              <h3>{t('documentation:documentationPage.authentication.examples.permissions.title') || 'Permission-Based Features'}</h3>
              <CodeBlock
                id="permissions"
                code={`function Dashboard() {
  const { userProfile } = useAuth();
  const { hasFeature } = usePermissions({
    appId: 'justsplit',
    user: userProfile
  });
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {hasFeature('expense-tracking') && (
        <ExpenseTracker />
      )}
      
      {hasFeature('budget-management') && (
        <BudgetManager />
      )}
      
      {hasFeature('analytics') && (
        <AnalyticsDashboard />
      )}
    </div>
  );
}`}
              />
            </div>

            <div className={styles.example}>
              <h3>{t('documentation:documentationPage.authentication.examples.errorHandling.title') || 'Error Handling'}</h3>
              <CodeBlock
                id="errorhandling"
                code={`async function handleSignIn(email, password) {
  try {
    await signIn(email, password);
    navigate('/dashboard');
  } catch (error) {
    const { code, userFriendlyMessage } = getAuthErrorMessage(error);
    
    switch (code) {
      case 'auth/user-not-found':
        showError('No account found. Sign up?');
        break;
      case 'auth/too-many-requests':
        showError('Too many attempts. Try later.');
        break;
      default:
        showError(userFriendlyMessage);
    }
  }
}`}
              />
            </div>
          </section>
        )}
      </div>

      <div className={styles.nextSteps}>
        <h2>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h2>
        <div className={styles.linkGrid}>
          <Link href="/documentation/jwt-authentication" className={styles.docLink}>
            <FaLock />
            <span>{t('documentation:documentationPage.jwt.title') || 'JWT Authentication'}</span>
          </Link>
          <Link href="/documentation/sso-integration" className={styles.docLink}>
            <FaUsers />
            <span>{t('documentation:documentationPage.sso.title') || 'SSO Integration'}</span>
          </Link>
          <Link href="/documentation/privacy-controls" className={styles.docLink}>
            <FaShieldAlt />
            <span>{t('documentation:documentationPage.privacy.title') || 'Privacy Controls'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}