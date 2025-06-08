'use client';

import { useI18n } from '@cybereco/i18n';
import { useEffect, useState } from 'react';

export default function TestPhilosophyTranslationPage() {
  const { t, language, setLanguage } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Philosophy Translation Test</h1>
      <p>Current Language: <strong>{language}</strong></p>
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => {
            setLanguage('en');
          }}
          style={{ 
            padding: '0.5rem 1rem', 
            marginRight: '1rem',
            background: language === 'en' ? '#4CAF50' : '#ccc'
          }}
        >
          English
        </button>
        <button 
          onClick={() => {
            setLanguage('es');
          }}
          style={{ 
            padding: '0.5rem 1rem',
            background: language === 'es' ? '#4CAF50' : '#ccc'
          }}
        >
          Español
        </button>
      </div>
      
      <h2>Philosophy Page Translations:</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Key</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Translation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:philosophyPage.title</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:philosophyPage.title')}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:philosophyPage.subtitle</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:philosophyPage.subtitle')}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:philosophyPage.manifestoTitle</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:philosophyPage.manifestoTitle')}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:philosophyPage.manifestoQuote</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd', maxWidth: '500px' }}>{t('common:philosophyPage.manifestoQuote')}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>common:philosophyPage.principlesSectionTitle</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('common:philosophyPage.principlesSectionTitle')}</td>
          </tr>
        </tbody>
      </table>
      
      <h2 style={{ marginTop: '2rem' }}>Documentation Translations (for comparison):</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Key</th>
            <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #ddd' }}>Translation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>documentation:documentationPage.title</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('documentation:documentationPage.title')}</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>documentation:documentationPage.philosophyTitle</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{t('documentation:documentationPage.philosophyTitle')}</td>
          </tr>
        </tbody>
      </table>
      
      <h2 style={{ marginTop: '2rem' }}>Debug Info:</h2>
      <pre style={{ background: '#f0f0f0', padding: '1rem', overflow: 'auto' }}>
        {JSON.stringify({
          currentLanguage: language,
          localStorage: typeof window !== 'undefined' ? localStorage.getItem('cybereco-language') : null,
          hasTranslations: {
            title: t('common:philosophyPage.title') !== 'common:philosophyPage.title',
            subtitle: t('common:philosophyPage.subtitle') !== 'common:philosophyPage.subtitle'
          }
        }, null, 2)}
      </pre>
    </div>
  );
}