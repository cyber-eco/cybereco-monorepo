'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { authLogger, AuthEventType } from '../services/authLogger';

/**
 * Error recovery strategies
 */
export enum RecoveryStrategy {
  RETRY = 'retry',
  FALLBACK = 'fallback',
  IGNORE = 'ignore',
  RESET = 'reset',
  REFRESH = 'refresh'
}

export interface ErrorRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  backoffMultiplier?: number;
  fallbackValue?: any;
  onError?: (error: Error, attempt: number) => void;
  onRecovery?: () => void;
  strategy?: RecoveryStrategy;
}

/**
 * Retry with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: ErrorRecoveryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    backoffMultiplier = 2,
    onError
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (onError) {
        onError(lastError, attempt + 1);
      }
      
      if (attempt < maxRetries - 1) {
        const delay = retryDelay * Math.pow(backoffMultiplier, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

/**
 * Circuit breaker pattern
 */
export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  constructor(
    private readonly threshold: number = 5,
    private readonly timeout: number = 60000,
    private readonly resetTimeout: number = 30000
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    if (this.state === 'half-open') {
      this.reset();
    }
  }
  
  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'open';
      setTimeout(() => {
        this.state = 'half-open';
      }, this.resetTimeout);
    }
  }
  
  private reset(): void {
    this.failures = 0;
    this.lastFailureTime = 0;
    this.state = 'closed';
  }
}

/**
 * Error boundary hook
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  
  const captureError = useCallback((error: Error) => {
    setError(error);
    authLogger.logSessionEvent(AuthEventType.ERROR_CAPTURED, undefined, {
      message: error.message,
      stack: error.stack
    });
  }, []);
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      captureError(new Error(event.message));
    };
    
    const handleRejection = (event: PromiseRejectionEvent) => {
      captureError(new Error(event.reason));
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [captureError]);
  
  return { error, resetError, captureError };
}

/**
 * Offline recovery hook
 */
export function useOfflineRecovery(
  onOnline?: () => void,
  onOffline?: () => void
) {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onOnline) onOnline();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (onOffline) onOffline();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOnline, onOffline]);
  
  return isOnline;
}

/**
 * Auto-save with recovery
 */
export function useAutoSave<T>(
  data: T,
  saveFn: (data: T) => Promise<void>,
  options: {
    delay?: number;
    onError?: (error: Error) => void;
    onSuccess?: () => void;
  } = {}
) {
  const { delay = 1000, onError, onSuccess } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      
      try {
        await retryWithBackoff(() => saveFn(data), {
          maxRetries: 3,
          onError: (error, attempt) => {
            console.warn(`Auto-save attempt ${attempt} failed:`, error);
          }
        });
        
        setLastSaved(new Date());
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Auto-save failed:', error);
        if (onError) onError(error as Error);
      } finally {
        setIsSaving(false);
      }
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFn, delay, onError, onSuccess]);
  
  return { isSaving, lastSaved };
}

/**
 * IndexedDB corruption recovery
 */
export async function recoverFromIndexedDBCorruption(): Promise<boolean> {
  try {
    // Close all connections
    const databases = await indexedDB.databases();
    
    for (const db of databases) {
      if (db.name) {
        await indexedDB.deleteDatabase(db.name);
      }
    }
    
    // Clear all storage
    if ('storage' in navigator && 'persist' in navigator.storage) {
      await navigator.storage.persist();
    }
    
    // Reload the page to reinitialize
    window.location.reload();
    return true;
  } catch (error) {
    console.error('Failed to recover from IndexedDB corruption:', error);
    return false;
  }
}

/**
 * Firebase error recovery
 */
export function handleFirebaseError(error: any): {
  message: string;
  recovery: RecoveryStrategy;
} {
  const errorCode = error.code || '';
  
  switch (errorCode) {
    case 'auth/network-request-failed':
      return {
        message: 'Network error. Please check your connection.',
        recovery: RecoveryStrategy.RETRY
      };
      
    case 'auth/too-many-requests':
      return {
        message: 'Too many attempts. Please try again later.',
        recovery: RecoveryStrategy.FALLBACK
      };
      
    case 'auth/user-token-expired':
      return {
        message: 'Your session has expired. Please sign in again.',
        recovery: RecoveryStrategy.REFRESH
      };
      
    case 'permission-denied':
      return {
        message: 'You don\'t have permission to access this resource.',
        recovery: RecoveryStrategy.FALLBACK
      };
      
    default:
      return {
        message: error.message || 'An unexpected error occurred.',
        recovery: RecoveryStrategy.RETRY
      };
  }
}

/**
 * React Error Boundary Component
 */
export class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    authLogger.logSessionEvent(AuthEventType.ERROR_BOUNDARY_TRIGGERED, undefined, {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} reset={this.reset} />;
      }
      
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
export function DefaultErrorFallback({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: 'var(--error)', marginBottom: '10px' }}>
        Oops! Something went wrong
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        {error.message}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 20px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Try Again
      </button>
    </div>
  );
}