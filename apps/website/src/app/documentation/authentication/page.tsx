'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLock, FaKey, FaUsers, FaShieldAlt, FaCode, FaBook, FaArrowRight, FaCheck, FaCopy } from 'react-icons/fa';
import styles from './page.module.css';

export default function AuthenticationDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <FaLock className={styles.titleIcon} />
            Authentication Integration
          </h1>
          <p className={styles.subtitle}>
            Secure, centralized authentication for the entire CyberEco ecosystem
          </p>
        </div>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quickstart' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('quickstart')}
        >
          Quick Start
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          Architecture
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'api' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('api')}
        >
          API Reference
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'examples' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          Examples
        </button>
      </nav>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <section className={styles.section}>
            <h2>Unified Authentication System</h2>
            <p className={styles.lead}>
              CyberEco's authentication system provides a single sign-on experience across all applications,
              with centralized user management, permission control, and secure session handling.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaKey />
                </div>
                <h3>Single Sign-On</h3>
                <p>One account for all CyberEco applications. Sign in once, access everything.</p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaUsers />
                </div>
                <h3>Centralized Profiles</h3>
                <p>User profiles managed in Hub, accessible across all connected applications.</p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <FaShieldAlt />
                </div>
                <h3>Permission Control</h3>
                <p>Fine-grained permissions for app access, features, and resource-level control.</p>
              </div>
            </div>

            <div className={styles.benefits}>
              <h3>Key Benefits</h3>
              <ul className={styles.benefitsList}>
                <li><FaCheck /> Seamless user experience across applications</li>
                <li><FaCheck /> Reduced authentication complexity for developers</li>
                <li><FaCheck /> Enhanced security with centralized access control</li>
                <li><FaCheck /> Cross-tab and cross-app session synchronization</li>
                <li><FaCheck /> Support for social login providers</li>
                <li><FaCheck /> Built-in permission and role management</li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'quickstart' && (
          <section className={styles.section}>
            <h2>Quick Start Guide</h2>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Install Dependencies</h3>
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
                  <h3>Define Your User Type</h3>
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
                  <h3>Create Auth Context</h3>
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
                  <h3>Wrap Your App</h3>
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
                  <h3>Use in Components</h3>
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
            <h2>System Architecture</h2>
            
            <div className={styles.architectureFlow}>
              <div className={styles.architectureCard}>
                <h3>Hub (Central Auth)</h3>
                <ul>
                  <li>User registration & sign-in</li>
                  <li>Profile management</li>
                  <li>Permission control</li>
                  <li>Token generation</li>
                </ul>
              </div>
              
              <div className={styles.flowArrow}>
                <FaArrowRight />
              </div>
              
              <div className={styles.architectureCard}>
                <h3>Shared Libraries</h3>
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
                <h3>Applications</h3>
                <ul>
                  <li>JustSplit</li>
                  <li>Somos</li>
                  <li>Demos</li>
                  <li>Plantopia</li>
                </ul>
              </div>
            </div>

            <h3>Authentication Flow</h3>
            <div className={styles.flowDiagram}>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>1</span>
                User accesses app without auth
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>2</span>
                App redirects to Hub sign-in
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>3</span>
                User authenticates at Hub
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>4</span>
                Hub generates auth token
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>5</span>
                Redirect back to app with token
              </div>
              <div className={styles.flowStep}>
                <span className={styles.flowStepNumber}>6</span>
                App validates token & creates session
              </div>
            </div>

            <h3>Data Models</h3>
            <div className={styles.dataModels}>
              <div className={styles.model}>
                <h4>BaseUser</h4>
                <p>Core user fields shared across all apps</p>
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
                <p>Permission configuration per app</p>
                <ul>
                  <li>appId: string</li>
                  <li>roles: string[]</li>
                  <li>features: string[]</li>
                </ul>
              </div>

              <div className={styles.model}>
                <h4>SharedUserProfile</h4>
                <p>Extended profile with cross-app data</p>
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
            <h2>API Reference</h2>

            <div className={styles.apiSection}>
              <h3>Core Functions</h3>
              
              <div className={styles.apiMethod}>
                <h4>createAuthContext&lt;T&gt;()</h4>
                <p>Factory function for creating type-safe auth contexts</p>
                <CodeBlock
                  id="createauth"
                  code={`const { AuthProvider, useAuth, AuthContext } = createAuthContext<MyUserType>();`}
                />
              </div>

              <div className={styles.apiMethod}>
                <h4>useAuth()</h4>
                <p>Hook to access authentication state and methods</p>
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
                <p>Check user permissions for features and roles</p>
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
                <p>Synchronize auth state across tabs and apps</p>
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
              <h3>Utility Functions</h3>
              
              <div className={styles.utilityGrid}>
                <div className={styles.utility}>
                  <code>validateEmail(email)</code>
                  <p>Validate email format</p>
                </div>
                <div className={styles.utility}>
                  <code>validatePassword(password)</code>
                  <p>Check password strength</p>
                </div>
                <div className={styles.utility}>
                  <code>generateAuthRedirectUrl(...)</code>
                  <p>Create auth redirect URLs</p>
                </div>
                <div className={styles.utility}>
                  <code>getAuthErrorMessage(error)</code>
                  <p>User-friendly error messages</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'examples' && (
          <section className={styles.section}>
            <h2>Implementation Examples</h2>

            <div className={styles.example}>
              <h3>Protected Route Component</h3>
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
              <h3>Cross-App Navigation</h3>
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
              <h3>Permission-Based Features</h3>
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
              <h3>Error Handling</h3>
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

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Related Documentation</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/documentation">All Docs</Link></li>
              <li><Link href="/documentation/quickstart">Quick Start</Link></li>
              <li><Link href="/documentation/api">API Reference</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://github.com/cybereco/auth">GitHub</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}