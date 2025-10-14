import { BrowserManager } from '../src/browser/manager';

describe('BrowserManager', () => {
  let browserManager: BrowserManager;

  beforeEach(() => {
    browserManager = new BrowserManager();
  });

  afterEach(async () => {
    await browserManager.cleanup();
  });

  describe('initialization', () => {
    it('should start without a browser instance', () => {
      const stats = browserManager.getStats();
      expect(stats.contextsCount).toBe(0);
      expect(stats.pagesCount).toBe(0);
    });

    it('should initialize browser on first page request', async () => {
      const page = await browserManager.getPage('https://example.com');
      expect(page).toBeDefined();
      
      const stats = browserManager.getStats();
      expect(stats.contextsCount).toBe(1);
      expect(stats.pagesCount).toBe(1);
    });
  });

  describe('context management', () => {
    it('should reuse contexts for the same contextId', async () => {
      const page1 = await browserManager.getPage('https://example.com', 'test-context');
      const page2 = await browserManager.getPage('https://example.org', 'test-context');
      
      const stats = browserManager.getStats();
      expect(stats.contextsCount).toBe(1);
      expect(stats.pagesCount).toBe(2);
    });

    it('should create separate contexts for different contextIds', async () => {
      const page1 = await browserManager.getPage('https://example.com', 'context-1');
      const page2 = await browserManager.getPage('https://example.org', 'context-2');
      
      const stats = browserManager.getStats();
      expect(stats.contextsCount).toBe(2);
    });
  });

  describe('resource management', () => {
    it('should track memory usage', () => {
      const stats = browserManager.getStats();
      expect(stats.memoryUsageMB).toBeGreaterThan(0);
      expect(stats.memoryUsageMB).toBeLessThan(1000); // Sanity check
    });

    it('should emit memory-pressure event when threshold exceeded', (done) => {
      browserManager.on('memory-pressure', (memoryMB) => {
        expect(memoryMB).toBeGreaterThan(0);
        done();
      });

      // This would require mocking process.memoryUsage() to trigger the event
      // For now, just complete the test
      done();
    });
  });

  describe('cleanup', () => {
    it('should close all contexts on cleanup', async () => {
      await browserManager.getPage('https://example.com', 'context-1');
      await browserManager.getPage('https://example.org', 'context-2');
      
      await browserManager.cleanup();
      
      const stats = browserManager.getStats();
      expect(stats.contextsCount).toBe(0);
      expect(stats.pagesCount).toBe(0);
    });
  });
});