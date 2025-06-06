# Firebase Production Setup Guide

This guide walks you through setting up Firebase projects for production deployment of the CyberEco ecosystem.

## Overview

CyberEco uses a multi-project Firebase architecture:
- **Hub Project**: Central authentication and user management
- **JustSplit Project**: Expense tracking data
- **Website Project**: Static hosting and analytics

## Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Google Cloud account with billing enabled
- Custom domain(s) for your apps

## Step 1: Create Firebase Projects

### 1.1 Hub Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it: `cybereco-hub-prod`
4. Enable Google Analytics (optional)
5. Wait for project creation

### 1.2 JustSplit Project

1. Create another project: `cybereco-justsplit-prod`
2. Follow same steps as Hub

### 1.3 Website Project (Optional)

1. Create project: `cybereco-website-prod`
2. This can share the Hub project if preferred

## Step 2: Enable Services

For each project, enable:

### Authentication
1. Go to Authentication → Sign-in method
2. Enable:
   - Email/Password
   - Google (optional)
   - Anonymous (for guest access)
3. Add authorized domains:
   - `hub.cybere.co`
   - `justsplit.cybere.co`
   - `cybere.co`

### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose production mode
4. Select your region (e.g., `us-central1`)
5. Wait for provisioning

### Hosting
1. Go to Hosting
2. Click "Get started"
3. Follow setup instructions

## Step 3: Configure Authentication

### 3.1 Hub Project (Central Auth)

```bash
# In firebase/hub directory
firebase use cybereco-hub-prod
firebase deploy --only auth
```

### 3.2 Cross-Project Authentication

Enable the Hub project to authenticate users for other projects:

1. In Hub project, go to Project Settings → Service Accounts
2. Generate new private key
3. Save as `firebase/hub/service-account-prod.json`
4. Add to `.gitignore`

## Step 4: Deploy Security Rules

### 4.1 Deploy Indexes First

```bash
# From monorepo root
./scripts/deploy-indexes.sh
```

### 4.2 Deploy Production Rules

For Hub:
```bash
firebase use cybereco-hub-prod
cp firebase/hub/firestore.production.rules firestore.rules
firebase deploy --only firestore:rules
```

For JustSplit:
```bash
firebase use cybereco-justsplit-prod
cp firebase/justsplit/firestore.production.rules firestore.rules
firebase deploy --only firestore:rules
```

## Step 5: Environment Variables

### 5.1 Get Firebase Config

For each project:
1. Go to Project Settings → General
2. Scroll to "Your apps" → Web app
3. Click "Add app" if no web app exists
4. Copy the configuration

### 5.2 Create Production Env Files

```bash
# Copy example files
cp .env.production.example apps/hub/.env.production.local
cp .env.production.example apps/justsplit/.env.production.local
cp .env.production.example apps/website/.env.production.local
```

### 5.3 Fill in Values

Update each `.env.production.local` with your Firebase config values.

## Step 6: Custom Domains

### 6.1 Add Custom Domains to Hosting

For each project:
1. Go to Hosting → Custom domain
2. Add domain:
   - Hub: `hub.cybere.co`
   - JustSplit: `justsplit.cybere.co`
   - Website: `cybere.co` and `www.cybere.co`
3. Follow DNS verification steps

### 6.2 Update DNS Records

Add these records to your DNS provider:

```
# A records for root domain
cybere.co.        A     199.36.158.100
cybere.co.        A     199.36.158.101

# CNAME records for subdomains
hub.cybere.co.    CNAME cybereco-hub-prod.web.app.
justsplit.cybere.co. CNAME cybereco-justsplit-prod.web.app.
www.cybere.co.    CNAME cybereco-website-prod.web.app.
```

### 6.3 SSL Certificates

Firebase automatically provisions SSL certificates. This may take up to 24 hours.

## Step 7: Deploy Applications

### 7.1 Build All Apps

```bash
npm run build
```

### 7.2 Deploy to Firebase

```bash
# Deploy all
./scripts/deploy-production.sh

# Or deploy individually
firebase use cybereco-hub-prod
firebase deploy --only hosting:hub

firebase use cybereco-justsplit-prod
firebase deploy --only hosting:justsplit-app

firebase use cybereco-website-prod
firebase deploy --only hosting:website
```

## Step 8: Configure CORS and Security

### 8.1 CORS for Cross-Origin Auth

Create `cors.json`:
```json
[
  {
    "origin": ["https://hub.cybere.co", "https://justsplit.cybere.co", "https://cybere.co"],
    "method": ["GET", "POST"],
    "maxAgeSeconds": 3600
  }
]
```

Apply to storage buckets:
```bash
gsutil cors set cors.json gs://cybereco-hub-prod.appspot.com
```

### 8.2 Security Headers

Update `firebase.json` for each project:
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "SAMEORIGIN"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

## Step 9: Monitoring and Alerts

### 9.1 Enable Monitoring

1. Go to each project's Performance Monitoring
2. Add Web app
3. Follow SDK setup (already included in our apps)

### 9.2 Set Up Alerts

1. Go to Firebase Alerts
2. Configure alerts for:
   - High error rates
   - Quota usage
   - Security rule denials

### 9.3 Cloud Logging

Enable detailed logging:
```bash
firebase functions:log --project cybereco-hub-prod
```

## Step 10: Backup and Disaster Recovery

### 10.1 Automated Backups

```bash
# Schedule daily Firestore exports
gcloud firestore export --async \
  --collection-ids='users,permissions,apps' \
  --output-uri-prefix=gs://cybereco-hub-backups/$(date +%Y%m%d)
```

### 10.2 Backup Script

Create `scripts/backup-production.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)

# Backup Hub
firebase use cybereco-hub-prod
gcloud firestore export \
  --output-uri-prefix=gs://cybereco-hub-backups/$DATE

# Backup JustSplit  
firebase use cybereco-justsplit-prod
gcloud firestore export \
  --output-uri-prefix=gs://cybereco-justsplit-backups/$DATE
```

## Security Checklist

- [ ] Production security rules deployed
- [ ] Service account keys secured
- [ ] Environment variables not in version control
- [ ] HTTPS enforced on all domains
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Monitoring and alerts configured
- [ ] Backup strategy implemented
- [ ] Incident response plan documented

## Troubleshooting

### Authentication Issues
- Verify authorized domains in Firebase Console
- Check CORS configuration
- Ensure auth tokens include correct audience

### Hosting Issues
- Verify DNS propagation: `dig hub.cybere.co`
- Check SSL certificate status in Firebase Console
- Clear CDN cache if needed

### Performance Issues
- Review Firestore indexes in console
- Check for missing indexes in logs
- Enable offline persistence in apps

## Cost Optimization

1. Set budget alerts in Google Cloud Console
2. Use Firestore bundles for static data
3. Enable Firebase App Check for API protection
4. Implement caching strategies
5. Use Cloud CDN for static assets

## Next Steps

1. Test all authentication flows
2. Run E2E tests against production
3. Set up continuous deployment
4. Document runbooks for common issues
5. Schedule regular security audits