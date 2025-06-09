'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLock, FaKey, FaUsers, FaShieldAlt, FaCode, FaArrowRight, FaCheck, FaRocket, FaDatabase } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from './page.module.css';

export default function AuthenticationDocumentation() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderOverviewTab = () => (
    <div className={styles.tabContent}>
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

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.benefits.title') || 'Key Benefits'}</h2>
        <ul className={styles.benefitsList}>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit1') || 'Seamless user experience across applications'}</li>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit2') || 'Reduced authentication complexity for developers'}</li>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit3') || 'Enhanced security with centralized access control'}</li>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit4') || 'Cross-tab and cross-app session synchronization'}</li>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit5') || 'Support for social login providers'}</li>
          <li><FaCheck className={styles.checkIcon} /> {t('documentation:documentationPage.authentication.benefits.benefit6') || 'Built-in permission and role management'}</li>
        </ul>
      </div>
    </div>
  );

  const renderQuickstartTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.quickstartSteps}>
        <div className={styles.quickstartStep}>
          <h3>{t('documentation:documentationPage.authentication.quickstart.step1.title') || 'Install Dependencies'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>Terminal</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode('npm install @cybereco/auth @cybereco/shared-types @cybereco/firebase-config', 'install-deps')}
              >
                {copiedCode === 'install-deps' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>npm install @cybereco/auth @cybereco/shared-types @cybereco/firebase-config</code>
            </pre>
          </div>
        </div>

        <div className={styles.quickstartStep}>
          <h3>{t('documentation:documentationPage.authentication.quickstart.step2.title') || 'Define Your User Type'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>types.ts</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(userTypeCode, 'user-type')}
              >
                {copiedCode === 'user-type' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{userTypeCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.quickstartStep}>
          <h3>{t('documentation:documentationPage.authentication.quickstart.step3.title') || 'Create Auth Context'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>auth.ts</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(authContextCode, 'auth-context')}
              >
                {copiedCode === 'auth-context' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{authContextCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.quickstartStep}>
          <h3>{t('documentation:documentationPage.authentication.quickstart.step4.title') || 'Wrap Your App'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>App.tsx</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(wrapAppCode, 'wrap-app')}
              >
                {copiedCode === 'wrap-app' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{wrapAppCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.quickstartStep}>
          <h3>{t('documentation:documentationPage.authentication.quickstart.step5.title') || 'Use in Components'}</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>Profile.tsx</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(profileComponentCode, 'profile-component')}
              >
                {copiedCode === 'profile-component' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{profileComponentCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArchitectureTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.architectureGrid}>
        <div className={styles.architectureCard}>
          <FaLock className={styles.architectureIcon} />
          <h3>{t('documentation:documentationPage.authentication.architecture.hub.title') || 'Hub (Central Auth)'}</h3>
          <ul className={styles.architectureList}>
            <li>{t('documentation:documentationPage.authentication.architecture.hub.item1') || 'User registration & sign-in'}</li>
            <li>{t('documentation:documentationPage.authentication.architecture.hub.item2') || 'Profile management'}</li>
            <li>{t('documentation:documentationPage.authentication.architecture.hub.item3') || 'Permission control'}</li>
            <li>{t('documentation:documentationPage.authentication.architecture.hub.item4') || 'Token generation'}</li>
          </ul>
        </div>

        <div className={styles.architectureCard}>
          <FaCode className={styles.architectureIcon} />
          <h3>{t('documentation:documentationPage.authentication.architecture.libraries.title') || 'Shared Libraries'}</h3>
          <ul className={styles.architectureList}>
            <li>@cybereco/auth</li>
            <li>@cybereco/shared-types</li>
            <li>@cybereco/firebase-config</li>
          </ul>
        </div>

        <div className={styles.architectureCard}>
          <FaRocket className={styles.architectureIcon} />
          <h3>{t('documentation:documentationPage.authentication.architecture.applications.title') || 'Applications'}</h3>
          <ul className={styles.architectureList}>
            <li>JustSplit</li>
            <li>Somos</li>
            <li>Demos</li>
            <li>Plantopia</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.architecture.flow.title') || 'Authentication Flow'}</h2>
        <div className={styles.flowSteps}>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>1</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step1') || 'User accesses app without auth'}</span>
          </div>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>2</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step2') || 'App redirects to Hub sign-in'}</span>
          </div>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>3</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step3') || 'User authenticates at Hub'}</span>
          </div>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>4</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step4') || 'Hub generates auth token'}</span>
          </div>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>5</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step5') || 'Redirect back to app with token'}</span>
          </div>
          <div className={styles.flowStep}>
            <span className={styles.stepNumber}>6</span>
            <span>{t('documentation:documentationPage.authentication.architecture.flow.step6') || 'App validates token & creates session'}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.architecture.models.title') || 'Data Models'}</h2>
        <div className={styles.modelsGrid}>
          <div className={styles.modelCard}>
            <FaDatabase className={styles.modelIcon} />
            <h4>BaseUser</h4>
            <p>{t('documentation:documentationPage.authentication.architecture.models.baseUser') || 'Core user fields shared across all apps'}</p>
            <ul className={styles.modelFields}>
              <li>id: string</li>
              <li>name: string</li>
              <li>email?: string</li>
              <li>avatarUrl?: string</li>
              <li>createdAt?: string</li>
              <li>updatedAt?: string</li>
            </ul>
          </div>

          <div className={styles.modelCard}>
            <FaShieldAlt className={styles.modelIcon} />
            <h4>AppPermission</h4>
            <p>{t('documentation:documentationPage.authentication.architecture.models.appPermission') || 'Permission configuration per app'}</p>
            <ul className={styles.modelFields}>
              <li>appId: string</li>
              <li>roles: string[]</li>
              <li>features: string[]</li>
            </ul>
          </div>

          <div className={styles.modelCard}>
            <FaUsers className={styles.modelIcon} />
            <h4>SharedUserProfile</h4>
            <p>{t('documentation:documentationPage.authentication.architecture.models.sharedUserProfile') || 'Extended profile with cross-app data'}</p>
            <ul className={styles.modelFields}>
              <li>...BaseUser fields</li>
              <li>preferences: object</li>
              <li>appData: Record</li>
              <li>permissions: AppPermission[]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.api.coreFunctions') || 'Core Functions'}</h2>
        
        <div className={styles.apiFunction}>
          <h3>createAuthContext&lt;T&gt;()</h3>
          <p className={styles.functionDescription}>
            {t('documentation:documentationPage.authentication.api.createAuthContext') || 'Factory function for creating type-safe auth contexts'}
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>Example</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(createAuthContextCode, 'create-auth-context')}
              >
                {copiedCode === 'create-auth-context' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{createAuthContextCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.apiFunction}>
          <h3>useAuth()</h3>
          <p className={styles.functionDescription}>
            {t('documentation:documentationPage.authentication.api.useAuth') || 'Hook to access authentication state and methods'}
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>Return Values</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(useAuthCode, 'use-auth')}
              >
                {copiedCode === 'use-auth' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{useAuthCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.apiFunction}>
          <h3>usePermissions()</h3>
          <p className={styles.functionDescription}>
            {t('documentation:documentationPage.authentication.api.usePermissions') || 'Check user permissions for features and roles'}
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>Usage</span>
              <button 
                className={styles.copyButton}
                onClick={() => handleCopyCode(usePermissionsCode, 'use-permissions')}
              >
                {copiedCode === 'use-permissions' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{usePermissionsCode}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.api.utilityFunctions') || 'Utility Functions'}</h2>
        <div className={styles.utilityGrid}>
          <div className={styles.utilityCard}>
            <h4>validateEmail(email)</h4>
            <p>{t('documentation:documentationPage.authentication.api.validateEmail') || 'Validate email format'}</p>
          </div>
          <div className={styles.utilityCard}>
            <h4>validatePassword(password)</h4>
            <p>{t('documentation:documentationPage.authentication.api.validatePassword') || 'Check password strength'}</p>
          </div>
          <div className={styles.utilityCard}>
            <h4>generateAuthRedirectUrl(...)</h4>
            <p>{t('documentation:documentationPage.authentication.api.generateAuthRedirectUrl') || 'Create auth redirect URLs'}</p>
          </div>
          <div className={styles.utilityCard}>
            <h4>getAuthErrorMessage(error)</h4>
            <p>{t('documentation:documentationPage.authentication.api.getAuthErrorMessage') || 'User-friendly error messages'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamplesTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.examples.protectedRoute.title') || 'Protected Route Component'}</h2>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>ProtectedRoute.tsx</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(protectedRouteCode, 'protected-route')}
            >
              {copiedCode === 'protected-route' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{protectedRouteCode}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.examples.crossApp.title') || 'Cross-App Navigation'}</h2>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>AppLauncher.tsx</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(crossAppCode, 'cross-app')}
            >
              {copiedCode === 'cross-app' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{crossAppCode}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>{t('documentation:documentationPage.authentication.examples.permissions.title') || 'Permission-Based Features'}</h2>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>Dashboard.tsx</span>
            <button 
              className={styles.copyButton}
              onClick={() => handleCopyCode(permissionsCode, 'permissions')}
            >
              {copiedCode === 'permissions' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{permissionsCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  // Define tabs for the authentication page
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.authentication.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'quickstart',
      label: t('documentation:documentationPage.authentication.tabs.quickstart') || 'Quick Start',
      content: renderQuickstartTab()
    },
    {
      id: 'architecture',
      label: t('documentation:documentationPage.authentication.tabs.architecture') || 'Architecture',
      content: renderArchitectureTab()
    },
    {
      id: 'api',
      label: t('documentation:documentationPage.authentication.tabs.api') || 'API Reference',
      content: renderApiTab()
    },
    {
      id: 'examples',
      label: t('documentation:documentationPage.authentication.tabs.examples') || 'Examples',
      content: renderExamplesTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaLock />}
        title={t('documentation:documentationPage.authenticationNavItem') || 'Authentication Integration'}
        subtitle={t('documentation:documentationPage.authentication.subtitle') || 'Secure, centralized authentication for the entire CyberEco ecosystem'}
        gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <div className={styles.nextStepsSection}>
        <h2>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h2>
        <div className={styles.nextStepsGrid}>
          <Link href="/documentation/jwt-authentication" className={styles.nextStepCard}>
            <FaLock className={styles.nextStepIcon} />
            <h3>{t('documentation:documentationPage.jwt.title') || 'JWT Authentication'}</h3>
            <p>Learn about JWT tokens and secure API authentication</p>
            <FaArrowRight className={styles.arrowIcon} />
          </Link>
          <Link href="/documentation/sso-integration" className={styles.nextStepCard}>
            <FaUsers className={styles.nextStepIcon} />
            <h3>{t('documentation:documentationPage.sso.title') || 'SSO Integration'}</h3>
            <p>Implement single sign-on across applications</p>
            <FaArrowRight className={styles.arrowIcon} />
          </Link>
          <Link href="/documentation/privacy-controls" className={styles.nextStepCard}>
            <FaShieldAlt className={styles.nextStepIcon} />
            <h3>{t('documentation:documentationPage.privacy.title') || 'Privacy Controls'}</h3>
            <p>Configure privacy settings and data protection</p>
            <FaArrowRight className={styles.arrowIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Code examples
const userTypeCode = `import { BaseUser } from '@cybereco/auth';

interface MyAppUser extends BaseUser {
  subscription: 'free' | 'pro';
  credits: number;
}`;

const authContextCode = `import { createAuthContext } from '@cybereco/auth';

const { AuthProvider, useAuth } = createAuthContext<MyAppUser>();`;

const wrapAppCode = `<AuthProvider
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
</AuthProvider>`;

const profileComponentCode = `function Profile() {
  const { userProfile, signOut } = useAuth();
  
  if (!userProfile) return <SignInPrompt />;
  
  return (
    <div>
      <h1>Welcome, {userProfile.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}`;

const createAuthContextCode = `const { AuthProvider, useAuth, AuthContext } = createAuthContext<MyUserType>();`;

const useAuthCode = `const {
  currentUser,    // Firebase user object
  userProfile,    // App-specific profile
  isLoading,      // Loading state
  signIn,         // Email/password sign in
  signUp,         // Create new account
  signOut,        // Sign out user
  signInWithProvider,  // OAuth sign in
  updateProfile   // Update user data
} = useAuth();`;

const usePermissionsCode = `const { hasAccess, hasFeature, hasRole } = usePermissions({
  appId: 'myapp',
  user: userProfile,
  requiredFeatures: ['premium-access'],
  requiredRoles: ['admin']
});`;

const protectedRouteCode = `import { useAuth, usePermissions } from '@cybereco/auth';

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
}`;

const crossAppCode = `function AppLauncher({ targetApp }) {
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
}`;

const permissionsCode = `function Dashboard() {
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
}`;