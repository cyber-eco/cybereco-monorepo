import { Translator } from '../translator';
import { I18nConfig } from '../types';

describe('Translator', () => {
  let translator: Translator;
  const config: I18nConfig = {
    defaultLanguage: 'en',
    fallbackLanguage: 'en',
    supportedLanguages: ['en', 'es'],
    namespaces: ['common', 'auth'],
  };

  beforeEach(() => {
    translator = new Translator(config);
    
    // Load test translations
    translator.loadTranslations('en', 'common', {
      greeting: 'Hello',
      welcome: 'Welcome, {{name}}!',
      items: '{{count}} item|{{count}} items',
      nested: {
        key: 'Nested value',
      },
    });

    translator.loadTranslations('es', 'common', {
      greeting: 'Hola',
      welcome: '¡Bienvenido, {{name}}!',
      items: '{{count}} artículo|{{count}} artículos',
      nested: {
        key: 'Valor anidado',
      },
    });

    translator.loadTranslations('en', 'auth', {
      signIn: 'Sign In',
      signOut: 'Sign Out',
    });
  });

  describe('basic translation', () => {
    it('should translate simple keys', () => {
      expect(translator.t('common:greeting')).toBe('Hello');
      
      translator.setLanguage('es');
      expect(translator.t('common:greeting')).toBe('Hola');
    });

    it('should handle nested keys', () => {
      expect(translator.t('common:nested.key')).toBe('Nested value');
      
      translator.setLanguage('es');
      expect(translator.t('common:nested.key')).toBe('Valor anidado');
    });

    it('should fall back to key if translation not found', () => {
      expect(translator.t('common:nonexistent')).toBe('common:nonexistent');
    });

    it('should use default value if provided', () => {
      expect(translator.t('common:nonexistent', { defaultValue: 'Default' })).toBe('Default');
    });
  });

  describe('interpolation', () => {
    it('should interpolate variables', () => {
      expect(translator.t('common:welcome', { params: { name: 'John' } })).toBe('Welcome, John!');
      
      translator.setLanguage('es');
      expect(translator.t('common:welcome', { params: { name: 'Juan' } })).toBe('¡Bienvenido, Juan!');
    });

    it('should handle missing interpolation variables', () => {
      expect(translator.t('common:welcome', { params: {} })).toBe('Welcome, !');
    });
  });

  describe('pluralization', () => {
    it('should handle plural forms', () => {
      expect(translator.t('common:items', { count: 1 })).toBe('1 item');
      expect(translator.t('common:items', { count: 5 })).toBe('5 items');
      
      translator.setLanguage('es');
      expect(translator.t('common:items', { count: 1 })).toBe('1 artículo');
      expect(translator.t('common:items', { count: 5 })).toBe('5 artículos');
    });
  });

  describe('fallback language', () => {
    it('should fall back to fallback language if translation missing', () => {
      translator.setLanguage('es');
      // auth namespace not loaded for Spanish
      expect(translator.t('auth:signIn')).toBe('Sign In');
    });
  });

  describe('namespace handling', () => {
    it('should default to common namespace if not specified', () => {
      translator.loadTranslations('en', 'common', { test: 'Test value' });
      expect(translator.t('test')).toBe('Test value');
    });
  });

  describe('formatting', () => {
    it('should format dates', () => {
      const date = new Date('2024-01-15T10:30:00');
      const formatted = translator.formatDate(date);
      expect(formatted).toMatch(/Jan/);
    });

    it('should format times', () => {
      const date = new Date('2024-01-15T10:30:00');
      const formatted = translator.formatTime(date);
      expect(formatted).toMatch(/10:30/);
    });

    it('should format numbers', () => {
      expect(translator.formatNumber(1234.56)).toBe('1,234.56');
      
      translator.setLanguage('es');
      expect(translator.formatNumber(1234.56)).toMatch(/1.234,56|1,234.56/); // Depends on locale
    });

    it('should format currency', () => {
      const formatted = translator.formatCurrency(99.99, 'USD');
      expect(formatted).toMatch(/\$99.99|US\$99.99/);
    });
  });

  describe('utility methods', () => {
    it('should check if translation exists', () => {
      expect(translator.exists('common:greeting')).toBe(true);
      expect(translator.exists('common:nonexistent')).toBe(false);
    });

    it('should get loaded languages', () => {
      expect(translator.getLoadedLanguages()).toEqual(['en', 'es']);
    });

    it('should get namespaces for a language', () => {
      expect(translator.getNamespaces('en')).toEqual(['common', 'auth']);
      expect(translator.getNamespaces('es')).toEqual(['common']);
    });
  });
});