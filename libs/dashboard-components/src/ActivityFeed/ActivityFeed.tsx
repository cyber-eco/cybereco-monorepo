'use client';

import React from 'react';
import { FaHistory, FaSync, FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaClock } from 'react-icons/fa';
import type { ActivityItem } from '../types';
import styles from './ActivityFeed.module.css';

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  loading?: boolean;
  refreshable?: boolean;
  onRefresh?: () => void;
  maxItems?: number;
  showTimestamp?: boolean;
  className?: string;
}

export function ActivityFeed({
  activities,
  title = 'Recent Activity',
  loading = false,
  refreshable = false,
  onRefresh,
  maxItems = 10,
  showTimestamp = true,
  className
}: ActivityFeedProps) {
  const getActivityIcon = (item: ActivityItem) => {
    if (item.icon) return item.icon;
    
    switch (item.type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaTimesCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date.toLocaleDateString();
  };

  const displayedActivities = activities.slice(0, maxItems);

  const renderLoadingState = () => (
    <div className={styles.loadingState}>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={styles.loadingItem}>
          <div className={styles.loadingIcon} />
          <div className={styles.loadingContent}>
            <div className={styles.loadingTitle} />
            <div className={styles.loadingDescription} />
            <div className={styles.loadingTimestamp} />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <FaClock />
      </div>
      <h3 className={styles.emptyTitle}>No recent activity</h3>
      <p className={styles.emptyDescription}>
        Activity from your apps will appear here as it happens.
      </p>
    </div>
  );

  const renderActivityItem = (item: ActivityItem) => (
    <div key={item.id} className={styles.activityItem}>
      <div className={`${styles.activityIcon} ${styles[item.type]}`}>
        {getActivityIcon(item)}
      </div>
      
      <div className={styles.activityContent}>
        <h4 className={styles.activityTitle}>{item.title}</h4>
        {item.description && (
          <p className={styles.activityDescription}>{item.description}</p>
        )}
        
        <div className={styles.activityMeta}>
          {showTimestamp && (
            <span className={styles.activityTimestamp}>
              {formatTimestamp(item.timestamp)}
            </span>
          )}
          
          {item.metadata?.['badge'] && (
            <span className={`${styles.activityBadge} ${styles[item.type]}`}>
              {item.metadata['badge']}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${styles.activityFeed} ${className || ''}`}>
      <div className={styles.feedHeader}>
        <h3 className={styles.feedTitle}>
          <FaHistory className={styles.feedIcon} />
          {title}
        </h3>
        
        {refreshable && (
          <div className={styles.feedActions}>
            <button
              className={styles.refreshButton}
              onClick={onRefresh}
              disabled={loading}
              title="Refresh activity"
            >
              <FaSync />
            </button>
          </div>
        )}
      </div>
      
      <div className={styles.feedList}>
        {loading ? (
          renderLoadingState()
        ) : displayedActivities.length === 0 ? (
          renderEmptyState()
        ) : (
          displayedActivities.map(renderActivityItem)
        )}
      </div>
    </div>
  );
}

export default ActivityFeed;