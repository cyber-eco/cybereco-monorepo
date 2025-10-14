import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import { useAuth } from '@/context/AuthContext';
import { GlobalProvider } from '@cybereco/ui-components';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('JustSplit Header', () => {
  const mockPush = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const mockRouter = useRouter as jest.MockedFunction<typeof useRouter>;
    mockRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
    });
  });

  const renderHeader = () => {
    return render(
      <GlobalProvider>
        <Header />
      </GlobalProvider>
    );
  };

  it('renders navigation links', () => {
    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: null,
      signOut: mockSignOut,
    });

    renderHeader();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Groups')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Settlements')).toBeInTheDocument();
    expect(screen.getByText('Friends')).toBeInTheDocument();
  });

  it('shows user info when authenticated', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
    };

    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: mockUser,
      signOut: mockSignOut,
    });

    renderHeader();

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', mockUser.photoURL);
  });

  it('shows email when display name is not available', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: null,
      photoURL: null,
    };

    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: mockUser,
      signOut: mockSignOut,
    });

    renderHeader();

    expect(screen.getByText('test')).toBeInTheDocument(); // Split email at @
  });

  it('shows default user icon when no photo URL', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: mockUser,
      signOut: mockSignOut,
    });

    renderHeader();

    // Check for the user icon SVG
    const userSection = screen.getByText('Test User').closest('div');
    expect(userSection).toBeInTheDocument();
    expect(userSection?.querySelector('svg')).toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: mockUser,
      signOut: mockSignOut,
    });

    renderHeader();

    const logoutButton = screen.getByLabelText('Logout');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('does not show user section when not authenticated', () => {
    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: null,
      signOut: mockSignOut,
    });

    renderHeader();

    expect(screen.queryByLabelText('Logout')).not.toBeInTheDocument();
  });

  it('renders with correct mobile menu storage key', () => {
    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: null,
      signOut: mockSignOut,
    });

    const { container } = renderHeader();
    
    // The Navigation component should be rendered
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('shows logo link to home', () => {
    const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    mockAuth.mockReturnValue({
      currentUser: null,
      signOut: mockSignOut,
    });

    renderHeader();

    const logoLink = screen.getByRole('link', { name: /cybereco home/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});