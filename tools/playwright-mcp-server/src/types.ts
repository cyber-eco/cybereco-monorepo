import { BrowserManager } from './browser/manager.js';

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  execute(browserManager: BrowserManager, args: any): Promise<any>;
}