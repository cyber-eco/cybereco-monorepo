import { PluralizationRule } from './types';

// Pluralization rules for different languages
export const pluralizationRules: Record<string, PluralizationRule> = {
  // English: 1 = singular, other = plural
  en: (count: number) => {
    return count === 1 ? 0 : 1;
  },
  
  // Spanish: 1 = singular, other = plural
  es: (count: number) => {
    return count === 1 ? 0 : 1;
  },
  
  // French: 0,1 = singular, other = plural
  fr: (count: number) => {
    return count === 0 || count === 1 ? 0 : 1;
  },
  
  // Russian: more complex rules
  ru: (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    
    if (mod10 === 1 && mod100 !== 11) {
      return 0; // singular
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return 1; // few
    } else {
      return 2; // many
    }
  },
  
  // Japanese: no pluralization
  ja: () => 0,
  
  // Chinese: no pluralization
  zh: () => 0,
};

export function getPluralForm(
  count: number,
  locale: string,
  forms: string[]
): string {
  const rule = pluralizationRules[locale] || pluralizationRules['en'];
  const index = rule(count, locale);
  return forms[index] || forms[forms.length - 1];
}

// Helper to parse plural forms from translation strings
// Format: "singular|plural" or "zero|one|few|many"
export function parsePluralForms(value: string): string[] {
  return value.split('|').map(form => form.trim());
}

// Format translation with count
export function formatWithCount(
  translation: string,
  count: number,
  locale: string
): string {
  if (translation.includes('|')) {
    const forms = parsePluralForms(translation);
    return getPluralForm(count, locale, forms);
  }
  return translation;
}