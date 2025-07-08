'use client';

import React from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaKey, FaLock, FaCode, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import DocumentationHero from '../components/DocumentationHero';
import DocumentationTabs, { Tab } from '../components/DocumentationTabs';
import CodeBlock from '../components/CodeBlock';
import styles from '../page.module.css';

export default function FirebaseSecurityDocs() {
  const { t } = useI18n();

  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: <FaShieldAlt /> },
    { id: 'api-keys', label: 'API Keys', icon: <FaKey /> },
    { id: 'best-practices', label: 'Best Practices', icon: <FaCheckCircle /> },
  ];

  const renderOverviewTab = () => (
    <div className={styles.tabSection}>
      <h2>Firebase Security Overview</h2>
      
      <div className={styles.contentSection}>
        <p className={styles.contentText}>
          Firebase Web API keys are <strong>not secret credentials</strong>. They are designed to be included 
          in client-side code and are safe to expose publicly. This is a fundamental design principle of Firebase.
        </p>

        <div className={styles.warningBox}>
          <FaExclamationTriangle className={styles.warningIcon} />
          <div>
            <h4>Important Note</h4>
            <p>
              GitHub and other security scanners may alert you about exposed Firebase API keys. 
              These alerts can be safely ignored for Firebase Web API keys as they are meant to be public.
            </p>
          </div>
        </div>
      </div>

      <h3>Why Firebase API Keys Are Public</h3>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaCode />
          </div>
          <h4>Client-Side Usage</h4>
          <p>Firebase is designed for direct client-to-database communication without a backend server.</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaKey />
          </div>
          <h4>Project Identification</h4>
          <p>API keys identify your Firebase project, they don't authenticate users or grant permissions.</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FaLock />
          </div>
          <h4>Security Elsewhere</h4>
          <p>Real security is enforced through Authentication and Firestore Security Rules.</p>
        </div>
      </div>

      <h3>Actual Security Measures</h3>
      <div className={styles.list}>
        <div className={styles.listItem}>
          <strong>Firebase Authentication:</strong> Users must authenticate before accessing data
        </div>
        <div className={styles.listItem}>
          <strong>Firestore Security Rules:</strong> Fine-grained access control at the database level
        </div>
        <div className={styles.listItem}>
          <strong>Authorized Domains:</strong> Restrict which domains can use your Firebase project
        </div>
        <div className={styles.listItem}>
          <strong>App Check:</strong> Verify requests come from your authentic app
        </div>
      </div>
    </div>
  );

  const renderApiKeysTab = () => (
    <div className={styles.tabSection}>
      <h2>Understanding Firebase API Keys</h2>
      
      <h3>Firebase Configuration</h3>
      <p className={styles.contentText}>
        Your Firebase configuration includes several public identifiers:
      </p>
      
      <CodeBlock language="javascript">
{`const firebaseConfig = {
  apiKey: "AIzaSy...",           // Public - identifies your project
  authDomain: "...",             // Public - where auth happens
  projectId: "...",              // Public - your project ID
  storageBucket: "...",          // Public - storage location
  messagingSenderId: "...",      // Public - for cloud messaging
  appId: "..."                   // Public - identifies your app
};`}
      </CodeBlock>

      <h3>What These Keys Do</h3>
      <div className={styles.list}>
        <div className={styles.listItem}>
          <strong>apiKey:</strong> Identifies your Firebase project to Google's servers
        </div>
        <div className={styles.listItem}>
          <strong>authDomain:</strong> Specifies where authentication UI is hosted
        </div>
        <div className={styles.listItem}>
          <strong>projectId:</strong> Unique identifier for your Firebase project
        </div>
        <div className={styles.listItem}>
          <strong>storageBucket:</strong> Default Cloud Storage bucket for your project
        </div>
        <div className={styles.listItem}>
          <strong>messagingSenderId:</strong> Used for Firebase Cloud Messaging
        </div>
        <div className={styles.listItem}>
          <strong>appId:</strong> Unique identifier for your Firebase app
        </div>
      </div>

      <h3>What These Keys DON'T Do</h3>
      <div className={styles.warningBox}>
        <FaExclamationTriangle className={styles.warningIcon} />
        <div>
          <p>Firebase Web API keys do NOT:</p>
          <ul>
            <li>Grant access to your data</li>
            <li>Authenticate users</li>
            <li>Bypass security rules</li>
            <li>Allow administrative actions</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderBestPracticesTab = () => (
    <div className={styles.tabSection}>
      <h2>Security Best Practices</h2>
      
      <h3>1. Use Environment Variables</h3>
      <p className={styles.contentText}>
        While API keys are public, using environment variables keeps configuration centralized:
      </p>
      
      <CodeBlock language="javascript">
{`// .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

// Usage
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ...
};`}
      </CodeBlock>

      <h3>2. Configure Security Rules</h3>
      <p className={styles.contentText}>
        The real security comes from Firestore Security Rules:
      </p>
      
      <CodeBlock language="javascript">
{`// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
      </CodeBlock>

      <h3>3. Set Authorized Domains</h3>
      <div className={styles.list}>
        <div className={styles.listItem}>
          Go to Firebase Console → Authentication → Settings
        </div>
        <div className={styles.listItem}>
          Add only your production domains to the authorized list
        </div>
        <div className={styles.listItem}>
          Remove any domains you don't control
        </div>
      </div>

      <h3>4. Never Expose Service Account Keys</h3>
      <div className={styles.errorBox}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <div>
          <h4>Critical: Service Account Keys ARE Secret!</h4>
          <p>
            Unlike Web API keys, service account keys (JSON files) are secret credentials. 
            Never commit these to version control or expose them publicly.
          </p>
        </div>
      </div>

      <h3>5. Monitor Usage</h3>
      <div className={styles.list}>
        <div className={styles.listItem}>
          Set up billing alerts in Google Cloud Console
        </div>
        <div className={styles.listItem}>
          Monitor Firebase Console for unexpected usage patterns
        </div>
        <div className={styles.listItem}>
          Review security rules regularly
        </div>
        <div className={styles.listItem}>
          Enable Firebase App Check for additional security
        </div>
      </div>
    </div>
  );

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'overview':
        return renderOverviewTab();
      case 'api-keys':
        return renderApiKeysTab();
      case 'best-practices':
        return renderBestPracticesTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <>
      <DocumentationHero
        icon={<FaShieldAlt />}
        title="Firebase Security"
        subtitle="Understanding Firebase API keys and security best practices"
        gradient="linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)"
      />
      
      <div className={styles.docsContainer}>
        <DocumentationTabs
          tabs={tabs}
          renderContent={renderTabContent}
        />
        
        <div className={styles.relatedLinks}>
          <h3>Related Documentation</h3>
          <div className={styles.linkGrid}>
            <Link href="/documentation/authentication" className={styles.relatedLink}>
              <FaKey className={styles.linkIcon} />
              <span>Authentication Guide</span>
            </Link>
            <Link href="/documentation/privacy-controls" className={styles.relatedLink}>
              <FaLock className={styles.linkIcon} />
              <span>Privacy Controls</span>
            </Link>
            <Link href="https://firebase.google.com/docs/projects/api-keys" className={styles.relatedLink} target="_blank">
              <FaShieldAlt className={styles.linkIcon} />
              <span>Official Firebase Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}