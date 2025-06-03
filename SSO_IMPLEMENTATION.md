# Single Sign-On (SSO) Implementation

## Overview

The CyberEco platform implements a secure Single Sign-On (SSO) system where the Hub serves as the central authentication provider for all ecosystem applications. This document details the implementation, focusing on the cross-origin authentication challenge.

## The Cross-Origin Challenge

**Problem**: Hub runs on port 40000 and JustSplit runs on port 40002. Browsers treat different ports as different origins, preventing localStorage sharing.

**Solutions Implemented**:
1. **Auth Token via URL** (Primary) - Secure, time-limited tokens passed through URL parameters
2. **Auth Bridge** (Fallback) - Backup mechanism for same-origin scenarios
3. **Shared Auth State** (Legacy) - Works only on same origin

## Auth Token Implementation

### Hub Side (Token Generation)

**File**: `/apps/hub/src/services/authTokenService.ts`

```typescript
// Generate secure auth URL with token
const targetUrl = await AuthTokenService.generateAppUrl(
  app.url,
  sharedUser,
  app.id
);
```

**Token Structure**:
- User authentication data
- Timestamp and 30-second expiry
- SHA-256 signature for integrity
- Base64URL encoded for URL safety

### JustSplit Side (Token Processing)

**File**: `/apps/justsplit/src/services/authTokenService.ts`

```typescript
// Process auth token from URL
const authUser = await AuthTokenService.processUrlAuthToken();
```

**Processing Steps**:
1. Extract token from URL parameters
2. Verify signature and expiry
3. Save auth to shared state
4. Create backup in localStorage
5. Clear sensitive URL parameters

## Authentication Flow

```
1. User clicks app in Hub
2. Hub generates auth token with user data
3. Hub creates URL with auth token parameter
4. Browser navigates to JustSplit with token
5. JustSplit verifies and processes token
6. JustSplit creates anonymous Firebase session
7. User is authenticated in JustSplit
```

## Testing SSO

### Manual Testing Steps

1. **Start Development Environment**:
   ```bash
   npm run dev
   ```

2. **Access Hub Test Page**:
   - Navigate to: `http://localhost:40000/test-auth`
   - Sign in if needed

3. **Test Auth Token Method**:
   - Click "🔐 Launch with Auth Token" button
   - Verify JustSplit loads without redirect loop
   - Check console for auth token logs

4. **Test from AppGrid**:
   - Go to Hub dashboard: `http://localhost:40000`
   - Click on JustSplit app
   - Verify seamless authentication

### Debug Commands

**In Browser Console**:

```javascript
// Check auth token in URL (JustSplit)
new URLSearchParams(window.location.search).get('authToken')

// Check processed auth (JustSplit)
localStorage.getItem('hub-auth-backup')

// Check shared auth (both apps)
localStorage.getItem('cybereco-shared-auth')
```

### Common Issues & Solutions

1. **"No auth found" in JustSplit**:
   - Verify auth token is in URL
   - Check token hasn't expired (30s limit)
   - Ensure SECRET_KEY matches in both services

2. **Redirect Loop**:
   - Clear all localStorage: `localStorage.clear()`
   - Check ProtectedRoute timeout (5s)
   - Verify fromHub parameter is set

3. **Token Signature Mismatch**:
   - Ensure both services use same SECRET_KEY
   - Check for URL encoding issues
   - Verify token hasn't been modified

## Security Considerations

1. **Token Expiry**: 30 seconds prevents token replay attacks
2. **Signature Verification**: SHA-256 ensures token integrity
3. **URL Clearing**: Sensitive data removed after processing
4. **HTTPS Required**: In production, use HTTPS to prevent token interception

## Future Improvements

1. **Firebase Custom Tokens**: Replace anonymous auth with custom tokens
2. **Refresh Tokens**: Implement token refresh mechanism
3. **Cross-Domain Support**: Use postMessage API for true cross-domain SSO
4. **Token Encryption**: Add encryption layer for sensitive data

## Related Files

- Hub Auth Context: `/apps/hub/src/components/AuthContext.tsx`
- JustSplit Auth Context: `/apps/justsplit/src/context/AuthContext.tsx`
- JustSplit Protected Route: `/apps/justsplit/src/components/Auth/ProtectedRoute.tsx`
- Auth Bridge (Fallback): `/apps/hub/src/services/auth-bridge.ts`