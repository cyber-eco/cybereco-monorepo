/**
 * Authentication Logger Service
 * Provides structured logging for SSO authentication flow with monitoring capabilities
 */

export enum AuthEventType {
  // Authentication Events
  LOGIN_ATTEMPT = 'auth.login.attempt',
  LOGIN_SUCCESS = 'auth.login.success',
  LOGIN_FAILURE = 'auth.login.failure',
  LOGOUT = 'auth.logout',
  
  // Token Events
  TOKEN_GENERATED = 'auth.token.generated',
  TOKEN_VERIFIED = 'auth.token.verified',
  TOKEN_EXPIRED = 'auth.token.expired',
  TOKEN_REFRESH = 'auth.token.refresh',
  TOKEN_INVALID = 'auth.token.invalid',
  
  // SSO Events
  SSO_REDIRECT = 'auth.sso.redirect',
  SSO_CALLBACK = 'auth.sso.callback',
  SSO_TOKEN_EXCHANGE = 'auth.sso.token_exchange',
  SSO_CROSS_APP = 'auth.sso.cross_app',
  
  // Session Events
  SESSION_CREATE = 'auth.session.create',
  SESSION_RESTORE = 'auth.session.restore',
  SESSION_EXPIRE = 'auth.session.expire',
  SESSION_CLEAR = 'auth.session.clear',
  
  // Error Events
  AUTH_ERROR = 'auth.error',
  PERMISSION_DENIED = 'auth.permission.denied',
  RATE_LIMIT = 'auth.rate_limit',
  
  // Privacy Events
  PRIVACY_SETTINGS_UPDATED = 'privacy.settings.updated',
  DATA_ACCESS = 'privacy.data.access',
  CONSENT_GRANTED = 'privacy.consent.granted',
  CONSENT_REVOKED = 'privacy.consent.revoked',
  
  // Security Events
  ERROR_CAPTURED = 'security.error.captured',
  ERROR_BOUNDARY_TRIGGERED = 'security.error.boundary'
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface AuthLogEntry {
  timestamp: string;
  level: LogLevel;
  eventType: AuthEventType;
  userId?: string;
  email?: string;
  appId?: string;
  sourceApp?: string;
  targetApp?: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  message: string;
  metadata?: Record<string, any>;
  duration?: number;
  success?: boolean;
  errorCode?: string;
  errorMessage?: string;
  stackTrace?: string;
}

export interface AuthMetrics {
  loginAttempts: number;
  loginSuccesses: number;
  loginFailures: number;
  activeTokens: number;
  tokenRefreshes: number;
  crossAppNavigations: number;
  averageLoginTime: number;
  errorRate: number;
}

class AuthLogger {
  private static instance: AuthLogger;
  private logs: AuthLogEntry[] = [];
  private metrics: AuthMetrics = {
    loginAttempts: 0,
    loginSuccesses: 0,
    loginFailures: 0,
    activeTokens: 0,
    tokenRefreshes: 0,
    crossAppNavigations: 0,
    averageLoginTime: 0,
    errorRate: 0
  };
  private loginTimings: number[] = [];
  private readonly MAX_LOGS = 1000;
  private readonly LOG_STORAGE_KEY = 'cybereco-auth-logs';
  private readonly METRICS_STORAGE_KEY = 'cybereco-auth-metrics';
  private sessionId: string;
  
  private constructor() {
    this.sessionId = this.generateSessionId();
    this.loadFromStorage();
    
    // Set up periodic metrics calculation
    if (typeof window !== 'undefined') {
      setInterval(() => this.calculateMetrics(), 60000); // Every minute
    }
  }

  static getInstance(): AuthLogger {
    if (!AuthLogger.instance) {
      AuthLogger.instance = new AuthLogger();
    }
    return AuthLogger.instance;
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Load logs (only recent ones)
      const storedLogs = localStorage.getItem(this.LOG_STORAGE_KEY);
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        this.logs = parsedLogs.slice(-100); // Keep only last 100
      }
      
      // Load metrics
      const storedMetrics = localStorage.getItem(this.METRICS_STORAGE_KEY);
      if (storedMetrics) {
        this.metrics = JSON.parse(storedMetrics);
      }
    } catch (error) {
      console.error('Failed to load auth logs from storage:', error);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Save recent logs
      const recentLogs = this.logs.slice(-100);
      localStorage.setItem(this.LOG_STORAGE_KEY, JSON.stringify(recentLogs));
      
      // Save metrics
      localStorage.setItem(this.METRICS_STORAGE_KEY, JSON.stringify(this.metrics));
    } catch (error) {
      console.error('Failed to save auth logs to storage:', error);
    }
  }

  private createLogEntry(
    level: LogLevel,
    eventType: AuthEventType,
    message: string,
    data?: Partial<AuthLogEntry>
  ): AuthLogEntry {
    const entry: AuthLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      eventType,
      message,
      sessionId: this.sessionId,
      ...data
    };

    // Add browser info if available
    if (typeof window !== 'undefined' && window.navigator) {
      entry.userAgent = window.navigator.userAgent;
    }

    return entry;
  }

  private log(entry: AuthLogEntry): void {
    // Add to logs array
    this.logs.push(entry);
    
    // Trim logs if too many
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    // Console output based on level
    const consoleMethod = entry.level === LogLevel.ERROR ? 'error' : 
                         entry.level === LogLevel.WARN ? 'warn' : 
                         entry.level === LogLevel.DEBUG ? 'debug' : 'log';
    
    console[consoleMethod](`[Auth ${entry.level.toUpperCase()}] ${entry.eventType}: ${entry.message}`, {
      ...entry.metadata,
      sessionId: entry.sessionId,
      timestamp: entry.timestamp
    });

    // Update metrics
    this.updateMetrics(entry);
    
    // Save to storage periodically
    this.saveToStorage();
    
    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(entry);
    }
  }

  private updateMetrics(entry: AuthLogEntry): void {
    switch (entry.eventType) {
      case AuthEventType.LOGIN_ATTEMPT:
        this.metrics.loginAttempts++;
        break;
      case AuthEventType.LOGIN_SUCCESS:
        this.metrics.loginSuccesses++;
        if (entry.duration) {
          this.loginTimings.push(entry.duration);
        }
        break;
      case AuthEventType.LOGIN_FAILURE:
        this.metrics.loginFailures++;
        break;
      case AuthEventType.TOKEN_GENERATED:
        this.metrics.activeTokens++;
        break;
      case AuthEventType.TOKEN_EXPIRED:
      case AuthEventType.TOKEN_INVALID:
        this.metrics.activeTokens = Math.max(0, this.metrics.activeTokens - 1);
        break;
      case AuthEventType.TOKEN_REFRESH:
        this.metrics.tokenRefreshes++;
        break;
      case AuthEventType.SSO_CROSS_APP:
        this.metrics.crossAppNavigations++;
        break;
    }
  }

  private calculateMetrics(): void {
    // Calculate average login time
    if (this.loginTimings.length > 0) {
      const sum = this.loginTimings.reduce((a, b) => a + b, 0);
      this.metrics.averageLoginTime = sum / this.loginTimings.length;
      
      // Keep only recent timings
      if (this.loginTimings.length > 100) {
        this.loginTimings = this.loginTimings.slice(-100);
      }
    }
    
    // Calculate error rate
    const totalAttempts = this.metrics.loginAttempts;
    if (totalAttempts > 0) {
      this.metrics.errorRate = (this.metrics.loginFailures / totalAttempts) * 100;
    }
  }

  private async sendToMonitoring(entry: AuthLogEntry): Promise<void> {
    // Integration point for services like Sentry, DataDog, etc.
    try {
      // Example: Send to monitoring endpoint
      if (entry.level === LogLevel.ERROR) {
        // await fetch('/api/monitoring/auth-error', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry)
        // });
      }
    } catch (error) {
      console.error('Failed to send log to monitoring:', error);
    }
  }

  // Public logging methods
  logLoginAttempt(email: string, metadata?: Record<string, any>): void {
    this.log(this.createLogEntry(
      LogLevel.INFO,
      AuthEventType.LOGIN_ATTEMPT,
      `Login attempt for ${email}`,
      { email, metadata }
    ));
  }

  logLoginSuccess(userId: string, email: string, duration: number, metadata?: Record<string, any>): void {
    this.log(this.createLogEntry(
      LogLevel.INFO,
      AuthEventType.LOGIN_SUCCESS,
      `Login successful for ${email}`,
      { userId, email, duration, success: true, metadata }
    ));
  }

  logLoginFailure(email: string, errorCode: string, errorMessage: string): void {
    this.log(this.createLogEntry(
      LogLevel.WARN,
      AuthEventType.LOGIN_FAILURE,
      `Login failed for ${email}: ${errorMessage}`,
      { email, errorCode, errorMessage, success: false }
    ));
  }

  logTokenGenerated(userId: string, tokenType: string, expiresIn: number): void {
    this.log(this.createLogEntry(
      LogLevel.DEBUG,
      AuthEventType.TOKEN_GENERATED,
      `Generated ${tokenType} token for user ${userId}`,
      { userId, metadata: { tokenType, expiresIn } }
    ));
  }

  logTokenVerified(userId: string, tokenType: string): void {
    this.log(this.createLogEntry(
      LogLevel.DEBUG,
      AuthEventType.TOKEN_VERIFIED,
      `Verified ${tokenType} token for user ${userId}`,
      { userId, metadata: { tokenType }, success: true }
    ));
  }

  logTokenError(tokenType: string, error: string): void {
    this.log(this.createLogEntry(
      LogLevel.WARN,
      AuthEventType.TOKEN_INVALID,
      `Invalid ${tokenType} token: ${error}`,
      { errorMessage: error, metadata: { tokenType }, success: false }
    ));
  }

  logSSORedirect(sourceApp: string, targetApp: string, userId?: string): void {
    this.log(this.createLogEntry(
      LogLevel.INFO,
      AuthEventType.SSO_REDIRECT,
      `SSO redirect from ${sourceApp} to ${targetApp}`,
      { sourceApp, targetApp, userId }
    ));
  }

  logCrossAppNavigation(sourceApp: string, targetApp: string, userId: string): void {
    this.log(this.createLogEntry(
      LogLevel.INFO,
      AuthEventType.SSO_CROSS_APP,
      `Cross-app navigation from ${sourceApp} to ${targetApp}`,
      { sourceApp, targetApp, userId, success: true }
    ));
  }

  logAuthError(error: Error, context?: Record<string, any>): void {
    this.log(this.createLogEntry(
      LogLevel.ERROR,
      AuthEventType.AUTH_ERROR,
      error.message,
      { 
        errorMessage: error.message,
        stackTrace: error.stack,
        metadata: context,
        success: false
      }
    ));
  }

  logSessionEvent(eventType: AuthEventType, userId?: string, metadata?: Record<string, any>): void {
    this.log(this.createLogEntry(
      LogLevel.INFO,
      eventType,
      `Session event: ${eventType}`,
      { userId, metadata }
    ));
  }

  // Metrics and reporting
  getMetrics(): AuthMetrics {
    this.calculateMetrics();
    return { ...this.metrics };
  }

  getRecentLogs(count: number = 50, level?: LogLevel): AuthLogEntry[] {
    let logs = [...this.logs];
    
    if (level) {
      logs = logs.filter(log => log.level === level);
    }
    
    return logs.slice(-count);
  }

  getErrorLogs(count: number = 20): AuthLogEntry[] {
    return this.logs
      .filter(log => log.level === LogLevel.ERROR)
      .slice(-count);
  }

  getLogsByUser(userId: string, count: number = 50): AuthLogEntry[] {
    return this.logs
      .filter(log => log.userId === userId)
      .slice(-count);
  }

  clearLogs(): void {
    this.logs = [];
    this.loginTimings = [];
    this.saveToStorage();
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  generateReport(): string {
    const metrics = this.getMetrics();
    const recentErrors = this.getErrorLogs(10);
    
    return `
Authentication Report
====================
Generated: ${new Date().toISOString()}
Session: ${this.sessionId}

Metrics:
--------
Login Attempts: ${metrics.loginAttempts}
Login Successes: ${metrics.loginSuccesses} (${((metrics.loginSuccesses / metrics.loginAttempts) * 100).toFixed(1)}%)
Login Failures: ${metrics.loginFailures} (${metrics.errorRate.toFixed(1)}%)
Average Login Time: ${metrics.averageLoginTime.toFixed(0)}ms
Active Tokens: ${metrics.activeTokens}
Token Refreshes: ${metrics.tokenRefreshes}
Cross-App Navigations: ${metrics.crossAppNavigations}

Recent Errors (${recentErrors.length}):
------------------
${recentErrors.map(err => `${err.timestamp} - ${err.message}`).join('\n')}
    `;
  }
}

// Export singleton instance
export const authLogger = AuthLogger.getInstance();