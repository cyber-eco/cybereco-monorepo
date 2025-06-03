/**
 * Auth Bridge Service for JustSplit
 * Handles retrieving authentication from Hub
 */

import { getSharedAuth, type SharedAuthUser } from '@cybereco/auth';

const AUTH_BRIDGE_KEY = 'cybereco-auth-bridge';
const AUTH_BRIDGE_TIMEOUT = 30000; // 30 seconds

export interface AuthBridgeData {
  user: SharedAuthUser;
  timestamp: number;
  targetApp: string;
}

/**
 * Retrieve bridged auth data
 * Used as a fallback when shared auth isn't found
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
 * Try to get auth from any available source
 */
export function getAuthFromAnySource(): SharedAuthUser | null {
  console.log('🔍 Looking for auth from any source...');
  
  // First try shared auth
  const sharedAuth = getSharedAuth();
  if (sharedAuth) {
    console.log('✅ Found auth in shared storage');
    return sharedAuth;
  }
  
  // Then try auth bridge
  const bridgedAuth = getBridgedAuth();
  if (bridgedAuth && bridgedAuth.targetApp === 'justsplit') {
    console.log('✅ Found auth in bridge storage');
    return bridgedAuth.user;
  }
  
  console.log('❌ No auth found in any source');
  return null;
}

/**
 * Clear bridge data after successful auth
 */
export function clearBridgedAuth(): void {
  localStorage.removeItem(AUTH_BRIDGE_KEY);
}