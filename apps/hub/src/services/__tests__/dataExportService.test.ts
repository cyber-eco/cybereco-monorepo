import { dataExportService } from '../dataExportService';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';

// Mock Firebase config
jest.mock('@cybereco/firebase-config', () => ({
  getHubAuth: jest.fn(() => ({})),
  getHubFirestore: jest.fn(() => ({}))
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  Timestamp: {
    fromDate: jest.fn((date) => ({ toDate: () => date }))
  }
}));

describe('DataExportService', () => {
  const mockUserId = 'test-user-123';
  const mockUserData = {
    uid: mockUserId,
    email: 'test@example.com',
    displayName: 'Test User',
    createdAt: { toDate: () => new Date('2024-01-01') }
  };

  const mockPermissions = [
    {
      id: 'perm1',
      userId: mockUserId,
      appId: 'justsplit',
      permissions: ['read', 'write'],
      grantedAt: { toDate: () => new Date('2024-01-02') }
    }
  ];

  const mockActivities = [
    {
      id: 'act1',
      userId: mockUserId,
      type: 'login',
      timestamp: { toDate: () => new Date('2024-01-03') },
      details: { ip: '127.0.0.1' }
    },
    {
      id: 'act2',
      userId: mockUserId,
      type: 'data_export',
      timestamp: { toDate: () => new Date('2024-01-04') },
      details: { format: 'json' }
    }
  ];

  const mockSessions = [
    {
      id: 'sess1',
      userId: mockUserId,
      createdAt: { toDate: () => new Date('2024-01-03') },
      lastActive: { toDate: () => new Date('2024-01-03') },
      userAgent: 'Mozilla/5.0'
    }
  ];

  const mockApplications = [
    {
      id: 'app1',
      userId: mockUserId,
      appId: 'justsplit',
      authorizedAt: { toDate: () => new Date('2024-01-02') },
      scopes: ['profile', 'expenses']
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup mock returns
    (getDocs as jest.Mock).mockImplementation((q) => {
      const collectionName = (collection as jest.Mock).mock.calls[0][1];
      
      switch (collectionName) {
        case 'users':
          return {
            empty: false,
            docs: [{ data: () => mockUserData }]
          };
        case 'permissions':
          return {
            empty: false,
            docs: mockPermissions.map(p => ({ 
              id: p.id,
              data: () => ({ ...p, id: undefined })
            }))
          };
        case 'activities':
          return {
            empty: false,
            docs: mockActivities.map(a => ({
              id: a.id,
              data: () => ({ ...a, id: undefined })
            }))
          };
        case 'sessions':
          return {
            empty: false,
            docs: mockSessions.map(s => ({
              id: s.id,
              data: () => ({ ...s, id: undefined })
            }))
          };
        case 'userApplications':
          return {
            empty: false,
            docs: mockApplications.map(a => ({
              id: a.id,
              data: () => ({ ...a, id: undefined })
            }))
          };
        default:
          return { empty: true, docs: [] };
      }
    });
  });

  describe('exportUserData', () => {
    it('should export user data as JSON', async () => {
      const options = {
        format: 'json' as const,
        includeMetadata: true
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const parsedResult = JSON.parse(result as string);

      expect(parsedResult).toHaveProperty('profile');
      expect(parsedResult.profile.email).toBe('test@example.com');
      expect(parsedResult.profile.displayName).toBe('Test User');
      
      expect(parsedResult).toHaveProperty('permissions');
      expect(parsedResult.permissions).toHaveLength(1);
      expect(parsedResult.permissions[0].appId).toBe('justsplit');
      
      expect(parsedResult).toHaveProperty('activities');
      expect(parsedResult.activities).toHaveLength(2);
      
      expect(parsedResult).toHaveProperty('sessions');
      expect(parsedResult.sessions).toHaveLength(1);
      
      expect(parsedResult).toHaveProperty('applications');
      expect(parsedResult.applications).toHaveLength(1);
      
      expect(parsedResult).toHaveProperty('metadata');
      expect(parsedResult.metadata.userId).toBe(mockUserId);
      expect(parsedResult.metadata.version).toBe('1.0.0');
    });

    it('should export user data as CSV', async () => {
      const options = {
        format: 'csv' as const,
        includeMetadata: false
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const csvString = result as string;

      expect(csvString).toContain('=== USER PROFILE ===');
      expect(csvString).toContain('test@example.com');
      expect(csvString).toContain('Test User');
      
      expect(csvString).toContain('=== PERMISSIONS ===');
      expect(csvString).toContain('justsplit');
      
      expect(csvString).toContain('=== ACTIVITIES ===');
      expect(csvString).toContain('login');
      expect(csvString).toContain('data_export');
      
      expect(csvString).toContain('=== SESSIONS ===');
      expect(csvString).toContain('Mozilla/5.0');
      
      expect(csvString).toContain('=== AUTHORIZED APPLICATIONS ===');
      expect(csvString).toContain('justsplit');
    });

    it('should filter activities by date range', async () => {
      const options = {
        format: 'json' as const,
        dateRange: {
          start: new Date('2024-01-03'),
          end: new Date('2024-01-03')
        }
      };

      await dataExportService.exportUserData(mockUserId, options);

      expect(where).toHaveBeenCalledWith('timestamp', '>=', expect.any(Object));
      expect(where).toHaveBeenCalledWith('timestamp', '<=', expect.any(Object));
    });

    it('should sanitize sensitive data', async () => {
      const sensitiveData = {
        ...mockUserData,
        password: 'secret123',
        passwordHash: 'hash',
        salt: 'salt',
        sessionToken: 'token',
        refreshToken: 'refresh',
        apiKey: 'key',
        secretKey: 'secret'
      };

      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        empty: false,
        docs: [{ data: () => sensitiveData }]
      }));

      const options = {
        format: 'json' as const
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const parsedResult = JSON.parse(result as string);

      expect(parsedResult.profile).not.toHaveProperty('password');
      expect(parsedResult.profile).not.toHaveProperty('passwordHash');
      expect(parsedResult.profile).not.toHaveProperty('salt');
      expect(parsedResult.profile).not.toHaveProperty('sessionToken');
      expect(parsedResult.profile).not.toHaveProperty('refreshToken');
      expect(parsedResult.profile).not.toHaveProperty('apiKey');
      expect(parsedResult.profile).not.toHaveProperty('secretKey');
    });

    it('should handle export errors gracefully', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      const options = {
        format: 'json' as const
      };

      await expect(
        dataExportService.exportUserData(mockUserId, options)
      ).rejects.toThrow('Failed to export user data');
    });
  });

  describe('getExportFilename', () => {
    it('should generate JSON filename with current date', () => {
      const mockDate = new Date('2024-01-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      const filename = dataExportService.getExportFilename('json');
      expect(filename).toBe('cybereco-data-export-2024-01-15.json');
    });

    it('should generate CSV filename with current date', () => {
      const mockDate = new Date('2024-01-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      const filename = dataExportService.getExportFilename('csv');
      expect(filename).toBe('cybereco-data-export-2024-01-15.csv');
    });
  });

  describe('CSV formatting', () => {
    it('should escape CSV values with commas', async () => {
      const dataWithComma = {
        ...mockUserData,
        displayName: 'User, Test'
      };

      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        empty: false,
        docs: [{ data: () => dataWithComma }]
      }));

      const options = {
        format: 'csv' as const
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const csvString = result as string;

      expect(csvString).toContain('"User, Test"');
    });

    it('should escape CSV values with quotes', async () => {
      const dataWithQuotes = {
        ...mockUserData,
        displayName: 'Test "User" Name'
      };

      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        empty: false,
        docs: [{ data: () => dataWithQuotes }]
      }));

      const options = {
        format: 'csv' as const
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const csvString = result as string;

      expect(csvString).toContain('"Test ""User"" Name"');
    });

    it('should handle null and undefined values in CSV', async () => {
      const dataWithNulls = {
        ...mockUserData,
        displayName: null,
        photoURL: undefined
      };

      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        empty: false,
        docs: [{ data: () => dataWithNulls }]
      }));

      const options = {
        format: 'csv' as const
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const csvString = result as string;

      // Should have empty values for null/undefined
      expect(csvString).toMatch(/,,/);
    });
  });

  describe('Timestamp conversion', () => {
    it('should convert Firestore timestamps to ISO strings', async () => {
      const options = {
        format: 'json' as const
      };

      const result = await dataExportService.exportUserData(mockUserId, options);
      const parsedResult = JSON.parse(result as string);

      expect(parsedResult.profile.createdAt).toBe('2024-01-01T00:00:00.000Z');
      expect(parsedResult.permissions[0].grantedAt).toBe('2024-01-02T00:00:00.000Z');
      expect(parsedResult.activities[0].timestamp).toBe('2024-01-03T00:00:00.000Z');
    });
  });
});