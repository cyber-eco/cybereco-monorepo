#!/bin/bash

# CyberEco Production Deployment Script
# Deploys all apps to their respective subdomains

set -e  # Exit on error

echo "🚀 CyberEco Production Deployment"
echo "================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if production environment is confirmed
echo -e "${YELLOW}⚠️  WARNING: This will deploy to PRODUCTION!${NC}"
read -p "Are you sure you want to continue? (yes/no) " -n 3 -r
echo
if [[ ! $REPLY =~ ^yes$ ]]
then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 1
fi

# Build all applications
echo -e "\n${GREEN}Building applications...${NC}"

# Build Hub
echo "Building Hub..."
cd apps/hub
npm run build
cd ../..

# Build JustSplit
echo "Building JustSplit..."
cd apps/justsplit
npm run build
cd ../..

# Build Website
echo "Building Website..."
cd apps/website
npm run build
npm run export
cd ../..

# Deploy to Firebase
echo -e "\n${GREEN}Deploying to Firebase...${NC}"

# Deploy Hub
echo "Deploying Hub to hub.cybere.co..."
firebase deploy \
  --only hosting:hub \
  --project cybereco-hub \
  --config firebase/production-hosting.json

# Deploy JustSplit  
echo "Deploying JustSplit to justsplit.cybere.co..."
firebase deploy \
  --only hosting:justsplit \
  --project cybereco-justsplit \
  --config firebase/production-hosting.json

# Deploy Website
echo "Deploying Website to www.cybere.co..."
firebase deploy \
  --only hosting:website \
  --project cybereco-website \
  --config firebase/production-hosting.json

echo -e "\n${GREEN}✅ Production deployment complete!${NC}"
echo "================================="
echo "Hub: https://hub.cybere.co"
echo "JustSplit: https://justsplit.cybere.co"
echo "Website: https://www.cybere.co"
echo "================================="

# Verify deployments
echo -e "\n${GREEN}Verifying deployments...${NC}"

# Check Hub
if curl -s -o /dev/null -w "%{http_code}" https://hub.cybere.co | grep -q "200\|301\|302"; then
    echo -e "✅ Hub is ${GREEN}live${NC}"
else
    echo -e "❌ Hub deployment ${RED}failed${NC}"
fi

# Check JustSplit
if curl -s -o /dev/null -w "%{http_code}" https://justsplit.cybere.co | grep -q "200\|301\|302"; then
    echo -e "✅ JustSplit is ${GREEN}live${NC}"
else
    echo -e "❌ JustSplit deployment ${RED}failed${NC}"
fi

# Check Website
if curl -s -o /dev/null -w "%{http_code}" https://www.cybere.co | grep -q "200\|301\|302"; then
    echo -e "✅ Website is ${GREEN}live${NC}"
else
    echo -e "❌ Website deployment ${RED}failed${NC}"
fi

echo -e "\n${GREEN}🎉 All done!${NC}"