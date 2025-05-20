export type Language = 'en' | 'es';

export interface ThemeType {
  mode: string;
  background: string;
  backgroundAlt?: string;
  surface: string;
  primary: string;
  primaryDark?: string;
  primaryLight?: string;
  secondary: string;
  secondaryDark?: string;
  text: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success?: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  color?: string;
  image?: string;
  url?: string;
}

export interface LanguageContextType {
  language: Language;
  translations: Translations;
  changeLanguage: (lang: Language) => void;
  loading: boolean;
}

export interface Translations {
  homePage?: {
    hero?: Record<string, string>;
    features?: Record<string, string>;
    mission?: Record<string, string>;
    solutions?: Record<string, string>;
    callToAction?: Record<string, string>;
  };
  aboutPage?: Record<string, string>;
  contactPage?: Record<string, string>;
  documentationPage?: Record<string, string>;
  faqPage?: Record<string, string>;
  portfolioPage?: Record<string, string>;
  privacyPage?: Record<string, string>;
  supportPage?: Record<string, string>;
  termsPage?: Record<string, string>;
  helpPage?: Record<string, string>;
  footer?: Record<string, string>;
  common?: Record<string, string>;
  navigation?: Record<string, string>;
}
