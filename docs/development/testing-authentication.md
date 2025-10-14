# Testing Authentication Features

## Overview

This guide covers testing strategies and procedures for the CyberEco authentication system, including unit tests, integration tests, and end-to-end testing scenarios.

## Test Environment Setup

### Prerequisites

```bash
# Install dependencies
npm install

# Start Firebase emulators
npm run emulators

# In another terminal, start the apps
npm run dev
```

### Environment Variables

Create `.env.test` for test environment:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=test-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localhost:9099
FIREBASE_ADMIN_SDK_PATH=./test-service-account.json
JWT_SECRET=test-jwt-secret-key
REDIS_URL=redis://localhost:6379/1
```

## Unit Testing

### Testing JWT Service

```typescript
// libs/auth/src/services/__tests__/jwtService.test.ts
import { jwtService } from '../jwtService';

describe('JWT Service', () => {
  it('should generate valid token pair', async () => {
    const userId = 'test-user-123';
    const tokens = await jwtService.generateTokens(userId);
    
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(tokens.expiresIn).toBe(86400); // 24 hours
  });

  it('should verify valid access token', async () => {
    const userId = 'test-user-123';
    const { accessToken } = await jwtService.generateTokens(userId);
    const decoded = await jwtService.verifyAccessToken(accessToken);
    
    expect(decoded.userId).toBe(userId);
    expect(decoded.type).toBe('access');
  });

  it('should reject expired token', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    
    await expect(jwtService.verifyAccessToken(expiredToken))
      .rejects.toThrow('Token expired');
  });
});
```

### Testing 2FA Service

```typescript
// libs/auth/src/services/__tests__/twoFactorService.test.ts
import { twoFactorService } from '../twoFactorService';

describe('Two-Factor Authentication', () => {
  it('should generate valid TOTP secret', async () => {
    const userId = 'test-user';
    const email = 'test@example.com';
    const secret = await twoFactorService.generateSecret(userId, email);
    
    expect(secret.base32).toHaveLength(32);
    expect(secret.otpauth_url).toContain('otpauth://totp/');
    expect(secret.backupCodes).toHaveLength(10);
  });

  it('should verify valid TOTP code', async () => {
    const userId = 'test-user';
    const secret = 'JBSWY3DPEHPK3PXP';
    const validCode = generateTOTP(secret);
    
    const isValid = await twoFactorService.verifyToken(userId, validCode);
    expect(isValid).toBe(true);
  });

  it('should handle time window tolerance', async () => {
    const userId = 'test-user';
    const secret = 'JBSWY3DPEHPK3PXP';
    
    // Generate code for previous window
    const oldCode = generateTOTP(secret, -30);
    const isValid = await twoFactorService.verifyToken(userId, oldCode);
    
    expect(isValid).toBe(true); // Should accept ±1 window
  });
});
```

### Testing Privacy Service

```typescript
// libs/auth/src/services/__tests__/privacyAwareDataService.test.ts
import { privacyAwareDataService } from '../privacyAwareDataService';

describe('Privacy-Aware Data Service', () => {
  it('should filter data based on privacy settings', async () => {
    const viewerId = 'viewer-123';
    const ownerId = 'owner-456';
    
    // Mock privacy settings
    const settings = {
      profileVisibility: 'friends',
      activityVisibility: {
        expenses: 'only-me'
      }
    };
    
    const expenses = [
      { id: '1', userId: ownerId, amount: 100 },
      { id: '2', userId: ownerId, amount: 200 }
    ];
    
    const filtered = await privacyAwareDataService.filterResults(
      expenses,
      viewerId,
      'expenses'
    );
    
    expect(filtered).toHaveLength(0); // Should hide expenses
  });

  it('should anonymize user data for non-friends', async () => {
    const data = {
      id: '123',
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: 'https://example.com/photo.jpg'
    };
    
    const anonymized = await privacyAwareDataService.anonymizeData(
      data,
      'viewer-123',
      'owner-456'
    );
    
    expect(anonymized.displayName).toBe('Anonymous User');
    expect(anonymized.email).toBe('hidden@example.com');
    expect(anonymized.photoURL).toBeNull();
  });
});
```

### Testing Rate Limiter

```typescript
// apps/hub/src/middleware/__tests__/rateLimiter.test.ts
import { rateLimiter } from '../rateLimiter';
import { NextRequest } from 'next/server';

describe('Rate Limiter', () => {
  it('should allow requests within limit', async () => {
    const req = new NextRequest('http://localhost/api/test');
    
    for (let i = 0; i < 5; i++) {
      const response = await rateLimiter(req);
      expect(response.status).toBe(200);
    }
  });

  it('should block requests exceeding limit', async () => {
    const req = new NextRequest('http://localhost/api/auth/signin');
    
    // Exhaust rate limit
    for (let i = 0; i < 5; i++) {
      await rateLimiter(req);
    }
    
    // Next request should be blocked
    const response = await rateLimiter(req);
    expect(response.status).toBe(429);
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
  });
});
```

## Integration Testing

### Testing Authentication Flow

```typescript
// apps/hub/src/__tests__/integration/authFlow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInPage } from '@/app/auth/signin/page';

describe('Authentication Flow Integration', () => {
  it('should complete sign in with 2FA', async () => {
    const user = userEvent.setup();
    
    render(<SignInPage />);
    
    // Enter credentials
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    
    // Should show 2FA prompt
    await waitFor(() => {
      expect(screen.getByText('Enter 2FA Code')).toBeInTheDocument();
    });
    
    // Enter 2FA code
    await user.type(screen.getByLabelText('Code'), '123456');
    await user.click(screen.getByRole('button', { name: 'Verify' }));
    
    // Should redirect to dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});
```

### Testing Privacy Controls

```typescript
// apps/hub/src/__tests__/integration/privacyFlow.test.tsx
describe('Privacy Settings Integration', () => {
  it('should update privacy settings and apply filters', async () => {
    const user = userEvent.setup();
    
    // Sign in first
    await signIn('test@example.com', 'Password123!');
    
    // Navigate to privacy settings
    render(<PrivacyPage />);
    
    // Update visibility settings
    const select = screen.getByLabelText('Profile Visibility');
    await user.selectOptions(select, 'private');
    
    await user.click(screen.getByRole('button', { name: 'Save' }));
    
    // Verify settings saved
    await waitFor(() => {
      expect(screen.getByText('Settings saved')).toBeInTheDocument();
    });
    
    // Check that data is filtered
    const response = await fetch('/api/profile/test-user');
    const data = await response.json();
    
    expect(data.displayName).toBe('Anonymous User');
  });
});
```

## End-to-End Testing

### Using Playwright

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication E2E', () => {
  test('should complete full authentication flow', async ({ page }) => {
    // Navigate to sign in
    await page.goto('http://localhost:40000/auth/signin');
    
    // Fill in credentials
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    
    // Handle 2FA if enabled
    const requires2FA = await page.locator('text=Enter 2FA Code').isVisible();
    if (requires2FA) {
      await page.fill('input[name="code"]', '123456');
      await page.click('button:has-text("Verify")');
    }
    
    // Should reach dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should handle session management', async ({ page }) => {
    // Sign in
    await signInUser(page);
    
    // Navigate to sessions
    await page.goto('http://localhost:40000/security/sessions');
    
    // Should see current session
    await expect(page.locator('text=Current Session')).toBeVisible();
    
    // Revoke other session
    await page.click('button:has-text("Revoke"):not(:has-text("Current"))');
    await expect(page.locator('text=Session revoked')).toBeVisible();
  });
});
```

### Testing Data Export

```typescript
test('should export user data', async ({ page }) => {
  await signInUser(page);
  
  // Navigate to data export
  await page.goto('http://localhost:40000/my-data');
  
  // Request export
  await page.click('button:has-text("Export Data")');
  await page.selectOption('select[name="format"]', 'json');
  await page.click('button:has-text("Generate Export")');
  
  // Wait for download
  const download = await page.waitForEvent('download');
  const fileName = download.suggestedFilename();
  
  expect(fileName).toMatch(/cybereco-export-.*\.json/);
  
  // Verify content
  const content = await download.path();
  const data = JSON.parse(await fs.readFile(content, 'utf-8'));
  
  expect(data).toHaveProperty('userData');
  expect(data).toHaveProperty('metadata');
});
```

## Performance Testing

### Load Testing Authentication

```javascript
// load-tests/auth.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  // Test sign in
  const signInResponse = http.post(
    'http://localhost:40000/api/auth/signin',
    JSON.stringify({
      email: `test${Math.random()}@example.com`,
      password: 'Password123!',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  
  check(signInResponse, {
    'sign in successful': (r) => r.status === 200,
    'returns tokens': (r) => JSON.parse(r.body).tokens !== undefined,
  });
  
  sleep(1);
  
  // Test token refresh
  if (signInResponse.status === 200) {
    const { refreshToken } = JSON.parse(signInResponse.body).tokens;
    
    const refreshResponse = http.post(
      'http://localhost:40000/api/auth/refresh',
      JSON.stringify({ refreshToken }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    check(refreshResponse, {
      'refresh successful': (r) => r.status === 200,
    });
  }
}
```

## Security Testing

### Testing Rate Limiting

```bash
# Test rate limit enforcement
for i in {1..10}; do
  curl -X POST http://localhost:40000/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nStatus: %{http_code} Rate-Limit-Remaining: %{header.x-ratelimit-remaining}\n"
done
```

### Testing Security Headers

```typescript
test('should include security headers', async () => {
  const response = await fetch('http://localhost:40000/api/test');
  
  expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  expect(response.headers.get('X-Frame-Options')).toBe('DENY');
  expect(response.headers.get('Strict-Transport-Security')).toBeTruthy();
  expect(response.headers.get('Content-Security-Policy')).toBeTruthy();
});
```

### Testing CSRF Protection

```typescript
test('should prevent CSRF attacks', async () => {
  // Attempt cross-origin request
  const response = await fetch('http://localhost:40000/api/auth/signout', {
    method: 'POST',
    headers: {
      'Origin': 'http://evil.com',
    },
    credentials: 'include',
  });
  
  expect(response.status).toBe(403);
});
```

## Test Data Management

### Seeding Test Data

```typescript
// scripts/seed-test-data.ts
import { initializeTestDb } from './test-helpers';

async function seedTestData() {
  const db = await initializeTestDb();
  
  // Create test users
  const users = [
    {
      email: 'test@example.com',
      displayName: 'Test User',
      twoFactorEnabled: true,
      privacySettings: {
        profileVisibility: 'friends',
        activityVisibility: {
          expenses: 'everyone',
          groups: 'friends',
          settlements: 'only-me'
        }
      }
    },
    // More test users...
  ];
  
  for (const user of users) {
    await db.collection('users').add(user);
  }
  
  console.log('Test data seeded successfully');
}
```

### Cleaning Test Data

```typescript
// Clean up after tests
afterEach(async () => {
  // Clear rate limit cache
  await redis.flushdb();
  
  // Clear test users
  const testUsers = await db.collection('users')
    .where('email', '>=', 'test')
    .where('email', '<', 'test~')
    .get();
  
  const batch = db.batch();
  testUsers.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
});
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/auth-tests.yml
name: Authentication Tests

on:
  push:
    paths:
      - 'libs/auth/**'
      - 'apps/hub/src/app/auth/**'
      - 'apps/hub/src/middleware/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      redis:
        image: redis:alpine
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start Firebase Emulators
        run: |
          npm install -g firebase-tools
          firebase emulators:start --only auth,firestore &
          sleep 10
      
      - name: Run Unit Tests
        run: npm test -- --coverage
      
      - name: Run Integration Tests
        run: npm run test:integration
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## Test Coverage Requirements

### Minimum Coverage Thresholds

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70,
        "lines": 70,
        "statements": 70
      },
      "./libs/auth/src/services": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Coverage Report

```bash
# Generate coverage report
npm test -- --coverage

# View HTML report
open coverage/lcov-report/index.html
```

## Debugging Tests

### Debug Mode

```bash
# Run tests in debug mode
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Attach debugger in VS Code
```

### Verbose Logging

```typescript
// Enable verbose logging for debugging
if (process.env.DEBUG_TESTS) {
  console.log('Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  
  console.log('Response:', {
    status: res.status,
    headers: res.headers,
    body: res.body
  });
}
```

## Best Practices

### Test Organization

1. **Unit Tests**: Test individual functions and methods
2. **Integration Tests**: Test service interactions
3. **E2E Tests**: Test complete user flows
4. **Performance Tests**: Test under load
5. **Security Tests**: Test security measures

### Test Data

- Use factories for consistent test data
- Isolate test data from production
- Clean up after each test
- Use meaningful test data

### Assertions

- Test both success and failure cases
- Verify error messages
- Check side effects
- Test edge cases

### Mocking

- Mock external services
- Use consistent mock data
- Verify mock interactions
- Reset mocks between tests

## Troubleshooting

### Common Issues

**Firebase Emulator Not Starting**:
```bash
# Check if ports are in use
lsof -i :8080
lsof -i :9099

# Kill processes if needed
kill -9 <PID>
```

**Tests Timing Out**:
```javascript
// Increase timeout for slow operations
jest.setTimeout(30000);

// Or per test
test('slow operation', async () => {
  // Test code
}, 30000);
```

**Flaky Tests**:
```typescript
// Add retries for flaky tests
test.retry(3)('unstable test', async () => {
  // Test code
});

// Wait for specific conditions
await waitFor(() => {
  expect(element).toBeVisible();
}, { timeout: 5000 });
```