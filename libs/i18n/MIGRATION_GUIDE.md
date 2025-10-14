# I18n Migration Guide

This guide explains how to migrate from the old LanguageContext to the new @cybereco/i18n library.

## Overview

The new i18n library provides:
- Comprehensive translation management
- Built-in pluralization support
- Date/time/number formatting
- Translation validation at build time
- Better TypeScript support
- Namespace organization

## Migration Steps

### 1. Update Imports

**Old:**
```typescript
import { useLanguage } from '@cybereco/ui-components/i18n/LanguageContext';
```

**New:**
```typescript
import { useI18n, useTranslation } from '@cybereco/i18n';
```

### 2. Update Provider

**Old:**
```tsx
import { LanguageProvider } from '@cybereco/ui-components/i18n/LanguageContext';

<LanguageProvider>
  {children}
</LanguageProvider>
```

**New:**
```tsx
import { I18nProvider } from '@cybereco/i18n';

<I18nProvider
  defaultLanguage="en"
  fallbackLanguage="en"
  supportedLanguages={['en', 'es']}
  namespaces={['common', 'auth', 'hub']}
>
  {children}
</I18nProvider>
```

### 3. Update Translation Usage

**Old:**
```typescript
const { t, language, setLanguage } = useLanguage();

// Simple translation
const text = t('welcome');

// With variables
const greeting = t('hub.welcomeBack', { name: user.name });
```

**New:**
```typescript
const { t, language, setLanguage } = useI18n();

// Simple translation (with namespace)
const text = t('common:welcome');

// With interpolation
const greeting = t('hub:welcomeBack', { params: { name: user.name } });

// Using namespace hook for cleaner code
const { t } = useTranslation('hub');
const greeting = t('welcomeBack', { params: { name: user.name } });
```

### 4. Update Translation Keys

The new system uses namespaces to organize translations. Update your keys accordingly:

**Old keys:**
- `hub.welcome.title` → `hub:welcome.title`
- `auth.signIn` → `auth:common.signIn`
- `footer.about` → `common:footer.about`

### 5. Use New Features

#### Pluralization
```typescript
// Automatically selects singular/plural form
const items = t('common:items', { count: itemCount });
// Translation: "{{count}} item|{{count}} items"
```

#### Date/Time Formatting
```typescript
const { formatDate, formatTime, formatRelativeTime } = useI18n();

// Format date
const date = formatDate(new Date(), { format: 'long' });

// Format time
const time = formatTime(new Date(), { format: 'short' });

// Relative time
const relative = formatRelativeTime(pastDate); // "2 hours ago"
```

#### Number/Currency Formatting
```typescript
const { formatNumber, formatCurrency } = useI18n();

// Format number
const num = formatNumber(1234.56); // "1,234.56"

// Format currency
const price = formatCurrency(99.99, 'USD'); // "$99.99"
```

### 6. Update Component Example

**Old Component:**
```tsx
import { useLanguage } from '@cybereco/ui-components/i18n/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t('myData.title')}</h1>
      <p>{t('myData.subtitle')}</p>
      <span>{t('myData.totalDataPoints')}: {dataCount}</span>
    </div>
  );
}
```

**New Component:**
```tsx
import { useTranslation } from '@cybereco/i18n';

function MyComponent() {
  const { t, language } = useTranslation('myData');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <span>{t('totalDataPoints', { count: dataCount })}</span>
    </div>
  );
}
```

### 7. Backward Compatibility

For gradual migration, you can use the `LanguageContextV2` wrapper:

```typescript
import { LanguageProvider, useLanguage } from '@cybereco/ui-components/i18n/LanguageContextV2';

// This provides the old API but uses the new i18n system underneath
```

## Translation File Structure

Translations are now organized by language and namespace:

```
libs/i18n/src/locales/
├── en/
│   ├── common.json    # Common translations
│   ├── auth.json      # Authentication translations
│   └── hub.json       # Hub-specific translations
└── es/
    ├── common.json
    ├── auth.json
    └── hub.json
```

## Build-Time Validation

The new system includes build-time validation:

```bash
# Validate all translations
npm run i18n:validate

# This runs automatically before build
npm run build
```

## Best Practices

1. **Use namespaces** to organize translations logically
2. **Use the namespace hook** (`useTranslation`) for cleaner code
3. **Leverage pluralization** instead of manual count checking
4. **Use formatting utilities** for dates, numbers, and currencies
5. **Keep translation keys semantic** and descriptive
6. **Test with both languages** during development

## Common Issues

### Issue: Missing translations
**Solution:** Run `npm run i18n:validate` to identify missing keys

### Issue: Interpolation not working
**Solution:** Use `params` object: `t('key', { params: { name: 'value' } })`

### Issue: Pluralization not working
**Solution:** Ensure translation uses pipe format: `"{{count}} item|{{count}} items"`

### Issue: Namespace not found
**Solution:** Ensure namespace is loaded in I18nProvider configuration

## Need Help?

- Check the [i18n library documentation](./README.md)
- Review the [translation files](./src/locales) for examples
- Run tests: `nx test i18n`