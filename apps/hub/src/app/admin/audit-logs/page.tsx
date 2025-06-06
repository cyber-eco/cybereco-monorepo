'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@cybereco/auth';
import { useRouter } from 'next/navigation';
import { 
  authLogger, 
  AuthEventType,
  LogLevel as AuthLogLevel,
  type AuthLogEntry,
  type DataAccessLog
} from '@cybereco/auth';
import { 
  Card, 
  Alert,
  LoadingSpinner,
  Button 
} from '@cybereco/ui-components';
import { 
  FaSearch, 
  FaFilter, 
  FaDownload,
  FaSync,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { format } from 'date-fns';
import styles from './page.module.css';

type LogType = 'auth' | 'privacy' | 'security' | 'all';
type LogLevel = 'all' | 'info' | 'warn' | 'error';

interface AdminFilters {
  logType: LogType;
  logLevel: LogLevel;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  eventType?: string;
  searchQuery?: string;
}

export default function AuditLogsPage() {
  const { currentUser: user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<(AuthLogEntry | DataAccessLog)[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<(AuthLogEntry | DataAccessLog)[]>([]);
  const [filters, setFilters] = useState<AdminFilters>({
    logType: 'all',
    logLevel: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadAuditLogs();
    }
  }, [isAdmin, filters.logType]);

  useEffect(() => {
    applyFilters();
  }, [logs, filters]);

  const checkAdminAccess = async () => {
    if (!user) {
      router.push('/auth/signin?returnUrl=/admin/audit-logs');
      return;
    }

    // Check if user has admin role
    // In a real app, this would check against Firebase custom claims or a roles collection
    const adminEmails = ['admin@cybere.co', 'demo@cybere.co']; // For demo purposes
    const hasAdminAccess = adminEmails.includes(user.email || '');

    if (!hasAdminAccess) {
      router.push('/dashboard');
      return;
    }

    setIsAdmin(true);
  };

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from Firestore
      // For now, we'll generate sample data
      const sampleLogs: AuthLogEntry[] = [
        {
          timestamp: new Date().toISOString(),
          level: AuthLogLevel.INFO,
          eventType: AuthEventType.LOGIN_SUCCESS,
          message: 'User successfully logged in',
          userId: 'user123',
          email: 'user@example.com',
          metadata: { ip: '192.168.1.1', userAgent: 'Chrome/120' },
          appId: 'hub',
          sessionId: 'session123',
          duration: 245
        },
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          level: AuthLogLevel.WARN,
          eventType: AuthEventType.LOGIN_FAILURE,
          message: 'Failed login attempt - Invalid password',
          userId: undefined,
          email: 'unknown@example.com',
          metadata: { reason: 'Invalid password', attempts: 3 },
          appId: 'hub',
          errorCode: 'auth/wrong-password',
          errorMessage: 'Invalid password'
        },
        {
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          level: AuthLogLevel.ERROR,
          eventType: AuthEventType.RATE_LIMIT,
          message: 'Rate limit exceeded',
          userId: undefined,
          email: 'attacker@example.com',
          metadata: { ip: '10.0.0.1', endpoint: '/api/auth/signin' },
          appId: 'hub',
          errorCode: 'rate-limit',
          errorMessage: 'Too many requests'
        },
        {
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          level: AuthLogLevel.INFO,
          eventType: AuthEventType.PRIVACY_SETTINGS_UPDATED,
          message: 'Privacy settings updated',
          userId: 'user456',
          email: 'privacy@example.com',
          metadata: { changes: ['activityVisibility', 'dataSharing'] },
          appId: 'hub'
        },
        {
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          level: AuthLogLevel.INFO,
          message: 'User session started',
          eventType: AuthEventType.DATA_ACCESS,
          userId: 'user789',
          email: 'viewer@example.com',
          metadata: { 
            targetUserId: 'user123', 
            dataType: 'expenses', 
            accessLevel: 'granted' 
          },
          appId: 'justsplit'
        }
      ];

      setLogs(sampleLogs);
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Filter by log level
    if (filters.logLevel !== 'all') {
      filtered = filtered.filter(log => 
        'level' in log && log.level === filters.logLevel
      );
    }

    // Filter by user ID
    if (filters.userId) {
      filtered = filtered.filter(log => {
        if ('userId' in log) {
          return log.userId?.toLowerCase().includes(filters.userId!.toLowerCase());
        } else if ('viewerId' in log) {
          return log.viewerId?.toLowerCase().includes(filters.userId!.toLowerCase()) ||
                 log.targetUserId?.toLowerCase().includes(filters.userId!.toLowerCase());
        }
        return false;
      });
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(log => {
        const logDate = typeof log.timestamp === 'string' 
          ? new Date(log.timestamp) 
          : log.timestamp.toDate();
        return logDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => {
        const logDate = typeof log.timestamp === 'string' 
          ? new Date(log.timestamp) 
          : log.timestamp.toDate();
        return logDate <= toDate;
      });
    }

    // Filter by event type
    if (filters.eventType && filters.eventType !== 'all') {
      filtered = filtered.filter(log => 
        'eventType' in log && log.eventType === filters.eventType
      );
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(log => {
        const searchableText = JSON.stringify(log).toLowerCase();
        return searchableText.includes(query);
      });
    }

    setFilteredLogs(filtered);
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `audit-logs-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('SUCCESS')) return <FaCheckCircle className={styles.successIcon} />;
    if (eventType.includes('FAILURE') || eventType.includes('ERROR')) return <FaTimesCircle className={styles.errorIcon} />;
    if (eventType.includes('PRIVACY') || eventType.includes('SECURITY')) return <FaShieldAlt className={styles.securityIcon} />;
    return <FaExclamationTriangle className={styles.warningIcon} />;
  };

  const getLogLevelClass = (level: string) => {
    switch (level) {
      case 'error': return styles.errorLevel;
      case 'warn': return styles.warnLevel;
      case 'info': return styles.infoLevel;
      default: return styles.debugLevel;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <Alert type="error">Access denied. Admin privileges required.</Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FaShieldAlt /> Audit Logs
        </h1>
        <p>Monitor system activity and security events</p>
      </div>

      <Card className={styles.controlsCard}>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search logs..."
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                searchQuery: e.target.value 
              }))}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.actionButtons}>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={styles.filterButton}
            >
              <FaFilter /> Filters
            </Button>

            <Button
              variant="secondary"
              onClick={loadAuditLogs}
              className={styles.refreshButton}
            >
              <FaSync /> Refresh
            </Button>

            <Button
              variant="primary"
              onClick={exportLogs}
              disabled={filteredLogs.length === 0}
              className={styles.exportButton}
            >
              <FaDownload /> Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label>Log Level</label>
              <select
                value={filters.logLevel}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  logLevel: e.target.value as LogLevel 
                }))}
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>User ID</label>
              <input
                type="text"
                placeholder="Filter by user ID"
                value={filters.userId || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  userId: e.target.value 
                }))}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Date From</label>
              <input
                type="datetime-local"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateFrom: e.target.value 
                }))}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Date To</label>
              <input
                type="datetime-local"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateTo: e.target.value 
                }))}
              />
            </div>

            <Button
              variant="secondary"
              onClick={() => setFilters({ logType: 'all', logLevel: 'all' })}
              className={styles.clearButton}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      <div className={styles.logsContainer}>
        {filteredLogs.length === 0 ? (
          <Card className={styles.emptyState}>
            <p>No logs found matching your criteria</p>
          </Card>
        ) : (
          filteredLogs.map((log, index) => (
            <Card key={index} className={styles.logCard}>
              <div className={styles.logHeader}>
                <div className={styles.logMeta}>
                  {getEventIcon('eventType' in log ? log.eventType : 'DATA_ACCESS')}
                  <span className={getLogLevelClass('level' in log ? log.level : 'info')}>
                    {'level' in log ? log.level.toUpperCase() : 'INFO'}
                  </span>
                  <span className={styles.timestamp}>
                    {format(
                      typeof log.timestamp === 'string' 
                        ? new Date(log.timestamp) 
                        : log.timestamp.toDate(), 
                      'MMM dd, yyyy HH:mm:ss'
                    )}
                  </span>
                </div>
                <div className={styles.logIdentity}>
                  {'userId' in log && log.userId && <span className={styles.userId}>User: {log.userId}</span>}
                  {'email' in log && log.email && <span className={styles.email}>{log.email}</span>}
                </div>
              </div>

              <div className={styles.logBody}>
                <div className={styles.eventType}>
                  {'eventType' in log ? log.eventType : 'DATA_ACCESS'}
                </div>

                {'metadata' in log && log.metadata && (
                  <div className={styles.metadata}>
                    <strong>Metadata:</strong>
                    <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                  </div>
                )}

                {'errorCode' in log && log.errorCode && (
                  <div className={styles.error}>
                    <strong>Error:</strong>
                    <div>Code: {log.errorCode}</div>
                    {'errorMessage' in log && log.errorMessage && (
                      <div>Message: {log.errorMessage}</div>
                    )}
                  </div>
                )}

                <div className={styles.logFooter}>
                  {'appId' in log && log.appId && (
                    <span className={styles.appId}>App: {log.appId}</span>
                  )}
                  {'sessionId' in log && log.sessionId && (
                    <span className={styles.sessionId}>Session: {log.sessionId}</span>
                  )}
                  {'duration' in log && log.duration && (
                    <span className={styles.duration}>Duration: {log.duration}ms</span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className={styles.summary}>
        Showing {filteredLogs.length} of {logs.length} logs
      </div>
    </div>
  );
}