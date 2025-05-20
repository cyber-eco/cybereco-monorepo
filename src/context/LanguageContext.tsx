import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Translations, LanguageContextType, Language } from '../types';

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  translations: {},
  changeLanguage: () => {},
  loading: true
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial language preference
  useEffect(() => {
    // Check for saved language preference first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    } else {
      // Auto-detect user's language based on browser settings
      const browserLang = navigator.language || (navigator as any).userLanguage;
      const detectedLang = browserLang.split('-')[0]; // Get the language code (e.g., 'en' from 'en-US')
      
      // Only support Spanish or English (default to English otherwise)
      if (detectedLang === 'es') {
        setLanguage('es');
      }
    }
  }, []);
  
  // Load translations whenever language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        const module = await import(`../translations/${language}`);
        setTranslations(module.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English if there's an error
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en');
          setTranslations(fallbackModule.default);
        }
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    localStorage.setItem('preferredLanguage', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
