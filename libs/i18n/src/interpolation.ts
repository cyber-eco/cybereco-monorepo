import { TranslationParams } from './types';

export interface InterpolationConfig {
  prefix: string;
  suffix: string;
}

const defaultConfig: InterpolationConfig = {
  prefix: '{{',
  suffix: '}}',
};

// Escape special regex characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Interpolate variables in translation strings
export function interpolate(
  text: string,
  params?: TranslationParams,
  config: InterpolationConfig = defaultConfig
): string {
  if (!params || Object.keys(params).length === 0) {
    return text;
  }

  let result = text;
  const prefix = escapeRegex(config.prefix);
  const suffix = escapeRegex(config.suffix);

  // Replace each parameter in the text
  Object.entries(params).forEach(([key, value]) => {
    const pattern = new RegExp(`${prefix}\\s*${key}\\s*${suffix}`, 'g');
    result = result.replace(pattern, String(value));
  });

  // Remove any remaining unmatched placeholders
  const unmatchedPattern = new RegExp(`${prefix}\\s*\\w+\\s*${suffix}`, 'g');
  result = result.replace(unmatchedPattern, '');

  return result;
}

// Check if a string contains interpolation placeholders
export function hasInterpolation(
  text: string,
  config: InterpolationConfig = defaultConfig
): boolean {
  const prefix = escapeRegex(config.prefix);
  const suffix = escapeRegex(config.suffix);
  const pattern = new RegExp(`${prefix}\\s*\\w+\\s*${suffix}`);
  return pattern.test(text);
}

// Extract parameter names from a translation string
export function extractParameters(
  text: string,
  config: InterpolationConfig = defaultConfig
): string[] {
  const prefix = escapeRegex(config.prefix);
  const suffix = escapeRegex(config.suffix);
  const pattern = new RegExp(`${prefix}\\s*(\\w+)\\s*${suffix}`, 'g');
  const params: string[] = [];
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (!params.includes(match[1])) {
      params.push(match[1]);
    }
  }

  return params;
}

// Validate that all required parameters are provided
export function validateParameters(
  text: string,
  params?: TranslationParams,
  config: InterpolationConfig = defaultConfig
): { valid: boolean; missing: string[] } {
  const required = extractParameters(text, config);
  const provided = Object.keys(params || {});
  const missing = required.filter(param => !provided.includes(param));

  return {
    valid: missing.length === 0,
    missing,
  };
}