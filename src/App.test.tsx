import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock any context providers for testing
jest.mock('./context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ThemeContext: {
    Consumer: ({ children }: any) => children({ theme: {}, toggleTheme: jest.fn() }),
  },
}));

jest.mock('./context/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LanguageContext: {
    Consumer: ({ children }: any) => children({ 
      language: 'en', 
      setLanguage: jest.fn(), 
      translations: {} 
    }),
  },
}));

test('renders without crashing', () => {
  // Basic test that just ensures the app renders without crashing
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // This assertion will always pass if the app renders
  expect(true).toBeTruthy();
});
