'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
export type LanguageType = 'en' | 'es';

// Structure for translated strings
export interface Translations {
  [key: string]: string;
}

// Type for all available translations
export interface TranslationsMap {
  [language: string]: Translations;
}

// Language context structure
interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

// Default English translations (minimal set)
const defaultTranslations: TranslationsMap = {
  en: {
    welcome: 'Welcome',
    home: 'Home',
    about: 'About',
    features: 'Features',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    language: 'Language',
    theme: 'Theme',
    'navigation.settings': 'Settings',
    'theme.title': 'Theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'language.title': 'Language',
    'footer.tagline': 'Building a sustainable digital future',
    'footer.features': 'Features',
    'footer.expenseSplitting': 'Expense Splitting',
    'footer.groupManagement': 'Group Management',
    'footer.realTimeSync': 'Real-time Sync',
    'footer.multiCurrency': 'Multi-currency',
    'footer.resources': 'Resources',
    'footer.userGuide': 'User Guide',
    'footer.faq': 'FAQ',
    'footer.api': 'API',
    'footer.changelog': 'Changelog',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.cybereco': 'CyberEco',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'navigation.dashboard': 'Dashboard',
    'navigation.groups': 'Groups',
    'navigation.events': 'Events',
    'navigation.expenses': 'Expenses',
    'navigation.settlements': 'Settlements',
    'navigation.friends': 'Friends',
    'navigation.profile': 'Profile',
    'navigation.apps': 'Apps',
    'navigation.myData': 'My Data',
    'navigation.signIn': 'Sign In',
    'auth.logout': 'Logout',
    // Hub-specific translations
    'hub.loading': 'Loading...',
    'hub.welcome.title': 'Welcome to CyberEco Hub',
    'hub.welcome.subtitle': 'Sign in to access your digital ecosystem',
    'hub.welcomeBack': 'Welcome back, {name}!',
    'hub.ecosystem.subtitle': 'Your digital ecosystem awaits',
    'hub.apps.title': 'Your Applications',
    'hub.apps.description': 'Access all your CyberEco applications from one central hub',
    // Footer Hub-specific translations
    'footer.apps': 'Apps',
    'footer.allApps': 'All Apps',
    'footer.marketplace': 'Marketplace',
    'footer.documentation': 'Documentation',
    'footer.apiReference': 'API Reference',
    'footer.tutorials': 'Tutorials',
    'footer.community': 'Community',
    'footer.profile': 'Profile',
    'footer.settings': 'Settings',
    'footer.billing': 'Billing',
    'footer.security': 'Security',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.contactSupport': 'Contact Support',
    'footer.status': 'System Status',
    'footer.feedback': 'Feedback',
    'footer.hubTagline': 'Your digital ecosystem gateway',
    'footer.contact': 'Contact',
    'footer.allRightsReserved': 'All rights reserved.',
    // AppGrid translations
    'apps.loading': 'Loading applications...',
    'apps.launch': 'Launch App',
    'apps.justsplit.description': 'Split expenses with friends and family',
    'apps.features.expenseTracking': 'Expense tracking',
    'apps.features.groupManagement': 'Group management',
    'apps.features.settlementTracking': 'Settlement tracking',
    // Login form translations
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.signIn': 'Sign In',
    'auth.signingIn': 'Signing in...',
    'auth.signInError': 'Failed to sign in',
    'auth.signUp': 'Sign Up',
    'auth.signingUp': 'Creating account...',
    'auth.signUpSubtitle': 'Create your CyberEco account',
    'auth.fullName': 'Full Name',
    'auth.namePlaceholder': 'Enter your full name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.confirmPasswordPlaceholder': 'Confirm your password',
    'auth.passwordMismatch': 'Passwords do not match',
    'auth.or': 'or',
    'auth.show': 'Show',
    'auth.hide': 'Hide',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.continueWithFacebook': 'Continue with Facebook',
    'auth.continueWithTwitter': 'Continue with Twitter',
    'auth.noAccount': "Don't have an account? Sign Up",
    'auth.hasAccount': 'Already have an account? Sign In',
    'auth.forgotPassword': 'Forgot your password?',
    'auth.resetPassword': 'Reset Password',
    'auth.resetPasswordSubtitle': 'Enter your email address and we\'ll send you a link to reset your password.',
    'auth.sendResetLink': 'Send Reset Link',
    'auth.sendingReset': 'Sending reset link...',
    'auth.checkEmail': 'Check Your Email',
    'auth.resetEmailSent': 'We sent a password reset link to your email address.',
    'auth.backToSignIn': 'Back to Sign In',
    'auth.invalidEmail': 'Please enter a valid email address',
    // My Data translations
    'myData.subtitle': 'Manage your data across all CyberEco applications',
    'myData.overview': 'Overview',
    'myData.connections': 'App Connections',
    'myData.privacy': 'Privacy & Security',
    'myData.totalDataPoints': 'Total Data Points',
    'myData.connectedApps': 'Connected Apps',
    'myData.dataExports': 'Data Exports',
    'myData.privacyScore': 'Privacy Score',
    'myData.quickActions': 'Quick Actions',
    'myData.exportData': 'Export My Data',
    'myData.viewHistory': 'View Access History',
    'myData.privacySettings': 'Privacy Settings',
    'myData.deleteAllData': 'Delete All Data',
    'myData.active': 'Active',
    'myData.inactive': 'Inactive',
    'myData.manage': 'Manage',
    'myData.dataTypes': 'Data Types',
    'myData.permissions': 'Permissions',
    'myData.lastAccessed': 'Last accessed',
    'myData.noApps': 'No Connected Apps',
    'myData.noAppsDesc': 'Start using CyberEco apps to see your data connections here.',
    'myData.exploreApps': 'Explore Apps',
    'myData.dataPrivacy': 'Your Data Privacy',
    'myData.dataOwnership': 'Data Ownership',
    'myData.dataOwnershipDesc': 'You own all your data. CyberEco acts only as a processor.',
    'myData.dataEncryption': 'Data Encryption',
    'myData.dataEncryptionDesc': 'All data is encrypted at rest and in transit using industry standards.',
    'myData.dataPortability': 'Data Portability',
    'myData.dataPortabilityDesc': 'Export your data anytime in common formats (JSON, CSV).',
    'myData.dataRetention': 'Data Retention',
    'myData.dataRetentionDesc': 'We keep your data only as long as you need it. Delete anytime.',
    'myData.viewPrivacyPolicy': 'View Privacy Policy',
    'myData.securitySettings': 'Security Settings',
    'myData.deleteWarning': 'Data Deletion',
    'myData.deleteWarningDesc': 'Deleting your data is permanent and cannot be undone.',
    'myData.requestDeletion': 'Request Data Deletion'
  },
  es: {
    welcome: 'Bienvenido',
    home: 'Inicio',
    about: 'Acerca de',
    features: 'Características',
    contact: 'Contacto',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    language: 'Idioma',
    theme: 'Tema',
    'navigation.settings': 'Configuración',
    'theme.title': 'Tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'language.title': 'Idioma',
    'footer.tagline': 'Construyendo un futuro digital sostenible',
    'footer.features': 'Características',
    'footer.expenseSplitting': 'División de Gastos',
    'footer.groupManagement': 'Gestión de Grupos',
    'footer.realTimeSync': 'Sincronización en Tiempo Real',
    'footer.multiCurrency': 'Multi-moneda',
    'footer.resources': 'Recursos',
    'footer.userGuide': 'Guía del Usuario',
    'footer.faq': 'Preguntas Frecuentes',
    'footer.api': 'API',
    'footer.changelog': 'Registro de Cambios',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.cybereco': 'CyberEco',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'navigation.dashboard': 'Panel',
    'navigation.groups': 'Grupos',
    'navigation.events': 'Eventos',
    'navigation.expenses': 'Gastos',
    'navigation.settlements': 'Liquidaciones',
    'navigation.friends': 'Amigos',
    'navigation.profile': 'Perfil',
    'navigation.apps': 'Aplicaciones',
    'navigation.myData': 'Mis Datos',
    'navigation.signIn': 'Iniciar Sesión',
    'auth.logout': 'Cerrar Sesión',
    // Hub-specific translations in Spanish
    'hub.loading': 'Cargando...',
    'hub.welcome.title': 'Bienvenido a CyberEco Hub',
    'hub.welcome.subtitle': 'Inicia sesión para acceder a tu ecosistema digital',
    'hub.welcomeBack': '¡Bienvenido de vuelta, {name}!',
    'hub.ecosystem.subtitle': 'Tu ecosistema digital te espera',
    'hub.apps.title': 'Tus Aplicaciones',
    'hub.apps.description': 'Accede a todas tus aplicaciones CyberEco desde un hub central',
    // Footer Hub-specific translations in Spanish
    'footer.apps': 'Aplicaciones',
    'footer.allApps': 'Todas las Aplicaciones',
    'footer.marketplace': 'Mercado',
    'footer.documentation': 'Documentación',
    'footer.apiReference': 'Referencia API',
    'footer.tutorials': 'Tutoriales',
    'footer.community': 'Comunidad',
    'footer.profile': 'Perfil',
    'footer.settings': 'Configuración',
    'footer.billing': 'Facturación',
    'footer.security': 'Seguridad',
    'footer.support': 'Soporte',
    'footer.helpCenter': 'Centro de Ayuda',
    'footer.contactSupport': 'Contactar Soporte',
    'footer.status': 'Estado del Sistema',
    'footer.feedback': 'Comentarios',
    'footer.hubTagline': 'Tu puerta de entrada al ecosistema digital',
    'footer.contact': 'Contacto',
    'footer.allRightsReserved': 'Todos los derechos reservados.',
    // AppGrid translations in Spanish
    'apps.loading': 'Cargando aplicaciones...',
    'apps.launch': 'Abrir Aplicación',
    'apps.justsplit.description': 'Divide gastos con amigos y familia',
    'apps.features.expenseTracking': 'Seguimiento de gastos',
    'apps.features.groupManagement': 'Gestión de grupos',
    'apps.features.settlementTracking': 'Seguimiento de liquidaciones',
    // Login form translations in Spanish
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.emailPlaceholder': 'Ingresa tu correo electrónico',
    'auth.passwordPlaceholder': 'Ingresa tu contraseña',
    'auth.signIn': 'Iniciar Sesión',
    'auth.signingIn': 'Iniciando sesión...',
    'auth.signInError': 'Error al iniciar sesión',
    'auth.signUp': 'Registrarse',
    'auth.signingUp': 'Creando cuenta...',
    'auth.signUpSubtitle': 'Crea tu cuenta CyberEco',
    'auth.fullName': 'Nombre Completo',
    'auth.namePlaceholder': 'Ingresa tu nombre completo',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.confirmPasswordPlaceholder': 'Confirma tu contraseña',
    'auth.passwordMismatch': 'Las contraseñas no coinciden',
    'auth.or': 'o',
    'auth.show': 'Mostrar',
    'auth.hide': 'Ocultar',
    'auth.continueWithGoogle': 'Continuar con Google',
    'auth.continueWithFacebook': 'Continuar con Facebook',
    'auth.continueWithTwitter': 'Continuar con Twitter',
    'auth.noAccount': '¿No tienes cuenta? Regístrate',
    'auth.hasAccount': '¿Ya tienes cuenta? Inicia Sesión',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.resetPassword': 'Restablecer Contraseña',
    'auth.resetPasswordSubtitle': 'Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
    'auth.sendResetLink': 'Enviar Enlace de Restablecimiento',
    'auth.sendingReset': 'Enviando enlace...',
    'auth.checkEmail': 'Revisa Tu Correo',
    'auth.resetEmailSent': 'Enviamos un enlace de restablecimiento de contraseña a tu dirección de correo.',
    'auth.backToSignIn': 'Volver a Iniciar Sesión',
    'auth.invalidEmail': 'Por favor ingresa una dirección de correo válida',
    // My Data translations in Spanish
    'myData.subtitle': 'Gestiona tus datos en todas las aplicaciones de CyberEco',
    'myData.overview': 'Resumen',
    'myData.connections': 'Conexiones de Apps',
    'myData.privacy': 'Privacidad y Seguridad',
    'myData.totalDataPoints': 'Puntos de Datos Totales',
    'myData.connectedApps': 'Apps Conectadas',
    'myData.dataExports': 'Exportaciones de Datos',
    'myData.privacyScore': 'Puntuación de Privacidad',
    'myData.quickActions': 'Acciones Rápidas',
    'myData.exportData': 'Exportar Mis Datos',
    'myData.viewHistory': 'Ver Historial de Acceso',
    'myData.privacySettings': 'Configuración de Privacidad',
    'myData.deleteAllData': 'Eliminar Todos los Datos',
    'myData.active': 'Activo',
    'myData.inactive': 'Inactivo',
    'myData.manage': 'Gestionar',
    'myData.dataTypes': 'Tipos de Datos',
    'myData.permissions': 'Permisos',
    'myData.lastAccessed': 'Último acceso',
    'myData.noApps': 'Sin Apps Conectadas',
    'myData.noAppsDesc': 'Comienza a usar las apps de CyberEco para ver tus conexiones de datos aquí.',
    'myData.exploreApps': 'Explorar Apps',
    'myData.dataPrivacy': 'Tu Privacidad de Datos',
    'myData.dataOwnership': 'Propiedad de Datos',
    'myData.dataOwnershipDesc': 'Eres dueño de todos tus datos. CyberEco actúa solo como procesador.',
    'myData.dataEncryption': 'Encriptación de Datos',
    'myData.dataEncryptionDesc': 'Todos los datos están encriptados en reposo y en tránsito usando estándares de la industria.',
    'myData.dataPortability': 'Portabilidad de Datos',
    'myData.dataPortabilityDesc': 'Exporta tus datos en cualquier momento en formatos comunes (JSON, CSV).',
    'myData.dataRetention': 'Retención de Datos',
    'myData.dataRetentionDesc': 'Mantenemos tus datos solo el tiempo que los necesites. Elimínalos cuando quieras.',
    'myData.viewPrivacyPolicy': 'Ver Política de Privacidad',
    'myData.securitySettings': 'Configuración de Seguridad',
    'myData.deleteWarning': 'Eliminación de Datos',
    'myData.deleteWarningDesc': 'Eliminar tus datos es permanente y no se puede deshacer.',
    'myData.requestDeletion': 'Solicitar Eliminación de Datos'
  }
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

// Local storage key for language
const LANGUAGE_STORAGE_KEY = 'cybereco-language';

interface LanguageProviderProps {
  children: React.ReactNode;
  initialTranslations?: TranslationsMap;
}

// Function to detect language based on user location
const detectLanguageFromLocation = async (): Promise<LanguageType> => {
  try {
    // Try to get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Spanish-speaking countries/regions based on timezone
    const spanishTimezones = [
      'America/Mexico_City', 'America/Cancun', 'America/Merida', 'America/Monterrey',
      'America/Mazatlan', 'America/Chihuahua', 'America/Hermosillo', 'America/Tijuana',
      'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/Cordoba',
      'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza',
      'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta', 'America/Argentina/San_Juan',
      'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia',
      'America/La_Paz', 'America/Santiago', 'America/Bogota', 'America/Costa_Rica',
      'America/Havana', 'America/Santo_Domingo', 'America/Guayaquil', 'America/El_Salvador',
      'America/Guatemala', 'America/Tegucigalpa', 'America/Managua', 'America/Panama',
      'America/Asuncion', 'America/Lima', 'America/Montevideo', 'America/Caracas',
      'Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary'
    ];
    
    if (spanishTimezones.includes(timezone)) {
      return 'es';
    }
    
    // Try to use geolocation API as fallback
    if ('geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Use a public API to get country from coordinates
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
              );
              const data = await response.json();
              
              // Spanish-speaking countries
              const spanishCountries = [
                'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
                'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'
              ];
              
              if (spanishCountries.includes(data.countryCode)) {
                resolve('es');
              } else {
                resolve('en');
              }
            } catch {
              resolve('en');
            }
          },
          () => resolve('en'), // Fallback to English on geolocation error
          { timeout: 5000 }
        );
      });
    }
  } catch {
    // Fallback to browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  }
  
  return 'en';
};

// Function to get initial language synchronously - matches themeScript.ts logic
const getInitialLanguage = (): LanguageType => {
  if (typeof window === 'undefined') {
    return 'en'; // SSR default
  }
  
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      return savedLanguage;
    }
    
    // Check browser language (matches script logic)
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      return 'es';
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  
  return 'en';
};

// Use regular function declaration for better Next.js compatibility
export function LanguageProvider({ 
  children, 
  initialTranslations = defaultTranslations 
}: LanguageProviderProps) {
  // Merge provided translations with default ones
  const mergedTranslations = {
    en: { ...defaultTranslations.en, ...(initialTranslations?.en || {}) },
    es: { ...defaultTranslations.es, ...(initialTranslations?.es || {}) },
  };
  
  // Initialize state from local storage immediately
  const [language, setLanguageState] = useState<LanguageType>(() => getInitialLanguage());
  const [translations] = useState<TranslationsMap>(mergedTranslations);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Handle hydration and async language detection
  useEffect(() => {
    setIsHydrated(true);
    
    const initializeLanguage = async () => {
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
          // Language already set correctly from getInitialLanguage
          return;
        } else {
          // Only detect language automatically for new users (no saved preference)
          // Use a timeout to ensure this happens after hydration
          setTimeout(async () => {
            const detectedLanguage = await detectLanguageFromLocation();
            if (detectedLanguage !== language) {
              setLanguageState(detectedLanguage);
            }
          }, 100);
        }
      }
    };
    
    initializeLanguage();
  }, []);
  
  // Update localStorage and document attributes when language changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      // Save to localStorage
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch (error) {
        console.warn('Failed to save language to localStorage:', error);
      }
      
      // Only update document attributes after hydration to prevent mismatch
      document.documentElement.setAttribute('lang', language);
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language, isHydrated]);
  
  // Set language helper
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
  };
  
  // Translation helper function with hydration-safe fallback and interpolation
  const t = (key: string, variables?: Record<string, string>): string => {
    // During SSR or before hydration, always return English to prevent hydration mismatch
    let translation: string;
    if (typeof window === 'undefined' || !isHydrated) {
      const englishTranslations = translations['en'];
      translation = englishTranslations?.[key] || key;
    } else {
      const currentTranslations = translations[language];
      translation = currentTranslations?.[key] || key;
    }
    
    // Handle variable interpolation (e.g., "Welcome back, {name}!")
    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        translation = translation.replace(`{${varKey}}`, value);
      });
    }
    
    return translation;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);