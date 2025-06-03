import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Coming soon app routes
const COMING_SOON_APPS = {
  '/app/somos': 'Somos',
  '/app/demos': 'Demos', 
  '/app/plantopia': 'Plantopia'
};

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/apps', '/my-data', '/profile', '/settings', '/security', '/billing'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for auth state in cookies
    const authState = request.cookies.get('cybereco-hub-auth');
    
    if (!authState) {
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

  // Add security headers
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
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