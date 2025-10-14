# Translation Key Naming Conventions

This document outlines the naming conventions for translation keys in the CyberEco monorepo.

## Overview

The CyberEco platform uses a namespace-based internationalization (i18n) system with consistent naming patterns across all applications.

## Key Structure

### Format
```
namespace:section.subsection.key
```

### Examples
```typescript
// Good examples
t('common:header.navigation.home')
t('documentation:guides.accountSetup.title')
t('auth:signin.form.emailLabel')
t('hub:dashboard.metrics.activeUsers')

// Bad examples - avoid these
t('homeTitle')  // Missing namespace
t('common:Home Title')  // Spaces in keys
t('auth:SignIn.Form.Email')  // Inconsistent casing
```

## Namespaces

Each translation file corresponds to a namespace:

| Namespace | File | Purpose |
|-----------|------|---------|
| `common` | common.json | Shared UI elements (header, footer, buttons) |
| `home` | home.json | Homepage content |
| `about` | about.json | About page content |
| `auth` | auth.json | Authentication pages (signin, signup, reset) |
| `hub` | hub.json | Hub application content |
| `documentation` | documentation.json | Documentation pages |
| `portfolio` | portfolio.json | Portfolio/showcase content |
| `contact` | contact.json | Contact form and information |
| `support` | support.json | Support pages |
| `help` | help.json | Help content |
| `faq` | faq.json | Frequently asked questions |
| `privacy` | privacy.json | Privacy policy |
| `terms` | terms.json | Terms of service |
| `errors` | errors.json | Error messages |

## Naming Conventions

### 1. Use camelCase for Keys
```json
{
  "accountSetup": {
    "pageTitle": "Account Setup",
    "emailLabel": "Email Address"
  }
}
```

### 2. Structure by Page/Component Hierarchy
```json
{
  "header": {
    "navigation": {
      "home": "Home",
      "about": "About"
    },
    "userMenu": {
      "profile": "Profile",
      "settings": "Settings"
    }
  }
}
```

### 3. Group Related Content
```json
{
  "forms": {
    "validation": {
      "required": "This field is required",
      "emailInvalid": "Please enter a valid email"
    },
    "buttons": {
      "submit": "Submit",
      "cancel": "Cancel"
    }
  }
}
```

### 4. Action-Based Keys for Interactive Elements
```json
{
  "actions": {
    "save": "Save",
    "delete": "Delete",
    "confirmDelete": "Are you sure you want to delete?"
  }
}
```

## Common Patterns

### Page Structure
```json
{
  "pageName": {
    "title": "Page Title",
    "subtitle": "Page subtitle or description",
    "meta": {
      "description": "SEO meta description",
      "keywords": "SEO keywords"
    }
  }
}
```

### Form Fields
```json
{
  "formName": {
    "fieldNameLabel": "Field Label",
    "fieldNamePlaceholder": "Field placeholder",
    "fieldNameHelp": "Help text for field",
    "fieldNameError": "Error message for field"
  }
}
```

### Lists and Tables
```json
{
  "tableName": {
    "headers": {
      "column1": "Column 1",
      "column2": "Column 2"
    },
    "empty": "No data available",
    "loading": "Loading..."
  }
}
```

### Status Messages
```json
{
  "status": {
    "success": "Operation successful",
    "error": "An error occurred",
    "warning": "Please note",
    "info": "Information"
  }
}
```

## Best Practices

### 1. Keep Keys Descriptive but Concise
```json
// Good
"auth:signin.form.emailLabel": "Email"

// Too verbose
"auth:signin.signinForm.userEmailAddressInputFieldLabel": "Email"
```

### 2. Use Consistent Terminology
- Use `title` for main headings
- Use `subtitle` for secondary headings
- Use `description` for longer explanatory text
- Use `label` for form field labels
- Use `placeholder` for input placeholders
- Use `help` for helper text
- Use `error` for error messages

### 3. Avoid Hard-Coding Values in Keys
```json
// Bad - specific value in key
"maxLength50Error": "Maximum 50 characters"

// Good - generic key
"maxLengthError": "Maximum {{max}} characters"
```

### 4. Use Interpolation for Dynamic Content
```json
{
  "welcome": "Welcome, {{userName}}!",
  "itemCount": "{{count}} item",
  "itemCount_plural": "{{count}} items"
}
```

### 5. Pluralization
For countable items, use the `_plural` suffix:
```json
{
  "notification": "You have {{count}} notification",
  "notification_plural": "You have {{count}} notifications"
}
```

## Component-Specific Patterns

### Navigation
```json
{
  "navigation": {
    "main": {
      "home": "Home",
      "about": "About"
    },
    "breadcrumb": {
      "separator": "/",
      "home": "Home"
    }
  }
}
```

### Modals/Dialogs
```json
{
  "modalName": {
    "title": "Modal Title",
    "body": "Modal content",
    "actions": {
      "confirm": "Confirm",
      "cancel": "Cancel"
    }
  }
}
```

### Error Handling
```json
{
  "errors": {
    "generic": "Something went wrong",
    "network": "Network error",
    "notFound": "Not found",
    "unauthorized": "Unauthorized",
    "validation": {
      "required": "Required",
      "email": "Invalid email"
    }
  }
}
```

## Migration Guide

When adding new translations:

1. **Choose the appropriate namespace** - Use existing namespaces when possible
2. **Follow the hierarchy** - Place keys in logical sections
3. **Check for existing keys** - Reuse common translations from `common` namespace
4. **Add to all locales** - Ensure translations exist for all supported languages
5. **Use TypeScript** - Import types from `@cybereco/i18n` for type safety

## Tools and Scripts

### Validation Script
```bash
npm run check-translations
```

### Add Missing Translations
```bash
node scripts/add-missing-translations.js
```

### Migration Helper
```bash
node scripts/migrate-translations.js
```

## Examples in Code

### React Component
```typescript
import { useI18n } from '@cybereco/i18n';

export function MyComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t('documentation:guides.title')}</h1>
      <p>{t('documentation:guides.description')}</p>
      <button>{t('common:actions.save')}</button>
    </div>
  );
}
```

### With Fallbacks
```typescript
// Always provide fallbacks for better developer experience
<h1>{t('documentation:guides.title') || 'Guides'}</h1>
```

### With Interpolation
```typescript
<p>{t('common:welcome', { userName: user.name })}</p>
```

## Common Mistakes to Avoid

1. **Missing namespace prefix**
   ```typescript
   // Wrong
   t('title')
   
   // Correct
   t('home:title')
   ```

2. **Inconsistent casing**
   ```typescript
   // Wrong
   t('common:Header.Title')
   
   // Correct
   t('common:header.title')
   ```

3. **Hardcoded text in components**
   ```typescript
   // Wrong
   <button>Save Changes</button>
   
   // Correct
   <button>{t('common:actions.saveChanges') || 'Save Changes'}</button>
   ```

4. **Duplicate keys across namespaces**
   ```json
   // Avoid having the same content in multiple places
   // Instead, use the common namespace for shared content
   ```

5. **Overly nested structures**
   ```json
   // Too deep
   "page.section.subsection.component.element.text"
   
   // Better
   "page.section.elementText"
   ```

By following these conventions, we ensure consistency, maintainability, and ease of translation across the entire CyberEco platform.