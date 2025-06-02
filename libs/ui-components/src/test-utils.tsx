import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';

// Custom render with all providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Mock router for navigation tests
export const mockRouter = {
  pathname: '/',
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

// Mock next/navigation
export const mockUsePathname = jest.fn(() => '/');
export const mockUseRouter = jest.fn(() => mockRouter);

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
export { renderWithProviders as render };