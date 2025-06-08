# Action Plan: Documentation Components with Static Export

## Overview
This action plan outlines how to implement the documentation component system while maintaining Next.js static export functionality.

## Recommended Approach: Hybrid Component Strategy

### 1. Create Static-Compatible Components (Priority: High)
Instead of using complex component compositions, create simplified versions that work with static export.

#### Step 1: Create Simplified Components
```typescript
// components/StaticDocLayout.tsx
export function StaticDocLayout({ children, title, subtitle, icon }) {
  return (
    <>
      <div className="doc-header">
        {icon && <span className="doc-icon">{icon}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="doc-content">{children}</div>
    </>
  );
}
```

#### Step 2: Use Plain CSS Instead of CSS Modules
Create a global documentation styles file:
```css
/* styles/documentation.css */
.doc-header {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 3rem 2rem;
  color: white;
}

.doc-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
```

### 2. Component Implementation Strategy

#### Option A: Server Components with Client Islands (Recommended)
- Keep documentation pages as server components
- Only use 'use client' for interactive parts (tabs, code copy, etc.)
- This reduces the JavaScript bundle size

```typescript
// app/documentation/page.tsx (no 'use client')
import { StaticDocLayout } from '@/components/StaticDocLayout';

export default function DocumentationPage() {
  return (
    <StaticDocLayout title="Documentation" subtitle="Learn CyberEco">
      <DocSection title="Getting Started">
        {/* Content */}
      </DocSection>
    </StaticDocLayout>
  );
}
```

#### Option B: Dynamic Imports for Complex Components
```typescript
// Use dynamic imports for components that cause issues
import dynamic from 'next/dynamic';

const DocLayout = dynamic(() => import('./components/DocLayout'), {
  ssr: true,
  loading: () => <div>Loading...</div>
});
```

### 3. Progressive Enhancement Pattern

#### Phase 1: Static Foundation (Week 1)
1. Create basic static-compatible components
2. Implement documentation pages with minimal JavaScript
3. Ensure all pages build successfully with `next build`

#### Phase 2: Enhanced Interactivity (Week 2)
1. Add client-side features progressively
2. Implement interactive components (tabs, search) as separate client components
3. Use React.lazy() for code splitting

#### Phase 3: Optimization (Week 3)
1. Implement proper loading states
2. Add error boundaries
3. Optimize bundle size

### 4. Technical Implementation Details

#### A. File Structure
```
apps/website/src/
├── components/
│   ├── doc-static/          # Static-compatible components
│   │   ├── DocLayout.tsx
│   │   ├── DocSection.tsx
│   │   └── DocCard.tsx
│   ├── doc-interactive/     # Client-side components
│   │   ├── DocTabs.tsx
│   │   ├── DocCodeBlock.tsx
│   │   └── DocSearch.tsx
│   └── doc-styles/          # Shared styles
│       └── documentation.css
```

#### B. Component Patterns
```typescript
// Static component (works with export)
export function DocCard({ title, children, href }) {
  const Component = href ? 'a' : 'div';
  return (
    <Component href={href} className="doc-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </Component>
  );
}

// Interactive component (client-side only)
'use client';
export function DocTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  // Interactive logic
}
```

### 5. Migration Strategy

#### Step 1: Create Compatibility Layer
```typescript
// components/DocumentationLayout.tsx
import { useEffect, useState } from 'react';

export function DocumentationLayout({ children, ...props }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Use static layout on server, enhanced on client
  if (!isClient) {
    return <StaticDocLayout {...props}>{children}</StaticDocLayout>;
  }
  
  return <EnhancedDocLayout {...props}>{children}</EnhancedDocLayout>;
}
```

#### Step 2: Gradual Migration
1. Start with one documentation page
2. Test static build thoroughly
3. Roll out to other pages incrementally

### 6. Build Configuration Optimization

#### Update next.config.js
```javascript
module.exports = {
  output: 'export',
  transpilePackages: ['@cybereco/ui-components'],
  compiler: {
    // Remove unused CSS
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
};
```

### 7. Testing Strategy

#### A. Build Testing Script
```bash
#!/bin/bash
# scripts/test-static-build.sh

echo "Testing static build..."
npm run build

echo "Checking build output..."
if [ -d "out" ]; then
  echo "✅ Static build successful"
  
  # Check for specific pages
  if [ -f "out/documentation.html" ]; then
    echo "✅ Documentation page generated"
  else
    echo "❌ Documentation page missing"
  fi
else
  echo "❌ Build failed"
fi
```

#### B. Component Testing
- Test each component in isolation
- Verify static HTML generation
- Check for hydration errors

### 8. Fallback Strategies

#### If Static Export Continues to Fail:
1. **Partial Static Generation**: Use `getStaticProps` for data fetching
2. **Incremental Static Regeneration**: If moving away from full static
3. **Custom Build Script**: Use a custom webpack configuration
4. **Alternative Frameworks**: Consider Astro or Eleventy for documentation

### 9. Performance Considerations

#### Optimize for Static Export:
1. Minimize JavaScript bundle
2. Use CSS for animations instead of JS
3. Lazy load images and heavy components
4. Implement proper meta tags for SEO

### 10. Timeline

**Week 1**: 
- Create static-compatible components
- Migrate one documentation page
- Test build process

**Week 2**:
- Add interactive features
- Migrate remaining pages
- Implement error handling

**Week 3**:
- Performance optimization
- Documentation updates
- Final testing

## Conclusion

This approach maintains the benefits of static export while progressively enhancing the documentation with interactive features. The key is to start with a solid static foundation and add complexity gradually, ensuring each step maintains build compatibility.