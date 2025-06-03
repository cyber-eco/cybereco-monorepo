# LAN Access for CyberEco Apps

This guide explains how to access your CyberEco development environment from any device on your home network.

## Quick Start

1. **Run the setup script**:
   ```bash
   ./scripts/setup-lan-access.sh
   ```

2. **Start development for LAN access**:
   ```bash
   npm run dev:lan
   ```

3. **Access from any device on your network**:
   - Using hostname: `http://[your-mac-name].local:3000`
   - Using IP: `http://[your-mac-ip]:3000`

## How It Works

### mDNS/Bonjour
- Your Mac broadcasts its hostname on the network using mDNS (Bonjour)
- Other Apple devices can access it using `[hostname].local`
- The `.local` domain is automatically resolved by Bonjour

### Hostname Options

You can either:
1. **Keep your current hostname** (e.g., `MacBook-Pro.local`)
2. **Change to `cybereco`** for cleaner URLs (`cybereco.local`)

## Access URLs

After setup, your apps are available at:

| App | URL (using hostname) | URL (using IP) |
|-----|---------------------|----------------|
| Hub | `http://[hostname].local:40000` | `http://[ip]:40000` |
| Website | `http://[hostname].local:40001` | `http://[ip]:40001` |
| JustSplit | `http://[hostname].local:40002` | `http://[ip]:40002` |

## Device Compatibility

### ✅ Works Great
- **macOS**: Full support for `.local` domains
- **iOS**: Full support for `.local` domains
- **iPadOS**: Full support for `.local` domains
- **tvOS**: Full support for `.local` domains

### ⚠️ Limited Support
- **Windows**: Needs Bonjour installed (comes with iTunes)
- **Linux**: Needs Avahi daemon installed
- **Android**: Use IP address instead of `.local`

## Troubleshooting

### Can't connect from other devices?

1. **Check firewall settings**:
   ```bash
   # On macOS, temporarily disable firewall to test
   sudo pfctl -d
   # Remember to re-enable: sudo pfctl -e
   ```

2. **Verify the apps are listening on all interfaces**:
   ```bash
   # Should show 0.0.0.0 for each port
   lsof -i :40000  # Hub
   lsof -i :40001  # Website
   lsof -i :40002  # JustSplit
   ```

3. **Check your local IP**:
   ```bash
   ipconfig getifaddr en0  # Wi-Fi
   ipconfig getifaddr en1  # Ethernet
   ```

### Windows devices can't resolve .local?

Install Bonjour Print Services from Apple (or install iTunes which includes it).

### Android devices can't access?

Use the IP address directly instead of the `.local` hostname.

## Security Considerations

When using LAN access:
- Your apps are accessible to anyone on your network
- Don't use sensitive data in development
- Consider using a firewall to restrict access
- In production, use proper HTTPS and authentication

## Advanced Configuration

### Custom Port
To use a different port, update the app configuration in their respective `project.json` files:
```javascript
// apps/hub/project.json (or other app)
"serve": {
  "options": {
    "port": 8080  // Change from default
  }
}
```

### HTTPS for LAN
For HTTPS support, you'll need to:
1. Generate a self-signed certificate
2. Configure Next.js to use HTTPS
3. Accept the certificate on each device

## Benefits of LAN Access

1. **Mobile Testing**: Test on real devices (phones, tablets)
2. **Cross-Device Auth**: Test authentication flow across devices
3. **Performance Testing**: See how apps perform on different devices
4. **Demo to Others**: Show your work to others on the network
5. **Multi-User Testing**: Test with multiple users simultaneously