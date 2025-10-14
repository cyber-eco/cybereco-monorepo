import { Page } from '@playwright/test';
import { BrowserManager } from '../browser/manager.js';
import { Tool } from '../types.js';
import { WebSocket, WebSocketServer } from 'ws';

// Extend window interface for our injected properties
declare global {
  interface Window {
    __mcpDomChanges?: DOMChange[];
    __mcpObserver?: MutationObserver;
    __mcpStyleChecker?: number;
  }
}

interface DOMChange {
  timestamp: number;
  type: 'attribute' | 'childList' | 'characterData' | 'style';
  selector: string;
  details: {
    attributeName?: string;
    oldValue?: string;
    newValue?: string;
    addedNodes?: string[];
    removedNodes?: string[];
    styleChanges?: Record<string, { old: string; new: string }>;
  };
}

interface MonitoringSession {
  url: string;
  selectors: string[];
  changes: DOMChange[];
  startTime: number;
  endTime?: number;
  wsPort?: number;
}

export const monitorDomChangesTool: Tool = {
  name: 'monitor-dom-changes',
  description: 'Watch for DOM/style changes in real-time',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to monitor',
      },
      selectors: {
        type: 'array',
        items: { type: 'string' },
        description: 'CSS selectors to monitor',
      },
      duration: {
        type: 'number',
        description: 'Monitoring duration in seconds',
        default: 30,
      },
      useWebSocket: {
        type: 'boolean',
        description: 'Stream changes via WebSocket',
        default: false,
      },
    },
    required: ['url', 'selectors'],
  },
  async execute(browserManager: BrowserManager, args: any): Promise<MonitoringSession> {
    const { url, selectors, duration = 30, useWebSocket = false } = args;
    const page = await browserManager.getPage(url);
    const session: MonitoringSession = {
      url,
      selectors,
      changes: [],
      startTime: Date.now(),
    };

    let wss: WebSocketServer | null = null;
    let wsClients: Set<WebSocket> = new Set();

    try {
      // Set up WebSocket server if requested
      if (useWebSocket) {
        const port = 8080 + Math.floor(Math.random() * 1000);
        wss = new WebSocketServer({ port });
        session.wsPort = port;

        wss.on('connection', (ws) => {
          wsClients.add(ws);
          ws.on('close', () => wsClients.delete(ws));
          ws.send(JSON.stringify({ type: 'connected', session }));
        });
      }

      // Inject monitoring script
      await page.evaluate(({ targetSelectors, wsPort }: { targetSelectors: string[]; wsPort?: number }) => {
        // Store original styles for comparison
        const originalStyles = new Map<Element, CSSStyleDeclaration>();
        const monitoredElements = new Set<Element>();

        // Get all elements matching selectors
        targetSelectors.forEach((selector: string) => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              monitoredElements.add(el);
              originalStyles.set(el, window.getComputedStyle(el));
            });
          } catch (e) {
            console.error(`Invalid selector: ${selector}`);
          }
        });

        // Helper to get selector for element
        function getSelector(element: Element): string {
          if (element.id) return `#${element.id}`;
          if (element.className && typeof element.className === 'string') {
            const classes = element.className.split(' ').filter(c => c).join('.');
            if (classes) return `.${classes}`;
          }
          return element.tagName.toLowerCase();
        }

        // Helper to detect style changes
        function detectStyleChanges(element: Element): Record<string, { old: string; new: string }> | null {
          const original = originalStyles.get(element);
          if (!original) return null;

          const current = window.getComputedStyle(element);
          const changes: Record<string, { old: string; new: string }> = {};

          // Check common properties that might change
          const propsToCheck = [
            'overflow', 'overflow-x', 'overflow-y', 'position', 'display',
            'height', 'max-height', 'min-height', 'width', 'max-width',
            'padding', 'margin', 'transform', 'opacity', 'visibility',
            'z-index', 'top', 'left', 'right', 'bottom'
          ];

          propsToCheck.forEach(prop => {
            const oldValue = original.getPropertyValue(prop);
            const newValue = current.getPropertyValue(prop);
            if (oldValue !== newValue) {
              changes[prop] = { old: oldValue, new: newValue };
            }
          });

          return Object.keys(changes).length > 0 ? changes : null;
        }

        // Send change event
        function sendChange(change: any) {
          // Store in window for retrieval
          if (!window.__mcpDomChanges) {
            window.__mcpDomChanges = [];
          }
          window.__mcpDomChanges.push(change);

          // Send via WebSocket if available
          if (wsPort && window.WebSocket) {
            try {
              const ws = new WebSocket(`ws://localhost:${wsPort}`);
              ws.onopen = () => {
                ws.send(JSON.stringify({ type: 'change', change }));
                ws.close();
              };
            } catch (e) {
              console.error('WebSocket error:', e);
            }
          }
        }

        // Set up MutationObserver
        const observer = new MutationObserver((mutations) => {
          mutations.forEach(mutation => {
            const target = mutation.target as Element;
            
            // Check if target is monitored
            const isMonitored = monitoredElements.has(target) || 
              Array.from(monitoredElements).some(el => el.contains(target) || target.contains(el));
            
            if (!isMonitored) return;

            const change: any = {
              timestamp: Date.now(),
              type: mutation.type,
              selector: getSelector(target),
              details: {},
            };

            if (mutation.type === 'attributes') {
              change.details.attributeName = mutation.attributeName || undefined;
              change.details.oldValue = mutation.oldValue || undefined;
              change.details.newValue = target.getAttribute(mutation.attributeName!) || undefined;
              
              // Check for style changes if style attribute changed
              if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                const styleChanges = detectStyleChanges(target);
                if (styleChanges) {
                  change.type = 'style';
                  change.details.styleChanges = styleChanges;
                }
              }
            } else if (mutation.type === 'childList') {
              change.details.addedNodes = Array.from(mutation.addedNodes)
                .filter(node => node.nodeType === Node.ELEMENT_NODE)
                .map(node => getSelector(node as Element));
              change.details.removedNodes = Array.from(mutation.removedNodes)
                .filter(node => node.nodeType === Node.ELEMENT_NODE)
                .map(node => getSelector(node as Element));
            } else if (mutation.type === 'characterData') {
              change.details.oldValue = mutation.oldValue || undefined;
              change.details.newValue = mutation.target.textContent || undefined;
            }

            sendChange(change);
          });
        });

        // Start observing
        monitoredElements.forEach(element => {
          observer.observe(element, {
            attributes: true,
            attributeOldValue: true,
            childList: true,
            characterData: true,
            characterDataOldValue: true,
            subtree: true,
          });
        });

        // Also observe document.body for global changes
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['style', 'class'],
          subtree: false,
        });

        // Store observer for cleanup
        window.__mcpObserver = observer;

        // Set up periodic style checking (for changes not caught by MutationObserver)
        window.__mcpStyleChecker = window.setInterval(() => {
          monitoredElements.forEach(element => {
            const styleChanges = detectStyleChanges(element);
            if (styleChanges) {
              sendChange({
                timestamp: Date.now(),
                type: 'style',
                selector: getSelector(element),
                details: { styleChanges },
              });
              // Update stored styles
              originalStyles.set(element, window.getComputedStyle(element));
            }
          });
        }, 1000);

      }, { targetSelectors: selectors, wsPort: session.wsPort });

      // Wait for monitoring duration
      await new Promise(resolve => setTimeout(resolve, duration * 1000));

      // Collect changes
      const changes = await page.evaluate(() => {
        return window.__mcpDomChanges || [];
      });

      session.changes = changes;
      session.endTime = Date.now();

      // Cleanup
      await page.evaluate(() => {
        if (window.__mcpObserver) {
          window.__mcpObserver.disconnect();
          delete window.__mcpObserver;
        }
        if (window.__mcpStyleChecker) {
          window.clearInterval(window.__mcpStyleChecker);
          delete window.__mcpStyleChecker;
        }
        delete window.__mcpDomChanges;
      });

      return session;
    } finally {
      // Close WebSocket server
      if (wss) {
        wsClients.forEach(ws => ws.close());
        wss.close();
      }
      await browserManager.releasePage(url);
    }
  },
};