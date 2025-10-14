'use client';

import { useEffect, useState, lazy } from 'react';
import React from 'react';

/**
 * Performance monitoring utilities
 */

export interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: ((metric: PerformanceMetric) => void)[] = [];

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start measuring a performance metric
   */
  start(name: string, metadata?: Record<string, any>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata
    });
  }

  /**
   * End measuring a performance metric
   */
  end(name: string): PerformanceMetric | null {
    const metric = this.metrics.get(name);
    
    if (!metric) {
      console.warn(`Performance metric '${name}' not found`);
      return null;
    }
    
    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    // Notify observers
    this.observers.forEach(observer => observer(metric));
    
    // Clean up
    this.metrics.delete(name);
    
    return metric;
  }

  /**
   * Measure async function performance
   */
  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.start(name, metadata);
    
    try {
      const result = await fn();
      this.end(name);
      return result;
    } catch (error) {
      const metric = this.metrics.get(name);
      if (metric) {
        metric.metadata = { ...metric.metadata, error: true };
      }
      this.end(name);
      throw error;
    }
  }

  /**
   * Subscribe to performance metrics
   */
  subscribe(observer: (metric: PerformanceMetric) => void): () => void {
    this.observers.push(observer);
    
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  /**
   * Get all active metrics
   */
  getActiveMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

/**
 * React hook for component render performance
 */
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    performanceMonitor.start(`${componentName}:render`);
    
    return () => {
      const metric = performanceMonitor.end(`${componentName}:render`);
      if (metric && metric.duration && metric.duration > 16) {
        console.warn(`Slow render detected: ${componentName} took ${metric.duration.toFixed(2)}ms`);
      }
    };
  });
}

/**
 * Lazy component loading with performance tracking
 */
export function lazyWithPerformance<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    performanceMonitor.start(`${componentName}:load`);
    
    try {
      const module = await importFn();
      performanceMonitor.end(`${componentName}:load`);
      return module;
    } catch (error) {
      performanceMonitor.end(`${componentName}:load`);
      throw error;
    }
  });
}

/**
 * Web Vitals monitoring
 */
export function reportWebVitals(metric: any): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }
  }
}

/**
 * Image loading optimization
 */
export function optimizeImage(src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
} = {}): string {
  // If using Next.js Image Optimization API
  if (src.startsWith('/') || src.startsWith('http')) {
    const params = new URLSearchParams();
    
    if (options.width) params.set('w', options.width.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('fm', options.format);
    
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  }
  
  return src;
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [ref, options]);
  
  return isIntersecting;
}

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback = 
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          } as IdleDeadline);
        }, 1);
      };

export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : clearTimeout;