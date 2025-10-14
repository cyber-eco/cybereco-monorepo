# Authentication API v2 Reference

## Overview

The CyberEco Authentication API v2 provides comprehensive authentication, authorization, and privacy management capabilities. All endpoints require HTTPS in production.

## Base URL

```
Production: https://api.cybere.co/v2
Development: http://localhost:40000/api
```

## Authentication

Most endpoints require authentication via JWT tokens:

```http
Authorization: Bearer <access_token>
```

## Rate Limiting

All endpoints are rate-limited:
- Global: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- API endpoints: 30 requests per minute

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1717430400
```

## Endpoints

### Authentication

#### Sign In

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": true
}
```

**Response (200 OK):**
```json
{
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": true
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  },
  "requires2FA": false
}
```

**Response with 2FA (200 OK):**
```json
{
  "requires2FA": true,
  "userId": "user123",
  "message": "Please enter your 2FA code"
}
```

#### Verify 2FA

```http
POST /auth/verify-2fa
Content-Type: application/json
Authorization: Bearer <partial_token>

{
  "userId": "user123",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

#### Sign Up

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "displayName": "Jane Doe",
  "acceptTerms": true,
  "marketingConsent": false
}
```

**Response (201 Created):**
```json
{
  "user": {
    "uid": "user456",
    "email": "newuser@example.com",
    "displayName": "Jane Doe",
    "emailVerified": false
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

#### Sign Out

```http
POST /auth/signout
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "message": "Successfully signed out"
}
```

### Two-Factor Authentication

#### Generate 2FA Secret

```http
POST /auth/2fa/generate
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
  "backupCodes": [
    "ABCD-1234-EFGH-5678",
    "IJKL-9012-MNOP-3456",
    "QRST-7890-UVWX-1234",
    "YZAB-5678-CDEF-9012",
    "GHIJ-3456-KLMN-7890",
    "OPQR-1234-STUV-5678",
    "WXYZ-9012-ABCD-3456",
    "EFGH-7890-IJKL-1234",
    "MNOP-5678-QRST-9012",
    "UVWX-3456-YZAB-7890"
  ]
}
```

#### Enable 2FA

```http
POST /auth/2fa/enable
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "secret": "JBSWY3DPEHPK3PXP",
  "verificationCode": "123456"
}
```

**Response (200 OK):**
```json
{
  "enabled": true,
  "message": "Two-factor authentication enabled successfully"
}
```

#### Disable 2FA

```http
POST /auth/2fa/disable
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "CurrentPassword123!",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "enabled": false,
  "message": "Two-factor authentication disabled"
}
```

#### Verify Backup Code

```http
POST /auth/2fa/verify-backup
Content-Type: application/json

{
  "userId": "user123",
  "backupCode": "ABCD-1234-EFGH-5678"
}
```

**Response (200 OK):**
```json
{
  "valid": true,
  "remainingCodes": 9
}
```

### Session Management

#### List Sessions

```http
GET /auth/sessions
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "sessions": [
    {
      "sessionId": "sess_abc123",
      "deviceInfo": {
        "browser": "Chrome",
        "os": "Windows",
        "device": "Desktop"
      },
      "ipAddress": "192.168.1.1",
      "location": {
        "city": "San Francisco",
        "country": "US"
      },
      "createdAt": "2024-06-01T10:00:00Z",
      "lastActivity": "2024-06-03T14:30:00Z",
      "current": true
    }
  ]
}
```

#### Revoke Session

```http
DELETE /auth/sessions/:sessionId
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "message": "Session revoked successfully"
}
```

#### Revoke All Sessions

```http
POST /auth/sessions/revoke-all
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "CurrentPassword123!",
  "keepCurrent": true
}
```

**Response (200 OK):**
```json
{
  "revokedCount": 4,
  "message": "All other sessions revoked"
}
```

### Privacy Management

#### Get Privacy Settings

```http
GET /privacy/settings
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "profileVisibility": "friends",
  "activityVisibility": {
    "expenses": "friends",
    "groups": "everyone",
    "settlements": "only-me"
  },
  "dataSharing": {
    "analytics": true,
    "marketing": false,
    "thirdParty": false
  },
  "consentHistory": [
    {
      "type": "analytics",
      "granted": true,
      "timestamp": "2024-06-01T10:00:00Z"
    }
  ]
}
```

#### Update Privacy Settings

```http
PUT /privacy/settings
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "profileVisibility": "private",
  "activityVisibility": {
    "expenses": "only-me",
    "groups": "friends",
    "settlements": "only-me"
  }
}
```

**Response (200 OK):**
```json
{
  "message": "Privacy settings updated",
  "settings": {
    "profileVisibility": "private",
    "activityVisibility": {
      "expenses": "only-me",
      "groups": "friends",
      "settlements": "only-me"
    }
  }
}
```

#### Record Consent

```http
POST /privacy/consent
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "consentType": "marketing",
  "granted": true,
  "metadata": {
    "source": "settings_page",
    "version": "1.0"
  }
}
```

**Response (200 OK):**
```json
{
  "consentId": "consent_xyz789",
  "type": "marketing",
  "granted": true,
  "timestamp": "2024-06-03T14:30:00Z"
}
```

### Data Export

#### Request Export

```http
POST /export
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "format": "json",
  "categories": ["profile", "justsplit", "settings", "activities"],
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "includeMetadata": true
}
```

**Response (202 Accepted):**
```json
{
  "exportId": "export_abc123",
  "status": "processing",
  "estimatedSize": 15728640,
  "message": "Export request accepted"
}
```

#### Check Export Status

```http
GET /export/status/:exportId
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "exportId": "export_abc123",
  "status": "completed",
  "format": "json",
  "size": 15728640,
  "downloadUrl": "/export/download/export_abc123",
  "expiresAt": "2024-06-03T15:00:00Z"
}
```

#### Download Export

```http
GET /export/download/:exportId
Authorization: Bearer <access_token>
```

**Response (200 OK):**
- Content-Type: application/json or text/csv
- Content-Disposition: attachment; filename="cybereco-export-2024-06-03.json"
- Binary file data

### GDPR Compliance

#### Request Data Deletion

```http
POST /gdpr/request-deletion
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "CurrentPassword123!",
  "reason": "No longer using the service",
  "feedback": "Optional feedback"
}
```

**Response (202 Accepted):**
```json
{
  "requestId": "del_req_123",
  "scheduledDate": "2024-07-03T14:30:00Z",
  "message": "Deletion request accepted. Your account will be deleted in 30 days."
}
```

#### Get Privacy Report

```http
GET /gdpr/privacy-report
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "generatedAt": "2024-06-03T14:30:00Z",
  "dataCategories": {
    "profile": {
      "collected": true,
      "purpose": "Account management",
      "retention": "Until deletion"
    },
    "activities": {
      "collected": true,
      "purpose": "Service improvement",
      "retention": "2 years"
    }
  },
  "thirdPartySharing": [],
  "dataProcessors": [
    {
      "name": "Firebase",
      "purpose": "Authentication and data storage",
      "location": "United States"
    }
  ]
}
```

#### Request Data Portability

```http
POST /gdpr/data-portability
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "format": "json",
  "includeHistory": true,
  "targetService": "competitor.com"
}
```

**Response (202 Accepted):**
```json
{
  "requestId": "port_req_456",
  "status": "processing",
  "message": "Data portability request accepted"
}
```

### Security

#### Get Security Overview

```http
GET /security/overview
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "securityScore": 85,
  "features": {
    "twoFactorEnabled": true,
    "strongPassword": true,
    "verifiedEmail": true,
    "trustedDevices": 2
  },
  "recommendations": [
    {
      "type": "review_sessions",
      "priority": "medium",
      "message": "You have 5 active sessions. Review them regularly."
    }
  ],
  "lastSecurityReview": "2024-06-01T10:00:00Z"
}
```

#### Get Audit Logs

```http
GET /security/audit-logs
Authorization: Bearer <access_token>
Query Parameters:
  - startDate: ISO 8601 date
  - endDate: ISO 8601 date
  - eventType: login_success|login_failure|password_change|etc
  - limit: number (max 100)
  - offset: number
```

**Response (200 OK):**
```json
{
  "logs": [
    {
      "eventId": "evt_789",
      "type": "login_success",
      "timestamp": "2024-06-03T14:00:00Z",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "location": {
        "city": "San Francisco",
        "country": "US"
      },
      "metadata": {
        "method": "password"
      }
    }
  ],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

## Error Responses

All errors follow a consistent format:

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {
      "field": "password",
      "hint": "Password must be at least 8 characters"
    }
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_INVALID_CREDENTIALS | 401 | Invalid login credentials |
| AUTH_TOKEN_EXPIRED | 401 | Access token has expired |
| AUTH_TOKEN_INVALID | 401 | Invalid or malformed token |
| AUTH_2FA_REQUIRED | 200 | 2FA verification needed |
| AUTH_2FA_INVALID | 401 | Invalid 2FA code |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| VALIDATION_ERROR | 400 | Request validation failed |
| PERMISSION_DENIED | 403 | Insufficient permissions |
| RESOURCE_NOT_FOUND | 404 | Resource doesn't exist |
| INTERNAL_ERROR | 500 | Server error occurred |

## Security Headers

All API responses include security headers:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## Webhooks

Configure webhooks for real-time events:

### Event Types

- `auth.signin.success`
- `auth.signin.failure`
- `auth.signout`
- `auth.password.changed`
- `auth.2fa.enabled`
- `auth.2fa.disabled`
- `privacy.settings.updated`
- `privacy.consent.recorded`
- `export.completed`
- `gdpr.deletion.requested`

### Webhook Payload

```json
{
  "id": "evt_abc123",
  "type": "auth.signin.success",
  "created": "2024-06-03T14:30:00Z",
  "data": {
    "userId": "user123",
    "email": "user@example.com",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Webhook Security

All webhooks include:
- HMAC-SHA256 signature in `X-Webhook-Signature` header
- Timestamp in `X-Webhook-Timestamp` header
- Unique event ID for idempotency

## SDK Examples

### JavaScript/TypeScript

```typescript
import { CyberEcoAuth } from '@cybereco/auth-sdk';

const auth = new CyberEcoAuth({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Sign in
const { user, tokens } = await auth.signIn({
  email: 'user@example.com',
  password: 'SecurePassword123!'
});

// Handle 2FA
if (response.requires2FA) {
  const code = prompt('Enter 2FA code:');
  const { user, tokens } = await auth.verify2FA({
    userId: response.userId,
    code
  });
}

// Refresh token
const newTokens = await auth.refreshTokens(tokens.refreshToken);

// Privacy settings
const privacy = await auth.privacy.getSettings();
await auth.privacy.updateSettings({
  profileVisibility: 'private'
});

// Data export
const exportId = await auth.export.request({
  format: 'json',
  categories: ['all']
});
```

### Python

```python
from cybereco_auth import CyberEcoAuth

auth = CyberEcoAuth(
    api_key='your-api-key',
    environment='production'
)

# Sign in
result = auth.sign_in(
    email='user@example.com',
    password='SecurePassword123!'
)

# Handle 2FA
if result.requires_2fa:
    code = input('Enter 2FA code: ')
    result = auth.verify_2fa(
        user_id=result.user_id,
        code=code
    )

# Session management
sessions = auth.sessions.list()
auth.sessions.revoke(session_id='sess_abc123')

# Privacy controls
privacy = auth.privacy.get_settings()
auth.privacy.update_settings(
    profile_visibility='private',
    activity_visibility={
        'expenses': 'only-me'
    }
)
```

## Changelog

### v2.0.0 (2024-06-03)
- Added JWT authentication
- Implemented 2FA support
- Added session management
- Privacy controls and GDPR compliance
- Rate limiting
- Security headers
- Audit logging
- Data export functionality

### v1.0.0 (2024-01-15)
- Initial release
- Basic authentication
- User management