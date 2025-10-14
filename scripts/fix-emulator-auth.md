# Firebase Emulator Auth Issue

## Problem
Firebase Auth emulator doesn't share authentication state across different ports. This is because:
1. Each port (40000, 40002) is considered a different origin
2. Firebase uses IndexedDB for auth persistence, which is origin-specific
3. localStorage and sessionStorage are also origin-specific

## Current Workaround Attempts
1. ✗ SessionStorage - Not shared across ports
2. ✗ LocalStorage - Not shared across ports  
3. ✗ Cross-origin auth state - localStorage not shared
4. ✗ Waiting for auth propagation - Auth doesn't propagate

## Proper Solutions

### Option 1: Use a Proxy (Recommended for Development)
Run all apps through a single port with path-based routing:
- http://localhost:3000/ → Hub
- http://localhost:3000/justsplit → JustSplit
- http://localhost:3000/website → Website

### Option 2: Custom Token Authentication (Production-ready)
1. Hub creates a custom token using Firebase Admin SDK
2. Hub passes custom token to JustSplit
3. JustSplit uses signInWithCustomToken()

### Option 3: Shared Cookie Domain (Complex)
Use a shared domain with subdomains:
- hub.cybereco.local
- justsplit.cybereco.local

### Option 4: Development-Only Direct Sign In
For development only - pass credentials directly (NOT for production)

## Temporary Fix for Development

Since we're using emulators for development, we can implement a development-only workaround:

1. Hub passes user email in URL
2. JustSplit creates a test user with that email in emulator
3. Signs in with a known test password

This is ONLY for development with emulators and should NEVER be used in production.