'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHubAuth } from '../../../hooks/useHubAuth';
import { authLogger, AuthEventType } from '@cybereco/auth';
import { 
  FaHistory,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaDownload,
  FaChartBar,
  FaGlobeAmericas,
  FaClock
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import styles from './page.module.css';

interface SecurityEvent {
  id: string;
  type: AuthEventType;
  timestamp: Date;
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  success?: boolean;
  details?: any;
}

interface EventStats {
  date: string;
  successful: number;
  failed: number;
  total: number;
}

interface EventTypeStats {
  name: string;
  value: number;
  color: string;
}

export default function SecurityActivityPage() {
  const { userProfile: user, isLoading } = useHubAuth();
  const router = useRouter();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [eventFilter, setEventFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [dailyStats, setDailyStats] = useState<EventStats[]>([]);
  const [eventTypeStats, setEventTypeStats] = useState<EventTypeStats[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchSecurityEvents();
    }
  }, [user, timeRange]);

  useEffect(() => {
    filterEvents();
  }, [events, eventFilter]);

  const fetchSecurityEvents = async () => {
    if (!user) return;
    
    setIsLoadingEvents(true);
    try {
      // In production, this would fetch from Firestore
      // For now, generate sample data
      const sampleEvents = generateSampleEvents(user.id, user.email || '', timeRange);
      setEvents(sampleEvents);
      
      // Calculate statistics
      const stats = calculateDailyStats(sampleEvents);
      setDailyStats(stats);
      
      const typeStats = calculateEventTypeStats(sampleEvents);
      setEventTypeStats(typeStats);
    } catch (error) {
      console.error('Error fetching security events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const generateSampleEvents = (userId: string, email: string, range: string): SecurityEvent[] => {
    const events: SecurityEvent[] = [];
    const days = range === '24h' ? 1 : range === '7d' ? 7 : 30;
    const now = new Date();
    
    // Generate random events
    for (let i = 0; i < days * 10; i++) {
      const timestamp = new Date(now.getTime() - Math.random() * days * 24 * 60 * 60 * 1000);
      const types = [
        AuthEventType.LOGIN_SUCCESS,
        AuthEventType.LOGIN_FAILURE,
        AuthEventType.LOGOUT,
        AuthEventType.TOKEN_REFRESH,
        AuthEventType.PERMISSION_DENIED,
        AuthEventType.SESSION_CREATE
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      const success = !type.includes('FAILURE') && !type.includes('DENIED');
      
      events.push({
        id: `event-${i}`,
        type,
        timestamp,
        userId,
        email,
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        success,
        details: {}
      });
    }
    
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const calculateDailyStats = (events: SecurityEvent[]): EventStats[] => {
    const stats: { [key: string]: EventStats } = {};
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    
    // Initialize all days
    for (let i = 0; i < days; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      stats[date] = {
        date: format(subDays(new Date(), i), 'MMM dd'),
        successful: 0,
        failed: 0,
        total: 0
      };
    }
    
    // Count events per day
    events.forEach(event => {
      const date = format(event.timestamp, 'yyyy-MM-dd');
      if (stats[date]) {
        stats[date].total++;
        if (event.success) {
          stats[date].successful++;
        } else {
          stats[date].failed++;
        }
      }
    });
    
    return Object.values(stats).reverse();
  };

  const calculateEventTypeStats = (events: SecurityEvent[]): EventTypeStats[] => {
    const typeCounts: { [key: string]: number } = {};
    
    events.forEach(event => {
      typeCounts[event.type] = (typeCounts[event.type] || 0) + 1;
    });
    
    const colors: Record<string, string> = {
      [AuthEventType.LOGIN_SUCCESS]: '#10b981',
      [AuthEventType.LOGIN_FAILURE]: '#ef4444',
      [AuthEventType.LOGOUT]: '#6b7280',
      [AuthEventType.TOKEN_REFRESH]: '#3b82f6',
      [AuthEventType.SESSION_CREATE]: '#22c55e',
      [AuthEventType.PERMISSION_DENIED]: '#f59e0b'
    };
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      name: formatEventType(type),
      value: count,
      color: colors[type] || '#9ca3af'
    }));
  };

  const filterEvents = () => {
    let filtered = [...events];
    
    if (eventFilter === 'success') {
      filtered = filtered.filter(e => e.success === true);
    } else if (eventFilter === 'failed') {
      filtered = filtered.filter(e => e.success === false);
    }
    
    setFilteredEvents(filtered);
  };

  const formatEventType = (type: string): string => {
    return type.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getEventIcon = (type: AuthEventType, success?: boolean) => {
    if (success === false || type.includes('FAILURE') || type.includes('DENIED')) {
      return <FaTimesCircle className={styles.failureIcon} />;
    }
    return <FaCheckCircle className={styles.successIcon} />;
  };

  const exportEvents = () => {
    const csv = [
      ['Timestamp', 'Event Type', 'Status', 'IP Address', 'User Agent'].join(','),
      ...filteredEvents.map(event => [
        event.timestamp.toISOString(),
        event.type,
        event.success ? 'Success' : 'Failed',
        event.ip || '',
        event.userAgent || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-activity-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaHistory className={styles.titleIcon} />
            Security Activity
          </h1>
          <p className={styles.subtitle}>
            Monitor authentication events and security-related activities
          </p>
        </header>

        {/* Dashboard Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaShieldAlt />
            </div>
            <div className={styles.statContent}>
              <h3>Total Events</h3>
              <p className={styles.statValue}>{events.length}</p>
              <span className={styles.statLabel}>in the last {timeRange}</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: 'var(--success)' }}>
              <FaCheckCircle />
            </div>
            <div className={styles.statContent}>
              <h3>Successful</h3>
              <p className={styles.statValue}>
                {events.filter(e => e.success).length}
              </p>
              <span className={styles.statLabel}>
                {((events.filter(e => e.success).length / events.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: 'var(--error)' }}>
              <FaTimesCircle />
            </div>
            <div className={styles.statContent}>
              <h3>Failed</h3>
              <p className={styles.statValue}>
                {events.filter(e => !e.success).length}
              </p>
              <span className={styles.statLabel}>
                {((events.filter(e => !e.success).length / events.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaGlobeAmericas />
            </div>
            <div className={styles.statContent}>
              <h3>Unique IPs</h3>
              <p className={styles.statValue}>
                {new Set(events.map(e => e.ip)).size}
              </p>
              <span className={styles.statLabel}>different locations</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className={styles.chartsSection}>
          <div className={styles.chartCard}>
            <h3>Activity Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="successful" 
                  stroke="var(--success)" 
                  strokeWidth={2}
                  name="Successful"
                />
                <Line 
                  type="monotone" 
                  dataKey="failed" 
                  stroke="var(--error)" 
                  strokeWidth={2}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className={styles.chartCard}>
            <h3>Event Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {eventTypeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className={styles.filterBar}>
          <div className={styles.filters}>
            <select 
              className={styles.timeFilter}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            
            <div className={styles.eventFilters}>
              <button
                className={`${styles.filterButton} ${eventFilter === 'all' ? styles.active : ''}`}
                onClick={() => setEventFilter('all')}
              >
                All Events
              </button>
              <button
                className={`${styles.filterButton} ${eventFilter === 'success' ? styles.active : ''}`}
                onClick={() => setEventFilter('success')}
              >
                <FaCheckCircle /> Successful
              </button>
              <button
                className={`${styles.filterButton} ${eventFilter === 'failed' ? styles.active : ''}`}
                onClick={() => setEventFilter('failed')}
              >
                <FaTimesCircle /> Failed
              </button>
            </div>
          </div>
          
          <button className={styles.exportButton} onClick={exportEvents}>
            <FaDownload /> Export CSV
          </button>
        </div>

        {/* Events List */}
        <div className={styles.eventsList}>
          <h3>Recent Events</h3>
          {isLoadingEvents ? (
            <div className={styles.loading}>Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className={styles.emptyState}>No events found</div>
          ) : (
            <div className={styles.eventsTable}>
              {filteredEvents.slice(0, 50).map((event) => (
                <div key={event.id} className={styles.eventRow}>
                  <div className={styles.eventIcon}>
                    {getEventIcon(event.type, event.success)}
                  </div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventType}>
                      {formatEventType(event.type)}
                    </div>
                    <div className={styles.eventMeta}>
                      <span>
                        <FaClock /> {format(event.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                      </span>
                      <span>
                        <FaGlobeAmericas /> {event.ip}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}