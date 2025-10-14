'use client';

import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import type { DashboardMetric } from '../types';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  metric: DashboardMetric;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  showTrend?: boolean;
  className?: string;
}

export function MetricCard({
  metric,
  size = 'medium',
  variant = 'default',
  showTrend = false,
  className
}: MetricCardProps) {
  const formatValue = (value: string | number, format?: string) => {
    if (typeof value === 'string') return value;
    
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

  const getChangeIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <FaArrowUp className={styles.changeIcon} />;
      case 'down':
        return <FaArrowDown className={styles.changeIcon} />;
      case 'neutral':
        return <FaMinus className={styles.changeIcon} />;
    }
  };

  const cardClassName = [
    styles.metricCard,
    styles[size],
    styles[variant],
    metric.loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  if (metric.loading) {
    return (
      <div className={cardClassName}>
        <div className={styles.metricHeader}>
          <div className={styles.metricIcon}>
            {metric.icon}
          </div>
        </div>
        <div className={styles.metricLabel}>{metric.label}</div>
        <div className={`${styles.loadingValue} ${styles.loadingShimmer}`} />
        <div className={`${styles.loadingChange} ${styles.loadingShimmer}`} />
      </div>
    );
  }

  return (
    <div className={cardClassName}>
      <div className={styles.metricHeader}>
        {metric.icon && (
          <div className={styles.metricIcon} style={{ color: metric.color }}>
            {metric.icon}
          </div>
        )}
      </div>
      
      <div className={styles.metricLabel}>{metric.label}</div>
      
      <div className={`${styles.metricValue} ${styles[size]}`}>
        {formatValue(metric.value, metric.format)}
      </div>
      
      {metric.change && (
        <div className={`${styles.metricChange} ${styles[metric.change.direction]}`}>
          {getChangeIcon(metric.change.direction)}
          <span>{Math.abs(metric.change.value)}%</span>
          <span className={styles.changePeriod}>vs {metric.change.period}</span>
        </div>
      )}
      
      {showTrend && metric.trend && metric.trend.length > 0 && (
        <div className={styles.trendChart}>
          {/* Mini trend chart could be implemented here with a charting library */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, ${metric.color || 'var(--primary)'} 0%, transparent 100%)`,
            opacity: 0.1,
            borderRadius: '4px'
          }} />
        </div>
      )}
    </div>
  );
}

export default MetricCard;