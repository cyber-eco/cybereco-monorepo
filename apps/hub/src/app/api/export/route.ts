import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dataExportService, type ExportOptions } from '../../../services/dataExportService';
import { exportRateLimiter } from '@cybereco/auth';
import { jwtService } from '../../../../../../libs/auth/src/services/serverOnly/jwtService.server';

export async function POST(request: NextRequest) {
  return exportRateLimiter(request as any, async (req): Promise<any> => {
    try {
      // Get auth token from headers
      const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify token
    let decodedToken;
    try {
      decodedToken = await jwtService.verifyAccessToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const userId = decodedToken.userId || decodedToken.sub || '';
    
    // Parse request body
    const body = await req.json();
    const options: ExportOptions = {
      format: body.format || 'json',
      includeMetadata: body.includeMetadata !== false,
      dateRange: body.dateRange ? {
        start: new Date(body.dateRange.start),
        end: new Date(body.dateRange.end)
      } : undefined,
      dataTypes: body.dataTypes
    };

    // Export data
    const exportData = await dataExportService.exportUserData(userId, options);
    
    // Set appropriate headers
    const mimeType = options.format === 'json' 
      ? 'application/json' 
      : 'text/csv';
    
    const filename = dataExportService.getExportFilename(options.format);
    
    return new NextResponse(exportData as string, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
    } catch (error) {
      console.error('Export error:', error);
      return NextResponse.json(
        { error: 'Export failed', message: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  });
}

export async function GET(request: NextRequest) {
  return exportRateLimiter(request as any, async (req): Promise<any> => {
    try {
      // Get auth token from headers
      const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify token
    let decodedToken;
    try {
      decodedToken = await jwtService.verifyAccessToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return export options information
    return NextResponse.json({
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
    } catch (error) {
      console.error('Export info error:', error);
      return NextResponse.json(
        { error: 'Failed to get export information' },
        { status: 500 }
      );
    }
  }) as any;
}