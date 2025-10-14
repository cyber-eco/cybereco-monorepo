import { Page } from '@playwright/test';
import { BrowserManager } from '../browser/manager.js';
import { Tool } from '../types.js';

interface ScrollableElement {
  selector: string;
  tagName: string;
  overflow: {
    x: string;
    y: string;
  };
  scrollDimensions: {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
    hasHorizontalScroll: boolean;
    hasVerticalScroll: boolean;
  };
  computedStyles: {
    position: string;
    display: string;
    overflow: string;
    overflowX: string;
    overflowY: string;
    height: string;
    maxHeight: string;
    minHeight: string;
  };
  parents: Array<{
    selector: string;
    overflow: string;
    position: string;
  }>;
  issues: string[];
}

interface ScrollingAnalysis {
  scrollableElements: ScrollableElement[];
  nestedScrollContainers: Array<{
    parent: string;
    child: string;
    issue: string;
  }>;
  stickyElements: Array<{
    selector: string;
    issues: string[];
  }>;
  recommendations: string[];
  doubleScrollbarDetected: boolean;
}

export const debugCssScrollingTool: Tool = {
  name: 'debug-css-scrolling',
  description: 'Analyze scrolling behavior and detect double scrollbars',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to analyze',
      },
      selectors: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific elements to check (optional)',
      },
    },
    required: ['url'],
  },
  async execute(browserManager: BrowserManager, args: any): Promise<ScrollingAnalysis> {
    const { url, selectors = [] } = args;
    const page = await browserManager.getPage(url);

    try {
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Give CSS time to apply

      // Inject analysis script
      const analysis = await page.evaluate((targetSelectors) => {
        const scrollableElements: ScrollableElement[] = [];
        const processedElements = new Set<Element>();

        // Helper to get a unique selector for an element
        function getSelector(element: Element): string {
          if (element.id) {
            return `#${element.id}`;
          }
          if (element.className && typeof element.className === 'string') {
            const classes = element.className.split(' ').filter(c => c);
            if (classes.length > 0) {
              return `.${classes[0]}`;
            }
          }
          return element.tagName.toLowerCase();
        }

        // Check if element has scrollbars
        function hasScrollbars(element: Element): { horizontal: boolean; vertical: boolean } {
          const computed = window.getComputedStyle(element);
          const overflowX = computed.overflowX;
          const overflowY = computed.overflowY;
          
          const htmlElement = element as HTMLElement;
          
          return {
            horizontal: (overflowX === 'auto' || overflowX === 'scroll') && 
                       htmlElement.scrollWidth > htmlElement.clientWidth,
            vertical: (overflowY === 'auto' || overflowY === 'scroll') && 
                     htmlElement.scrollHeight > htmlElement.clientHeight,
          };
        }

        // Get parent chain with overflow info
        function getParentChain(element: Element): Array<{ selector: string; overflow: string; position: string }> {
          const chain = [];
          let current = element.parentElement;
          
          while (current && current !== document.body) {
            const computed = window.getComputedStyle(current);
            chain.push({
              selector: getSelector(current),
              overflow: computed.overflow,
              position: computed.position,
            });
            current = current.parentElement;
          }
          
          return chain;
        }

        // Analyze element for scrolling issues
        function analyzeElement(element: Element): ScrollableElement | null {
          if (processedElements.has(element)) return null;
          processedElements.add(element);

          const htmlElement = element as HTMLElement;
          const computed = window.getComputedStyle(element);
          const scrollbars = hasScrollbars(element);
          
          if (!scrollbars.horizontal && !scrollbars.vertical && 
              computed.overflow !== 'hidden' && 
              computed.overflowX !== 'hidden' && 
              computed.overflowY !== 'hidden') {
            return null;
          }

          const issues: string[] = [];
          
          // Check for common issues
          if (computed.position === 'sticky') {
            const parent = element.parentElement;
            if (parent) {
              const parentComputed = window.getComputedStyle(parent);
              if (parentComputed.overflow !== 'visible') {
                issues.push('Sticky element inside overflow container - sticky will not work');
              }
            }
          }

          if (computed.height === 'auto' && computed.maxHeight !== 'none') {
            issues.push('Using max-height with overflow can cause unexpected scrollbars');
          }

          return {
            selector: getSelector(element),
            tagName: element.tagName.toLowerCase(),
            overflow: {
              x: computed.overflowX,
              y: computed.overflowY,
            },
            scrollDimensions: {
              scrollWidth: htmlElement.scrollWidth,
              scrollHeight: htmlElement.scrollHeight,
              clientWidth: htmlElement.clientWidth,
              clientHeight: htmlElement.clientHeight,
              hasHorizontalScroll: scrollbars.horizontal,
              hasVerticalScroll: scrollbars.vertical,
            },
            computedStyles: {
              position: computed.position,
              display: computed.display,
              overflow: computed.overflow,
              overflowX: computed.overflowX,
              overflowY: computed.overflowY,
              height: computed.height,
              maxHeight: computed.maxHeight,
              minHeight: computed.minHeight,
            },
            parents: getParentChain(element),
            issues,
          };
        }

        // Find all scrollable elements
        if (targetSelectors.length > 0) {
          // Check specific selectors
          targetSelectors.forEach((selector: string) => {
            try {
              const elements = document.querySelectorAll(selector);
              elements.forEach(el => {
                const analysis = analyzeElement(el);
                if (analysis) scrollableElements.push(analysis);
              });
            } catch (e) {
              console.error(`Invalid selector: ${selector}`);
            }
          });
        } else {
          // Check all elements
          const allElements = document.querySelectorAll('*');
          allElements.forEach(el => {
            const analysis = analyzeElement(el);
            if (analysis) scrollableElements.push(analysis);
          });
        }

        // Also check html and body
        const htmlAnalysis = analyzeElement(document.documentElement);
        if (htmlAnalysis) scrollableElements.push(htmlAnalysis);
        
        const bodyAnalysis = analyzeElement(document.body);
        if (bodyAnalysis) scrollableElements.push(bodyAnalysis);

        return scrollableElements;
      }, selectors);

      // Analyze for nested scroll containers
      const nestedScrollContainers: Array<{ parent: string; child: string; issue: string }> = [];
      const stickyElements: Array<{ selector: string; issues: string[] }> = [];
      
      // Check for nested scrollable elements
      for (const element of analysis) {
        if (element.scrollDimensions.hasVerticalScroll || element.scrollDimensions.hasHorizontalScroll) {
          // Check if any parent also has scrollbars
          for (const parent of element.parents) {
            const parentElement = analysis.find(e => e.selector === parent.selector);
            if (parentElement && (parentElement.scrollDimensions.hasVerticalScroll || parentElement.scrollDimensions.hasHorizontalScroll)) {
              nestedScrollContainers.push({
                parent: parent.selector,
                child: element.selector,
                issue: 'Nested scrollable containers can cause double scrollbars',
              });
            }
          }
        }

        // Check for sticky positioning issues
        if (element.computedStyles.position === 'sticky') {
          const issues: string[] = [];
          for (const parent of element.parents) {
            if (parent.overflow !== 'visible') {
              issues.push(`Parent ${parent.selector} has overflow:${parent.overflow} which breaks sticky positioning`);
            }
          }
          if (issues.length > 0) {
            stickyElements.push({ selector: element.selector, issues });
          }
        }
      }

      // Generate recommendations
      const recommendations: string[] = [];
      let doubleScrollbarDetected = false;

      // Check for body/html overflow issues
      const htmlElement = analysis.find(e => e.tagName === 'html');
      const bodyElement = analysis.find(e => e.tagName === 'body');
      
      if (htmlElement && bodyElement) {
        if (htmlElement.scrollDimensions.hasVerticalScroll && bodyElement.scrollDimensions.hasVerticalScroll) {
          doubleScrollbarDetected = true;
          recommendations.push('Both <html> and <body> have scrollbars. Remove overflow properties from html element.');
        }
      }

      if (nestedScrollContainers.length > 0) {
        doubleScrollbarDetected = true;
        recommendations.push('Remove internal scrolling from nested containers to prevent double scrollbars.');
        nestedScrollContainers.forEach(({ parent, child }) => {
          recommendations.push(`- Remove overflow from ${child} or ${parent}`);
        });
      }

      if (stickyElements.length > 0) {
        recommendations.push('Fix sticky positioning by removing overflow from parent elements:');
        stickyElements.forEach(({ selector, issues }) => {
          recommendations.push(`- ${selector}: ${issues.join('; ')}`);
        });
      }

      // Specific recommendations for common patterns
      const sidebarElements = analysis.filter(e => 
        e.selector.includes('sidebar') || 
        e.selector.includes('side-bar') || 
        e.selector.includes('toc')
      );
      
      if (sidebarElements.length > 0) {
        sidebarElements.forEach(sidebar => {
          if (sidebar.computedStyles.maxHeight !== 'none' && sidebar.computedStyles.overflow === 'auto') {
            recommendations.push(`${sidebar.selector}: Remove max-height and overflow to let sidebar scroll with page naturally`);
          }
        });
      }

      return {
        scrollableElements: analysis,
        nestedScrollContainers,
        stickyElements,
        recommendations,
        doubleScrollbarDetected,
      };
    } finally {
      await browserManager.releasePage(url);
    }
  },
};