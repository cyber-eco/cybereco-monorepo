'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Basic translations for JustSplit
const translations = {
  en: {
    dashboard: 'Dashboard',
    groups: 'Groups',
    events: 'Events',
    expenses: 'Expenses',
    settlements: 'Settlements',
    friends: 'Friends',
    profile: 'Profile',
    hub: 'Hub',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    spanish: 'Español',
    welcome: 'Fair expense splitting, made simple.',
    subtitle: 'Track, divide, and settle shared expenses effortlessly — for trips, events, or daily life.',
    addExpense: 'Add Expense',
    createEvent: 'Create Event',
    // Footer translations
    tagline: 'Split expenses, not friendships',
    features: 'Features',
    expenseTracking: 'Expense Tracking',
    groupManagement: 'Group Management',
    eventPlanning: 'Event Planning',
    support: 'Support',
    helpCenter: 'Help Center',
    about: 'About',
    contact: 'Contact',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    license: 'CYBERECO License',
    loading: 'Loading application data...',
  },
  es: {
    dashboard: 'Panel',
    groups: 'Grupos',
    events: 'Eventos',
    expenses: 'Gastos',
    settlements: 'Liquidaciones',
    friends: 'Amigos',
    profile: 'Perfil',
    hub: 'Hub',
    settings: 'Configuración',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
    english: 'English',
    spanish: 'Español',
    welcome: 'División justa de gastos, hecha simple.',
    subtitle: 'Rastrea, divide y liquida gastos compartidos sin esfuerzo — para viajes, eventos o la vida diaria.',
    addExpense: 'Agregar Gasto',
    createEvent: 'Crear Evento',
    // Footer translations
    tagline: 'Divide gastos, no amistades',
    features: 'Características',
    expenseTracking: 'Seguimiento de Gastos',
    groupManagement: 'Gestión de Grupos',
    eventPlanning: 'Planificación de Eventos',
    support: 'Soporte',
    helpCenter: 'Centro de Ayuda',
    about: 'Acerca de',
    contact: 'Contacto',
    legal: 'Legal',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    license: 'Licencia CYBERECO',
    loading: 'Cargando datos de la aplicación...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Hydration fix - only access localStorage after mounting
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('justsplit-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    } else {
      // Check browser language preference
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('justsplit-language', language);
      document.documentElement.setAttribute('lang', language);
    }
  }, [language, mounted]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}