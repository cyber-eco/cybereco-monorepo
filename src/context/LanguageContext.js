import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Load initial language preference
  useEffect(() => {
    // Check for saved language preference first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Auto-detect user's language based on browser settings
      const browserLang = navigator.language || navigator.userLanguage;
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
      setLoading(true); // Start loading
      try {
        console.log(`Loading translations for language: ${language}`);
        // Dynamically import the translations for the selected language
        const langModule = await import(`../translations/${language}.js`);
        console.log('Translations loaded:', langModule.default);
        setTranslations(langModule.default);
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error);
        // Fallback to English if there's an error
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en.js');
          setTranslations(fallbackModule.default);
        }
      } finally {
        setLoading(false); // End loading
      }
    };
    
    loadTranslations();
  }, [language]);

  const changeLanguage = (lang) => {
    if (['en', 'es'].includes(lang)) {
      console.log(`Changing language to: ${lang}`);
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
