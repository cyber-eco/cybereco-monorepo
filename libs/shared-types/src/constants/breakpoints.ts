/**
 * Shared breakpoint constants for consistent responsive design across the platform
 */

export const BREAKPOINTS = {
  // Mobile breakpoints
  mobileSmall: 360,
  mobile: 480,
  mobileLarge: 640,
  
  // Tablet breakpoints
  tablet: 768,
  tabletLarge: 900,
  
  // Desktop breakpoints
  desktop: 1024,
  desktopMedium: 1200,
  desktopLarge: 1360,
  desktopXL: 1440,
  ultraWide: 1920,
  
  // Navigation specific breakpoints
  navigationMobile: 820, // When navigation switches to mobile menu
  containerMax: 1200, // Max width for content containers
} as const;

// Type for breakpoint values
export type BreakpointKey = keyof typeof BREAKPOINTS;
export type BreakpointValue = typeof BREAKPOINTS[BreakpointKey];

// Helper functions for media queries
export const mediaQuery = {
  up: (breakpoint: BreakpointKey) => 
    `@media (min-width: ${BREAKPOINTS[breakpoint]}px)`,
  
  down: (breakpoint: BreakpointKey) => 
    `@media (max-width: ${BREAKPOINTS[breakpoint] - 1}px)`,
  
  between: (min: BreakpointKey, max: BreakpointKey) => 
    `@media (min-width: ${BREAKPOINTS[min]}px) and (max-width: ${BREAKPOINTS[max] - 1}px)`,
  
  only: (breakpoint: BreakpointKey) => {
    const keys = Object.keys(BREAKPOINTS) as BreakpointKey[];
    const index = keys.indexOf(breakpoint);
    const next = keys[index + 1];
    
    if (!next) {
      return `@media (min-width: ${BREAKPOINTS[breakpoint]}px)`;
    }
    
    return `@media (min-width: ${BREAKPOINTS[breakpoint]}px) and (max-width: ${BREAKPOINTS[next] - 1}px)`;
  }
};

// CSS custom properties for breakpoints
export const breakpointCssVars = Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => {
  const cssVarName = `--breakpoint-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  return {
    ...acc,
    [cssVarName]: `${value}px`
  };
}, {} as Record<string, string>);