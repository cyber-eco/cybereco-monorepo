import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { apiRateLimiter, authLogger } from '@cybereco/auth';
import { jwtService } from '../../../../../../../libs/auth/src/services/serverOnly/jwtService.server';

export async function POST(request: NextRequest) {
  return apiRateLimiter(request as any, async (req): Promise<any> => {
    try {
      // Get refresh token from cookie
      const refreshToken = req.cookies.get('refresh_token')?.value;

      if (!refreshToken) {
        authLogger.logTokenError('refresh', 'No refresh token provided');
        return NextResponse.json(
          { error: 'Refresh token required' },
          { status: 401 }
        );
      }

      // Verify and refresh tokens
      const newTokenPair = await jwtService.refreshTokens(refreshToken);

      // Note: We don't have the userId here, but we can log the success
      authLogger.logTokenVerified('refresh-token-user', 'refresh');

      const response = NextResponse.json({
        success: true,
        accessToken: newTokenPair.accessToken
      });

      // Update refresh token cookie
      response.cookies.set({
        name: 'refresh_token',
        value: newTokenPair.refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      return response;
    } catch (error: any) {
      authLogger.logTokenError('refresh', error.message);
      
      if (error.message.includes('expired') || error.message.includes('invalid')) {
        return NextResponse.json(
          { error: 'Invalid or expired refresh token' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Token refresh failed' },
        { status: 500 }
      );
    }
  }) as any;
}