#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load translation files
const enTranslations = {
  common: require('../libs/i18n/src/locales/en/common.json'),
  home: require('../libs/i18n/src/locales/en/home.json'),
  about: require('../libs/i18n/src/locales/en/about.json'),
  documentation: require('../libs/i18n/src/locales/en/documentation.json'),
  portfolio: require('../libs/i18n/src/locales/en/portfolio.json'),
  auth: require('../libs/i18n/src/locales/en/auth.json'),
  help: require('../libs/i18n/src/locales/en/help.json'),
  hub: require('../libs/i18n/src/locales/en/hub.json')
};

const esTranslations = {
  common: require('../libs/i18n/src/locales/es/common.json'),
  home: require('../libs/i18n/src/locales/es/home.json'),
  about: require('../libs/i18n/src/locales/es/about.json'),
  documentation: require('../libs/i18n/src/locales/es/documentation.json'),
  portfolio: require('../libs/i18n/src/locales/es/portfolio.json'),
  auth: require('../libs/i18n/src/locales/es/auth.json'),
  help: require('../libs/i18n/src/locales/es/help.json'),
  hub: require('../libs/i18n/src/locales/es/hub.json')
};

// Function to extract all keys from nested object
function extractKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Extract all keys from both language files
const enKeys = {};
const esKeys = {};

Object.entries(enTranslations).forEach(([namespace, translations]) => {
  enKeys[namespace] = extractKeys(translations);
});

Object.entries(esTranslations).forEach(([namespace, translations]) => {
  esKeys[namespace] = extractKeys(translations);
});

// Compare keys
console.log('🔍 Checking for missing translations...\n');

let missingCount = 0;

// Check for keys in EN that are missing in ES
Object.entries(enKeys).forEach(([namespace, keys]) => {
  const missingInEs = keys.filter(key => !esKeys[namespace]?.includes(key));
  if (missingInEs.length > 0) {
    console.log(`❌ Missing in Spanish (${namespace}):`);
    missingInEs.forEach(key => {
      console.log(`   - ${key}`);
      missingCount++;
    });
    console.log('');
  }
});

// Check for keys in ES that are missing in EN
Object.entries(esKeys).forEach(([namespace, keys]) => {
  const missingInEn = keys.filter(key => !enKeys[namespace]?.includes(key));
  if (missingInEn.length > 0) {
    console.log(`❌ Missing in English (${namespace}):`);
    missingInEn.forEach(key => {
      console.log(`   - ${key}`);
      missingCount++;
    });
    console.log('');
  }
});

if (missingCount === 0) {
  console.log('✅ All translations are in sync!');
} else {
  console.log(`\n⚠️  Found ${missingCount} missing translations.`);
}

// Now check for translation usage in website source files
console.log('\n🔍 Checking for translation usage in source files...\n');

const sourceDir = path.join(__dirname, '../apps/website/src');
const usedKeys = new Set();
const missingFallbacks = [];

// Function to recursively read all TypeScript/React files
function readFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      readFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Match t() function calls
      const tMatches = content.matchAll(/\bt\(['"`]([^'"`]+)['"`]\)/g);
      for (const match of tMatches) {
        const key = match[1];
        usedKeys.add(key);
        
        // Check if this t() call has a fallback
        const lineStart = content.lastIndexOf('\n', match.index) + 1;
        const lineEnd = content.indexOf('\n', match.index);
        const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
        
        if (!line.includes('||') && !line.includes('defaultValue')) {
          // Check if it's inside a ternary operator or object property that might have fallback elsewhere
          const contextStart = Math.max(0, match.index - 100);
          const contextEnd = Math.min(content.length, match.index + 200);
          const context = content.substring(contextStart, contextEnd);
          
          if (!context.includes('||') && !context.includes('defaultValue') && !context.includes('default')) {
            missingFallbacks.push({
              file: path.relative(sourceDir, filePath),
              key,
              line: content.substring(0, match.index).split('\n').length
            });
          }
        }
      }
    }
  });
}

readFiles(sourceDir);

// Check which used keys don't exist in translations
const missingKeys = [];
usedKeys.forEach(key => {
  const [namespace, ...keyParts] = key.split(':');
  const actualKey = keyParts.length > 0 ? keyParts.join(':') : namespace;
  const actualNamespace = keyParts.length > 0 ? namespace : 'common';
  
  if (enTranslations[actualNamespace]) {
    const keys = extractKeys(enTranslations[actualNamespace]);
    if (!keys.includes(actualKey)) {
      missingKeys.push({ namespace: actualNamespace, key: actualKey, fullKey: key });
    }
  } else {
    missingKeys.push({ namespace: actualNamespace, key: actualKey, fullKey: key });
  }
});

if (missingKeys.length > 0) {
  console.log('❌ Translation keys used but not defined:');
  missingKeys.forEach(({ fullKey, namespace }) => {
    console.log(`   - ${fullKey} (namespace: ${namespace})`);
  });
  console.log('');
}

if (missingFallbacks.length > 0) {
  console.log('⚠️  Translation calls without fallbacks:');
  const uniqueFiles = [...new Set(missingFallbacks.map(m => m.file))];
  uniqueFiles.forEach(file => {
    console.log(`\n   ${file}:`);
    missingFallbacks
      .filter(m => m.file === file)
      .forEach(({ key, line }) => {
        console.log(`     Line ${line}: t('${key}')`);
      });
  });
}

console.log(`\n📊 Summary:`);
console.log(`   - Total translation keys used: ${usedKeys.size}`);
console.log(`   - Missing translation definitions: ${missingKeys.length}`);
console.log(`   - Calls without fallbacks: ${missingFallbacks.length}`);