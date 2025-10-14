# API Design Specifications: Hub Data Layer v2

## 📋 Overview

This document defines the API specifications for the Hub Data Layer v2, including REST endpoints, GraphQL schema, WebSocket events, and integration patterns for all CyberEco applications.

## 🏗️ API Architecture Principles

### Design Philosophy
1. **RESTful**: Follow REST principles for resource-based operations
2. **GraphQL**: Flexible queries for complex data relationships
3. **Real-time**: WebSocket for live updates and synchronization
4. **Versioned**: Clear versioning strategy for backward compatibility
5. **Documented**: OpenAPI 3.0 for REST, GraphQL introspection
6. **Secure**: OAuth 2.0, API keys, rate limiting

### Response Standards

#### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-12-20T10:30:00Z",
    "version": "2.0",
    "requestId": "req_abc123"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-12-20T10:30:00Z",
    "version": "2.0",
    "requestId": "req_abc123"
  }
}
```

## 🔗 REST API v2 Specification

### Base URL
```
Development: https://localhost:40000/api/v2
Staging: https://hub-staging.cybere.co/api/v2
Production: https://hub.cybere.co/api/v2
```

### Authentication
```http
Authorization: Bearer {jwt_token}
X-API-Key: {api_key}
X-App-ID: {app_id}
```

### Rate Limiting Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

### User Endpoints

#### Get User Profile
```http
GET /api/v2/users/{userId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatarUrl": "https://...",
    "preferences": {
      "language": "en",
      "currency": "USD",
      "timezone": "America/New_York",
      "theme": "dark"
    },
    "appData": {
      "justsplit": {
        "profileId": "js_user_123",
        "lastAccessed": "2024-12-20T10:00:00Z"
      }
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-12-20T10:00:00Z"
  }
}
```

#### Update User Profile
```http
PATCH /api/v2/users/{userId}
Content-Type: application/json

{
  "name": "Jane Doe",
  "preferences": {
    "theme": "light"
  }
}
```

#### Get User Activities
```http
GET /api/v2/users/{userId}/activities?apps=justsplit,somos&limit=20&offset=0
```

### Transaction Endpoints

#### Create Transaction
```http
POST /api/v2/transactions
Content-Type: application/json

{
  "userId": "user_123",
  "amount": 150.00,
  "currency": "USD",
  "type": "expense",
  "category": "food",
  "date": "2024-12-20",
  "appId": "justsplit",
  "appSpecificId": "exp_456",
  "description": "Dinner with friends",
  "groupId": "group_789"
}
```

#### Get User Transactions
```http
GET /api/v2/transactions?userId=user_123&startDate=2024-01-01&endDate=2024-12-31&type=expense&limit=50
```

**Query Parameters:**
- `userId` (required): User ID
- `startDate`: ISO date string
- `endDate`: ISO date string
- `type`: income|expense|transfer|settlement
- `category`: Transaction category
- `appId`: Filter by app
- `groupId`: Filter by group
- `limit`: Max results (default: 20, max: 100)
- `offset`: Pagination offset
- `sort`: field:direction (e.g., date:desc)

### Group Endpoints

#### Create Shared Group
```http
POST /api/v2/groups
Content-Type: application/json

{
  "name": "Family Vacation 2024",
  "description": "Planning for summer trip",
  "members": [
    {
      "userId": "user_123",
      "role": "owner"
    },
    {
      "userId": "user_456",
      "role": "member"
    }
  ],
  "settings": {
    "privacy": "private",
    "joinApproval": true,
    "allowInvites": false
  }
}
```

#### Link Group to App
```http
POST /api/v2/groups/{groupId}/apps/{appId}/link
Content-Type: application/json

{
  "appGroupId": "js_group_123",
  "features": ["expense_tracking", "settlements"],
  "settings": {
    "defaultCurrency": "USD"
  }
}
```

### Financial Summary Endpoints

#### Get Financial Summary
```http
GET /api/v2/financial/summary?userId=user_123&startDate=2024-01-01&endDate=2024-12-31&groupBy=category
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "period": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "totalIncome": 50000.00,
    "totalExpenses": 35000.00,
    "netAmount": 15000.00,
    "byCategory": [
      {
        "category": "food",
        "amount": 5000.00,
        "percentage": 14.3
      }
    ],
    "byApp": [
      {
        "appId": "justsplit",
        "income": 0,
        "expenses": 15000.00
      }
    ],
    "currency": "USD",
    "lastUpdated": "2024-12-20T10:00:00Z"
  }
}
```

### Batch Operations

#### Batch Create Transactions
```http
POST /api/v2/batch/transactions
Content-Type: application/json

{
  "transactions": [
    {
      "userId": "user_123",
      "amount": 50.00,
      "currency": "USD",
      "type": "expense",
      "date": "2024-12-20"
    },
    // ... more transactions
  ]
}
```

## 🎯 GraphQL API Specification

### Endpoint
```
POST /api/graphql
```

### Schema

```graphql
# Root Types
type Query {
  # User queries
  user(id: ID!): User
  users(filter: UserFilter, pagination: PaginationInput): UserConnection
  currentUser: User
  
  # Transaction queries
  transaction(id: ID!): Transaction
  transactions(filter: TransactionFilter, pagination: PaginationInput): TransactionConnection
  
  # Financial queries
  financialSummary(userId: ID!, period: DateRangeInput!, groupBy: GroupByOption): FinancialSummary
  
  # Group queries
  group(id: ID!): Group
  groups(filter: GroupFilter, pagination: PaginationInput): GroupConnection
  
  # Activity queries
  activities(userId: ID!, apps: [AppID!], limit: Int = 20): [Activity!]!
  
  # Cross-app queries
  crossAppData(userId: ID!, dataType: DataType!): CrossAppData
}

type Mutation {
  # User mutations
  updateUserProfile(id: ID!, input: UserProfileInput!): User!
  updateUserPreferences(id: ID!, preferences: UserPreferencesInput!): User!
  
  # Transaction mutations
  createTransaction(input: TransactionInput!): Transaction!
  updateTransaction(id: ID!, input: TransactionUpdateInput!): Transaction!
  deleteTransaction(id: ID!): DeleteResult!
  batchCreateTransactions(transactions: [TransactionInput!]!): BatchCreateResult!
  
  # Group mutations
  createGroup(input: GroupInput!): Group!
  updateGroup(id: ID!, input: GroupUpdateInput!): Group!
  addGroupMember(groupId: ID!, member: GroupMemberInput!): Group!
  removeGroupMember(groupId: ID!, userId: ID!): Group!
  linkGroupToApp(groupId: ID!, appId: AppID!, config: AppLinkConfig!): Group!
  
  # Sync mutations
  syncUserData(userId: ID!, sourceApp: AppID!, targetApp: AppID!): SyncResult!
  resolveConflict(conflictId: ID!, resolution: ConflictResolution!): ResolveResult!
  
  # Permission mutations
  grantPermission(input: PermissionInput!): Permission!
  revokePermission(permissionId: ID!): RevokeResult!
}

type Subscription {
  # User subscriptions
  userProfileUpdated(userId: ID!): User!
  userNotifications(userId: ID!): Notification!
  
  # Group subscriptions
  groupActivities(groupId: ID!): Activity!
  groupMemberChanges(groupId: ID!): GroupMemberChange!
  
  # Data sync subscriptions
  dataSyncStatus(userId: ID!): DataSyncStatus!
  conflictDetected(userId: ID!): DataConflict!
  
  # Real-time data
  transactionCreated(userId: ID!, appId: AppID): Transaction!
  financialSummaryUpdated(userId: ID!): FinancialSummary!
}

# Core Types
type User {
  id: ID!
  email: String!
  name: String!
  avatarUrl: String
  preferences: UserPreferences!
  appData: [AppData!]!
  groups: [Group!]!
  transactions(filter: TransactionFilter, pagination: PaginationInput): TransactionConnection!
  activities(apps: [AppID!], limit: Int): [Activity!]!
  financialSummary(period: DateRangeInput!): FinancialSummary!
  permissions: [Permission!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Transaction {
  id: ID!
  user: User!
  amount: Float!
  currency: String!
  type: TransactionType!
  category: String
  date: Date!
  description: String
  app: App!
  appSpecificId: String
  group: Group
  attachments: [String!]
  tags: [String!]
  participants: [User!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Group {
  id: ID!
  name: String!
  description: String
  avatarUrl: String
  members: [GroupMember!]!
  settings: GroupSettings!
  appContexts: [AppContext!]!
  activities(limit: Int): [Activity!]!
  transactions(filter: TransactionFilter): [Transaction!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  lastActivityAt: DateTime
}

# Input Types
input UserProfileInput {
  name: String
  avatarUrl: String
  personalInfo: PersonalInfoInput
}

input TransactionInput {
  userId: ID!
  amount: Float!
  currency: String!
  type: TransactionType!
  category: String
  date: Date!
  description: String
  appId: AppID!
  appSpecificId: String
  groupId: ID
  attachments: [String!]
  tags: [String!]
  participantIds: [ID!]
}

input GroupInput {
  name: String!
  description: String
  avatarUrl: String
  members: [GroupMemberInput!]!
  settings: GroupSettingsInput
}

# Enums
enum TransactionType {
  INCOME
  EXPENSE
  TRANSFER
  SETTLEMENT
}

enum AppID {
  JUSTSPLIT
  SOMOS
  DEMOS
  PLANTOPIA
}

enum GroupByOption {
  CATEGORY
  APP
  DATE
  GROUP
}

# Pagination
input PaginationInput {
  limit: Int = 20
  offset: Int = 0
  cursor: String
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
  totalCount: Int!
}

type TransactionConnection {
  edges: [TransactionEdge!]!
  pageInfo: PageInfo!
}

type TransactionEdge {
  node: Transaction!
  cursor: String!
}
```

### Example Queries

#### Get User with Financial Data
```graphql
query GetUserFinancials($userId: ID!, $year: Int!) {
  user(id: $userId) {
    id
    name
    financialSummary(period: { 
      start: "$year-01-01", 
      end: "$year-12-31" 
    }) {
      totalIncome
      totalExpenses
      netAmount
      byCategory {
        category
        amount
        percentage
      }
    }
    transactions(
      filter: { 
        type: EXPENSE, 
        dateRange: { 
          start: "$year-01-01", 
          end: "$year-12-31" 
        } 
      },
      pagination: { limit: 10 }
    ) {
      edges {
        node {
          id
          amount
          currency
          description
          date
        }
      }
      pageInfo {
        totalCount
        hasNextPage
      }
    }
  }
}
```

#### Cross-App Activity Feed
```graphql
query GetActivityFeed($userId: ID!) {
  activities(userId: $userId, apps: [JUSTSPLIT, SOMOS], limit: 20) {
    id
    type
    app {
      id
      name
    }
    title
    description
    timestamp
    relatedUsers {
      id
      name
      avatarUrl
    }
  }
}
```

## 🔌 WebSocket API Specification

### Connection
```javascript
const socket = io('wss://hub.cybere.co', {
  auth: {
    token: 'jwt_token'
  },
  transports: ['websocket']
});
```

### Events

#### Client → Server

##### Join User Room
```javascript
socket.emit('join:user', {
  userId: 'user_123'
});
```

##### Join Group Room
```javascript
socket.emit('join:group', {
  groupId: 'group_456'
});
```

##### Subscribe to Data Changes
```javascript
socket.emit('subscribe:data', {
  userId: 'user_123',
  dataTypes: ['transactions', 'groups', 'activities']
});
```

#### Server → Client

##### Data Change Event
```javascript
socket.on('data:changed', (event) => {
  console.log(event);
  // {
  //   type: 'transaction.created',
  //   data: { ... },
  //   timestamp: '2024-12-20T10:00:00Z',
  //   app: 'justsplit'
  // }
});
```

##### Sync Status Update
```javascript
socket.on('sync:status', (status) => {
  console.log(status);
  // {
  //   userId: 'user_123',
  //   app: 'justsplit',
  //   status: 'syncing' | 'synced' | 'error',
  //   progress: 75,
  //   message: 'Syncing transactions...'
  // }
});
```

##### Conflict Detected
```javascript
socket.on('conflict:detected', (conflict) => {
  console.log(conflict);
  // {
  //   id: 'conflict_789',
  //   type: 'transaction',
  //   localVersion: { ... },
  //   remoteVersion: { ... },
  //   suggestedResolution: 'use_remote'
  // }
});
```

## 🔐 Security Specifications

### Authentication Flow

1. **Initial Authentication**
   ```http
   POST /api/v2/auth/login
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "password": "secure_password"
   }
   ```

2. **Token Response**
   ```json
   {
     "success": true,
     "data": {
       "accessToken": "jwt_access_token",
       "refreshToken": "jwt_refresh_token",
       "expiresIn": 3600,
       "user": {
         "id": "user_123",
         "email": "user@example.com"
       }
     }
   }
   ```

3. **Token Refresh**
   ```http
   POST /api/v2/auth/refresh
   Content-Type: application/json
   
   {
     "refreshToken": "jwt_refresh_token"
   }
   ```

### API Key Management

Apps must register for API keys:

```http
POST /api/v2/apps/register
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "appId": "custom_app",
  "name": "Custom Integration",
  "permissions": ["read:users", "write:transactions"],
  "webhookUrl": "https://app.example.com/webhook"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "apiKey": "app_key_abc123xyz",
    "appId": "custom_app",
    "permissions": ["read:users", "write:transactions"]
  }
}
```

### Rate Limiting Rules

| Tier | Requests/Hour | Burst | Use Case |
|------|--------------|-------|----------|
| Free | 1,000 | 50 | Development |
| Basic | 10,000 | 200 | Small apps |
| Pro | 100,000 | 1,000 | Production |
| Enterprise | Unlimited | Custom | Large scale |

### Permission Scopes

| Scope | Description |
|-------|-------------|
| `read:users` | Read user profiles |
| `write:users` | Update user profiles |
| `read:transactions` | Read transaction data |
| `write:transactions` | Create/update transactions |
| `read:groups` | Read group data |
| `write:groups` | Manage groups |
| `admin:permissions` | Manage permissions |
| `admin:apps` | Manage app registrations |

## 🧪 Testing the APIs

### cURL Examples

#### REST API Test
```bash
# Get user profile
curl -X GET https://hub.cybere.co/api/v2/users/user_123 \
  -H "Authorization: Bearer jwt_token" \
  -H "X-API-Key: api_key"

# Create transaction
curl -X POST https://hub.cybere.co/api/v2/transactions \
  -H "Authorization: Bearer jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "amount": 150.00,
    "currency": "USD",
    "type": "expense",
    "date": "2024-12-20"
  }'
```

#### GraphQL Test
```bash
curl -X POST https://hub.cybere.co/api/graphql \
  -H "Authorization: Bearer jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { user(id: \"user_123\") { id name email } }"
  }'
```

### Postman Collection

Import the Hub API v2 collection:
```
https://hub.cybere.co/api/v2/postman-collection.json
```

## 📚 SDK Usage Examples

### TypeScript SDK

```typescript
import { HubClient } from '@cybereco/hub-sdk';

const hub = new HubClient({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Get user data
const user = await hub.users.get('user_123');

// Create transaction
const transaction = await hub.transactions.create({
  userId: 'user_123',
  amount: 150.00,
  currency: 'USD',
  type: 'expense',
  date: new Date()
});

// Subscribe to updates
hub.realtime.subscribe('user_123', (event) => {
  console.log('Data changed:', event);
});

// GraphQL query
const result = await hub.graphql.query({
  query: `
    query GetUserFinancials($userId: ID!) {
      user(id: $userId) {
        financialSummary(period: { start: "2024-01-01", end: "2024-12-31" }) {
          totalIncome
          totalExpenses
        }
      }
    }
  `,
  variables: { userId: 'user_123' }
});
```

## 🚀 Migration from v1 to v2

### Breaking Changes

1. **Endpoint Structure**
   - v1: `/api/users/profile/{id}`
   - v2: `/api/v2/users/{id}`

2. **Response Format**
   - v1: Direct data response
   - v2: Wrapped in success/error structure

3. **Authentication**
   - v1: Custom token header
   - v2: Standard Bearer token + API key

### Migration Steps

1. Update base URL to include `/v2`
2. Update response parsing to handle new format
3. Add API key to requests
4. Update error handling for new error format
5. Test thoroughly in staging environment

### Deprecation Timeline

- 2025 Q1: v2 released, v1 deprecated
- 2025 Q2: New features only in v2
- 2025 Q3: v1 enters maintenance mode
- 2025 Q4: v1 sunset, migration required

## 📝 Notes

- All timestamps are in ISO 8601 format with UTC timezone
- All monetary amounts are in the smallest unit (cents)
- Pagination uses cursor-based approach for consistency
- GraphQL depth limited to 5 levels to prevent abuse
- WebSocket connections timeout after 30 minutes of inactivity