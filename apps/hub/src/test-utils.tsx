import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, LanguageProvider } from '@cybereco/ui-components';

// Mock providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
};

export const customRender = (ui: React.ReactElement, options = {}) => 
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };