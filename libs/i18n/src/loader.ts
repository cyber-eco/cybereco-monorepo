import { Language, TranslationNamespace } from './types';
import { Translator } from './translator';

// Default translations (bundled)
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enAuth from './locales/en/auth.json';
import esAuth from './locales/es/auth.json';
import enHub from './locales/en/hub.json';
import esHub from './locales/es/hub.json';
import enDocumentation from './locales/en/documentation.json';
import esDocumentation from './locales/es/documentation.json';
import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';
import enPortfolio from './locales/en/portfolio.json';
import esPortfolio from './locales/es/portfolio.json';
import enAbout from './locales/en/about.json';
import esAbout from './locales/es/about.json';
import enHelp from './locales/en/help.json';
import esHelp from './locales/es/help.json';
import enContact from './locales/en/contact.json';
import esContact from './locales/es/contact.json';

// Bundled translations
const bundledTranslations: Record<string, Record<string, TranslationNamespace>> = {
  en: {
    common: enCommon as TranslationNamespace,
    auth: enAuth as TranslationNamespace,
    hub: enHub as TranslationNamespace,
    documentation: enDocumentation as TranslationNamespace,
    home: enHome as TranslationNamespace,
    portfolio: enPortfolio as TranslationNamespace,
    about: enAbout as TranslationNamespace,
    help: enHelp as TranslationNamespace,
    contact: enContact as TranslationNamespace,
  },
  es: {
    common: esCommon as TranslationNamespace,
    auth: esAuth as TranslationNamespace,
    hub: esHub as TranslationNamespace,
    documentation: esDocumentation as TranslationNamespace,
    home: esHome as TranslationNamespace,
    portfolio: esPortfolio as TranslationNamespace,
    about: esAbout as TranslationNamespace,
    help: esHelp as TranslationNamespace,
    contact: esContact as TranslationNamespace,
  },
};

// Load translations from bundled resources or external source
export async function loadTranslations(
  translator: Translator,
  language: Language,
  namespaces: string[],
  loadPath?: string
): Promise<void> {
  // If no custom load path, use bundled translations
  if (!loadPath) {
    const langTranslations = bundledTranslations[language];
    if (langTranslations) {
      for (const namespace of namespaces) {
        const translations = langTranslations[namespace];
        if (translations) {
          translator.loadTranslations(language, namespace, translations);
        }
      }
    }
    return;
  }

  // Load from external source
  const promises = namespaces.map(async (namespace) => {
    try {
      const url = loadPath
        .replace('{{lng}}', language)
        .replace('{{ns}}', namespace);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.statusText}`);
      }

      const translations = await response.json();
      translator.loadTranslations(language, namespace, translations);
    } catch (error) {
      console.error(`Failed to load ${namespace} translations for ${language}:`, error);
      
      // Fall back to bundled translations if available
      const fallback = bundledTranslations[language]?.[namespace];
      if (fallback) {
        translator.loadTranslations(language, namespace, fallback);
      }
    }
  });

  await Promise.all(promises);
}

// Dynamic import for code splitting (optional)
export async function loadNamespaceAsync(
  language: Language,
  namespace: string
): Promise<TranslationNamespace | null> {
  try {
    const module = await import(`./locales/${language}/${namespace}.json`);
    return module.default as TranslationNamespace;
  } catch (error) {
    console.error(`Failed to dynamically load ${namespace} for ${language}:`, error);
    return null;
  }
}

// Preload translations for better performance
export async function preloadTranslations(
  languages: Language[],
  namespaces: string[]
): Promise<void> {
  const promises: Promise<void>[] = [];

  for (const language of languages) {
    for (const namespace of namespaces) {
      promises.push(
        loadNamespaceAsync(language, namespace).then(() => {
          // Just preload, don't need to do anything with the result
        })
      );
    }
  }

  await Promise.all(promises);
}

// Get available languages
export function getAvailableLanguages(): Language[] {
  return Object.keys(bundledTranslations) as Language[];
}

// Get available namespaces for a language
export function getAvailableNamespaces(language: Language): string[] {
  return Object.keys(bundledTranslations[language] || {});
}

// Check if translations exist for a language/namespace combination
export function hasTranslations(language: Language, namespace: string): boolean {
  return Boolean(bundledTranslations[language]?.[namespace]);
}