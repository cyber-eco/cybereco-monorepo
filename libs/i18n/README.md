# @cybereco/i18n

Comprehensive internationalization (i18n) library for the CyberEco monorepo, providing translation management, pluralization, and formatting utilities.

## Features

- 🌐 **Multi-language support** - Currently supports English and Spanish with easy extension
- 📦 **Namespace organization** - Logical grouping of translations
- 🔢 **Smart pluralization** - Automatic plural form selection based on locale rules
- 📅 **Date/time formatting** - Locale-aware date and time formatting
- 💰 **Number/currency formatting** - Proper number and currency display
- 🔄 **Interpolation** - Variable substitution in translations
- ✅ **Build-time validation** - Catch missing translations before deployment
- 🚀 **React integration** - Hooks and context providers for React apps
- 📝 **TypeScript support** - Full type safety for translations

## Installation

The library is already available in the monorepo. Import it in your app:

```typescript
import { I18nProvider, useI18n, useTranslation } from '@cybereco/i18n';
```

## Quick Start

### 1. Wrap your app with I18nProvider

```tsx
import { I18nProvider } from '@cybereco/i18n';

function App() {
  return (
    <I18nProvider
      defaultLanguage="en"
      fallbackLanguage="en"
      supportedLanguages={['en', 'es']}
      namespaces={['common', 'auth', 'hub']}
    >
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Use translations in components

```tsx
import { useTranslation } from '@cybereco/i18n';

function MyComponent() {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { params: { name: 'John' } })}</p>
    </div>
  );
}
```

## API Reference

### I18nProvider

Provider component that initializes the i18n system.

```tsx
<I18nProvider
  defaultLanguage="en"              // Default language
  fallbackLanguage="en"             // Fallback when translation missing
  supportedLanguages={['en', 'es']} // Available languages
  namespaces={['common', 'auth']}   // Translation namespaces to load
  loadPath="/locales/{{lng}}/{{ns}}.json" // Optional: custom load path
>
```

### useI18n

Main hook for accessing i18n functionality.

```typescript
const {
  language,        // Current language
  setLanguage,     // Change language
  t,               // Translation function
  formatDate,      // Date formatter
  formatTime,      // Time formatter
  formatNumber,    // Number formatter
  formatCurrency,  // Currency formatter
  isLoading,       // Loading state
  error,           // Error state
} = useI18n();
```

### useTranslation

Namespace-specific translation hook.

```typescript
const { t } = useTranslation('auth');

// Now you can use keys without namespace prefix
t('signIn');  // Instead of t('auth:signIn')
```

### Translation Function (t)

```typescript
// Basic translation
t('common:welcome');

// With namespace hook
const { t } = useTranslation('common');
t('welcome');

// With interpolation
t('greeting', { params: { name: 'John' } });
// Translation: "Hello, {{name}}!"

// With pluralization
t('items', { count: 5 });
// Translation: "{{count}} item|{{count}} items"

// With default value
t('missing.key', { defaultValue: 'Fallback text' });

// With context (e.g., gender)
t('friend', { context: 'male' });
// Looks for: "friend_male"
```

### Formatting Functions

```typescript
// Date formatting
formatDate(new Date(), { format: 'short' });  // "1/15/24"
formatDate(new Date(), { format: 'long' });   // "January 15, 2024"

// Time formatting
formatTime(new Date(), { format: 'short' });  // "10:30 AM"

// Number formatting
formatNumber(1234.56);                         // "1,234.56"
formatNumber(0.42, { style: 'percent' });      // "42%"

// Currency formatting
formatCurrency(99.99, 'USD');                  // "$99.99"
formatCurrency(99.99, 'EUR');                  // "€99.99"
```

## Translation File Structure

Translations are organized by language and namespace:

```
libs/i18n/src/locales/
├── en/
│   ├── common.json     # Common UI elements
│   ├── auth.json       # Authentication strings
│   └── hub.json        # Hub application strings
└── es/
    ├── common.json
    ├── auth.json
    └── hub.json
```

### Example Translation File

```json
{
  "welcome": "Welcome",
  "greeting": "Hello, {{name}}!",
  "items": "{{count}} item|{{count}} items",
  "nested": {
    "key": "Nested value"
  },
  "friend": "Friend",
  "friend_male": "Male friend",
  "friend_female": "Female friend"
}
```

## Pluralization Rules

The library includes pluralization rules for multiple languages:

- **English/Spanish**: singular (1) | plural (other)
- **French**: singular (0,1) | plural (other)
- **Russian**: one | few | many
- **Japanese/Chinese**: no pluralization

## Build-Time Validation

Validate translations during build:

```bash
# Run validation
npm run i18n:validate

# Automatically runs before build
npm run build
```

Validation checks for:
- Missing translations across languages
- Invalid interpolation syntax
- Inconsistent plural forms
- Malformed JSON files

## Advanced Usage

### Custom Interpolation

```typescript
// Default uses {{variable}} syntax
t('greeting', { params: { name: 'John' } });

// Custom syntax in I18nProvider
<I18nProvider
  interpolation={{
    prefix: '${',
    suffix: '}'
  }}
>
```

### Language Detection

```typescript
import { useLanguageDetector } from '@cybereco/i18n';

function App() {
  const detectLanguage = useLanguageDetector(['en', 'es']);
  const detectedLang = detectLanguage(); // Based on browser/location
}
```

### Dynamic Namespace Loading

```typescript
import { loadNamespaceAsync } from '@cybereco/i18n';

// Load namespace on demand
const translations = await loadNamespaceAsync('es', 'specialized');
```

### Relative Time Formatting

```typescript
const { formatRelativeTime } = useI18n();

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
formatRelativeTime(yesterday); // "yesterday" or "ayer"
```

### List Formatting

```typescript
const { formatList } = useI18n();

formatList(['Apple', 'Banana', 'Orange']); // "Apple, Banana, and Orange"
formatList(['Rojo', 'Verde'], 'disjunction'); // "Rojo o Verde"
```

## Best Practices

1. **Use semantic keys**: `auth.errors.invalidPassword` not `error1`
2. **Group related translations**: Use namespaces and nested objects
3. **Include context in keys**: `button.save` vs just `save`
4. **Avoid HTML in translations**: Use interpolation for dynamic content
5. **Test all languages**: Ensure UI works in all supported languages
6. **Use pluralization**: Don't concatenate counts manually
7. **Validate regularly**: Run validation in CI/CD pipeline

## Extending Language Support

To add a new language:

1. Create locale files:
   ```
   libs/i18n/src/locales/fr/common.json
   libs/i18n/src/locales/fr/auth.json
   ```

2. Add pluralization rule (if needed):
   ```typescript
   // libs/i18n/src/pluralization.ts
   pluralizationRules.fr = (count) => { /* ... */ };
   ```

3. Update supported languages:
   ```tsx
   <I18nProvider supportedLanguages={['en', 'es', 'fr']}>
   ```

4. Run validation:
   ```bash
   npm run i18n:validate
   ```

## Troubleshooting

### Translations not updating
- Clear browser cache
- Check namespace is loaded
- Verify translation key exists

### Interpolation not working
- Use `params` object: `{ params: { key: value } }`
- Check for typos in variable names

### Build validation failing
- Run `npm run i18n:validate` for details
- Check for missing translations
- Verify JSON syntax

## Contributing

When adding new features:
1. Add translations to all language files
2. Run validation before committing
3. Update tests for new functionality
4. Document new features in this README