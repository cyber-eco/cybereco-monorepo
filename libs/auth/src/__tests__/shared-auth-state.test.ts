import {
  saveSharedAuthState,
  getSharedAuthState,
  clearSharedAuthState,
  subscribeToAuthStateChanges,
  waitForAuth,
  type SharedAuthUser,
  type SharedAuthState
} from '../shared-auth-state';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    })
  };
})();

// Mock window.dispatchEvent
const dispatchEventSpy = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'dispatchEvent', {
  value: dispatchEventSpy
});

describe('shared-auth-state', () => {
  const mockUser: SharedAuthUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    emailVerified: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    dispatchEventSpy.mockClear();
    // Reset console mocks
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('saveSharedAuthState', () => {
    it('should save auth state to localStorage', () => {
      saveSharedAuthState(mockUser);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cybereco-shared-auth',
        expect.stringContaining(mockUser.uid)
      );

      const savedData = JSON.parse(localStorageMock.getItem('cybereco-shared-auth')!);
      expect(savedData.user).toEqual(mockUser);
      expect(savedData.token).toBeNull();
      expect(savedData.timestamp).toBeDefined();
    });

    it('should save auth state with token', () => {
      const token = 'test-token-123';
      saveSharedAuthState(mockUser, token);

      const savedData = JSON.parse(localStorageMock.getItem('cybereco-shared-auth')!);
      expect(savedData.token).toBe(token);
    });

    it('should dispatch custom event', () => {
      saveSharedAuthState(mockUser);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'cybereco-auth-changed',
          detail: expect.objectContaining({
            user: mockUser
          })
        })
      );
    });

    it('should handle save errors gracefully', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('Storage full');
      });

      expect(() => saveSharedAuthState(mockUser)).not.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to save'),
        expect.any(Error)
      );
    });

    it('should save null user to clear auth', () => {
      saveSharedAuthState(null);

      const savedData = JSON.parse(localStorageMock.getItem('cybereco-shared-auth')!);
      expect(savedData.user).toBeNull();
    });
  });

  describe('getSharedAuthState', () => {
    it('should retrieve saved auth state', () => {
      const state: SharedAuthState = {
        user: mockUser,
        token: 'test-token',
        timestamp: Date.now()
      };
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(state));

      const retrieved = getSharedAuthState();
      expect(retrieved).toEqual(state);
    });

    it('should return null if no state exists', () => {
      const retrieved = getSharedAuthState();
      expect(retrieved).toBeNull();
    });

    it('should return null for expired state', () => {
      const expiredState: SharedAuthState = {
        user: mockUser,
        token: null,
        timestamp: Date.now() - (25 * 60 * 60 * 1000) // 25 hours ago
      };
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(expiredState));

      const retrieved = getSharedAuthState();
      expect(retrieved).toBeNull();
    });

    it('should return valid state within 24 hours', () => {
      const validState: SharedAuthState = {
        user: mockUser,
        token: null,
        timestamp: Date.now() - (23 * 60 * 60 * 1000) // 23 hours ago
      };
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(validState));

      const retrieved = getSharedAuthState();
      expect(retrieved).toEqual(validState);
    });

    it('should handle corrupted data gracefully', () => {
      localStorageMock.setItem('cybereco-shared-auth', 'invalid-json');

      const retrieved = getSharedAuthState();
      expect(retrieved).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to get'),
        expect.any(Error)
      );
    });
  });

  describe('clearSharedAuthState', () => {
    it('should remove auth state from localStorage', () => {
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify({ user: mockUser }));
      
      clearSharedAuthState();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('cybereco-shared-auth');
      expect(localStorageMock.getItem('cybereco-shared-auth')).toBeNull();
    });

    it('should dispatch event with null detail', () => {
      clearSharedAuthState();

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'cybereco-auth-changed',
          detail: null
        })
      );
    });

    it('should handle clear errors gracefully', () => {
      localStorageMock.removeItem.mockImplementationOnce(() => {
        throw new Error('Storage error');
      });

      expect(() => clearSharedAuthState()).not.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to clear'),
        expect.any(Error)
      );
    });
  });

  describe('subscribeToAuthStateChanges', () => {
    it('should call callback when auth state changes', () => {
      const callback = jest.fn();
      const unsubscribe = subscribeToAuthStateChanges(callback);

      const event = new CustomEvent('cybereco-auth-changed', {
        detail: { user: mockUser, token: null, timestamp: Date.now() }
      });
      window.dispatchEvent(event);

      expect(callback).toHaveBeenCalledWith(event.detail);

      unsubscribe();
    });

    it('should stop calling callback after unsubscribe', () => {
      const callback = jest.fn();
      const unsubscribe = subscribeToAuthStateChanges(callback);

      unsubscribe();

      const event = new CustomEvent('cybereco-auth-changed', {
        detail: { user: mockUser, token: null, timestamp: Date.now() }
      });
      window.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple subscribers', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      
      const unsub1 = subscribeToAuthStateChanges(callback1);
      const unsub2 = subscribeToAuthStateChanges(callback2);

      const event = new CustomEvent('cybereco-auth-changed', {
        detail: { user: mockUser, token: null, timestamp: Date.now() }
      });
      window.dispatchEvent(event);

      expect(callback1).toHaveBeenCalledWith(event.detail);
      expect(callback2).toHaveBeenCalledWith(event.detail);

      unsub1();
      unsub2();
    });
  });

  describe('waitForAuth', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return immediately if auth state exists', async () => {
      const state: SharedAuthState = {
        user: mockUser,
        token: null,
        timestamp: Date.now()
      };
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(state));

      const promise = waitForAuth();
      const result = await promise;

      expect(result).toEqual(state);
    });

    it('should wait for auth state to become available', async () => {
      const state: SharedAuthState = {
        user: mockUser,
        token: null,
        timestamp: Date.now()
      };

      // Set auth state after 200ms
      setTimeout(() => {
        localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(state));
      }, 200);

      const promise = waitForAuth(1000);
      
      // Fast-forward time
      jest.advanceTimersByTime(250);
      
      const result = await promise;
      expect(result).toEqual(state);
    });

    it('should timeout if auth state not available', async () => {
      const promise = waitForAuth(500);
      
      // Fast-forward past timeout
      jest.advanceTimersByTime(600);
      
      const result = await promise;
      expect(result).toBeNull();
    });

    it('should respect custom timeout', async () => {
      const promise = waitForAuth(2000);
      
      // Fast-forward to just before timeout
      jest.advanceTimersByTime(1900);
      
      // Set auth state
      const state: SharedAuthState = {
        user: mockUser,
        token: null,
        timestamp: Date.now()
      };
      localStorageMock.setItem('cybereco-shared-auth', JSON.stringify(state));
      
      jest.advanceTimersByTime(50);
      
      const result = await promise;
      expect(result).toEqual(state);
    });

    it('should check for auth state periodically', async () => {
      const getItemSpy = jest.spyOn(localStorageMock, 'getItem');
      
      const promise = waitForAuth(500);
      
      // Fast-forward time in steps
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(100);
      
      await promise;
      
      // Should check multiple times (approximately every 100ms)
      expect(getItemSpy).toHaveBeenCalledTimes(5);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete auth flow', async () => {
      const subscriber = jest.fn();
      const unsubscribe = subscribeToAuthStateChanges(subscriber);

      // 1. No auth initially
      expect(getSharedAuthState()).toBeNull();

      // 2. Save auth state
      saveSharedAuthState(mockUser);
      expect(subscriber).toHaveBeenCalledWith(
        expect.objectContaining({ user: mockUser })
      );

      // 3. Retrieve auth state
      const state = getSharedAuthState();
      expect(state?.user).toEqual(mockUser);

      // 4. Clear auth state
      clearSharedAuthState();
      expect(subscriber).toHaveBeenCalledWith(null);

      // 5. Verify cleared
      expect(getSharedAuthState()).toBeNull();

      unsubscribe();
    });

    it('should handle concurrent access', () => {
      // Simulate multiple components accessing auth state
      saveSharedAuthState(mockUser);

      const state1 = getSharedAuthState();
      const state2 = getSharedAuthState();
      const state3 = getSharedAuthState();

      expect(state1).toEqual(state2);
      expect(state2).toEqual(state3);
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(6); // 3 for saves (verification), 3 for gets
    });
  });
});