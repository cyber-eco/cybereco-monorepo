import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ClientLayout from '../client-layout';
import { AuthContext } from '../../components/AuthContext';

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

// Helper function to render with auth context
const renderWithAuth = (ui: React.ReactElement, authValue = {}) => {
  const defaultAuthValue = {
    user: null,
    loading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    ...authValue
  };

  return render(
    <AuthContext.Provider value={defaultAuthValue}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('Hub Layout Integration', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('renders complete layout with navigation and footer', () => {
    renderWithAuth(
      <ClientLayout>
        <div data-testid="page-content">Test Hub Content</div>
      </ClientLayout>
    );

    // Check header/navigation is present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cybereco/i })).toBeInTheDocument();
    
    // Check hub navigation links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // Check content area
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    
    // Check footer is present
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('CyberEco Hub')).toBeInTheDocument();
  });

  test('shows user info in header when authenticated', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg'
    };

    renderWithAuth(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>,
      { user: mockUser }
    );

    // User button should show in header
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  test('shows sign in button when not authenticated', () => {
    renderWithAuth(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Sign in button should show in header
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/auth/signin');
  });

  test('theme switching works across all components', async () => {
    const user = userEvent.setup();
    
    renderWithAuth(
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
    
    renderWithAuth(
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

  test('footer shows hub-specific links', () => {
    renderWithAuth(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Check hub-specific footer sections
    expect(screen.getByRole('heading', { name: /apps/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /resources/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /account/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /support/i })).toBeInTheDocument();

    // Check specific links
    expect(screen.getByText('JustSplit')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
  });

  test('navigation highlights correct active page', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/apps');

    renderWithAuth(
      <ClientLayout>
        <div>Apps Page</div>
      </ClientLayout>
    );

    const appsLink = screen.getByText('Apps');
    const dashboardLink = screen.getByText('Dashboard');

    expect(appsLink).toHaveClass('active');
    expect(dashboardLink).not.toHaveClass('active');
  });

  test('mobile menu works correctly', async () => {
    const user = userEvent.setup();
    
    renderWithAuth(
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
    const allDashboardLinks = screen.getAllByText('Dashboard');
    expect(allDashboardLinks.length).toBeGreaterThan(1); // Desktop + mobile versions
  });

  test('layout maintains proper structure', () => {
    const { container } = renderWithAuth(
      <ClientLayout>
        <div className="test-content">Test Content</div>
      </ClientLayout>
    );

    // Check overall structure
    const layoutContainer = container.querySelector('.layoutContainer');
    expect(layoutContainer).toBeInTheDocument();
    
    const mainContent = container.querySelector('.mainContent');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toContainHTML('<div class="test-content">Test Content</div>');
  });

  test('persists user preferences across page loads', () => {
    // First load - set preferences
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'theme') return 'dark';
      if (key === 'language') return 'es';
      if (key === 'cybereco-hub-menu-state') return 'false';
      return null;
    });

    renderWithAuth(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );

    // Verify preferences were loaded
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cybereco-hub-menu-state');
  });
});