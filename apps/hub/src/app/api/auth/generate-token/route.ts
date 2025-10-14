import { NextRequest, NextResponse } from 'next/server';
import { authLogger, AuthEventType } from '@cybereco/auth';
import { jwtService } from '../../../../../../../libs/auth/src/services/serverOnly/jwtService.server';
import type { AuthUser } from '@cybereco/auth';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_HUB_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No authorization token' }, { status: 401 });
    }

    const idToken = authHeader.substring(7);
    
    // Verify the Firebase ID token using admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken).catch(() => null);
    
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get request body
    const { appId, appUrl } = await request.json();
    
    if (!appId || !appUrl) {
      return NextResponse.json({ error: 'Missing appId or appUrl' }, { status: 400 });
    }

    // Create AuthUser from decoded token
    const authUser: AuthUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name,
      photoURL: decodedToken.picture || null,
      emailVerified: decodedToken.email_verified || false
    };

    // Generate short-lived JWT for cross-app auth
    const tokenPair = await jwtService.generateTokens(authUser.uid, {
      email: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
      emailVerified: authUser.emailVerified
    });
    
    // Log token generation
    authLogger.logTokenGenerated(authUser.uid, 'access', 300); // 5 minutes
    
    // Generate app URL with auth token
    const url = new URL(appUrl);
    url.searchParams.set('authToken', tokenPair.accessToken);
    url.searchParams.set('fromHub', 'true');
    url.searchParams.set('appId', appId);
    url.searchParams.set('timestamp', Date.now().toString());
    
    // Log cross-app navigation
    authLogger.logCrossAppNavigation('hub', appId, authUser.uid);
    
    return NextResponse.json({ 
      url: url.toString(),
      token: tokenPair.accessToken 
    });
  } catch (error) {
    console.error('Error generating auth token:', error);
    return NextResponse.json({ 
      error: 'Failed to generate auth token' 
    }, { status: 500 });
  }
}