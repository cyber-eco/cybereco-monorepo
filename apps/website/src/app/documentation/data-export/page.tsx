'use client';

import Link from 'next/link';
import { FaDatabase, FaDownload, FaFileExport, FaFileCsv, FaFileCode, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from '../page.module.css';

export default function DataExportDocumentation() {
  const { t } = useI18n();
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          <FaDatabase /> {t('documentation:documentationPage.dataExport.title') || 'Data Export & Portability'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.dataExport.description') || 'Export your CyberEco data in multiple formats for backup, analysis, or migration'}
        </p>
      </div>

      <nav className={styles.tableOfContents}>
        <h2>{t('documentation:documentationPage.tableOfContents') || 'Table of Contents'}</h2>
        <ul>
          <li><a href="#overview">{t('documentation:documentationPage.dataExport.overview.title') || 'Overview'}</a></li>
          <li><a href="#export-formats">{t('documentation:documentationPage.dataExport.formats.title') || 'Export Formats'}</a></li>
          <li><a href="#data-included">{t('documentation:documentationPage.dataExport.included.title') || "What's Included"}</a></li>
          <li><a href="#how-to-export">{t('documentation:documentationPage.dataExport.howTo.title') || 'How to Export'}</a></li>
          <li><a href="#api-integration">{t('documentation:documentationPage.dataExport.api.title') || 'API Integration'}</a></li>
          <li><a href="#rate-limits">{t('documentation:documentationPage.dataExport.rateLimits.title') || 'Rate Limits & Security'}</a></li>
          <li><a href="#gdpr-compliance">{t('documentation:documentationPage.dataExport.gdpr.title') || 'GDPR Compliance'}</a></li>
        </ul>
      </nav>

      <div id="overview" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.dataExport.overview.title') || 'Overview'}</h3>
        <p>
          {t('documentation:documentationPage.dataExport.overview.description') || 
          'CyberEco provides comprehensive data export functionality that allows users to download all their personal data in machine-readable formats. This feature supports data portability rights under GDPR and gives users full control over their information.'}
        </p>

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
            <h3>Instant Download</h3>
            <p>Get your data immediately with secure, authenticated access</p>
          </div>
          <div className={styles.featureCard}>
            <FaFileExport className={styles.featureIcon} />
            <h3>Complete Data</h3>
            <p>Export all your data including metadata and relationships</p>
          </div>
        </div>
      </div>

      <div id="export-formats" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Export Formats</h3>
        
        <h4>JSON Format</h4>
        <p>
          JSON (JavaScript Object Notation) provides a hierarchical structure that preserves
          data relationships and types.
        </p>
        
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

        <h4>CSV Format</h4>
        <p>
          CSV (Comma-Separated Values) flattens hierarchical data into tables, making it
          easy to import into spreadsheet applications.
        </p>
        
        <div className={styles.featureCard}>
          <h4>CSV Structure:</h4>
          <ul>
            <li><strong>profile.csv</strong> - User profile information</li>
            <li><strong>expenses.csv</strong> - All expense records</li>
            <li><strong>groups.csv</strong> - Group memberships</li>
            <li><strong>settlements.csv</strong> - Settlement history</li>
            <li><strong>activities.csv</strong> - Activity logs</li>
          </ul>
        </div>

        <div className={styles.codeSection}>
          <pre>{`// Example: expenses.csv
id,description,amount,currency,date,paidBy,category,settled
exp_123,"Dinner",45.50,USD,2024-06-01,user123,Food,false
exp_124,"Movie tickets",24.00,USD,2024-06-02,user456,Entertainment,true`}</pre>
        </div>
      </div>

      <div id="data-included" className={styles.contentSection}>
        <h3 className={styles.subTitle}>What's Included in Your Export</h3>
        
        <h4>Core User Data</h4>
        <div style={{display: 'grid', gap: 'var(--spacing-sm)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Profile Information:</strong> Name, email, avatar, account creation date
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Authentication Data:</strong> Login history, sessions, security settings
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Privacy Settings:</strong> Consent records, visibility preferences
            </div>
          </div>
        </div>

        <h4>Application Data</h4>
        <div className={styles.cardGrid}>
          <div className={styles.featureCard}>
            <h4>JustSplit</h4>
            <ul>
              <li>Expenses (created and participated)</li>
              <li>Group memberships</li>
              <li>Events and activities</li>
              <li>Settlement history</li>
              <li>Friend connections</li>
            </ul>
          </div>
          <div className={styles.featureCard}>
            <h4>Hub</h4>
            <ul>
              <li>Connected applications</li>
              <li>Permissions granted</li>
              <li>Activity logs</li>
              <li>Security events</li>
              <li>Data access logs</li>
            </ul>
          </div>
        </div>

        <h4>Metadata</h4>
        <p>Each export includes comprehensive metadata:</p>
        <ul>
          <li>Export timestamp</li>
          <li>Data version</li>
          <li>Collection sources</li>
          <li>Processing notes</li>
        </ul>

        <div className={styles.featureCard} style={{borderLeft: '4px solid #ff9800'}}>
          <h4>Excluded Data:</h4>
          <ul>
            <li>Internal system identifiers</li>
            <li>Encrypted passwords</li>
            <li>Active session tokens</li>
            <li>Other users' private data</li>
          </ul>
        </div>
      </div>

      <div id="how-to-export" className={styles.contentSection}>
        <h3 className={styles.subTitle}>How to Export Your Data</h3>
        
        <h4>Via Web Interface</h4>
        <ol style={{paddingLeft: 'var(--spacing-lg)', lineHeight: '1.8'}}>
          <li>Sign in to CyberEco Hub</li>
          <li>Navigate to <strong>My Data</strong> page</li>
          <li>Click the <strong>Export Data</strong> button</li>
          <li>Choose your preferred format (JSON or CSV)</li>
          <li>Select data categories to include</li>
          <li>Click <strong>Download</strong></li>
        </ol>

        <h4>Via API</h4>
        <div className={styles.codeSection}>
          <pre>{`// Request data export via API
const response = await fetch('/api/export', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${authToken}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    format: 'json',
    categories: ['profile', 'justsplit', 'settings'],
    includeMetadata: true
  })
});

const exportData = await response.blob();
// Download the file
const url = URL.createObjectURL(exportData);
const a = document.createElement('a');
a.href = url;
a.download = \`cybereco-export-\${Date.now()}.json\`;
a.click();`}</pre>
        </div>
      </div>

      <div id="api-integration" className={styles.contentSection}>
        <h3 className={styles.subTitle}>API Integration</h3>
        
        <h4>Export Service Implementation</h4>
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

        <h4>Handling Large Exports</h4>
        <p>For users with extensive data, exports are processed efficiently:</p>
        
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

        <h4>Custom Export Formats</h4>
        <div className={styles.codeSection}>
          <pre>{`// Register custom export transformer
dataExportService.registerTransformer('custom-csv', {
  transform: (data) => {
    // Custom CSV formatting logic
    return customCSVFormatter(data);
  },
  fileExtension: 'csv',
  mimeType: 'text/csv'
});

// Use custom format
const customExport = await dataExportService.exportUserData(
  userId,
  { format: 'custom-csv' }
);`}</pre>
        </div>
      </div>

      <div id="rate-limits" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Rate Limits & Security</h3>
        
        <h4>Export Rate Limits</h4>
        <p>To prevent abuse and ensure system stability:</p>
        
        <div className={styles.featureCard}>
          <h4>Default Limits:</h4>
          <ul>
            <li><strong>5 exports</strong> per 24-hour period</li>
            <li><strong>1 concurrent export</strong> per user</li>
            <li><strong>100MB</strong> maximum export size</li>
            <li><strong>30-minute</strong> export link expiration</li>
          </ul>
        </div>

        <h4>Security Measures</h4>
        <div style={{display: 'grid', gap: 'var(--spacing-sm)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Authentication Required:</strong> Valid session token must be present
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Data Sanitization:</strong> Sensitive fields automatically removed
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Audit Logging:</strong> All exports tracked for security
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
            <FaCheckCircle style={{color: 'var(--primary)', fontSize: '1.2rem'}} />
            <div>
              <strong>Encrypted Transport:</strong> HTTPS required for all exports
            </div>
          </div>
        </div>

        <h4>Rate Limit Headers</h4>
        <div className={styles.codeSection}>
          <pre>{`// Response headers for rate limiting
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1717430400
X-Export-Status: completed
X-Export-Size: 15728640`}</pre>
        </div>
      </div>

      <div id="gdpr-compliance" className={styles.contentSection}>
        <h3 className={styles.subTitle}>GDPR Compliance</h3>
        
        <h4>Right to Data Portability</h4>
        <p>
          The data export feature fully implements GDPR Article 20 requirements:
        </p>
        
        <div className={styles.cardGrid}>
          <div className={styles.docCard}>
            <h4>Machine-Readable Format</h4>
            <p>JSON and CSV formats ensure data can be easily processed</p>
          </div>
          <div className={styles.docCard}>
            <h4>Commonly Used Format</h4>
            <p>Standard formats compatible with most applications</p>
          </div>
          <div className={styles.docCard}>
            <h4>Direct Transfer</h4>
            <p>API support for direct transfer to other services</p>
          </div>
          <div className={styles.docCard}>
            <h4>Complete Data Set</h4>
            <p>All personal data provided by the user included</p>
          </div>
        </div>

        <h4>Compliance Features</h4>
        <ul>
          <li>Export includes all data "provided by" the data subject</li>
          <li>Excludes inferred or derived data</li>
          <li>Respects other users' privacy rights</li>
          <li>Audit trail maintained for all exports</li>
        </ul>

        <h4>Data Retention</h4>
        <div className={styles.featureCard} style={{borderLeft: '4px solid #ff9800'}}>
          <h4>Export Retention Policy:</h4>
          <ul>
            <li>Export links expire after 30 minutes</li>
            <li>Temporary export files deleted after download</li>
            <li>Export logs retained for 90 days</li>
            <li>No permanent storage of export files</li>
          </ul>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>API Reference</h3>
        
        <h4>Export Endpoints</h4>
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: 'var(--spacing-md)'}}>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/api/export</code></td>
              <td>POST</td>
              <td>Request data export</td>
            </tr>
            <tr>
              <td><code>/api/export/status/:id</code></td>
              <td>GET</td>
              <td>Check export status</td>
            </tr>
            <tr>
              <td><code>/api/export/download/:id</code></td>
              <td>GET</td>
              <td>Download export file</td>
            </tr>
          </tbody>
        </table>

        <h4>Export Options Interface</h4>
        <div className={styles.codeSection}>
          <pre>{`interface ExportOptions {
  format: 'json' | 'csv';
  categories?: string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  includeMetadata?: boolean;
  compress?: boolean;
}

interface ExportResponse {
  exportId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  format: string;
  size?: number;
  downloadUrl?: string;
  expiresAt?: string;
}`}</pre>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>Next Steps</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/privacy-controls" className={styles.docCard}>
            <FaDatabase />
            <span>Privacy Controls</span>
          </Link>
          <Link href="/documentation/two-factor-auth" className={styles.docCard}>
            <FaDownload />
            <span>Two-Factor Auth</span>
          </Link>
          <Link href="/documentation/authentication" className={styles.docCard}>
            <FaFileExport />
            <span>Authentication</span>
          </Link>
        </div>
      </div>
    </div>
  );
}