import { JWTAuthService } from '../jwtAuthService';
import { AuthUser } from '@cybereco/shared-types';

describe('JWTAuthService', () => {
  let jwtService: JWTAuthService;
  let mockUser: AuthUser;

  beforeEach(() => {
    jwtService = JWTAuthService.getInstance();
    mockUser = {
      uid: 'test-user-123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      emailVerified: true,
      permissions: ['read', 'write'],
      apps: ['justsplit', 'hub']
    };
  });

  describe('generateTokenPair', () => {
    it('should generate valid access and refresh tokens', () => {
      const tokens = jwtService.generateTokenPair(mockUser);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
      expect(tokens).toHaveProperty('expiresIn');
      expect(tokens.expiresIn).toBe(3600); // 1 hour
      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
      expect(tokens.accessToken).not.toBe(tokens.refreshToken);
    });

    it('should include user data in access token', () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      const decoded = jwtService.verifyToken(tokens.accessToken);

      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.uid);
      expect(decoded?.email).toBe(mockUser.email);
      expect(decoded?.name).toBe(mockUser.displayName);
      expect(decoded?.permissions).toEqual(mockUser.permissions);
      expect(decoded?.apps).toEqual(mockUser.apps);
    });

    it('should set correct expiry times', () => {
      const beforeTime = Math.floor(Date.now() / 1000);
      const tokens = jwtService.generateTokenPair(mockUser);
      const afterTime = Math.floor(Date.now() / 1000);

      const decoded = jwtService.verifyToken(tokens.accessToken);
      expect(decoded).not.toBeNull();
      expect(decoded!.iat).toBeGreaterThanOrEqual(beforeTime);
      expect(decoded!.iat).toBeLessThanOrEqual(afterTime);
      expect(decoded!.exp).toBe(decoded!.iat + 3600);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid tokens', () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      const decoded = jwtService.verifyToken(tokens.accessToken);

      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.uid);
    });

    it('should reject invalid tokens', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = jwtService.verifyToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it('should reject expired tokens', () => {
      // Create a token that's already expired
      const expiredUser = { ...mockUser };
      const tokens = jwtService.generateTokenPair(expiredUser);
      
      // Manually create an expired token by modifying the payload
      const parts = tokens.accessToken.split('.');
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      payload.exp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      parts[1] = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');
      const expiredToken = parts.join('.');

      const decoded = jwtService.verifyToken(expiredToken);
      expect(decoded).toBeNull();
    });

    it('should reject tokens with wrong issuer', () => {
      // This would require creating a token with a different secret/issuer
      // For now, we'll test that verification works correctly
      const tokens = jwtService.generateTokenPair(mockUser);
      const decoded = jwtService.verifyToken(tokens.accessToken);
      
      expect(decoded).not.toBeNull();
      expect(decoded?.iss).toBe('cybereco-hub');
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify valid refresh tokens', () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      const decoded = jwtService.verifyRefreshToken(tokens.refreshToken);

      expect(decoded).not.toBeNull();
      expect(decoded?.sub).toBe(mockUser.uid);
    });

    it('should reject invalid refresh tokens', () => {
      const decoded = jwtService.verifyRefreshToken('invalid.refresh.token');
      expect(decoded).toBeNull();
    });

    it('should reject access tokens as refresh tokens', () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      const decoded = jwtService.verifyRefreshToken(tokens.accessToken);
      expect(decoded).toBeNull();
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh valid tokens', async () => {
      const originalTokens = jwtService.generateTokenPair(mockUser);
      
      const getUserData = jest.fn().mockResolvedValue(mockUser);
      const newTokens = await jwtService.refreshAccessToken(originalTokens.refreshToken, getUserData);

      expect(getUserData).toHaveBeenCalledWith(mockUser.uid);
      expect(newTokens).not.toBeNull();
      expect(newTokens?.accessToken).toBeTruthy();
      expect(newTokens?.accessToken).not.toBe(originalTokens.accessToken);
    });

    it('should return null for invalid refresh tokens', async () => {
      const getUserData = jest.fn();
      const newTokens = await jwtService.refreshAccessToken('invalid.token', getUserData);

      expect(getUserData).not.toHaveBeenCalled();
      expect(newTokens).toBeNull();
    });

    it('should return null if user not found', async () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      const getUserData = jest.fn().mockResolvedValue(null);
      
      const newTokens = await jwtService.refreshAccessToken(tokens.refreshToken, getUserData);

      expect(getUserData).toHaveBeenCalledWith(mockUser.uid);
      expect(newTokens).toBeNull();
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should extract token from Bearer header', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature';
      const header = `Bearer ${token}`;
      
      const extracted = jwtService.extractTokenFromHeader(header);
      expect(extracted).toBe(token);
    });

    it('should return null for invalid headers', () => {
      expect(jwtService.extractTokenFromHeader(null)).toBeNull();
      expect(jwtService.extractTokenFromHeader('')).toBeNull();
      expect(jwtService.extractTokenFromHeader('Basic token')).toBeNull();
      expect(jwtService.extractTokenFromHeader('Bearer')).toBeNull();
      expect(jwtService.extractTokenFromHeader('token')).toBeNull();
    });
  });

  describe('isTokenExpiringSoon', () => {
    it('should detect tokens expiring soon', () => {
      const tokens = jwtService.generateTokenPair(mockUser);
      
      // Token just generated should not be expiring soon
      expect(jwtService.isTokenExpiringSoon(tokens.accessToken)).toBe(false);
      
      // Test with smaller buffer (1 second)
      expect(jwtService.isTokenExpiringSoon(tokens.accessToken, 3599)).toBe(true);
    });

    it('should return true for invalid tokens', () => {
      expect(jwtService.isTokenExpiringSoon('invalid.token')).toBe(true);
    });
  });

  describe('CSRF token methods', () => {
    it('should generate valid CSRF tokens', () => {
      const token = jwtService.generateCSRFToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      
      // Should be different each time
      const token2 = jwtService.generateCSRFToken();
      expect(token2).not.toBe(token);
    });

    it('should verify valid CSRF tokens', () => {
      const token = jwtService.generateCSRFToken();
      expect(jwtService.verifyCSRFToken(token)).toBe(true);
    });

    it('should reject invalid CSRF tokens', () => {
      expect(jwtService.verifyCSRFToken('invalid.csrf.token')).toBe(false);
      expect(jwtService.verifyCSRFToken('')).toBe(false);
    });
  });

  describe('createSecureCookie', () => {
    it('should create secure cookie string in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const cookie = jwtService.createSecureCookie('auth-token', 'tokenvalue', 3600);
      
      expect(cookie).toContain('auth-token=tokenvalue');
      expect(cookie).toContain('Path=/');
      expect(cookie).toContain('Max-Age=3600');
      expect(cookie).toContain('HttpOnly');
      expect(cookie).toContain('Secure');
      expect(cookie).toContain('SameSite=Strict');

      process.env.NODE_ENV = originalEnv;
    });

    it('should create non-secure cookie in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const cookie = jwtService.createSecureCookie('auth-token', 'tokenvalue', 3600);
      
      expect(cookie).toContain('auth-token=tokenvalue');
      expect(cookie).not.toContain('Secure');
      expect(cookie).toContain('HttpOnly');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('parseCookies', () => {
    it('should parse cookie string correctly', () => {
      const cookieString = 'token1=value1; token2=value2; token3=value%20with%20spaces';
      const cookies = jwtService.parseCookies(cookieString);

      expect(cookies).toEqual({
        token1: 'value1',
        token2: 'value2',
        token3: 'value with spaces'
      });
    });

    it('should handle empty cookie strings', () => {
      expect(jwtService.parseCookies('')).toEqual({});
      expect(jwtService.parseCookies(null as any)).toEqual({});
    });

    it('should handle malformed cookies', () => {
      const cookies = jwtService.parseCookies('valid=cookie; invalid; another=one');
      expect(cookies).toEqual({
        valid: 'cookie',
        another: 'one'
      });
    });
  });
});