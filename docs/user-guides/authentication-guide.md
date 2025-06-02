# CyberEco Authentication User Guide

## Overview

CyberEco uses a centralized authentication system through the Hub application. This means you only need one account to access all CyberEco applications like JustSplit, Somos, Demos, and Plantopia.

## Getting Started

### Creating Your Account

1. **Navigate to CyberEco Hub**
   - Go to [hub.cybere.co](https://hub.cybere.co) or http://localhost:40000 for local development
   - Click "Sign Up" or "Create Account"

2. **Choose Sign-Up Method**
   - **Email & Password**: Enter your email and create a strong password
   - **Social Login**: Use Google, Facebook, or Twitter

3. **Complete Your Profile**
   - Add your name
   - Upload a profile picture (optional)
   - Set your preferences (theme, language, currency)

### Signing In

1. **From Hub**
   - Go to Hub and click "Sign In"
   - Enter your credentials or use social login
   - You'll see your app dashboard

2. **From Any App**
   - When you visit an app (e.g., JustSplit) without being signed in
   - You'll be automatically redirected to Hub
   - After signing in, you'll return to the app

## Using Multiple Apps

### Single Sign-On (SSO)

Once you sign in to Hub, you're automatically signed in to all CyberEco apps:

```
Sign in to Hub → Access JustSplit → Access Somos → Access any app
```

No need to sign in multiple times!

### App Permissions

Not all users have access to all apps. Your available apps depend on:
- Your account type
- Granted permissions
- App availability

To request access to a new app:
1. Go to Hub dashboard
2. Find the app you want
3. Click "Request Access"

## Managing Your Account

### Profile Settings

From any app, you can access your profile:
1. Click your avatar/name in the top right
2. Select "Profile" or "Settings"
3. Update your information

**What You Can Change:**
- Display name
- Profile picture
- Email address
- Phone number
- Language preference
- Theme (light/dark)
- Currency preference
- Notification settings

### Security Settings

Keep your account secure:

1. **Change Password**
   - Go to Settings → Security
   - Click "Change Password"
   - Enter current and new password

2. **Link Social Accounts**
   - Add multiple login methods
   - Go to Settings → Connected Accounts
   - Link Google, Facebook, or Twitter

3. **Two-Factor Authentication** (Coming Soon)
   - Extra security layer
   - Use authenticator app or SMS

## Cross-App Features

### Shared Data

Some data is shared across apps:
- **Profile Information**: Name, avatar, preferences
- **Groups**: Same groups appear in multiple apps
- **Financial Data**: Transactions can be viewed in financial apps

### Notifications

Receive notifications from all apps in one place:
- Hub shows combined notifications
- Click notification to go directly to the app
- Manage notification preferences in Settings

## Troubleshooting

### Can't Sign In?

1. **Forgot Password**
   - Click "Forgot Password" on sign-in page
   - Enter your email
   - Check email for reset link

2. **Account Locked**
   - Too many failed attempts
   - Wait 30 minutes or contact support

3. **Social Login Issues**
   - Ensure pop-ups are enabled
   - Try a different browser
   - Clear browser cache

### Access Issues

**"Access Denied" Message?**
- You don't have permission for this app
- Contact your administrator
- Request access from Hub

**Signed Out Unexpectedly?**
- Session expired (after 30 days)
- Signed out from another device
- Browser cleared cookies

### Browser Compatibility

CyberEco works best with:
- Chrome (version 90+)
- Firefox (version 88+)
- Safari (version 14+)
- Edge (version 90+)

Enable:
- JavaScript
- Cookies
- Local Storage
- Pop-ups (for social login)

## Privacy & Security

### Your Data

- **Profile Data**: Stored securely in Hub
- **App Data**: Each app stores its specific data
- **Permissions**: You control which apps can access your data

### Best Practices

1. **Use Strong Passwords**
   - At least 8 characters
   - Mix of letters, numbers, symbols
   - Unique to CyberEco

2. **Keep Email Updated**
   - Used for password reset
   - Important notifications
   - Security alerts

3. **Review Connected Apps**
   - Regularly check which apps have access
   - Remove unused app permissions
   - Monitor activity logs

## Mobile Experience

### Progressive Web App

CyberEco apps work on mobile:
1. Open in mobile browser
2. Sign in normally
3. Add to home screen for app-like experience

### Mobile-Specific Features
- Touch-friendly interface
- Responsive design
- Offline capability (limited)
- Push notifications (coming soon)

## Getting Help

### In-App Help
- Click "Help" in any app
- Search for answers
- View tutorials

### Contact Support
- Email: support@cybere.co
- Hub: Help → Contact Support
- Include: Browser, app name, error details

### Community
- Join CyberEco Community
- Ask questions in forums
- Share tips with other users

## Tips & Tricks

### Quick Navigation
- **Ctrl/Cmd + K**: Quick app switcher
- **Click logo**: Return to Hub
- **Bookmark**: Save frequently used apps

### Session Management
- **Stay Signed In**: Check "Remember me"
- **Multiple Devices**: Sign in on all your devices
- **Sign Out Everywhere**: Security → Sign out all devices

### Personalization
- **Dark Mode**: Easier on the eyes at night
- **Language**: Choose English or Spanish
- **Currency**: Set default for financial apps

## Frequently Asked Questions

**Q: Do I need separate accounts for each app?**
A: No! One CyberEco account works for all apps.

**Q: Can I use different emails for different apps?**
A: No, your email is tied to your central account.

**Q: What happens if I delete my account?**
A: All app data is removed. This action cannot be undone.

**Q: Can I have multiple CyberEco accounts?**
A: Yes, but you'll need different email addresses.

**Q: Is my data shared between apps?**
A: Only basic profile data. Each app's specific data remains separate unless you explicitly share it.

**Q: How do I sign out of just one app?**
A: You can't. Signing out affects all apps for security.

**Q: Can I transfer data between accounts?**
A: Not currently. Choose your account carefully.

## Updates & Changes

We continuously improve authentication:
- Check Hub announcements
- Read update emails
- New features added regularly

Last updated: {{ current_date }}