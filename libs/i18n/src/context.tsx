'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, I18nContext as I18nContextType, TranslationOptions } from './types';
import { Translator } from './translator';
import { loadTranslations } from './loader';

// Import static translations directly to avoid circular dependencies
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

const staticTranslations = {
  en: {
    common: enCommon,
    auth: enAuth,
    hub: enHub,
    documentation: enDocumentation,
    home: enHome,
    portfolio: enPortfolio,
    about: enAbout,
    help: enHelp,
  },
  es: {
    common: esCommon,
    auth: esAuth,
    hub: esHub,
    documentation: esDocumentation,
    home: esHome,
    portfolio: esPortfolio,
    about: esAbout,
    help: esHelp,
  },
};

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  supportedLanguages?: Language[];
  namespaces?: string[];
  loadPath?: string;
}

export function I18nProvider({
  children,
  defaultLanguage = 'en',
  fallbackLanguage = 'en',
  supportedLanguages = ['en', 'es'],
  namespaces = ['common', 'auth', 'hub'],
  loadPath,
}: I18nProviderProps) {
  const [language, setInternalLanguage] = useState<Language>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(!staticTranslations[defaultLanguage]); // false if we have static translations
  const [error, setError] = useState<Error>();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [, forceUpdate] = useState(0); // Force re-render counter
  const [translator] = useState(
    () => {
      const t = new Translator({
        defaultLanguage,
        fallbackLanguage,
        supportedLanguages,
        namespaces,
        loadPath,
      });
      
      // Pre-load static translations for SSG and initial render
      supportedLanguages.forEach(lang => {
        const langTranslations = staticTranslations[lang as keyof typeof staticTranslations];
        if (langTranslations) {
          namespaces.forEach(ns => {
            const nsTranslations = langTranslations[ns as keyof typeof langTranslations];
            if (nsTranslations) {
              t.loadTranslations(lang, ns, nsTranslations);
            }
          });
        }
      });
      
      // Set initial language
      t.setLanguage(defaultLanguage);
      
      return t;
    }
  );
  
  // Debounced language setter to prevent rapid switches
  const setLanguage = useCallback((newLang: Language) => {
    if (newLang === language || isChangingLanguage) return;
    setIsChangingLanguage(true);
    setInternalLanguage(newLang);
    setTimeout(() => setIsChangingLanguage(false), 500);
  }, [language, isChangingLanguage]);

  // Load translations for current language
  useEffect(() => {
    let isCancelled = false;
    
    const loadLanguageTranslations = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        // Load translations for current language
        await loadTranslations(translator, language, namespaces, loadPath);
        
        // Also load fallback language if different
        if (language !== fallbackLanguage) {
          await loadTranslations(translator, fallbackLanguage, namespaces, loadPath);
        }

        if (!isCancelled) {
          translator.setLanguage(language);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load translations:', err);
          setError(err as Error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          // Force re-render after language change
          forceUpdate(prev => prev + 1);
        }
      }
    };

    loadLanguageTranslations();
    
    return () => {
      isCancelled = true;
    };
  }, [language, translator, namespaces, fallbackLanguage, loadPath]);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cybereco-language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  // Translation function
  const t = useCallback(
    (key: string, options?: TranslationOptions): string => {
      return translator.t(key, options);
    },
    [translator, language] // Add language as dependency to force update
  );

  // Date formatting
  const formatDate = useCallback(
    (date: Date, options?: any): string => {
      return translator.formatDate(date, options);
    },
    [translator, language]
  );

  // Time formatting
  const formatTime = useCallback(
    (date: Date, options?: any): string => {
      return translator.formatTime(date, options);
    },
    [translator, language]
  );

  // Number formatting
  const formatNumber = useCallback(
    (number: number, options?: any): string => {
      return translator.formatNumber(number, options);
    },
    [translator, language]
  );

  // Currency formatting
  const formatCurrency = useCallback(
    (amount: number, currency?: string): string => {
      return translator.formatCurrency(amount, currency);
    },
    [translator, language]
  );

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    isLoading,
    error,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Expose i18n to window for cross-library usage
if (typeof window !== 'undefined') {
  (window as any).__cybereco_i18n = { useI18n };
}

// Helper hook for translations
export function useTranslation(namespace?: string) {
  const { t, ...rest } = useI18n();

  const namespacedT = useCallback(
    (key: string, options?: TranslationOptions) => {
      const fullKey = namespace ? `${namespace}:${key}` : key;
      return t(fullKey, options);
    },
    [t, namespace]
  );

  return {
    t: namespacedT,
    ...rest,
  };
}

// Helper hook for language detection
export function useLanguageDetector(supportedLanguages: Language[] = ['en', 'es']) {
  const detectLanguage = useCallback((): Language => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    // Check localStorage first
    const savedLanguage = localStorage.getItem('cybereco-language');
    if (savedLanguage && supportedLanguages.includes(savedLanguage as Language)) {
      return savedLanguage as Language;
    }

    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLanguage as Language)) {
      return browserLanguage as Language;
    }

    // Default to English
    return 'en';
  }, [supportedLanguages]);

  return detectLanguage;
}