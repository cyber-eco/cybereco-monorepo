'use client';

import React from 'react';
import { useI18n } from '@cybereco/i18n';

export default function TestTranslation() {
  const { language, setLanguage, t } = useI18n();
  const [renderCount, setRenderCount] = React.useState(0);

  // Force re-render when language changes
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [language]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Translation Test Page</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>Current Language:</strong> {language}</p>
        <p><strong>Render Count:</strong> {renderCount}</p>
        <p><strong>LocalStorage Language:</strong> {typeof window !== 'undefined' ? localStorage.getItem('cybereco-language') : 'N/A'}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Language Switcher</h2>
        <button 
          onClick={() => setLanguage('en')}
          style={{ 
            padding: '0.5rem 1rem', 
            marginRight: '1rem',
            background: language === 'en' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('es')}
          style={{ 
            padding: '0.5rem 1rem',
            background: language === 'es' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Español
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Translations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Key</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>home:homePage.hero.title</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('home:homePage.hero.title')}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>home:homePage.hero.subtitle</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('home:homePage.hero.subtitle')}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:navigation.home</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:navigation.home')}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:navigation.portfolio</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:navigation.portfolio')}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>about:aboutPage.title</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('about:aboutPage.title')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#e8f4f8', borderRadius: '8px' }}>
        <h3>Debug Info</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{JSON.stringify({
  'window.__cybereco_i18n exists': typeof window !== 'undefined' && !!(window as any).__cybereco_i18n,
  'window.__cybereco_current_i18n exists': typeof window !== 'undefined' && !!(window as any).__cybereco_current_i18n,
  'current i18n context': typeof window !== 'undefined' && (window as any).__cybereco_current_i18n ? {
    language: (window as any).__cybereco_current_i18n.language,
    't function exists': typeof (window as any).__cybereco_current_i18n.t === 'function',
    'setLanguage function exists': typeof (window as any).__cybereco_current_i18n.setLanguage === 'function'
  } : null
}, null, 2)}
        </pre>
      </div>
    </div>
  );
}