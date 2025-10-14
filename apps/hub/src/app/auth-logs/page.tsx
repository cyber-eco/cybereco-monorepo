'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authLogger, AuthEventType, LogLevel, type AuthLogEntry, type AuthMetrics } from '@cybereco/auth';
import { useAuth } from '../../components/AuthContext';
import styles from './page.module.css';

export default function AuthLogsPage() {
  const { userProfile, isLoading } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<AuthLogEntry[]>([]);
  const [metrics, setMetrics] = useState<AuthMetrics | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'all'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!isLoading && (!userProfile || !userProfile.isAdmin)) {
      router.push('/dashboard');
    }
  }, [userProfile, isLoading, router]);

  // Fetch logs and metrics
  useEffect(() => {
    const fetchData = () => {
      const allLogs = selectedLevel === 'all' 
        ? authLogger.getRecentLogs(100)
        : authLogger.getRecentLogs(100, selectedLevel as LogLevel);
      setLogs(allLogs);
      setMetrics(authLogger.getMetrics());
    };

    fetchData();

    // Auto-refresh every 5 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchData, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedLevel, autoRefresh]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getEventTypeColor = (eventType: AuthEventType) => {
    if (eventType.includes('failure') || eventType.includes('error')) return 'var(--error)';
    if (eventType.includes('success')) return 'var(--success)';
    if (eventType.includes('attempt')) return 'var(--warning)';
    return 'var(--text-secondary)';
  };

  const downloadLogs = () => {
    const dataStr = authLogger.exportLogs();
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `auth-logs-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const generateReport = () => {
    const report = authLogger.generateReport();
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(report);
    const exportFileDefaultName = `auth-report-${new Date().toISOString()}.txt`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading || !userProfile?.isAdmin) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Authentication Logs</h1>
        <div className={styles.actions}>
          <button onClick={downloadLogs} className={styles.button}>
            Export Logs
          </button>
          <button onClick={generateReport} className={styles.button}>
            Generate Report
          </button>
          <button onClick={() => authLogger.clearLogs()} className={styles.buttonDanger}>
            Clear Logs
          </button>
        </div>
      </div>

      {metrics && (
        <div className={styles.metrics}>
          <h2>Metrics</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Login Attempts</div>
              <div className={styles.metricValue}>{metrics.loginAttempts}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Success Rate</div>
              <div className={styles.metricValue}>
                {metrics.loginAttempts > 0 
                  ? `${((metrics.loginSuccesses / metrics.loginAttempts) * 100).toFixed(1)}%`
                  : 'N/A'}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Avg Login Time</div>
              <div className={styles.metricValue}>
                {metrics.averageLoginTime > 0 
                  ? `${metrics.averageLoginTime.toFixed(0)}ms`
                  : 'N/A'}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Active Tokens</div>
              <div className={styles.metricValue}>{metrics.activeTokens}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Cross-App Navigations</div>
              <div className={styles.metricValue}>{metrics.crossAppNavigations}</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Error Rate</div>
              <div className={styles.metricValue}>{metrics.errorRate.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.logsSection}>
        <div className={styles.logsHeader}>
          <h2>Recent Logs</h2>
          <div className={styles.filters}>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value as LogLevel | 'all')}
              className={styles.select}
            >
              <option value="all">All Levels</option>
              <option value={LogLevel.DEBUG}>Debug</option>
              <option value={LogLevel.INFO}>Info</option>
              <option value={LogLevel.WARN}>Warning</option>
              <option value={LogLevel.ERROR}>Error</option>
            </select>
            <label className={styles.checkbox}>
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh
            </label>
          </div>
        </div>

        <div className={styles.logsTable}>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Event</th>
                <th>User</th>
                <th>Message</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className={styles[log.level]}>
                  <td>{formatTimestamp(log.timestamp)}</td>
                  <td>
                    <span className={styles.levelBadge}>
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ color: getEventTypeColor(log.eventType) }}>
                    {log.eventType}
                  </td>
                  <td>{log.email || log.userId || '-'}</td>
                  <td>{log.message}</td>
                  <td>
                    {log.metadata && (
                      <details>
                        <summary>View</summary>
                        <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}