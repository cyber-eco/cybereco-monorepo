import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authRateLimiter, authLogger } from '@cybereco/auth';
import { jwtService } from '../../../../../../../libs/auth/src/services/serverOnly/jwtService.server';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getHubAuth } from '@cybereco/firebase-config';

export async function POST(request: NextRequest) {
  return authRateLimiter(request as any, async (req): Promise<any> => {
    const startTime = Date.now();
    let email = '';
    
    try {
      const body = await req.json();
      email = body.email;
      const password = body.password;

      if (!email || !password) {
        authLogger.logLoginFailure(email || 'unknown', 'missing-credentials', 'Missing credentials');
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      // Attempt Firebase authentication
      const auth = getHubAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate JWT tokens
      const tokenPair = await jwtService.generateTokens(user.uid, {
        email: user.email || '',
        displayName: user.displayName || '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || '',
        permissions: [],
        apps: []
      });

      // Log successful login
      authLogger.logLoginSuccess(
        user.uid,
        user.email || '',
        Date.now() - startTime,
        {
          ip: req.headers.get('x-forwarded-for') || 'unknown',
          userAgent: req.headers.get('user-agent') || 'unknown'
        }
      );

      // Set secure HTTP-only cookies
      const response = NextResponse.json({
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        },
        accessToken: tokenPair.accessToken
      });

      // Set refresh token as HTTP-only cookie
      response.cookies.set({
        name: 'refresh_token',
        value: tokenPair.refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      return response;
    } catch (error: any) {
      authLogger.logLoginFailure(
        email,
        error.code || 'unknown',
        error.message || 'Authentication failed'
      );

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      if (error.code === 'auth/too-many-requests') {
        return NextResponse.json(
          { error: 'Too many failed attempts. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  }) as any;
}