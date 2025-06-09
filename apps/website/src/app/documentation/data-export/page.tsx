'use client';

import React from 'react';
import Link from 'next/link';
import { FaDatabase, FaDownload, FaFileExport, FaFileCsv, FaFileCode, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from './page.module.css';
import sharedStyles from '../page.module.css';

export default function DataExportDocumentation() {
  const { t } = useI18n();
  
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.dataExport.overview.title') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'formats',
      label: t('documentation:documentationPage.dataExport.formats.title') || 'Export Formats',
      content: renderFormatsTab()
    },
    {
      id: 'api',
      label: t('documentation:documentationPage.dataExport.api.title') || 'API Integration',
      content: renderApiTab()
    },
    {
      id: 'gdpr',
      label: t('documentation:documentationPage.dataExport.gdpr.title') || 'GDPR Compliance',
      content: renderGdprTab()
    }
  ];

  function renderOverviewTab() {
    return (
      <>
        <div className={styles.overviewSection}>
          <p className={styles.description}>
            {t('documentation:documentationPage.dataExport.overview.description') || 
            'CyberEco provides comprehensive data export functionality that allows users to download all their personal data in machine-readable formats. This feature supports data portability rights under GDPR and gives users full control over their information.'}
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaFileCode className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.dataExport.formats.json.title') || 'JSON Export'}</h3>
            <p>{t('documentation:documentationPage.dataExport.formats.json.description') || 'Structured data format ideal for developers and data analysis'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaFileCsv className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.dataExport.formats.csv.title') || 'CSV Export'}</h3>
            <p>{t('documentation:documentationPage.dataExport.formats.csv.description') || 'Spreadsheet-compatible format for easy viewing and analysis'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaDownload className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.dataExport.features.instantDownload.title') || 'Instant Download'}</h3>
            <p>{t('documentation:documentationPage.dataExport.features.instantDownload.description') || 'Get your data immediately with secure, authenticated access'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaFileExport className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.dataExport.features.completeData.title') || 'Complete Data'}</h3>
            <p>{t('documentation:documentationPage.dataExport.features.completeData.description') || 'Export all your data including metadata and relationships'}</p>
          </div>
        </div>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.included.title') || "What's Included"}</h3>
        
        <div className={styles.includedGrid}>
          <div className={styles.includedCategory}>
            <h4>{t('documentation:documentationPage.dataExport.included.coreUserData') || 'Core User Data'}</h4>
            <div className={styles.checkList}>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <div className={styles.checkContent}>
                  <strong>{t('documentation:documentationPage.dataExport.included.profileInfo') || 'Profile Information'}:</strong> {t('documentation:documentationPage.dataExport.included.profileInfoDesc') || 'Name, email, avatar, account creation date'}
                </div>
              </div>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <div className={styles.checkContent}>
                  <strong>{t('documentation:documentationPage.dataExport.included.authData') || 'Authentication Data'}:</strong> {t('documentation:documentationPage.dataExport.included.authDataDesc') || 'Login history, sessions, security settings'}
                </div>
              </div>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <div className={styles.checkContent}>
                  <strong>{t('documentation:documentationPage.dataExport.included.privacySettings') || 'Privacy Settings'}:</strong> {t('documentation:documentationPage.dataExport.included.privacySettingsDesc') || 'Consent records, visibility preferences'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.exportSteps}>
          <h4>{t('documentation:documentationPage.dataExport.howTo.title') || 'How to Export Your Data'}</h4>
          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step1') || 'Sign in to CyberEco Hub'}</li>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step2') || 'Navigate to My Data page'}</li>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step3') || 'Click the Export Data button'}</li>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step4') || 'Choose your preferred format (JSON or CSV)'}</li>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step5') || 'Select data categories to include'}</li>
            <li className={styles.stepItem}>{t('documentation:documentationPage.dataExport.howTo.steps.step6') || 'Click Download'}</li>
          </ol>
        </div>
      </>
    );
  }

  function renderFormatsTab() {
    return (
      <>
        <div className={styles.formatExample}>
          <h3>{t('documentation:documentationPage.dataExport.formats.jsonFormat') || 'JSON Format'}</h3>
          <p>
            {t('documentation:documentationPage.dataExport.formats.jsonFormatDesc') || 
            'JSON (JavaScript Object Notation) provides a hierarchical structure that preserves data relationships and types.'}
          </p>
        </div>
        
        <div className={styles.codeSection}>
          <pre>{`{
  "userData": {
    "profile": {
      "id": "user123",
      "email": "user@example.com",
      "displayName": "John Doe",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "apps": {
      "justsplit": {
        "expenses": [...],
        "groups": [...],
        "settlements": [...]
      }
    },
    "settings": {
      "privacy": {...},
      "preferences": {...}
    }
  },
  "metadata": {
    "exportDate": "2024-06-03T14:30:00Z",
    "version": "1.0"
  }
}`}</pre>
        </div>

        <div className={styles.formatExample}>
          <h3>{t('documentation:documentationPage.dataExport.formats.csvFormat') || 'CSV Format'}</h3>
          <p>
            {t('documentation:documentationPage.dataExport.formats.csvFormatDesc') || 
            'CSV (Comma-Separated Values) flattens hierarchical data into tables, making it easy to import into spreadsheet applications.'}
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <h4>{t('documentation:documentationPage.dataExport.formats.csvStructure') || 'CSV Structure:'}</h4>
          <ul>
            <li><strong>profile.csv</strong> - {t('documentation:documentationPage.dataExport.formats.csvFiles.profile') || 'User profile information'}</li>
            <li><strong>expenses.csv</strong> - {t('documentation:documentationPage.dataExport.formats.csvFiles.expenses') || 'All expense records'}</li>
            <li><strong>groups.csv</strong> - {t('documentation:documentationPage.dataExport.formats.csvFiles.groups') || 'Group memberships'}</li>
            <li><strong>settlements.csv</strong> - {t('documentation:documentationPage.dataExport.formats.csvFiles.settlements') || 'Settlement history'}</li>
            <li><strong>activities.csv</strong> - {t('documentation:documentationPage.dataExport.formats.csvFiles.activities') || 'Activity logs'}</li>
          </ul>
        </div>

        <div className={styles.codeSection}>
          <pre>{`// ${t('documentation:documentationPage.dataExport.formats.example') || 'Example'}: expenses.csv
id,description,amount,currency,date,paidBy,category,settled
exp_123,"Dinner",45.50,USD,2024-06-01,user123,Food,false
exp_124,"Movie tickets",24.00,USD,2024-06-02,user456,Entertainment,true`}</pre>
        </div>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.formats.applicationData') || 'Application Data'}</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h4>JustSplit</h4>
            <ul>
              <li>{t('documentation:documentationPage.dataExport.formats.justSplitData.expenses') || 'Expenses (created and participated)'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.justSplitData.groups') || 'Group memberships'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.justSplitData.events') || 'Events and activities'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.justSplitData.settlements') || 'Settlement history'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.justSplitData.friends') || 'Friend connections'}</li>
            </ul>
          </div>
          <div className={styles.featureCard}>
            <h4>Hub</h4>
            <ul>
              <li>{t('documentation:documentationPage.dataExport.formats.hubData.apps') || 'Connected applications'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.hubData.permissions') || 'Permissions granted'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.hubData.activities') || 'Activity logs'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.hubData.security') || 'Security events'}</li>
              <li>{t('documentation:documentationPage.dataExport.formats.hubData.access') || 'Data access logs'}</li>
            </ul>
          </div>
        </div>
      </>
    );
  }

  function renderApiTab() {
    return (
      <>
        <h3>{t('documentation:documentationPage.dataExport.api.implementation') || 'Export Service Implementation'}</h3>
        <div className={styles.codeSection}>
          <pre>{`import { dataExportService } from '@cybereco/auth';

// Initialize export with options
const exportOptions = {
  format: 'json', // or 'csv'
  categories: [
    'profile',
    'justsplit',
    'hub',
    'settings',
    'activities'
  ],
  dateRange: {
    start: '2024-01-01',
    end: '2024-12-31'
  },
  includeMetadata: true
};

// Generate export
const exportData = await dataExportService.exportUserData(
  userId,
  exportOptions
);`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.dataExport.api.largeExports') || 'Handling Large Exports'}</h3>
        <p>{t('documentation:documentationPage.dataExport.api.largeExportsDesc') || 'For users with extensive data, exports are processed efficiently:'}</p>
        
        <div className={styles.codeSection}>
          <pre>{`// Chunked export for large datasets
async function exportLargeDataset(userId: string) {
  const exporter = dataExportService.createExporter(userId);
  
  // Process in chunks
  await exporter.addCollection('expenses', {
    batchSize: 1000,
    orderBy: 'createdAt'
  });
  
  await exporter.addCollection('activities', {
    batchSize: 500,
    dateRange: { days: 365 }
  });
  
  // Generate final export
  return await exporter.generate('json');
}`}</pre>
        </div>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.api.endpoints') || 'API Endpoints'}</h3>
        <table className={styles.apiTable}>
          <thead>
            <tr>
              <th>{t('documentation:documentationPage.dataExport.api.endpointColumns.endpoint') || 'Endpoint'}</th>
              <th>{t('documentation:documentationPage.dataExport.api.endpointColumns.method') || 'Method'}</th>
              <th>{t('documentation:documentationPage.dataExport.api.endpointColumns.description') || 'Description'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/api/export</code></td>
              <td>POST</td>
              <td>{t('documentation:documentationPage.dataExport.api.endpointDescriptions.request') || 'Request data export'}</td>
            </tr>
            <tr>
              <td><code>/api/export/status/:id</code></td>
              <td>GET</td>
              <td>{t('documentation:documentationPage.dataExport.api.endpointDescriptions.status') || 'Check export status'}</td>
            </tr>
            <tr>
              <td><code>/api/export/download/:id</code></td>
              <td>GET</td>
              <td>{t('documentation:documentationPage.dataExport.api.endpointDescriptions.download') || 'Download export file'}</td>
            </tr>
          </tbody>
        </table>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.api.rateLimits') || 'Rate Limits'}</h3>
        <div className={styles.warningBox}>
          <h4>⚠️ {t('documentation:documentationPage.dataExport.api.defaultLimits') || 'Default Limits:'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.dataExport.api.limits.exports') || '5 exports per 24-hour period'}</li>
            <li>{t('documentation:documentationPage.dataExport.api.limits.concurrent') || '1 concurrent export per user'}</li>
            <li>{t('documentation:documentationPage.dataExport.api.limits.size') || '100MB maximum export size'}</li>
            <li>{t('documentation:documentationPage.dataExport.api.limits.expiration') || '30-minute export link expiration'}</li>
          </ul>
        </div>
      </>
    );
  }

  function renderGdprTab() {
    return (
      <>
        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.gdpr.rightToPortability') || 'Right to Data Portability'}</h3>
        <p className={styles.description}>
          {t('documentation:documentationPage.dataExport.gdpr.article20') || 'The data export feature fully implements GDPR Article 20 requirements:'}
        </p>
        
        <div className={styles.gdprGrid}>
          <div className={styles.gdprCard}>
            <h4>{t('documentation:documentationPage.dataExport.gdpr.machineReadable') || 'Machine-Readable Format'}</h4>
            <p>{t('documentation:documentationPage.dataExport.gdpr.machineReadableDesc') || 'JSON and CSV formats ensure data can be easily processed'}</p>
          </div>
          <div className={styles.gdprCard}>
            <h4>{t('documentation:documentationPage.dataExport.gdpr.commonlyUsed') || 'Commonly Used Format'}</h4>
            <p>{t('documentation:documentationPage.dataExport.gdpr.commonlyUsedDesc') || 'Standard formats compatible with most applications'}</p>
          </div>
          <div className={styles.gdprCard}>
            <h4>{t('documentation:documentationPage.dataExport.gdpr.directTransfer') || 'Direct Transfer'}</h4>
            <p>{t('documentation:documentationPage.dataExport.gdpr.directTransferDesc') || 'API support for direct transfer to other services'}</p>
          </div>
          <div className={styles.gdprCard}>
            <h4>{t('documentation:documentationPage.dataExport.gdpr.completeDataSet') || 'Complete Data Set'}</h4>
            <p>{t('documentation:documentationPage.dataExport.gdpr.completeDataSetDesc') || 'All personal data provided by the user included'}</p>
          </div>
        </div>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.gdpr.complianceFeatures') || 'Compliance Features'}</h3>
        <ul>
          <li>{t('documentation:documentationPage.dataExport.gdpr.complianceList.provided') || 'Export includes all data "provided by" the data subject'}</li>
          <li>{t('documentation:documentationPage.dataExport.gdpr.complianceList.excludes') || 'Excludes inferred or derived data'}</li>
          <li>{t('documentation:documentationPage.dataExport.gdpr.complianceList.privacy') || 'Respects other users\' privacy rights'}</li>
          <li>{t('documentation:documentationPage.dataExport.gdpr.complianceList.audit') || 'Audit trail maintained for all exports'}</li>
        </ul>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.gdpr.dataRetention') || 'Data Retention'}</h3>
        <div className={styles.warningBox}>
          <h4>⏱️ {t('documentation:documentationPage.dataExport.gdpr.retentionPolicy') || 'Export Retention Policy:'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.dataExport.gdpr.retentionList.linkExpiry') || 'Export links expire after 30 minutes'}</li>
            <li>{t('documentation:documentationPage.dataExport.gdpr.retentionList.fileDelete') || 'Temporary export files deleted after download'}</li>
            <li>{t('documentation:documentationPage.dataExport.gdpr.retentionList.logRetention') || 'Export logs retained for 90 days'}</li>
            <li>{t('documentation:documentationPage.dataExport.gdpr.retentionList.noStorage') || 'No permanent storage of export files'}</li>
          </ul>
        </div>

        <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.gdpr.securityMeasures') || 'Security Measures'}</h3>
        <div className={styles.securityGrid}>
          <div className={styles.securityItem}>
            <FaCheckCircle className={styles.securityIcon} />
            <div>
              <strong>{t('documentation:documentationPage.dataExport.gdpr.securityItems.authRequired') || 'Authentication Required:'}</strong> {t('documentation:documentationPage.dataExport.gdpr.securityItems.authRequiredDesc') || 'Valid session token must be present'}
            </div>
          </div>
          <div className={styles.securityItem}>
            <FaCheckCircle className={styles.securityIcon} />
            <div>
              <strong>{t('documentation:documentationPage.dataExport.gdpr.securityItems.sanitization') || 'Data Sanitization:'}</strong> {t('documentation:documentationPage.dataExport.gdpr.securityItems.sanitizationDesc') || 'Sensitive fields automatically removed'}
            </div>
          </div>
          <div className={styles.securityItem}>
            <FaCheckCircle className={styles.securityIcon} />
            <div>
              <strong>{t('documentation:documentationPage.dataExport.gdpr.securityItems.auditLogging') || 'Audit Logging:'}</strong> {t('documentation:documentationPage.dataExport.gdpr.securityItems.auditLoggingDesc') || 'All exports tracked for security'}
            </div>
          </div>
          <div className={styles.securityItem}>
            <FaCheckCircle className={styles.securityIcon} />
            <div>
              <strong>{t('documentation:documentationPage.dataExport.gdpr.securityItems.encrypted') || 'Encrypted Transport:'}</strong> {t('documentation:documentationPage.dataExport.gdpr.securityItems.encryptedDesc') || 'HTTPS required for all exports'}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaDatabase />}
        title={t('documentation:documentationPage.dataExport.title') || 'Data Export & Portability'}
        subtitle={t('documentation:documentationPage.dataExport.description') || 'Export your CyberEco data in multiple formats for backup, analysis, or migration'}
        gradient="linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #6366f1 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <div className={styles.nextSteps}>
        <div className={styles.contentSection}>
          <h3 className={sharedStyles.subTitle}>{t('documentation:documentationPage.dataExport.nextSteps.title') || 'Next Steps'}</h3>
          <div className={styles.nextStepsGrid}>
            <Link href="/documentation/privacy-controls" className={styles.nextStepCard}>
              <FaDatabase />
              <span>{t('documentation:documentationPage.dataExport.nextSteps.privacyControls') || 'Privacy Controls'}</span>
            </Link>
            <Link href="/documentation/two-factor-auth" className={styles.nextStepCard}>
              <FaDownload />
              <span>{t('documentation:documentationPage.dataExport.nextSteps.twoFactorAuth') || 'Two-Factor Auth'}</span>
            </Link>
            <Link href="/documentation/authentication" className={styles.nextStepCard}>
              <FaFileExport />
              <span>{t('documentation:documentationPage.dataExport.nextSteps.authentication') || 'Authentication'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}