#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../apps/website/src');
let filesFixed = 0;
let totalReplacements = 0;

// Function to recursively process all TypeScript/React files
function processFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Replace documentation.key with documentation:key
      content = content.replace(/t\(['"]documentation\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('documentation:${key}')`;
      });
      
      // Replace home.key with home:key
      content = content.replace(/t\(['"]home\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('home:${key}')`;
      });
      
      // Replace about.key with about:key
      content = content.replace(/t\(['"]about\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('about:${key}')`;
      });
      
      // Replace portfolio.key with portfolio:key
      content = content.replace(/t\(['"]portfolio\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('portfolio:${key}')`;
      });
      
      // Replace help.key with help:key
      content = content.replace(/t\(['"]help\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('help:${key}')`;
      });
      
      // Replace auth.key with auth:key
      content = content.replace(/t\(['"]auth\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('auth:${key}')`;
      });
      
      // Replace hub.key with hub:key
      content = content.replace(/t\(['"]hub\.([^'"]+)['"]\)/g, (match, key) => {
        totalReplacements++;
        return `t('hub:${key}')`;
      });
      
      // For keys that should be in common namespace but don't have a namespace
      // Match patterns like contactPage.title, dataArchitecture.title, etc.
      const commonPatterns = [
        'contactPage',
        'dataArchitecture',
        'hubGateway',
        'errorPage',
        'faqPage',
        'guidesPage',
        'privacyPage',
        'supportPage',
        'termsPage',
        'visionPage',
        'roadmapPage',
        'philosophyPage',
        'statusPage'
      ];
      
      commonPatterns.forEach(pattern => {
        const regex = new RegExp(`t\\(['"]${pattern}\\.([^'"]+)['"]\\)`, 'g');
        content = content.replace(regex, (match, key) => {
          totalReplacements++;
          return `t('common:${pattern}.${key}')`;
        });
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesFixed++;
        console.log(`✅ Fixed: ${path.relative(sourceDir, filePath)}`);
      }
    }
  });
}

console.log('🔧 Fixing translation namespace issues...\n');
processFiles(sourceDir);

console.log(`\n✨ Complete!`);
console.log(`   Files fixed: ${filesFixed}`);
console.log(`   Total replacements: ${totalReplacements}`);