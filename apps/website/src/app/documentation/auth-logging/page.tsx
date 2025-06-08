'use client';

import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';

export default function AuthLoggingDocs() {
  const { t } = useI18n();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{t('documentation:documentationPage.authLogging.title') || 'Authentication Logging & Monitoring'}</h1>
      </div>
      
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.overview.title') || 'Overview'}</h3>
        <p>{t('documentation:documentationPage.authLogging.overview.description') || 'CyberEco\'s authentication system includes comprehensive logging and monitoring capabilities to track authentication events, detect security issues, and analyze user behavior across the ecosystem.'}</p>
        
        <div className={styles.features}>
          <h4>{t('documentation:documentationPage.authLogging.features.title') || 'Key Features'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.authLogging.features.realtime') || 'Real-time event logging for all authentication activities'}</li>
            <li>{t('documentation:documentationPage.authLogging.features.structured') || 'Structured logging with consistent event types'}</li>
            <li>{t('documentation:documentationPage.authLogging.features.performance') || 'Performance metrics tracking'}</li>
            <li>{t('documentation:documentationPage.authLogging.features.error') || 'Comprehensive error tracking'}</li>
            <li>{t('documentation:documentationPage.authLogging.features.session') || 'Session management and tracking'}</li>
            <li>{t('documentation:documentationPage.authLogging.features.export') || 'Export capabilities for audit'}</li>
          </ul>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.events.title') || 'Event Types'}</h3>
        
        <div className={styles.eventCategory}>
          <h4>{t('documentation:documentationPage.authLogging.events.auth.title') || 'Authentication Events'}</h4>
          <table className={styles.eventTable}>
            <thead>
              <tr>
                <th>{t('documentation:documentationPage.authLogging.events.event') || 'Event'}</th>
                <th>{t('documentation:documentationPage.authLogging.events.description') || 'Description'}</th>
                <th>{t('documentation:documentationPage.authLogging.events.level') || 'Level'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>auth.login.attempt</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.auth.attempt') || 'User attempts to log in'}</td>
                <td><span className={styles.levelInfo}>INFO</span></td>
              </tr>
              <tr>
                <td><code>auth.login.success</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.auth.success') || 'Successful login'}</td>
                <td><span className={styles.levelInfo}>INFO</span></td>
              </tr>
              <tr>
                <td><code>auth.login.failure</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.auth.failure') || 'Failed login attempt'}</td>
                <td><span className={styles.levelWarn}>WARN</span></td>
              </tr>
              <tr>
                <td><code>auth.logout</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.auth.logout') || 'User logs out'}</td>
                <td><span className={styles.levelInfo}>INFO</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.eventCategory}>
          <h4>{t('documentation:documentationPage.authLogging.events.token.title') || 'Token Events'}</h4>
          <table className={styles.eventTable}>
            <thead>
              <tr>
                <th>{t('documentation:documentationPage.authLogging.events.event') || 'Event'}</th>
                <th>{t('documentation:documentationPage.authLogging.events.description') || 'Description'}</th>
                <th>{t('documentation:documentationPage.authLogging.events.level') || 'Level'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>auth.token.generated</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.token.generated') || 'New token created'}</td>
                <td><span className={styles.levelDebug}>DEBUG</span></td>
              </tr>
              <tr>
                <td><code>auth.token.verified</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.token.verified') || 'Token verified'}</td>
                <td><span className={styles.levelDebug}>DEBUG</span></td>
              </tr>
              <tr>
                <td><code>auth.token.expired</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.token.expired') || 'Token expired'}</td>
                <td><span className={styles.levelWarn}>WARN</span></td>
              </tr>
              <tr>
                <td><code>auth.token.refresh</code></td>
                <td>{t('documentation:documentationPage.authLogging.events.token.refresh') || 'Token refreshed'}</td>
                <td><span className={styles.levelInfo}>INFO</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.usage.title') || 'Usage Examples'}</h3>
        
        <div className={styles.example}>
          <h4>{t('documentation:documentationPage.authLogging.usage.login.title') || 'Logging Login Flow'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`import { authLogger } from '@cybereco/auth';

// Log login attempt
const loginStart = Date.now();
authLogger.logLoginAttempt(email, { 
  method: 'email',
  ip: clientIp 
});

try {
  // Perform authentication
  const user = await signInWithEmailAndPassword(
    auth, email, password
  );
  
  // Log success with duration
  const duration = Date.now() - loginStart;
  authLogger.logLoginSuccess(
    user.uid, 
    email, 
    duration
  );
  
  // Log token generation
  authLogger.logTokenGenerated(
    user.uid, 
    'access', 
    3600
  );
  
} catch (error) {
  // Log failure
  authLogger.logLoginFailure(
    email, 
    error.code, 
    error.message
  );
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.example}>
          <h4>{t('documentation:documentationPage.authLogging.usage.sso.title') || 'Logging SSO Navigation'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Log SSO redirect
authLogger.logSSORedirect(
  'hub', 
  'justsplit', 
  user.uid
);

// Generate auth token
const token = await generateAuthToken(user);
authLogger.logTokenGenerated(
  user.uid, 
  'sso', 
  30
);

// Log successful navigation
authLogger.logCrossAppNavigation(
  'hub', 
  'justsplit', 
  user.uid
);`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.metrics.title') || 'Metrics & Analytics'}</h3>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <h4>{t('documentation:documentationPage.authLogging.metrics.login.title') || 'Login Metrics'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.metrics.login.attempts') || 'Total login attempts'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.login.success') || 'Success rate'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.login.average') || 'Average login time'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.login.failures') || 'Failure reasons'}</li>
            </ul>
          </div>
          <div className={styles.metricCard}>
            <h4>{t('documentation:documentationPage.authLogging.metrics.token.title') || 'Token Metrics'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.metrics.token.active') || 'Active tokens'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.token.refresh') || 'Refresh count'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.token.expired') || 'Expired tokens'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.token.invalid') || 'Invalid attempts'}</li>
            </ul>
          </div>
          <div className={styles.metricCard}>
            <h4>{t('documentation:documentationPage.authLogging.metrics.sso.title') || 'SSO Metrics'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.metrics.sso.navigation') || 'Cross-app navigations'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.sso.apps') || 'Most used apps'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.sso.flow') || 'Flow completion rate'}</li>
              <li>{t('documentation:documentationPage.authLogging.metrics.sso.errors') || 'SSO errors'}</li>
            </ul>
          </div>
        </div>

        <div className={styles.codeBlock}>
          <h4>{t('documentation:documentationPage.authLogging.metrics.example') || 'Getting Metrics'}</h4>
          <pre>
            <code>{`// Get current metrics
const metrics = authLogger.getMetrics();

// Login success rate
const successRate = (
  metrics.loginSuccesses / metrics.loginAttempts * 100
).toFixed(1);

// Display metrics
displayMetric('Success Rate', \`\${successRate}%\`);
displayMetric('Average Login Time', \`\${metrics.averageLoginTime}ms\`);
displayMetric('Active Tokens', metrics.activeTokens);
displayMetric('Cross-app Navigations', metrics.crossAppNavigations);`}</code>
          </pre>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.dashboard.title') || 'Monitoring Dashboard'}</h3>
        <p>{t('documentation:documentationPage.authLogging.dashboard.description') || 'The Hub provides an authentication monitoring dashboard for administrators at /auth-logs.'}</p>
        
        <div className={styles.dashboardFeatures}>
          <h4>{t('documentation:documentationPage.authLogging.dashboard.features.title') || 'Dashboard Features'}</h4>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h4>{t('documentation:documentationPage.authLogging.dashboard.features.realtime.title') || 'Real-time Updates'}</h4>
              <p>{t('documentation:documentationPage.authLogging.dashboard.features.realtime.description') || 'Live metrics refresh every 10 seconds'}</p>
            </div>
            <div className={styles.feature}>
              <h4>{t('documentation:documentationPage.authLogging.dashboard.features.filtering.title') || 'Log Filtering'}</h4>
              <p>{t('documentation:documentationPage.authLogging.dashboard.features.filtering.description') || 'Filter by level, user, or event type'}</p>
            </div>
            <div className={styles.feature}>
              <h4>{t('documentation:documentationPage.authLogging.dashboard.features.export.title') || 'Export Logs'}</h4>
              <p>{t('documentation:documentationPage.authLogging.dashboard.features.export.description') || 'Download logs as JSON for analysis'}</p>
            </div>
            <div className={styles.feature}>
              <h4>{t('documentation:documentationPage.authLogging.dashboard.features.reports.title') || 'Generate Reports'}</h4>
              <p>{t('documentation:documentationPage.authLogging.dashboard.features.reports.description') || 'Create detailed authentication reports'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.querying.title') || 'Querying Logs'}</h3>
        
        <div className={styles.queryExample}>
          <h4>{t('documentation:documentationPage.authLogging.querying.recent.title') || 'Get Recent Logs'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Get last 50 logs
const recentLogs = authLogger.getRecentLogs(50);

// Get only error logs
const errorLogs = authLogger.getRecentLogs(
  20, 
  LogLevel.ERROR
);

// Get logs for specific user
const userLogs = authLogger.getLogsByUser(
  'user123', 
  50
);`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.queryExample}>
          <h4>{t('documentation:documentationPage.authLogging.querying.reports.title') || 'Generate Reports'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Generate human-readable report
const report = authLogger.generateReport();
displayReport(report);

// Export all logs as JSON
const logsJson = authLogger.exportLogs();
fs.writeFileSync('auth-logs.json', logsJson);`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.security.title') || 'Security Considerations'}</h3>
        
        <div className={styles.securityGrid}>
          <div className={styles.securityItem}>
            <h4>{t('documentation:documentationPage.authLogging.security.privacy.title') || 'Data Privacy'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.security.privacy.passwords') || 'Never log passwords or tokens'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.privacy.sanitize') || 'Sanitize user input'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.privacy.hash') || 'Hash sensitive identifiers'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h4>{t('documentation:documentationPage.authLogging.security.retention.title') || 'Log Retention'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.security.retention.memory') || '1000 entries in memory'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.retention.storage') || '100 entries in localStorage'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.retention.archive') || 'Archive for compliance'}</li>
            </ul>
          </div>
          <div className={styles.securityItem}>
            <h4>{t('documentation:documentationPage.authLogging.security.access.title') || 'Access Control'}</h4>
            <ul>
              <li>{t('documentation:documentationPage.authLogging.security.access.admin') || 'Admin-only dashboard'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.access.export') || 'Restricted exports'}</li>
              <li>{t('documentation:documentationPage.authLogging.security.access.monitor') || 'Monitor log access'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.integration.title') || 'External Integrations'}</h3>
        
        <div className={styles.integrationExample}>
          <h4>{t('documentation:documentationPage.authLogging.integration.sentry.title') || 'Sentry Integration'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Send errors to Sentry
if (process.env.NODE_ENV === 'production') {
  authLogger.on('error', (logEntry) => {
    Sentry.captureException(
      new Error(logEntry.errorMessage), 
      { extra: logEntry }
    );
  });
}`}</code>
            </pre>
          </div>
        </div>

        <div className={styles.integrationExample}>
          <h4>{t('documentation:documentationPage.authLogging.integration.cloudwatch.title') || 'CloudWatch Metrics'}</h4>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`// Send metrics to CloudWatch
setInterval(() => {
  const metrics = authLogger.getMetrics();
  cloudWatch.putMetricData({
    Namespace: 'CyberEco/Auth',
    MetricData: [{
      MetricName: 'LoginSuccessRate',
      Value: metrics.loginSuccesses / 
             metrics.loginAttempts * 100,
      Unit: 'Percent'
    }]
  });
}, 60000);`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.troubleshooting.title') || 'Troubleshooting'}</h3>
        
        <div className={styles.troubleshootingGrid}>
          <div className={styles.troubleItem}>
            <h4>{t('documentation:documentationPage.authLogging.troubleshooting.persist.title') || 'Logs Not Persisting'}</h4>
            <p>{t('documentation:documentationPage.authLogging.troubleshooting.persist.solution') || 'Check localStorage quota and permissions'}</p>
          </div>
          <div className={styles.troubleItem}>
            <h4>{t('documentation:documentationPage.authLogging.troubleshooting.session.title') || 'Missing Session IDs'}</h4>
            <p>{t('documentation:documentationPage.authLogging.troubleshooting.session.solution') || 'Ensure logger is initialized early in app lifecycle'}</p>
          </div>
          <div className={styles.troubleItem}>
            <h4>{t('documentation:documentationPage.authLogging.troubleshooting.performance.title') || 'Performance Impact'}</h4>
            <p>{t('documentation:documentationPage.authLogging.troubleshooting.performance.solution') || 'Reduce log verbosity in production'}</p>
          </div>
          <div className={styles.troubleItem}>
            <h4>{t('documentation:documentationPage.authLogging.troubleshooting.memory.title') || 'Memory Usage'}</h4>
            <p>{t('documentation:documentationPage.authLogging.troubleshooting.memory.solution') || 'Implement log rotation for long-running sessions'}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.authLogging.resources.title') || 'Related Resources'}</h3>
        <ul className={styles.resourcesList}>
          <li>
            <a href="/documentation/jwt-authentication">{t('documentation:documentationPage.authLogging.resources.jwt') || 'JWT Authentication'}</a>
          </li>
          <li>
            <a href="/documentation/sso-integration">{t('documentation:documentationPage.authLogging.resources.sso') || 'SSO Integration Guide'}</a>
          </li>
          <li>
            <a href="/documentation/api">{t('documentation:documentationPage.authLogging.resources.api') || 'API Reference'}</a>
          </li>
          <li>
            <a href="/documentation/security">{t('documentation:documentationPage.authLogging.resources.security') || 'Security Best Practices'}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}