'use client';

import { useI18n } from '@cybereco/i18n';
import styles from './page.module.css';

export default function DataExportGuidePage() {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <a href="/documentation" className={styles.breadcrumbLink}>
            {t('documentation:dataExportGuide.documentation') || 'Documentation'}
          </a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>
            {t('documentation:dataExportGuide.title') || 'Data Export & Analysis'}
          </span>
        </div>
        <h1 className={styles.title}>
          📊 {t('documentation:dataExportGuide.title') || 'Data Export & Analysis'}
        </h1>
        <div className={styles.guideMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>⏱️ {t('documentation:dataExportGuide.duration') || 'Duration'}:</span>
            <span className={styles.metaValue}>15-20 {t('documentation:dataExportGuide.minutes') || 'minutes'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>📈 {t('documentation:dataExportGuide.level') || 'Level'}:</span>
            <span className={styles.metaValue}>{t('documentation:dataExportGuide.intermediate') || 'Intermediate'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>🎯 {t('documentation:dataExportGuide.goal') || 'Goal'}:</span>
            <span className={styles.metaValue}>{t('documentation:dataExportGuide.goalText') || 'Master data analysis and export'}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.introSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.introTitle') || 'Your Financial Data, Your Way'}
          </h2>
          <p className={styles.introText}>
            {t('documentation:dataExportGuide.introText') || 'Take control of your financial data with CyberEco\'s comprehensive export and analysis tools. This guide covers everything from basic CSV exports to advanced analytics, helping you understand spending patterns, generate reports, and integrate with external tools for deeper insights.'}
          </p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📈</div>
              <h4>{t('documentation:dataExportGuide.insightsBenefit') || 'Deep Insights'}</h4>
              <p>{t('documentation:dataExportGuide.insightsBenefitDesc') || 'Understand spending patterns and trends'}</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔗</div>
              <h4>{t('documentation:dataExportGuide.integrationBenefit') || 'Easy Integration'}</h4>
              <p>{t('documentation:dataExportGuide.integrationBenefitDesc') || 'Connect with your favorite financial tools'}</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔒</div>
              <h4>{t('documentation:dataExportGuide.privacyBenefit') || 'Privacy Preserved'}</h4>
              <p>{t('documentation:dataExportGuide.privacyBenefitDesc') || 'Full control over what data you export'}</p>
            </div>
          </div>
        </div>

        <div className={styles.exportFormatsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.exportFormats') || 'Export Formats'}
          </h2>
          
          <div className={styles.formatsList}>
            <div className={styles.formatCard}>
              <div className={styles.formatHeader}>
                <div className={styles.formatIcon}>📊</div>
                <h3>{t('documentation:dataExportGuide.csvFormat') || 'CSV (Comma-Separated Values)'}</h3>
                <span className={styles.popularBadge}>{t('documentation:dataExportGuide.mostPopular') || 'Most Popular'}</span>
              </div>
              <p className={styles.formatDescription}>
                {t('documentation:dataExportGuide.csvDesc') || 'Perfect for spreadsheet analysis, accounting software, and custom reporting tools.'}
              </p>
              <div className={styles.formatFeatures}>
                <h4>{t('documentation:dataExportGuide.includes') || 'Includes'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.csvFeature1') || 'All expense transactions with timestamps'}</li>
                  <li>{t('documentation:dataExportGuide.csvFeature2') || 'Participant details and split amounts'}</li>
                  <li>{t('documentation:dataExportGuide.csvFeature3') || 'Category tags and custom notes'}</li>
                  <li>{t('documentation:dataExportGuide.csvFeature4') || 'Settlement status and payment methods'}</li>
                </ul>
              </div>
              <div className={styles.useCase}>
                <strong>{t('documentation:dataExportGuide.bestFor') || 'Best for'}:</strong>
                <span>{t('documentation:dataExportGuide.csvBestFor') || 'Excel analysis, QuickBooks import, tax preparation'}</span>
              </div>
            </div>

            <div className={styles.formatCard}>
              <div className={styles.formatHeader}>
                <div className={styles.formatIcon}>🔧</div>
                <h3>{t('documentation:dataExportGuide.jsonFormat') || 'JSON (JavaScript Object Notation)'}</h3>
                <span className={styles.technicalBadge}>{t('documentation:dataExportGuide.technical') || 'Technical'}</span>
              </div>
              <p className={styles.formatDescription}>
                {t('documentation:dataExportGuide.jsonDesc') || 'Structured data format ideal for developers and advanced integrations.'}
              </p>
              <div className={styles.formatFeatures}>
                <h4>{t('documentation:dataExportGuide.includes') || 'Includes'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.jsonFeature1') || 'Complete data structure with relationships'}</li>
                  <li>{t('documentation:dataExportGuide.jsonFeature2') || 'Nested group and member information'}</li>
                  <li>{t('documentation:dataExportGuide.jsonFeature3') || 'Metadata and system-generated fields'}</li>
                  <li>{t('documentation:dataExportGuide.jsonFeature4') || 'API-compatible format for automation'}</li>
                </ul>
              </div>
              <div className={styles.useCase}>
                <strong>{t('documentation:dataExportGuide.bestFor') || 'Best for'}:</strong>
                <span>{t('documentation:dataExportGuide.jsonBestFor') || 'Custom apps, data migration, backup systems'}</span>
              </div>
            </div>

            <div className={styles.formatCard}>
              <div className={styles.formatHeader}>
                <div className={styles.formatIcon}>📄</div>
                <h3>{t('documentation:dataExportGuide.pdfFormat') || 'PDF Reports'}</h3>
                <span className={styles.visualBadge}>{t('documentation:dataExportGuide.visual') || 'Visual'}</span>
              </div>
              <p className={styles.formatDescription}>
                {t('documentation:dataExportGuide.pdfDesc') || 'Formatted reports perfect for sharing, presentations, and record-keeping.'}
              </p>
              <div className={styles.formatFeatures}>
                <h4>{t('documentation:dataExportGuide.includes') || 'Includes'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.pdfFeature1') || 'Visual charts and spending summaries'}</li>
                  <li>{t('documentation:dataExportGuide.pdfFeature2') || 'Professional formatting and branding'}</li>
                  <li>{t('documentation:dataExportGuide.pdfFeature3') || 'Group member contribution breakdowns'}</li>
                  <li>{t('documentation:dataExportGuide.pdfFeature4') || 'Period comparisons and trend analysis'}</li>
                </ul>
              </div>
              <div className={styles.useCase}>
                <strong>{t('documentation:dataExportGuide.bestFor') || 'Best for'}:</strong>
                <span>{t('documentation:dataExportGuide.pdfBestFor') || 'Sharing with others, business reports, archiving'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.exportProcessSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.exportProcess') || 'Export Process'}
          </h2>
          
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>{t('documentation:dataExportGuide.step1Title') || 'Choose Your Scope'}</h3>
                <p>{t('documentation:dataExportGuide.step1Desc') || 'Select which data to export: specific groups, date ranges, or your complete financial history.'}</p>
                <div className={styles.scopeOptions}>
                  <div className={styles.scopeOption}>
                    <strong>{t('documentation:dataExportGuide.singleGroup') || 'Single Group'}</strong>
                    <p>{t('documentation:dataExportGuide.singleGroupDesc') || 'Export data from one specific group'}</p>
                  </div>
                  <div className={styles.scopeOption}>
                    <strong>{t('documentation:dataExportGuide.multipleGroups') || 'Multiple Groups'}</strong>
                    <p>{t('documentation:dataExportGuide.multipleGroupsDesc') || 'Select multiple groups for combined analysis'}</p>
                  </div>
                  <div className={styles.scopeOption}>
                    <strong>{t('documentation:dataExportGuide.completeHistory') || 'Complete History'}</strong>
                    <p>{t('documentation:dataExportGuide.completeHistoryDesc') || 'Export all your financial data across all groups'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>{t('documentation:dataExportGuide.step2Title') || 'Set Date Range'}</h3>
                <p>{t('documentation:dataExportGuide.step2Desc') || 'Specify the time period for your export. Choose from preset ranges or set custom dates.'}</p>
                <div className={styles.dateRanges}>
                  <div className={styles.rangeOptions}>
                    <span className={styles.rangeOption}>{t('documentation:dataExportGuide.lastMonth') || 'Last Month'}</span>
                    <span className={styles.rangeOption}>{t('documentation:dataExportGuide.lastQuarter') || 'Last Quarter'}</span>
                    <span className={styles.rangeOption}>{t('documentation:dataExportGuide.lastYear') || 'Last Year'}</span>
                    <span className={styles.rangeOption}>{t('documentation:dataExportGuide.allTime') || 'All Time'}</span>
                    <span className={styles.rangeOption}>{t('documentation:dataExportGuide.customRange') || 'Custom Range'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>{t('documentation:dataExportGuide.step3Title') || 'Configure Privacy'}</h3>
                <p>{t('documentation:dataExportGuide.step3Desc') || 'Control what personal information to include or anonymize in your export.'}</p>
                <div className={styles.privacyControls}>
                  <div className={styles.privacyToggle}>
                    <strong>{t('documentation:dataExportGuide.includeNames') || 'Include Member Names'}</strong>
                    <p>{t('documentation:dataExportGuide.includeNamesDesc') || 'Show real names vs. anonymized identifiers'}</p>
                  </div>
                  <div className={styles.privacyToggle}>
                    <strong>{t('documentation:dataExportGuide.includeNotes') || 'Include Personal Notes'}</strong>
                    <p>{t('documentation:dataExportGuide.includeNotesDesc') || 'Export custom notes and comments'}</p>
                  </div>
                  <div className={styles.privacyToggle}>
                    <strong>{t('documentation:dataExportGuide.includeReceipts') || 'Include Receipt Images'}</strong>
                    <p>{t('documentation:dataExportGuide.includeReceiptsDesc') || 'Package receipt photos with data export'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>{t('documentation:dataExportGuide.step4Title') || 'Download & Verify'}</h3>
                <p>{t('documentation:dataExportGuide.step4Desc') || 'Generate your export file and verify the data integrity before using it for analysis.'}</p>
                <div className={styles.verificationChecks}>
                  <div className={styles.checkItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{t('documentation:dataExportGuide.check1') || 'Verify transaction count matches your records'}</span>
                  </div>
                  <div className={styles.checkItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{t('documentation:dataExportGuide.check2') || 'Spot-check a few transactions for accuracy'}</span>
                  </div>
                  <div className={styles.checkItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{t('documentation:dataExportGuide.check3') || 'Confirm date ranges are correct'}</span>
                  </div>
                  <div className={styles.checkItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{t('documentation:dataExportGuide.check4') || 'Test file opens properly in target application'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.analysisSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.analysisTools') || 'Analysis Tools & Techniques'}
          </h2>
          
          <div className={styles.toolsGrid}>
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>📈</div>
              <h3>{t('documentation:dataExportGuide.spreadsheetAnalysis') || 'Spreadsheet Analysis'}</h3>
              <p>{t('documentation:dataExportGuide.spreadsheetDesc') || 'Use Excel, Google Sheets, or Numbers for quick insights and custom charts.'}</p>
              <div className={styles.toolFeatures}>
                <h4>{t('documentation:dataExportGuide.commonAnalyses') || 'Common Analyses'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.monthlyTrends') || 'Monthly spending trends and seasonality'}</li>
                  <li>{t('documentation:dataExportGuide.categoryBreakdown') || 'Spending breakdown by category'}</li>
                  <li>{t('documentation:dataExportGuide.memberComparison') || 'Member contribution comparisons'}</li>
                  <li>{t('documentation:dataExportGuide.budgetTracking') || 'Budget vs. actual analysis'}</li>
                </ul>
              </div>
              <div className={styles.toolTip}>
                <strong>{t('documentation:dataExportGuide.proTip') || 'Pro Tip'}:</strong>
                <p>{t('documentation:dataExportGuide.spreadsheetTip') || 'Use pivot tables to quickly summarize large datasets by category, member, or time period.'}</p>
              </div>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>💼</div>
              <h3>{t('documentation:dataExportGuide.businessTools') || 'Business Intelligence Tools'}</h3>
              <p>{t('documentation:dataExportGuide.businessToolsDesc') || 'Import data into Power BI, Tableau, or similar tools for advanced visualization.'}</p>
              <div className={styles.toolFeatures}>
                <h4>{t('documentation:dataExportGuide.advancedFeatures') || 'Advanced Features'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.interactiveDashboards') || 'Interactive dashboards and filters'}</li>
                  <li>{t('documentation:dataExportGuide.predictiveAnalytics') || 'Predictive analytics and forecasting'}</li>
                  <li>{t('documentation:dataExportGuide.crossGroupAnalysis') || 'Cross-group spending pattern analysis'}</li>
                  <li>{t('documentation:dataExportGuide.automatedReporting') || 'Automated report generation and sharing'}</li>
                </ul>
              </div>
              <div className={styles.toolTip}>
                <strong>{t('documentation:dataExportGuide.proTip') || 'Pro Tip'}:</strong>
                <p>{t('documentation:dataExportGuide.businessTip') || 'Set up data refresh schedules to automatically update your dashboards with new exports.'}</p>
              </div>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>💰</div>
              <h3>{t('documentation:dataExportGuide.personalFinance') || 'Personal Finance Apps'}</h3>
              <p>{t('documentation:dataExportGuide.personalFinanceDesc') || 'Integrate with Mint, YNAB, Personal Capital, or other budgeting tools.'}</p>
              <div className={styles.toolFeatures}>
                <h4>{t('documentation:dataExportGuide.integrationBenefits') || 'Integration Benefits'}:</h4>
                <ul>
                  <li>{t('documentation:dataExportGuide.holisticView') || 'Holistic view of all your finances'}</li>
                  <li>{t('documentation:dataExportGuide.automaticCategorization') || 'Automatic categorization and budgeting'}</li>
                  <li>{t('documentation:dataExportGuide.goalTracking') || 'Goal tracking and financial planning'}</li>
                  <li>{t('documentation:dataExportGuide.creditScore') || 'Credit score monitoring and alerts'}</li>
                </ul>
              </div>
              <div className={styles.toolTip}>
                <strong>{t('documentation:dataExportGuide.proTip') || 'Pro Tip'}:</strong>
                <p>{t('documentation:dataExportGuide.personalTip') || 'Map CyberEco categories to your budgeting app categories for seamless integration.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.insightsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.keyInsights') || 'Key Insights to Look For'}
          </h2>
          
          <div className={styles.insightsList}>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>📊</div>
              <h3>{t('documentation:dataExportGuide.spendingPatterns') || 'Spending Patterns'}</h3>
              <div className={styles.insightDetails}>
                <p>{t('documentation:dataExportGuide.patternsDesc') || 'Identify recurring themes in your group spending behavior.'}</p>
                <div className={styles.patternExamples}>
                  <div className={styles.pattern}>
                    <strong>{t('documentation:dataExportGuide.seasonalSpending') || 'Seasonal Spending'}</strong>
                    <p>{t('documentation:dataExportGuide.seasonalDesc') || 'Higher entertainment costs in summer, heating bills in winter'}</p>
                  </div>
                  <div className={styles.pattern}>
                    <strong>{t('documentation:dataExportGuide.weekdayPatterns') || 'Weekday vs. Weekend'}</strong>
                    <p>{t('documentation:dataExportGuide.weekdayDesc') || 'Different spending categories during work vs. leisure time'}</p>
                  </div>
                  <div className={styles.pattern}>
                    <strong>{t('documentation:dataExportGuide.groupSize') || 'Group Size Impact'}</strong>
                    <p>{t('documentation:dataExportGuide.groupSizeDesc') || 'How group size affects per-person costs and categories'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>⚖️</div>
              <h3>{t('documentation:dataExportGuide.fairnessMetrics') || 'Fairness & Balance'}</h3>
              <div className={styles.insightDetails}>
                <p>{t('documentation:dataExportGuide.fairnessDesc') || 'Understand how equitably expenses are shared among group members.'}</p>
                <div className={styles.fairnessMetrics}>
                  <div className={styles.metric}>
                    <strong>{t('documentation:dataExportGuide.contributionRatio') || 'Contribution Ratio'}</strong>
                    <p>{t('documentation:dataExportGuide.contributionDesc') || 'Who pays for expenses vs. who benefits'}</p>
                  </div>
                  <div className={styles.metric}>
                    <strong>{t('documentation:dataExportGuide.settlementSpeed') || 'Settlement Speed'}</strong>
                    <p>{t('documentation:dataExportGuide.settlementDesc') || 'How quickly members pay their shares'}</p>
                  </div>
                  <div className={styles.metric}>
                    <strong>{t('documentation:dataExportGuide.participationLevel') || 'Participation Level'}</strong>
                    <p>{t('documentation:dataExportGuide.participationDesc') || 'Activity levels and engagement across members'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>🎯</div>
              <h3>{t('documentation:dataExportGuide.optimizationOpportunities') || 'Optimization Opportunities'}</h3>
              <div className={styles.insightDetails}>
                <p>{t('documentation:dataExportGuide.optimizationDesc') || 'Find ways to reduce costs and improve group financial efficiency.'}</p>
                <div className={styles.optimizations}>
                  <div className={styles.optimization}>
                    <strong>{t('documentation:dataExportGuide.bulkPurchasing') || 'Bulk Purchasing'}</strong>
                    <p>{t('documentation:dataExportGuide.bulkDesc') || 'Items frequently bought individually that could be bulk purchased'}</p>
                  </div>
                  <div className={styles.optimization}>
                    <strong>{t('documentation:dataExportGuide.subscriptionAudit') || 'Subscription Audit'}</strong>
                    <p>{t('documentation:dataExportGuide.subscriptionDesc') || 'Duplicate or underused subscription services'}</p>
                  </div>
                  <div className={styles.optimization}>
                    <strong>{t('documentation:dataExportGuide.vendorSwitching') || 'Vendor Switching'}</strong>
                    <p>{t('documentation:dataExportGuide.vendorDesc') || 'Expensive vendors where cheaper alternatives exist'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.automationSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.automatedExports') || 'Automated Exports'}
          </h2>
          
          <div className={styles.automationOptions}>
            <div className={styles.automationCard}>
              <div className={styles.automationIcon}>🔄</div>
              <h3>{t('documentation:dataExportGuide.scheduledExports') || 'Scheduled Exports'}</h3>
              <p>{t('documentation:dataExportGuide.scheduledDesc') || 'Set up regular exports to run automatically at specified intervals.'}</p>
              <div className={styles.scheduleOptions}>
                <div className={styles.scheduleOption}>
                  <strong>{t('documentation:dataExportGuide.daily') || 'Daily'}</strong>
                  <p>{t('documentation:dataExportGuide.dailyDesc') || 'For active groups with frequent transactions'}</p>
                </div>
                <div className={styles.scheduleOption}>
                  <strong>{t('documentation:dataExportGuide.weekly') || 'Weekly'}</strong>
                  <p>{t('documentation:dataExportGuide.weeklyDesc') || 'Standard option for most groups'}</p>
                </div>
                <div className={styles.scheduleOption}>
                  <strong>{t('documentation:dataExportGuide.monthly') || 'Monthly'}</strong>
                  <p>{t('documentation:dataExportGuide.monthlyDesc') || 'For budget reviews and monthly reporting'}</p>
                </div>
                <div className={styles.scheduleOption}>
                  <strong>{t('documentation:dataExportGuide.quarterly') || 'Quarterly'}</strong>
                  <p>{t('documentation:dataExportGuide.quarterlyDesc') || 'For business groups and formal reporting'}</p>
                </div>
              </div>
            </div>

            <div className={styles.automationCard}>
              <div className={styles.automationIcon}>🔗</div>
              <h3>{t('documentation:dataExportGuide.apiIntegration') || 'API Integration'}</h3>
              <p>{t('documentation:dataExportGuide.apiDesc') || 'Connect directly to external systems using our REST API for real-time data access.'}</p>
              <div className={styles.apiFeatures}>
                <ul>
                  <li>{t('documentation:dataExportGuide.realtimeData') || 'Real-time data access'}</li>
                  <li>{t('documentation:dataExportGuide.customFiltering') || 'Custom filtering and queries'}</li>
                  <li>{t('documentation:dataExportGuide.webhookNotifications') || 'Webhook notifications for new transactions'}</li>
                  <li>{t('documentation:dataExportGuide.rateLimitProtection') || 'Rate limiting and authentication'}</li>
                </ul>
              </div>
              <div className={styles.codeExample}>
                <h4>{t('documentation:dataExportGuide.exampleRequest') || 'Example API Request'}:</h4>
                <div className={styles.codeBlock}>
                  <code>
                    GET /api/v1/exports/transactions<br/>
                    ?group_id=123&from=2024-01-01&format=json
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.nextStepsSection}>
          <h2 className={styles.sectionTitle}>
            {t('documentation:dataExportGuide.nextStepsTitle') || 'Next Steps'}
          </h2>
          <div className={styles.nextStepsGrid}>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>🔐</div>
              <h3>{t('documentation:dataExportGuide.privacySettings') || 'Privacy & Security'}</h3>
              <p>{t('documentation:dataExportGuide.privacyDesc') || 'Learn to configure privacy settings for data exports and protect sensitive information.'}</p>
              <a href="/guides/privacy-settings" className={styles.nextStepLink}>
                {t('documentation:dataExportGuide.learnMore') || 'Learn More'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>👥</div>
              <h3>{t('documentation:dataExportGuide.groupManagement') || 'Advanced Group Management'}</h3>
              <p>{t('documentation:dataExportGuide.groupDesc') || 'Master complex group scenarios and learn to generate group-specific reports.'}</p>
              <a href="/guides/group-management" className={styles.nextStepLink}>
                {t('documentation:dataExportGuide.explore') || 'Explore'} →
              </a>
            </div>
            <div className={styles.nextStepCard}>
              <div className={styles.nextStepIcon}>🤝</div>
              <h3>{t('documentation:dataExportGuide.support') || 'Data Support'}</h3>
              <p>{t('documentation:dataExportGuide.supportDesc') || 'Get help with complex exports, data integration, or custom analysis needs.'}</p>
              <a href="/support" className={styles.nextStepLink}>
                {t('documentation:dataExportGuide.contactSupport') || 'Contact Support'} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}