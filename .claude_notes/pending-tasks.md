# Pending Implementation Tasks: Hub Data Layer

## 📋 Overview

This document details the remaining implementation tasks for establishing the Hub as the unified data layer for the CyberEco ecosystem. These tasks are organized by priority and include specific implementation details.

## 🎯 High Priority Tasks

### 1. Implement Cache Service (cacheService.ts)

**Location**: `apps/hub/src/services/cacheService.ts`

**Objective**: Create a multi-level caching system to improve performance and reduce database load.

**Implementation Details**:

```typescript
// apps/hub/src/services/cacheService.ts
import { LRUCache } from 'lru-cache';
import { createLogger } from '@cybereco/auth';

interface CacheOptions {
  ttl: number;
  max?: number;
  updateAgeOnGet?: boolean;
}

interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private logger = createLogger('CacheService');
  private memoryCache: LRUCache<string, CacheItem<any>>;
  
  // TTL configuration by data type (in seconds)
  private ttlConfig = {
    user: 300,          // 5 minutes
    userProfile: 300,   // 5 minutes
    group: 600,         // 10 minutes
    transaction: 60,    // 1 minute
    activity: 30,       // 30 seconds
    permission: 120,    // 2 minutes
    financialSummary: 300, // 5 minutes
  };

  constructor() {
    this.memoryCache = new LRUCache<string, CacheItem<any>>({
      max: 1000, // Maximum 1000 items
      ttl: 1000 * 60 * 5, // Default 5 minutes
      updateAgeOnGet: true,
      allowStale: false,
    });
  }

  /**
   * Get item from cache
   */
  async get<T>(key: string, dataType?: keyof typeof this.ttlConfig): Promise<T | null> {
    try {
      const cached = this.memoryCache.get(key);
      
      if (!cached) {
        this.logger.debug('Cache miss', { key });
        return null;
      }

      // Check if expired
      const now = Date.now();
      if (now - cached.timestamp > cached.ttl * 1000) {
        this.logger.debug('Cache expired', { key });
        this.memoryCache.delete(key);
        return null;
      }

      this.logger.debug('Cache hit', { key });
      return cached.value as T;
    } catch (error) {
      this.logger.error('Cache get error', { error, key });
      return null;
    }
  }

  /**
   * Set item in cache
   */
  async set<T>(
    key: string, 
    value: T, 
    options?: { ttl?: number; dataType?: keyof typeof this.ttlConfig }
  ): Promise<void> {
    try {
      const ttl = options?.ttl || 
                  (options?.dataType ? this.ttlConfig[options.dataType] : 300);
      
      const cacheItem: CacheItem<T> = {
        value,
        timestamp: Date.now(),
        ttl
      };

      this.memoryCache.set(key, cacheItem);
      this.logger.debug('Cache set', { key, ttl });
    } catch (error) {
      this.logger.error('Cache set error', { error, key });
    }
  }

  /**
   * Delete item from cache
   */
  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);
    this.logger.debug('Cache delete', { key });
  }

  /**
   * Clear all cache or by pattern
   */
  async clear(pattern?: string): Promise<void> {
    if (!pattern) {
      this.memoryCache.clear();
      this.logger.info('Cache cleared');
      return;
    }

    // Clear by pattern
    const keys = Array.from(this.memoryCache.keys());
    const regex = new RegExp(pattern);
    let cleared = 0;

    keys.forEach(key => {
      if (regex.test(key)) {
        this.memoryCache.delete(key);
        cleared++;
      }
    });

    this.logger.info('Cache cleared by pattern', { pattern, cleared });
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.memoryCache.size,
      maxSize: this.memoryCache.max,
      keys: Array.from(this.memoryCache.keys()),
    };
  }

  /**
   * Generate cache key with namespace
   */
  static generateKey(namespace: string, ...parts: string[]): string {
    return `${namespace}:${parts.join(':')}`;
  }
}

// Singleton instance
export const cacheService = new CacheService();
```

**Integration with SharedDataService**:

```typescript
// Update apps/hub/src/services/sharedDataService.ts
import { cacheService, CacheService } from './cacheService';

export async function getSharedUserProfile(userId: string): Promise<SharedUserProfile | null> {
  try {
    // Check cache first
    const cacheKey = CacheService.generateKey('user', userId);
    const cached = await cacheService.get<SharedUserProfile>(cacheKey, 'userProfile');
    
    if (cached) {
      return cached;
    }

    // Fetch from database
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const profile = docSnap.data() as SharedUserProfile;
      
      // Store in cache
      await cacheService.set(cacheKey, profile, { dataType: 'userProfile' });
      
      return profile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching shared user profile:', error);
    throw error;
  }
}

// Add cache invalidation on updates
export async function updateSharedUserProfile(
  userId: string, 
  updates: Partial<SharedUserProfile>
): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    // Invalidate cache
    const cacheKey = CacheService.generateKey('user', userId);
    await cacheService.delete(cacheKey);
    
  } catch (error) {
    console.error('Error updating shared user profile:', error);
    throw error;
  }
}
```

**Testing the Cache Service**:

```typescript
// apps/hub/src/services/__tests__/cacheService.test.ts
import { CacheService } from '../cacheService';

describe('CacheService', () => {
  let cache: CacheService;

  beforeEach(() => {
    cache = new CacheService();
  });

  afterEach(async () => {
    await cache.clear();
  });

  test('should store and retrieve values', async () => {
    const key = 'test:key';
    const value = { name: 'Test User', id: '123' };

    await cache.set(key, value);
    const retrieved = await cache.get(key);

    expect(retrieved).toEqual(value);
  });

  test('should respect TTL', async () => {
    const key = 'test:ttl';
    const value = 'test value';

    // Set with 1 second TTL
    await cache.set(key, value, { ttl: 1 });
    
    // Should exist immediately
    expect(await cache.get(key)).toBe(value);

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Should be expired
    expect(await cache.get(key)).toBeNull();
  });

  test('should clear by pattern', async () => {
    await cache.set('user:123', { id: '123' });
    await cache.set('user:456', { id: '456' });
    await cache.set('group:789', { id: '789' });

    await cache.clear('user:.*');

    expect(await cache.get('user:123')).toBeNull();
    expect(await cache.get('user:456')).toBeNull();
    expect(await cache.get('group:789')).not.toBeNull();
  });

  test('should generate consistent cache keys', () => {
    const key1 = CacheService.generateKey('user', '123', 'profile');
    const key2 = CacheService.generateKey('user', '123', 'profile');

    expect(key1).toBe(key2);
    expect(key1).toBe('user:123:profile');
  });
});
```

### 2. Create GraphQL POC

**Location**: `apps/hub/src/app/api/graphql/`

**Objective**: Implement a basic GraphQL endpoint with essential queries and mutations.

**File Structure**:
```
apps/hub/src/app/api/graphql/
├── route.ts           # Next.js API route handler
├── schema.ts          # GraphQL schema definition
├── resolvers/
│   ├── index.ts      # Resolver aggregation
│   ├── user.ts       # User resolvers
│   ├── transaction.ts # Transaction resolvers
│   └── group.ts      # Group resolvers
└── context.ts        # GraphQL context setup
```

**Implementation**:

```typescript
// apps/hub/src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { createContext } from './context';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export { handler as GET, handler as POST };
```

```typescript
// apps/hub/src/app/api/graphql/schema.ts
import { gql } from 'graphql-tag';

export const schema = gql`
  type Query {
    # User queries
    user(id: ID!): User
    currentUser: User
    
    # Transaction queries
    userTransactions(
      userId: ID!
      limit: Int = 20
      offset: Int = 0
    ): TransactionConnection
    
    # Financial summary
    financialSummary(
      userId: ID!
      startDate: String!
      endDate: String!
    ): FinancialSummary
    
    # Group queries
    userGroups(userId: ID!): [Group!]!
    group(id: ID!): Group
  }

  type Mutation {
    # User mutations
    updateUserProfile(id: ID!, input: UserProfileInput!): User
    
    # Transaction mutations
    createTransaction(input: TransactionInput!): Transaction
    
    # Group mutations
    createGroup(input: GroupInput!): Group
    addGroupMember(groupId: ID!, userId: ID!, role: String): Group
  }

  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String
    preferences: UserPreferences
    createdAt: String!
    updatedAt: String!
  }

  type UserPreferences {
    language: String
    currency: String
    timezone: String
    theme: String
  }

  type Transaction {
    id: ID!
    userId: ID!
    amount: Float!
    currency: String!
    type: TransactionType!
    category: String
    date: String!
    description: String
    appId: String!
    createdAt: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String
    members: [GroupMember!]!
    createdAt: String!
    updatedAt: String!
  }

  type GroupMember {
    userId: ID!
    role: String!
    joinedAt: String!
  }

  type FinancialSummary {
    userId: ID!
    period: Period!
    totalIncome: Float!
    totalExpenses: Float!
    netAmount: Float!
    currency: String!
  }

  type Period {
    start: String!
    end: String!
  }

  type TransactionConnection {
    edges: [TransactionEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type TransactionEdge {
    node: Transaction!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    endCursor: String
  }

  # Input types
  input UserProfileInput {
    name: String
    avatarUrl: String
  }

  input TransactionInput {
    amount: Float!
    currency: String!
    type: TransactionType!
    category: String
    date: String!
    description: String
  }

  input GroupInput {
    name: String!
    description: String
  }

  enum TransactionType {
    INCOME
    EXPENSE
    TRANSFER
    SETTLEMENT
  }
`;
```

```typescript
// apps/hub/src/app/api/graphql/context.ts
import { verifyIdToken } from '@cybereco/firebase-config';
import type { NextRequest } from 'next/server';

export interface GraphQLContext {
  user: {
    id: string;
    email: string;
  } | null;
  req: NextRequest;
}

export async function createContext({ req }: { req: NextRequest }): Promise<GraphQLContext> {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null, req };
    }

    const token = authHeader.substring(7);
    const decodedToken = await verifyIdToken(token);
    
    return {
      user: {
        id: decodedToken.uid,
        email: decodedToken.email || '',
      },
      req
    };
  } catch (error) {
    console.error('Auth error:', error);
    return { user: null, req };
  }
}
```

```typescript
// apps/hub/src/app/api/graphql/resolvers/user.ts
import { 
  getSharedUserProfile, 
  updateSharedUserProfile 
} from '../../../services/sharedDataService';
import { GraphQLContext } from '../context';

export const userResolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }) => {
      return await getSharedUserProfile(id);
    },
    
    currentUser: async (_: any, __: any, context: GraphQLContext) => {
      if (!context.user) return null;
      return await getSharedUserProfile(context.user.id);
    },
  },
  
  Mutation: {
    updateUserProfile: async (
      _: any, 
      { id, input }: { id: string; input: any }, 
      context: GraphQLContext
    ) => {
      // Check if user can update this profile
      if (!context.user || context.user.id !== id) {
        throw new Error('Unauthorized');
      }
      
      await updateSharedUserProfile(id, input);
      return await getSharedUserProfile(id);
    },
  },
};
```

```typescript
// apps/hub/src/app/api/graphql/resolvers/index.ts
import { userResolvers } from './user';
import { transactionResolvers } from './transaction';
import { groupResolvers } from './group';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...transactionResolvers.Query,
    ...groupResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...transactionResolvers.Mutation,
    ...groupResolvers.Mutation,
  },
};
```

**Testing GraphQL**:

```typescript
// apps/hub/src/app/api/graphql/__tests__/graphql.test.ts
import { ApolloServer } from '@apollo/server';
import { schema } from '../schema';
import { resolvers } from '../resolvers';

describe('GraphQL API', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs: schema,
      resolvers,
    });
  });

  test('should query user by id', async () => {
    const response = await server.executeOperation({
      query: `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `,
      variables: { id: 'test_user_123' },
    });

    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.user).toBeDefined();
    }
  });

  test('should create transaction', async () => {
    const response = await server.executeOperation({
      query: `
        mutation CreateTransaction($input: TransactionInput!) {
          createTransaction(input: $input) {
            id
            amount
            type
          }
        }
      `,
      variables: {
        input: {
          amount: 100.50,
          currency: 'USD',
          type: 'EXPENSE',
          date: '2024-12-20',
          description: 'Test transaction'
        }
      },
    });

    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.createTransaction).toBeDefined();
    }
  });
});
```

## 🔧 Medium Priority Tasks

### 3. Implement Data Layer Service

**Location**: `apps/hub/src/services/dataLayerService.ts`

**Objective**: Create an orchestrator service that coordinates cache, permissions, and data access.

**Key Features**:
- Unified interface for all data operations
- Automatic cache management
- Permission checking
- Audit logging
- Error handling and retries

### 4. Implement Sync Service

**Location**: `apps/hub/src/services/syncService.ts`

**Objective**: Real-time synchronization service using WebSockets and Firebase Realtime Database.

**Key Features**:
- WebSocket server setup with Socket.io
- Room-based subscriptions
- Conflict resolution algorithms
- Offline queue management
- Cross-app event broadcasting

### 5. Create Query Service

**Location**: `apps/hub/src/services/queryService.ts`

**Objective**: Optimize database queries with indexing, pagination, and aggregation.

**Key Features**:
- Query builder with type safety
- Automatic index suggestions
- Cursor-based pagination
- Query result caching
- Performance monitoring

## 📊 Low Priority Tasks

### 6. Implement Webhook Service

**Location**: `apps/hub/src/services/webhookService.ts`

**Objective**: Allow external integrations through webhooks.

**Key Features**:
- Webhook registration and management
- Event filtering and routing
- Retry logic with exponential backoff
- Webhook security (signatures)
- Event history and debugging

### 7. Add Redis Integration

**Prerequisites**: 
- Install Redis locally or use cloud service
- Add Redis client dependencies

**Implementation**:
- L2 cache layer in CacheService
- Session storage
- Pub/sub for cache invalidation
- Rate limiting storage

### 8. Create Admin Dashboard

**Location**: `apps/hub/src/app/admin/`

**Features**:
- User management interface
- API key management
- Permission administration
- System health monitoring
- Data migration tools

## 📅 Implementation Timeline

### Week 1-2 (Current Sprint)
- [x] Documentation (completed)
- [ ] Cache Service implementation
- [ ] GraphQL POC
- [ ] Basic integration tests

### Week 3-4
- [ ] Data Layer Service
- [ ] Sync Service with WebSockets
- [ ] Update shared data service to use cache

### Week 5-6
- [ ] Query Service optimization
- [ ] Redis integration
- [ ] Performance testing

### Week 7-8
- [ ] Webhook Service
- [ ] Admin Dashboard
- [ ] Production readiness

## 🧪 Testing Strategy

### Unit Tests
- Each service should have >80% coverage
- Mock external dependencies
- Test error scenarios

### Integration Tests
- Test service interactions
- Verify cache invalidation
- Test permission flows

### Performance Tests
- Load testing with k6 or Artillery
- Measure API response times
- Test concurrent users
- Monitor memory usage

### E2E Tests
- Test complete user flows
- Cross-app data synchronization
- Authentication flows
- Error recovery

## 🚀 Next Steps

1. **Start with Cache Service**:
   - Copy the implementation above
   - Add tests
   - Integrate with existing services

2. **GraphQL POC**:
   - Install dependencies: `npm install @apollo/server @as-integrations/next graphql graphql-tag`
   - Create file structure
   - Implement basic resolvers
   - Test with GraphQL Playground

3. **Update Existing Services**:
   - Add cache to sharedDataService
   - Add performance logging
   - Update error handling

4. **Documentation**:
   - Update API docs as you implement
   - Add inline code documentation
   - Create usage examples

## 📝 Notes

- Prioritize performance and reliability over features
- Each service should be independently testable
- Use TypeScript strict mode
- Follow existing code patterns in the Hub
- Add comprehensive logging for debugging
- Consider backward compatibility for existing APIs

## 🎯 Success Criteria

- [ ] All high-priority tasks completed
- [ ] 80%+ test coverage maintained
- [ ] API response time <100ms (p95)
- [ ] Zero breaking changes to existing APIs
- [ ] Documentation updated
- [ ] Code reviewed and approved
- [ ] Performance benchmarks passed