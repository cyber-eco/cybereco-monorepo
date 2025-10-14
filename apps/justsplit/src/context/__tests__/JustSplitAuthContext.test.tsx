import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { JustSplitAuthProvider, useAuth, useHubAuth } from '../JustSplitAuthContext';
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { generateAuthRedirectUrl, clearSharedAuthState } from '@cybereco/auth';

// Mock Firebase auth
jest.mock('../../firebase/config', () => ({
  auth: {},
  db: {}
}));

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  signInAnonymously: jest.fn(),
  updateProfile: jest.fn(),
  setPersistence: jest.fn().mockResolvedValue(undefined),
  browserLocalPersistence: 'local'
}));

// Mock auth utilities
jest.mock('@cybereco/auth', () => ({
  ...jest.requireActual('@cybereco/auth'),
  createAuthContext: () => ({
    AuthProvider: ({ children, config, createUserProfile }: any) => {
      const mockUser = {
        uid: 'test-user-123',
        email: 'test@example.com',
        displayName: 'Test User'
      };
      
      const mockUserProfile = createUserProfile ? createUserProfile(mockUser) : null;
      
      const value = {
        currentUser: mockUser,
        userProfile: mockUserProfile,
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
            React.cloneElement(child, { authContext: value })
          )}
        </div>
      );
    },
    useAuth: () => ({
      currentUser: { uid: 'test-user-123', email: 'test@example.com', displayName: 'Test User' },
      userProfile: {
        id: 'test-user-123',
        name: 'Test User',
        email: 'test@example.com',
        balance: 0,
        preferredCurrency: 'USD',
        friends: [],
        friendRequestsSent: [],
        friendRequestsReceived: [],
        hubUserId: 'test-user-123'
      },
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      signInWithProvider: jest.fn(),
      linkAccount: jest.fn(),
      resetPassword: jest.fn(),
      updateProfile: jest.fn()
    }),
    AuthContext: React.createContext({})
  }),
  generateAuthRedirectUrl: jest.fn(),
  clearSharedAuthState: jest.fn(),
  clearSharedAuth: jest.fn(),
  hasIndexedDBCorruption: jest.fn().mockReturnValue(false),
  recoverFromCorruption: jest.fn(),
  parseReturnUrl: jest.fn(),
  useSessionSync: jest.fn(),
  waitForAuth: jest.fn(),
  getSharedAuth: jest.fn(),
  subscribeToAuthStateChanges: jest.fn()
}));

// Test component that uses auth hooks
function TestComponent() {
  const auth = useAuth();
  const hubAuth = useHubAuth();
  
  return (
    <div>
      <div data-testid="user-id">{auth.userProfile?.id}</div>
      <div data-testid="user-name">{auth.userProfile?.name}</div>
      <div data-testid="is-authenticated">{hubAuth.isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="needs-hub-auth">{hubAuth.needsHubAuth ? 'true' : 'false'}</div>
    </div>
  );
}

describe('JustSplitAuthContext', () => {
  const mockHubUrl = 'http://localhost:40000';
  
  beforeEach(() => {
    // Set environment variable
    process.env.NEXT_PUBLIC_HUB_URL = mockHubUrl;
    
    // Clear all mocks
    jest.clearAllMocks();
    
    // Mock window.location
    delete (window as any).location;
    (window as any).location = {
      href: 'http://localhost:40002',
      search: '',
      pathname: '/',
      origin: 'http://localhost:40002',
      reload: jest.fn(),
      replace: jest.fn()
    };
    
    // Mock window.history
    window.history.replaceState = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should render children when no token is present', async () => {
      render(
        <JustSplitAuthProvider>
          <div data-testid="child">Child Component</div>
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });
    });

    it('should handle token in URL parameters', async () => {
      // Set token in URL
      window.location.search = '?token=test-token-123';
      
      render(
        <JustSplitAuthProvider>
          <div data-testid="child">Child Component</div>
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        // Should clean up URL
        expect(window.history.replaceState).toHaveBeenCalledWith({}, '', '/');
      });
    });

    it('should show loading state initially', () => {
      const { container } = render(
        <JustSplitAuthProvider>
          <div data-testid="child">Child Component</div>
        </JustSplitAuthProvider>
      );

      // Should show loading spinner initially
      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('User Profile Creation', () => {
    it('should create JustSplit user profile with correct fields', async () => {
      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('user-id')).toHaveTextContent('test-user-123');
        expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
      });
    });
  });

  describe('Hub Integration', () => {
    it('should redirect to Hub for authentication when needed', async () => {
      const TestAuthComponent = () => {
        const { redirectToHub } = useHubAuth();
        
        React.useEffect(() => {
          redirectToHub('signin');
        }, [redirectToHub]);
        
        return <div>Redirecting...</div>;
      };

      render(
        <JustSplitAuthProvider>
          <TestAuthComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(generateAuthRedirectUrl).toHaveBeenCalledWith(
          mockHubUrl,
          'http://localhost:40002',
          'signin'
        );
      });
    });

    it('should clear shared auth state on sign out', async () => {
      const TestSignOutComponent = () => {
        const { signOut } = useAuth();
        
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        
        return <div>Signing out...</div>;
      };

      render(
        <JustSplitAuthProvider>
          <TestSignOutComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(clearSharedAuthState).toHaveBeenCalled();
      });
    });
  });

  describe('useHubAuth Hook', () => {
    it('should indicate when user is authenticated', async () => {
      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('needs-hub-auth')).toHaveTextContent('false');
      });
    });

    it('should provide redirectToHub function', async () => {
      const TestRedirectComponent = () => {
        const { redirectToHub } = useHubAuth();
        
        return (
          <button onClick={() => redirectToHub('signup')} data-testid="redirect-button">
            Redirect to Hub
          </button>
        );
      };

      render(
        <JustSplitAuthProvider>
          <TestRedirectComponent />
        </JustSplitAuthProvider>
      );

      const button = await screen.findByTestId('redirect-button');
      act(() => {
        button.click();
      });

      expect(window.location.href).toBe(mockHubUrl);
    });
  });

  describe('Session Synchronization', () => {
    it('should set up session sync on mount', async () => {
      const mockSessionSync = require('@cybereco/auth').useSessionSync;
      
      render(
        <JustSplitAuthProvider>
          <div>Test</div>
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(mockSessionSync).toHaveBeenCalledWith(
          expect.objectContaining({
            auth,
            syncAcrossTabs: true,
            onSessionChange: expect.any(Function)
          })
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle IndexedDB corruption', async () => {
      const mockHasCorruption = require('@cybereco/auth').hasIndexedDBCorruption;
      mockHasCorruption.mockReturnValue(true);
      
      render(
        <JustSplitAuthProvider>
          <div data-testid="child">Child Component</div>
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });
    });
  });

  describe('SSO Hub Authentication Flow', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should detect and process Hub authentication from URL', async () => {
      window.location.search = '?fromHub=true';
      
      const mockSharedAuth = {
        user: {
          uid: 'hub-user-123',
          email: 'hub@example.com',
          displayName: 'Hub User',
          photoURL: 'https://example.com/photo.jpg',
          emailVerified: true
        },
        token: null,
        timestamp: Date.now()
      };

      const { waitForAuth, getSharedAuth } = require('@cybereco/auth');
      const { signInAnonymously, updateProfile } = require('firebase/auth');
      
      getSharedAuth.mockReturnValue(null);
      waitForAuth.mockResolvedValue(mockSharedAuth);
      signInAnonymously.mockResolvedValue({ user: { uid: 'anon-123' } });

      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(waitForAuth).toHaveBeenCalledWith(5000);
      });

      await waitFor(() => {
        expect(signInAnonymously).toHaveBeenCalled();
        expect(updateProfile).toHaveBeenCalledWith(
          { uid: 'anon-123' },
          {
            displayName: 'Hub User',
            photoURL: 'https://example.com/photo.jpg'
          }
        );
      });

      // Should clear URL parameters
      expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'http://localhost:40002/');
    });

    it('should check existing shared auth when not from Hub', async () => {
      const mockSharedAuth = {
        user: {
          uid: 'existing-user-123',
          email: 'existing@example.com',
          displayName: 'Existing User',
          photoURL: null,
          emailVerified: true
        },
        token: null,
        timestamp: Date.now()
      };

      const { getSharedAuth } = require('@cybereco/auth');
      const { signInAnonymously, updateProfile } = require('firebase/auth');
      
      getSharedAuth.mockReturnValue(mockSharedAuth);
      signInAnonymously.mockResolvedValue({ user: { uid: 'anon-456' } });

      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(getSharedAuth).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(signInAnonymously).toHaveBeenCalled();
        expect(updateProfile).toHaveBeenCalledWith(
          { uid: 'anon-456' },
          {
            displayName: 'Existing User',
            photoURL: null
          }
        );
      });
    });

    it('should handle no shared auth state gracefully', async () => {
      window.location.search = '?fromHub=true';
      
      const { waitForAuth } = require('@cybereco/auth');
      const { signInAnonymously } = require('firebase/auth');
      
      waitForAuth.mockResolvedValue(null);

      render(
        <JustSplitAuthProvider>
          <TestComponent />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(waitForAuth).toHaveBeenCalled();
      });

      // Should not attempt to sign in if no shared auth
      expect(signInAnonymously).not.toHaveBeenCalled();
    });

    it('should clear shared auth state on sign out', async () => {
      const { clearSharedAuth } = require('@cybereco/auth');
      
      const TestSignOut = () => {
        const { signOut } = useAuth();
        
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        
        return null;
      };

      render(
        <JustSplitAuthProvider>
          <TestSignOut />
        </JustSplitAuthProvider>
      );

      await waitFor(() => {
        expect(clearSharedAuth).toHaveBeenCalled();
      });
    });
  });
});