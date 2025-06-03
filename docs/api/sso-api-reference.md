# SSO API Reference

This document provides a comprehensive API reference for the CyberEco Single Sign-On (SSO) implementation.

## Table of Contents

- [Shared Auth State Functions](#shared-auth-state-functions)
- [Auth Context Hooks](#auth-context-hooks)
- [SSO Components](#sso-components)
- [Types and Interfaces](#types-and-interfaces)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Shared Auth State Functions

### `saveSharedAuthState(user, token?)`

Saves authentication state to shared storage for cross-app SSO.

#### Parameters

- `user: SharedAuthUser | null` - The authenticated user object or null to clear
- `token?: string | null` - Optional authentication token

#### Example

```typescript
import { saveSharedAuthState } from '@cybereco/auth';

// Save user authentication
saveSharedAuthState({
  uid: 'user-123',
  email: 'user@example.com',
  displayName: 'John Doe',
  photoURL: 'https://example.com/photo.jpg',
  emailVerified: true
});

// Clear authentication
saveSharedAuthState(null);
```

### `getSharedAuthState()`

Retrieves the current shared authentication state.

#### Returns

`SharedAuthState | null` - The current auth state or null if not authenticated

#### Example

```typescript
import { getSharedAuthState } from '@cybereco/auth';

const authState = getSharedAuthState();
if (authState?.user) {
  console.log('Authenticated as:', authState.user.email);
} else {
  console.log('Not authenticated');
}
```

### `waitForAuth(timeout?)`

Asynchronously waits for authentication state to become available.

#### Parameters

- `timeout?: number` - Maximum time to wait in milliseconds (default: 5000)

#### Returns

`Promise<SharedAuthState | null>` - Resolves with auth state or null if timeout

#### Example

```typescript
import { waitForAuth } from '@cybereco/auth';

async function checkHubAuth() {
  const authState = await waitForAuth(5000);
  if (authState?.user) {
    console.log('Hub authentication found:', authState.user);
  } else {
    console.log('No Hub authentication after 5 seconds');
  }
}
```

### `clearSharedAuthState()`

Removes shared authentication state from storage.

#### Example

```typescript
import { clearSharedAuthState } from '@cybereco/auth';

// Sign out user
clearSharedAuthState();
```

### `subscribeToAuthStateChanges(callback)`

Subscribes to authentication state changes across tabs/windows.

#### Parameters

- `callback: (state: SharedAuthState | null) => void` - Function called on auth changes

#### Returns

`() => void` - Unsubscribe function

#### Example

```typescript
import { subscribeToAuthStateChanges } from '@cybereco/auth';

const unsubscribe = subscribeToAuthStateChanges((state) => {
  if (state?.user) {
    console.log('User signed in:', state.user.email);
  } else {
    console.log('User signed out');
  }
});

// Later: clean up subscription
unsubscribe();
```

## Auth Context Hooks

### Hub: `useAuth()`

Hook for accessing Hub authentication context.

#### Returns

```typescript
{
  currentUser: FirebaseUser | null;
  userProfile: HubUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'facebook' | 'twitter') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<HubUser>) => Promise<void>;
}
```

#### Example

```typescript
import { useAuth } from '../components/AuthContext';

function HubComponent() {
  const { userProfile, signOut, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!userProfile) return <div>Not authenticated</div>;
  
  return (
    <div>
      Welcome, {userProfile.name}!
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### JustSplit: `useAuth()` and `useHubAuth()`

Hooks for JustSplit authentication with Hub integration.

#### `useAuth()` Returns

```typescript
{
  currentUser: FirebaseUser | null;
  userProfile: JustSplitUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  redirectToHub: (action: 'signin' | 'signup') => void;
}
```

#### `useHubAuth()` Returns

```typescript
{
  isAuthenticated: boolean;
  needsHubAuth: boolean;
  redirectToHub: (action: 'signin' | 'signup') => void;
  userProfile: JustSplitUser | null;
}
```

#### Example

```typescript
import { useAuth, useHubAuth } from '../context/JustSplitAuthContext';

function JustSplitComponent() {
  const { userProfile } = useAuth();
  const { needsHubAuth, redirectToHub } = useHubAuth();
  
  useEffect(() => {
    if (needsHubAuth) {
      redirectToHub('signin');
    }
  }, [needsHubAuth]);
  
  if (!userProfile) return <div>Loading...</div>;
  
  return <div>Welcome to JustSplit, {userProfile.name}!</div>;
}
```

## SSO Components

### `<ProtectedRoute>`

Component that enforces authentication for protected pages.

#### Props

- `children: React.ReactNode` - Content to render when authenticated

#### Example

```typescript
import ProtectedRoute from '../components/Auth/ProtectedRoute';

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### `<AuthProvider>` (Hub)

Provider component for Hub authentication context.

#### Example

```typescript
import { AuthProvider } from './components/AuthContext';

function HubApp({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### `<JustSplitAuthProvider>`

Provider component for JustSplit with Hub SSO integration.

#### Example

```typescript
import { JustSplitAuthProvider } from './context/JustSplitAuthContext';

function JustSplitApp({ children }) {
  return (
    <JustSplitAuthProvider>
      {children}
    </JustSplitAuthProvider>
  );
}
```

## Types and Interfaces

### `SharedAuthUser`

```typescript
interface SharedAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}
```

### `SharedAuthState`

```typescript
interface SharedAuthState {
  user: SharedAuthUser | null;
  token: string | null;
  timestamp: number;
}
```

### `HubUser`

```typescript
interface HubUser extends BaseUser {
  apps: string[];
  permissions: AppPermission[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'es';
    notifications: boolean;
  };
  lastLoginAt?: string;
  isAdmin?: boolean;
}
```

### `JustSplitUser`

```typescript
interface JustSplitUser extends BaseUser {
  balance: number;
  preferredCurrency: string;
  friends: string[];
  friendRequestsSent: string[];
  friendRequestsReceived: string[];
  hubUserId: string;
}
```

## Usage Examples

### Complete SSO Flow Example

```typescript
// 1. Hub Sign In
// In Hub app (apps/hub/src/app/auth/signin/page.tsx)
import { useAuth } from '../../../components/AuthContext';

function SignInPage() {
  const { signIn } = useAuth();
  
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      // Auth state automatically saved to shared storage
      // User redirected to dashboard or returnUrl
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };
  
  return <SignInForm onSubmit={handleSignIn} />;
}

// 2. Launch App from Hub
// In Hub app (apps/hub/src/components/AppGrid.tsx)
function AppCard({ app }) {
  const handleLaunch = () => {
    // Shared auth state already saved by AuthContext
    window.location.href = `${app.url}?fromHub=true`;
  };
  
  return (
    <Card onClick={handleLaunch}>
      <h3>{app.name}</h3>
      <button>Launch App</button>
    </Card>
  );
}

// 3. App Receives Authentication
// In JustSplit (apps/justsplit/src/context/JustSplitAuthContext.tsx)
// This happens automatically in the auth provider
// The provider checks for fromHub parameter and shared auth state

// 4. Protected Page Access
// In JustSplit (apps/justsplit/src/app/expenses/page.tsx)
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

export default function ExpensesPage() {
  return (
    <ProtectedRoute>
      <ExpensesList />
    </ProtectedRoute>
  );
}
```

### Cross-Tab Synchronization Example

```typescript
// In any app component
import { subscribeToAuthStateChanges } from '@cybereco/auth';

function AuthWatcher() {
  useEffect(() => {
    const unsubscribe = subscribeToAuthStateChanges((state) => {
      if (!state?.user) {
        // User signed out in another tab
        window.location.href = '/auth/signin';
      }
    });
    
    return unsubscribe;
  }, []);
  
  return null;
}
```

### Manual Auth Check Example

```typescript
// Check auth before expensive operations
import { getSharedAuthState } from '@cybereco/auth';

async function fetchUserData() {
  const auth = getSharedAuthState();
  
  if (!auth?.user) {
    throw new Error('Not authenticated');
  }
  
  const response = await fetch(`/api/users/${auth.user.uid}`);
  return response.json();
}
```

## Best Practices

### 1. Always Use Auth Providers

Never access Firebase Auth directly in components. Always use the provided auth contexts:

```typescript
// ❌ Bad
import { auth } from '../firebase/config';
const user = auth.currentUser;

// ✅ Good
import { useAuth } from '../context/AuthContext';
const { currentUser } = useAuth();
```

### 2. Handle Loading States

Always show appropriate loading states while authentication is being checked:

```typescript
function MyComponent() {
  const { userProfile, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!userProfile) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome, {userProfile.name}!</div>;
}
```

### 3. Use ProtectedRoute for Page-Level Protection

Wrap entire pages that require authentication:

```typescript
// ❌ Bad - checking auth in component
function ProfilePage() {
  const { userProfile } = useAuth();
  
  if (!userProfile) {
    redirect('/auth/signin');
  }
  
  return <Profile />;
}

// ✅ Good - using ProtectedRoute
function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
```

### 4. Clean Up Subscriptions

Always clean up auth state subscriptions:

```typescript
useEffect(() => {
  const unsubscribe = subscribeToAuthStateChanges((state) => {
    // Handle auth changes
  });
  
  return () => {
    unsubscribe(); // Clean up on unmount
  };
}, []);
```

### 5. Handle SSO Timing

Give Hub authentication time to propagate when launching apps:

```typescript
// In app auth context
if (isFromHub) {
  // Wait for shared auth state
  const authState = await waitForAuth(5000);
  if (authState?.user) {
    // Process Hub authentication
  }
}
```

### 6. Environment-Specific Configuration

Use environment variables for URLs:

```typescript
const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';
```

### 7. Error Handling

Always handle authentication errors gracefully:

```typescript
try {
  await signIn(email, password);
} catch (error) {
  if (error.code === 'auth/user-not-found') {
    showError('No account found with this email');
  } else if (error.code === 'auth/wrong-password') {
    showError('Incorrect password');
  } else {
    showError('An error occurred. Please try again.');
  }
}
```

## Troubleshooting

### Common Issues

1. **"Shared auth state not found"**
   - Ensure Hub AuthContext is saving state on user load
   - Check browser console for save confirmation
   - Verify localStorage is not blocked

2. **"Redirect loop between Hub and app"**
   - Check ProtectedRoute timing logic
   - Ensure `fromHub` parameter is properly handled
   - Verify auth context initialization order

3. **"Authentication lost on refresh"**
   - Check Firebase persistence settings
   - Verify shared auth state expiration (24 hours)
   - Ensure auth providers are at root level

### Debug Mode

Enable debug logging for SSO:

```typescript
// In browser console
localStorage.setItem('debug', 'cybereco:auth:*');
```

This will log detailed information about:
- Shared auth state saves/loads
- Auth context initialization
- SSO flow timing
- Cross-tab synchronization events