import { NextRequest, NextResponse } from 'next/server';
import { 
  applyDataVisibility, 
  checkDataConsent, 
  applyPrivacyHeaders 
} from '../dataVisibility';
import { privacyAwareDataService, authLogger, AuthEventType } from '@cybereco/auth';

// Mock dependencies
jest.mock('@cybereco/auth', () => ({
  privacyAwareDataService: {
    filterResults: jest.fn(),
    canViewData: jest.fn(),
    anonymizeData: jest.fn(),
    canTrackUser: jest.fn()
  },
  authLogger: {
    logSessionEvent: jest.fn()
  },
  AuthEventType: {
    DATA_ACCESS: 'DATA_ACCESS'
  }
}));

describe('Data Visibility Middleware', () => {
  const mockUserId = 'user123';
  const mockAuthCookie = {
    value: JSON.stringify({ uid: mockUserId })
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('applyDataVisibility', () => {
    it('should return original response if no auth token', async () => {
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(null)
        },
        nextUrl: { pathname: '/api/users' }
      } as any as NextRequest;
      
      const response = NextResponse.json({ data: 'test' });
      
      const result = await applyDataVisibility(request, response, { data: 'test' });
      
      expect(result).toBe(response);
    });

    it('should filter array data based on privacy settings', async () => {
      const mockData = [
        { id: '1', userId: 'user1', amount: 100 },
        { id: '2', userId: 'user2', amount: 200 }
      ];
      
      const filteredData = [{ id: '1', userId: 'user1', amount: 100 }];
      
      (privacyAwareDataService.filterResults as jest.Mock).mockResolvedValue(filteredData);
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/expenses' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      expect(privacyAwareDataService.filterResults).toHaveBeenCalledWith(
        mockData,
        mockUserId,
        'expenses'
      );
      
      // Check that response contains filtered data
      const resultData = await result.json();
      expect(resultData).toEqual(filteredData);
    });

    it('should handle paginated results', async () => {
      const mockData = {
        results: [
          { id: '1', userId: 'user1' },
          { id: '2', userId: 'user2' }
        ],
        total: 2,
        page: 1
      };
      
      const filteredResults = [{ id: '1', userId: 'user1' }];
      
      (privacyAwareDataService.filterResults as jest.Mock).mockResolvedValue(filteredResults);
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/groups' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      const resultData = await result.json();
      expect(resultData.results).toEqual(filteredResults);
      expect(resultData.total).toBe(2); // Original total preserved
    });

    it('should return 403 if viewer cannot access single item', async () => {
      const mockData = { id: '1', userId: 'otherUser', private: true };
      
      (privacyAwareDataService.canViewData as jest.Mock).mockResolvedValue(false);
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/users/profile' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      expect(result.status).toBe(403);
      const resultData = await result.json();
      expect(resultData.error).toBe('Access denied due to privacy settings');
    });

    it('should anonymize data when allowed but restricted', async () => {
      const mockData = { 
        id: '1', 
        userId: 'otherUser', 
        email: 'user@example.com',
        amount: 100 
      };
      
      const anonymizedData = { 
        id: '1', 
        userId: 'otherUser', 
        email: 'hidden@example.com',
        amount: 100 
      };
      
      (privacyAwareDataService.canViewData as jest.Mock).mockResolvedValue(true);
      (privacyAwareDataService.anonymizeData as jest.Mock).mockResolvedValue(anonymizedData);
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/users/otherUser' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      expect(privacyAwareDataService.anonymizeData).toHaveBeenCalledWith(
        mockData,
        mockUserId,
        'otherUser'
      );
      
      const resultData = await result.json();
      expect(resultData).toEqual(anonymizedData);
    });

    it('should log data access', async () => {
      const mockData = { id: '1', userId: 'user1' };
      
      (privacyAwareDataService.canViewData as jest.Mock).mockResolvedValue(true);
      (privacyAwareDataService.anonymizeData as jest.Mock).mockResolvedValue(mockData);
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/expenses/1' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      await applyDataVisibility(request, response, mockData);
      
      expect(authLogger.logSessionEvent).toHaveBeenCalledWith(
        AuthEventType.DATA_ACCESS,
        mockUserId,
        {
          targetUserId: 'user1',
          dataType: 'expenses',
          endpoint: '/api/expenses/1',
          accessGranted: true
        }
      );
    });

    it('should skip filtering for non-data endpoints', async () => {
      const mockData = { status: 'ok' };
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/health' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      expect(privacyAwareDataService.filterResults).not.toHaveBeenCalled();
      expect(result).toBe(response);
    });

    it('should handle errors gracefully', async () => {
      const mockData = [{ id: '1' }];
      
      (privacyAwareDataService.filterResults as jest.Mock).mockRejectedValue(
        new Error('Filter error')
      );
      
      const request = {
        cookies: {
          get: jest.fn().mockReturnValue(mockAuthCookie)
        },
        nextUrl: { pathname: '/api/expenses' }
      } as any as NextRequest;
      
      const response = NextResponse.json(mockData);
      
      const result = await applyDataVisibility(request, response, mockData);
      
      // Should return original response on error
      expect(result).toBe(response);
    });
  });

  describe('checkDataConsent', () => {
    it('should check user consent for data processing', async () => {
      (privacyAwareDataService.canTrackUser as jest.Mock).mockResolvedValue(true);
      
      const hasConsent = await checkDataConsent('user123', 'analytics');
      
      expect(privacyAwareDataService.canTrackUser).toHaveBeenCalledWith(
        'user123',
        'functional'
      );
      expect(hasConsent).toBe(true);
    });

    it('should handle consent check errors', async () => {
      (privacyAwareDataService.canTrackUser as jest.Mock).mockRejectedValue(
        new Error('Consent error')
      );
      
      const hasConsent = await checkDataConsent('user123', 'analytics');
      
      expect(hasConsent).toBe(false);
    });
  });

  describe('applyPrivacyHeaders', () => {
    it('should add privacy-related headers', () => {
      const response = new NextResponse();
      
      const result = applyPrivacyHeaders(response);
      
      expect(result.headers.get('X-Privacy-Mode')).toBe('enabled');
      expect(result.headers.get('X-Data-Filtering')).toBe('active');
      expect(result.headers.get('Cache-Control')).toBe(
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      );
      expect(result.headers.get('Pragma')).toBe('no-cache');
      expect(result.headers.get('Expires')).toBe('0');
    });

    it('should prevent caching of private data', () => {
      const response = new NextResponse();
      response.headers.set('Cache-Control', 'public, max-age=3600');
      
      const result = applyPrivacyHeaders(response);
      
      // Should override existing cache headers
      expect(result.headers.get('Cache-Control')).toBe(
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      );
    });
  });
});