# Production Authentication Setup

This document describes how to configure authentication for production deployment using Firebase Hosting with custom domains and subdomains.

## Overview

In production, CyberEco uses subdomain-based authentication where:
- Hub runs on `hub.cybere.co` (or main domain `cybere.co`)
- JustSplit runs on `justsplit.cybere.co`
- Other apps run on their respective subdomains

Authentication is shared across subdomains using:
1. Shared authentication state in localStorage (for development)
2. Firebase Authentication with custom domains (for production)
3. Secure cookies with domain-wide scope (future enhancement)

## Development vs Production

### Development (localhost)
- Hub: `http://localhost:40000`
- JustSplit: `http://localhost:40002`
- Website: `http://localhost:40001`
- Uses shared auth state via localStorage
- Firebase Auth emulator limitations require workarounds

### Production (subdomains)
- Hub: `https://hub.cybere.co` or `https://cybere.co`
- JustSplit: `https://justsplit.cybere.co`
- Website: `https://www.cybere.co`
- Uses Firebase Auth with custom domains
- Cookies can be shared across subdomains

## Firebase Configuration

### 1. Configure Custom Domains

In Firebase Console for each project:

```bash
# Hub project
firebase hosting:channel:deploy production --project cybereco-hub

# JustSplit project  
firebase hosting:channel:deploy production --project cybereco-justsplit

# Website project
firebase hosting:channel:deploy production --project cybereco-website
```

### 2. Add Authorized Domains

In Firebase Console > Authentication > Settings > Authorized domains:
- Add `cybere.co`
- Add `*.cybere.co`
- Add specific subdomains: `hub.cybere.co`, `justsplit.cybere.co`, etc.

### 3. Configure CORS

Update Firebase Storage rules to allow cross-origin requests:

```javascript
// storage.rules
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
      
      // Allow CORS from subdomains
      allow read: if request.auth == null 
        && request.headers['origin'].matches('https://.*\\.cybere\\.co');
    }
  }
}
```

## Environment Variables

### Hub (.env.production)
```bash
NEXT_PUBLIC_HUB_URL=https://hub.cybere.co
NEXT_PUBLIC_JUSTSPLIT_URL=https://justsplit.cybere.co
NEXT_PUBLIC_WEBSITE_URL=https://www.cybere.co

# Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cybere.co
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cybereco-hub
# ... other Firebase config
```

### JustSplit (.env.production)
```bash
NEXT_PUBLIC_HUB_URL=https://hub.cybere.co
NEXT_PUBLIC_APP_URL=https://justsplit.cybere.co

# Firebase config  
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cybere.co
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cybereco-justsplit
# ... other Firebase config
```

## Authentication Flow

### 1. Initial Sign In (Hub)
```typescript
// User signs in at hub.cybere.co
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Save to shared auth state
saveSharedAuthState({
  uid: userCredential.user.uid,
  email: userCredential.user.email,
  displayName: userCredential.user.displayName,
  photoURL: userCredential.user.photoURL,
  emailVerified: userCredential.user.emailVerified
});

// Firebase Auth automatically handles session cookies
```

### 2. App Launch (from Hub to JustSplit)
```typescript
// Hub redirects to JustSplit
window.location.href = 'https://justsplit.cybere.co?fromHub=true';

// JustSplit checks shared auth state
const sharedAuth = await waitForAuth(5000);
if (sharedAuth?.user) {
  // Create session with shared auth data
  // In production, Firebase Auth session persists across subdomains
}
```

### 3. Direct App Access
```typescript
// User directly visits justsplit.cybere.co
const sharedAuth = getSharedAuth();
if (!sharedAuth) {
  // Redirect to Hub for authentication
  window.location.href = 'https://hub.cybere.co/auth/signin?returnUrl=https://justsplit.cybere.co';
}
```

## Security Considerations

### 1. Domain Validation
- Always validate the origin domain in production
- Use environment variables for allowed domains
- Implement CSRF protection

### 2. Token Security
- Use secure, httpOnly cookies in production
- Implement token rotation
- Set appropriate expiration times

### 3. Cross-Origin Security
```typescript
// Validate origin in API calls
const allowedOrigins = [
  'https://cybere.co',
  'https://hub.cybere.co',
  'https://justsplit.cybere.co'
];

if (!allowedOrigins.includes(request.headers.origin)) {
  throw new Error('Unauthorized origin');
}
```

## Deployment Scripts

### Deploy All Apps
```bash
#!/bin/bash
# deploy-production.sh

# Build all apps
npm run build

# Deploy Hub
firebase deploy --only hosting:hub --project cybereco-hub

# Deploy JustSplit  
firebase deploy --only hosting:justsplit --project cybereco-justsplit

# Deploy Website
firebase deploy --only hosting:website --project cybereco-website
```

### Configure DNS

Add the following DNS records:

```
# A Records
@           A     <Firebase IP>
hub         A     <Firebase IP>
justsplit   A     <Firebase IP>
www         A     <Firebase IP>

# CNAME Records (alternative)
hub         CNAME cybereco-hub.web.app
justsplit   CNAME cybereco-justsplit.web.app
www         CNAME cybereco-website.web.app
```

## Testing Production Auth

1. **Test Cross-Domain Auth**
   ```bash
   # Sign in at hub
   curl -X POST https://hub.cybere.co/api/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   
   # Access JustSplit with auth
   curl https://justsplit.cybere.co/api/user \
     -H "Cookie: <auth-cookie-from-signin>"
   ```

2. **Test Direct Access**
   - Clear all cookies/storage
   - Visit https://justsplit.cybere.co directly
   - Should redirect to Hub sign in
   - After sign in, should redirect back to JustSplit

3. **Test Sign Out**
   - Sign out from any app
   - All apps should recognize the sign out

## Troubleshooting

### Common Issues

1. **"Cross-origin authentication error"**
   - Check authorized domains in Firebase Console
   - Verify CORS configuration
   - Check browser console for specific errors

2. **"Session not persisting across subdomains"**
   - Verify authDomain is set to root domain
   - Check cookie domain settings
   - Ensure HTTPS is used everywhere

3. **"Redirect loop"**
   - Check returnUrl validation
   - Verify auth state persistence
   - Check for conflicting redirects

### Debug Mode

Enable debug logging in production:

```typescript
// Add to app initialization
if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
  window.localStorage.setItem('debug', 'cybereco:auth:*');
}
```

## Future Enhancements

1. **Secure HTTP-Only Cookies**
   - Implement server-side session management
   - Use secure cookies for auth tokens
   - Remove dependency on localStorage

2. **Single Sign-On (SSO) Service**
   - Dedicated SSO endpoint
   - OAuth2/OIDC support
   - SAML integration for enterprise

3. **Multi-Factor Authentication**
   - SMS/Email verification
   - TOTP support
   - Hardware key support

4. **Session Management**
   - Active session monitoring
   - Remote session termination
   - Device management