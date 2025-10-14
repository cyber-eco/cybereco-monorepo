import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock document
const documentMock = {
  documentElement: {
    setAttribute: jest.fn(),
  },
};

// Mock navigator
const navigatorMock = {
  language: 'en-US',
};

// Mock window properties properly
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, 'document', {
  value: documentMock,
  writable: true,
});

Object.defineProperty(window, 'navigator', {
  value: navigatorMock,
  writable: true,
});

// Test component that uses language context
function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translated-dashboard">{t('dashboard')}</span>
      <span data-testid="translated-welcome">{t('welcome')}</span>
      <button data-testid="set-english" onClick={() => setLanguage('en')}>
        Set English
      </button>
      <button data-testid="set-spanish" onClick={() => setLanguage('es')}>
        Set Spanish
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    navigatorMock.language = 'en-US';
  });

  it('should provide default English language', async () => {
    await act(async () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated-dashboard')).toHaveTextContent('Dashboard');
    expect(screen.getByTestId('translated-welcome')).toHaveTextContent('Fair expense splitting, made simple.');
  });

  it('should detect Spanish from browser language', async () => {
    navigatorMock.language = 'es-ES';

    await act(async () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('translated-dashboard')).toHaveTextContent('Panel');
    expect(screen.getByTestId('translated-welcome')).toHaveTextContent('División justa de gastos, hecha simple.');
  });

  it('should load saved language from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('es');

    await act(async () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('translated-dashboard')).toHaveTextContent('Panel');
  });

  it('should change language when setLanguage is called', async () => {
    await act(async () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('set-spanish'));
    });

    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('translated-dashboard')).toHaveTextContent('Panel');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('justsplit-language', 'es');
    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'es');
  });

  it('should return key for unknown translation', async () => {
    await act(async () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    const { t } = screen.getByTestId('current-language').closest('div')!.__reactInternalInstance?.return?.type === TestComponent 
      ? {} as any // This is just for type checking, actual t function tested below
      : {} as any;

    // Test unknown key by rendering a component that uses it
    function TestUnknownKey() {
      const { t } = useLanguage();
      return <span data-testid="unknown-key">{t('unknownKey')}</span>;
    }

    render(
      <LanguageProvider>
        <TestUnknownKey />
      </LanguageProvider>
    );

    expect(screen.getByTestId('unknown-key')).toHaveTextContent('unknownKey');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    consoleSpy.mockRestore();
  });
});