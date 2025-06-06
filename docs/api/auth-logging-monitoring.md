# Authentication Logging & Monitoring API

## Overview

The CyberEco authentication system includes comprehensive logging and monitoring capabilities to track authentication events, detect security issues, and analyze user behavior across the ecosystem.

## Features

- **Real-time event logging** for all authentication activities
- **Structured logging** with consistent event types and metadata
- **Performance metrics** tracking login times and success rates
- **Error tracking** with stack traces and context
- **Session management** with unique session identifiers
- **Report generation** for authentication health monitoring
- **Export capabilities** for audit and compliance

## Event Types

### Authentication Events

| Event Type | Description | Log Level |
|------------|-------------|-----------|
| `auth.login.attempt` | User attempts to log in | INFO |
| `auth.login.success` | Successful login | INFO |
| `auth.login.failure` | Failed login attempt | WARN |
| `auth.logout` | User logs out | INFO |

### Token Events

| Event Type | Description | Log Level |
|------------|-------------|-----------|
| `auth.token.generated` | New token created | DEBUG |
| `auth.token.verified` | Token successfully verified | DEBUG |
| `auth.token.expired` | Token has expired | WARN |
| `auth.token.refresh` | Token refreshed | INFO |
| `auth.token.invalid` | Invalid token detected | WARN |

### SSO Events

| Event Type | Description | Log Level |
|------------|-------------|-----------|
| `auth.sso.redirect` | SSO redirect initiated | INFO |
| `auth.sso.callback` | SSO callback received | INFO |
| `auth.sso.token_exchange` | Token exchange between apps | INFO |
| `auth.sso.cross_app` | Cross-app navigation | INFO |

### Session Events

| Event Type | Description | Log Level |
|------------|-------------|-----------|
| `auth.session.create` | New session created | INFO |
| `auth.session.restore` | Session restored from storage | INFO |
| `auth.session.expire` | Session expired | INFO |
| `auth.session.clear` | Session cleared/deleted | INFO |

### Error Events

| Event Type | Description | Log Level |
|------------|-------------|-----------|
| `auth.error` | General authentication error | ERROR |
| `auth.permission.denied` | Permission denied | WARN |
| `auth.rate_limit` | Rate limit exceeded | WARN |

## API Reference

### AuthLogger

The main logging service for authentication events.

#### Core Methods

##### `logLoginAttempt(email: string, metadata?: Record<string, any>): void`

Logs a login attempt with optional metadata.

```typescript
authLogger.logLoginAttempt('user@example.com', {
  method: 'email',
  ipAddress: '192.168.1.1',
  userAgent: navigator.userAgent
});
```

##### `logLoginSuccess(userId: string, email: string, duration: number, metadata?: Record<string, any>): void`

Logs successful login with performance metrics.

```typescript
const startTime = Date.now();
// ... perform login ...
const duration = Date.now() - startTime;

authLogger.logLoginSuccess(
  'user123',
  'user@example.com',
  duration,
  { method: 'google' }
);
```

##### `logLoginFailure(email: string, errorCode: string, errorMessage: string): void`

Logs failed login attempts with error details.

```typescript
authLogger.logLoginFailure(
  'user@example.com',
  'auth/wrong-password',
  'The password is invalid or the user does not have a password.'
);
```

##### `logTokenGenerated(userId: string, tokenType: string, expiresIn: number): void`

Logs token generation events.

```typescript
authLogger.logTokenGenerated('user123', 'access', 3600);
authLogger.logTokenGenerated('user123', 'refresh', 604800);
```

##### `logTokenVerified(userId: string, tokenType: string): void`

Logs successful token verification.

```typescript
authLogger.logTokenVerified('user123', 'access');
```

##### `logTokenError(tokenType: string, error: string): void`

Logs token-related errors.

```typescript
authLogger.logTokenError('access', 'Token signature verification failed');
```

##### `logSSORedirect(sourceApp: string, targetApp: string, userId?: string): void`

Logs SSO redirects between applications.

```typescript
authLogger.logSSORedirect('hub', 'justsplit', 'user123');
```

##### `logCrossAppNavigation(sourceApp: string, targetApp: string, userId: string): void`

Logs successful cross-app navigation.

```typescript
authLogger.logCrossAppNavigation('hub', 'justsplit', 'user123');
```

##### `logAuthError(error: Error, context?: Record<string, any>): void`

Logs authentication errors with full context.

```typescript
try {
  // authentication code
} catch (error) {
  authLogger.logAuthError(error, {
    action: 'token_refresh',
    userId: 'user123'
  });
}
```

##### `logSessionEvent(eventType: AuthEventType, userId?: string, metadata?: Record<string, any>): void`

Logs session-related events.

```typescript
authLogger.logSessionEvent(
  AuthEventType.SESSION_CREATE,
  'user123',
  { source: 'login' }
);
```

#### Query Methods

##### `getMetrics(): AuthMetrics`

Returns current authentication metrics.

```typescript
const metrics = authLogger.getMetrics();
console.log(`Login success rate: ${(metrics.loginSuccesses / metrics.loginAttempts * 100).toFixed(1)}%`);
console.log(`Average login time: ${metrics.averageLoginTime}ms`);
```

##### `getRecentLogs(count?: number, level?: LogLevel): AuthLogEntry[]`

Retrieves recent log entries with optional filtering.

```typescript
// Get last 50 logs
const recentLogs = authLogger.getRecentLogs(50);

// Get only error logs
const errorLogs = authLogger.getRecentLogs(20, LogLevel.ERROR);

// Get only info logs
const infoLogs = authLogger.getRecentLogs(100, LogLevel.INFO);
```

##### `getErrorLogs(count?: number): AuthLogEntry[]`

Retrieves recent error logs.

```typescript
const errors = authLogger.getErrorLogs(10);
errors.forEach(error => {
  console.error(`${error.timestamp}: ${error.errorMessage}`);
  console.error(error.stackTrace);
});
```

##### `getLogsByUser(userId: string, count?: number): AuthLogEntry[]`

Retrieves logs for a specific user.

```typescript
const userLogs = authLogger.getLogsByUser('user123', 50);
console.log(`User has ${userLogs.length} authentication events`);
```

#### Management Methods

##### `clearLogs(): void`

Clears all stored logs (useful for testing).

```typescript
authLogger.clearLogs();
```

##### `exportLogs(): string`

Exports all logs as JSON string.

```typescript
const logsJson = authLogger.exportLogs();
// Save to file or send to external service
fs.writeFileSync('auth-logs.json', logsJson);
```

##### `generateReport(): string`

Generates a human-readable authentication report.

```typescript
const report = authLogger.generateReport();
console.log(report);
// Output:
// Authentication Report
// ====================
// Generated: 2025-03-06T12:00:00.000Z
// Session: session-1709726400000-abc123def
// 
// Metrics:
// --------
// Login Attempts: 150
// Login Successes: 142 (94.7%)
// Login Failures: 8 (5.3%)
// Average Login Time: 1250ms
// ...
```

## Log Entry Structure

```typescript
interface AuthLogEntry {
  timestamp: string;          // ISO 8601 timestamp
  level: LogLevel;           // DEBUG, INFO, WARN, ERROR
  eventType: AuthEventType;  // Event type enum
  userId?: string;           // User ID if available
  email?: string;            // User email if available
  appId?: string;            // Application ID
  sourceApp?: string;        // Source app for SSO
  targetApp?: string;        // Target app for SSO
  sessionId?: string;        // Unique session identifier
  ip?: string;               // IP address if available
  userAgent?: string;        // Browser user agent
  message: string;           // Human-readable message
  metadata?: Record<string, any>;  // Additional context
  duration?: number;         // Operation duration in ms
  success?: boolean;         // Operation success status
  errorCode?: string;        // Error code if failed
  errorMessage?: string;     // Error message if failed
  stackTrace?: string;       // Stack trace for errors
}
```

## Metrics Structure

```typescript
interface AuthMetrics {
  loginAttempts: number;         // Total login attempts
  loginSuccesses: number;        // Successful logins
  loginFailures: number;         // Failed logins
  activeTokens: number;          // Currently active tokens
  tokenRefreshes: number;        // Token refresh count
  crossAppNavigations: number;   // Cross-app SSO count
  averageLoginTime: number;      // Average login duration (ms)
  errorRate: number;             // Error percentage
}
```

## Usage Examples

### Complete Login Flow Logging

```typescript
// 1. Log login attempt
const loginStart = Date.now();
authLogger.logLoginAttempt(email, { method: 'email', ip: clientIp });

try {
  // 2. Perform authentication
  const user = await signInWithEmailAndPassword(auth, email, password);
  
  // 3. Log success
  const duration = Date.now() - loginStart;
  authLogger.logLoginSuccess(user.uid, email, duration);
  
  // 4. Generate tokens
  const tokens = generateTokens(user);
  authLogger.logTokenGenerated(user.uid, 'access', tokens.expiresIn);
  
  // 5. Create session
  authLogger.logSessionEvent(AuthEventType.SESSION_CREATE, user.uid);
  
} catch (error) {
  // Log failure
  authLogger.logLoginFailure(email, error.code, error.message);
  authLogger.logAuthError(error, { email, method: 'email' });
}
```

### Cross-App Navigation Logging

```typescript
// Hub initiating navigation to JustSplit
async function navigateToApp(appId: string) {
  const user = getCurrentUser();
  
  // Log SSO redirect
  authLogger.logSSORedirect('hub', appId, user.uid);
  
  // Generate auth token
  const token = await generateAuthToken(user);
  authLogger.logTokenGenerated(user.uid, 'sso', 30);
  
  // Navigate
  window.location.href = `https://${appId}.cybere.co?authToken=${token}`;
  
  // Log navigation
  authLogger.logCrossAppNavigation('hub', appId, user.uid);
}
```

### Token Refresh Logging

```typescript
async function refreshAuthToken(refreshToken: string) {
  try {
    // Attempt refresh
    const decoded = verifyRefreshToken(refreshToken);
    authLogger.logTokenVerified(decoded.sub, 'refresh');
    
    // Generate new tokens
    const newTokens = await generateTokenPair(decoded.sub);
    authLogger.logTokenGenerated(decoded.sub, 'access', 3600);
    authLogger.logTokenRefresh(decoded.sub);
    
    return newTokens;
  } catch (error) {
    authLogger.logTokenError('refresh', error.message);
    authLogger.logAuthError(error, { action: 'token_refresh' });
    throw error;
  }
}
```

## Monitoring Dashboard

The Hub provides an authentication monitoring dashboard at `/auth-logs` (admin only).

### Features

- **Real-time metrics** display
- **Log filtering** by level, user, or event type
- **Auto-refresh** every 10 seconds
- **Export** logs as JSON
- **Generate reports** for specific time periods

### Accessing the Dashboard

```typescript
// Only accessible to admin users
if (user.permissions?.includes('admin')) {
  router.push('/auth-logs');
}
```

## Best Practices

### 1. Consistent Logging

Always log authentication events at appropriate levels:
- **DEBUG**: Token operations, detailed flow
- **INFO**: User actions, successful operations
- **WARN**: Failed attempts, invalid tokens
- **ERROR**: System errors, exceptions

### 2. Include Context

Always provide relevant metadata:

```typescript
authLogger.logLoginAttempt(email, {
  method: 'email',
  ip: request.ip,
  userAgent: request.headers['user-agent'],
  referrer: request.headers['referer']
});
```

### 3. Performance Tracking

Track operation durations for performance monitoring:

```typescript
const start = performance.now();
// ... perform operation ...
const duration = performance.now() - start;
authLogger.logLoginSuccess(userId, email, duration);
```

### 4. Error Handling

Always log errors with full context:

```typescript
catch (error) {
  authLogger.logAuthError(error, {
    userId,
    action: 'profile_update',
    payload: sanitizedPayload
  });
}
```

### 5. Session Tracking

Maintain session continuity across events:

```typescript
// Session ID is automatically included in all logs
// But you can add session-specific metadata
authLogger.logSessionEvent(AuthEventType.SESSION_CREATE, userId, {
  device: deviceInfo,
  location: geoLocation
});
```

## Security Considerations

### 1. Data Privacy

- Never log passwords or sensitive tokens
- Sanitize user input before logging
- Hash or truncate sensitive identifiers

### 2. Log Retention

- Logs are limited to 1000 entries in memory
- Only last 100 entries persisted to localStorage
- Implement server-side archival for compliance

### 3. Access Control

- Auth logs dashboard requires admin permissions
- Export functionality should be restricted
- Monitor access to log data

### 4. Rate Limiting

Monitor for suspicious patterns:

```typescript
const recentFailures = authLogger.getRecentLogs(100)
  .filter(log => log.eventType === AuthEventType.LOGIN_FAILURE)
  .filter(log => log.email === email);

if (recentFailures.length > 5) {
  // Implement rate limiting
  authLogger.logSessionEvent(AuthEventType.RATE_LIMIT, null, { email });
}
```

## Integration with External Services

### Sentry Integration

```typescript
// In production, send errors to Sentry
if (process.env.NODE_ENV === 'production') {
  authLogger.on('error', (logEntry) => {
    Sentry.captureException(new Error(logEntry.errorMessage), {
      extra: logEntry
    });
  });
}
```

### CloudWatch/DataDog

```typescript
// Send metrics to monitoring service
setInterval(() => {
  const metrics = authLogger.getMetrics();
  cloudWatch.putMetricData({
    Namespace: 'CyberEco/Auth',
    MetricData: [
      {
        MetricName: 'LoginSuccessRate',
        Value: metrics.loginSuccesses / metrics.loginAttempts * 100,
        Unit: 'Percent'
      }
    ]
  });
}, 60000);
```

## Troubleshooting

### Common Issues

1. **Logs not persisting**: Check localStorage quota
2. **Missing session IDs**: Ensure logger initialized early
3. **Performance impact**: Reduce log verbosity in production
4. **Memory usage**: Implement log rotation

### Debug Mode

Enable verbose logging for troubleshooting:

```typescript
// Set environment variable
process.env.AUTH_LOG_LEVEL = 'DEBUG';

// Or programmatically
authLogger.setLogLevel(LogLevel.DEBUG);
```