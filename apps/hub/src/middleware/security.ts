import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function applySecurityHeaders(request: NextRequest, response: NextResponse): NextResponse {
  // Clone the response to modify headers
  const secureResponse = response;

  // Content Security Policy
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const connectSources = [
    "'self'",
    "https://*.firebaseio.com",
    "https://*.firebaseapp.com",
    "wss://*.firebaseio.com",
    "https://identitytoolkit.googleapis.com"
  ];
  
  // Add Firebase emulator URLs in development
  if (isDevelopment) {
    connectSources.push(
      "http://localhost:*",     // All localhost HTTP connections
      "ws://localhost:*",       // All localhost WebSocket connections
      "http://127.0.0.1:*",     // All 127.0.0.1 HTTP connections
      "ws://127.0.0.1:*"        // All 127.0.0.1 WebSocket connections
    );
  }
  
  const frameSources = ["'self'", "https://*.firebaseapp.com"];
  if (isDevelopment) {
    frameSources.push("http://localhost:9099"); // Auth emulator UI
  }
  
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    `connect-src ${connectSources.join(' ')}`,
    `frame-src ${frameSources.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isDevelopment ? "" : "upgrade-insecure-requests"  // Don't upgrade in dev
  ].filter(Boolean);

  // Apply CSP header
  secureResponse.headers.set(
    'Content-Security-Policy',
    cspDirectives.join('; ')
  );

  // Strict Transport Security (HSTS)
  secureResponse.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // X-Frame-Options
  secureResponse.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options
  secureResponse.headers.set('X-Content-Type-Options', 'nosniff');

  // X-XSS-Protection
  secureResponse.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer-Policy
  secureResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy (formerly Feature-Policy)
  const permissionsPolicies = [
    'accelerometer=()',
    'camera=()',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'payment=()',
    'usb=()'
  ];

  secureResponse.headers.set(
    'Permissions-Policy',
    permissionsPolicies.join(', ')
  );

  // Remove potentially dangerous headers
  secureResponse.headers.delete('X-Powered-By');
  secureResponse.headers.delete('Server');

  return secureResponse;
}

// Report URI configuration for CSP violations
export function getCSPReportUri(): string {
  // In production, this should point to a real CSP reporting endpoint
  return process.env.CSP_REPORT_URI || '/api/csp-report';
}

// Generate nonce for inline scripts
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString('base64');
}

// Apply security headers based on environment
export function shouldApplyStrictCSP(): boolean {
  return process.env.NODE_ENV === 'production';
}