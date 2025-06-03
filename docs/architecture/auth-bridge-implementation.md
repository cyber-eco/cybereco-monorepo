# Auth Bridge Implementation

## Overview

The Auth Bridge is a fallback mechanism to ensure reliable authentication state transfer between Hub and ecosystem apps (like JustSplit) when the primary shared auth state mechanism fails due to timing issues.

## Problem Statement

The redirect loop issue occurred because:
1. Hub was clearing shared auth state when navigating away
2. JustSplit couldn't find auth data when launched with `?fromHub=true`
3. This caused an infinite redirect loop between Hub and JustSplit

## Solution Architecture

### 1. Auth Bridge Service (Hub)
**Location**: `/apps/hub/src/services/auth-bridge.ts`

```typescript
export async function prepareAuthForApp(user: SharedAuthUser, targetApp: string): Promise<void>
```

- Saves auth to both shared state AND bridge storage
- Includes timestamp for expiry (30 seconds)
- Verifies data was saved before navigation

### 2. Auth Bridge Service (JustSplit)
**Location**: `/apps/justsplit/src/services/auth-bridge.ts`

```typescript
export function getAuthFromAnySource(): SharedAuthUser | null
```

- Checks shared auth first (primary mechanism)
- Falls back to auth bridge if shared auth not found
- Validates bridge data isn't expired
- Clears bridge data after successful use

### 3. Updated Components

#### Hub Components:
- **AppGrid**: Uses `prepareAuthForApp()` before launching apps
- **AuthContext**: Preserves shared auth during navigation
- **Test Auth Page**: Includes auth bridge testing buttons

#### JustSplit Components:
- **AuthContext**: Uses `getAuthFromAnySource()` for Hub auth
- **JustSplitAuthContext**: Updated to check auth bridge
- **ProtectedRoute**: Enhanced debugging for auth flow

## Data Flow

1. User clicks app in Hub's AppGrid
2. Hub calls `prepareAuthForApp()` which:
   - Saves to `cybereco-shared-auth` (primary)
   - Saves to `cybereco-auth-bridge` (fallback)
   - Verifies both were saved
3. Hub navigates to JustSplit with `?fromHub=true`
4. JustSplit calls `getAuthFromAnySource()` which:
   - Checks `cybereco-shared-auth` first
   - Falls back to `cybereco-auth-bridge` if needed
   - Returns auth data if found and valid
5. JustSplit creates session with Hub user data
6. Bridge data is cleared after successful use

## Storage Format

### Shared Auth State
```json
{
  "user": {
    "uid": "user-id",
    "email": "user@example.com",
    "displayName": "User Name",
    "photoURL": null,
    "emailVerified": true
  },
  "timestamp": 1736268000000
}
```

### Auth Bridge Data
```json
{
  "user": {
    "uid": "user-id",
    "email": "user@example.com",
    "displayName": "User Name",
    "photoURL": null,
    "emailVerified": true
  },
  "timestamp": 1736268000000,
  "targetApp": "justsplit"
}
```

## Testing

### Manual Testing
1. Start dev environment: `npm run dev`
2. Navigate to Hub test page: `http://localhost:40000/test-auth`
3. Sign in to Hub
4. Click "🌉 Test Auth Bridge" to verify bridge saves correctly
5. Click "🚀 Launch JustSplit" to test full flow
6. Verify no redirect loop occurs

### Debug Tools
- **Test Auth Page**: `/test-auth` in Hub for testing auth state
- **Debug Auth Panel**: Visual component showing auth state in JustSplit
- **Console Scripts**: `/scripts/test-auth-bridge.js` for browser console testing

### Verification Commands
```javascript
// Check auth bridge in browser console
localStorage.getItem('cybereco-auth-bridge')
localStorage.getItem('cybereco-shared-auth')
```

## Benefits

1. **Reliability**: Dual storage ensures auth survives timing issues
2. **Timeout Protection**: 30-second expiry prevents stale auth
3. **Backward Compatible**: Falls back gracefully if bridge not available
4. **Debug-Friendly**: Comprehensive logging throughout the flow

## Future Improvements

1. **Custom Tokens**: Replace anonymous auth with Firebase custom tokens
2. **Encryption**: Add encryption for sensitive auth data
3. **Cross-Domain**: Support for apps on different domains
4. **Metrics**: Add telemetry to track auth bridge usage