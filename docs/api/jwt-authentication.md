# JWT Authentication API Documentation

## Overview

CyberEco uses JSON Web Tokens (JWT) for secure authentication across all applications. This replaces the previous simple token system with industry-standard JWT tokens that provide better security, scalability, and features.

## Key Features

- **Secure token generation** with HS256 algorithm
- **Short-lived access tokens** (1 hour) with longer refresh tokens (7 days)
- **Cross-app authentication** with shared audience claims
- **CSRF protection** for form submissions
- **Automatic token refresh** before expiry
- **Secure cookie management** with HttpOnly and SameSite flags

## JWT Token Structure

### Access Token Payload

```typescript
interface JWTPayload {
  sub: string;        // User ID
  email: string;      // User email
  name: string;       // Display name
  iss: string;        // Issuer (always 'cybereco-hub')
  aud: string[];      // Audience ['cybereco-hub', 'cybereco-justsplit', 'cybereco-website']
  iat: number;        // Issued at (Unix timestamp)
  exp: number;        // Expiry (Unix timestamp)
  permissions?: string[];  // User permissions
  apps?: string[];    // Authorized apps
}
```

### Refresh Token Payload

```typescript
interface RefreshTokenPayload {
  sub: string;        // User ID
  type: 'refresh';    // Token type identifier
  iss: string;        // Issuer
  aud: string[];      // Audience
  iat: number;        // Issued at
  exp: number;        // Expiry (7 days)
}
```

## API Reference

### JWTAuthService

The main service for JWT operations.

#### Methods

##### `generateTokenPair(user: AuthUser): TokenPair`

Generates a new access and refresh token pair for a user.

```typescript
const user: AuthUser = {
  uid: 'user123',
  email: 'user@example.com',
  displayName: 'John Doe',
  permissions: ['read', 'write'],
  apps: ['hub', 'justsplit']
};

const tokens = jwtService.generateTokenPair(user);
// Returns:
// {
//   accessToken: 'eyJhbGc...',
//   refreshToken: 'eyJhbGc...',
//   expiresIn: 3600
// }
```

##### `verifyToken(token: string): JWTPayload | null`

Verifies and decodes an access token.

```typescript
const decoded = jwtService.verifyToken(accessToken);
if (decoded) {
  console.log('User ID:', decoded.sub);
  console.log('Email:', decoded.email);
}
```

##### `verifyRefreshToken(token: string): { sub: string } | null`

Verifies a refresh token and returns the user ID.

```typescript
const decoded = jwtService.verifyRefreshToken(refreshToken);
if (decoded) {
  console.log('User ID:', decoded.sub);
}
```

##### `refreshAccessToken(refreshToken: string, getUserData: Function): Promise<TokenPair | null>`

Refreshes an access token using a valid refresh token.

```typescript
const newTokens = await jwtService.refreshAccessToken(
  refreshToken,
  async (userId) => {
    // Fetch fresh user data from database
    return await getUserById(userId);
  }
);
```

##### `isTokenExpiringSoon(token: string, bufferSeconds?: number): boolean`

Checks if a token is expired or will expire soon.

```typescript
if (jwtService.isTokenExpiringSoon(accessToken, 300)) {
  // Token expires in less than 5 minutes, refresh it
  const newTokens = await refreshTokens();
}
```

##### `generateCSRFToken(): string`

Generates a CSRF token for form protection.

```typescript
const csrfToken = jwtService.generateCSRFToken();
// Include in forms: <input type="hidden" name="csrf" value={csrfToken} />
```

##### `verifyCSRFToken(token: string): boolean`

Verifies a CSRF token from form submission.

```typescript
const isValid = jwtService.verifyCSRFToken(formData.csrf);
if (!isValid) {
  throw new Error('Invalid CSRF token');
}
```

### AuthTokenService

Higher-level service that wraps JWT functionality for the Hub.

#### Methods

##### `generateToken(userId: string, email: string): string`

Generates a simple access token for cross-app authentication.

```typescript
const token = AuthTokenService.generateToken('user123', 'user@example.com');
// Use in URL: https://justsplit.cybere.co?authToken=${token}
```

##### `generateTokenPair(user: AuthUser): TokenPair`

Generates a full token pair with user details.

```typescript
const tokens = AuthTokenService.generateTokenPair(fullUserObject);
```

##### `validateToken(token: string): ValidationResult`

Validates a token and returns user information.

```typescript
const result = AuthTokenService.validateToken(token);
if (result.isValid) {
  console.log('User ID:', result.userId);
  console.log('Email:', result.email);
}
```

## Authentication Flow

### 1. Initial Login

```typescript
// 1. User logs in with Firebase Auth
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// 2. Generate JWT tokens
const tokens = AuthTokenService.generateTokenPair(userCredential.user);

// 3. Store tokens securely
setAuthTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresIn);

// 4. Set auth cookie for middleware
document.cookie = `cybereco-hub-auth=true; path=/; max-age=${tokens.expiresIn}`;
```

### 2. Cross-App Navigation

```typescript
// 1. User clicks on JustSplit from Hub
const launchUrl = await AuthTokenService.generateAppUrl(
  'https://justsplit.cybere.co',
  currentUser,
  'justsplit'
);

// 2. JustSplit receives and verifies token
const urlParams = new URLSearchParams(window.location.search);
const authToken = urlParams.get('authToken');

if (authToken) {
  const user = await AuthTokenService.verifyAuthToken(authToken);
  if (user) {
    // Create local session
    await saveSharedAuthState(user);
  }
}
```

### 3. Token Refresh

```typescript
// Check if token needs refresh
const tokens = getAuthTokens();
if (!tokens.accessToken || AuthTokenService.isTokenExpiringSoon(tokens.accessToken)) {
  // Refresh using refresh token
  const newTokens = await AuthTokenService.refreshToken(
    tokens.refreshToken,
    getUserFromFirebase
  );
  
  if (newTokens) {
    setAuthTokens(newTokens.accessToken, newTokens.refreshToken, newTokens.expiresIn);
  } else {
    // Refresh failed, redirect to login
    redirectToLogin();
  }
}
```

## Security Considerations

### 1. Token Storage

- **Access tokens**: Store in sessionStorage or memory
- **Refresh tokens**: Store in httpOnly cookies when possible
- **Never store tokens in localStorage** for production

### 2. Token Expiry

- Access tokens expire in 1 hour
- Refresh tokens expire in 7 days
- Always check token expiry before use
- Implement automatic refresh 5 minutes before expiry

### 3. CSRF Protection

- Generate CSRF tokens for all forms
- Verify CSRF tokens on submission
- Use SameSite cookies for additional protection

### 4. Cross-Origin Considerations

- Validate token audience claims
- Use CORS headers appropriately
- Implement rate limiting on token endpoints

## Error Handling

### Common Errors

```typescript
try {
  const decoded = jwtService.verifyToken(token);
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    // Token has expired, refresh it
  } else if (error.name === 'JsonWebTokenError') {
    // Invalid token format or signature
  } else if (error.name === 'NotBeforeError') {
    // Token not active yet
  }
}
```

### Error Codes

- `auth/token-expired`: Access token has expired
- `auth/invalid-token`: Token format or signature invalid
- `auth/refresh-failed`: Refresh token invalid or expired
- `auth/csrf-invalid`: CSRF token validation failed

## Migration Guide

### From Simple Tokens to JWT

```typescript
// Old system
const token = createHash('sha256')
  .update(data + SECRET)
  .digest('hex');

// New system
const tokens = jwtService.generateTokenPair(user);
```

### Key Differences

1. **Token Format**: Base64 JSON → Standard JWT format
2. **Expiry**: 30 seconds → 1 hour (access), 7 days (refresh)
3. **Validation**: SHA-256 hash → JWT signature verification
4. **Storage**: localStorage → sessionStorage + secure cookies

## Best Practices

1. **Always verify tokens** before trusting user data
2. **Implement token refresh** before expiry
3. **Use HTTPS** in production
4. **Rotate secrets** regularly
5. **Monitor failed authentication** attempts
6. **Implement rate limiting** on auth endpoints
7. **Clear tokens on logout** from all storage locations

## Testing

```typescript
// Test token generation
const tokens = jwtService.generateTokenPair(testUser);
expect(tokens.accessToken).toBeDefined();
expect(tokens.expiresIn).toBe(3600);

// Test token verification
const decoded = jwtService.verifyToken(tokens.accessToken);
expect(decoded.sub).toBe(testUser.uid);

// Test token refresh
const newTokens = await jwtService.refreshAccessToken(
  tokens.refreshToken,
  mockGetUserData
);
expect(newTokens).toBeDefined();
```

## Monitoring

Use the AuthLogger to track:
- Token generation events
- Token verification success/failure
- Token refresh attempts
- CSRF validation results

```typescript
authLogger.logTokenGenerated(userId, 'access', 3600);
authLogger.logTokenVerified(userId, 'access');
authLogger.logTokenError('refresh', 'Token expired');
```