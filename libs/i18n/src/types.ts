export type Language = 'en' | 'es';

export interface TranslationNamespace {
  [key: string]: string | TranslationNamespace;
}

export interface Translations {
  [language: string]: {
    [namespace: string]: TranslationNamespace;
  };
}

export interface I18nConfig {
  defaultLanguage: Language;
  fallbackLanguage: Language;
  supportedLanguages: Language[];
  namespaces: string[];
  loadPath?: string;
  interpolation?: {
    prefix?: string;
    suffix?: string;
  };
}

export interface PluralizationRule {
  (count: number, locale: string): number;
}

export interface DateTimeFormatOptions {
  locale?: string;
  format?: 'short' | 'medium' | 'long' | 'full';
  timeZone?: string;
}

export interface NumberFormatOptions {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface TranslationParams {
  [key: string]: string | number | boolean | Date;
}

export interface TranslationOptions {
  count?: number;
  context?: string;
  defaultValue?: string;
  params?: TranslationParams;
}

export interface I18nContext {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: TranslationOptions) => string;
  formatDate: (date: Date, options?: DateTimeFormatOptions) => string;
  formatTime: (date: Date, options?: DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  isLoading: boolean;
  error?: Error;
}