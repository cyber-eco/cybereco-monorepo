#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { BrowserManager } from './browser/manager.js';
import { debugCssScrollingTool } from './tools/css-inspector.js';
import { inspectCssCascadeTool } from './tools/cascade-analyzer.js';
import { monitorDomChangesTool } from './tools/dom-monitor.js';
import { visualDiffTool } from './tools/visual-debugger.js';

// Initialize browser manager
const browserManager = new BrowserManager();

// Create MCP server
const server = new Server(
  {
    name: 'playwright-css-debugger',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const tools = [
  debugCssScrollingTool,
  inspectCssCascadeTool,
  monitorDomChangesTool,
  visualDiffTool,
];

// Register tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  })),
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const tool = tools.find(t => t.name === name);
  if (!tool) {
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${name}`
    );
  }

  try {
    // Ensure browser is initialized
    await browserManager.initialize();
    
    // Execute tool
    const result = await tool.execute(browserManager, args);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error(`Error executing tool ${name}:`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});

// Cleanup on shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down MCP server...');
  await browserManager.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await browserManager.cleanup();
  process.exit(0);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Playwright MCP Server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});