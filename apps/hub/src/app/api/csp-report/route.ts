import { NextRequest, NextResponse } from 'next/server';
import { authLogger, AuthEventType } from '@cybereco/auth';

export async function POST(request: NextRequest) {
  try {
    const report = await request.json();
    
    // Log CSP violation
    console.error('CSP Violation:', JSON.stringify(report, null, 2));
    
    // In production, you might want to:
    // 1. Send to a logging service (e.g., Sentry, LogRocket)
    // 2. Store in a database for analysis
    // 3. Send alerts for critical violations
    
    if (report['csp-report']) {
      const violation = report['csp-report'];
      
      authLogger.logSessionEvent(AuthEventType.AUTH_ERROR, undefined, {
        type: 'csp_violation',
        documentUri: violation['document-uri'],
        violatedDirective: violation['violated-directive'],
        effectiveDirective: violation['effective-directive'],
        originalPolicy: violation['original-policy'],
        blockedUri: violation['blocked-uri'],
        sourceFile: violation['source-file'],
        lineNumber: violation['line-number'],
        columnNumber: violation['column-number']
      });
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return new NextResponse(null, { status: 500 });
  }
}

// CSP reports use a different content type
export const runtime = 'nodejs';
export const preferredRegion = 'auto';