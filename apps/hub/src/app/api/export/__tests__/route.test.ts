import { NextRequest } from 'next/server';
import { POST, GET } from '../route';
import { dataExportService } from '@/services/dataExportService';
import { getAuth } from 'firebase-admin/auth';

// Mock Firebase Admin
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  cert: jest.fn()
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    verifyIdToken: jest.fn()
  }))
}));

// Mock data export service
jest.mock('@/services/dataExportService', () => ({
  dataExportService: {
    exportUserData: jest.fn(),
    getExportFilename: jest.fn()
  }
}));

describe('/api/export', () => {
  const mockUserId = 'test-user-123';
  const mockToken = 'valid-token';
  const mockDecodedToken = { uid: mockUserId };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.FIREBASE_PROJECT_ID = 'test-project';
    process.env.FIREBASE_CLIENT_EMAIL = 'test@test.com';
    process.env.FIREBASE_PRIVATE_KEY = 'test-key';
  });

  describe('POST', () => {
    it('should export data successfully with JSON format', async () => {
      const mockExportData = JSON.stringify({ profile: { email: 'test@example.com' } });
      const mockFilename = 'cybereco-data-export-2024-01-15.json';

      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      (dataExportService.exportUserData as jest.Mock).mockResolvedValue(mockExportData);
      (dataExportService.getExportFilename as jest.Mock).mockReturnValue(mockFilename);

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${mockToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          format: 'json',
          includeMetadata: true
        })
      });

      const response = await POST(request);
      const responseText = await response.text();

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toBe('application/json');
      expect(response.headers.get('content-disposition')).toContain(mockFilename);
      expect(responseText).toBe(mockExportData);
      
      expect(dataExportService.exportUserData).toHaveBeenCalledWith(
        mockUserId,
        {
          format: 'json',
          includeMetadata: true,
          dateRange: undefined,
          dataTypes: undefined
        }
      );
    });

    it('should export data successfully with CSV format', async () => {
      const mockExportData = 'email,name\ntest@example.com,Test User';
      const mockFilename = 'cybereco-data-export-2024-01-15.csv';

      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      (dataExportService.exportUserData as jest.Mock).mockResolvedValue(mockExportData);
      (dataExportService.getExportFilename as jest.Mock).mockReturnValue(mockFilename);

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${mockToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          format: 'csv',
          includeMetadata: false
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toBe('text/csv');
      expect(response.headers.get('content-disposition')).toContain(mockFilename);
    });

    it('should handle date range in export request', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      (dataExportService.exportUserData as jest.Mock).mockResolvedValue('{}');
      (dataExportService.getExportFilename as jest.Mock).mockReturnValue('export.json');

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${mockToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          format: 'json',
          dateRange: {
            start: '2024-01-01',
            end: '2024-01-31'
          }
        })
      });

      await POST(request);

      expect(dataExportService.exportUserData).toHaveBeenCalledWith(
        mockUserId,
        expect.objectContaining({
          dateRange: {
            start: new Date('2024-01-01T00:00:00.000Z'),
            end: new Date('2024-01-31T00:00:00.000Z')
          }
        })
      );
    });

    it('should return 401 for missing authorization', async () => {
      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ format: 'json' })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('should return 401 for invalid token', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': 'Bearer invalid-token',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ format: 'json' })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Invalid token');
    });

    it('should handle export service errors', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      (dataExportService.exportUserData as jest.Mock).mockRejectedValue(
        new Error('Export failed')
      );

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${mockToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ format: 'json' })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Export failed');
      expect(responseData.message).toBe('Export failed');
    });

    it('should set proper cache control headers', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);
      (dataExportService.exportUserData as jest.Mock).mockResolvedValue('{}');
      (dataExportService.getExportFilename as jest.Mock).mockReturnValue('export.json');

      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${mockToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ format: 'json' })
      });

      const response = await POST(request);

      expect(response.headers.get('cache-control')).toBe('no-cache, no-store, must-revalidate');
      expect(response.headers.get('pragma')).toBe('no-cache');
      expect(response.headers.get('expires')).toBe('0');
    });
  });

  describe('GET', () => {
    it('should return export options successfully', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecodedToken);

      const request = new NextRequest('http://localhost/api/export', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${mockToken}`
        }
      });

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual({
        formats: ['json', 'csv'],
        dataTypes: ['profile', 'permissions', 'activities', 'sessions', 'applications'],
        features: {
          dateRange: true,
          includeMetadata: true,
          selectiveExport: true
        },
        limits: {
          maxActivities: 1000,
          maxSessions: 100
        }
      });
    });

    it('should return 401 for missing authorization in GET', async () => {
      const request = new NextRequest('http://localhost/api/export', {
        method: 'GET'
      });

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('should return 401 for invalid token in GET', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

      const request = new NextRequest('http://localhost/api/export', {
        method: 'GET',
        headers: {
          'authorization': 'Bearer invalid-token'
        }
      });

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Invalid token');
    });

    it('should handle unexpected errors in GET', async () => {
      (getAuth().verifyIdToken as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      const request = new NextRequest('http://localhost/api/export', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${mockToken}`
        }
      });

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get export information');
    });
  });
});