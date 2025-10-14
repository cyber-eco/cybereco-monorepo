'use client';

import React from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaKey } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from '../page.module.css';

export default function DataPrivacyPage() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacyOverviewTitle') || 'Privacy-First Architecture'}</h3>
        <p>{t('documentation:documentationPage.privacyOverviewText') || 'CyberEco is built with privacy at its core. Every feature is designed to protect user data and give individuals complete control over their information.'}</p>
        
        <div className={styles.features}>
          <h4>{t('documentation:documentationPage.dataPrivacy.overview.keyFeatures') || 'Key Privacy Features'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.gdprCompliant') || 'Full GDPR compliance with user consent management'}</li>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.dataMinimization') || 'Data minimization - only collect what\'s necessary'}</li>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.userControl') || 'Complete user control over personal data'}</li>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.encryption') || 'End-to-end encryption for sensitive data'}</li>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.portability') || 'Data portability with standard export formats'}</li>
            <li>{t('documentation:documentationPage.dataPrivacy.overview.rightToDelete') || 'Right to deletion - permanent data removal'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacyPrinciplesTitle') || 'Privacy Principles'}</h3>
        <div className={styles.principlesGrid}>
          <div className={styles.principle}>
            <FaUserShield className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.principles.sovereignty.title') || 'Data Sovereignty'}</h4>
            <p>{t('documentation:documentationPage.dataPrivacy.principles.sovereignty.description') || 'You own your data. We\'re just custodians providing a service.'}</p>
          </div>
          <div className={styles.principle}>
            <FaLock className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.principles.minimization.title') || 'Data Minimization'}</h4>
            <p>{t('documentation:documentationPage.dataPrivacy.principles.minimization.description') || 'We only collect data that\'s absolutely necessary for the service.'}</p>
          </div>
          <div className={styles.principle}>
            <FaShieldAlt className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.principles.transparency.title') || 'Transparency'}</h4>
            <p>{t('documentation:documentationPage.dataPrivacy.principles.transparency.description') || 'Clear information about what data we collect and how it\'s used.'}</p>
          </div>
          <div className={styles.principle}>
            <FaDatabase className={styles.principleIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.principles.purpose.title') || 'Purpose Limitation'}</h4>
            <p>{t('documentation:documentationPage.dataPrivacy.principles.purpose.description') || 'Data is only used for its stated purpose, nothing more.'}</p>
          </div>
        </div>
      </section>
    </>
  );

  const renderGDPRTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.gdpr.title') || 'GDPR Compliance'}</h3>
        <p>{t('documentation:documentationPage.dataPrivacy.gdpr.description') || 'CyberEco is fully compliant with the General Data Protection Regulation (GDPR), ensuring the highest standards of data protection for all users.'}</p>
        
        <h4>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.title') || 'Your Rights Under GDPR'}</h4>
        <div className={styles.gdprRights}>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.access.title') || 'Right to Access'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.access.description') || 'Request a copy of all personal data we hold about you.'}</p>
          </div>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.rectification.title') || 'Right to Rectification'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.rectification.description') || 'Correct any inaccurate personal data we have about you.'}</p>
          </div>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.erasure.title') || 'Right to Erasure'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.erasure.description') || 'Request deletion of your personal data (right to be forgotten).'}</p>
          </div>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.portability.title') || 'Right to Data Portability'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.portability.description') || 'Receive your data in a structured, machine-readable format.'}</p>
          </div>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.restrict.title') || 'Right to Restrict Processing'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.restrict.description') || 'Limit how we process your personal data.'}</p>
          </div>
          <div className={styles.rightItem}>
            <h5>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.object.title') || 'Right to Object'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.gdpr.rights.object.description') || 'Object to processing of your personal data for certain purposes.'}</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.gdpr.implementation.title') || 'GDPR Implementation'}</h3>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// GDPR Service Implementation
import { gdprService } from '@cybereco/auth';

// Exercise user rights
async function handleGDPRRequest(userId: string, requestType: string) {
  switch(requestType) {
    case 'access':
      return await gdprService.exportUserData(userId);
    
    case 'delete':
      return await gdprService.deleteUserData(userId);
    
    case 'rectify':
      return await gdprService.updateUserData(userId, newData);
    
    case 'restrict':
      return await gdprService.restrictProcessing(userId);
  }
}`}</code>
          </pre>
        </div>
      </section>
    </>
  );

  const renderDataControlsTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.controls.title') || 'Privacy Controls'}</h3>
        <p>{t('documentation:documentationPage.dataPrivacy.controls.description') || 'Granular controls that put users in charge of their data and privacy settings.'}</p>
        
        <h4>{t('documentation:documentationPage.dataPrivacy.controls.consent.title') || 'Consent Management'}</h4>
        <div className={styles.example}>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Consent management example
const consentSettings = {
  analytics: false,        // Analytics tracking
  marketing: false,        // Marketing communications
  functional: true,        // Essential functionality
  thirdParty: false       // Third-party integrations
};

// Update consent preferences
async function updateConsent(userId: string, settings: ConsentSettings) {
  await privacyService.updateConsentSettings(userId, settings);
  
  // Apply settings immediately
  if (!settings.analytics) {
    disableAnalytics();
  }
}`}</code>
            </pre>
          </div>
        </div>

        <h4>{t('documentation:documentationPage.dataPrivacy.controls.visibility.title') || 'Data Visibility Controls'}</h4>
        <div className={styles.visibilityLevels}>
          <div className={styles.level}>
            <h5>{t('documentation:documentationPage.dataPrivacy.controls.visibility.private') || 'Private'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.controls.visibility.privateDesc') || 'Only you can see this data'}</p>
          </div>
          <div className={styles.level}>
            <h5>{t('documentation:documentationPage.dataPrivacy.controls.visibility.friends') || 'Friends Only'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.controls.visibility.friendsDesc') || 'Visible to connected friends'}</p>
          </div>
          <div className={styles.level}>
            <h5>{t('documentation:documentationPage.dataPrivacy.controls.visibility.public') || 'Public'}</h5>
            <p>{t('documentation:documentationPage.dataPrivacy.controls.visibility.publicDesc') || 'Visible to everyone'}</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.controls.sharing.title') || 'Data Sharing Preferences'}</h3>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// Configure data sharing preferences
const sharingPreferences = {
  profile: {
    name: 'public',
    email: 'private',
    avatar: 'friends',
    bio: 'public'
  },
  activity: {
    expenses: 'friends',
    events: 'friends',
    statistics: 'private'
  },
  apps: {
    justsplit: true,
    somos: false,
    demos: true
  }
};

// Apply sharing preferences
await privacyService.updateSharingPreferences(
  userId, 
  sharingPreferences
);`}</code>
          </pre>
        </div>
      </section>
    </>
  );

  const renderSecurityTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.security.title') || 'Data Security'}</h3>
        <p>{t('documentation:documentationPage.dataPrivacy.security.description') || 'Multiple layers of security protect your data at rest and in transit.'}</p>
        
        <div className={styles.securityFeatures}>
          <div className={styles.securityItem}>
            <FaLock className={styles.securityIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.security.encryption.title') || 'Encryption'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.dataPrivacy.security.encryption.transit') || 'TLS 1.3 for data in transit'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.encryption.rest') || 'AES-256 for data at rest'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.encryption.e2e') || 'End-to-end encryption for sensitive data'}</li>
            </ul>
          </div>
          
          <div className={styles.securityItem}>
            <FaKey className={styles.securityIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.security.access.title') || 'Access Control'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.dataPrivacy.security.access.rbac') || 'Role-based access control (RBAC)'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.access.mfa') || 'Multi-factor authentication'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.access.audit') || 'Comprehensive audit logging'}</li>
            </ul>
          </div>
          
          <div className={styles.securityItem}>
            <FaShieldAlt className={styles.securityIcon} />
            <h4>{t('documentation:documentationPage.dataPrivacy.security.protection.title') || 'Data Protection'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.dataPrivacy.security.protection.backup') || 'Regular encrypted backups'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.protection.isolation') || 'Data isolation between users'}</li>
              <li>{t('documentation:documentationPage.dataPrivacy.security.protection.monitoring') || '24/7 security monitoring'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.security.bestPractices.title') || 'Security Best Practices'}</h3>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// Secure data handling example
class SecureDataHandler {
  // Never log sensitive data
  async processUserData(userData: UserData) {
    // Sanitize inputs
    const sanitized = this.sanitizeInput(userData);
    
    // Encrypt sensitive fields
    const encrypted = await this.encryptSensitiveData({
      ...sanitized,
      ssn: await encrypt(sanitized.ssn),
      creditCard: await encrypt(sanitized.creditCard)
    });
    
    // Store with proper access controls
    await this.secureStore(encrypted, {
      accessLevel: 'private',
      encryption: 'AES-256',
      audit: true
    });
  }
  
  // Implement data minimization
  collectOnlyNecessaryData(formData: any) {
    return {
      name: formData.name,
      email: formData.email,
      // Don't collect unnecessary fields
    };
  }
}`}</code>
          </pre>
        </div>
      </section>
    </>
  );

  const renderImplementationTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataPrivacy.implementation.title') || 'Implementation Guide'}</h3>
        <p>{t('documentation:documentationPage.dataPrivacy.implementation.description') || 'How to implement privacy features in your CyberEco applications.'}</p>
        
        <h4>{t('documentation:documentationPage.dataPrivacy.implementation.service.title') || '1. Privacy Service Setup'}</h4>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`import { privacyAwareDataService } from '@cybereco/auth';

// Initialize privacy-aware data service
const dataService = new privacyAwareDataService({
  userId: currentUser.uid,
  privacySettings: userPrivacySettings
});

// Query data with privacy filters applied
const visibleData = await dataService.query(
  'expenses',
  { 
    where: { groupId: 'group123' },
    respectPrivacy: true 
  }
);

// Data automatically filtered based on:
// - User's privacy settings
// - Data visibility rules
// - Consent preferences`}</code>
          </pre>
        </div>

        <h4>{t('documentation:documentationPage.dataPrivacy.implementation.hooks.title') || '2. Privacy Hooks'}</h4>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// Use privacy hooks in React components
import { usePrivacy } from '@cybereco/ui-components';

function UserProfile() {
  const { 
    privacySettings, 
    updatePrivacy,
    checkVisibility 
  } = usePrivacy();
  
  // Check if field should be visible
  const showEmail = checkVisibility('email', viewerUserId);
  
  return (
    <div>
      <h2>{user.name}</h2>
      {showEmail && <p>{user.email}</p>}
      
      <PrivacyToggle
        setting="profileVisibility"
        value={privacySettings.profileVisibility}
        onChange={(value) => updatePrivacy({ profileVisibility: value })}
      />
    </div>
  );
}`}</code>
          </pre>
        </div>

        <h4>{t('documentation:documentationPage.dataPrivacy.implementation.export.title') || '3. Data Export Implementation'}</h4>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`// Implement data export functionality
async function exportUserData(userId: string, format: 'json' | 'csv') {
  // Gather all user data
  const userData = await gdprService.collectUserData(userId);
  
  // Format for export
  const formatted = format === 'json' 
    ? JSON.stringify(userData, null, 2)
    : convertToCSV(userData);
  
  // Create download
  const blob = new Blob([formatted], { 
    type: format === 'json' ? 'application/json' : 'text/csv' 
  });
  
  // Trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`cybereco-data-\${Date.now()}.\${format}\`;
  a.click();
}`}</code>
          </pre>
        </div>
      </section>
    </>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.dataPrivacy.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'gdpr',
      label: t('documentation:documentationPage.dataPrivacy.tabs.gdpr') || 'GDPR Compliance',
      content: renderGDPRTab()
    },
    {
      id: 'controls',
      label: t('documentation:documentationPage.dataPrivacy.tabs.controls') || 'Privacy Controls',
      content: renderDataControlsTab()
    },
    {
      id: 'security',
      label: t('documentation:documentationPage.dataPrivacy.tabs.security') || 'Security',
      content: renderSecurityTab()
    },
    {
      id: 'implementation',
      label: t('documentation:documentationPage.dataPrivacy.tabs.implementation') || 'Implementation',
      content: renderImplementationTab()
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaShieldAlt />}
        title={t('documentation:documentationPage.dataPrivacyNavItem') || 'Data & Privacy'}
        subtitle={t('documentation:documentationPage.dataPrivacySubtitle') || 'Comprehensive data protection and privacy controls'}
        gradient="linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacyFeaturesTitle') || 'Related Documentation'}</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/privacy-controls" className={styles.docCard}>
            <FaUserShield />
            <span>{t('documentation:documentationPage.privacyControlsTitle') || 'Privacy Controls & GDPR'}</span>
          </Link>
          <Link href="/documentation/data-export" className={styles.docCard}>
            <FaDatabase />
            <span>{t('documentation:documentationPage.dataExportTitle') || 'Data Export & Portability'}</span>
          </Link>
          <Link href="/documentation/data-architecture" className={styles.docCard}>
            <FaKey />
            <span>{t('documentation:documentationPage.dataArchitectureTitle') || 'Data Layer Architecture'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}