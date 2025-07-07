import { Page } from '@playwright/test';
import { BrowserManager } from '../browser/manager.js';
import { Tool } from '../types.js';

interface CSSRule {
  selector: string;
  properties: Record<string, string>;
  specificity: {
    inline: number;
    id: number;
    class: number;
    type: number;
    total: string;
  };
  source: {
    type: 'stylesheet' | 'inline' | 'user-agent';
    url?: string;
    line?: number;
  };
  isActive: boolean;
  overriddenBy?: string;
}

interface InheritedProperty {
  property: string;
  value: string;
  source: string;
}

interface CSSCascadeAnalysis {
  element: {
    selector: string;
    tagName: string;
    id?: string;
    classes: string[];
  };
  computedStyles: Record<string, string>;
  appliedRules: CSSRule[];
  overriddenRules: CSSRule[];
  inheritedProperties: InheritedProperty[];
  cssVariables: Record<string, string>;
  pseudoStates: {
    hover?: Record<string, string>;
    focus?: Record<string, string>;
    active?: Record<string, string>;
  };
}

// Helper function to calculate CSS specificity
function calculateSpecificity(selector: string): CSSRule['specificity'] {
  let inline = 0;
  let id = 0;
  let classCount = 0;
  let type = 0;

  // Remove pseudo-elements
  selector = selector.replace(/::?[\w-]+(\([^)]*\))?/g, '');

  // Count IDs
  const idMatches = selector.match(/#[\w-]+/g);
  if (idMatches) id = idMatches.length;

  // Count classes, attributes, and pseudo-classes
  const classMatches = selector.match(/\.[\w-]+/g);
  if (classMatches) classCount += classMatches.length;
  
  const attrMatches = selector.match(/\[[^\]]+\]/g);
  if (attrMatches) classCount += attrMatches.length;
  
  const pseudoMatches = selector.match(/:[\w-]+(\([^)]*\))?/g);
  if (pseudoMatches) classCount += pseudoMatches.length;

  // Count type selectors
  const typeMatches = selector.match(/^[a-zA-Z]+|[\s+>~][a-zA-Z]+/g);
  if (typeMatches) type = typeMatches.length;

  return {
    inline,
    id,
    class: classCount,
    type,
    total: `${inline}${id}${classCount}${type}`,
  };
}

export const inspectCssCascadeTool: Tool = {
  name: 'inspect-css-cascade',
  description: 'Trace CSS rules and computed styles for any element',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to analyze',
      },
      selector: {
        type: 'string',
        description: 'CSS selector for the element to inspect',
      },
      properties: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific CSS properties to trace (optional)',
      },
      includePseudoStates: {
        type: 'boolean',
        description: 'Include :hover, :focus, :active states',
        default: false,
      },
    },
    required: ['url', 'selector'],
  },
  async execute(browserManager: BrowserManager, args: any): Promise<CSSCascadeAnalysis> {
    const { url, selector, properties = [], includePseudoStates = false } = args;
    const page = await browserManager.getPage(url);

    try {
      // Wait for element
      await page.waitForSelector(selector, { timeout: 5000 });

      // Get CDP session for advanced CSS inspection
      const client = await page.context().newCDPSession(page);
      await client.send('DOM.enable');
      await client.send('CSS.enable');

      // Get element handle and node info
      const elementHandle = await page.$(selector);
      if (!elementHandle) {
        throw new Error(`Element not found: ${selector}`);
      }

      // Get basic element info
      const elementInfo = await page.evaluate((sel: string) => {
        const element = document.querySelector(sel);
        if (!element) return null;
        
        return {
          selector: sel,
          tagName: element.tagName.toLowerCase(),
          id: element.id || undefined,
          classes: Array.from(element.classList) as string[],
        };
      }, selector);

      // Get computed styles
      const computedStyles = await page.evaluate(({ sel, props }: { sel: string; props: string[] }) => {
        const element = document.querySelector(sel);
        if (!element) return {};
        
        const computed = window.getComputedStyle(element);
        const styles: Record<string, string> = {};
        
        if (props.length > 0) {
          // Only get specified properties
          props.forEach((prop: string) => {
            styles[prop] = computed.getPropertyValue(prop);
          });
        } else {
          // Get all properties
          for (let i = 0; i < computed.length; i++) {
            const prop = computed[i];
            styles[prop] = computed.getPropertyValue(prop);
          }
        }
        
        return styles;
      }, { sel: selector, props: properties });

      // Get matched CSS rules using CDP
      const root = await client.send('DOM.getDocument');
      const { nodeId } = await client.send('DOM.querySelector', {
        nodeId: root.root.nodeId,
        selector,
      });

      const matchedStyles = await client.send('CSS.getMatchedStylesForNode', {
        nodeId,
      });

      // Process matched rules
      const appliedRules: CSSRule[] = [];
      const overriddenRules: CSSRule[] = [];
      
      if (matchedStyles.matchedCSSRules) {
        for (const match of matchedStyles.matchedCSSRules) {
          const rule = match.rule;
          const properties: Record<string, string> = {};
          
          if (rule.style && rule.style.cssProperties) {
            for (const prop of rule.style.cssProperties) {
              if (prop.name && prop.value) {
                properties[prop.name] = prop.value;
              }
            }
          }

          // Calculate specificity
          const specificity = calculateSpecificity(rule.selectorList?.selectors?.[0]?.text || '');
          
          const cssRule: CSSRule = {
            selector: rule.selectorList?.text || '',
            properties,
            specificity,
            source: {
              type: rule.origin === 'user-agent' ? 'user-agent' : 'stylesheet',
              url: undefined, // CSS.getMatchedStylesForNode doesn't provide direct URL mapping
            },
            isActive: true, // Will be determined by checking if properties are actually applied
            overriddenBy: undefined,
          };

          appliedRules.push(cssRule);
        }
      }

      // Get inherited properties
      const inheritedProperties = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (!element) return [];
        
        const inherited: InheritedProperty[] = [];
        const inheritableProps = [
          'color', 'font-family', 'font-size', 'font-weight', 'line-height',
          'text-align', 'text-indent', 'text-transform', 'letter-spacing',
          'word-spacing', 'white-space', 'direction', 'visibility', 'cursor',
        ];
        
        let current = element.parentElement;
        while (current) {
          const computed = window.getComputedStyle(current);
          const selector = current.id ? `#${current.id}` : current.tagName.toLowerCase();
          
          inheritableProps.forEach(prop => {
            const value = computed.getPropertyValue(prop);
            const elementValue = window.getComputedStyle(element).getPropertyValue(prop);
            
            if (value === elementValue && !inherited.find(i => i.property === prop)) {
              inherited.push({
                property: prop,
                value,
                source: selector,
              });
            }
          });
          
          current = current.parentElement;
        }
        
        return inherited;
      }, selector);

      // Get CSS variables
      const cssVariables = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (!element) return {};
        
        const computed = window.getComputedStyle(element);
        const variables: Record<string, string> = {};
        
        // Get all CSS properties
        for (let i = 0; i < computed.length; i++) {
          const prop = computed[i];
          if (prop.startsWith('--')) {
            variables[prop] = computed.getPropertyValue(prop);
          }
        }
        
        return variables;
      }, selector);

      // Get pseudo states if requested
      let pseudoStates = {};
      if (includePseudoStates) {
        pseudoStates = await page.evaluate((sel) => {
          const element = document.querySelector(sel);
          if (!element) return {};
          
          const states: any = {};
          
          // Force hover state
          element.classList.add('mcp-force-hover');
          const hoverStyles = window.getComputedStyle(element);
          states.hover = {
            background: hoverStyles.backgroundColor,
            color: hoverStyles.color,
            transform: hoverStyles.transform,
            boxShadow: hoverStyles.boxShadow,
          };
          element.classList.remove('mcp-force-hover');
          
          return states;
        }, selector);
      }

      await client.send('CSS.disable');
      await client.send('DOM.disable');

      return {
        element: elementInfo!,
        computedStyles: computedStyles as Record<string, string>,
        appliedRules,
        overriddenRules,
        inheritedProperties,
        cssVariables,
        pseudoStates,
      };
    } finally {
      await browserManager.releasePage(url);
    }
  },
};