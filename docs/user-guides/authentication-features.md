# Authentication Features User Guide

## Table of Contents
1. [Two-Factor Authentication](#two-factor-authentication)
2. [Session Management](#session-management)
3. [Privacy Controls](#privacy-controls)
4. [Data Export](#data-export)
5. [Security Dashboard](#security-dashboard)

## Two-Factor Authentication

### What is 2FA?
Two-Factor Authentication adds an extra layer of security to your CyberEco account by requiring a second form of verification beyond your password.

### Setting Up 2FA

1. **Navigate to Security Settings**
   - Go to Hub → Security → Two-Factor Authentication
   - Click "Enable Two-Factor Authentication"
   - Enter your password to confirm

2. **Configure Your Authenticator App**
   
   **Supported Apps:**
   - Google Authenticator
   - Microsoft Authenticator
   - Authy
   - 1Password
   - Any TOTP-compatible app

3. **Scan the QR Code**
   - Open your authenticator app
   - Select "Add Account" or "+"
   - Scan the QR code displayed
   - Alternatively, manually enter the secret key

4. **Verify Setup**
   - Enter the 6-digit code from your app
   - Click "Verify and Enable"

5. **Save Backup Codes**
   - **IMPORTANT**: Save the 10 backup codes provided
   - Store them securely (password manager, safe, etc.)
   - Each code can only be used once

### Using 2FA

**During Sign In:**
1. Enter your email and password
2. When prompted, enter the 6-digit code from your authenticator
3. Optionally, trust the device for 30 days

**If You Lose Your Device:**
1. Click "Use backup code" during sign in
2. Enter one of your saved backup codes
3. Sign in and immediately set up 2FA on a new device

### Managing 2FA

**Disable 2FA:**
1. Go to Security Settings
2. Click "Disable Two-Factor Authentication"
3. Enter your password and current 2FA code
4. Confirm disabling

**Regenerate Backup Codes:**
1. Go to Security Settings → 2FA
2. Click "Regenerate Backup Codes"
3. Save the new codes securely
4. Old codes become invalid immediately

## Session Management

### Viewing Active Sessions

1. **Access Session Dashboard**
   - Navigate to Hub → Security → Active Sessions
   - View all devices currently signed in

2. **Session Information Displayed:**
   - Device type and browser
   - Location (approximate)
   - Last activity time
   - IP address
   - Sign-in date

### Managing Sessions

**Sign Out Other Devices:**
1. Click "Revoke" next to any session
2. That device will be immediately signed out
3. They'll need to sign in again

**Sign Out All Devices:**
1. Click "Sign Out All Other Sessions"
2. Enter your password to confirm
3. All sessions except current will be terminated

### Session Security Features

- **Automatic Timeout**: Sessions expire after 30 days of inactivity
- **Location Alerts**: Notifications for sign-ins from new locations
- **Device Trust**: Option to remember devices for faster sign-in
- **Activity Monitoring**: Track last activity for each session

## Privacy Controls

### Privacy Settings Overview

Access your privacy settings:
1. Go to Hub → Privacy
2. Configure your preferences

### Profile Visibility

**Options:**
- **Public**: Anyone can view your profile
- **Friends Only**: Only approved connections see your profile
- **Private**: Profile hidden from all users

### Activity Visibility

Control who sees different activities:

**Expenses:**
- Everyone: All users can see your expenses
- Friends: Only friends see your expenses
- Only Me: Expenses are private

**Groups:**
- Everyone: Group memberships are public
- Friends: Only friends see your groups
- Only Me: Groups are private

**Settlements:**
- Everyone: Settlement history is public
- Friends: Only friends see settlements
- Only Me: Settlements are private

### Data Sharing Preferences

**Consent Management:**
1. **Necessary**: Required for basic functionality (always on)
2. **Functional**: Enhanced features and preferences
3. **Analytics**: Help improve our services
4. **Marketing**: Receive promotional communications
5. **Personalization**: Tailored content and recommendations

**To Update Consent:**
1. Go to Privacy Settings → Consent Management
2. Toggle each category on/off
3. Changes take effect immediately

### Consent Banner

New users see a consent banner on first visit:
- Clear explanation of data usage
- Granular control over each consent type
- Link to full privacy policy
- Option to accept all or customize

## Data Export

### Requesting Your Data

1. **Navigate to Data Export**
   - Go to Hub → My Data
   - Click "Export Data"

2. **Choose Export Options**
   - **Format**: JSON or CSV
   - **Date Range**: All time or specific period
   - **Data Categories**: Select what to include
     - Profile information
     - JustSplit data (expenses, groups, settlements)
     - Hub data (permissions, connections)
     - Activity logs
     - Privacy settings

3. **Generate Export**
   - Click "Generate Export"
   - Wait for processing (usually instant)
   - Download link appears when ready

### Export Formats

**JSON Format:**
- Hierarchical structure
- Preserves all relationships
- Ideal for developers
- Complete metadata

**CSV Format:**
- Multiple files in a ZIP
- Compatible with Excel/Google Sheets
- Separate file for each data type
- Easy to analyze

### What's Included

**Profile Data:**
- Account information
- Display name and email
- Avatar and preferences
- Account creation date

**Application Data:**
- All expenses (created and participated)
- Group memberships
- Settlement history
- Friend connections
- Event participations

**Privacy Data:**
- Consent records
- Privacy settings history
- Data access logs
- Export history

**Security Data:**
- Login history
- Session information
- Security settings
- 2FA status

### Export Limits

- **Frequency**: 5 exports per 24 hours
- **Size**: Maximum 100MB per export
- **Retention**: Download links expire after 30 minutes
- **Concurrent**: 1 export at a time per user

## Security Dashboard

### Accessing the Dashboard

Navigate to Hub → Security → Dashboard

### Dashboard Features

**1. Recent Activity**
- Last 10 sign-in attempts
- Success/failure status
- Location and device info
- Timestamp

**2. Security Overview**
- Account security score
- Enabled security features
- Recommendations for improvement

**3. Login Analytics**
- Sign-in patterns over time
- Most used devices
- Geographic distribution
- Peak activity hours

**4. Security Alerts**
- Failed login attempts
- New device sign-ins
- Unusual activity patterns
- Security recommendations

### Security Audit

**View Audit Logs:**
1. Go to Security → Audit Logs
2. Filter by:
   - Date range
   - Event type
   - Success/failure
   - Device/location

**Event Types Tracked:**
- Sign in/out events
- Password changes
- 2FA changes
- Privacy setting updates
- Data exports
- Permission changes

**Export Audit Logs:**
1. Click "Export Logs"
2. Choose date range
3. Select CSV or JSON format
4. Download for analysis

### Security Recommendations

The dashboard provides personalized recommendations:

**If 2FA Not Enabled:**
- Warning banner appears
- Direct link to enable 2FA
- Explanation of benefits

**If Weak Password:**
- Password strength indicator
- Suggestions for improvement
- Link to change password

**If Unusual Activity:**
- Alert notifications
- Review recent sessions
- Option to secure account

## Best Practices

### Account Security

1. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Unique for CyberEco
   - Consider a password manager

2. **Enable 2FA**
   - Significantly increases security
   - Use authenticator app over SMS
   - Keep backup codes safe
   - Update if changing phones

3. **Regular Security Reviews**
   - Check active sessions monthly
   - Review login activity
   - Update privacy settings
   - Verify connected apps

### Privacy Protection

1. **Minimal Data Sharing**
   - Only grant necessary consents
   - Review app permissions
   - Use strictest visibility settings
   - Regularly audit data access

2. **Regular Data Reviews**
   - Export your data quarterly
   - Review what's stored
   - Delete unnecessary data
   - Update outdated information

3. **Stay Informed**
   - Read privacy policy updates
   - Understand your rights
   - Know how data is used
   - Report privacy concerns

## Troubleshooting

### Common Issues

**Can't Sign In with 2FA:**
- Ensure device time is correct
- Try codes 30 seconds apart
- Use a backup code
- Contact support if needed

**Export Not Working:**
- Check export limits (5/day)
- Ensure stable connection
- Try smaller date ranges
- Clear browser cache

**Sessions Not Showing:**
- Refresh the page
- Sign out and back in
- Check browser compatibility
- Disable ad blockers

**Privacy Settings Not Saving:**
- Check internet connection
- Try different browser
- Clear cookies
- Contact support

### Getting Help

**Support Channels:**
- In-app help center
- Email: support@cybere.co
- Community forums
- Documentation site

**When Contacting Support:**
- Don't share passwords
- Provide error messages
- Include browser/device info
- Describe steps taken

## FAQ

**Q: How often should I change my password?**
A: We recommend changing passwords every 90 days or immediately if you suspect compromise.

**Q: Can I use SMS for 2FA?**
A: Currently, we only support authenticator apps for better security. SMS can be intercepted.

**Q: How long are sessions valid?**
A: Sessions expire after 30 days of inactivity or when manually revoked.

**Q: Can I recover deleted data?**
A: Deleted data is permanently removed after 30 days. Export regularly for backups.

**Q: Is my exported data encrypted?**
A: Exports are transmitted over HTTPS but files aren't encrypted. Store them securely.

**Q: Can I transfer my data to another service?**
A: Yes, our JSON export format is designed for portability to other services.

**Q: How do I report a security issue?**
A: Email security@cybere.co for urgent issues. Use in-app reporting for general concerns.

**Q: Are backup codes secure?**
A: Yes, they're randomly generated and hashed in our database. Each works only once.