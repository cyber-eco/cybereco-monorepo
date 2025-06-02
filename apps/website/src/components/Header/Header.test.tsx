import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { ThemeProvider, LanguageProvider } from '@cybereco/ui-components';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Helper function to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe('Website Header', () => {
  test('uses shared Navigation with website config', () => {
    renderWithProviders(<Header />);
    
    // Check that navigation is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Check for website-specific links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  test('passes correct navigation links', () => {
    renderWithProviders(<Header />);
    
    const homeLink = screen.getByText('Home');
    const solutionsLink = screen.getByText('Solutions');
    const docsLink = screen.getByText('Documentation');
    const aboutLink = screen.getByText('About Us');
    const helpLink = screen.getByText('Help');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(solutionsLink).toHaveAttribute('href', '/portfolio');
    expect(docsLink).toHaveAttribute('href', '/documentation');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(helpLink).toHaveAttribute('href', '/help');
  });

  test('includes Hub action button', () => {
    renderWithProviders(<Header />);
    
    // The hub button should be rendered
    const hubLinks = screen.getAllByText('Hub');
    expect(hubLinks.length).toBeGreaterThan(0);
    
    // Find the actual hub button (not the text inside)
    const hubButton = hubLinks[0].closest('a');
    expect(hubButton).toHaveAttribute('href', 'https://hub.cybere.co');
    expect(hubButton).toHaveAttribute('target', '_blank');
    expect(hubButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('maintains all previous functionality', () => {
    renderWithProviders(<Header />);
    
    // Config dropdown should be present
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    
    // Mobile menu button should be present (though may be hidden by CSS)
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    
    // Logo should be present
    expect(screen.getByRole('link', { name: /cybereco/i })).toBeInTheDocument();
  });

  test('uses website-specific mobile menu storage key', () => {
    const mockGetItem = jest.fn();
    const mockSetItem = jest.fn();
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      },
      writable: true,
    });
    
    renderWithProviders(<Header />);
    
    // Check that it tries to read the website-specific key
    expect(mockGetItem).toHaveBeenCalledWith('cybereco-website-menu-state');
  });
});