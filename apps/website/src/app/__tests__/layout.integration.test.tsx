import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ClientLayout from '../client-layout';
import { ThemeProvider, LanguageProvider } from '@cybereco/ui-components';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

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

describe('Website Layout Integration', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('renders complete page with navigation and footer', () => {
    renderWithProviders(
      <ClientLayout>
        <div data-testid="page-content">Test Page Content</div>
      </ClientLayout>
    );

    // Check header/navigation is present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cybereco/i })).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    
    // Check content area
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    
    // Check footer is present
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('theme switching works across all components', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Open config dropdown
    const configButton = screen.getByRole('button', { name: /settings/i });
    await user.click(configButton);

    // Find theme toggle buttons
    const darkThemeButton = screen.getByRole('menuitem', { name: /dark/i });
    await user.click(darkThemeButton);

    // Verify theme was changed in localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('language switching works across all components', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Open config dropdown
    const configButton = screen.getByRole('button', { name: /settings/i });
    await user.click(configButton);

    // Switch to Spanish
    const spanishButton = screen.getByRole('menuitem', { name: /español/i });
    await user.click(spanishButton);

    // Verify language was changed in localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'es');
  });

  test('navigation highlights correct active page', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/portfolio');

    renderWithProviders(
      <ClientLayout>
        <div>Portfolio Page</div>
      </ClientLayout>
    );

    const portfolioLink = screen.getByText('Solutions');
    const homeLink = screen.getByText('Home');

    expect(portfolioLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });

  test('mobile menu works correctly', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    await user.click(menuButton);

    // Check mobile navigation is visible
    const mobileNav = screen.getByRole('navigation', { hidden: false });
    expect(mobileNav).toHaveClass('open');

    // Check all links are present in mobile menu
    const allLinks = screen.getAllByText('Home');
    expect(allLinks.length).toBeGreaterThan(1); // Desktop + mobile versions
  });

  test('hub button is properly configured', () => {
    renderWithProviders(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    const hubLinks = screen.getAllByText('Hub');
    const hubButton = hubLinks[0].closest('a');

    expect(hubButton).toHaveAttribute('href', 'https://hub.cybere.co');
    expect(hubButton).toHaveAttribute('target', '_blank');
    expect(hubButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(hubButton).toHaveClass('hubButton');
  });

  test('layout maintains proper structure', () => {
    const { container } = renderWithProviders(
      <ClientLayout>
        <div className="test-content">Test Content</div>
      </ClientLayout>
    );

    // Check overall structure
    const mainContent = container.querySelector('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toContainHTML('<div class="test-content">Test Content</div>');

    // Navigation should be at the top
    const nav = screen.getByRole('navigation');
    expect(nav.parentElement).toBeInTheDocument();
  });

  test('persists user preferences across page loads', () => {
    // First load - set preferences
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'theme') return 'dark';
      if (key === 'language') return 'es';
      if (key === 'cybereco-website-menu-state') return 'false';
      return null;
    });

    renderWithProviders(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Verify preferences were loaded
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cybereco-website-menu-state');
  });
});