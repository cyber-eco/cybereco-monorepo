#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract translation keys from a file
function extractTranslationKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = new Set();
  
  // Match t('key') or t("key") patterns
  const regex = /t\(['"]([^'"]+)['"]\)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[1]);
  }
  
  return Array.from(keys);
}

// Function to extract all keys from a translations object
function extractKeysFromTranslations(obj, prefix = '') {
  let keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(extractKeysFromTranslations(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Main analysis function
async function analyzeTranslations() {
  console.log('🔍 Analyzing translation usage in website app...\n');
  
  // Find all TSX files in website app
  const tsxFiles = glob.sync('apps/website/src/**/*.tsx');
  const usedKeys = new Set();
  const keysByFile = {};
  
  // Extract all used translation keys
  tsxFiles.forEach(file => {
    const keys = extractTranslationKeys(file);
    keys.forEach(key => usedKeys.add(key));
    if (keys.length > 0) {
      keysByFile[file] = keys;
    }
  });
  
  console.log(`📁 Analyzed ${tsxFiles.length} files`);
  console.log(`🔑 Found ${usedKeys.size} unique translation keys\n`);
  
  // Load old modular translations
  const oldTranslations = {};
  const translationFiles = ['common', 'home', 'portfolio', 'about', 'documentation'];
  
  for (const file of translationFiles) {
    try {
      const filePath = path.join(__dirname, '../apps/website/src/translations', `${file}.ts`);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract the export object
      const match = content.match(/export const \w+Translations = ({[\s\S]*});/);
      if (match) {
        // Use eval to parse the object (in production, use a proper parser)
        const obj = eval(`(${match[1]})`);
        const enKeys = extractKeysFromTranslations(obj.en, file);
        enKeys.forEach(key => {
          oldTranslations[key] = obj.en;
        });
      }
    } catch (e) {
      console.error(`Error loading ${file}.ts:`, e.message);
    }
  }
  
  console.log(`📚 Loaded ${Object.keys(oldTranslations).length} keys from old translation files\n`);
  
  // Load new JSON translations
  const newTranslations = {};
  const jsonFiles = glob.sync('libs/i18n/src/locales/en/*.json');
  
  jsonFiles.forEach(file => {
    const namespace = path.basename(file, '.json');
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const keys = extractKeysFromTranslations(content, namespace);
    keys.forEach(key => {
      newTranslations[key] = true;
    });
  });
  
  console.log(`📋 Loaded ${Object.keys(newTranslations).length} keys from new JSON files\n`);
  
  // Find missing keys
  const missingInNew = [];
  const missingInOld = [];
  const keysWithFallbacks = [];
  
  usedKeys.forEach(key => {
    // Check if key has a fallback (contains ||)
    if (key.includes('||')) {
      keysWithFallbacks.push(key);
      return;
    }
    
    // Check if key exists in new translations
    if (!newTranslations[key]) {
      missingInNew.push(key);
    }
    
    // Check if key exists in old translations
    if (!oldTranslations[key]) {
      missingInOld.push(key);
    }
  });
  
  // Report findings
  console.log('📊 Analysis Results:');
  console.log('===================\n');
  
  if (missingInNew.length > 0) {
    console.log(`❌ Keys missing in new JSON files (${missingInNew.length}):`);
    missingInNew.sort().forEach(key => {
      console.log(`   - ${key}`);
    });
    console.log('');
  }
  
  if (keysWithFallbacks.length > 0) {
    console.log(`⚠️  Keys with hardcoded fallbacks (${keysWithFallbacks.length}):`);
    keysWithFallbacks.sort().forEach(key => {
      console.log(`   - ${key}`);
    });
    console.log('');
  }
  
  // Group missing keys by namespace
  const missingByNamespace = {};
  missingInNew.forEach(key => {
    const namespace = key.split(':')[0] || 'common';
    if (!missingByNamespace[namespace]) {
      missingByNamespace[namespace] = [];
    }
    missingByNamespace[namespace].push(key);
  });
  
  console.log('📦 Missing keys grouped by namespace:');
  Object.entries(missingByNamespace).forEach(([namespace, keys]) => {
    console.log(`\n   ${namespace}: ${keys.length} keys`);
    keys.slice(0, 5).forEach(key => {
      console.log(`     - ${key}`);
    });
    if (keys.length > 5) {
      console.log(`     ... and ${keys.length - 5} more`);
    }
  });
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesAnalyzed: tsxFiles.length,
      uniqueKeysUsed: usedKeys.size,
      oldTranslationKeys: Object.keys(oldTranslations).length,
      newTranslationKeys: Object.keys(newTranslations).length,
      missingInNew: missingInNew.length,
      keysWithFallbacks: keysWithFallbacks.length
    },
    missingKeys: missingInNew.sort(),
    keysWithFallbacks: keysWithFallbacks.sort(),
    missingByNamespace,
    keysByFile: Object.entries(keysByFile)
      .filter(([_, keys]) => keys.some(k => missingInNew.includes(k)))
      .reduce((acc, [file, keys]) => {
        acc[file] = keys.filter(k => missingInNew.includes(k));
        return acc;
      }, {})
  };
  
  fs.writeFileSync('translation-audit-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ Detailed report saved to translation-audit-report.json');
}

// Run the analysis
analyzeTranslations().catch(console.error);