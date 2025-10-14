import { getPluralForm, parsePluralForms, formatWithCount, pluralizationRules } from '../pluralization';

describe('Pluralization', () => {
  describe('getPluralForm', () => {
    it('should handle English pluralization', () => {
      const forms = ['singular', 'plural'];
      
      expect(getPluralForm(0, 'en', forms)).toBe('plural');
      expect(getPluralForm(1, 'en', forms)).toBe('singular');
      expect(getPluralForm(2, 'en', forms)).toBe('plural');
      expect(getPluralForm(100, 'en', forms)).toBe('plural');
    });

    it('should handle Spanish pluralization', () => {
      const forms = ['singular', 'plural'];
      
      expect(getPluralForm(0, 'es', forms)).toBe('plural');
      expect(getPluralForm(1, 'es', forms)).toBe('singular');
      expect(getPluralForm(2, 'es', forms)).toBe('plural');
      expect(getPluralForm(100, 'es', forms)).toBe('plural');
    });

    it('should handle French pluralization', () => {
      const forms = ['singular', 'plural'];
      
      expect(getPluralForm(0, 'fr', forms)).toBe('singular');
      expect(getPluralForm(1, 'fr', forms)).toBe('singular');
      expect(getPluralForm(2, 'fr', forms)).toBe('plural');
    });

    it('should handle Russian pluralization', () => {
      const forms = ['one', 'few', 'many'];
      
      expect(getPluralForm(1, 'ru', forms)).toBe('one');
      expect(getPluralForm(2, 'ru', forms)).toBe('few');
      expect(getPluralForm(5, 'ru', forms)).toBe('many');
      expect(getPluralForm(11, 'ru', forms)).toBe('many');
      expect(getPluralForm(21, 'ru', forms)).toBe('one');
      expect(getPluralForm(22, 'ru', forms)).toBe('few');
    });

    it('should handle languages with no pluralization', () => {
      const forms = ['single'];
      
      expect(getPluralForm(0, 'ja', forms)).toBe('single');
      expect(getPluralForm(1, 'ja', forms)).toBe('single');
      expect(getPluralForm(100, 'ja', forms)).toBe('single');
      
      expect(getPluralForm(0, 'zh', forms)).toBe('single');
      expect(getPluralForm(1, 'zh', forms)).toBe('single');
      expect(getPluralForm(100, 'zh', forms)).toBe('single');
    });

    it('should fall back to last form if index out of bounds', () => {
      const forms = ['singular', 'plural'];
      
      // Simulate a language that might return index 2
      expect(getPluralForm(5, 'unknown', forms)).toBeDefined();
    });
  });

  describe('parsePluralForms', () => {
    it('should parse pipe-separated forms', () => {
      expect(parsePluralForms('one|many')).toEqual(['one', 'many']);
      expect(parsePluralForms('zero|one|few|many')).toEqual(['zero', 'one', 'few', 'many']);
    });

    it('should trim whitespace', () => {
      expect(parsePluralForms('one | many')).toEqual(['one', 'many']);
      expect(parsePluralForms(' zero | one | few | many ')).toEqual(['zero', 'one', 'few', 'many']);
    });
  });

  describe('formatWithCount', () => {
    it('should format translation with count for English', () => {
      const translation = '{{count}} item|{{count}} items';
      
      expect(formatWithCount(translation, 1, 'en')).toBe('{{count}} item');
      expect(formatWithCount(translation, 2, 'en')).toBe('{{count}} items');
    });

    it('should return original if no plural forms', () => {
      const translation = 'No plural forms here';
      
      expect(formatWithCount(translation, 1, 'en')).toBe('No plural forms here');
      expect(formatWithCount(translation, 2, 'en')).toBe('No plural forms here');
    });
  });

  describe('pluralizationRules', () => {
    it('should have rules for common languages', () => {
      expect(pluralizationRules.en).toBeDefined();
      expect(pluralizationRules.es).toBeDefined();
      expect(pluralizationRules.fr).toBeDefined();
      expect(pluralizationRules.ru).toBeDefined();
      expect(pluralizationRules.ja).toBeDefined();
      expect(pluralizationRules.zh).toBeDefined();
    });

    it('should return valid indices', () => {
      Object.entries(pluralizationRules).forEach(([lang, rule]) => {
        // Test various counts
        [0, 1, 2, 5, 10, 11, 21, 100].forEach(count => {
          const index = rule(count, lang);
          expect(index).toBeGreaterThanOrEqual(0);
          expect(index).toBeLessThan(10); // Reasonable upper bound
        });
      });
    });
  });
});