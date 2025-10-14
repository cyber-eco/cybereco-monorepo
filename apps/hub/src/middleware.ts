import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders } from './middleware/security';
import { applyPrivacyHeaders } from './middleware/dataVisibility';

// Coming soon app routes
const COMING_SOON_APPS = {
  '/app/somos': 'Somos',
  '/app/demos': 'Demos', 
  '/app/plantopia': 'Plantopia'
};

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/apps', '/my-data', '/profile', '/settings', '/security', '/billing', '/auth-logs'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for auth state in cookies
    const authState = request.cookies.get('cybereco-hub-auth');
    
    if (!authState) {
      // Note: Logging removed from middleware due to Edge Runtime limitations
      // Auth logging should be done in API routes or server components
      
      // Redirect to landing page with return URL
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Check if the request is for a coming soon app
  for (const [route, appName] of Object.entries(COMING_SOON_APPS)) {
    if (pathname.startsWith(route)) {
      return NextResponse.redirect(new URL('/coming-soon?app=' + appName.toLowerCase(), request.url));
    }
  }

  // Create response
  const response = NextResponse.next();
  
  // Apply comprehensive security headers
  let secureResponse = applySecurityHeaders(request, response);

  // Apply privacy headers for data endpoints
  if (pathname.startsWith('/api/')) {
    secureResponse = applyPrivacyHeaders(secureResponse);
  }

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    // Allow specific origins in production
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://hub.cybere.co', 'https://cybere.co', 'https://justsplit.cybere.co']
      : ['http://localhost:40000', 'http://localhost:40001', 'http://localhost:40002'];
    
    const origin = request.headers.get('origin');
    if (origin && allowedOrigins.includes(origin)) {
      secureResponse.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    secureResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    secureResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    secureResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return secureResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};