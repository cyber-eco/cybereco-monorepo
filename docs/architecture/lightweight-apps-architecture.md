# Lightweight Apps Architecture

## Overview

CyberEco apps are lightweight compute layers that operate on top of a centralized data layer (currently Firebase, future blockchain).

## Core Principles

1. **Single User Database**: Hub manages all user authentication and profiles
2. **Lightweight Apps**: Apps only handle compute logic and app-specific data
3. **Stateless Authentication**: Apps receive auth tokens but don't store user data
4. **Data Layer Agnostic**: Easy to migrate from Firebase to blockchain

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        HUB                               │
│  • User Authentication (Firebase Auth)                   │
│  • User Profiles (Firestore → Blockchain)               │
│  • App Permissions                                       │
│  • SSO Token Generation                                  │
└────────────────────┬────────────────────────────────────┘
                     │ Auth Tokens
     ┌───────────────┼───────────────┬─────────────────┐
     ▼               ▼               ▼                 ▼
┌──────────┐   ┌──────────┐   ┌──────────┐      ┌──────────┐
│JustSplit │   │  Somos   │   │  Demos   │      │Plantopia │
├──────────┤   ├──────────┤   ├──────────┤      ├──────────┤
│• Expenses │   │• Family  │   │• Votes   │      │• Plants  │
│• Groups  │   │  Trees   │   │• Proposals│      │• Gardens │
│• Events  │   │• Stories │   │• Decisions│      │• Care    │
└──────────┘   └──────────┘   └──────────┘      └──────────┘
     │               │               │                 │
     └───────────────┴───────────────┴─────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Data Layer    │
                    │ Firebase → Web3 │
                    └─────────────────┘
```

## Implementation Pattern

### 1. App Authentication (Simplified)

```typescript
// Apps only receive and verify auth tokens
interface AppAuthContext {
  user: {
    id: string;
    name: string;
    email: string;
    permissions: string[];
  } | null;
  isAuthenticated: boolean;
  signOut: () => void; // Redirects to Hub
}
```

### 2. Data Storage Pattern

```typescript
// App-specific data references Hub user ID
interface ExpenseRecord {
  id: string;
  hubUserId: string;  // Links to Hub user
  amount: number;
  description: string;
  createdAt: timestamp;
}
```

### 3. Lightweight App Structure

```
apps/[app-name]/
├── src/
│   ├── services/
│   │   ├── auth.ts         # Token verification only
│   │   └── data.ts         # App-specific data operations
│   ├── hooks/
│   │   └── useHubAuth.ts   # Consumes Hub auth
│   └── app/
│       └── page.tsx        # UI components
└── package.json
```

## Migration Path to Blockchain

### Phase 1: Current (Firebase)
- Hub: Firebase Auth + Firestore
- Apps: Firestore collections

### Phase 2: Hybrid
- Hub: Firebase Auth + Smart Contract profiles
- Apps: IPFS + Smart Contract data

### Phase 3: Full Web3
- Hub: Web3 wallet auth + ENS profiles
- Apps: Fully decentralized data

## Benefits

1. **Simplicity**: Apps focus only on their domain logic
2. **Security**: Centralized auth management
3. **Scalability**: Easy to add new apps
4. **Future-Proof**: Clean separation enables blockchain migration
5. **Cost-Effective**: Minimal infrastructure per app

## Example: JustSplit as Lightweight App

```typescript
// No Firebase Auth imports
// No user profile management
// Just compute and app data

export function useJustSplitAuth() {
  const token = getAuthTokenFromURL();
  const user = verifyAndDecodeToken(token);
  
  return {
    user,
    isAuthenticated: !!user,
    signOut: () => window.location.href = HUB_URL + '/signout'
  };
}

// App focuses on its domain
export function calculateSplits(expenses: Expense[]) {
  // Pure compute logic
  return splits;
}
```

## Key Takeaway

Apps are just "compute functions" that:
1. Receive authenticated user context from Hub
2. Process domain-specific logic
3. Store minimal app-specific data
4. Never manage users or authentication