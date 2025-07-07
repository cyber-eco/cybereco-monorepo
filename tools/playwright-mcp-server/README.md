# Playwright MCP Server for CyberEco

A Model Context Protocol (MCP) server that provides visual debugging and CSS inspection capabilities using Playwright. This tool helps debug CSS issues, analyze scrolling problems, and monitor DOM changes in real-time.

## Features

- **CSS Scrolling Debugger**: Detect and analyze double scrollbar issues
- **CSS Cascade Inspector**: Trace CSS rules and computed styles for any element
- **DOM Change Monitor**: Watch for real-time DOM and style changes
- **Visual Diff Tool**: Compare screenshots and annotate CSS issues

## Installation

```bash
cd tools/playwright-mcp-server
npm install
```

## Usage

### Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### Available Tools

#### 1. Debug CSS Scrolling

Analyzes scrolling behavior and detects double scrollbars.

```json
{
  "tool": "debug-css-scrolling",
  "arguments": {
    "url": "http://localhost:40001/documentation",
    "selectors": [".sidebar", ".mainContent"] // optional
  }
}
```

Returns:
- List of all scrollable elements
- Nested scroll container issues
- Sticky positioning problems
- Specific recommendations to fix issues

#### 2. Inspect CSS Cascade

Traces CSS rules and computed styles for any element.

```json
{
  "tool": "inspect-css-cascade",
  "arguments": {
    "url": "http://localhost:40001/documentation",
    "selector": ".sidebar",
    "properties": ["overflow", "position", "height"], // optional
    "includePseudoStates": false // optional
  }
}
```

Returns:
- Computed styles for the element
- All CSS rules that match (with specificity)
- Overridden rules and why
- Inherited properties from ancestors
- CSS variables in use

#### 3. Monitor DOM Changes

Watches for DOM and style changes in real-time.

```json
{
  "tool": "monitor-dom-changes",
  "arguments": {
    "url": "http://localhost:40001/documentation",
    "selectors": [".sidebar", ".mainContent"],
    "duration": 30, // seconds
    "useWebSocket": false // optional
  }
}
```

Returns:
- Timestamp of each change
- Type of change (attribute, childList, style)
- Before/after values
- WebSocket stream support for real-time updates

#### 4. Visual Diff

Captures screenshots and annotates CSS issues.

```json
{
  "tool": "visual-diff",
  "arguments": {
    "url": "http://localhost:40001/documentation",
    "selector": ".documentationLayout", // optional
    "fullPage": true,
    "annotateIssues": true,
    "viewport": { "width": 1920, "height": 1080 } // optional
  }
}
```

Returns:
- Base64 encoded screenshot
- Detected issues with annotations
- Scrollbar and overflow problems highlighted
- Sticky positioning issues marked

## Integration with Claude Code

To use with Claude Code MCP client:

1. Add to your MCP configuration:

```json
{
  "mcpServers": {
    "playwright-debugger": {
      "command": "node",
      "args": ["tools/playwright-mcp-server/dist/server.js"],
      "cwd": "/path/to/cybereco-monorepo"
    }
  }
}
```

2. Use in Claude Code:

```bash
# Debug the double scrollbar issue
mcp-cli call debug-css-scrolling --url "http://localhost:40001/documentation"

# Inspect specific element
mcp-cli call inspect-css-cascade --url "http://localhost:40001/documentation" --selector ".sidebar"
```

## Resource Management

- **Memory Usage**: Target 50-150MB
- **Browser Contexts**: Maximum 5 concurrent
- **Page Timeout**: 5 minutes of inactivity
- **Automatic Cleanup**: Unused resources are cleaned up automatically

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Architecture

- **Browser Manager**: Singleton browser instance with context pooling
- **Tool System**: Modular tools that can be easily extended
- **Memory Monitoring**: Automatic cleanup under memory pressure
- **Error Recovery**: Graceful degradation and automatic recovery

## Troubleshooting

### High Memory Usage

The server automatically manages memory by:
- Closing unused browser contexts
- Limiting concurrent pages
- Forcing garbage collection when needed

### Browser Crashes

The browser will automatically restart on critical errors. Check logs for details.

### Connection Issues

Ensure the target URLs are accessible and the apps are running on the expected ports:
- Hub: http://localhost:40000
- Website: http://localhost:40001
- JustSplit: http://localhost:40002

## Contributing

1. Add new tools in `src/tools/`
2. Register tools in `src/server.ts`
3. Follow the existing tool interface pattern
4. Add tests for new functionality
5. Update this README with new tool documentation