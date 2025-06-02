import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { ThemeProvider, LanguageProvider } from '@cybereco/ui-components';
import { AuthContext } from '../../AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Helper function to render with providers
const renderWithProviders = (ui: React.ReactElement, authValue = {}) => {
  const defaultAuthValue = {
    user: null,
    loading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    ...authValue
  };

  return render(
    <AuthContext.Provider value={defaultAuthValue}>
      <ThemeProvider>
        <LanguageProvider>
          {ui}
        </LanguageProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

describe('Hub Header', () => {
  test('renders navigation with hub-specific links', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('shows sign in button when user is not authenticated', () => {
    renderWithProviders(<Header />);
    
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/auth/signin');
    expect(signInButton).toHaveClass('signInButton');
  });

  test('shows user avatar when authenticated', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg'
    };
    
    renderWithProviders(<Header />, { user: mockUser });
    
    const userButton = screen.getByText('Test User').closest('a');
    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveAttribute('href', '/profile');
    expect(userButton).toHaveClass('userButton');
    
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  test('shows user icon when authenticated but no photo', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User'
    };
    
    renderWithProviders(<Header />, { user: mockUser });
    
    const userButton = screen.getByText('Test User');
    expect(userButton).toBeInTheDocument();
    // Check for FaUser icon by looking for the avatar container
    const avatarContainer = userButton.closest('a')?.querySelector('.userAvatar');
    expect(avatarContainer).toBeInTheDocument();
  });

  test('falls back to email when no display name', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com'
    };
    
    renderWithProviders(<Header />, { user: mockUser });
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('includes config dropdown', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  test('uses hub-specific mobile menu storage key', () => {
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
    
    expect(mockGetItem).toHaveBeenCalledWith('cybereco-hub-menu-state');
  });

  test('highlights active link based on current path', () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/apps');
    
    renderWithProviders(<Header />);
    
    const appsLink = screen.getByText('Apps');
    const dashboardLink = screen.getByText('Dashboard');
    
    expect(appsLink).toHaveClass('active');
    expect(dashboardLink).not.toHaveClass('active');
  });
});