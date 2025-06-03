import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import * as firebaseConfig from '@cybereco/firebase-config';
import * as authLib from '@cybereco/auth';
import { User } from 'firebase/auth';

// Mock Firebase modules
jest.mock('@cybereco/firebase-config', () => ({
  getHubAuth: jest.fn(),
  getHubFirestore: jest.fn(),
  initializeFirebase: jest.fn(),
}));

jest.mock('@cybereco/auth', () => ({
  createAuthContext: jest.fn(() => ({
    AuthProvider: ({ children, config, createUserProfile, onUserProfileLoaded }: any) => {
      // Simulate auth provider behavior
      React.useEffect(() => {
        // Simulate user load
        const mockFirebaseUser = {
          uid: 'test-user-123',
          email: 'test@example.com',
          displayName: 'Test User',
          photoURL: 'https://example.com/photo.jpg',
        };
        
        const profile = createUserProfile(mockFirebaseUser);
        onUserProfileLoaded?.(profile);
      }, []);
      
      return <div data-testid="base-auth-provider">{children}</div>;
    },
    useAuth: jest.fn(() => ({
      userProfile: {
        id: 'test-user-123',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/photo.jpg',
      },
      currentUser: { uid: 'test-user-123' } as any,
      isLoading: false,
      signOut: jest.fn(),
    })),
    AuthContext: React.createContext({}),
  })),
  useSessionSync: jest.fn(),
  clearSharedAuthState: jest.fn(),
  useCrossOriginAuth: jest.fn(),
  saveSharedAuthState: jest.fn(),
  BaseUser: {},
  type: {},
}));

// Test component to consume auth context
const TestAuthConsumer = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="user-id">{auth.userProfile?.id}</div>
      <div data-testid="user-name">{auth.userProfile?.name}</div>
      <div data-testid="user-email">{auth.userProfile?.email}</div>
      <div data-testid="loading">{auth.isLoading ? 'loading' : 'loaded'}</div>
    </div>
  );
};

describe('Hub AuthContext', () => {
  const mockAuth = { currentUser: null };
  const mockFirestore = {};

  beforeEach(() => {
    jest.clearAllMocks();
    (firebaseConfig.getHubAuth as jest.Mock).mockReturnValue(mockAuth);
    (firebaseConfig.getHubFirestore as jest.Mock).mockReturnValue(mockFirestore);
  });

  describe('AuthProvider', () => {
    it('should initialize Firebase on mount', () => {
      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      expect(firebaseConfig.initializeFirebase).toHaveBeenCalledWith({
        hubConfig: expect.objectContaining({
          apiKey: expect.any(String),
          authDomain: expect.any(String),
          projectId: expect.any(String),
        }),
        useEmulators: true, // In test environment
        emulatorPorts: {
          auth: 9099,
          firestore: 8080,
        },
      });
    });

    it('should create Hub user profile with correct structure', async () => {
      let capturedCreateProfile: any;
      
      (authLib.createAuthContext as jest.Mock).mockImplementation(() => ({
        AuthProvider: ({ children, createUserProfile }: any) => {
          capturedCreateProfile = createUserProfile;
          return <div>{children}</div>;
        },
        useAuth: jest.fn(),
        AuthContext: React.createContext({}),
      }));

      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      await waitFor(() => {
        expect(capturedCreateProfile).toBeDefined();
      });

      const mockFirebaseUser = {
        uid: 'test-123',
        displayName: 'John Doe',
        email: 'john@example.com',
        photoURL: 'https://example.com/john.jpg',
      };

      const profile = capturedCreateProfile(mockFirebaseUser);

      expect(profile).toEqual({
        id: 'test-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/john.jpg',
        apps: ['justsplit'],
        permissions: [
          {
            appId: 'justsplit',
            roles: ['user'],
            features: ['expense-tracking', 'group-management'],
          },
        ],
        preferences: {
          theme: 'auto',
          language: 'en',
          notifications: true,
        },
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        lastLoginAt: expect.any(String),
        isAdmin: false,
      });
    });

    it('should save shared auth state when user profile loads', async () => {
      render(
        <AuthProvider>
          <TestAuthConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(authLib.saveSharedAuthState).toHaveBeenCalledWith({
          uid: 'test-user-123',
          email: 'test@example.com',
          displayName: 'Test User',
          photoURL: 'https://example.com/photo.jpg',
          emailVerified: true,
        });
      });
    });

    it('should set up cross-origin auth sharing', () => {
      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      expect(authLib.useCrossOriginAuth).toHaveBeenCalledWith(mockAuth);
    });

    it('should set up session synchronization', () => {
      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      expect(authLib.useSessionSync).toHaveBeenCalledWith({
        auth: mockAuth,
        onSessionChange: expect.any(Function),
        syncAcrossTabs: true,
      });
    });

    it('should clear shared auth state on sign out', async () => {
      const mockSignOut = jest.fn();
      
      (authLib.createAuthContext as jest.Mock).mockImplementation(() => ({
        AuthProvider: ({ children }: any) => children,
        useAuth: jest.fn(() => ({
          userProfile: null,
          signOut: mockSignOut,
        })),
        AuthContext: React.createContext({}),
      }));

      const TestSignOut = () => {
        const { signOut } = useAuth();
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        return null;
      };

      render(
        <AuthProvider>
          <TestSignOut />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled();
        expect(authLib.clearSharedAuthState).toHaveBeenCalled();
      });
    });

    it('should show loading state while initializing', () => {
      let resolveInit: any;
      const initPromise = new Promise((resolve) => {
        resolveInit = resolve;
      });

      (firebaseConfig.initializeFirebase as jest.Mock).mockReturnValue(initPromise);

      const { rerender } = render(
        <AuthProvider>
          <div data-testid="content">Content</div>
        </AuthProvider>
      );

      // Should show loading initially
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByTestId('content')).not.toBeInTheDocument();

      // Resolve initialization
      act(() => {
        resolveInit();
      });

      rerender(
        <AuthProvider>
          <div data-testid="content">Content</div>
        </AuthProvider>
      );

      // Should show content after init
      waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });
    });
  });

  describe('Auth state synchronization', () => {
    it('should update shared auth state when user profile changes', async () => {
      const TestComponent = () => {
        const [profile, setProfile] = React.useState<any>(null);
        
        React.useEffect(() => {
          // Simulate profile change
          setTimeout(() => {
            setProfile({
              id: 'new-user-456',
              name: 'New User',
              email: 'new@example.com',
            });
          }, 100);
        }, []);

        (authLib.createAuthContext as jest.Mock).mockImplementation(() => ({
          AuthProvider: ({ children }: any) => children,
          useAuth: jest.fn(() => ({
            userProfile: profile,
          })),
          AuthContext: React.createContext({}),
        }));

        return (
          <AuthProvider>
            <div>Test</div>
          </AuthProvider>
        );
      };

      render(<TestComponent />);

      await waitFor(() => {
        expect(authLib.saveSharedAuthState).toHaveBeenLastCalledWith({
          uid: 'new-user-456',
          email: 'new@example.com',
          displayName: 'New User',
          photoURL: null,
          emailVerified: true,
        });
      });
    });

    it('should handle session change callback', async () => {
      let sessionChangeCallback: any;
      
      (authLib.useSessionSync as jest.Mock).mockImplementation(({ onSessionChange }) => {
        sessionChangeCallback = onSessionChange;
      });

      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      expect(sessionChangeCallback).toBeDefined();

      // Test session change handling
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      act(() => {
        sessionChangeCallback(true);
      });
      expect(consoleSpy).toHaveBeenCalledWith('Hub auth state changed:', true);

      act(() => {
        sessionChangeCallback(false);
      });
      expect(consoleSpy).toHaveBeenCalledWith('Hub auth state changed:', false);

      consoleSpy.mockRestore();
    });
  });

  describe('Error handling', () => {
    it('should handle Firebase initialization errors', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      
      (firebaseConfig.initializeFirebase as jest.Mock).mockImplementation(() => {
        throw new Error('Firebase init failed');
      });

      expect(() => {
        render(
          <AuthProvider>
            <div>Test</div>
          </AuthProvider>
        );
      }).not.toThrow();

      consoleError.mockRestore();
    });

    it('should handle missing environment variables', () => {
      const originalEnv = process.env;
      process.env = {};

      render(
        <AuthProvider>
          <div>Test</div>
        </AuthProvider>
      );

      expect(firebaseConfig.initializeFirebase).toHaveBeenCalledWith({
        hubConfig: expect.objectContaining({
          apiKey: '',
          authDomain: '',
          projectId: '',
        }),
        useEmulators: true,
        emulatorPorts: {
          auth: 9099,
          firestore: 8080,
        },
      });

      process.env = originalEnv;
    });
  });
});