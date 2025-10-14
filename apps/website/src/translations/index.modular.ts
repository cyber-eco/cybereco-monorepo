// Modular translations index
// This file combines all modular translation files

import { commonTranslations } from './common';
import { homeTranslations } from './home';
import { portfolioTranslations } from './portfolio';
import { aboutTranslations } from './about';
import { documentationTranslations } from './documentation';

// Helper function to deep merge translation objects
function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = target[key] || {} as any;
        deepMerge(target[key] as any, source[key] as any);
      } else {
        target[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

// Flatten nested translations for the current translation system
function flattenTranslations(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenTranslations(value, newKey));
    } else {
      acc[newKey] = value;
    }
    
    return acc;
  }, {});
}

// Combine all translations by language
const nestedTranslations = {
  en: deepMerge(
    {},
    commonTranslations.en,
    homeTranslations.en,
    portfolioTranslations.en,
    aboutTranslations.en,
    documentationTranslations.en
  ),
  es: deepMerge(
    {},
    commonTranslations.es,
    homeTranslations.es,
    portfolioTranslations.es,
    aboutTranslations.es,
    documentationTranslations.es
  )
};

// Export flattened translations for compatibility
export const translations = {
  en: flattenTranslations(nestedTranslations.en),
  es: flattenTranslations(nestedTranslations.es)
};

// Export nested translations for direct access
export { nestedTranslations };

// Export individual translation modules
export {
  commonTranslations,
  homeTranslations,
  portfolioTranslations,
  aboutTranslations,
  documentationTranslations
};