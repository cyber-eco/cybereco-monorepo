# Lightweight Apps Implementation Guide

## Quick Start

Transform your CyberEco apps into lightweight compute layers with this simple pattern:

### 1. Authentication (Simple)

```typescript
// app/layout.tsx
import { useHubAuth } from '@cybereco/auth';

export default function AppLayout({ children }) {
  const { user, isLoading, isAuthenticated } = useHubAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    // Redirect to Hub for auth
    window.location.href = `${HUB_URL}/auth/signin?returnUrl=${window.location.href}`;
    return null;
  }
  
  return (
    <div>
      <header>Welcome {user.name}</header>
      {children}
    </div>
  );
}
```

### 2. Data Storage (Reference Hub Users)

```typescript
// Store app data with Hub user reference
interface AppData {
  id: string;
  hubUserId: string;  // Links to Hub user
  // ... app specific fields
}

// Example: Create expense in JustSplit
await createExpense({
  hubUserId: user.id,  // From useHubAuth()
  amount: 100,
  description: "Lunch"
});
```

### 3. No User Management

```typescript
// ❌ DON'T DO THIS
await createUserProfile(userId, userData);
await updateUserEmail(userId, newEmail);

// ✅ DO THIS INSTEAD
const { user, goToProfile } = useHubAuth();
// For profile updates:
goToProfile(); // Redirects to Hub
```

### 4. Pure Compute Functions

```typescript
// Apps focus on domain logic
export function calculateSplits(expenses: Expense[]) {
  // Pure compute - no user management
  const balances = new Map();
  // ... calculation logic
  return balances;
}
```

## Architecture Benefits

1. **Simple**: No complex auth logic in apps
2. **Secure**: Centralized user management
3. **Scalable**: Easy to add new apps
4. **Future-Proof**: Ready for blockchain migration

## Migration Path

### Current (Firebase)
```typescript
// Hub stores users in Firestore
users/
  userId/
    - email
    - name
    - permissions

// Apps store data with Hub references
expenses/
  expenseId/
    - hubUserId
    - amount
    - description
```

### Future (Blockchain)
```typescript
// Hub stores users on-chain
contract HubUsers {
  mapping(address => User) public users;
}

// Apps store data on IPFS/Chain
contract JustSplitData {
  mapping(address => ExpenseHash[]) public userExpenses;
}
```

## Example Apps

### JustSplit (Expense Tracking)
- **Compute**: Split calculations, settlements
- **Data**: Expenses, groups, events
- **No**: User profiles, authentication

### Somos (Family Trees)
- **Compute**: Relationship mapping, tree generation
- **Data**: Family connections, stories
- **No**: User management

### Demos (Voting)
- **Compute**: Vote tallying, consensus algorithms
- **Data**: Proposals, votes, decisions
- **No**: Voter registration (uses Hub)

### Plantopia (Gardening)
- **Compute**: Care schedules, growth predictions
- **Data**: Plants, gardens, care events
- **No**: Gardener profiles

## Key Principles

1. **Apps are stateless** - Auth comes from Hub tokens
2. **Data references Hub users** - Never duplicate user data
3. **Compute is the value** - Focus on domain logic
4. **Redirect for user ops** - Profile, settings, etc. go to Hub

## Testing Locally

```bash
# 1. Start Hub (handles all auth)
cd apps/hub && npm run dev

# 2. Start your app
cd apps/justsplit && npm run dev

# 3. Click app in Hub dashboard
# Hub generates token → App receives token → User authenticated
```

That's it! Keep it simple, lightweight, and focused on your app's unique value.