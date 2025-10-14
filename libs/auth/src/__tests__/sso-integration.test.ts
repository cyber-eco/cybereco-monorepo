import { AuthTokenService } from '../services/authTokenService';
import { JWTAuthService } from '../services/jwtAuthService';
import { authLogger } from '../services/authLogger';
import { saveSharedAuthState, getSharedAuthState, clearSharedAuthState } from '../shared-auth-state';
import { AuthUser } from '@cybereco/shared-types';

describe('SSO Integration Tests', () => {
  let mockUser: AuthUser;
  let jwtService: JWTAuthService;

  beforeEach(() => {
    // Clear any existing auth state
    clearSharedAuthState();
    authLogger.clearLogs();

    // Set up mock user
    mockUser = {
      uid: 'integration-test-user',
      email: 'integration@test.com',
      displayName: 'Integration Test User',
      photoURL: null,
      emailVerified: true,
      permissions: ['read', 'write'],
      apps: ['hub', 'justsplit']
    };

    jwtService = JWTAuthService.getInstance();

    // Mock localStorage
    const storage: Record<string, string> = {};
    const localStorageMock = {
      getItem: jest.fn((key) => storage[key] || null),
      setItem: jest.fn((key, value) => { storage[key] = value; }),
      removeItem: jest.fn((key) => { delete storage[key]; }),
      clear: jest.fn(() => { Object.keys(storage).forEach(key => delete storage[key]); })
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  describe('Complete SSO Flow', () => {
    it('should handle full authentication flow from Hub to JustSplit', async () => {
      // Step 1: User logs in at Hub
      const loginStartTime = Date.now();
      authLogger.logLoginAttempt(mockUser.email || '', { method: 'email' });

      // Simulate successful Firebase auth
      await saveSharedAuthState(mockUser);
      const loginDuration = Date.now() - loginStartTime;
      authLogger.logLoginSuccess(mockUser.uid, mockUser.email || '', loginDuration);

      // Verify shared auth state is saved
      const savedAuth = await getSharedAuthState();
      expect(savedAuth).not.toBeNull();
      expect(savedAuth?.uid).toBe(mockUser.uid);

      // Step 2: Generate JWT token for cross-app navigation
      const tokenPair = jwtService.generateTokenPair(mockUser);
      authLogger.logTokenGenerated(mockUser.uid, 'access', tokenPair.expiresIn);

      // Step 3: Simulate navigation to JustSplit
      authLogger.logSSORedirect('hub', 'justsplit', mockUser.uid);
      authLogger.logCrossAppNavigation('hub', 'justsplit', mockUser.uid);

      // Step 4: JustSplit receives and verifies token
      const decoded = jwtService.verifyToken(tokenPair.accessToken);
      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.uid);
      authLogger.logTokenVerified(mockUser.uid, 'access');

      // Step 5: JustSplit creates local session
      authLogger.logSessionEvent('auth.session.create' as any, mockUser.uid, { app: 'justsplit' });

      // Verify metrics
      const metrics = authLogger.getMetrics();
      expect(metrics.loginAttempts).toBe(1);
      expect(metrics.loginSuccesses).toBe(1);
      expect(metrics.loginFailures).toBe(0);
      expect(metrics.activeTokens).toBe(1);
      expect(metrics.crossAppNavigations).toBe(1);
    });

    it('should handle token refresh flow', async () => {
      // Initial token generation
      const tokenPair = jwtService.generateTokenPair(mockUser);
      authLogger.logTokenGenerated(mockUser.uid, 'access', tokenPair.expiresIn);

      // Simulate token expiring soon
      const isExpiringSoon = jwtService.isTokenExpiringSoon(tokenPair.accessToken, 3599);
      expect(isExpiringSoon).toBe(true);

      // Refresh token
      const getUserData = jest.fn().mockResolvedValue(mockUser);
      const newTokenPair = await jwtService.refreshAccessToken(tokenPair.refreshToken, getUserData);
      
      expect(newTokenPair).not.toBeNull();
      expect(newTokenPair?.accessToken).not.toBe(tokenPair.accessToken);
      authLogger.logTokenGenerated(mockUser.uid, 'access', newTokenPair!.expiresIn);

      // Verify new token
      const decoded = jwtService.verifyToken(newTokenPair!.accessToken);
      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.uid);
    });

    it('should handle logout across apps', async () => {
      // Set up authenticated state
      await saveSharedAuthState(mockUser);
      
      // Log out
      authLogger.logSessionEvent('auth.logout' as any, mockUser.uid);
      await clearSharedAuthState();
      authLogger.logSessionEvent('auth.session.clear' as any, mockUser.uid);

      // Verify auth state is cleared
      const clearedAuth = await getSharedAuthState();
      expect(clearedAuth).toBeNull();

      // Verify logs
      const logs = authLogger.getRecentLogs(10);
      const logoutLog = logs.find(log => log.eventType === 'auth.logout');
      const clearLog = logs.find(log => log.eventType === 'auth.session.clear');
      
      expect(logoutLog).toBeDefined();
      expect(clearLog).toBeDefined();
    });

    it('should handle authentication failures', async () => {
      // Attempt login with invalid credentials
      authLogger.logLoginAttempt('invalid@test.com', { method: 'email' });
      authLogger.logLoginFailure('invalid@test.com', 'auth/user-not-found', 'User not found');

      // Try to use invalid token
      const invalidToken = 'invalid.jwt.token';
      const decoded = jwtService.verifyToken(invalidToken);
      expect(decoded).toBeNull();
      authLogger.logTokenError('access', 'Invalid token format');

      // Verify metrics
      const metrics = authLogger.getMetrics();
      expect(metrics.loginAttempts).toBe(1);
      expect(metrics.loginSuccesses).toBe(0);
      expect(metrics.loginFailures).toBe(1);
      expect(metrics.errorRate).toBe(100);
    });

    it('should handle concurrent app access', async () => {
      // User is authenticated in Hub
      await saveSharedAuthState(mockUser);
      const tokenPair = jwtService.generateTokenPair(mockUser);

      // Simulate opening multiple apps
      const apps = ['justsplit', 'somos', 'demos'];
      
      for (const app of apps) {
        // Each app verifies the token
        const decoded = jwtService.verifyToken(tokenPair.accessToken);
        expect(decoded).not.toBeNull();
        authLogger.logTokenVerified(mockUser.uid, 'access');
        authLogger.logCrossAppNavigation('hub', app, mockUser.uid);
      }

      // Verify all apps have access
      const metrics = authLogger.getMetrics();
      expect(metrics.crossAppNavigations).toBe(3);
      
      // Check shared auth state is still valid
      const sharedAuth = await getSharedAuthState();
      expect(sharedAuth).not.toBeNull();
      expect(sharedAuth?.uid).toBe(mockUser.uid);
    });
  });

  describe('Error Scenarios', () => {
    it('should handle expired tokens gracefully', () => {
      // Create an already expired token (mock)
      const expiredToken = 'expired.token.here';
      
      // Attempt to verify
      const decoded = jwtService.verifyToken(expiredToken);
      expect(decoded).toBeNull();
      authLogger.logTokenError('access', 'Token expired');

      // Check error logs
      const errorLogs = authLogger.getErrorLogs(10);
      const tokenErrors = authLogger.getRecentLogs(10).filter(
        log => log.eventType === 'auth.token.invalid'
      );
      expect(tokenErrors.length).toBeGreaterThan(0);
    });

    it('should handle missing shared auth state', async () => {
      // Clear any existing auth
      await clearSharedAuthState();

      // Try to get auth state
      const auth = await getSharedAuthState();
      expect(auth).toBeNull();

      // Log the attempt
      authLogger.logSessionEvent('auth.session.restore' as any, undefined, { 
        success: false,
        reason: 'No shared auth state'
      });

      // Verify log
      const logs = authLogger.getRecentLogs(10);
      const restoreLog = logs.find(log => 
        log.eventType === 'auth.session.restore' && 
        log.metadata?.success === false
      );
      expect(restoreLog).toBeDefined();
    });

    it('should handle CSRF token validation', () => {
      // Generate CSRF token
      const csrfToken = jwtService.generateCSRFToken();
      expect(csrfToken).toBeTruthy();

      // Verify valid token
      const isValid = jwtService.verifyCSRFToken(csrfToken);
      expect(isValid).toBe(true);

      // Verify invalid token
      const isInvalid = jwtService.verifyCSRFToken('tampered.csrf.token');
      expect(isInvalid).toBe(false);
      authLogger.logAuthError(new Error('CSRF token validation failed'), {
        action: 'form_submission'
      });
    });
  });

  describe('Performance Monitoring', () => {
    it('should track authentication performance', async () => {
      const timings: number[] = [];

      // Simulate multiple login attempts with varying times
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        
        authLogger.logLoginAttempt(`user${i}@test.com`, { method: 'email' });
        
        // Simulate auth delay
        await new Promise(resolve => setTimeout(resolve, 100 + (i * 50)));
        
        const duration = Date.now() - startTime;
        timings.push(duration);
        
        authLogger.logLoginSuccess(`user${i}`, `user${i}@test.com`, duration);
      }

      // Verify average login time
      const metrics = authLogger.getMetrics();
      const expectedAverage = timings.reduce((a, b) => a + b, 0) / timings.length;
      
      expect(metrics.averageLoginTime).toBeCloseTo(expectedAverage, -1);
      expect(metrics.loginSuccesses).toBe(5);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive SSO report', async () => {
      // Simulate various SSO activities
      authLogger.logLoginAttempt(mockUser.email || '', { method: 'google' });
      authLogger.logLoginSuccess(mockUser.uid, mockUser.email || '', 1200);
      
      const tokenPair = jwtService.generateTokenPair(mockUser);
      authLogger.logTokenGenerated(mockUser.uid, 'access', tokenPair.expiresIn);
      
      authLogger.logCrossAppNavigation('hub', 'justsplit', mockUser.uid);
      authLogger.logCrossAppNavigation('justsplit', 'hub', mockUser.uid);
      
      authLogger.logAuthError(new Error('Test error'), { context: 'token_refresh' });

      // Generate report
      const report = authLogger.generateReport();
      
      // Verify report contains all key information
      expect(report).toContain('Authentication Report');
      expect(report).toContain('Login Attempts: 1');
      expect(report).toContain('Login Successes: 1');
      expect(report).toContain('Cross-App Navigations: 2');
      expect(report).toContain('Average Login Time: 1200ms');
      expect(report).toContain('Recent Errors (1)');
      expect(report).toContain('Test error');
    });
  });
});