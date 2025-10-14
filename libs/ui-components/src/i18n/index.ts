// Export the new i18n integration that uses @cybereco/i18n
export { LanguageProvider, useLanguage, useI18n, useTranslation, type LanguageType } from './LanguageContextV2';

// Keep the old exports for backward compatibility
export type { Translations, TranslationsMap } from './LanguageContext';

export { LanguageSelector } from './LanguageSelector';