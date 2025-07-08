# Firebase API Keys Security

## Overview

Firebase Web API keys are **not secret credentials** and are designed to be included in client-side code. This is a fundamental design principle of Firebase.

## Why Firebase API Keys Are Public

1. **Client-Side Usage**: Firebase is designed for direct client-to-database communication
2. **Not Authentication**: API keys identify your project, not authenticate users
3. **Security Through Other Means**: Real security is enforced elsewhere

## Actual Security Measures

### 1. Firebase Authentication
- Users must authenticate before accessing data
- Support for multiple auth providers (Email, Google, etc.)
- Custom claims for fine-grained access control

### 2. Firestore Security Rules
```javascript
// Example: Only authenticated users can read/write their own data
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

### 3. Authorized Domains
- Configure allowed domains in Firebase Console
- Prevents unauthorized websites from using your Firebase project
- Settings → Authentication → Settings → Authorized domains

### 4. API Restrictions (Optional)
- Can restrict API key usage to specific APIs
- Configure in Google Cloud Console
- Usually not necessary for Firebase-only usage

## Best Practices

1. **Still Use Environment Variables**
   - Keeps configuration centralized
   - Makes it easier to switch between projects (dev/staging/prod)
   - Follows standard development practices

2. **Never Expose Service Account Keys**
   - Service account keys (used server-side) ARE secret
   - Never commit service account JSON files
   - Use Firebase Admin SDK only on secure servers

3. **Monitor Usage**
   - Check Firebase Console for unexpected usage patterns
   - Set up billing alerts
   - Review security rules regularly

## Common Misconceptions

❌ **Wrong**: "My Firebase API key was exposed, my app is compromised!"
✅ **Right**: "My Firebase API key is public by design, security comes from Auth + Rules"

❌ **Wrong**: "I need to hide my Firebase config from users"
✅ **Right**: "Firebase config is meant to be in client code"

## GitHub Secret Scanning

GitHub will still alert you about Firebase API keys because:
- It can't distinguish between Firebase keys and other Google API keys
- It errs on the side of caution
- You can safely close these alerts for Firebase Web API keys

## References

- [Firebase Documentation: API Keys](https://firebase.google.com/docs/projects/api-keys)
- [Firebase Security Checklist](https://firebase.google.com/support/guides/security-checklist)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)