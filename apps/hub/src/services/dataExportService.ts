import { getHubAuth, getHubFirestore } from '@cybereco/firebase-config';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';

export interface ExportOptions {
  format: 'json' | 'csv';
  includeMetadata?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  dataTypes?: string[];
}

export interface UserDataExport {
  profile: any;
  permissions: any[];
  activities: any[];
  sessions: any[];
  applications: any[];
  metadata?: {
    exportDate: string;
    userId: string;
    version: string;
  };
}

class DataExportService {
  private static instance: DataExportService;

  private constructor() {}

  static getInstance(): DataExportService {
    if (!DataExportService.instance) {
      DataExportService.instance = new DataExportService();
    }
    return DataExportService.instance;
  }

  /**
   * Export all user data in the specified format
   */
  async exportUserData(userId: string, options: ExportOptions): Promise<string | Blob> {
    try {
      const userData = await this.collectUserData(userId, options);
      
      if (options.format === 'json') {
        return this.exportAsJSON(userData, options);
      } else {
        return this.exportAsCSV(userData, options);
      }
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw new Error('Failed to export user data');
    }
  }

  /**
   * Collect all user data from various collections
   */
  private async collectUserData(userId: string, options: ExportOptions): Promise<UserDataExport> {
    const userData: UserDataExport = {
      profile: {},
      permissions: [],
      activities: [],
      sessions: [],
      applications: []
    };

    const db = getHubFirestore();

    // Get user profile
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('uid', '==', userId));
    const userSnapshot = await getDocs(userQuery);
    
    if (!userSnapshot.empty) {
      userData.profile = this.sanitizeData(userSnapshot.docs[0].data());
    }

    // Get permissions
    const permissionsRef = collection(db, 'permissions');
    const permissionsQuery = query(permissionsRef, where('userId', '==', userId));
    const permissionsSnapshot = await getDocs(permissionsQuery);
    
    userData.permissions = permissionsSnapshot.docs.map(doc => 
      this.sanitizeData({ id: doc.id, ...doc.data() })
    );

    // Get activities with date range filter if specified
    const activitiesRef = collection(db, 'activities');
    let activitiesQuery = query(
      activitiesRef, 
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    if (options.dateRange) {
      activitiesQuery = query(
        activitiesRef,
        where('userId', '==', userId),
        where('timestamp', '>=', Timestamp.fromDate(options.dateRange.start)),
        where('timestamp', '<=', Timestamp.fromDate(options.dateRange.end)),
        orderBy('timestamp', 'desc')
      );
    }

    const activitiesSnapshot = await getDocs(activitiesQuery);
    userData.activities = activitiesSnapshot.docs.map(doc => 
      this.sanitizeData({ id: doc.id, ...doc.data() })
    );

    // Get sessions
    const sessionsRef = collection(db, 'sessions');
    const sessionsQuery = query(
      sessionsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(100) // Limit to last 100 sessions
    );
    const sessionsSnapshot = await getDocs(sessionsQuery);
    
    userData.sessions = sessionsSnapshot.docs.map(doc => 
      this.sanitizeData({ id: doc.id, ...doc.data() })
    );

    // Get authorized applications
    const appsRef = collection(db, 'userApplications');
    const appsQuery = query(appsRef, where('userId', '==', userId));
    const appsSnapshot = await getDocs(appsQuery);
    
    userData.applications = appsSnapshot.docs.map(doc => 
      this.sanitizeData({ id: doc.id, ...doc.data() })
    );

    // Add metadata if requested
    if (options.includeMetadata) {
      userData.metadata = {
        exportDate: new Date().toISOString(),
        userId: userId,
        version: '1.0.0'
      };
    }

    return userData;
  }

  /**
   * Sanitize data by removing sensitive fields
   */
  private sanitizeData(data: any): any {
    const sanitized = { ...data };
    
    // Remove sensitive fields
    delete sanitized.password;
    delete sanitized.passwordHash;
    delete sanitized.salt;
    delete sanitized.sessionToken;
    delete sanitized.refreshToken;
    delete sanitized.apiKey;
    delete sanitized.secretKey;
    
    // Convert Firestore timestamps to ISO strings
    Object.keys(sanitized).forEach(key => {
      if (sanitized[key] && sanitized[key].toDate) {
        sanitized[key] = sanitized[key].toDate().toISOString();
      }
    });
    
    return sanitized;
  }

  /**
   * Export data as JSON
   */
  private exportAsJSON(data: UserDataExport, options: ExportOptions): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Export data as CSV
   */
  private exportAsCSV(data: UserDataExport, options: ExportOptions): string {
    const csvParts: string[] = [];
    
    // Profile section
    csvParts.push('=== USER PROFILE ===');
    csvParts.push(this.objectToCSV(data.profile));
    csvParts.push('');
    
    // Permissions section
    if (data.permissions.length > 0) {
      csvParts.push('=== PERMISSIONS ===');
      csvParts.push(this.arrayToCSV(data.permissions));
      csvParts.push('');
    }
    
    // Activities section
    if (data.activities.length > 0) {
      csvParts.push('=== ACTIVITIES ===');
      csvParts.push(this.arrayToCSV(data.activities));
      csvParts.push('');
    }
    
    // Sessions section
    if (data.sessions.length > 0) {
      csvParts.push('=== SESSIONS ===');
      csvParts.push(this.arrayToCSV(data.sessions));
      csvParts.push('');
    }
    
    // Applications section
    if (data.applications.length > 0) {
      csvParts.push('=== AUTHORIZED APPLICATIONS ===');
      csvParts.push(this.arrayToCSV(data.applications));
    }
    
    return csvParts.join('\n');
  }

  /**
   * Convert object to CSV format
   */
  private objectToCSV(obj: any): string {
    const keys = Object.keys(obj);
    const values = keys.map(key => this.escapeCSVValue(obj[key]));
    
    return keys.join(',') + '\n' + values.join(',');
  }

  /**
   * Convert array of objects to CSV format
   */
  private arrayToCSV(arr: any[]): string {
    if (arr.length === 0) return '';
    
    const keys = Object.keys(arr[0]);
    const header = keys.join(',');
    
    const rows = arr.map(item => 
      keys.map(key => this.escapeCSVValue(item[key])).join(',')
    );
    
    return [header, ...rows].join('\n');
  }

  /**
   * Escape CSV values
   */
  private escapeCSVValue(value: any): string {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // Escape quotes and wrap in quotes if contains comma, newline, or quotes
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  }

  /**
   * Download exported data
   */
  downloadExport(data: string | Blob, filename: string, mimeType: string): void {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get suggested filename for export
   */
  getExportFilename(format: 'json' | 'csv'): string {
    const date = new Date().toISOString().split('T')[0];
    return `cybereco-data-export-${date}.${format}`;
  }
}

export const dataExportService = DataExportService.getInstance();