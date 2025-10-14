#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to extract translations from a TypeScript file
function extractTranslationsFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the export object
  const match = content.match(/export const \w+Translations = ({[\s\S]*});/);
  if (!match) {
    console.error(`Could not extract translations from ${filePath}`);
    return null;
  }
  
  // Use eval to parse the object (in production, use a proper parser)
  try {
    const obj = eval(`(${match[1]})`);
    return obj;
  } catch (e) {
    console.error(`Error parsing translations from ${filePath}:`, e.message);
    return null;
  }
}

// Helper function to merge objects deeply
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = target[key] || {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Helper function to create nested object from dot notation
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return obj;
}

// Main migration function
async function migrateTranslations() {
  console.log('🔄 Starting translation migration...\n');
  
  const oldTranslationsDir = path.join(__dirname, '../apps/website/src/translations');
  const newTranslationsDir = path.join(__dirname, '../libs/i18n/src/locales');
  
  // Translation file mappings
  const translationFiles = [
    { name: 'common', targetFile: 'common.json' },
    { name: 'home', targetFile: 'home.json' },
    { name: 'portfolio', targetFile: 'portfolio.json' },
    { name: 'about', targetFile: 'about.json' },
    { name: 'documentation', targetFile: 'documentation.json' }
  ];
  
  const languages = ['en', 'es'];
  
  // Process each translation file
  for (const { name, targetFile } of translationFiles) {
    const tsPath = path.join(oldTranslationsDir, `${name}.ts`);
    
    if (!fs.existsSync(tsPath)) {
      console.warn(`⚠️  File not found: ${tsPath}`);
      continue;
    }
    
    console.log(`📄 Processing ${name}.ts...`);
    const translations = extractTranslationsFromTS(tsPath);
    
    if (!translations) {
      continue;
    }
    
    // Process each language
    for (const lang of languages) {
      if (!translations[lang]) {
        console.warn(`  ⚠️  No ${lang} translations found in ${name}.ts`);
        continue;
      }
      
      const targetPath = path.join(newTranslationsDir, lang, targetFile);
      let existingData = {};
      
      // Load existing JSON if it exists
      if (fs.existsSync(targetPath)) {
        existingData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      }
      
      // Merge translations
      const mergedData = deepMerge(existingData, translations[lang]);
      
      // Write the merged data
      fs.writeFileSync(targetPath, JSON.stringify(mergedData, null, 2) + '\n');
      console.log(`  ✅ Updated ${lang}/${targetFile}`);
    }
  }
  
  // Handle special cases - translations that don't have their own file yet
  console.log('\n📋 Processing additional translations...');
  
  // Create help.json if it doesn't exist
  const helpTranslations = {
    en: {
      helpPage: {
        title: "How Can We Help?",
        subtitle: "Find the support you need with our help resources and documentation",
        faqTitle: "Frequently Asked Questions",
        faqDesc: "Find answers to commonly asked questions about our solutions and the CyberEco ecosystem",
        docsTitle: "Documentation",
        docsDesc: "Comprehensive guides and technical documentation for the CyberEco digital ecosystem",
        supportTitle: "Support",
        supportDesc: "Get help from our support team and community for any issues across all solution categories",
        contactTitle: "Contact",
        contactDesc: "Reach out to us directly for questions about any of our solutions or to suggest new features"
      }
    },
    es: {
      helpPage: {
        title: "¿Cómo Podemos Ayudarte?",
        subtitle: "Encuentra el apoyo que necesitas con nuestros recursos de ayuda y documentación",
        faqTitle: "Preguntas Frecuentes",
        faqDesc: "Encuentra respuestas a preguntas comunes sobre nuestras soluciones y el ecosistema CyberEco",
        docsTitle: "Documentación",
        docsDesc: "Guías completas y documentación técnica para el ecosistema digital CyberEco",
        supportTitle: "Soporte",
        supportDesc: "Obtén ayuda de nuestro equipo de soporte y comunidad para cualquier problema en todas las categorías de soluciones",
        contactTitle: "Contacto",
        contactDesc: "Contáctanos directamente para preguntas sobre cualquiera de nuestras soluciones o para sugerir nuevas características"
      }
    }
  };
  
  for (const lang of languages) {
    const helpPath = path.join(newTranslationsDir, lang, 'help.json');
    fs.writeFileSync(helpPath, JSON.stringify(helpTranslations[lang], null, 2) + '\n');
    console.log(`✅ Created ${lang}/help.json`);
  }
  
  // Add missing keys to common.json
  const commonAdditions = {
    en: {
      messages: {
        help: "How Can We Help?",
        helpSubtitle: "Find the support you need with our help resources and documentation",
        faqDescription: "Find answers to commonly asked questions about our solutions and the CyberEco ecosystem",
        supportDescription: "Get help from our support team and community for any issues across all solution categories",
        contactDescription: "Reach out to us directly for questions about any of our solutions or to suggest new features"
      }
    },
    es: {
      messages: {
        help: "¿Cómo Podemos Ayudarte?",
        helpSubtitle: "Encuentra el apoyo que necesitas con nuestros recursos de ayuda y documentación",
        faqDescription: "Encuentra respuestas a preguntas comunes sobre nuestras soluciones y el ecosistema CyberEco",
        supportDescription: "Obtén ayuda de nuestro equipo de soporte y comunidad para cualquier problema en todas las categorías de soluciones",
        contactDescription: "Contáctanos directamente para preguntas sobre cualquiera de nuestras soluciones o para sugerir nuevas características"
      }
    }
  };
  
  for (const lang of languages) {
    const commonPath = path.join(newTranslationsDir, lang, 'common.json');
    const commonData = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
    const mergedCommon = deepMerge(commonData, commonAdditions[lang]);
    fs.writeFileSync(commonPath, JSON.stringify(mergedCommon, null, 2) + '\n');
    console.log(`✅ Updated ${lang}/common.json with additional keys`);
  }
  
  console.log('\n✨ Translation migration completed!');
  console.log('\nNext steps:');
  console.log('1. Review the updated JSON files in libs/i18n/src/locales/');
  console.log('2. Test the website app to ensure all translations are working');
  console.log('3. Remove the old translation files from apps/website/src/translations/ once confirmed');
}

// Run the migration
migrateTranslations().catch(console.error);