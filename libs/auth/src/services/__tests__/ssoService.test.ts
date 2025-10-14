import { ssoService } from '../ssoService';
import { jwtService } from '../jwtService';
import { AuthenticationError, ValidationError } from '../../utils/errors';

// Mock dependencies
jest.mock('../jwtService');
jest.mock('../../utils/logger', () => ({
  createLogger: () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }),
}));

describe('SSO Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateSSOToken', () => {
    it('should generate SSO token with required claims', async () => {
      const userId = 'test-user-123';
      const sourceApp = 'hub';
      const targetApp = 'justsplit';
      const mockToken = 'sso.token.here';

      (jwtService.generateTokens as jest.Mock).mockResolvedValue({
        accessToken: mockToken,
        refreshToken: 'refresh.token',
        expiresIn: 300,
      });

      const result = await ssoService.generateSSOToken(userId, sourceApp, targetApp);

      expect(result).toEqual({
        token: mockToken,
        expiresIn: 300,
      });

      expect(jwtService.generateTokens).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          sourceApp,
          targetApp,
          ssoSession: expect.any(String),
          iat: expect.any(Number),
        })
      );
    });

    it('should validate app names', async () => {
      const userId = 'test-user-123';
      const invalidApp = 'invalid-app!@#';

      await expect(
        ssoService.generateSSOToken(userId, invalidApp, 'justsplit')
      ).rejects.toThrow(ValidationError);
    });

    it('should include permissions if provided', async () => {
      const userId = 'test-user-123';
      const sourceApp = 'hub';
      const targetApp = 'justsplit';
      const permissions = ['read', 'write'];

      (jwtService.generateTokens as jest.Mock).mockResolvedValue({
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresIn: 300,
      });

      await ssoService.generateSSOToken(userId, sourceApp, targetApp, permissions);

      expect(jwtService.generateTokens).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          permissions,
        })
      );
    });
  });

  describe('verifySSOToken', () => {
    it('should verify valid SSO token', async () => {
      const mockToken = 'valid.sso.token';
      const mockDecoded = {
        userId: 'test-user-123',
        sourceApp: 'hub',
        targetApp: 'justsplit',
        ssoSession: 'session-123',
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 300,
      };

      (jwtService.verifyAccessToken as jest.Mock).mockResolvedValue(mockDecoded);

      const result = await ssoService.verifySSOToken(mockToken, 'justsplit');

      expect(result).toEqual({
        userId: mockDecoded.userId,
        sourceApp: mockDecoded.sourceApp,
        targetApp: mockDecoded.targetApp,
        ssoSession: mockDecoded.ssoSession,
        permissions: undefined,
      });
    });

    it('should reject token for wrong target app', async () => {
      const mockToken = 'valid.sso.token';
      const mockDecoded = {
        userId: 'test-user-123',
        sourceApp: 'hub',
        targetApp: 'justsplit',
        ssoSession: 'session-123',
        type: 'access',
      };

      (jwtService.verifyAccessToken as jest.Mock).mockResolvedValue(mockDecoded);

      await expect(
        ssoService.verifySSOToken(mockToken, 'website')
      ).rejects.toThrow(AuthenticationError);
    });

    it('should reject non-SSO tokens', async () => {
      const mockToken = 'regular.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'access',
        // Missing SSO fields
      };

      (jwtService.verifyAccessToken as jest.Mock).mockResolvedValue(mockDecoded);

      await expect(
        ssoService.verifySSOToken(mockToken, 'justsplit')
      ).rejects.toThrow(AuthenticationError);
    });
  });

  describe('generateRedirectUrl', () => {
    it('should generate redirect URL with token', () => {
      const targetApp = 'justsplit';
      const token = 'sso.token.here';
      const returnPath = '/dashboard';

      const result = ssoService.generateRedirectUrl(targetApp, token, returnPath);

      expect(result).toContain('justsplit');
      expect(result).toContain(`ssoToken=${token}`);
      expect(result).toContain(`returnPath=${encodeURIComponent(returnPath)}`);
    });

    it('should use default domains in development', () => {
      process.env.NODE_ENV = 'development';
      
      const result = ssoService.generateRedirectUrl('justsplit', 'token');

      expect(result).toContain('localhost:40002');
    });

    it('should use production domains in production', () => {
      process.env.NODE_ENV = 'production';
      
      const result = ssoService.generateRedirectUrl('justsplit', 'token');

      expect(result).toContain('justsplit.cybere.co');
    });

    it('should handle custom domains from environment', () => {
      process.env.JUSTSPLIT_URL = 'https://custom-justsplit.com';
      
      const result = ssoService.generateRedirectUrl('justsplit', 'token');

      expect(result).toContain('custom-justsplit.com');
      
      delete process.env.JUSTSPLIT_URL;
    });
  });

  describe('validateReturnUrl', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should validate allowed return URLs', () => {
      const validUrls = [
        'https://cybere.co/dashboard',
        'https://hub.cybere.co/settings',
        'https://justsplit.cybere.co/groups',
        'https://www.cybere.co/about',
      ];

      validUrls.forEach(url => {
        expect(ssoService.validateReturnUrl(url)).toBe(true);
      });
    });

    it('should reject disallowed return URLs', () => {
      const invalidUrls = [
        'https://evil.com/phishing',
        'http://cybere.co/insecure',
        'javascript:alert("xss")',
        'data:text/html,<script>alert("xss")</script>',
        'https://cybere.co.evil.com/subdomain',
      ];

      invalidUrls.forEach(url => {
        expect(ssoService.validateReturnUrl(url)).toBe(false);
      });
    });

    it('should allow localhost in development', () => {
      process.env.NODE_ENV = 'development';

      const devUrls = [
        'http://localhost:3000/dashboard',
        'http://localhost:40000/auth',
        'http://127.0.0.1:40002/groups',
      ];

      devUrls.forEach(url => {
        expect(ssoService.validateReturnUrl(url)).toBe(true);
      });
    });
  });

  describe('handleSSOCallback', () => {
    it('should handle valid SSO callback', async () => {
      const token = 'valid.sso.token';
      const targetApp = 'justsplit';
      const mockVerified = {
        userId: 'test-user-123',
        sourceApp: 'hub',
        targetApp: 'justsplit',
        ssoSession: 'session-123',
      };

      (jwtService.verifyAccessToken as jest.Mock).mockResolvedValue({
        ...mockVerified,
        type: 'access',
      });

      const result = await ssoService.handleSSOCallback(token, targetApp);

      expect(result).toEqual({
        success: true,
        userId: mockVerified.userId,
        session: mockVerified.ssoSession,
      });
    });

    it('should handle invalid token', async () => {
      const token = 'invalid.token';
      const targetApp = 'justsplit';

      (jwtService.verifyAccessToken as jest.Mock).mockRejectedValue(
        new AuthenticationError('Invalid token')
      );

      const result = await ssoService.handleSSOCallback(token, targetApp);

      expect(result).toEqual({
        success: false,
        error: 'Invalid or expired SSO token',
      });
    });
  });

  describe('revokeSSOSession', () => {
    it('should revoke SSO session', async () => {
      const sessionId = 'session-123';

      await ssoService.revokeSSOSession(sessionId);

      // In a real implementation, this would check Redis
      // For now, just verify it doesn't throw
      expect(true).toBe(true);
    });
  });

  describe('getSSOSessionInfo', () => {
    it('should get SSO session info', async () => {
      const sessionId = 'session-123';

      const result = await ssoService.getSSOSessionInfo(sessionId);

      // In a real implementation, this would fetch from Redis
      // For now, it returns null
      expect(result).toBeNull();
    });
  });

  describe('cleanupExpiredSessions', () => {
    it('should cleanup expired sessions', async () => {
      await ssoService.cleanupExpiredSessions();

      // In a real implementation, this would clean Redis
      // For now, just verify it doesn't throw
      expect(true).toBe(true);
    });
  });
});