# Documentation Pattern Examples

## How to Use Shared Documentation Styles

### Basic Page Structure

```tsx
export default function DocumentationPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="doc-page-header">
        <h1>Page Title</h1>
        <p>Page subtitle or description</p>
      </div>

      {/* Content Section */}
      <div className="doc-content-section">
        <h2 className="doc-section-title">
          <FaBook /> Section Title
        </h2>
        
        {/* Your content here */}
      </div>
    </div>
  );
}
```

### Grid Layouts

#### 3-Column Grid
```tsx
<div className="doc-grid doc-grid-3">
  <a href="/link1" className="doc-card">
    <h3>Card Title</h3>
    <p>Card description</p>
  </a>
  <a href="/link2" className="doc-card">
    <h3>Card Title</h3>
    <p>Card description</p>
  </a>
  <a href="/link3" className="doc-card">
    <h3>Card Title</h3>
    <p>Card description</p>
  </a>
</div>
```

#### Quick Start Cards
```tsx
<div className="doc-quick-start-grid">
  <a href="/docs/start" className="doc-quick-start-card">
    <span className="doc-quick-start-icon">🚀</span>
    <h3>Get Started</h3>
    <p>Begin your journey</p>
  </a>
</div>
```

### Popular Topics
```tsx
<div className="doc-popular-grid">
  <a href="/docs/topic1" className="doc-popular-card">
    <span className="doc-popular-number">1</span>
    <div>
      <h4>Popular Topic</h4>
      <p>Brief description</p>
    </div>
  </a>
</div>
```

### Code Blocks
```tsx
<div className="doc-code-block">
  <div className="doc-code-header">
    <span>JavaScript</span>
    <button>Copy</button>
  </div>
  <div className="doc-code-content">
    <pre><code>{`const example = "Hello World";`}</code></pre>
  </div>
</div>
```

### Alerts
```tsx
<div className="doc-alert doc-alert-info">
  <strong>Note:</strong> This is an informational message.
</div>

<div className="doc-alert doc-alert-warning">
  <strong>Warning:</strong> Please be careful.
</div>
```

### Tables
```tsx
<table className="doc-table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

## Complete Example Page

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBook, FaRocket } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';

export default function ExampleDocPage() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="doc-page-header">
        <h1>Documentation</h1>
        <p>Everything you need to know</p>
      </div>

      {/* Quick Start */}
      <div className="doc-content-section">
        <h2 className="doc-section-title">
          <FaRocket /> Quick Start
        </h2>
        
        <div className="doc-grid doc-grid-3">
          <Link href="/docs/intro" className="doc-card">
            <span className="doc-card-icon">📚</span>
            <h3>Introduction</h3>
            <p>Learn the basics</p>
          </Link>
          
          <Link href="/docs/setup" className="doc-card">
            <span className="doc-card-icon">⚙️</span>
            <h3>Setup</h3>
            <p>Get up and running</p>
          </Link>
          
          <Link href="/docs/tutorial" className="doc-card">
            <span className="doc-card-icon">🎓</span>
            <h3>Tutorial</h3>
            <p>Step-by-step guide</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

## Benefits of This Approach

1. **Works with Static Export**: No component import issues
2. **Simple**: Just CSS classes
3. **Consistent**: Same styles everywhere
4. **Maintainable**: Easy to update
5. **Performant**: No JavaScript overhead

## Tips

1. Always wrap content in `doc-content-section` for proper spacing
2. Use semantic HTML (h1, h2, h3) for better SEO
3. Add icons to make sections more visual
4. Use Link component for internal navigation
5. Test on mobile devices