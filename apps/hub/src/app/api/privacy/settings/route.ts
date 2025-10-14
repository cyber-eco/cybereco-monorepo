import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getHubAuth } from '@cybereco/firebase-config';
import { privacyAwareDataService } from '../../../../../../../libs/auth/src/services/serverOnly/privacyAwareDataService.server';

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

    const settings = await privacyAwareDataService.getUserPrivacySettings(user.uid);
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching privacy settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch privacy settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = getHubAuth();
    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settings = await request.json();
    await privacyAwareDataService.updatePrivacySettings(user.uid, settings);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    return NextResponse.json(
      { error: 'Failed to update privacy settings' },
      { status: 500 }
    );
  }
}