import { renderHook, act } from '@testing-library/react-hooks';
import { useSessionSync, useSharedAuthState, clearSharedAuthState } from '../SessionSync';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn()
}));

// Mock BroadcastChannel
class MockBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  closed = false;

  constructor(name: string) {
    this.name = name;
    MockBroadcastChannel.instances.push(this);
  }

  postMessage(data: any) {
    if (!this.closed) {
      MockBroadcastChannel.lastMessage = data;
      // Simulate message to other instances
      MockBroadcastChannel.instances.forEach(instance => {
        if (instance !== this && instance.onmessage && !instance.closed) {
          instance.onmessage(new MessageEvent('message', { data }));
        }
      });
    }
  }

  close() {
    this.closed = true;
    const index = MockBroadcastChannel.instances.indexOf(this);
    if (index > -1) {
      MockBroadcastChannel.instances.splice(index, 1);
    }
  }

  static instances: MockBroadcastChannel[] = [];
  static lastMessage: any = null;
  static reset() {
    MockBroadcastChannel.instances = [];
    MockBroadcastChannel.lastMessage = null;
  }
}

describe('SessionSync', () => {
  let mockAuth: Auth;
  let mockOnAuthStateChanged: jest.MockedFunction<typeof onAuthStateChanged>;
  
  beforeEach(() => {
    // Setup mocks
    mockAuth = {} as Auth;
    mockOnAuthStateChanged = onAuthStateChanged as jest.MockedFunction<typeof onAuthStateChanged>;
    
    // Mock BroadcastChannel
    (global as any).BroadcastChannel = MockBroadcastChannel;
    MockBroadcastChannel.reset();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup
    delete (global as any).BroadcastChannel;
    MockBroadcastChannel.reset();
  });

  describe('useSessionSync', () => {
    it('should listen to auth state changes', () => {
      const onSessionChange = jest.fn();
      const unsubscribe = jest.fn();
      
      mockOnAuthStateChanged.mockReturnValue(unsubscribe);
      
      const { unmount } = renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange
        })
      );

      expect(mockOnAuthStateChanged).toHaveBeenCalledWith(mockAuth, expect.any(Function));
      
      unmount();
      expect(unsubscribe).toHaveBeenCalled();
    });

    it('should update session storage when user signs in', () => {
      const onSessionChange = jest.fn();
      let authCallback: ((user: User | null) => void) | null = null;
      
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return jest.fn();
      });
      
      renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange
        })
      );

      // Simulate user sign in
      const mockUser = { uid: 'test-user-123' } as User;
      act(() => {
        authCallback?.(mockUser);
      });

      expect(sessionStorage.getItem('cybereco-auth-session')).toBe('test-user-123');
      expect(onSessionChange).toHaveBeenCalledWith(true);
    });

    it('should clear session storage when user signs out', () => {
      const onSessionChange = jest.fn();
      let authCallback: ((user: User | null) => void) | null = null;
      
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return jest.fn();
      });
      
      // Pre-set session storage
      sessionStorage.setItem('cybereco-auth-session', 'test-user-123');
      
      renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange
        })
      );

      // Simulate user sign out
      act(() => {
        authCallback?.(null);
      });

      expect(sessionStorage.getItem('cybereco-auth-session')).toBeNull();
      expect(onSessionChange).toHaveBeenCalledWith(false);
    });

    it('should broadcast auth state changes to other tabs', () => {
      const onSessionChange = jest.fn();
      let authCallback: ((user: User | null) => void) | null = null;
      
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return jest.fn();
      });
      
      renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange,
          syncAcrossTabs: true
        })
      );

      const mockUser = { uid: 'test-user-123' } as User;
      act(() => {
        authCallback?.(mockUser);
      });

      expect(MockBroadcastChannel.lastMessage).toEqual({
        type: 'auth-state-change',
        isAuthenticated: true,
        userId: 'test-user-123'
      });
    });

    it('should receive auth state changes from other tabs', () => {
      const onSessionChange = jest.fn();
      
      mockOnAuthStateChanged.mockReturnValue(jest.fn());
      
      renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange,
          syncAcrossTabs: true
        })
      );

      // Get the broadcast channel instance
      const channel = MockBroadcastChannel.instances[0];
      
      // Simulate message from another tab
      act(() => {
        channel.onmessage?.(new MessageEvent('message', {
          data: {
            type: 'auth-state-change',
            isAuthenticated: true,
            userId: 'other-tab-user'
          }
        }));
      });

      expect(sessionStorage.getItem('cybereco-auth-session')).toBe('other-tab-user');
      expect(onSessionChange).toHaveBeenCalledWith(true);
    });

    it('should not sync across tabs when disabled', () => {
      const onSessionChange = jest.fn();
      
      mockOnAuthStateChanged.mockReturnValue(jest.fn());
      
      renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange,
          syncAcrossTabs: false
        })
      );

      expect(MockBroadcastChannel.instances.length).toBe(0);
    });
  });

  describe('useSharedAuthState', () => {
    it('should return true when session exists', () => {
      sessionStorage.setItem('cybereco-auth-session', 'test-user-123');
      
      const { result } = renderHook(() => useSharedAuthState());
      
      expect(result.current).toBe(true);
    });

    it('should return false when session does not exist', () => {
      const { result } = renderHook(() => useSharedAuthState());
      
      expect(result.current).toBe(false);
    });

    it('should return false during SSR', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      const { result } = renderHook(() => useSharedAuthState());
      
      expect(result.current).toBe(false);
      
      global.window = originalWindow;
    });
  });

  describe('clearSharedAuthState', () => {
    it('should clear session storage', () => {
      sessionStorage.setItem('cybereco-auth-session', 'test-user-123');
      
      clearSharedAuthState();
      
      expect(sessionStorage.getItem('cybereco-auth-session')).toBeNull();
    });

    it('should broadcast sign out to other tabs', () => {
      clearSharedAuthState();
      
      expect(MockBroadcastChannel.lastMessage).toEqual({
        type: 'auth-state-change',
        isAuthenticated: false,
        userId: null
      });
    });

    it('should handle SSR environment', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      // Should not throw
      expect(() => clearSharedAuthState()).not.toThrow();
      
      global.window = originalWindow;
    });
  });

  describe('Cross-tab Communication', () => {
    it('should sync sign-in across multiple tabs', () => {
      const onSessionChange1 = jest.fn();
      const onSessionChange2 = jest.fn();
      let authCallback1: ((user: User | null) => void) | null = null;
      
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        if (!authCallback1) {
          authCallback1 = callback;
        }
        return jest.fn();
      });
      
      // Simulate two tabs
      const { unmount: unmount1 } = renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange: onSessionChange1,
          syncAcrossTabs: true
        })
      );
      
      const { unmount: unmount2 } = renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          onSessionChange: onSessionChange2,
          syncAcrossTabs: true
        })
      );
      
      // Sign in on tab 1
      const mockUser = { uid: 'test-user-123' } as User;
      act(() => {
        authCallback1?.(mockUser);
      });
      
      // Both tabs should be notified
      expect(onSessionChange1).toHaveBeenCalledWith(true);
      expect(onSessionChange2).toHaveBeenCalledWith(true);
      
      unmount1();
      unmount2();
    });

    it('should handle channel closure properly', () => {
      mockOnAuthStateChanged.mockReturnValue(jest.fn());
      
      const { unmount } = renderHook(() => 
        useSessionSync({
          auth: mockAuth,
          syncAcrossTabs: true
        })
      );
      
      expect(MockBroadcastChannel.instances.length).toBe(1);
      
      unmount();
      
      expect(MockBroadcastChannel.instances.length).toBe(0);
    });
  });
});