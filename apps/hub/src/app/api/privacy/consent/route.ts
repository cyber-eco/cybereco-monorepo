import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getHubAuth } from '@cybereco/firebase-config';
import { gdprService } from '../../../../../../../libs/auth/src/services/serverOnly/gdprService.server';
import { ConsentType } from '@cybereco/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = getHubAuth();
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const consent = await gdprService.getUserConsent(user.uid);
    
    return NextResponse.json(consent);
  } catch (error) {
    console.error('Error fetching consent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consent' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = getHubAuth();
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { consentType, granted } = await request.json();
    await gdprService.recordConsent(user.uid, consentType as ConsentType, granted);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording consent:', error);
    return NextResponse.json(
      { error: 'Failed to record consent' },
      { status: 500 }
    );
  }
}