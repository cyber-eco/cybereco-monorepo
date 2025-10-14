# Environment Setup Guide

This guide provides comprehensive instructions for setting up your development environment for the CyberEco platform.

## Table of Contents

1. [Overview](#overview)
2. [Environment Variables](#environment-variables)
3. [Firebase Setup](#firebase-setup)
4. [Multi-Project Configuration](#multi-project-configuration)
5. [Running Scripts](#running-scripts)
6. [Troubleshooting](#troubleshooting)

## Overview

CyberEco uses environment variables to manage configuration across different environments (development, staging, production). The platform uses Firebase for authentication and data storage, requiring proper API key configuration.

> **Important**: Firebase Web API keys are designed to be public and safe to expose. Security is enforced through Firebase Authentication and Firestore Security Rules, not through keeping API keys secret.

## Environment Variables

### File Structure

```
cybereco-monorepo/
├── .env.local              # Your local environment variables (git ignored)
├── .env.production.example # Production example template
├── apps/
│   ├── hub/
│   │   └── .env.local      # Hub-specific overrides (optional)
│   ├── justsplit/
│   │   └── .env.local      # JustSplit-specific overrides (optional)
│   └── website/
│       └── .env.local      # Website-specific overrides (optional)
```

### Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.production.example .env.local
   ```

2. **Edit `.env.local`** with your Firebase configuration values

3. **Verify setup:**
   ```bash
   npm run dev
   ```

### Required Variables

```bash
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Optional: Firebase Measurement ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Loading Order

Environment variables are loaded in this order (later files override earlier ones):

1. `.env` (shared defaults)
2. `.env.development` or `.env.production` (based on NODE_ENV)
3. `.env.local` (local overrides, not committed to git)
4. App-specific `.env.local` files (if present)

## Firebase Setup

### Creating a Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Click "Create a project" or select an existing one

2. **Enable Required Services**
   - Authentication: Enable Email/Password and Google Sign-In
   - Firestore Database: Create in production mode
   - (Optional) Storage: For file uploads

3. **Register Your Web App**
   - In Project Settings → General
   - Click "Add app" → Web
   - Register app with a nickname (e.g., "CyberEco Development")
   - Copy the configuration object

4. **Get Configuration Values**
   ```javascript
   // Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "AIza...",            // Copy this
     authDomain: "...",            // Copy this
     projectId: "...",             // Copy this
     storageBucket: "...",         // Copy this
     messagingSenderId: "...",     // Copy this
     appId: "..."                  // Copy this
   };
   ```

### Security Configuration

1. **Set Authorized Domains**
   - Go to Authentication → Settings → Authorized domains
   - Add your development and production domains:
     - `localhost`
     - `cybere.co`
     - Your custom domains

2. **Configure Firestore Rules**
   ```javascript
   // firestore.rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Only authenticated users can read/write their data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Multi-Project Configuration

CyberEco supports multiple Firebase projects for different apps:

### Option 1: Single Project (Recommended for Development)

Use one Firebase project for all apps:

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=shared-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shared-project.firebaseapp.com
# ... other shared config
```

### Option 2: Multiple Projects (Production Setup)

Different Firebase projects per app:

```bash
# .env.local or .env.production.local

# Hub Firebase Project
NEXT_PUBLIC_HUB_API_KEY=hub-api-key
NEXT_PUBLIC_HUB_AUTH_DOMAIN=hub-project.firebaseapp.com
NEXT_PUBLIC_HUB_PROJECT_ID=hub-project

# JustSplit Firebase Project  
NEXT_PUBLIC_JUSTSPLIT_API_KEY=justsplit-api-key
NEXT_PUBLIC_JUSTSPLIT_AUTH_DOMAIN=justsplit-project.firebaseapp.com
NEXT_PUBLIC_JUSTSPLIT_PROJECT_ID=justsplit-project

# Website Firebase Project
NEXT_PUBLIC_WEBSITE_API_KEY=website-api-key
NEXT_PUBLIC_WEBSITE_AUTH_DOMAIN=website-project.firebaseapp.com
NEXT_PUBLIC_WEBSITE_PROJECT_ID=website-project
```

## Running Scripts

Some scripts (like `seed-hub-dashboard.js`) require environment variables:

### Method 1: Using .env.local with dotenv

1. Install dotenv:
   ```bash
   npm install --save-dev dotenv
   ```

2. Add to the top of your script:
   ```javascript
   require('dotenv').config({ path: '.env.local' });
   ```

3. Run the script:
   ```bash
   node scripts/seed-hub-dashboard.js
   ```

### Method 2: Export Variables

```bash
# Export all required variables
export NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
# ... export others

# Run the script
node scripts/seed-hub-dashboard.js
```

### Method 3: Inline Variables

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-key \
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain \
node scripts/seed-hub-dashboard.js
```

## Troubleshooting

### Common Issues

1. **"Missing required environment variables" error**
   - Ensure `.env.local` exists and contains all required variables
   - Check variable names match exactly (case-sensitive)
   - For scripts, ensure variables are exported or use dotenv

2. **"Permission denied" Firebase errors**
   - Check Firestore Security Rules
   - Verify authorized domains in Firebase Console
   - Ensure user is authenticated

3. **Variables not loading in Next.js**
   - Variables must start with `NEXT_PUBLIC_` to be available client-side
   - Restart the development server after changing `.env.local`
   - Clear `.next` cache: `rm -rf .next`

4. **Different values in development vs production**
   - Check loading order of env files
   - Ensure production deployments have env variables set
   - Use `console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)` to debug

### Validation Script

Create a simple validation script to check your setup:

```javascript
// scripts/check-env.js
const required = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing environment variables:');
  missing.forEach(key => console.error(`   - ${key}`));
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set!');
}
```

Run with: `node scripts/check-env.js`

## Next Steps

- Review [Firebase Security Best Practices](../security/firebase-api-keys.md)
- Set up [Firebase Emulators](./local-development.md#firebase-emulator-usage) for local development
- Configure [Production Deployment](../deployment/firebase-deployment.md)

## Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [CyberEco Security Documentation](../security/firebase-api-keys.md)