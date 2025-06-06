'use client';

import React from 'react';

// Re-export types for backward compatibility
export type LanguageType = 'en' | 'es';
export type Language = LanguageType;

// Wrapper component that integrates the new i18n library
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // This is a pass-through component for backward compatibility
  // The actual I18nProvider should be provided by the consuming app
  return <>{children}</>;
}

// Fallback translations for SSG and when i18n is not available
const fallbackTranslations: Record<string, string> = {
  'navigation.settings': 'Settings',
  'theme.title': 'Theme',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'language.title': 'Language',
  'footer.contact': 'Contact',
  'footer.allRightsReserved': 'All rights reserved'
};

// Create a context to share the real i18n instance
const I18nBridgeContext = React.createContext<any>(null);

// Hook to access the real i18n instance from window
function useI18nBridge() {
  const [i18nModule, setI18nModule] = React.useState<any>(null);
  
  React.useEffect(() => {
    const checkI18n = () => {
      if (typeof window !== 'undefined' && (window as any).__cybereco_i18n) {
        setI18nModule((window as any).__cybereco_i18n);
      }
    };
    
    checkI18n();
    
    // Check periodically for a short time
    const interval = setInterval(checkI18n, 100);
    const timeout = setTimeout(() => clearInterval(interval), 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  return i18nModule;
}

// Component that provides the real i18n context
function I18nBridge({ children }: { children: React.ReactNode }) {
  const i18nModule = useI18nBridge();
  
  // If we have the real i18n module, use its context
  if (i18nModule && i18nModule.useI18n) {
    // Create a wrapper component that can use the hook
    const I18nWrapper = () => {
      try {
        const i18nContext = i18nModule.useI18n();
        return (
          <I18nBridgeContext.Provider value={i18nContext}>
            {children}
          </I18nBridgeContext.Provider>
        );
      } catch (e) {
        // If hook fails, fall back to null context
        return (
          <I18nBridgeContext.Provider value={null}>
            {children}
          </I18nBridgeContext.Provider>
        );
      }
    };
    
    return <I18nWrapper />;
  }
  
  // No i18n module yet, provide null context
  return (
    <I18nBridgeContext.Provider value={null}>
      {children}
    </I18nBridgeContext.Provider>
  );
}

// Custom hook that provides backward compatibility with the old API
export function useLanguage() {
  const i18nContext = React.useContext(I18nBridgeContext);
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>('en');
  const [currentI18n, setCurrentI18n] = React.useState<any>(null);
  
  // Check for current i18n context from window
  React.useEffect(() => {
    const checkCurrentI18n = () => {
      if (typeof window !== 'undefined' && (window as any).__cybereco_current_i18n) {
        setCurrentI18n((window as any).__cybereco_current_i18n);
      }
    };
    
    checkCurrentI18n();
    // Check more frequently for immediate updates
    const interval = setInterval(checkCurrentI18n, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Load saved language preference
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('cybereco-language');
      if (savedLanguage === 'es' || savedLanguage === 'en') {
        setCurrentLanguage(savedLanguage as Language);
      }
    }
  }, []);
  
  // Fallback implementation
  const t = React.useCallback((key: string, variables?: Record<string, string>) => {
    // If we have current i18n, use its t function
    if (currentI18n && currentI18n.t) {
      return currentI18n.t(key, variables);
    }
    
    // If we have i18n context, use its t function
    if (i18nContext && i18nContext.t) {
      return i18nContext.t(key, variables);
    }
    
    // Fallback behavior
    const keyWithoutNamespace = key.split(':').pop() || key;
    if (fallbackTranslations[keyWithoutNamespace]) {
      return fallbackTranslations[keyWithoutNamespace];
    }
    
    // Return readable fallback
    const parts = keyWithoutNamespace.split('.');
    const lastPart = parts[parts.length - 1];
    return lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  }, [currentI18n, i18nContext]);
  
  // Create stable setLanguage function
  const setLanguage = React.useCallback((lang: Language) => {
    // If we have current i18n, use its setLanguage
    if (currentI18n && currentI18n.setLanguage) {
      currentI18n.setLanguage(lang);
      return;
    }
    
    // If we have i18n context, use its setLanguage
    if (i18nContext && i18nContext.setLanguage) {
      i18nContext.setLanguage(lang);
      return;
    }
    
    // Fallback: just save to localStorage
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cybereco-language', lang);
    }
  }, [currentI18n, i18nContext]);
  
  // Determine the current language
  const language = currentI18n?.language || i18nContext?.language || currentLanguage;
  
  return {
    language: language as Language,
    setLanguage,
    t
  };
}

// Wrap components that use useLanguage with I18nBridge
export function withI18nBridge<P extends object>(Component: React.ComponentType<P>) {
  return (props: P) => (
    <I18nBridge>
      <Component {...props} />
    </I18nBridge>
  );
}

// Re-export placeholder functions for the full i18n features
export function useI18n() {
  return useLanguage();
}

export function useTranslation(namespace?: string) {
  const { t: baseT, ...rest } = useLanguage();
  
  const t = (key: string, params?: any) => {
    const fullKey = namespace ? `${namespace}:${key}` : key;
    return baseT(fullKey, params);
  };
  
  return { t, ...rest };
}