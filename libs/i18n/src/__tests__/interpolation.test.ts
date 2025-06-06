import {
  interpolate,
  hasInterpolation,
  extractParameters,
  validateParameters,
} from '../interpolation';

describe('Interpolation', () => {
  describe('interpolate', () => {
    it('should replace simple placeholders', () => {
      const text = 'Hello, {{name}}!';
      const params = { name: 'John' };
      
      expect(interpolate(text, params)).toBe('Hello, John!');
    });

    it('should replace multiple placeholders', () => {
      const text = '{{greeting}}, {{name}}! You have {{count}} messages.';
      const params = { greeting: 'Hi', name: 'Jane', count: '5' };
      
      expect(interpolate(text, params)).toBe('Hi, Jane! You have 5 messages.');
    });

    it('should handle spaces in placeholders', () => {
      const text = 'Hello, {{ name }}!';
      const params = { name: 'Alice' };
      
      expect(interpolate(text, params)).toBe('Hello, Alice!');
    });

    it('should convert non-string values to strings', () => {
      const text = 'You have {{count}} items worth {{total}}.';
      const params = { count: 5, total: 99.99 };
      
      expect(interpolate(text, params)).toBe('You have 5 items worth 99.99.');
    });

    it('should remove unmatched placeholders', () => {
      const text = 'Hello, {{name}}! Your email is {{email}}.';
      const params = { name: 'Bob' };
      
      expect(interpolate(text, params)).toBe('Hello, Bob! Your email is .');
    });

    it('should handle empty params', () => {
      const text = 'Hello, {{name}}!';
      
      expect(interpolate(text)).toBe('Hello, !');
      expect(interpolate(text, {})).toBe('Hello, !');
    });

    it('should handle custom interpolation config', () => {
      const text = 'Hello, [[name]]!';
      const params = { name: 'Custom' };
      const config = { prefix: '[[', suffix: ']]' };
      
      expect(interpolate(text, params, config)).toBe('Hello, Custom!');
    });

    it('should escape special regex characters in config', () => {
      const text = 'Hello, ${name}!';
      const params = { name: 'Regex' };
      const config = { prefix: '${', suffix: '}' };
      
      expect(interpolate(text, params, config)).toBe('Hello, Regex!');
    });
  });

  describe('hasInterpolation', () => {
    it('should detect placeholders', () => {
      expect(hasInterpolation('Hello, {{name}}!')).toBe(true);
      expect(hasInterpolation('Hello, world!')).toBe(false);
      expect(hasInterpolation('{{greeting}}, {{name}}!')).toBe(true);
      expect(hasInterpolation('Hello, {{ name }}!')).toBe(true);
    });

    it('should work with custom config', () => {
      const config = { prefix: '[[', suffix: ']]' };
      
      expect(hasInterpolation('Hello, [[name]]!', config)).toBe(true);
      expect(hasInterpolation('Hello, {{name}}!', config)).toBe(false);
    });
  });

  describe('extractParameters', () => {
    it('should extract parameter names', () => {
      const text = 'Hello, {{name}}! You have {{count}} messages.';
      
      expect(extractParameters(text)).toEqual(['name', 'count']);
    });

    it('should handle duplicates', () => {
      const text = '{{name}} sent {{count}} messages to {{name}}.';
      
      expect(extractParameters(text)).toEqual(['name', 'count']);
    });

    it('should handle spaces', () => {
      const text = 'Hello, {{ name }}! You have {{ count }} messages.';
      
      expect(extractParameters(text)).toEqual(['name', 'count']);
    });

    it('should return empty array for no placeholders', () => {
      const text = 'Hello, world!';
      
      expect(extractParameters(text)).toEqual([]);
    });

    it('should work with custom config', () => {
      const text = 'Hello, [[name]]!';
      const config = { prefix: '[[', suffix: ']]' };
      
      expect(extractParameters(text, config)).toEqual(['name']);
    });
  });

  describe('validateParameters', () => {
    it('should validate all parameters are provided', () => {
      const text = 'Hello, {{name}}!';
      const params = { name: 'John' };
      
      const result = validateParameters(text, params);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    it('should detect missing parameters', () => {
      const text = 'Hello, {{name}}! Your email is {{email}}.';
      const params = { name: 'John' };
      
      const result = validateParameters(text, params);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(['email']);
    });

    it('should handle no parameters required', () => {
      const text = 'Hello, world!';
      const params = { extra: 'value' };
      
      const result = validateParameters(text, params);
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });

    it('should handle undefined params', () => {
      const text = 'Hello, {{name}}!';
      
      const result = validateParameters(text);
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(['name']);
    });
  });
});