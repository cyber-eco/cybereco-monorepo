import React from 'react';
import { ThemeType } from '../theme';
import { LanguageType } from '../i18n';

// Mock ThemeProvider
interface MockThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeType;
  toggleTheme?: () => void;
}

export const MockThemeProvider: React.FC<MockThemeProviderProps> = ({ 
  children, 
  theme = 'light',
  toggleTheme = jest.fn()
}) => {
  const ThemeContext = React.createContext({
    theme,
    toggleTheme,
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Mock LanguageProvider
interface MockLanguageProviderProps {
  children: React.ReactNode;
  language?: LanguageType;
  setLanguage?: (lang: LanguageType) => void;
  t?: (key: string) => string;
}

export const MockLanguageProvider: React.FC<MockLanguageProviderProps> = ({ 
  children, 
  language = 'en',
  setLanguage = jest.fn(),
  t = (key: string) => key
}) => {
  const LanguageContext = React.createContext({
    language,
    setLanguage,
    t,
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Mock GlobalProvider combining both
interface MockGlobalProviderProps {
  children: React.ReactNode;
  theme?: ThemeType;
  language?: LanguageType;
}

export const MockGlobalProvider: React.FC<MockGlobalProviderProps> = ({ 
  children, 
  theme = 'light',
  language = 'en'
}) => {
  return (
    <MockThemeProvider theme={theme}>
      <MockLanguageProvider language={language}>
        {children}
      </MockLanguageProvider>
    </MockThemeProvider>
  );
};

// Mock next/navigation
export const mockUsePathname = jest.fn(() => '/');
export const mockUseRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}));

// Mock next/link component
export const MockLink: React.FC<{ href: string; children: React.ReactNode }> = ({ 
  href, 
  children,
  ...props 
}) => {
  return <a href={href} {...props}>{children}</a>;
};

// Mock localStorage
export const createLocalStorageMock = () => {
  let store: { [key: string]: string } = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };
};

// Mock window.matchMedia
export const createMatchMediaMock = (matches: boolean = false) => {
  return jest.fn().mockImplementation(query => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

// Common test IDs
export const testIds = {
  navigation: {
    container: 'navigation-container',
    logo: 'navigation-logo',
    desktopNav: 'desktop-nav',
    mobileNav: 'mobile-nav',
    mobileMenuButton: 'mobile-menu-button',
    configDropdown: 'config-dropdown',
  },
  footer: {
    container: 'footer-container',
    logo: 'footer-logo',
    section: 'footer-section',
    socialLinks: 'footer-social-links',
    copyright: 'footer-copyright',
  },
};