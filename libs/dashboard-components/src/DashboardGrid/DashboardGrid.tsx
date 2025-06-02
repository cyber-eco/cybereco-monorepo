'use client';

import React from 'react';
import type { DashboardWidget, DashboardConfig } from '../types';
import styles from './DashboardGrid.module.css';

interface DashboardGridProps {
  widgets: DashboardWidget[];
  config?: DashboardConfig;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function DashboardGrid({
  widgets,
  config = {
    layout: 'grid',
    columns: 3,
    gap: 1.5
  },
  loading = false,
  className,
  children
}: DashboardGridProps) {
  const getGridClassName = () => {
    const baseClass = config.layout === 'masonry' 
      ? styles.dashboardMasonry 
      : config.layout === 'flex'
      ? styles.dashboardFlex
      : styles.dashboardGrid;
    
    const columnClass = config.layout === 'grid' 
      ? styles[`columns${config.columns}`] 
      : '';
    
    const gapClass = config.gap === 0.75 
      ? styles.gapSmall
      : config.gap === 2
      ? styles.gapLarge
      : styles.gapMedium;
    
    const loadingClass = loading ? styles.loading : '';
    
    return [baseClass, columnClass, gapClass, loadingClass, className]
      .filter(Boolean)
      .join(' ');
  };

  const getItemClassName = (widget: DashboardWidget) => {
    return [
      styles.gridItem,
      styles[widget.size || 'medium'],
      widget.loading ? styles.loadingOverlay : ''
    ].filter(Boolean).join(' ');
  };

  const gridStyle = config.layout === 'masonry' 
    ? { '--columns': config.columns } as React.CSSProperties
    : config.responsive
    ? {
        '--columns-mobile': config.responsive.mobile,
        '--columns-tablet': config.responsive.tablet,
        '--columns-desktop': config.responsive.desktop
      } as React.CSSProperties
    : {};

  return (
    <div 
      className={getGridClassName()}
      style={gridStyle}
    >
      {children ? children : widgets.map((widget) => (
        <div
          key={widget.id}
          className={getItemClassName(widget)}
          data-widget-type={widget.type}
          data-widget-size={widget.size}
        >
          {/* Widget content will be rendered by parent component */}
          {widget.loading && (
            <div className={styles.loadingOverlay}>
              <div>Loading {widget.title}...</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DashboardGrid;