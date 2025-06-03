/**
 * Auth Bridge Service
 * Handles authentication state transfer between Hub and apps
 */

import { saveSharedAuthState, type SharedAuthUser } from '@cybereco/auth';

const AUTH_BRIDGE_KEY = 'cybereco-auth-bridge';
const AUTH_BRIDGE_TIMEOUT = 30000; // 30 seconds

export interface AuthBridgeData {
  user: SharedAuthUser;
  timestamp: number;
  targetApp: string;
}

/**
 * Prepare auth state for app launch
 * This ensures auth is saved and ready before navigation
 */
export async function prepareAuthForApp(user: SharedAuthUser, targetApp: string): Promise<void> {
  console.log('🌉 Auth Bridge: Preparing auth for', targetApp);
  
  // Save to shared auth state
  saveSharedAuthState(user);
  
  // Also save to bridge storage as backup
  const bridgeData: AuthBridgeData = {
    user,
    timestamp: Date.now(),
    targetApp
  };
  
  localStorage.setItem(AUTH_BRIDGE_KEY, JSON.stringify(bridgeData));
  
  // Verify it was saved
  const saved = localStorage.getItem('cybereco-shared-auth');
  const bridge = localStorage.getItem(AUTH_BRIDGE_KEY);
  
  console.log('🌉 Auth Bridge: Verification', {
    sharedAuthSaved: !!saved,
    bridgeSaved: !!bridge
  });
  
  // Give it a moment to persist
  await new Promise(resolve => setTimeout(resolve, 100));
}

/**
 * Retrieve bridged auth data
 * Apps can use this as a fallback if shared auth isn't found
 */
export function getBridgedAuth(): AuthBridgeData | null {
  try {
    const data = localStorage.getItem(AUTH_BRIDGE_KEY);
    if (!data) return null;
    
    const bridgeData = JSON.parse(data) as AuthBridgeData;
    
    // Check if it's still valid
    const age = Date.now() - bridgeData.timestamp;
    if (age > AUTH_BRIDGE_TIMEOUT) {
      console.log('🌉 Auth Bridge: Data expired', age, 'ms old');
      localStorage.removeItem(AUTH_BRIDGE_KEY);
      return null;
    }
    
    return bridgeData;
  } catch (error) {
    console.error('🌉 Auth Bridge: Error retrieving data', error);
    return null;
  }
}

/**
 * Clear bridge data after successful auth
 */
export function clearBridgedAuth(): void {
  localStorage.removeItem(AUTH_BRIDGE_KEY);
}