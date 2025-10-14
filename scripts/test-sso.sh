#!/bin/bash

# CyberEco SSO Test Script
# Tests the Single Sign-On implementation between Hub and JustSplit

set -e  # Exit on error

echo "🔐 CyberEco SSO Test"
echo "===================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if development environment is running
echo -e "\n${BLUE}Checking if development environment is running...${NC}"

# Check Hub
if curl -s -o /dev/null -w "%{http_code}" http://localhost:40000 | grep -q "200"; then
    echo -e "✅ Hub is ${GREEN}running${NC} on port 40000"
else
    echo -e "❌ Hub is ${RED}not running${NC}"
    echo "Please run 'npm run dev' first"
    exit 1
fi

# Check JustSplit
if curl -s -o /dev/null -w "%{http_code}" http://localhost:40002 | grep -q "200"; then
    echo -e "✅ JustSplit is ${GREEN}running${NC} on port 40002"
else
    echo -e "❌ JustSplit is ${RED}not running${NC}"
    echo "Please run 'npm run dev' first"
    exit 1
fi

# Check Firebase emulators
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200"; then
    echo -e "✅ Firestore emulator is ${GREEN}running${NC} on port 8080"
else
    echo -e "❌ Firestore emulator is ${RED}not running${NC}"
    echo "Please run 'npm run dev' first"
    exit 1
fi

echo -e "\n${GREEN}✅ All services are running!${NC}"

# Test SSO Flow
echo -e "\n${BLUE}Testing SSO Flow...${NC}"
echo "===================="

echo -e "\n${YELLOW}Test 1: Direct access to JustSplit${NC}"
echo "1. Open http://localhost:40002 in an incognito window"
echo "2. You should be redirected to Hub sign-in page"
echo "3. The URL should be: http://localhost:40000/auth/signin?returnUrl=..."

echo -e "\n${YELLOW}Test 2: Sign in at Hub${NC}"
echo "1. Sign in with demo credentials: demo@cybere.co / demo123"
echo "2. You should see the Hub dashboard"
echo "3. Check browser console for: 'Saved shared auth state'"

echo -e "\n${YELLOW}Test 3: Launch JustSplit from Hub${NC}"
echo "1. Click on the JustSplit card in Hub"
echo "2. You should be redirected to JustSplit with ?fromHub=true"
echo "3. JustSplit should recognize your authentication"
echo "4. Check JustSplit console for: 'Found shared auth state'"

echo -e "\n${YELLOW}Test 4: Direct access after authentication${NC}"
echo "1. Open a new tab and go to http://localhost:40002"
echo "2. You should NOT be redirected to Hub (already authenticated)"
echo "3. Check console for: 'Found existing shared auth state'"

echo -e "\n${YELLOW}Test 5: Sign out${NC}"
echo "1. Sign out from JustSplit"
echo "2. You should be redirected to Hub"
echo "3. Try accessing JustSplit again - should redirect to Hub sign-in"

echo -e "\n${BLUE}Manual Test Checklist:${NC}"
echo "===================="
echo "[ ] Hub sign-in works with demo@cybere.co / demo123"
echo "[ ] Shared auth state is saved (check localStorage for 'cybereco-shared-auth')"
echo "[ ] JustSplit recognizes Hub authentication"
echo "[ ] No redirect loop occurs"
echo "[ ] Sign out clears shared auth state"
echo "[ ] Direct JustSplit access redirects to Hub when not authenticated"

echo -e "\n${BLUE}Common Issues:${NC}"
echo "===================="
echo "• ${YELLOW}Redirect loop${NC}: Clear browser data and try again"
echo "• ${YELLOW}Auth not recognized${NC}: Check browser console for errors"
echo "• ${YELLOW}Firebase errors${NC}: Ensure emulators are running"
echo "• ${YELLOW}Custom hostname issues${NC}: Use localhost, not custom domains"

echo -e "\n${GREEN}🎉 SSO test guide complete!${NC}"
echo "Please perform the manual tests above to verify SSO is working correctly."