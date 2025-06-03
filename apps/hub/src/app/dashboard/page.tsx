'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@cybereco/ui-components';
import { useHubAuth } from '../../hooks/useHubAuth';
import { DashboardDataService, DashboardMetric, ActivityItem } from '../../services/dashboardService';
import { AppGrid } from '../../components/AppGrid';
import { 
  FaHome, 
  FaChartLine, 
  FaRocket, 
  FaUsers, 
  FaDollarSign,
  FaClock,
  FaArrowUp,
  FaSync,
  FaHistory,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';
import styles from './dashboard.module.css';

// Simple inline metric card component
function SimpleMetricCard({ metric, loading }: { metric: any, loading: boolean }) {
  if (loading) {
    return (
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>
          <div className={styles.metricIcon}>{metric.icon}</div>
        </div>
        <div className={`${styles.skeleton}`} style={{ height: '1rem', width: '60%', marginBottom: '0.5rem' }} />
        <div className={`${styles.skeleton}`} style={{ height: '2rem', width: '80%' }} />
      </div>
    );
  }

  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toString();
    }
  };

  return (
    <div className={styles.metricCard}>
      <div className={styles.metricHeader}>
        <div className={styles.metricIcon}>{metric.icon}</div>
      </div>
      <div className={styles.metricLabel}>{metric.label}</div>
      <div className={styles.metricValue}>{formatValue(metric.value, metric.format)}</div>
      {metric.change && (
        <div className={`${styles.metricChange} ${metric.change.direction === 'up' ? styles.positive : styles.negative}`}>
          {metric.change.direction === 'up' ? <FaArrowUp /> : <FaArrowUp style={{ transform: 'rotate(180deg)' }} />}
          <span>{Math.abs(metric.change.value)}%</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '400', marginLeft: '0.25rem' }}>
            vs {metric.change.period}
          </span>
        </div>
      )}
    </div>
  );
}

// Simple activity feed component
function SimpleActivityFeed({ activities, loading, onRefresh }: { activities: any[], loading: boolean, onRefresh: () => void }) {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const refreshButtonStyle = {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '0.5rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    maxHeight: '400px',
    overflowY: 'auto' as const
  };

  const itemStyle = {
    display: 'flex',
    gap: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    background: 'var(--background)',
    border: '1px solid var(--border)',
    transition: 'all 0.2s ease'
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    flexShrink: 0,
    fontSize: '0.9rem'
  };

  const getIconStyle = (type: string) => ({
    ...iconStyle,
    background: type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    color: type === 'success' ? '#22c55e' : '#3b82f6'
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.activitySection}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>
          <FaHistory style={{ color: 'var(--primary)' }} />
          Recent Activity
        </h3>
        <button style={refreshButtonStyle} onClick={onRefresh} disabled={loading}>
          <FaSync />
        </button>
      </div>
      
      <div style={listStyle}>
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} style={itemStyle}>
              <div style={{ ...iconStyle, background: '#f0f0f0' }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: '1rem', background: '#f0f0f0', borderRadius: '4px', marginBottom: '0.5rem' }} />
                <div style={{ height: '0.8rem', background: '#f0f0f0', borderRadius: '4px', width: '60%' }} />
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            <FaClock style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No recent activity</h3>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Start using JustSplit to track expenses and see activity here. 
              <br />
              <a href="/apps" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Explore apps →
              </a>
            </p>
          </div>
        ) : (
          activities.slice(0, 8).map((item) => (
            <div key={item.id} style={itemStyle}>
              <div style={getIconStyle(item.type)}>
                {item.icon || (item.type === 'success' ? <FaCheckCircle /> : <FaInfoCircle />)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                  {item.title}
                </h4>
                {item.description && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>
                    {item.description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {formatTimestamp(item.timestamp)}
                  </span>
                  {item.metadata?.['badge'] && (
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '12px',
                      fontWeight: '500',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6'
                    }}>
                      {item.metadata['badge']}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { userProfile: user, isLoading: loading } = useHubAuth();
  const { t } = useLanguage();
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Real dashboard data from APIs
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [dataService] = useState(() => DashboardDataService.getInstance());

  useEffect(() => {
    if (user) {
      loadDashboardData();
    } else {
      // Set default empty state when no user
      setDashboardLoading(false);
      setMetrics([]);
      setActivities([]);
    }
  }, [user, dataService]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadDashboardData = async () => {
    if (!user?.id) return;
    
    setDashboardLoading(true);
    console.log('Loading dashboard data for user:', user.id);

    try {
      // For now, show mock data to avoid cross-app Firebase issues
      // TODO: Implement proper cross-app data aggregation
      const justSplitData = {
        expenses: [],
        settlements: [],
        groups: [],
        events: [],
        users: []
      };
      console.log('Using simplified dashboard data');

      // Get user names for better activity descriptions
      const allUserIds = [
        ...new Set([
          ...justSplitData.expenses.flatMap(e => [e.paidBy, ...e.participants]),
          ...justSplitData.settlements.flatMap(s => [s.fromUser, s.toUser]),
          ...justSplitData.groups.flatMap(g => g.members),
          ...justSplitData.events.flatMap(e => e.members)
        ])
      ];
      const userNames = await dataService.getUserNames(allUserIds);
      console.log('User names loaded:', Object.keys(userNames).length);

      // Calculate metrics from real data
      const calculatedMetrics = dataService.calculateMetrics(justSplitData);
      
      // Add icons to metrics
      const metricsWithIcons = calculatedMetrics.map(metric => ({
        ...metric,
        icon: metric.id === 'total-apps' ? <FaRocket /> :
              metric.id === 'total-expenses' ? <FaDollarSign /> :
              metric.id === 'active-groups' ? <FaUsers /> :
              metric.id === 'recent-activity' ? <FaChartLine /> :
              <FaChartLine />
      }));

      // Generate activity feed from real data
      const activityFeed = dataService.generateActivityFeed(justSplitData, userNames);
      
      // Add icons to activities
      const activitiesWithIcons = activityFeed.map(activity => ({
        ...activity,
        icon: activity.id.startsWith('expense-') ? <FaDollarSign /> :
              activity.id.startsWith('settlement-') ? <FaArrowUp /> :
              activity.id.startsWith('group-') ? <FaUsers /> :
              activity.id.startsWith('event-') ? <FaRocket /> :
              <FaInfoCircle />
      }));

      // Add welcome message
      activitiesWithIcons.unshift({
        id: 'welcome-hub',
        title: 'Welcome to CyberEco Hub!',
        description: 'Your digital ecosystem awaits',
        timestamp: new Date().toISOString(),
        type: 'success',
        icon: <FaRocket />,
        metadata: { badge: 'Hub' }
      });

      setMetrics(metricsWithIcons);
      setActivities(activitiesWithIcons);
      setLastRefresh(new Date());
      
      console.log('Dashboard data updated:', {
        metrics: metricsWithIcons.length,
        activities: activitiesWithIcons.length
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      
      // Fallback to basic metrics on error
      setMetrics([
          {
            id: 'total-apps',
            label: 'Active Applications',
            value: 1,
            change: { value: 0, direction: 'neutral', period: 'last month' },
            icon: <FaRocket />,
            format: 'number',
            color: '#006241'
          },
          {
            id: 'total-expenses',
            label: 'Total Expenses (This Month)',
            value: 0,
            change: { value: 0, direction: 'neutral', period: 'last month' },
            icon: <FaDollarSign />,
            format: 'currency',
            color: '#6BBF59'
          },
          {
            id: 'active-groups',
            label: 'Active Groups',
            value: 0,
            change: { value: 0, direction: 'neutral', period: 'this month' },
            icon: <FaUsers />,
            format: 'number',
            color: '#28a745'
          },
          {
            id: 'recent-activity',
            label: 'Actions This Week',
            value: 0,
            change: { value: 0, direction: 'neutral', period: 'last week' },
            icon: <FaChartLine />,
            format: 'number',
            color: '#f39c12'
          }
        ]);
        
        setActivities([
          {
            id: 'welcome-hub',
            title: 'Welcome to CyberEco Hub!',
            description: 'Start by exploring JustSplit for expense management',
            timestamp: new Date().toISOString(),
            type: 'info',
            icon: <FaRocket />,
            metadata: { badge: 'Hub' }
          }
        ]);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  // Show sign-in message immediately if auth is loaded and no user
  if (!loading && !user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaRocket className={styles.titleIcon} />
          <h2>{t('auth.signInError') || 'Please sign in to access your dashboard'}</h2>
          <Link href="/auth/signin" className={styles.signInButton}>
            {t('auth.signIn') || 'Sign In'}
          </Link>
        </div>
      </div>
    );
  }

  // Show loading only while auth is loading
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>{t('hub.loading') || 'Loading your dashboard...'}</p>
        </div>
      </div>
    );
  }

  // If we reach here but no user, show sign-in (edge case)
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaRocket className={styles.titleIcon} />
          <h2>{t('auth.signInError') || 'Please sign in to access your dashboard'}</h2>
          <Link href="/auth/signin" className={styles.signInButton}>
            {t('auth.signIn') || 'Sign In'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaHome className={styles.titleIcon} />
            {t('hub.welcomeBack', { name: user.name }) || `Welcome back, ${user.name}!`}
          </h1>
          <p className={styles.subtitle}>
            {t('hub.ecosystem.subtitle') || 'Your digital ecosystem overview'}
          </p>
          <div className={styles.dashboardMeta}>
            <span className={styles.lastUpdate}>
              <FaClock /> Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <button 
              className={styles.refreshButton}
              onClick={handleRefresh}
              disabled={dashboardLoading}
            >
              <FaSync className={dashboardLoading ? styles.spinning : ''} />
              Refresh
            </button>
          </div>
        </header>

        {/* Dashboard Metrics */}
        <section className={styles.metricsSection}>
          <h2 className={styles.sectionTitle}>
            <FaChartLine className={styles.titleIcon} />
            Overview
          </h2>
          <div className={styles.metricsGrid}>
            {metrics.map((metric) => (
              <SimpleMetricCard
                key={metric.id}
                metric={metric}
                loading={dashboardLoading}
              />
            ))}
          </div>
        </section>

        {/* Two Column Layout for Activity and Apps */}
        <div className={styles.dashboardColumns}>
          {/* Recent Activity */}
          <section className={styles.activitySection}>
            <SimpleActivityFeed
              activities={activities}
              loading={dashboardLoading}
              onRefresh={handleRefresh}
            />
          </section>

          {/* Applications */}
          <section className={styles.appsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <FaChartLine className={styles.titleIcon} />
                {t('hub.apps.title') || 'Your Applications'}
              </h2>
              <p className={styles.sectionDescription}>
                {t('hub.apps.description') || 'Quick access to your apps'}
              </p>
            </div>
            <AppGrid />
          </section>
        </div>
      </div>
    </div>
  );
}