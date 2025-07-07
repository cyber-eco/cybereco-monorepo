import { Page } from '@playwright/test';
import { BrowserManager } from '../browser/manager.js';
import { Tool } from '../types.js';

interface VisualDiffResult {
  screenshot: string; // base64 encoded
  beforeScreenshot?: string; // base64 encoded
  differences: Array<{
    type: 'added' | 'removed' | 'modified';
    selector: string;
    description: string;
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
  metadata: {
    timestamp: number;
    viewport: {
      width: number;
      height: number;
    };
    url: string;
    selector?: string;
  };
  success: boolean;
  annotations: Array<{
    type: 'scrollbar' | 'overflow' | 'sticky' | 'issue';
    selector: string;
    message: string;
    severity: 'info' | 'warning' | 'error';
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
}

export const visualDiffTool: Tool = {
  name: 'visual-diff',
  description: 'Compare before/after screenshots to verify fixes and annotate issues',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to capture',
      },
      selector: {
        type: 'string',
        description: 'Specific element to capture (optional)',
      },
      beforeState: {
        type: 'string',
        description: 'Base64 encoded previous screenshot for comparison',
      },
      fullPage: {
        type: 'boolean',
        description: 'Capture full page screenshot',
        default: true,
      },
      annotateIssues: {
        type: 'boolean',
        description: 'Annotate detected CSS issues on screenshot',
        default: true,
      },
      viewport: {
        type: 'object',
        properties: {
          width: { type: 'number' },
          height: { type: 'number' },
        },
        description: 'Custom viewport size',
      },
    },
    required: ['url'],
  },
  async execute(browserManager: BrowserManager, args: any): Promise<VisualDiffResult> {
    const { 
      url, 
      selector, 
      beforeState, 
      fullPage = true, 
      annotateIssues = true,
      viewport 
    } = args;
    
    const page = await browserManager.getPage(url);

    try {
      // Set viewport if specified
      if (viewport) {
        await page.setViewportSize(viewport);
      }

      // Get current viewport size
      const currentViewport = page.viewportSize()!;

      // Wait for page to stabilize
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Detect issues if annotation is requested
      const annotations: VisualDiffResult['annotations'] = [];
      
      if (annotateIssues) {
        // Detect scrollbar issues
        const scrollbarIssues = await page.evaluate(() => {
          const issues: any[] = [];
          
          // Check for double scrollbars
          const htmlScrollHeight = document.documentElement.scrollHeight;
          const htmlClientHeight = document.documentElement.clientHeight;
          const bodyScrollHeight = document.body.scrollHeight;
          const bodyClientHeight = document.body.clientHeight;
          
          if (htmlScrollHeight > htmlClientHeight && bodyScrollHeight > bodyClientHeight) {
            issues.push({
              type: 'scrollbar',
              selector: 'html, body',
              message: 'Double scrollbar detected on html and body',
              severity: 'error',
              boundingBox: {
                x: window.innerWidth - 20,
                y: 0,
                width: 20,
                height: window.innerHeight,
              },
            });
          }

          // Find all scrollable elements
          const allElements = document.querySelectorAll('*');
          allElements.forEach(element => {
            const el = element as HTMLElement;
            const computed = window.getComputedStyle(el);
            const overflow = computed.overflow;
            const overflowY = computed.overflowY;
            
            if ((overflow === 'auto' || overflow === 'scroll' || 
                 overflowY === 'auto' || overflowY === 'scroll') &&
                el.scrollHeight > el.clientHeight) {
              
              const rect = el.getBoundingClientRect();
              const selector = el.id ? `#${el.id}` : 
                              el.className ? `.${el.className.split(' ')[0]}` : 
                              el.tagName.toLowerCase();
              
              issues.push({
                type: 'overflow',
                selector,
                message: `Scrollable container detected: ${selector}`,
                severity: 'info',
                boundingBox: {
                  x: rect.left,
                  y: rect.top,
                  width: rect.width,
                  height: rect.height,
                },
              });
            }

            // Check for sticky positioning issues
            if (computed.position === 'sticky') {
              let parent = el.parentElement;
              let hasOverflowParent = false;
              
              while (parent && parent !== document.body) {
                const parentComputed = window.getComputedStyle(parent);
                if (parentComputed.overflow !== 'visible') {
                  hasOverflowParent = true;
                  break;
                }
                parent = parent.parentElement;
              }
              
              if (hasOverflowParent) {
                const rect = el.getBoundingClientRect();
                const selector = el.id ? `#${el.id}` : 
                                el.className ? `.${el.className.split(' ')[0]}` : 
                                el.tagName.toLowerCase();
                
                issues.push({
                  type: 'sticky',
                  selector,
                  message: `Sticky element inside overflow parent - will not work correctly`,
                  severity: 'warning',
                  boundingBox: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                  },
                });
              }
            }
          });

          return issues;
        });

        annotations.push(...scrollbarIssues);
      }

      // Take screenshot
      let screenshotBuffer: Buffer;
      
      if (selector) {
        await page.waitForSelector(selector);
        const element = await page.$(selector);
        if (!element) {
          throw new Error(`Element not found: ${selector}`);
        }
        screenshotBuffer = await element.screenshot();
      } else if (fullPage) {
        screenshotBuffer = await page.screenshot({ fullPage: true });
      } else {
        screenshotBuffer = await page.screenshot();
      }

      // Annotate screenshot if requested
      if (annotateIssues && annotations.length > 0) {
        // Add visual annotations to the screenshot
        await page.evaluate((annots) => {
          annots.forEach((annotation: any) => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.left = `${annotation.boundingBox.x}px`;
            overlay.style.top = `${annotation.boundingBox.y}px`;
            overlay.style.width = `${annotation.boundingBox.width}px`;
            overlay.style.height = `${annotation.boundingBox.height}px`;
            overlay.style.border = annotation.severity === 'error' ? '3px solid red' :
                                  annotation.severity === 'warning' ? '3px solid orange' :
                                  '3px solid blue';
            overlay.style.backgroundColor = annotation.severity === 'error' ? 'rgba(255,0,0,0.1)' :
                                           annotation.severity === 'warning' ? 'rgba(255,165,0,0.1)' :
                                           'rgba(0,0,255,0.1)';
            overlay.style.pointerEvents = 'none';
            overlay.style.zIndex = '999999';
            
            // Add label
            const label = document.createElement('div');
            label.style.position = 'absolute';
            label.style.top = '-25px';
            label.style.left = '0';
            label.style.backgroundColor = annotation.severity === 'error' ? 'red' :
                                         annotation.severity === 'warning' ? 'orange' :
                                         'blue';
            label.style.color = 'white';
            label.style.padding = '2px 8px';
            label.style.fontSize = '12px';
            label.style.borderRadius = '3px';
            label.style.whiteSpace = 'nowrap';
            label.textContent = annotation.message;
            
            overlay.appendChild(label);
            document.body.appendChild(overlay);
            
            // Store for cleanup
            overlay.classList.add('mcp-annotation');
          });
        }, annotations);

        // Take annotated screenshot
        await page.waitForTimeout(100); // Let annotations render
        
        if (selector) {
          const element = await page.$(selector);
          screenshotBuffer = await element!.screenshot();
        } else if (fullPage) {
          screenshotBuffer = await page.screenshot({ fullPage: true });
        } else {
          screenshotBuffer = await page.screenshot();
        }

        // Clean up annotations
        await page.evaluate(() => {
          document.querySelectorAll('.mcp-annotation').forEach(el => el.remove());
        });
      }

      const screenshot = screenshotBuffer.toString('base64');

      // Compare with before state if provided
      const differences: VisualDiffResult['differences'] = [];
      
      if (beforeState) {
        // In a real implementation, you would use a library like pixelmatch
        // For now, we'll just note that comparison was requested
        differences.push({
          type: 'modified',
          selector: 'body',
          description: 'Visual comparison requested - implement with pixelmatch',
          boundingBox: {
            x: 0,
            y: 0,
            width: currentViewport.width,
            height: currentViewport.height,
          },
        });
      }

      return {
        screenshot,
        beforeScreenshot: beforeState,
        differences,
        metadata: {
          timestamp: Date.now(),
          viewport: currentViewport,
          url,
          selector,
        },
        success: true,
        annotations,
      };
    } catch (error) {
      return {
        screenshot: '',
        differences: [],
        metadata: {
          timestamp: Date.now(),
          viewport: page.viewportSize()!,
          url,
          selector,
        },
        success: false,
        annotations: [{
          type: 'issue',
          selector: 'body',
          message: `Error: ${error instanceof Error ? error.message : String(error)}`,
          severity: 'error',
          boundingBox: { x: 0, y: 0, width: 0, height: 0 },
        }],
      };
    } finally {
      await browserManager.releasePage(url);
    }
  },
};