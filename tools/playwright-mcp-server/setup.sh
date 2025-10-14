#!/bin/bash

echo "🚀 Setting up Playwright MCP Server for CyberEco..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the playwright-mcp-server directory.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Build the project
echo -e "${BLUE}🔨 Building the project...${NC}"
npm run build

# Create example MCP config
MCP_CONFIG_DIR="$HOME/.config/claude"
MCP_CONFIG_FILE="$MCP_CONFIG_DIR/mcp-config.json"

echo -e "${BLUE}📝 Creating MCP configuration...${NC}"

# Create directory if it doesn't exist
mkdir -p "$MCP_CONFIG_DIR"

# Check if config already exists
if [ -f "$MCP_CONFIG_FILE" ]; then
    echo -e "${YELLOW}⚠️  MCP config already exists at $MCP_CONFIG_FILE${NC}"
    echo "Add this to your mcpServers section:"
else
    echo "Creating new MCP config at $MCP_CONFIG_FILE"
    cat > "$MCP_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "playwright-debugger": {
      "command": "node",
      "args": ["$(pwd)/dist/server.js"],
      "cwd": "$(pwd)/../.."
    }
  }
}
EOF
fi

# Display the configuration to add
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Add this configuration to your MCP client:"
echo ""
echo -e "${BLUE}{
  \"playwright-debugger\": {
    \"command\": \"node\",
    \"args\": [\"$(pwd)/dist/server.js\"],
    \"cwd\": \"$(pwd)/../..\"
  }
}${NC}"
echo ""
echo "Usage examples:"
echo ""
echo "1. Debug scrolling issues:"
echo "   mcp-cli call debug-css-scrolling --url \"http://localhost:40001/documentation\""
echo ""
echo "2. Inspect CSS cascade:"
echo "   mcp-cli call inspect-css-cascade --url \"http://localhost:40001/documentation\" --selector \".sidebar\""
echo ""
echo "3. Monitor DOM changes:"
echo "   mcp-cli call monitor-dom-changes --url \"http://localhost:40001/documentation\" --selectors '[\".sidebar\"]' --duration 30"
echo ""
echo "4. Capture annotated screenshot:"
echo "   mcp-cli call visual-diff --url \"http://localhost:40001/documentation\" --fullPage true --annotateIssues true"
echo ""
echo -e "${GREEN}🎉 Happy debugging!${NC}"