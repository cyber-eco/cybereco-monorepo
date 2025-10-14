import * as fs from 'fs';
import * as path from 'path';
import { TranslationNamespace } from './types';

interface ValidationError {
  language: string;
  namespace: string;
  key: string;
  error: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

// Validate translation files
export function validateTranslations(
  localesDir: string,
  languages: string[],
  namespaces: string[]
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];
  const translations: Record<string, Record<string, TranslationNamespace>> = {};

  // Load all translation files
  for (const language of languages) {
    translations[language] = {};
    
    for (const namespace of namespaces) {
      const filePath = path.join(localesDir, language, `${namespace}.json`);
      
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        translations[language][namespace] = JSON.parse(content);
      } catch (error) {
        errors.push({
          language,
          namespace,
          key: '',
          error: `Failed to load translation file: ${filePath}`,
        });
      }
    }
  }

  // Check for missing keys across languages
  for (const namespace of namespaces) {
    const allKeys = new Set<string>();
    const keysByLanguage: Record<string, Set<string>> = {};

    // Collect all keys from all languages
    for (const language of languages) {
      keysByLanguage[language] = new Set();
      
      if (translations[language]?.[namespace]) {
        const keys = extractKeys(translations[language][namespace]);
        keys.forEach(key => {
          allKeys.add(key);
          keysByLanguage[language].add(key);
        });
      }
    }

    // Check for missing keys
    for (const key of allKeys) {
      for (const language of languages) {
        if (!keysByLanguage[language]?.has(key)) {
          errors.push({
            language,
            namespace,
            key,
            error: 'Missing translation key',
          });
        }
      }
    }
  }

  // Check for invalid interpolation syntax
  for (const language of languages) {
    for (const namespace of namespaces) {
      if (translations[language]?.[namespace]) {
        validateInterpolation(
          translations[language][namespace],
          language,
          namespace,
          errors
        );
      }
    }
  }

  // Check for consistent plural forms
  for (const namespace of namespaces) {
    validatePluralForms(translations, languages, namespace, errors);
  }

  // Warnings for unused translations
  if (process.env['NODE_ENV'] === 'production') {
    warnings.push(
      'Consider running translation usage analysis to identify unused keys'
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Extract all keys from a translation object
function extractKeys(
  obj: TranslationNamespace,
  prefix: string = ''
): string[] {
  const keys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      keys.push(fullKey);
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...extractKeys(value as TranslationNamespace, fullKey));
    }
  }

  return keys;
}

// Validate interpolation syntax
function validateInterpolation(
  obj: TranslationNamespace,
  language: string,
  namespace: string,
  errors: ValidationError[],
  prefix: string = ''
): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      // Check for unclosed interpolation
      const openCount = (value.match(/{{/g) || []).length;
      const closeCount = (value.match(/}}/g) || []).length;
      
      if (openCount !== closeCount) {
        errors.push({
          language,
          namespace,
          key: fullKey,
          error: 'Unclosed interpolation brackets',
        });
      }
      
      // Check for empty interpolation
      if (/{{\\s*}}/.test(value)) {
        errors.push({
          language,
          namespace,
          key: fullKey,
          error: 'Empty interpolation variable',
        });
      }
    } else if (typeof value === 'object' && value !== null) {
      validateInterpolation(
        value as TranslationNamespace,
        language,
        namespace,
        errors,
        fullKey
      );
    }
  }
}

// Validate plural forms consistency
function validatePluralForms(
  translations: Record<string, Record<string, TranslationNamespace>>,
  languages: string[],
  namespace: string,
  errors: ValidationError[]
): void {
  const pluralKeys = new Map<string, Map<string, number>>();

  // Collect plural forms
  for (const language of languages) {
    if (translations[language]?.[namespace]) {
      collectPluralForms(
        translations[language][namespace],
        language,
        pluralKeys
      );
    }
  }

  // Check consistency
  for (const [key, languageForms] of pluralKeys) {
    const formCounts = Array.from(languageForms.values());
    const uniqueCounts = new Set(formCounts);
    
    if (uniqueCounts.size > 1) {
      for (const [language, count] of languageForms) {
        errors.push({
          language,
          namespace,
          key,
          error: `Inconsistent plural forms. Expected ${Math.max(...formCounts)} forms, found ${count}`,
        });
      }
    }
  }
}

// Collect plural forms from translations
function collectPluralForms(
  obj: TranslationNamespace,
  language: string,
  pluralKeys: Map<string, Map<string, number>>,
  prefix: string = ''
): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string' && value.includes('|')) {
      const formCount = value.split('|').length;
      
      if (!pluralKeys.has(fullKey)) {
        pluralKeys.set(fullKey, new Map());
      }
      
      pluralKeys.get(fullKey)!.set(language, formCount);
    } else if (typeof value === 'object' && value !== null) {
      collectPluralForms(
        value as TranslationNamespace,
        language,
        pluralKeys,
        fullKey
      );
    }
  }
}

// Export validation report
export function exportValidationReport(
  result: ValidationResult,
  outputPath: string
): void {
  const report = {
    timestamp: new Date().toISOString(),
    valid: result.valid,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    errors: result.errors,
    warnings: result.warnings,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
}

// CLI validation script
export function runValidation(
  localesDir: string = './src/locales',
  languages: string[] = ['en', 'es'],
  namespaces: string[] = ['common', 'auth', 'hub']
): void {
  console.log('Validating translations...');
  
  const result = validateTranslations(localesDir, languages, namespaces);
  
  if (result.valid) {
    console.log('✅ All translations are valid!');
  } else {
    console.error(`❌ Found ${result.errors.length} errors:`);
    
    for (const error of result.errors) {
      console.error(
        `  - ${error.language}/${error.namespace}: ${error.key} - ${error.error}`
      );
    }
  }
  
  if (result.warnings.length > 0) {
    console.warn(`⚠️  ${result.warnings.length} warnings:`);
    
    for (const warning of result.warnings) {
      console.warn(`  - ${warning}`);
    }
  }
  
  // Exit with error code if validation failed
  if (!result.valid) {
    process.exit(1);
  }
}