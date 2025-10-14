import {
  Language,
  Translations,
  TranslationOptions,
  TranslationNamespace,
  I18nConfig,
  DateTimeFormatOptions,
  NumberFormatOptions,
} from './types';
import { interpolate, InterpolationConfig } from './interpolation';
import { formatWithCount } from './pluralization';
import {
  formatDate as formatDateUtil,
  formatTime as formatTimeUtil,
  formatNumber as formatNumberUtil,
  formatCurrency as formatCurrencyUtil,
  formatRelativeTime,
  formatList,
} from './formatting';

export class Translator {
  private translations: Translations = {};
  private currentLanguage: Language;
  private fallbackLanguage: Language;
  private interpolationConfig: InterpolationConfig;

  constructor(config: I18nConfig) {
    this.currentLanguage = config.defaultLanguage;
    this.fallbackLanguage = config.fallbackLanguage;
    this.interpolationConfig = {
      prefix: config.interpolation?.prefix || '{{',
      suffix: config.interpolation?.suffix || '}}',
    };
  }

  // Load translations for a language and namespace
  loadTranslations(
    language: Language,
    namespace: string,
    translations: TranslationNamespace
  ): void {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }
    this.translations[language][namespace] = translations;
  }

  // Load multiple translations at once
  loadBulkTranslations(translations: Translations): void {
    Object.entries(translations).forEach(([language, namespaces]) => {
      Object.entries(namespaces).forEach(([namespace, trans]) => {
        this.loadTranslations(language as Language, namespace, trans);
      });
    });
  }

  // Set current language
  setLanguage(language: Language): void {
    this.currentLanguage = language;
  }

  // Get current language
  getLanguage(): Language {
    return this.currentLanguage;
  }

  // Get translation value from nested object
  private getNestedValue(
    obj: TranslationNamespace,
    path: string
  ): string | undefined {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return typeof current === 'string' ? current : undefined;
  }

  // Main translation function
  t(key: string, options?: TranslationOptions): string {
    const [namespace, ...keyParts] = key.split(':');
    const actualKey = keyParts.length > 0 ? keyParts.join(':') : namespace;
    const actualNamespace = keyParts.length > 0 ? namespace : 'common';

    // Try current language
    let translation = this.getTranslation(
      this.currentLanguage,
      actualNamespace,
      actualKey
    );

    // Fall back to fallback language if not found
    if (!translation && this.currentLanguage !== this.fallbackLanguage) {
      translation = this.getTranslation(
        this.fallbackLanguage,
        actualNamespace,
        actualKey
      );
    }

    // Use default value or key if still not found
    if (!translation) {
      translation = options?.defaultValue || key;
    }

    // Handle pluralization
    if (options?.count !== undefined) {
      translation = formatWithCount(
        translation,
        options.count,
        this.currentLanguage
      );
    }

    // Handle context (e.g., gender)
    if (options?.context) {
      const contextKey = `${actualKey}_${options.context}`;
      const contextTranslation = this.getTranslation(
        this.currentLanguage,
        actualNamespace,
        contextKey
      );
      if (contextTranslation) {
        translation = contextTranslation;
      }
    }

    // Interpolate parameters
    if (options?.params) {
      translation = interpolate(
        translation,
        options.params,
        this.interpolationConfig
      );
    }

    return translation;
  }

  // Get translation from loaded translations
  private getTranslation(
    language: Language,
    namespace: string,
    key: string
  ): string | undefined {
    const langTranslations = this.translations[language];
    if (!langTranslations) return undefined;

    const namespaceTranslations = langTranslations[namespace];
    if (!namespaceTranslations) return undefined;

    return this.getNestedValue(namespaceTranslations, key);
  }

  // Date formatting
  formatDate(date: Date, options?: DateTimeFormatOptions): string {
    return formatDateUtil(
      date,
      options?.locale || this.currentLanguage,
      options
    );
  }

  // Time formatting
  formatTime(date: Date, options?: DateTimeFormatOptions): string {
    return formatTimeUtil(
      date,
      options?.locale || this.currentLanguage,
      options
    );
  }

  // Number formatting
  formatNumber(number: number, options?: NumberFormatOptions): string {
    return formatNumberUtil(
      number,
      options?.locale || this.currentLanguage,
      options
    );
  }

  // Currency formatting
  formatCurrency(amount: number, currency?: string): string {
    return formatCurrencyUtil(
      amount,
      this.currentLanguage,
      currency || 'USD'
    );
  }

  // Relative time formatting
  formatRelativeTime(date: Date, baseDate?: Date): string {
    return formatRelativeTime(date, this.currentLanguage, baseDate);
  }

  // List formatting
  formatList(items: string[], type?: 'conjunction' | 'disjunction'): string {
    return formatList(items, this.currentLanguage, type);
  }

  // Check if a translation exists
  exists(key: string): boolean {
    const [namespace, ...keyParts] = key.split(':');
    const actualKey = keyParts.length > 0 ? keyParts.join(':') : namespace;
    const actualNamespace = keyParts.length > 0 ? namespace : 'common';

    return (
      this.getTranslation(this.currentLanguage, actualNamespace, actualKey) !==
      undefined
    );
  }

  // Get all loaded languages
  getLoadedLanguages(): string[] {
    return Object.keys(this.translations);
  }

  // Get all namespaces for a language
  getNamespaces(language: Language): string[] {
    return Object.keys(this.translations[language] || {});
  }
}