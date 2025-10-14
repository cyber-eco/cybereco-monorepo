# Authentication Integration Architecture

## Overview

The CyberEco platform implements a centralized authentication system through the Hub application, which provides secure, unified authentication for all ecosystem applications. This document describes the authentication integration between Hub and consuming applications like JustSplit.

## Architecture Diagram

```mermaid
graph TB
    subgraph "Hub (Port 40000)"
        HubAuth[Hub Authentication]
        HubFirebase[Hub Firebase Project]
        UserDB[(User Profiles)]
        PermissionDB[(Permissions)]
    end
    
    subgraph "JustSplit (Port 40002)"
        JSAuth[JustSplit Auth Context]
        JSFirebase[JustSplit Firebase Project]
        JSData[(App-Specific Data)]
    end
    
    subgraph "Shared Libraries"
        AuthLib[@cybereco/auth]
        SharedTypes[@cybereco/shared-types]
        FirebaseConfig[@cybereco/firebase-config]
    end
    
    User -->|1. Access App| JustSplit
    JustSplit -->|2. Check Auth| JSAuth
    JSAuth -->|3. No Auth?| HubAuth
    HubAuth -->|4. Sign In| User
    HubAuth -->|5. Generate Token| JustSplit
    JSAuth -->|6. Verify & Store| JSFirebase
    
    HubAuth -.->|Uses| AuthLib
    JSAuth -.->|Uses| AuthLib
    HubAuth -->|Stores| UserDB
    HubAuth -->|Manages| PermissionDB
    JSAuth -->|Reads| HubFirebase
    JSAuth -->|Writes| JSData
```

## Key Components

### 1. Shared Auth Library (`@cybereco/auth`)

The shared authentication library provides:

- **`createAuthContext<T>`**: Factory function for creating type-safe auth contexts
- **`BaseUser`**: Base user interface that apps extend
- **Session Synchronization**: Cross-tab/app auth state sync
- **Permission Management**: Hooks and utilities for checking permissions
- **Auth Utilities**: Token generation, validation, error handling

### 2. Hub Authentication

Hub serves as the central authentication provider:

```typescript
// Hub User Model
interface HubUser extends BaseUser {
  apps: string[];
  permissions: AppPermission[];
  preferences: UserPreferences;
  isAdmin?: boolean;
}
```

Key features:
- Manages user registration and sign-in
- Issues authentication tokens
- Stores user profiles and permissions
- Handles OAuth providers (Google, Facebook, Twitter)

### 3. App Authentication (JustSplit Example)

Apps implement authentication by:

1. **Extending BaseUser**:
```typescript
interface JustSplitUser extends BaseUser {
  balance: number;
  preferredCurrency: string;
  friends: string[];
  hubUserId?: string;
}
```

2. **Using JustSplitAuthProvider**:
```typescript
<JustSplitAuthProvider>
  <App />
</JustSplitAuthProvider>
```

3. **Implementing Protected Routes**:
```typescript
<ProtectedRoute>
  <PermissionWrapper>
    <AppContent />
  </PermissionWrapper>
</ProtectedRoute>
```

## Authentication Flow

### 1. Initial App Access

```sequence
User->JustSplit: Navigate to app
JustSplit->JustSplit: Check local auth state
JustSplit->Hub: No auth? Redirect to Hub
Hub->User: Show sign in page
User->Hub: Enter credentials
Hub->Hub: Validate & create session
Hub->JustSplit: Redirect with token
JustSplit->JustSplit: Store auth state
JustSplit->User: Show app content
```

### 2. Token-Based Authentication

When Hub redirects to an app, it includes an ID token:

```
https://justsplit.app?token=<ID_TOKEN>&returnUrl=/dashboard
```

The app:
1. Extracts the token from URL
2. Cleans up the URL
3. Uses shared Firebase auth instance
4. Creates app-specific user profile

### 3. Session Synchronization

Sessions are synchronized across tabs and apps:

```typescript
useSessionSync({
  auth,
  onSessionChange: (isAuthenticated) => {
    if (!isAuthenticated) {
      // Redirect to Hub
    }
  },
  syncAcrossTabs: true
});
```

## Permission System

### Permission Structure

```typescript
interface AppPermission {
  appId: string;
  roles: string[];
  features: string[];
}
```

### Permission Checking

Apps can check permissions using the `usePermissions` hook:

```typescript
const { hasAccess, hasFeature, hasRole } = usePermissions({
  appId: 'justsplit',
  user: userProfile,
  requiredFeatures: ['expense-tracking'],
  requiredRoles: ['user']
});
```

### Permission Enforcement

```typescript
// HOC for component protection
const ProtectedComponent = withPermissions(Component, {
  appId: 'justsplit',
  requiredFeatures: ['budget-management']
});

// Service-level enforcement
const canAccess = await requirePermission({
  appId: 'justsplit',
  feature: 'expense-tracking',
  resourceType: 'expense',
  resourceId: expenseId,
  action: 'write'
})(userId);
```

## Shared Data Models

Hub provides centralized data models for cross-app functionality:

### User Profiles
```typescript
interface SharedUserProfile extends BaseUser {
  phoneNumber?: string;
  location?: LocationInfo;
  preferences: UserPreferences;
  socialProfiles?: SocialProfiles;
  appData: {
    [appId: string]: AppReference;
  };
}
```

### Financial Data
- **Transactions**: Shared across financial apps
- **Budgets**: Cross-app budget tracking
- **Bank Accounts**: Centralized payment methods

### Social Data
- **Groups**: Shared across social apps
- **Relationships**: User connections
- **Activities**: Cross-app events

## Implementation Guidelines

### For New Apps

1. **Create App-Specific User Type**:
```typescript
interface MyAppUser extends BaseUser {
  // App-specific fields
}
```

2. **Implement Auth Provider**:
```typescript
const { AuthProvider, useAuth } = createAuthContext<MyAppUser>();
```

3. **Add Token Handling**:
```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    // Handle authentication
  }
}, []);
```

4. **Implement Permission Checks**:
```typescript
<PermissionWrapper requiredFeatures={['app-feature']}>
  <AppContent />
</PermissionWrapper>
```

### Security Considerations

1. **Token Security**:
   - Tokens are short-lived ID tokens
   - Transmitted via HTTPS only
   - Removed from URL immediately after use

2. **Session Management**:
   - Sessions persist using Firebase Auth
   - Cross-tab sync prevents session hijacking
   - Automatic sign-out on security events

3. **Permission Validation**:
   - Permissions checked on every request
   - Resource-level access control
   - Audit logging for permission changes

## Testing

### Unit Tests
- Auth context creation
- Permission checking logic
- Session synchronization

### Integration Tests
- Complete auth flow
- Cross-app navigation
- Permission enforcement

### Test Utilities
```typescript
// Mock auth provider for tests
const MockAuthProvider = ({ children, user }) => {
  const mockContext = {
    currentUser: user,
    userProfile: createMockProfile(user),
    // ... other methods
  };
  return <AuthContext.Provider value={mockContext}>{children}</AuthContext.Provider>;
};
```

## Migration Guide

### From Standalone Auth to Hub Auth

1. **Update User Model**:
   - Extend `BaseUser` instead of custom interface
   - Add `hubUserId` reference

2. **Replace Auth Context**:
   - Use `createAuthContext` from `@cybereco/auth`
   - Implement token handling

3. **Update Sign In/Up Pages**:
   - Redirect to Hub instead of local auth
   - Handle return URLs

4. **Add Permission Checks**:
   - Wrap protected components
   - Check features before operations

## Best Practices

1. **Always Check Permissions**: Don't assume access based on authentication alone
2. **Handle Loading States**: Show appropriate UI during auth checks
3. **Implement Fallbacks**: Gracefully handle permission denials
4. **Use Type Safety**: Leverage TypeScript for user models
5. **Test Auth Flows**: Include auth scenarios in integration tests

## Troubleshooting

### Common Issues

1. **"Access Denied" Despite Being Logged In**
   - Check user permissions in Hub
   - Verify app ID matches configuration
   - Ensure required features are granted

2. **Session Not Syncing**
   - Verify BroadcastChannel support
   - Check same-origin policy
   - Ensure session storage is enabled

3. **Token Authentication Fails**
   - Verify Firebase configuration
   - Check token expiration
   - Ensure projects share auth instance

### Debug Tools

```typescript
// Enable auth debugging
localStorage.setItem('DEBUG_AUTH', 'true');

// Check current permissions
const permissions = await getUserPermissions(userId);
console.log('User permissions:', permissions);

// Verify session state
console.log('Session:', sessionStorage.getItem('cybereco-auth-session'));
```