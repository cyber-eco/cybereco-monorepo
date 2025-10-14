#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const translationDir = path.join(__dirname, '../../../libs/i18n/src/locales');
const codebaseRoot = path.join(__dirname, '..');

// Function to check if a translation key is used in the codebase
function isKeyUsed(key) {
  try {
    const rgPath = '/opt/homebrew/lib/node_modules/@anthropic-ai/claude-code/vendor/ripgrep/arm64-darwin/rg';
    const patterns = [
      `t('${key}')`,
      `t("${key}")`,
      `t('documentation:${key}')`,
      `t("documentation:${key}")`
    ];
    
    for (const pattern of patterns) {
      const cmd = `${rgPath} "${pattern}" "${codebaseRoot}/src" 2>/dev/null || true`;
      const result = execSync(cmd, { encoding: 'utf-8' }).trim();
      if (result) {
        return true;
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return false;
}

// Main consolidation function
async function consolidateDataExportKeys() {
  console.log('🔍 Consolidating data export keys...\n');
  
  // Load current translations
  const enDoc = JSON.parse(fs.readFileSync(path.join(translationDir, 'en/documentation.json'), 'utf-8'));
  const esDoc = JSON.parse(fs.readFileSync(path.join(translationDir, 'es/documentation.json'), 'utf-8'));
  
  // Duplicate keys to check and potentially remove
  const duplicateKeys = [
    'dataExportTitle',      // Duplicate of dataExport.title
    'dataExportDesc',       // Duplicate of dataExport.description
    'dataExportDesc2',      // Not found in current files
    'exportTitle',          // Generic duplicate
    'exportDesc',           // Generic duplicate
    'dataExportNavItem',    // Navigation item - check if used
    'dataExportGuide'       // Guide title - check if used
  ];
  
  // Create backup
  const backupDir = path.join(__dirname, '../../../backup-translations');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(
    path.join(backupDir, `documentation-en-before-consolidation-${timestamp}.json`),
    JSON.stringify(enDoc, null, 2)
  );
  fs.writeFileSync(
    path.join(backupDir, `documentation-es-before-consolidation-${timestamp}.json`),
    JSON.stringify(esDoc, null, 2)
  );
  
  console.log('📊 Checking duplicate keys:\n');
  
  let removedCount = 0;
  const keepKeys = [];
  
  for (const key of duplicateKeys) {
    const enValue = enDoc.documentationPage?.[key];
    const esValue = esDoc.documentationPage?.[key];
    const isUsed = isKeyUsed(`documentationPage.${key}`);
    
    if (enValue !== undefined || esValue !== undefined) {
      console.log(`Key: documentationPage.${key}`);
      console.log(`  EN: "${enValue || '(missing)'}"`);
      console.log(`  ES: "${esValue || '(missing)'}"`);
      console.log(`  Used in code: ${isUsed ? '✅ Yes' : '❌ No'}`);
      
      if (!isUsed) {
        // Remove unused keys
        delete enDoc.documentationPage[key];
        delete esDoc.documentationPage[key];
        removedCount++;
        console.log(`  Action: ❌ Removed (unused duplicate)\n`);
      } else {
        keepKeys.push(key);
        console.log(`  Action: ✅ Kept (still in use)\n`);
      }
    }
  }
  
  // Check for keys that might need to be migrated
  console.log('\n📋 Migration needed for keys still in use:');
  if (keepKeys.length > 0) {
    console.log('\nThe following keys are still used in the code and should be migrated:');
    for (const key of keepKeys) {
      const mapping = {
        'dataExportTitle': 'dataExport.title',
        'dataExportDesc': 'dataExport.description',
        'dataExportNavItem': 'dataExport.title',
        'exportTitle': 'dataExport.title',
        'exportDesc': 'dataExport.description'
      };
      
      if (mapping[key]) {
        console.log(`  - documentationPage.${key} → documentationPage.${mapping[key]}`);
      }
    }
  } else {
    console.log('  None - all duplicate keys can be safely removed');
  }
  
  // Save updated files
  fs.writeFileSync(
    path.join(translationDir, 'en/documentation.json'),
    JSON.stringify(enDoc, null, 2)
  );
  fs.writeFileSync(
    path.join(translationDir, 'es/documentation.json'),
    JSON.stringify(esDoc, null, 2)
  );
  
  console.log('\n✅ Consolidation complete!');
  console.log(`   Removed ${removedCount} unused duplicate keys`);
  console.log(`   Kept ${keepKeys.length} keys that are still in use`);
  console.log(`   Backups saved to: ${backupDir}`);
  
  // Show the clean structure
  console.log('\n🏗️  Current Data Export Structure:');
  console.log('   documentationPage.dataExport');
  console.log('     ├── title');
  console.log('     ├── description');
  console.log('     ├── overview');
  console.log('     │   ├── title');
  console.log('     │   └── description');
  console.log('     ├── formats');
  console.log('     │   ├── title');
  console.log('     │   ├── json');
  console.log('     │   └── csv');
  console.log('     ├── features');
  console.log('     │   ├── instantDownload');
  console.log('     │   └── completeData');
  console.log('     ├── included');
  console.log('     │   ├── title');
  console.log('     │   ├── coreUserData');
  console.log('     │   └── ...');
  console.log('     ├── howTo');
  console.log('     │   ├── title');
  console.log('     │   └── steps');
  console.log('     ├── api');
  console.log('     │   └── title');
  console.log('     ├── rateLimits');
  console.log('     │   └── title');
  console.log('     └── gdpr');
  console.log('         ├── title');
  console.log('         └── ...');
  
  if (keepKeys.length > 0) {
    console.log('\n⚠️  Next Steps:');
    console.log('1. Update code references to use the structured keys');
    console.log('2. Run this script again to remove the remaining duplicates');
    console.log('3. Test the data export page to ensure everything works');
  }
}

// Run the consolidation
consolidateDataExportKeys().catch(console.error);