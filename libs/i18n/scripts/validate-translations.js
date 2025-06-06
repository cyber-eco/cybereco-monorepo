#!/usr/bin/env node

const path = require('path');
const { validateTranslations, exportValidationReport } = require('../src/validator');

// Configuration
const LOCALES_DIR = path.join(__dirname, '../src/locales');
const LANGUAGES = ['en', 'es'];
const NAMESPACES = ['common', 'auth', 'hub'];
const REPORT_PATH = path.join(__dirname, '../../../reports/i18n-validation-report.json');

// Run validation
console.log('🌐 Validating translations...\n');

const result = validateTranslations(LOCALES_DIR, LANGUAGES, NAMESPACES);

// Display results
if (result.valid) {
  console.log('✅ All translations are valid!\n');
} else {
  console.error(`❌ Found ${result.errors.length} translation errors:\n`);
  
  // Group errors by type
  const errorsByType = {};
  
  result.errors.forEach(error => {
    const type = error.error;
    if (!errorsByType[type]) {
      errorsByType[type] = [];
    }
    errorsByType[type].push(error);
  });
  
  // Display errors by type
  Object.entries(errorsByType).forEach(([type, errors]) => {
    console.error(`\n${type}:`);
    errors.forEach(error => {
      console.error(`  - ${error.language}/${error.namespace}: ${error.key || '(file level)'}`);
    });
  });
}

// Display warnings
if (result.warnings.length > 0) {
  console.warn(`\n⚠️  ${result.warnings.length} warnings:`);
  result.warnings.forEach(warning => {
    console.warn(`  - ${warning}`);
  });
}

// Export report
exportValidationReport(result, REPORT_PATH);
console.log(`\n📄 Validation report saved to: ${REPORT_PATH}`);

// Exit with error code if validation failed
if (!result.valid) {
  process.exit(1);
}