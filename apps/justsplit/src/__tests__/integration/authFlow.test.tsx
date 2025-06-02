import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SignIn from '../../app/auth/signin/page';
import SignUp from '../../app/auth/signup/page';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';
import { JustSplitAuthProvider, useAuth, useHubAuth } from '../../context/JustSplitAuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

// Mock auth utilities
jest.mock('@cybereco/auth', () => ({
  ...jest.requireActual('@cybereco/auth'),
  generateAuthRedirectUrl: jest.fn((hubUrl, returnUrl, action) => 
    `${hubUrl}/auth/${action}?returnUrl=${encodeURIComponent(returnUrl)}`
  )
}));

// Mock notification context
jest.mock('../../context/NotificationContext', () => ({
  useNotification: () => ({
    showNotification: jest.fn()
  })
}));

describe('Authentication Flow Integration', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn()
  };
  
  const mockUsePathname = require('next/navigation').usePathname;
  const mockHubUrl = 'http://localhost:40000';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue('/');
    process.env.NEXT_PUBLIC_HUB_URL = mockHubUrl;
    
    // Mock window.location
    delete (window as any).location;
    (window as any).location = {
      href: 'http://localhost:40002',
      origin: 'http://localhost:40002',
      assign: jest.fn()
    };
    
    jest.clearAllMocks();
  });

  describe('Sign In Flow', () => {
    it('should redirect to Hub when accessing sign in page', async () => {
      render(
        <JustSplitAuthProvider>
          <SignIn />
        </JustSplitAuthProvider>
      );

      // Should show loading state initially
      expect(screen.getByText('Authenticating...')).toBeInTheDocument();
      
      // Wait for redirect
      await waitFor(() => {
        expect(window.location.href).toBe(
          `${mockHubUrl}/auth/signin?returnUrl=${encodeURIComponent('http://localhost:40002')}`
        );
      });
    });

    it('should redirect authenticated users to home', async () => {
      // Mock authenticated user
      const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
        const mockAuthContext = {
          currentUser: { uid: 'test-123' },
          userProfile: { id: 'test-123', name: 'Test User' },
          isLoading: false,
          signIn: jest.fn(),
          signUp: jest.fn(),
          signOut: jest.fn(),
          signInWithProvider: jest.fn(),
          linkAccount: jest.fn(),
          resetPassword: jest.fn(),
          updateProfile: jest.fn()
        };
        
        return (
          <div>
            {React.Children.map(children, child => 
              React.isValidElement(child) 
                ? React.cloneElement(child as React.ReactElement<any>, { authContext: mockAuthContext })
                : child
            )}
          </div>
        );
      };

      jest.doMock('../../context/JustSplitAuthContext', () => ({
        JustSplitAuthProvider: MockAuthProvider,
        useAuth: () => ({
          currentUser: { uid: 'test-123' },
          userProfile: { id: 'test-123', name: 'Test User' },
          isLoading: false
        }),
        useHubAuth: () => ({
          isAuthenticated: true,
          needsHubAuth: false,
          redirectToHub: jest.fn()
        })
      }));

      const { SignIn: MockedSignIn } = require('../../app/auth/signin/page');
      
      render(
        <MockAuthProvider>
          <MockedSignIn />
        </MockAuthProvider>
      );

      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('Sign Up Flow', () => {
    it('should redirect to Hub for sign up', async () => {
      render(
        <JustSplitAuthProvider>
          <SignUp />
        </JustSplitAuthProvider>
      );

      // Should show loading state
      expect(screen.getByText('Creating Account...')).toBeInTheDocument();
      
      // Wait for redirect
      await waitFor(() => {
        expect(window.location.href).toBe(
          `${mockHubUrl}/auth/signup?returnUrl=${encodeURIComponent('http://localhost:40002')}`
        );
      });
    });
  });

  describe('Protected Route Flow', () => {
    it('should redirect unauthenticated users to Hub', async () => {
      mockUsePathname.mockReturnValue('/dashboard');
      
      const TestComponent = () => <div>Protected Content</div>;
      
      render(
        <JustSplitAuthProvider>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </JustSplitAuthProvider>
      );

      // Should show loading initially
      expect(screen.getByText('Authenticating with Hub...')).toBeInTheDocument();
      
      // Wait for redirect
      await waitFor(() => {
        expect(window.location.href).toBe(
          `${mockHubUrl}/auth/signin?returnUrl=${encodeURIComponent('http://localhost:40002')}`
        );
      });
    });

    it('should allow access to public paths without authentication', async () => {
      mockUsePathname.mockReturnValue('/landing');
      
      const TestComponent = () => <div data-testid="landing">Landing Page</div>;
      
      render(
        <JustSplitAuthProvider>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('landing')).toBeInTheDocument();
      });
      
      // Should not redirect
      expect(window.location.href).toBe('http://localhost:40002');
    });
  });

  describe('Token Authentication Flow', () => {
    it('should handle token in URL parameters', async () => {
      // Set token in URL
      window.location.search = '?token=test-token-123&returnUrl=/dashboard';
      window.history.replaceState = jest.fn();
      
      const TestComponent = () => {
        const { isAuthenticated } = useHubAuth();
        return <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>;
      };
      
      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        // Should clean up URL
        expect(window.history.replaceState).toHaveBeenCalledWith(
          {}, 
          '', 
          '/?returnUrl=/dashboard'
        );
      });
    });
  });

  describe('Sign Out Flow', () => {
    it('should clear auth state and redirect to Hub on sign out', async () => {
      const mockClearSharedAuthState = jest.fn();
      
      jest.doMock('@cybereco/auth', () => ({
        ...jest.requireActual('@cybereco/auth'),
        clearSharedAuthState: mockClearSharedAuthState
      }));
      
      const TestComponent = () => {
        const { signOut } = useAuth();
        
        return (
          <button onClick={signOut} data-testid="sign-out">
            Sign Out
          </button>
        );
      };
      
      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      const signOutButton = await screen.findByTestId('sign-out');
      fireEvent.click(signOutButton);

      await waitFor(() => {
        expect(mockClearSharedAuthState).toHaveBeenCalled();
        expect(window.location.href).toBe(mockHubUrl);
      });
    });
  });

  describe('Permission Checks', () => {
    it('should check app permissions after authentication', async () => {
      const { usePermissions } = require('@cybereco/auth');
      
      const TestComponent = () => {
        const { userProfile } = useAuth();
        const { hasAccess, hasFeature } = usePermissions({
          appId: 'justsplit',
          user: userProfile
        });
        
        return (
          <div>
            <div data-testid="has-access">{hasAccess ? 'Yes' : 'No'}</div>
            <div data-testid="has-expense-tracking">
              {hasFeature('expense-tracking') ? 'Yes' : 'No'}
            </div>
          </div>
        );
      };
      
      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      // Initially no access (not authenticated)
      expect(screen.getByTestId('has-access')).toHaveTextContent('No');
      expect(screen.getByTestId('has-expense-tracking')).toHaveTextContent('No');
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors gracefully', async () => {
      // Mock auth error
      const mockError = new Error('Authentication failed');
      
      jest.doMock('../../context/JustSplitAuthContext', () => ({
        JustSplitAuthProvider: ({ children }: { children: React.ReactNode }) => {
          throw mockError;
        }
      }));
      
      // Should not crash the app
      expect(() => {
        render(
          <JustSplitAuthProvider>
            <div>Test</div>
          </JustSplitAuthProvider>
        );
      }).not.toThrow();
    });
  });
});