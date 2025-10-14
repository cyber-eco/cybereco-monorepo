import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth, useHubAuth } from '../../../context/JustSplitAuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock auth context
jest.mock('../../../context/JustSplitAuthContext', () => ({
  useAuth: jest.fn(),
  useHubAuth: jest.fn(),
}));

// Mock window.location
delete (window as any).location;
window.location = {
  href: 'http://localhost:40002',
  search: '',
  pathname: '/',
} as any;

describe('ProtectedRoute', () => {
  const mockRouter = { push: jest.fn() };
  const mockRedirectToHub = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/');
    (useHubAuth as jest.Mock).mockReturnValue({
      redirectToHub: mockRedirectToHub,
      isAuthenticated: false,
      needsHubAuth: true,
    });
    
    window.location.search = '';
    window.location.href = 'http://localhost:40002';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Authentication checks', () => {
    it('should show loading state while checking auth', () => {
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: true,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('should render children when user is authenticated', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: { uid: 'user-123' },
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
      
      expect(mockRedirectToHub).not.toHaveBeenCalled();
    });

    it('should redirect to Hub when no user and not loading', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      // Wait for auth check to complete
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(mockRedirectToHub).toHaveBeenCalledWith('signin');
      });
    });
  });

  describe('Public paths', () => {
    const publicPaths = ['/landing', '/auth/signin', '/auth/signup', '/about', '/help'];

    publicPaths.forEach(path => {
      it(`should not redirect on public path: ${path}`, async () => {
        (usePathname as jest.Mock).mockReturnValue(path);
        (useAuth as jest.Mock).mockReturnValue({
          currentUser: null,
          isLoading: false,
        });

        render(
          <ProtectedRoute>
            <div data-testid="public-content">Public Content</div>
          </ProtectedRoute>
        );

        await waitFor(() => {
          expect(screen.getByTestId('public-content')).toBeInTheDocument();
        });

        expect(mockRedirectToHub).not.toHaveBeenCalled();
      });
    });
  });

  describe('Hub SSO flow', () => {
    it('should wait for Hub auth when fromHub=true', async () => {
      window.location.search = '?fromHub=true';
      
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      // Should show loading state for Hub auth
      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();
      
      // Should not redirect immediately
      expect(mockRedirectToHub).not.toHaveBeenCalled();

      // Fast forward past auth timeout
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      // After timeout, should check auth state
      await waitFor(() => {
        expect(mockRedirectToHub).toHaveBeenCalledWith('signin');
      });
    });

    it('should show content when Hub auth succeeds', async () => {
      window.location.search = '?fromHub=true';
      
      // Start with no user
      const { rerender } = render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      // Should show loading
      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();

      // Simulate successful auth after 2 seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Update auth state
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: { uid: 'hub-user-123' },
        isLoading: false,
      });

      rerender(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });

      expect(mockRedirectToHub).not.toHaveBeenCalled();
    });

    it('should not process Hub auth multiple times', () => {
      window.location.search = '?fromHub=true';
      
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      const { rerender } = render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      // First render sets up Hub auth processing
      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();

      // Rerender should not restart the process
      rerender(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      // Should still show loading
      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle missing pathname gracefully', async () => {
      (usePathname as jest.Mock).mockReturnValue(null);
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(mockRedirectToHub).toHaveBeenCalledWith('signin');
      });
    });

    it('should prevent redirect loops', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      );

      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(mockRedirectToHub).toHaveBeenCalledTimes(1);
      });

      // Rerender multiple times
      for (let i = 0; i < 5; i++) {
        act(() => {
          jest.advanceTimersByTime(100);
        });
      }

      // Should still only have redirected once
      expect(mockRedirectToHub).toHaveBeenCalledTimes(1);
    });

    it('should handle window undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      (useAuth as jest.Mock).mockReturnValue({
        currentUser: { uid: 'user-123' },
        isLoading: false,
      });

      expect(() => {
        render(
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        );
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe('Loading states', () => {
    it('should show appropriate loading message based on context', () => {
      window.location.search = '?fromHub=true';
      
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: false,
      });

      render(
        <ProtectedRoute>
          <div>Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();
    });

    it('should show generic loading when not from Hub', () => {
      (useAuth as jest.Mock).mockReturnValue({
        currentUser: null,
        isLoading: true,
      });

      render(
        <ProtectedRoute>
          <div>Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Authenticating with Hub...')).not.toBeInTheDocument();
    });
  });
});