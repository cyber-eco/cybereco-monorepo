#!/bin/bash

# CyberEco Hostname Setup Script
# This script helps configure your machine's hostname for LAN access

echo "🌐 CyberEco LAN Access Setup"
echo "============================"
echo ""

# Function to get current hostname
get_current_hostname() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        scutil --get ComputerName 2>/dev/null || hostname
    else
        # Linux
        hostname
    fi
}

# Function to set hostname
set_hostname() {
    local new_hostname=$1
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        echo "Setting hostname on macOS..."
        sudo scutil --set ComputerName "$new_hostname"
        sudo scutil --set HostName "$new_hostname"
        sudo scutil --set LocalHostName "$new_hostname"
        
        # Flush DNS cache
        sudo dscacheutil -flushcache
        
        echo "✅ Hostname set to: $new_hostname"
        echo "   You can now access CyberEco at: http://$new_hostname.local"
    else
        # Linux
        echo "Setting hostname on Linux..."
        sudo hostnamectl set-hostname "$new_hostname"
        
        # Update /etc/hosts
        sudo sed -i "s/127.0.1.1.*/127.0.1.1\t$new_hostname/" /etc/hosts
        
        # Restart mDNS service
        if command -v systemctl &> /dev/null; then
            sudo systemctl restart avahi-daemon 2>/dev/null || true
        fi
        
        echo "✅ Hostname set to: $new_hostname"
        echo "   You can now access CyberEco at: http://$new_hostname.local"
    fi
}

# Check if Bonjour/mDNS is available
check_mdns() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS has Bonjour built-in
        echo "✅ Bonjour is available (built into macOS)"
        return 0
    else
        # Linux - check for Avahi
        if command -v avahi-daemon &> /dev/null; then
            echo "✅ Avahi daemon is installed"
            return 0
        else
            echo "❌ Avahi daemon is not installed"
            echo "   Install it with: sudo apt-get install avahi-daemon (Debian/Ubuntu)"
            echo "                or: sudo yum install avahi (RHEL/CentOS)"
            return 1
        fi
    fi
}

# Main script
echo "Current hostname: $(get_current_hostname)"
echo ""

# Check mDNS availability
if ! check_mdns; then
    echo ""
    echo "⚠️  mDNS service not available. Please install it first."
    exit 1
fi

echo ""
echo "Would you like to change your hostname to 'cybereco' for easier access?"
echo "This will allow you to access CyberEco at: http://cybereco.local"
echo ""
read -p "Change hostname? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    set_hostname "cybereco"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "You can now access CyberEco apps from any device on your network:"
    echo "  • Gateway: http://cybereco.local:3000"
    echo "  • Hub:     http://cybereco.local:40000"
    echo "  • Website: http://cybereco.local:40001"
    echo "  • JustSplit: http://cybereco.local:40002"
else
    current_hostname=$(get_current_hostname)
    echo ""
    echo "Keeping current hostname: $current_hostname"
    echo ""
    echo "You can access CyberEco apps from any device on your network:"
    echo "  • Gateway: http://$current_hostname.local:3000"
    echo "  • Hub:     http://$current_hostname.local:40000"
    echo "  • Website: http://$current_hostname.local:40001"
    echo "  • JustSplit: http://$current_hostname.local:40002"
fi

echo ""
echo "📝 Note: Make sure to run 'npm run dev:lan' to start services listening on all interfaces"