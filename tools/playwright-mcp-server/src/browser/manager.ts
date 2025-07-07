import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { EventEmitter } from 'events';

interface ContextInfo {
  context: BrowserContext;
  pages: Map<string, Page>;
  lastAccessed: number;
  refCount: number;
}

export class BrowserManager extends EventEmitter {
  private browser: Browser | null = null;
  private contexts: Map<string, ContextInfo> = new Map();
  private readonly MAX_CONTEXTS = 5;
  private readonly CONTEXT_TIMEOUT = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_MEMORY_MB = 150;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private memoryCheckTimer: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.startCleanupTimer();
    this.startMemoryMonitoring();
  }

  async initialize(): Promise<void> {
    if (!this.browser) {
      console.log('Initializing Playwright browser...');
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=IsolateOrigins',
          '--disable-site-isolation-trials',
          '--disable-blink-features=AutomationControlled',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-extensions',
          '--disable-default-apps',
          '--disable-sync',
          '--disable-translate',
          '--mute-audio',
          '--hide-scrollbars',
        ],
      });
      console.log('Browser initialized');
    }
  }

  async getPage(url: string, contextId: string = 'default'): Promise<Page> {
    await this.initialize();

    let contextInfo = this.contexts.get(contextId);
    
    if (!contextInfo) {
      // Check if we need to evict a context
      if (this.contexts.size >= this.MAX_CONTEXTS) {
        await this.evictLeastRecentlyUsed();
      }

      const context = await this.browser!.newContext({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      });

      contextInfo = {
        context,
        pages: new Map(),
        lastAccessed: Date.now(),
        refCount: 0,
      };
      this.contexts.set(contextId, contextInfo);
    }

    contextInfo.lastAccessed = Date.now();
    contextInfo.refCount++;

    // Check if page already exists
    let page = contextInfo.pages.get(url);
    if (!page || page.isClosed()) {
      page = await contextInfo.context.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      contextInfo.pages.set(url, page);
    }

    return page;
  }

  async releasePage(url: string, contextId: string = 'default'): Promise<void> {
    const contextInfo = this.contexts.get(contextId);
    if (contextInfo) {
      contextInfo.refCount = Math.max(0, contextInfo.refCount - 1);
      
      if (contextInfo.refCount === 0) {
        // Mark for cleanup but don't immediately close
        contextInfo.lastAccessed = Date.now();
      }
    }
  }

  private async evictLeastRecentlyUsed(): Promise<void> {
    let oldestContext: string | null = null;
    let oldestTime = Date.now();

    for (const [id, info] of this.contexts.entries()) {
      if (info.refCount === 0 && info.lastAccessed < oldestTime) {
        oldestTime = info.lastAccessed;
        oldestContext = id;
      }
    }

    if (oldestContext) {
      await this.closeContext(oldestContext);
    }
  }

  private async closeContext(contextId: string): Promise<void> {
    const contextInfo = this.contexts.get(contextId);
    if (contextInfo) {
      try {
        // Close all pages
        for (const page of contextInfo.pages.values()) {
          if (!page.isClosed()) {
            await page.close();
          }
        }
        // Close context
        await contextInfo.context.close();
      } catch (error) {
        console.error(`Error closing context ${contextId}:`, error);
      }
      this.contexts.delete(contextId);
    }
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(async () => {
      const now = Date.now();
      for (const [id, info] of this.contexts.entries()) {
        if (
          info.refCount === 0 &&
          now - info.lastAccessed > this.CONTEXT_TIMEOUT
        ) {
          await this.closeContext(id);
        }
      }
    }, 30000); // Check every 30 seconds
  }

  private startMemoryMonitoring(): void {
    this.memoryCheckTimer = setInterval(() => {
      const usage = process.memoryUsage();
      const memoryMB = usage.heapUsed / 1024 / 1024;
      
      if (memoryMB > this.MAX_MEMORY_MB * 0.9) {
        console.warn(`High memory usage: ${memoryMB.toFixed(2)}MB`);
        this.emit('memory-pressure', memoryMB);
        // Force cleanup of unused contexts
        this.forceCleanup();
      } else if (memoryMB > this.MAX_MEMORY_MB * 0.6) {
        console.log(`Memory usage: ${memoryMB.toFixed(2)}MB`);
      }
    }, 5000); // Check every 5 seconds
  }

  private async forceCleanup(): Promise<void> {
    // Close all contexts with zero references
    const contextsToClose = [];
    for (const [id, info] of this.contexts.entries()) {
      if (info.refCount === 0) {
        contextsToClose.push(id);
      }
    }
    
    for (const id of contextsToClose) {
      await this.closeContext(id);
    }

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }

  async cleanup(): Promise<void> {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    if (this.memoryCheckTimer) {
      clearInterval(this.memoryCheckTimer);
    }

    // Close all contexts
    for (const id of this.contexts.keys()) {
      await this.closeContext(id);
    }

    // Close browser
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  getStats(): {
    contextsCount: number;
    pagesCount: number;
    memoryUsageMB: number;
  } {
    let totalPages = 0;
    for (const info of this.contexts.values()) {
      totalPages += info.pages.size;
    }

    return {
      contextsCount: this.contexts.size,
      pagesCount: totalPages,
      memoryUsageMB: process.memoryUsage().heapUsed / 1024 / 1024,
    };
  }
}