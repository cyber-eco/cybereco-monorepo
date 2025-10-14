import { jwtService } from '../jwtService';
import { InvalidTokenError, TokenExpiredError } from '../../utils/errors';
import jwt from 'jsonwebtoken';

// Mock environment variables
const mockEnv = {
  JWT_SECRET: 'test-secret-key-for-testing',
  JWT_REFRESH_SECRET: 'test-refresh-secret-key-for-testing',
  JWT_ISSUER: 'https://test.cybere.co',
  JWT_AUDIENCE: 'https://test.cybere.co',
};

// Mock jsonwebtoken
jest.mock('jsonwebtoken');

describe('JWT Service', () => {
  beforeAll(() => {
    // Set up environment variables
    Object.entries(mockEnv).forEach(([key, value]) => {
      process.env[key] = value;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateTokens', () => {
    it('should generate valid access and refresh tokens', async () => {
      const userId = 'test-user-123';
      const mockAccessToken = 'mock.access.token';
      const mockRefreshToken = 'mock.refresh.token';

      (jwt.sign as jest.Mock)
        .mockReturnValueOnce(mockAccessToken)
        .mockReturnValueOnce(mockRefreshToken);

      const result = await jwtService.generateTokens(userId);

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        expiresIn: 86400, // 24 hours
      });

      // Verify JWT was called with correct parameters
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      
      // Access token call
      expect(jwt.sign).toHaveBeenNthCalledWith(
        1,
        { userId, type: 'access' },
        mockEnv.JWT_SECRET,
        {
          expiresIn: '24h',
          issuer: mockEnv.JWT_ISSUER,
          audience: mockEnv.JWT_AUDIENCE,
          subject: userId,
        }
      );

      // Refresh token call
      expect(jwt.sign).toHaveBeenNthCalledWith(
        2,
        { userId, type: 'refresh' },
        mockEnv.JWT_REFRESH_SECRET,
        {
          expiresIn: '7d',
          issuer: mockEnv.JWT_ISSUER,
          audience: mockEnv.JWT_AUDIENCE,
          subject: userId,
        }
      );
    });

    it('should include additional claims if provided', async () => {
      const userId = 'test-user-123';
      const additionalClaims = { role: 'admin', permissions: ['read', 'write'] };

      (jwt.sign as jest.Mock).mockReturnValue('mock.token');

      await jwtService.generateTokens(userId, additionalClaims);

      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          type: 'access',
          ...additionalClaims,
        }),
        expect.any(String),
        expect.any(Object)
      );
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify valid access token', async () => {
      const mockToken = 'valid.access.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'access',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      const result = await jwtService.verifyAccessToken(mockToken);

      expect(result).toEqual(mockDecoded);
      expect(jwt.verify).toHaveBeenCalledWith(
        mockToken,
        mockEnv.JWT_SECRET,
        {
          issuer: mockEnv.JWT_ISSUER,
          audience: mockEnv.JWT_AUDIENCE,
        }
      );
    });

    it('should throw InvalidTokenError for invalid token', async () => {
      const mockToken = 'invalid.token';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid token');
      });

      await expect(jwtService.verifyAccessToken(mockToken))
        .rejects.toThrow(InvalidTokenError);
    });

    it('should throw TokenExpiredError for expired token', async () => {
      const mockToken = 'expired.token';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        const error = new Error('jwt expired');
        (error as any).name = 'TokenExpiredError';
        throw error;
      });

      await expect(jwtService.verifyAccessToken(mockToken))
        .rejects.toThrow(TokenExpiredError);
    });

    it('should throw InvalidTokenError for refresh token used as access token', async () => {
      const mockToken = 'refresh.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'refresh', // Wrong type
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      await expect(jwtService.verifyAccessToken(mockToken))
        .rejects.toThrow(InvalidTokenError);
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify valid refresh token', async () => {
      const mockToken = 'valid.refresh.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'refresh',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 604800, // 7 days
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      const result = await jwtService.verifyRefreshToken(mockToken);

      expect(result).toEqual(mockDecoded);
      expect(jwt.verify).toHaveBeenCalledWith(
        mockToken,
        mockEnv.JWT_REFRESH_SECRET,
        {
          issuer: mockEnv.JWT_ISSUER,
          audience: mockEnv.JWT_AUDIENCE,
        }
      );
    });

    it('should throw InvalidTokenError for access token used as refresh token', async () => {
      const mockToken = 'access.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'access', // Wrong type
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      await expect(jwtService.verifyRefreshToken(mockToken))
        .rejects.toThrow(InvalidTokenError);
    });
  });

  describe('refreshTokens', () => {
    it('should generate new tokens from valid refresh token', async () => {
      const mockRefreshToken = 'valid.refresh.token';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'refresh',
        sub: 'test-user-123',
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('new.access.token')
        .mockReturnValueOnce('new.refresh.token');

      const result = await jwtService.refreshTokens(mockRefreshToken);

      expect(result).toEqual({
        accessToken: 'new.access.token',
        refreshToken: 'new.refresh.token',
        expiresIn: 86400,
      });
    });

    it('should throw error for invalid refresh token', async () => {
      const mockRefreshToken = 'invalid.refresh.token';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid token');
      });

      await expect(jwtService.refreshTokens(mockRefreshToken))
        .rejects.toThrow(InvalidTokenError);
    });
  });

  describe('revokeTokens', () => {
    it('should revoke tokens for user', async () => {
      const userId = 'test-user-123';
      
      // Mock redis client
      const mockRedis = {
        set: jest.fn().mockResolvedValue('OK'),
        expire: jest.fn().mockResolvedValue(1),
      };
      
      // Inject mock redis (this would need to be refactored in actual implementation)
      (jwtService as any).redis = mockRedis;

      await jwtService.revokeTokens(userId);

      expect(mockRedis.set).toHaveBeenCalledWith(
        `revoked:${userId}`,
        expect.any(String)
      );
      expect(mockRedis.expire).toHaveBeenCalledWith(
        `revoked:${userId}`,
        604800 // 7 days
      );
    });
  });

  describe('isTokenRevoked', () => {
    it('should return true for revoked token', async () => {
      const userId = 'test-user-123';
      
      const mockRedis = {
        get: jest.fn().mockResolvedValue('timestamp'),
      };
      
      (jwtService as any).redis = mockRedis;

      const result = await jwtService.isTokenRevoked(userId);

      expect(result).toBe(true);
      expect(mockRedis.get).toHaveBeenCalledWith(`revoked:${userId}`);
    });

    it('should return false for non-revoked token', async () => {
      const userId = 'test-user-123';
      
      const mockRedis = {
        get: jest.fn().mockResolvedValue(null),
      };
      
      (jwtService as any).redis = mockRedis;

      const result = await jwtService.isTokenRevoked(userId);

      expect(result).toBe(false);
    });
  });

  describe('decodeToken', () => {
    it('should decode token without verification', () => {
      const mockToken = 'mock.token.here';
      const mockDecoded = {
        userId: 'test-user-123',
        type: 'access',
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecoded);

      const result = jwtService.decodeToken(mockToken);

      expect(result).toEqual(mockDecoded);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
    });
  });

  describe('getTokenExpiry', () => {
    it('should return token expiry date', () => {
      const mockToken = 'mock.token.here';
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const mockDecoded = {
        userId: 'test-user-123',
        exp,
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecoded);

      const result = jwtService.getTokenExpiry(mockToken);

      expect(result).toEqual(new Date(exp * 1000));
    });

    it('should return null for token without expiry', () => {
      const mockToken = 'mock.token.here';
      const mockDecoded = {
        userId: 'test-user-123',
        // No exp field
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecoded);

      const result = jwtService.getTokenExpiry(mockToken);

      expect(result).toBeNull();
    });

    it('should return null for invalid token', () => {
      const mockToken = 'invalid.token';

      (jwt.decode as jest.Mock).mockReturnValue(null);

      const result = jwtService.getTokenExpiry(mockToken);

      expect(result).toBeNull();
    });
  });
});