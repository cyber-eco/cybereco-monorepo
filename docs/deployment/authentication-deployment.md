# Authentication System Deployment Guide

## Overview

This guide covers the deployment process for the CyberEco authentication system, including configuration, security considerations, and monitoring setup.

## Pre-Deployment Checklist

### Environment Setup

- [ ] Firebase projects created (Hub, JustSplit, Website)
- [ ] Custom domains configured
- [ ] SSL certificates provisioned
- [ ] Environment variables prepared
- [ ] Secrets management configured
- [ ] Redis instance provisioned
- [ ] Monitoring tools configured

### Security Review

- [ ] JWT secrets rotated
- [ ] 2FA secrets secured
- [ ] API keys restricted
- [ ] CORS policies configured
- [ ] Rate limiting thresholds set
- [ ] Security headers verified
- [ ] Firewall rules configured

## Environment Configuration

### Production Environment Variables

```bash
# .env.production
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=prod-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth.cybere.co
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cybereco-hub-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cybereco-hub-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# JWT Configuration
JWT_SECRET=<generated-secret-key>
JWT_REFRESH_SECRET=<generated-refresh-secret>
JWT_ISSUER=https://api.cybere.co
JWT_AUDIENCE=https://cybere.co

# Redis Configuration
REDIS_URL=redis://:<password>@redis-prod.cybere.co:6379/0
REDIS_TLS=true

# 2FA Configuration
TWO_FACTOR_APP_NAME=CyberEco Hub
TWO_FACTOR_ENCRYPTION_KEY=<generated-encryption-key>

# Rate Limiting
RATE_LIMIT_REDIS_URL=redis://:<password>@redis-rl.cybere.co:6379/1
RATE_LIMIT_BYPASS_TOKEN=<admin-bypass-token>

# Security
SECURITY_HEADERS_CSP_REPORT_URI=https://csp.cybere.co/report
CORS_ALLOWED_ORIGINS=https://cybere.co,https://app.cybere.co

# Monitoring
SENTRY_DSN=https://abc123@sentry.io/project-id
LOG_LEVEL=info
METRICS_ENDPOINT=https://metrics.cybere.co/v1/collect

# GDPR
GDPR_DATA_RETENTION_DAYS=730
GDPR_DELETION_GRACE_PERIOD_DAYS=30
```

### Secrets Management

#### Using Google Secret Manager

```bash
# Store JWT secret
echo -n "your-jwt-secret" | gcloud secrets create jwt-secret \
  --data-file=- \
  --replication-policy="automatic"

# Store 2FA encryption key
echo -n "your-2fa-key" | gcloud secrets create twofa-encryption-key \
  --data-file=- \
  --replication-policy="automatic"

# Grant access to service account
gcloud secrets add-iam-policy-binding jwt-secret \
  --member="serviceAccount:cybereco-hub@project.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

#### Using AWS Secrets Manager

```bash
# Create secrets
aws secretsmanager create-secret \
  --name prod/cybereco/jwt-secret \
  --secret-string "your-jwt-secret"

aws secretsmanager create-secret \
  --name prod/cybereco/twofa-key \
  --secret-string "your-2fa-key"

# Tag secrets
aws secretsmanager tag-resource \
  --secret-id prod/cybereco/jwt-secret \
  --tags Key=Environment,Value=Production Key=Service,Value=Auth
```

## Deployment Process

### 1. Database Migration

```bash
# Run Firestore migrations
npm run migrate:prod

# Verify indexes
firebase firestore:indexes --project cybereco-hub-prod

# Create composite indexes for performance
firebase deploy --only firestore:indexes --project cybereco-hub-prod
```

### 2. Redis Setup

```bash
# Configure Redis for production
redis-cli -h redis-prod.cybere.co -a <password>

# Set memory policy
CONFIG SET maxmemory-policy allkeys-lru
CONFIG SET maxmemory 2gb

# Enable persistence
CONFIG SET save "900 1 300 10 60 10000"
CONFIG SET appendonly yes

# Set up replication
REPLICAOF redis-primary.cybere.co 6379
```

### 3. Build and Deploy

```bash
# Build all applications
npm run build

# Deploy to Firebase Hosting
npm run deploy:production

# Or deploy individually
npm run deploy:hub:prod
npm run deploy:justsplit:prod
npm run deploy:website:prod
```

### 4. Configure CDN

```nginx
# Cloudflare configuration
# Page Rules for API endpoints
*.cybere.co/api/* 
  - Cache Level: Bypass
  - Security Level: High
  - SSL: Full (Strict)

# Page Rules for static assets
*.cybere.co/static/*
  - Cache Level: Aggressive
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 1 month
```

### 5. DNS Configuration

```dns
# DNS Records
cybere.co.              A       1.2.3.4
www.cybere.co.          CNAME   cybere.co
hub.cybere.co.          CNAME   cybereco-hub-prod.web.app
api.cybere.co.          A       5.6.7.8
auth.cybere.co.         CNAME   cybereco-hub-prod.firebaseapp.com

# SPF Record for email
cybere.co.              TXT     "v=spf1 include:_spf.google.com ~all"

# DMARC Record
_dmarc.cybere.co.       TXT     "v=DMARC1; p=quarantine; rua=mailto:dmarc@cybere.co"
```

## Security Configuration

### SSL/TLS Setup

```bash
# Generate certificate signing request
openssl req -new -newkey rsa:2048 -nodes \
  -keyout cybere.co.key \
  -out cybere.co.csr \
  -subj "/C=US/ST=CA/L=San Francisco/O=CyberEco/CN=*.cybere.co"

# Configure HSTS
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### Firewall Rules

```bash
# Allow HTTPS traffic
gcloud compute firewall-rules create allow-https \
  --allow tcp:443 \
  --source-ranges 0.0.0.0/0 \
  --target-tags https-server

# Allow Redis connection from app servers
gcloud compute firewall-rules create allow-redis \
  --allow tcp:6379 \
  --source-tags app-server \
  --target-tags redis-server

# Block direct API access (force through CDN)
gcloud compute firewall-rules create block-direct-api \
  --deny tcp:40000 \
  --source-ranges 0.0.0.0/0 \
  --target-tags api-server
```

### CORS Configuration

```typescript
// apps/hub/src/middleware/cors.ts
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://cybere.co',
      'https://www.cybere.co',
      'https://app.cybere.co',
      'https://justsplit.cybere.co'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining']
};
```

## Performance Optimization

### Caching Strategy

```nginx
# Nginx caching configuration
location /api/auth/verify {
    proxy_cache auth_cache;
    proxy_cache_valid 200 1m;
    proxy_cache_key "$request_uri|$http_authorization";
    proxy_cache_bypass $http_cache_control;
    add_header X-Cache-Status $upstream_cache_status;
}

location /api/export {
    proxy_cache off;  # Never cache exports
}

location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Optimization

```javascript
// Firestore composite indexes
{
  "indexes": [
    {
      "collectionGroup": "sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "lastActivity", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "auditLogs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "privacySettings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### Load Balancing

```yaml
# Google Cloud Load Balancer configuration
apiVersion: compute.cnrm.cloud.google.com/v1beta1
kind: ComputeBackendService
metadata:
  name: cybereco-api-backend
spec:
  backends:
    - group: instance-group-1
      balancingMode: RATE
      maxRatePerInstance: 1000
    - group: instance-group-2
      balancingMode: RATE
      maxRatePerInstance: 1000
  healthChecks:
    - healthCheckRef:
        name: api-health-check
  sessionAffinity: CLIENT_IP
  timeoutSec: 30
```

## Monitoring Setup

### Health Checks

```typescript
// apps/hub/src/app/api/health/route.ts
export async function GET() {
  const checks = {
    firebase: await checkFirebase(),
    redis: await checkRedis(),
    jwt: checkJWTConfig(),
    timestamp: new Date().toISOString()
  };
  
  const healthy = Object.values(checks)
    .filter(v => typeof v === 'boolean')
    .every(v => v === true);
  
  return NextResponse.json(
    { status: healthy ? 'healthy' : 'unhealthy', checks },
    { status: healthy ? 200 : 503 }
  );
}
```

### Logging Configuration

```typescript
// libs/auth/src/utils/logger.ts
import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston({
  projectId: 'cybereco-hub-prod',
  keyFilename: '/path/to/service-account.json'
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'auth-service',
    environment: process.env.NODE_ENV
  },
  transports: [
    new winston.transports.Console(),
    loggingWinston
  ]
});
```

### Metrics Collection

```typescript
// libs/auth/src/utils/metrics.ts
import { StatsD } from 'node-statsd';

const metrics = new StatsD({
  host: process.env.METRICS_HOST,
  port: 8125,
  prefix: 'cybereco.auth.'
});

// Track authentication metrics
export function trackAuthEvent(event: string, tags?: string[]) {
  metrics.increment(`auth.${event}`, 1, tags);
}

// Track response times
export function trackResponseTime(endpoint: string, duration: number) {
  metrics.timing(`response_time.${endpoint}`, duration);
}

// Track active sessions
export function trackActiveSessions(count: number) {
  metrics.gauge('sessions.active', count);
}
```

### Alert Configuration

```yaml
# Prometheus alert rules
groups:
  - name: authentication
    rules:
      - alert: HighAuthFailureRate
        expr: |
          rate(auth_failures_total[5m]) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High authentication failure rate
          description: "Auth failures above threshold ({{ $value }})"
      
      - alert: JWTVerificationErrors
        expr: |
          rate(jwt_verification_errors_total[5m]) > 5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: JWT verification failing
          description: "JWT verification errors detected"
      
      - alert: RateLimitExhaustion
        expr: |
          rate(rate_limit_exceeded_total[5m]) > 100
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: High rate limit violations
          description: "Many users hitting rate limits"
```

## Rollback Procedures

### Quick Rollback

```bash
# Rollback to previous version
firebase hosting:rollback --project cybereco-hub-prod

# Or specific version
firebase hosting:version:rollback VERSION_ID --project cybereco-hub-prod
```

### Database Rollback

```bash
# Export current state (backup)
gcloud firestore export gs://cybereco-backups/firestore-$(date +%Y%m%d-%H%M%S)

# Restore from backup
gcloud firestore import gs://cybereco-backups/firestore-20240603-143000
```

### Feature Flags

```typescript
// libs/auth/src/utils/featureFlags.ts
export const features = {
  twoFactorAuth: {
    enabled: process.env.FEATURE_2FA === 'true',
    rolloutPercentage: 100
  },
  privacyControls: {
    enabled: process.env.FEATURE_PRIVACY === 'true',
    rolloutPercentage: 100
  },
  newRateLimits: {
    enabled: process.env.FEATURE_NEW_RATE_LIMITS === 'true',
    rolloutPercentage: 50
  }
};

export function isFeatureEnabled(
  feature: keyof typeof features,
  userId?: string
): boolean {
  const config = features[feature];
  if (!config.enabled) return false;
  
  if (config.rolloutPercentage === 100) return true;
  
  // Gradual rollout based on user ID
  const hash = userId ? hashUserId(userId) : Math.random() * 100;
  return hash < config.rolloutPercentage;
}
```

## Post-Deployment Verification

### Smoke Tests

```bash
# Test authentication flow
curl -X POST https://api.cybere.co/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123!"}'

# Test rate limiting
for i in {1..10}; do
  curl -X GET https://api.cybere.co/api/test \
    -H "Authorization: Bearer $TOKEN" \
    -w "\nStatus: %{http_code}\n"
done

# Test 2FA
curl -X POST https://api.cybere.co/auth/verify-2fa \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PARTIAL_TOKEN" \
  -d '{"userId":"test-user","code":"123456"}'
```

### Performance Verification

```bash
# Load test with k6
k6 run --vus 100 --duration 5m load-tests/auth.js

# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://api.cybere.co/health
```

### Security Verification

```bash
# Check security headers
curl -I https://api.cybere.co | grep -E "Strict-Transport-Security|X-Frame-Options|Content-Security-Policy"

# SSL verification
openssl s_client -connect api.cybere.co:443 -servername api.cybere.co

# Check CORS
curl -X OPTIONS https://api.cybere.co/api/test \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST"
```

## Maintenance Mode

### Enable Maintenance Mode

```typescript
// apps/hub/src/middleware.ts
export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return new NextResponse(
      JSON.stringify({
        error: 'Service temporarily unavailable',
        message: 'We are performing scheduled maintenance'
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '3600'
        }
      }
    );
  }
  // Continue normal processing
}
```

### Maintenance Page

```html
<!-- public/maintenance.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Maintenance - CyberEco</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔧 Scheduled Maintenance</h1>
    <p>We're upgrading our systems to serve you better.</p>
    <p>We'll be back online shortly.</p>
    <p><strong>Expected completion: <span id="eta">2 hours</span></strong></p>
  </div>
</body>
</html>
```

## Disaster Recovery

### Backup Strategy

```bash
# Automated daily backups
0 2 * * * gcloud firestore export gs://cybereco-backups/daily/firestore-$(date +\%Y\%m\%d)

# Weekly backups with 30-day retention
0 3 * * 0 gcloud firestore export gs://cybereco-backups/weekly/firestore-$(date +\%Y\%m\%d)

# Monthly backups with 1-year retention
0 4 1 * * gcloud firestore export gs://cybereco-backups/monthly/firestore-$(date +\%Y\%m\%d)
```

### Recovery Procedures

1. **Data Corruption**:
   ```bash
   # Stop writes
   firebase functions:config:set maintenance.mode=true
   
   # Restore from backup
   gcloud firestore import gs://cybereco-backups/daily/firestore-20240603
   
   # Verify data integrity
   npm run verify:data:integrity
   
   # Resume operations
   firebase functions:config:unset maintenance.mode
   ```

2. **Service Outage**:
   ```bash
   # Switch to DR region
   gcloud compute backend-services update cybereco-api \
     --global \
     --failover-policy='{ "failoverRatio": 0.0 }'
   
   # Update DNS
   gcloud dns record-sets transaction start --zone=cybere-co
   gcloud dns record-sets transaction add \
     --name=api.cybere.co. \
     --ttl=60 \
     --type=A \
     --zone=cybere-co \
     --rrdatas=DR_IP_ADDRESS
   gcloud dns record-sets transaction execute --zone=cybere-co
   ```

## Compliance

### GDPR Compliance Checklist

- [ ] Data processing agreements signed
- [ ] Privacy policy updated
- [ ] Cookie consent implemented
- [ ] Data retention policies configured
- [ ] Export functionality tested
- [ ] Deletion procedures verified
- [ ] Audit logging enabled
- [ ] Access logs retention set

### Security Compliance

- [ ] Penetration testing completed
- [ ] Vulnerability scan passed
- [ ] SSL/TLS configuration verified
- [ ] Security headers implemented
- [ ] Rate limiting tested
- [ ] Authentication flows verified
- [ ] Session management reviewed
- [ ] Encryption at rest confirmed