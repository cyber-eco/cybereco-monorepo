'use client';

import Link from 'next/link';
import { FaShieldAlt, FaLock, FaEye, FaUserShield, FaDatabase, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from '../page.module.css';

export default function PrivacyControlsDocumentation() {
  const { t } = useI18n();
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.privacy.title') || 'Privacy Controls & GDPR Compliance'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.privacy.subtitle') || 'Comprehensive privacy features that put you in control of your data'}
        </p>
      </div>

      <nav className={styles.tableOfContents}>
        <h2>{t('documentation:documentationPage.tableOfContents') || 'Table of Contents'}</h2>
        <ul>
          <li><a href="#overview">{t('documentation:documentationPage.privacy.overview.title') || 'Overview'}</a></li>
          <li><a href="#consent-management">{t('documentation:documentationPage.privacy.consent.title') || 'Consent Management'}</a></li>
          <li><a href="#privacy-settings">{t('documentation:documentationPage.privacy.settings.title') || 'Privacy Settings'}</a></li>
          <li><a href="#data-visibility">{t('documentation:documentationPage.privacy.dataVisibility.title') || 'Data Visibility Controls'}</a></li>
          <li><a href="#gdpr-rights">{t('documentation:documentationPage.privacy.gdpr.title') || 'GDPR Rights'}</a></li>
          <li><a href="#implementation">{t('documentation:documentationPage.privacy.implementation.title') || 'Implementation Guide'}</a></li>
          <li><a href="#api-reference">{t('documentation:documentationPage.privacy.api.title') || 'API Reference'}</a></li>
        </ul>
      </nav>

      <div id="overview" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.overview.title') || 'Overview'}</h3>
        <p>
          {t('documentation:documentationPage.privacy.overview.description') || 'CyberEco implements a comprehensive privacy-first architecture that ensures users maintain complete control over their personal data. Our privacy controls are built into every layer of the platform, from data collection to processing and sharing.'}
        </p>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaLock className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.privacy.features.granularConsent.title') || 'Granular Consent'}</h3>
            <p>{t('documentation:documentationPage.privacy.features.granularConsent.description') || 'Control exactly how your data is used with purpose-specific consent options'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaEye className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.privacy.features.visibilityControls.title') || 'Visibility Controls'}</h3>
            <p>{t('documentation:documentationPage.privacy.features.visibilityControls.description') || 'Decide who can see your data with profile and activity-level privacy settings'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaUserShield className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.privacy.features.dataAnonymization.title') || 'Data Anonymization'}</h3>
            <p>{t('documentation:documentationPage.privacy.features.dataAnonymization.description') || 'Automatic anonymization protects your identity based on privacy preferences'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaDatabase className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.privacy.features.gdprCompliance.title') || 'GDPR Compliance'}</h3>
            <p>{t('documentation:documentationPage.privacy.features.gdprCompliance.description') || 'Full compliance with data protection regulations including right to erasure'}</p>
          </div>
        </div>
      </div>

      <div id="consent-management" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.consent.title') || 'Consent Management'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.consent.types.title') || 'Consent Types'}</h3>
        <p>{t('documentation:documentationPage.privacy.consent.types.description') || 'CyberEco uses a granular consent system with five distinct categories:'}</p>
        
        <div className={styles.codeBlock}>
          <pre>{`enum ConsentType {
  NECESSARY = 'necessary',      // Required for basic functionality
  FUNCTIONAL = 'functional',    // Enhanced features and preferences
  ANALYTICS = 'analytics',      // Usage analytics and improvements
  MARKETING = 'marketing',      // Promotional communications
  PERSONALIZATION = 'personalization' // Tailored content
}`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.consent.banner.title') || 'Consent Banner'}</h3>
        <p>
          {t('documentation:documentationPage.privacy.consent.banner.description') || 'New users are presented with a consent banner that clearly explains data usage:'}
        </p>
        
        <div className={styles.infoBox}>
          <h4>{t('documentation:documentationPage.privacy.consent.banner.keyFeatures') || 'Key Features:'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.privacy.consent.banner.feature1') || 'Clear explanation of each consent type'}</li>
            <li>{t('documentation:documentationPage.privacy.consent.banner.feature2') || 'Granular opt-in/opt-out controls'}</li>
            <li>{t('documentation:documentationPage.privacy.consent.banner.feature3') || 'Easy access to privacy policy'}</li>
            <li>{t('documentation:documentationPage.privacy.consent.banner.feature4') || 'Persistent preferences across sessions'}</li>
          </ul>
        </div>

        <h3>{t('documentation:documentationPage.privacy.consent.managing.title') || 'Managing Consent'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Record user consent
await gdprService.recordConsent(
  userId,
  ConsentType.ANALYTICS,
  true, // granted
  {
    ipAddress: request.ip,
    userAgent: request.headers['user-agent']
  }
);

// Check consent before processing
const hasConsent = await gdprService.canTrackUser(
  userId,
  ConsentType.ANALYTICS
);`}</pre>
        </div>
      </div>

      <div id="privacy-settings" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.settings.title') || 'Privacy Settings'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.settings.profileVisibility.title') || 'Profile Visibility'}</h3>
        <p>{t('documentation:documentationPage.privacy.settings.profileVisibility.description') || 'Control who can see your profile information:'}</p>
        <ul>
          <li><strong>{t('documentation:documentationPage.privacy.settings.profileVisibility.public') || 'Public'}:</strong> {t('documentation:documentationPage.privacy.settings.profileVisibility.publicDesc') || 'Anyone can view your profile'}</li>
          <li><strong>{t('documentation:documentationPage.privacy.settings.profileVisibility.friends') || 'Friends Only'}:</strong> {t('documentation:documentationPage.privacy.settings.profileVisibility.friendsDesc') || 'Only approved connections can see your profile'}</li>
          <li><strong>{t('documentation:documentationPage.privacy.settings.profileVisibility.private') || 'Private'}:</strong> {t('documentation:documentationPage.privacy.settings.profileVisibility.privateDesc') || 'Profile is hidden from all users'}</li>
        </ul>

        <h3>{t('documentation:documentationPage.privacy.settings.activityVisibility.title') || 'Activity Visibility'}</h3>
        <p>{t('documentation:documentationPage.privacy.settings.activityVisibility.description') || 'Fine-grained control over different types of activities:'}</p>
        
        <div className={styles.codeBlock}>
          <pre>{`interface ActivityVisibility {
  expenses: 'everyone' | 'friends' | 'only-me';
  groups: 'everyone' | 'friends' | 'only-me';
  settlements: 'everyone' | 'friends' | 'only-me';
  profile: 'everyone' | 'friends' | 'only-me';
}`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.settings.dataSharing.title') || 'Data Sharing Preferences'}</h3>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.privacy.settings.dataSharing.analytics') || 'Analytics Data'}:</strong> {t('documentation:documentationPage.privacy.settings.dataSharing.analyticsDesc') || 'Help improve our services'}
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.privacy.settings.dataSharing.ads') || 'Personalized Ads'}:</strong> {t('documentation:documentationPage.privacy.settings.dataSharing.adsDesc') || 'Relevant advertisements'}
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.privacy.settings.dataSharing.thirdParty') || 'Third-Party Apps'}:</strong> {t('documentation:documentationPage.privacy.settings.dataSharing.thirdPartyDesc') || 'Share data with connected applications'}
            </div>
          </div>
        </div>
      </div>

      <div id="data-visibility" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.dataVisibility.title') || 'Data Visibility Controls'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.dataVisibility.queries.title') || 'Privacy-Aware Queries'}</h3>
        <p>
          {t('documentation:documentationPage.privacy.dataVisibility.queries.description') || 'All data queries automatically respect privacy settings:'}
        </p>
        
        <div className={styles.codeBlock}>
          <pre>{`// Automatic privacy filtering
const expenses = await privacyAwareDataService.filterResults(
  rawExpenses,
  viewerId,
  'expenses'
);

// Check if viewer can access specific data
const canView = await privacyAwareDataService.canViewData({
  viewerId: currentUser.id,
  targetUserId: dataOwner.id,
  dataType: 'expenses',
  relationship: 'friend'
});`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.title') || 'Data Anonymization'}</h3>
        <p>
          {t('documentation:documentationPage.privacy.dataVisibility.anonymization.description') || 'Personal information is automatically anonymized based on privacy settings:'}
        </p>
        
        <div className={styles.warningBox}>
          <h4>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.fields') || 'Anonymized Fields:'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.field1') || 'Display names → "Anonymous User"'}</li>
            <li>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.field2') || 'Email addresses → "hidden@example.com"'}</li>
            <li>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.field3') || 'Profile photos → Removed'}</li>
            <li>{t('documentation:documentationPage.privacy.dataVisibility.anonymization.field4') || 'Phone numbers → Removed'}</li>
          </ul>
        </div>

        <h3>{t('documentation:documentationPage.privacy.dataVisibility.auditLogging.title') || 'Audit Logging'}</h3>
        <p>
          {t('documentation:documentationPage.privacy.dataVisibility.auditLogging.description') || 'All data access is logged for security and compliance:'}
        </p>
        
        <div className={styles.codeBlock}>
          <pre>{`interface DataAccessLog {
  viewerId: string;
  targetUserId: string;
  dataType: string;
  accessLevel: 'granted' | 'denied';
  timestamp: Date;
  metadata?: Record<string, any>;
}`}</pre>
        </div>
      </div>

      <div id="gdpr-rights" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.gdpr.title') || 'GDPR Rights Implementation'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.gdpr.rightToAccess.title') || 'Right to Access'}</h3>
        <p>{t('documentation:documentationPage.privacy.gdpr.rightToAccess.description') || 'Users can request and download all their personal data:'}</p>
        
        <div className={styles.codeBlock}>
          <pre>{`// Generate comprehensive privacy report
const report = await gdprService.generatePrivacyReport(userId);

// Export user data
const exportData = await dataExportService.exportUserData(
  userId,
  {
    format: 'json', // or 'csv'
    includeMetadata: true
  }
);`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.title') || 'Right to Erasure'}</h3>
        <p>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.description') || 'Users can request complete deletion of their personal data:'}</p>
        
        <div className={styles.infoBox}>
          <h4>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.process') || 'Deletion Process:'}</h4>
          <ol>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step1') || 'User submits deletion request'}</li>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step2') || 'Request is logged with timestamp and reason'}</li>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step3') || 'Grace period for user to reconsider (configurable)'}</li>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step4') || 'Automated data anonymization'}</li>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step5') || 'Removal from search indices'}</li>
            <li>{t('documentation:documentationPage.privacy.gdpr.rightToErasure.step6') || 'Confirmation sent to user'}</li>
          </ol>
        </div>

        <h3>{t('documentation:documentationPage.privacy.gdpr.rightToPortability.title') || 'Right to Data Portability'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Request data in portable format
const requestId = await gdprService.requestDataPortability(
  userId,
  'json',
  { includeHistory: true }
);`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.gdpr.rightToRectification.title') || 'Right to Rectification'}</h3>
        <p>{t('documentation:documentationPage.privacy.gdpr.rightToRectification.description') || 'Users can update their personal information at any time through the profile settings.'}</p>
      </div>

      <div id="implementation" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.implementation.title') || 'Implementation Guide'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.implementation.step1.title') || '1. Initialize Privacy Services'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`import { 
  privacyAwareDataService, 
  gdprService 
} from '@cybereco/auth';

// Get user's privacy settings
const settings = await privacyAwareDataService
  .getUserPrivacySettings(userId);

// Update privacy preferences
await privacyAwareDataService.updatePrivacySettings(
  userId,
  {
    profileVisibility: 'friends',
    activityVisibility: {
      expenses: 'friends',
      groups: 'everyone'
    }
  }
);`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.implementation.step2.title') || '2. Implement Consent Checks'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Before processing analytics
if (await gdprService.canTrackUser(userId, ConsentType.ANALYTICS)) {
  // Track user analytics
  await analyticsService.track(event);
}

// Before sending marketing emails
if (await gdprService.canTrackUser(userId, ConsentType.MARKETING)) {
  await emailService.sendPromotional(userId, campaign);
}`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.implementation.step3.title') || '3. Apply Privacy Filters'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`// In your data fetching service
async function getExpenses(viewerId: string) {
  // Get raw data
  const expenses = await db.collection('expenses')
    .where('participants', 'array-contains', viewerId)
    .get();
  
  // Apply privacy filters
  return await privacyAwareDataService.filterResults(
    expenses.docs.map(doc => doc.data()),
    viewerId,
    'expenses'
  );
}`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.privacy.implementation.step4.title') || '4. Set Up Middleware'}</h3>
        <div className={styles.codeBlock}>
          <pre>{`// In your API middleware
import { applyPrivacyHeaders } from './middleware/dataVisibility';

export function middleware(request: NextRequest) {
  let response = NextResponse.next();
  
  // Apply privacy headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response = applyPrivacyHeaders(response);
  }
  
  return response;
}`}</pre>
        </div>
      </div>

      <div id="api-reference" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.privacy.api.title') || 'API Reference'}</h3>
        
        <h3>{t('documentation:documentationPage.privacy.api.privacyService.title') || 'Privacy Service Methods'}</h3>
        <table className={styles.apiTable}>
          <thead>
            <tr>
              <th>{t('documentation:documentationPage.privacy.api.method') || 'Method'}</th>
              <th>{t('documentation:documentationPage.privacy.api.description') || 'Description'}</th>
              <th>{t('documentation:documentationPage.privacy.api.parameters') || 'Parameters'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>getUserPrivacySettings</code></td>
              <td>{t('documentation:documentationPage.privacy.api.privacyService.getUserPrivacySettings') || 'Get user\'s privacy settings'}</td>
              <td><code>userId: string</code></td>
            </tr>
            <tr>
              <td><code>updatePrivacySettings</code></td>
              <td>{t('documentation:documentationPage.privacy.api.privacyService.updatePrivacySettings') || 'Update privacy preferences'}</td>
              <td><code>userId: string, settings: Partial&lt;PrivacySettings&gt;</code></td>
            </tr>
            <tr>
              <td><code>canViewData</code></td>
              <td>{t('documentation:documentationPage.privacy.api.privacyService.canViewData') || 'Check if viewer can access data'}</td>
              <td><code>filter: PrivacyFilter</code></td>
            </tr>
            <tr>
              <td><code>filterResults</code></td>
              <td>{t('documentation:documentationPage.privacy.api.privacyService.filterResults') || 'Filter results based on privacy'}</td>
              <td><code>results: T[], viewerId: string, dataType: string</code></td>
            </tr>
            <tr>
              <td><code>anonymizeData</code></td>
              <td>{t('documentation:documentationPage.privacy.api.privacyService.anonymizeData') || 'Anonymize personal information'}</td>
              <td><code>data: T, viewerId: string, ownerId: string</code></td>
            </tr>
          </tbody>
        </table>

        <h3>{t('documentation:documentationPage.privacy.api.gdprService.title') || 'GDPR Service Methods'}</h3>
        <table className={styles.apiTable}>
          <thead>
            <tr>
              <th>{t('documentation:documentationPage.privacy.api.method') || 'Method'}</th>
              <th>{t('documentation:documentationPage.privacy.api.description') || 'Description'}</th>
              <th>{t('documentation:documentationPage.privacy.api.parameters') || 'Parameters'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>recordConsent</code></td>
              <td>{t('documentation:documentationPage.privacy.api.gdprService.recordConsent') || 'Record user consent'}</td>
              <td><code>userId: string, type: ConsentType, granted: boolean</code></td>
            </tr>
            <tr>
              <td><code>getUserConsent</code></td>
              <td>{t('documentation:documentationPage.privacy.api.gdprService.getUserConsent') || 'Get consent status'}</td>
              <td><code>userId: string</code></td>
            </tr>
            <tr>
              <td><code>requestDataDeletion</code></td>
              <td>{t('documentation:documentationPage.privacy.api.gdprService.requestDataDeletion') || 'Request data erasure'}</td>
              <td><code>userId: string, reason?: string</code></td>
            </tr>
            <tr>
              <td><code>requestDataPortability</code></td>
              <td>{t('documentation:documentationPage.privacy.api.gdprService.requestDataPortability') || 'Export user data'}</td>
              <td><code>userId: string, format: 'json' | 'csv'</code></td>
            </tr>
            <tr>
              <td><code>generatePrivacyReport</code></td>
              <td>{t('documentation:documentationPage.privacy.api.gdprService.generatePrivacyReport') || 'Generate privacy report'}</td>
              <td><code>userId: string</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.nextSteps}>
        <h2>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h2>
        <div className={styles.cardGrid}>
          <Link href="/documentation/two-factor-auth" className={styles.docCard}>
            <FaLock />
            <span>{t('documentation:documentationPage.twoFactor.title') || 'Two-Factor Authentication'}</span>
          </Link>
          <Link href="/documentation/data-export" className={styles.docCard}>
            <FaDatabase />
            <span>{t('documentation:documentationPage.dataExport.title') || 'Data Export Guide'}</span>
          </Link>
          <Link href="/documentation/authentication" className={styles.docCard}>
            <FaShieldAlt />
            <span>{t('documentation:documentationPage.authenticationNavItem') || 'Authentication Overview'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}