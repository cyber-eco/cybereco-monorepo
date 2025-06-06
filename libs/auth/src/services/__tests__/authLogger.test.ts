import { authLogger, AuthEventType, LogLevel } from '../authLogger';

describe('AuthLogger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    // Clear logs before each test
    authLogger.clearLogs();
    
    // Spy on console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Login Events', () => {
    it('should log login attempts', () => {
      authLogger.logLoginAttempt('test@example.com', { method: 'email' });

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.LOGIN_ATTEMPT);
      expect(logs[0].email).toBe('test@example.com');
      expect(logs[0].metadata).toEqual({ method: 'email' });
      expect(logs[0].level).toBe(LogLevel.INFO);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log login success with duration', () => {
      const duration = 1500;
      authLogger.logLoginSuccess('user123', 'test@example.com', duration, { method: 'google' });

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.LOGIN_SUCCESS);
      expect(logs[0].userId).toBe('user123');
      expect(logs[0].email).toBe('test@example.com');
      expect(logs[0].duration).toBe(duration);
      expect(logs[0].success).toBe(true);
      expect(logs[0].metadata).toEqual({ method: 'google' });
    });

    it('should log login failures', () => {
      authLogger.logLoginFailure('test@example.com', 'auth/invalid-password', 'Invalid password');

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.LOGIN_FAILURE);
      expect(logs[0].email).toBe('test@example.com');
      expect(logs[0].errorCode).toBe('auth/invalid-password');
      expect(logs[0].errorMessage).toBe('Invalid password');
      expect(logs[0].success).toBe(false);
      expect(logs[0].level).toBe(LogLevel.WARN);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });

  describe('Token Events', () => {
    it('should log token generation', () => {
      authLogger.logTokenGenerated('user123', 'access', 3600);

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.TOKEN_GENERATED);
      expect(logs[0].userId).toBe('user123');
      expect(logs[0].metadata).toEqual({ tokenType: 'access', expiresIn: 3600 });
      expect(logs[0].level).toBe(LogLevel.DEBUG);
      expect(consoleDebugSpy).toHaveBeenCalled();
    });

    it('should log token verification', () => {
      authLogger.logTokenVerified('user123', 'refresh');

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.TOKEN_VERIFIED);
      expect(logs[0].userId).toBe('user123');
      expect(logs[0].metadata).toEqual({ tokenType: 'refresh' });
      expect(logs[0].success).toBe(true);
    });

    it('should log token errors', () => {
      authLogger.logTokenError('access', 'Token expired');

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.TOKEN_INVALID);
      expect(logs[0].errorMessage).toBe('Token expired');
      expect(logs[0].metadata).toEqual({ tokenType: 'access' });
      expect(logs[0].success).toBe(false);
      expect(logs[0].level).toBe(LogLevel.WARN);
    });
  });

  describe('SSO Events', () => {
    it('should log SSO redirects', () => {
      authLogger.logSSORedirect('hub', 'justsplit', 'user123');

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.SSO_REDIRECT);
      expect(logs[0].sourceApp).toBe('hub');
      expect(logs[0].targetApp).toBe('justsplit');
      expect(logs[0].userId).toBe('user123');
    });

    it('should log cross-app navigation', () => {
      authLogger.logCrossAppNavigation('hub', 'justsplit', 'user123');

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.SSO_CROSS_APP);
      expect(logs[0].sourceApp).toBe('hub');
      expect(logs[0].targetApp).toBe('justsplit');
      expect(logs[0].userId).toBe('user123');
      expect(logs[0].success).toBe(true);
    });
  });

  describe('Error Logging', () => {
    it('should log auth errors with stack trace', () => {
      const error = new Error('Authentication failed');
      authLogger.logAuthError(error, { attemptedAction: 'login' });

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.AUTH_ERROR);
      expect(logs[0].errorMessage).toBe('Authentication failed');
      expect(logs[0].stackTrace).toBeDefined();
      expect(logs[0].metadata).toEqual({ attemptedAction: 'login' });
      expect(logs[0].level).toBe(LogLevel.ERROR);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Session Events', () => {
    it('should log session events', () => {
      authLogger.logSessionEvent(AuthEventType.SESSION_CREATE, 'user123', { source: 'login' });

      const logs = authLogger.getRecentLogs(1);
      expect(logs).toHaveLength(1);
      expect(logs[0].eventType).toBe(AuthEventType.SESSION_CREATE);
      expect(logs[0].userId).toBe('user123');
      expect(logs[0].metadata).toEqual({ source: 'login' });
    });
  });

  describe('Log Management', () => {
    it('should limit logs to maximum count', () => {
      // Add more than MAX_LOGS (1000) entries
      for (let i = 0; i < 1100; i++) {
        authLogger.logLoginAttempt(`test${i}@example.com`);
      }

      const logs = authLogger.getRecentLogs(2000);
      expect(logs.length).toBeLessThanOrEqual(1000);
    });

    it('should filter logs by level', () => {
      authLogger.logLoginAttempt('test@example.com'); // INFO
      authLogger.logTokenError('access', 'Invalid'); // WARN
      authLogger.logAuthError(new Error('Test')); // ERROR
      authLogger.logTokenGenerated('user123', 'access', 3600); // DEBUG

      const infoLogs = authLogger.getRecentLogs(10, LogLevel.INFO);
      const warnLogs = authLogger.getRecentLogs(10, LogLevel.WARN);
      const errorLogs = authLogger.getRecentLogs(10, LogLevel.ERROR);
      const debugLogs = authLogger.getRecentLogs(10, LogLevel.DEBUG);

      expect(infoLogs).toHaveLength(1);
      expect(warnLogs).toHaveLength(1);
      expect(errorLogs).toHaveLength(1);
      expect(debugLogs).toHaveLength(1);
    });

    it('should get error logs', () => {
      authLogger.logLoginAttempt('test@example.com');
      authLogger.logAuthError(new Error('Error 1'));
      authLogger.logAuthError(new Error('Error 2'));

      const errorLogs = authLogger.getErrorLogs(10);
      expect(errorLogs).toHaveLength(2);
      expect(errorLogs.every(log => log.level === LogLevel.ERROR)).toBe(true);
    });

    it('should get logs by user', () => {
      authLogger.logLoginSuccess('user123', 'test1@example.com', 1000);
      authLogger.logLoginSuccess('user456', 'test2@example.com', 1000);
      authLogger.logTokenGenerated('user123', 'access', 3600);

      const userLogs = authLogger.getLogsByUser('user123');
      expect(userLogs).toHaveLength(2);
      expect(userLogs.every(log => log.userId === 'user123')).toBe(true);
    });

    it('should clear logs', () => {
      authLogger.logLoginAttempt('test@example.com');
      authLogger.logLoginAttempt('test2@example.com');

      expect(authLogger.getRecentLogs()).toHaveLength(2);
      
      authLogger.clearLogs();
      expect(authLogger.getRecentLogs()).toHaveLength(0);
    });

    it('should export logs as JSON', () => {
      authLogger.logLoginAttempt('test@example.com');
      authLogger.logLoginSuccess('user123', 'test@example.com', 1000);

      const exported = authLogger.exportLogs();
      const parsed = JSON.parse(exported);
      
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });
  });

  describe('Metrics', () => {
    it('should track login metrics', () => {
      authLogger.logLoginAttempt('test1@example.com');
      authLogger.logLoginAttempt('test2@example.com');
      authLogger.logLoginSuccess('user1', 'test1@example.com', 1000);
      authLogger.logLoginFailure('test2@example.com', 'auth/invalid', 'Invalid');

      const metrics = authLogger.getMetrics();
      expect(metrics.loginAttempts).toBe(2);
      expect(metrics.loginSuccesses).toBe(1);
      expect(metrics.loginFailures).toBe(1);
      expect(metrics.errorRate).toBe(50);
    });

    it('should track average login time', () => {
      authLogger.logLoginSuccess('user1', 'test1@example.com', 1000);
      authLogger.logLoginSuccess('user2', 'test2@example.com', 2000);
      authLogger.logLoginSuccess('user3', 'test3@example.com', 3000);

      const metrics = authLogger.getMetrics();
      expect(metrics.averageLoginTime).toBe(2000);
    });

    it('should track token metrics', () => {
      authLogger.logTokenGenerated('user1', 'access', 3600);
      authLogger.logTokenGenerated('user2', 'access', 3600);
      authLogger.logTokenError('access', 'Expired');
      authLogger.logTokenGenerated('user3', 'refresh', 86400);

      const metrics = authLogger.getMetrics();
      expect(metrics.activeTokens).toBe(2); // 3 generated - 1 error
    });

    it('should track cross-app navigations', () => {
      authLogger.logCrossAppNavigation('hub', 'justsplit', 'user1');
      authLogger.logCrossAppNavigation('justsplit', 'hub', 'user1');

      const metrics = authLogger.getMetrics();
      expect(metrics.crossAppNavigations).toBe(2);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive report', () => {
      authLogger.logLoginAttempt('test@example.com');
      authLogger.logLoginSuccess('user1', 'test@example.com', 1500);
      authLogger.logAuthError(new Error('Test error'));
      authLogger.logCrossAppNavigation('hub', 'justsplit', 'user1');

      const report = authLogger.generateReport();
      
      expect(report).toContain('Authentication Report');
      expect(report).toContain('Login Attempts: 1');
      expect(report).toContain('Login Successes: 1');
      expect(report).toContain('Cross-App Navigations: 1');
      expect(report).toContain('Recent Errors (1)');
      expect(report).toContain('Test error');
    });
  });

  describe('Session Management', () => {
    it('should maintain consistent session ID', () => {
      authLogger.logLoginAttempt('test1@example.com');
      authLogger.logLoginAttempt('test2@example.com');

      const logs = authLogger.getRecentLogs(2);
      expect(logs[0].sessionId).toBe(logs[1].sessionId);
      expect(logs[0].sessionId).toMatch(/^session-\d+-[a-z0-9]{9}$/);
    });
  });
});