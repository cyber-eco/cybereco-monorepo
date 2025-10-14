'use client';

import { useI18n } from '@cybereco/i18n';
import { useEffect, useState } from 'react';

export default function TestSimpleTranslationPage() {
  const { t, language, setLanguage } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [, forceUpdate] = useState(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Force re-render when language changes
  useEffect(() => {
    forceUpdate(prev => prev + 1);
  }, [language]);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  const handleLanguageChange = (newLang: 'en' | 'es') => {
    console.log('Changing language from', language, 'to', newLang);
    setLanguage(newLang);
  };
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Simple Translation Test</h1>
      <p>Current Language: <strong>{language}</strong></p>
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => handleLanguageChange('en')}
          style={{ 
            padding: '0.5rem 1rem', 
            marginRight: '1rem',
            background: language === 'en' ? '#4CAF50' : '#ccc',
            color: language === 'en' ? 'white' : 'black'
          }}
        >
          English
        </button>
        <button 
          onClick={() => handleLanguageChange('es')}
          style={{ 
            padding: '0.5rem 1rem',
            background: language === 'es' ? '#4CAF50' : '#ccc',
            color: language === 'es' ? 'white' : 'black'
          }}
        >
          Español
        </button>
      </div>
      
      <h2>Direct Translation Test:</h2>
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f0f0' }}>
        <p><strong>Key:</strong> common:philosophyPage.title</p>
        <p><strong>Result:</strong> {t('common:philosophyPage.title')}</p>
      </div>
      
      <h2>Multiple Translations:</h2>
      <div style={{ padding: '1rem', background: '#f0f0f0' }}>
        <p>1. {t('common:philosophyPage.title')}</p>
        <p>2. {t('common:philosophyPage.subtitle')}</p>
        <p>3. {t('common:philosophyPage.manifestoTitle')}</p>
        <p>4. {t('common:philosophyPage.principlesSectionTitle')}</p>
      </div>
      
      <h2>Debug Info:</h2>
      <pre style={{ background: '#e0e0e0', padding: '1rem', overflow: 'auto' }}>
        {JSON.stringify({
          currentLanguage: language,
          localStorage: typeof window !== 'undefined' ? localStorage.getItem('cybereco-language') : null,
          timestamp: new Date().toISOString()
        }, null, 2)}
      </pre>
    </div>
  );
}