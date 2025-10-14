# Authentication API Reference

## Overview

The CyberEco Authentication API provides secure, centralized authentication services for all ecosystem applications. This document covers the authentication library, services, and integration patterns.

## Installation

```bash
npm install @cybereco/auth @cybereco/shared-types @cybereco/firebase-config
```

## Core Components

### createAuthContext

Factory function for creating type-safe authentication contexts.

```typescript
import { createAuthContext, BaseUser } from '@cybereco/auth';

// Define your user type
interface AppUser extends BaseUser {
  appSpecificField: string;
}

// Create auth context
const { AuthProvider, useAuth, AuthContext } = createAuthContext<AppUser>();
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `T` | `extends BaseUser` | User type that extends BaseUser |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `AuthProvider` | `React.FC<AuthProviderProps<T>>` | Provider component |
| `useAuth` | `() => AuthContextType<T>` | Hook to access auth context |
| `AuthContext` | `React.Context<AuthContextType<T>>` | Raw context object |

### AuthProvider

Provider component that manages authentication state.

```typescript
<AuthProvider
  config={{
    auth: firebaseAuth,
    db: firestore,
    userCollection: 'users',
    enableIndexedDBRecovery: true
  }}
  createUserProfile={(firebaseUser) => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName || 'User',
    // ... other fields
  })}
  onUserProfileLoaded={(profile) => {
    console.log('User loaded:', profile);
  }}
  enableCorruptionRecovery={true}
>
  <App />
</AuthProvider>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `AuthConfig` | Yes | Firebase configuration |
| `createUserProfile` | `(user: FirebaseUser) => T` | No | Custom user profile creator |
| `onUserProfileLoaded` | `(profile: T) => void` | No | Callback when profile loads |
| `enableCorruptionRecovery` | `boolean` | No | Enable IndexedDB recovery |

### useAuth Hook

Hook to access authentication state and methods.

```typescript
const {
  currentUser,
  userProfile,
  isLoading,
  signIn,
  signUp,
  signOut,
  signInWithProvider,
  linkAccount,
  resetPassword,
  updateProfile
} = useAuth();
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `currentUser` | `FirebaseUser \| null` | Firebase auth user |
| `userProfile` | `T \| null` | App-specific user profile |
| `isLoading` | `boolean` | Loading state |
| `signIn` | `(email, password) => Promise<void>` | Sign in with email |
| `signUp` | `(email, password, name, extra?) => Promise<void>` | Create account |
| `signOut` | `() => Promise<void>` | Sign out user |
| `signInWithProvider` | `(provider) => Promise<void>` | OAuth sign in |
| `linkAccount` | `(provider) => Promise<void>` | Link OAuth account |
| `resetPassword` | `(email) => Promise<void>` | Send password reset |
| `updateProfile` | `(data) => Promise<void>` | Update user profile |

## Permission Management

### usePermissions Hook

Check user permissions for app access and features.

```typescript
const { hasAccess, hasFeature, hasRole, isLoading, error } = usePermissions({
  appId: 'justsplit',
  user: userProfile,
  requiredFeatures: ['expense-tracking'],
  requiredRoles: ['user']
});
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appId` | `string` | Yes | Application ID |
| `user` | `BaseUser \| null` | Yes | User profile |
| `requiredFeatures` | `string[]` | No | Required feature flags |
| `requiredRoles` | `string[]` | No | Required roles |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `hasAccess` | `boolean` | User has all requirements |
| `hasFeature` | `(feature: string) => boolean` | Check specific feature |
| `hasRole` | `(role: string) => boolean` | Check specific role |
| `isLoading` | `boolean` | Loading state |
| `error` | `Error \| undefined` | Error if any |

### withPermissions HOC

Higher-order component for protecting components with permissions.

```typescript
const ProtectedComponent = withPermissions(MyComponent, {
  appId: 'justsplit',
  requiredFeatures: ['budget-management']
});

// Usage
<ProtectedComponent user={currentUser} />
```

## Session Synchronization

### useSessionSync

Synchronize authentication state across tabs and apps.

```typescript
useSessionSync({
  auth: firebaseAuth,
  onSessionChange: (isAuthenticated) => {
    console.log('Auth state changed:', isAuthenticated);
  },
  syncAcrossTabs: true
});
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `auth` | `Auth` | Yes | Firebase Auth instance |
| `onSessionChange` | `(isAuth: boolean) => void` | No | State change callback |
| `syncAcrossTabs` | `boolean` | No | Enable cross-tab sync |

### Session Utilities

```typescript
// Check if authenticated in another tab
const isAuthenticated = useSharedAuthState();

// Clear shared auth state (for sign out)
clearSharedAuthState();
```

## Utility Functions

### Authentication Helpers

```typescript
import {
  validateEmail,
  validatePassword,
  generateAuthToken,
  verifyAuthToken,
  generateAuthRedirectUrl,
  parseReturnUrl,
  generateDisplayName,
  getAuthErrorMessage
} from '@cybereco/auth';
```

#### validateEmail

```typescript
const isValid = validateEmail('user@example.com');
// Returns: boolean
```

#### validatePassword

```typescript
const { isValid, errors } = validatePassword('password123');
// Returns: { isValid: boolean, errors: string[] }
```

#### generateAuthRedirectUrl

```typescript
const url = generateAuthRedirectUrl(
  'https://hub.cybere.co',
  'https://justsplit.app/dashboard',
  'signin'
);
// Returns: "https://hub.cybere.co/auth/signin?returnUrl=..."
```

#### getAuthErrorMessage

```typescript
try {
  await signIn(email, password);
} catch (error) {
  const { code, message, userFriendlyMessage } = getAuthErrorMessage(error);
  showError(userFriendlyMessage);
}
```

## Data Types

### BaseUser

```typescript
interface BaseUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### AuthConfig

```typescript
interface AuthConfig {
  auth: Auth;
  db: Firestore;
  userCollection?: string;
  enableIndexedDBRecovery?: boolean;
}
```

### AppPermission

```typescript
interface AppPermission {
  appId: string;
  roles: string[];
  features: string[];
}
```

### AuthError

```typescript
interface AuthError {
  code: string;
  message: string;
  userFriendlyMessage: string;
}
```

## Integration Examples

### Basic App Integration

```typescript
// 1. Define user type
interface MyAppUser extends BaseUser {
  subscription: 'free' | 'pro';
  credits: number;
}

// 2. Create auth context
const { AuthProvider, useAuth } = createAuthContext<MyAppUser>();

// 3. Wrap app with provider
function App() {
  return (
    <AuthProvider
      config={{
        auth: getHubAuth(),
        db: getHubFirestore()
      }}
      createUserProfile={(user) => ({
        id: user.uid,
        name: user.displayName || 'User',
        email: user.email,
        subscription: 'free',
        credits: 100
      })}
    >
      <Router>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// 4. Use in components
function Profile() {
  const { userProfile, updateProfile } = useAuth();
  
  if (!userProfile) return <div>Not authenticated</div>;
  
  return (
    <div>
      <h1>Welcome, {userProfile.name}</h1>
      <p>Credits: {userProfile.credits}</p>
    </div>
  );
}
```

### Protected Routes

```typescript
import { useAuth, usePermissions } from '@cybereco/auth';

function ProtectedRoute({ children, requiredFeature }) {
  const { userProfile, isLoading } = useAuth();
  const { hasAccess } = usePermissions({
    appId: 'myapp',
    user: userProfile,
    requiredFeatures: requiredFeature ? [requiredFeature] : []
  });
  
  if (isLoading) return <LoadingSpinner />;
  if (!userProfile) return <Redirect to="/auth/signin" />;
  if (!hasAccess) return <AccessDenied />;
  
  return children;
}

// Usage
<ProtectedRoute requiredFeature="premium-features">
  <PremiumDashboard />
</ProtectedRoute>
```

### Token Authentication

```typescript
function TokenAuth() {
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token && !currentUser) {
      // Handle token authentication
      authenticateWithToken(token);
    }
  }, [currentUser]);
}
```

### Cross-App Navigation

```typescript
function AppLauncher({ targetApp }) {
  const { currentUser } = useAuth();
  
  const launchApp = async () => {
    if (!currentUser) return;
    
    // Generate token for target app
    const token = await currentUser.getIdToken();
    
    // Redirect with token
    const targetUrl = new URL(targetApp.url);
    targetUrl.searchParams.set('token', token);
    targetUrl.searchParams.set('returnUrl', window.location.origin);
    
    window.location.href = targetUrl.toString();
  };
  
  return (
    <button onClick={launchApp}>
      Launch {targetApp.name}
    </button>
  );
}
```

## Error Handling

### Common Auth Errors

| Error Code | Description | User Message |
|------------|-------------|--------------|
| `auth/user-not-found` | Email not registered | "No account found with this email address." |
| `auth/wrong-password` | Invalid password | "Incorrect password. Please try again." |
| `auth/email-already-in-use` | Email taken | "An account with this email already exists." |
| `auth/weak-password` | Password too simple | "Password is too weak. Please choose a stronger password." |
| `auth/invalid-email` | Email format invalid | "Please enter a valid email address." |
| `auth/too-many-requests` | Rate limited | "Too many failed attempts. Please try again later." |

### Error Handling Pattern

```typescript
async function handleSignIn(email: string, password: string) {
  try {
    await signIn(email, password);
    navigate('/dashboard');
  } catch (error) {
    const authError = getAuthErrorMessage(error);
    
    switch (authError.code) {
      case 'auth/user-not-found':
        // Suggest sign up
        showSuggestion('No account found. Would you like to sign up?');
        break;
      
      case 'auth/too-many-requests':
        // Show countdown timer
        showRateLimitError(authError.userFriendlyMessage);
        break;
      
      default:
        // Show generic error
        showError(authError.userFriendlyMessage);
    }
  }
}
```

## Best Practices

### 1. Type Safety

Always define proper user types:

```typescript
// ✅ Good
interface AppUser extends BaseUser {
  role: 'admin' | 'user';
  settings: UserSettings;
}

// ❌ Bad
const user = useAuth(); // No type information
```

### 2. Loading States

Always handle loading states:

```typescript
// ✅ Good
if (isLoading) return <Skeleton />;
if (!userProfile) return <SignInPrompt />;
return <Dashboard user={userProfile} />;

// ❌ Bad
return <Dashboard user={userProfile!} />; // Assumes user exists
```

### 3. Permission Checks

Check permissions before operations:

```typescript
// ✅ Good
const { hasFeature } = usePermissions({ appId, user });
if (hasFeature('data-export')) {
  showExportButton();
}

// ❌ Bad
// Assumes all users can export
showExportButton();
```

### 4. Error Messages

Use user-friendly error messages:

```typescript
// ✅ Good
const { userFriendlyMessage } = getAuthErrorMessage(error);
alert(userFriendlyMessage);

// ❌ Bad
alert(error.message); // Technical Firebase error
```

## Migration Guide

### From Custom Auth to CyberEco Auth

1. **Install Dependencies**
```bash
npm install @cybereco/auth @cybereco/shared-types
```

2. **Update User Model**
```typescript
// Before
interface User {
  id: string;
  email: string;
  // ...
}

// After
interface AppUser extends BaseUser {
  // Only app-specific fields
}
```

3. **Replace Auth Provider**
```typescript
// Before
<CustomAuthProvider>
  <App />
</CustomAuthProvider>

// After
const { AuthProvider } = createAuthContext<AppUser>();
<AuthProvider config={authConfig}>
  <App />
</AuthProvider>
```

4. **Update Auth Hooks**
```typescript
// Before
const { user, login } = useCustomAuth();

// After
const { userProfile, signIn } = useAuth();
```

## Troubleshooting

### Debug Mode

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('DEBUG_AUTH', 'true');

// In code
if (localStorage.getItem('DEBUG_AUTH')) {
  console.log('Auth state:', { currentUser, userProfile });
}
```

### Common Issues

**Issue**: User profile not loading
```typescript
// Check Firebase rules
// Ensure user document exists
// Verify collection name matches config
```

**Issue**: Permissions not working
```typescript
// Verify user.permissions array exists
// Check appId matches exactly
// Ensure features are granted in Hub
```

**Issue**: Session not persisting
```typescript
// Check IndexedDB not corrupted
// Verify persistence mode
// Ensure cookies enabled
```