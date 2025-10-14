# Migration Guide: Integrating Apps with Hub Data Layer

## 📋 Overview

This guide provides step-by-step instructions for migrating existing CyberEco applications to use the Hub as their unified data layer. It covers both existing apps (like JustSplit) and guidelines for new apps (Somos, Demos, Plantopia).

## 🎯 Migration Goals

1. **Centralize user authentication** through Hub
2. **Unify shared data models** (users, groups, transactions)
3. **Enable cross-app data sharing** with proper permissions
4. **Maintain app-specific functionality** while leveraging shared services
5. **Ensure zero downtime** during migration

## 🏗️ Migration Architecture

### Before Migration (Current State)
```
JustSplit App
├── Own Firebase Auth
├── Own User Management
├── Own Group System
├── Isolated Data
└── No Cross-App Integration
```

### After Migration (Target State)
```
JustSplit App
├── Hub Authentication (SSO)
├── Hub User Profiles (Shared)
├── Hub Groups (Extended)
├── App-Specific Data (Linked)
└── Cross-App Integration Ready
```

## 📝 Pre-Migration Checklist

Before starting migration:

- [ ] Backup all production data
- [ ] Document current data models
- [ ] Map existing data to Hub models
- [ ] Identify app-specific extensions needed
- [ ] Set up staging environment
- [ ] Create rollback plan
- [ ] Notify users of upcoming changes
- [ ] Prepare support documentation

## 🚀 Migration Steps for Existing Apps (JustSplit)

### Phase 1: Authentication Migration (Week 1)

#### Step 1.1: Integrate Hub Authentication
```typescript
// Old: Direct Firebase Auth
import { auth } from './firebaseConfig';

// New: Hub Authentication
import { HubAuth } from '@cybereco/hub-sdk';

const hubAuth = new HubAuth({
  appId: 'justsplit',
  redirectUrl: 'https://justsplit.cybere.co/auth/callback'
});

// Replace login flow
export async function login(email: string, password: string) {
  // Redirect to Hub for authentication
  return hubAuth.login({ email, password });
}

// Handle SSO callback
export async function handleAuthCallback(token: string) {
  const user = await hubAuth.verifyToken(token);
  // Store user session
  await storeUserSession(user);
}
```

#### Step 1.2: Update User Context
```typescript
// contexts/AuthContext.tsx
import { useHubAuth } from '@cybereco/hub-sdk';

export function AuthProvider({ children }) {
  const { user, loading, error } = useHubAuth({
    appId: 'justsplit',
    onAuthStateChange: (user) => {
      // Sync with local app state
      if (user) {
        syncUserData(user);
      }
    }
  });

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### Step 1.3: Migration Script for Existing Users
```typescript
// scripts/migrateUsers.ts
async function migrateUsersToHub() {
  const users = await getExistingUsers();
  
  for (const user of users) {
    try {
      // Create Hub profile
      const hubUser = await hubApi.users.create({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        appData: {
          justsplit: {
            profileId: user.uid,
            migratedAt: new Date()
          }
        }
      });
      
      // Link existing data
      await linkUserData(user.uid, hubUser.id);
      
      console.log(`Migrated user: ${user.email}`);
    } catch (error) {
      console.error(`Failed to migrate user: ${user.email}`, error);
    }
  }
}
```

### Phase 2: Data Model Migration (Week 2)

#### Step 2.1: Map Existing Models to Hub Models

**User Model Mapping:**
```typescript
// Before: JustSplit User
interface JustSplitUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  groups: string[];
  preferences: {
    defaultCurrency: string;
    emailNotifications: boolean;
  };
}

// After: Hub User + JustSplit Extension
interface HubUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  preferences: {
    currency: string;
    language: string;
    // ... other global preferences
  };
  appData: {
    justsplit: {
      profileId: string;
      settings: {
        emailNotifications: boolean;
        // ... JustSplit-specific settings
      };
    };
  };
}
```

**Group Model Mapping:**
```typescript
// Before: JustSplit Group
interface JustSplitGroup {
  id: string;
  name: string;
  members: Member[];
  currency: string;
  createdBy: string;
  simplifyDebts: boolean;
}

// After: Hub SharedGroup + JustSplit Context
interface SharedGroup {
  id: string;
  name: string;
  members: GroupMember[];
  appContexts: {
    justsplit: {
      groupId: string; // Original JustSplit group ID
      features: ['expense_tracking', 'settlements'];
      settings: {
        currency: string;
        simplifyDebts: boolean;
      };
    };
  };
}
```

#### Step 2.2: Create Data Adapters
```typescript
// adapters/userAdapter.ts
export class UserAdapter {
  static toHubUser(jsUser: JustSplitUser): Partial<HubUser> {
    return {
      email: jsUser.email,
      name: jsUser.displayName,
      avatarUrl: jsUser.photoURL,
      preferences: {
        currency: jsUser.preferences.defaultCurrency,
        language: 'en', // Default
      },
      appData: {
        justsplit: {
          profileId: jsUser.uid,
          settings: {
            emailNotifications: jsUser.preferences.emailNotifications
          }
        }
      }
    };
  }
  
  static fromHubUser(hubUser: HubUser): JustSplitUser {
    return {
      uid: hubUser.appData.justsplit.profileId,
      email: hubUser.email,
      displayName: hubUser.name,
      photoURL: hubUser.avatarUrl,
      groups: [], // Will be loaded separately
      preferences: {
        defaultCurrency: hubUser.preferences.currency,
        emailNotifications: hubUser.appData.justsplit.settings.emailNotifications
      }
    };
  }
}
```

### Phase 3: Service Integration (Week 3)

#### Step 3.1: Replace Local Services with Hub Services
```typescript
// services/dataService.ts
import { HubDataService } from '@cybereco/hub-sdk';
import { UserAdapter, GroupAdapter, TransactionAdapter } from '../adapters';

export class JustSplitDataService {
  private hub: HubDataService;
  
  constructor() {
    this.hub = new HubDataService({
      appId: 'justsplit',
      apiKey: process.env.HUB_API_KEY
    });
  }
  
  // User operations
  async getUser(userId: string): Promise<JustSplitUser> {
    const hubUser = await this.hub.users.get(userId);
    return UserAdapter.fromHubUser(hubUser);
  }
  
  // Transaction operations (shared + app-specific)
  async createExpense(expense: ExpenseInput): Promise<Expense> {
    // 1. Create shared transaction in Hub
    const transaction = await this.hub.transactions.create({
      userId: expense.paidBy,
      amount: expense.amount,
      currency: expense.currency,
      type: 'expense',
      category: expense.category,
      date: expense.date,
      appId: 'justsplit',
      groupId: expense.groupId
    });
    
    // 2. Store app-specific data locally
    const jsExpense = await this.saveExpenseDetails({
      transactionId: transaction.id,
      splits: expense.splits,
      receipts: expense.receipts,
      notes: expense.notes
    });
    
    return {
      ...transaction,
      ...jsExpense
    };
  }
  
  // Group operations
  async createGroup(group: GroupInput): Promise<Group> {
    // Create shared group in Hub
    const sharedGroup = await this.hub.groups.create({
      name: group.name,
      members: group.members.map(m => ({
        userId: m.userId,
        role: m.isAdmin ? 'admin' : 'member'
      }))
    });
    
    // Link to JustSplit
    await this.hub.groups.linkToApp(sharedGroup.id, 'justsplit', {
      appGroupId: generateGroupId(),
      features: ['expense_tracking', 'settlements'],
      settings: {
        currency: group.currency,
        simplifyDebts: group.simplifyDebts
      }
    });
    
    return GroupAdapter.fromHubGroup(sharedGroup);
  }
}
```

#### Step 3.2: Implement Real-time Sync
```typescript
// services/syncService.ts
export class SyncService {
  private hub: HubRealtimeService;
  private subscriptions: Map<string, () => void> = new Map();
  
  constructor() {
    this.hub = new HubRealtimeService({
      appId: 'justsplit'
    });
  }
  
  // Subscribe to user data changes
  subscribeToUser(userId: string, callback: (user: JustSplitUser) => void) {
    const unsubscribe = this.hub.subscribe(`user:${userId}`, (event) => {
      if (event.type === 'user.updated') {
        const user = UserAdapter.fromHubUser(event.data);
        callback(user);
      }
    });
    
    this.subscriptions.set(`user:${userId}`, unsubscribe);
  }
  
  // Subscribe to group changes
  subscribeToGroup(groupId: string, callback: (group: Group) => void) {
    const unsubscribe = this.hub.subscribe(`group:${groupId}`, (event) => {
      if (event.type === 'group.updated' || event.type === 'group.member.added') {
        const group = GroupAdapter.fromHubGroup(event.data);
        callback(group);
      }
    });
    
    this.subscriptions.set(`group:${groupId}`, unsubscribe);
  }
  
  // Handle offline/online sync
  async syncOfflineData() {
    const pendingSync = await getOfflineQueue();
    
    for (const item of pendingSync) {
      try {
        await this.hub.sync(item);
        await removeFromOfflineQueue(item.id);
      } catch (error) {
        console.error('Sync failed:', item, error);
      }
    }
  }
}
```

### Phase 4: Testing & Validation (Week 4)

#### Step 4.1: Integration Tests
```typescript
// __tests__/hubIntegration.test.ts
describe('Hub Integration', () => {
  let testUser: HubUser;
  let dataService: JustSplitDataService;
  
  beforeEach(async () => {
    dataService = new JustSplitDataService();
    testUser = await createTestUser();
  });
  
  test('should create expense with Hub transaction', async () => {
    const expense = await dataService.createExpense({
      amount: 100,
      currency: 'USD',
      paidBy: testUser.id,
      splits: [
        { userId: testUser.id, amount: 50 },
        { userId: 'user_2', amount: 50 }
      ]
    });
    
    // Verify Hub transaction created
    const hubTransaction = await hubApi.transactions.get(expense.transactionId);
    expect(hubTransaction).toBeDefined();
    expect(hubTransaction.amount).toBe(100);
    
    // Verify app-specific data
    const jsExpense = await getExpenseDetails(expense.id);
    expect(jsExpense.splits).toHaveLength(2);
  });
  
  test('should sync user profile changes from Hub', async () => {
    const syncService = new SyncService();
    const updates: JustSplitUser[] = [];
    
    syncService.subscribeToUser(testUser.id, (user) => {
      updates.push(user);
    });
    
    // Update user in Hub
    await hubApi.users.update(testUser.id, {
      name: 'Updated Name'
    });
    
    // Wait for sync
    await waitFor(() => {
      expect(updates).toHaveLength(1);
      expect(updates[0].displayName).toBe('Updated Name');
    });
  });
});
```

#### Step 4.2: Performance Testing
```typescript
// scripts/performanceTest.ts
async function testMigrationPerformance() {
  const metrics = {
    authTime: [],
    dataFetchTime: [],
    syncTime: []
  };
  
  // Test authentication performance
  const authStart = Date.now();
  await hubAuth.login({ email: 'test@example.com', password: 'test' });
  metrics.authTime.push(Date.now() - authStart);
  
  // Test data fetching
  const fetchStart = Date.now();
  await Promise.all([
    dataService.getUser('user_123'),
    dataService.getUserGroups('user_123'),
    dataService.getUserTransactions('user_123')
  ]);
  metrics.dataFetchTime.push(Date.now() - fetchStart);
  
  // Test sync performance
  const syncStart = Date.now();
  await syncService.syncOfflineData();
  metrics.syncTime.push(Date.now() - syncStart);
  
  console.log('Performance Metrics:', {
    auth: average(metrics.authTime),
    dataFetch: average(metrics.dataFetchTime),
    sync: average(metrics.syncTime)
  });
}
```

### Phase 5: Deployment (Week 5)

#### Step 5.1: Gradual Rollout
```typescript
// config/featureFlags.ts
export const FEATURE_FLAGS = {
  USE_HUB_AUTH: process.env.USE_HUB_AUTH === 'true',
  USE_HUB_DATA: process.env.USE_HUB_DATA === 'true',
  SYNC_ENABLED: process.env.SYNC_ENABLED === 'true'
};

// Progressive rollout
export function shouldUseHubForUser(userId: string): boolean {
  // Start with internal users
  if (INTERNAL_USERS.includes(userId)) return true;
  
  // Then percentage-based rollout
  const rolloutPercentage = parseInt(process.env.HUB_ROLLOUT_PERCENTAGE || '0');
  const userHash = hashUserId(userId);
  return userHash % 100 < rolloutPercentage;
}
```

#### Step 5.2: Monitoring Setup
```typescript
// monitoring/hubMetrics.ts
export function trackHubIntegration() {
  // Track migration progress
  analytics.track('hub_migration', {
    totalUsers: getTotalUsers(),
    migratedUsers: getMigratedUsers(),
    percentage: (getMigratedUsers() / getTotalUsers()) * 100
  });
  
  // Track performance
  performance.mark('hub_api_start');
  // ... API call
  performance.mark('hub_api_end');
  performance.measure('hub_api_duration', 'hub_api_start', 'hub_api_end');
  
  // Track errors
  window.addEventListener('error', (event) => {
    if (event.error?.source === 'hub-integration') {
      errorTracking.captureException(event.error);
    }
  });
}
```

## 🆕 Integration Guide for New Apps

### Step 1: App Registration

Register your new app with the Hub:

```typescript
// Register app with Hub
const appRegistration = {
  appId: 'somos',
  name: 'Somos - Family Roots Explorer',
  description: 'Explore and document your family history',
  icon: 'https://somos.cybere.co/icon.png',
  permissions: [
    'read:users',
    'write:users',
    'read:groups',
    'write:groups',
    'create:activities'
  ],
  webhookUrl: 'https://somos.cybere.co/api/webhooks/hub'
};

const { apiKey } = await hubApi.apps.register(appRegistration);
```

### Step 2: Setup Hub SDK

```typescript
// lib/hubClient.ts
import { HubClient } from '@cybereco/hub-sdk';

export const hub = new HubClient({
  appId: 'somos',
  apiKey: process.env.HUB_API_KEY,
  environment: process.env.NODE_ENV
});

// Export convenience methods
export const hubAuth = hub.auth;
export const hubData = hub.data;
export const hubRealtime = hub.realtime;
```

### Step 3: Design App-Specific Models

```typescript
// models/somos.ts
// Extend Hub models for Somos
interface SomosFamily extends SharedGroup {
  appContexts: {
    somos: {
      familyTreeId: string;
      rootMember: string;
      culturalBackground: {
        primaryCulture: string;
        languages: string[];
        traditions: string[];
      };
    };
  };
}

interface SomosMemory extends Activity {
  appData: {
    somos: {
      familyId: string;
      mediaUrls: string[];
      location?: {
        lat: number;
        lng: number;
        placeName: string;
      };
      peopleTagged: string[];
      date?: string;
      tags: string[];
    };
  };
}
```

### Step 4: Implement Services

```typescript
// services/familyService.ts
export class FamilyService {
  async createFamily(input: CreateFamilyInput): Promise<SomosFamily> {
    // 1. Create shared group in Hub
    const group = await hubData.groups.create({
      name: input.familyName,
      description: `${input.familyName} family group`,
      members: input.members,
      settings: {
        privacy: 'private',
        joinApproval: true
      }
    });
    
    // 2. Link to Somos with family-specific data
    await hubData.groups.linkToApp(group.id, 'somos', {
      appGroupId: generateFamilyId(),
      features: ['family_tree', 'memories', 'cultural_heritage'],
      settings: {
        familyTreeId: await createFamilyTree(input.rootMember),
        rootMember: input.rootMember,
        culturalBackground: input.culturalBackground
      }
    });
    
    return group as SomosFamily;
  }
  
  async addMemory(memory: CreateMemoryInput): Promise<SomosMemory> {
    // Create activity in Hub
    const activity = await hubData.activities.create({
      type: 'memory_added',
      userId: memory.createdBy,
      title: memory.title,
      description: memory.description,
      appId: 'somos',
      appData: {
        somos: {
          familyId: memory.familyId,
          mediaUrls: await uploadMedia(memory.media),
          location: memory.location,
          peopleTagged: memory.taggedPeople,
          date: memory.date,
          tags: memory.tags
        }
      }
    });
    
    // Notify tagged family members
    await notifyTaggedMembers(memory.taggedPeople, activity);
    
    return activity as SomosMemory;
  }
}
```

### Step 5: Setup Authentication Flow

```typescript
// app/auth/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hubAuth } from '@/lib/hubClient';

export default function AuthPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to Hub for authentication
    hubAuth.redirectToLogin({
      returnUrl: window.location.origin + '/auth/callback'
    });
  }, []);
  
  return <div>Redirecting to CyberEco Hub for authentication...</div>;
}

// app/auth/callback/page.tsx
export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const handleCallback = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        await hubAuth.handleCallback(token);
        router.push('/dashboard');
      }
    };
    
    handleCallback();
  }, []);
  
  return <div>Completing authentication...</div>;
}
```

## 🔄 Common Migration Patterns

### Pattern 1: Dual-Write During Migration
```typescript
// Temporarily write to both systems
async function createExpense(expense: ExpenseInput) {
  // Write to Hub
  const hubTransaction = await hub.transactions.create(expense);
  
  // Write to legacy system
  const legacyExpense = await legacyDb.expenses.create(expense);
  
  // Track migration status
  await trackDualWrite('expense', hubTransaction.id, legacyExpense.id);
  
  return { hubId: hubTransaction.id, legacyId: legacyExpense.id };
}
```

### Pattern 2: Feature Flag Rollout
```typescript
export function useDataSource() {
  const userId = useCurrentUser().id;
  
  if (shouldUseHubForUser(userId)) {
    return {
      getUser: hubData.users.get,
      updateUser: hubData.users.update,
      source: 'hub'
    };
  } else {
    return {
      getUser: legacyData.users.get,
      updateUser: legacyData.users.update,
      source: 'legacy'
    };
  }
}
```

### Pattern 3: Lazy Migration
```typescript
// Migrate data on first access
async function getUser(userId: string) {
  // Check if migrated
  let hubUser = await hubData.users.get(userId);
  
  if (!hubUser) {
    // Migrate on demand
    const legacyUser = await legacyDb.users.get(userId);
    if (legacyUser) {
      hubUser = await migrateUser(legacyUser);
    }
  }
  
  return hubUser;
}
```

## 🚨 Rollback Plan

If issues occur during migration:

### 1. Immediate Rollback
```bash
# Disable Hub integration
kubectl set env deployment/justsplit USE_HUB_AUTH=false USE_HUB_DATA=false

# Revert to previous version
kubectl rollout undo deployment/justsplit
```

### 2. Data Rollback
```typescript
// scripts/rollbackMigration.ts
async function rollbackUserMigration() {
  const migratedUsers = await getMigratedUsers();
  
  for (const user of migratedUsers) {
    // Restore from backup
    const backup = await getBackup(user.id);
    await legacyDb.users.update(user.id, backup);
    
    // Remove Hub link
    await hubData.users.unlinkApp(user.id, 'justsplit');
  }
}
```

### 3. Communication Plan
- [ ] Notify users of temporary issues
- [ ] Update status page
- [ ] Prepare support team
- [ ] Document lessons learned

## 📊 Success Metrics

Track these metrics during migration:

1. **User Adoption**
   - % of users successfully migrated
   - Login success rate
   - Session duration

2. **Performance**
   - API response time (target: <100ms p95)
   - Page load time
   - Sync latency

3. **Reliability**
   - Error rate (target: <0.1%)
   - Uptime (target: 99.9%)
   - Failed sync attempts

4. **User Satisfaction**
   - Support tickets
   - User feedback
   - App store ratings

## 🛟 Support Resources

### Documentation
- [Hub API Reference](./api-design-specs.md)
- [Data Model Guide](./hub-data-layer-plan.md)
- [SDK Documentation](https://github.com/cybereco/hub-sdk)

### Getting Help
- Technical Support: hub-support@cybere.co
- Developer Forum: forum.cybere.co/hub
- Office Hours: Tuesdays 2-4 PM EST

### Common Issues

**Issue: Authentication loop**
```typescript
// Solution: Clear auth state
hubAuth.clearSession();
window.location.href = '/auth';
```

**Issue: Data sync delays**
```typescript
// Solution: Force sync
await hubData.sync.force(userId);
```

**Issue: Permission denied**
```typescript
// Solution: Check app permissions
const permissions = await hubData.permissions.check(userId, resource);
console.log('Current permissions:', permissions);
```

## ✅ Post-Migration Checklist

After completing migration:

- [ ] All users migrated successfully
- [ ] Legacy data archived
- [ ] Performance metrics meet targets
- [ ] Monitoring and alerts configured
- [ ] Documentation updated
- [ ] Support team trained
- [ ] User communications sent
- [ ] Celebrate! 🎉