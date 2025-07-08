# New Repository Migration Guide

## Overview

This guide helps you migrate the CyberEco monorepo to a fresh repository without git history containing exposed keys.

## Option 1: Clean Migration (Recommended)

### Step 1: Prepare Current Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Final commit before migration"

# Create a fresh archive without .git
cd ..
cp -r cybereco-monorepo cybereco-monorepo-clean
cd cybereco-monorepo-clean
rm -rf .git
rm -rf .git*  # Remove all git-related files
```

### Step 2: Initialize New Repository
```bash
# Create new repo on GitHub first, then:
git init
git add .
git commit -m "Initial commit - CyberEco Platform"
git branch -M main
git remote add origin https://github.com/YOUR_NEW_ACCOUNT/cybereco-monorepo.git
git push -u origin main
```

### Step 3: Update Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase configuration
3. Note: Firebase API keys are public and safe to commit (see docs/security/firebase-api-keys.md)

## Option 2: History Cleaning (Advanced)

If you want to preserve history but remove sensitive data:

### Using BFG Repo-Cleaner
```bash
# Download BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Clone a fresh copy
git clone --mirror https://github.com/OLD_REPO/cybereco-monorepo.git

# Remove the file from history
java -jar bfg-1.14.0.jar --delete-files seed-hub-dashboard.js cybereco-monorepo.git

# Clean up
cd cybereco-monorepo.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Push to new repository
git remote set-url origin https://github.com/NEW_ACCOUNT/cybereco-monorepo.git
git push --mirror
```

## Post-Migration Checklist

### 1. Security Setup
- [ ] Verify Firebase authorized domains include your new deployment URLs
- [ ] Review Firestore security rules
- [ ] Ensure all team members have new repo access
- [ ] Update CI/CD secrets in GitHub

### 2. Environment Configuration
```bash
# Required files:
.env.local                 # Local development
.env.production.local      # Production (not committed)
```

### 3. Firebase Projects
- [ ] No need to create new Firebase projects (API keys are public)
- [ ] Optionally create new projects if you want a fresh start
- [ ] Update authorized domains if using new domain

### 4. Documentation Updates
- [ ] Update README with new repository URL
- [ ] Update any deployment documentation
- [ ] Update team wiki/documentation

## Security Best Practices for New Repo

### 1. Pre-commit Hooks
Install a secret scanner:
```bash
# Using gitleaks
brew install gitleaks

# Add pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
gitleaks detect --source . -v
EOF
chmod +x .git/hooks/pre-commit
```

### 2. GitHub Security Features
- Enable Dependabot alerts
- Enable secret scanning
- Enable code scanning

### 3. Environment Variables Template
Create clear examples:
```bash
# .env.local.example
# Firebase Configuration (These are PUBLIC - see docs/security/firebase-api-keys.md)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# NEVER commit these (if you have them):
# FIREBASE_SERVICE_ACCOUNT_KEY=***
# DATABASE_URL=***
# JWT_SECRET=***
```

## Quick Start After Migration

```bash
# Clone new repository
git clone https://github.com/NEW_ACCOUNT/cybereco-monorepo.git
cd cybereco-monorepo

# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your Firebase config

# Start development
npm run dev
```

## Notes

1. **Firebase API Keys**: Don't worry about these being in git history. They're designed to be public.
2. **Service Account Keys**: These should NEVER be in git. If you had any, create new ones.
3. **GitHub Alerts**: You can close secret scanning alerts for Firebase Web API keys.

## References

- [Firebase API Keys Documentation](https://firebase.google.com/docs/projects/api-keys)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)