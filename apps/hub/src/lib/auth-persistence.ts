// Generic type for any user object
interface CachedAuthState<T = any> {
  user: T | null;
  timestamp: number;
  tokens?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

class AuthPersistence {
  private static instance: AuthPersistence;
  private readonly CACHE_KEY = 'cybereco-hub-auth-cache';
  private readonly TOKEN_KEY = 'cybereco-hub-tokens';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  private constructor() {}

  static getInstance(): AuthPersistence {
    if (!AuthPersistence.instance) {
      AuthPersistence.instance = new AuthPersistence();
    }
    return AuthPersistence.instance;
  }

  private getStoredState(): CachedAuthState | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (!stored) return null;
      
      return JSON.parse(stored);
    } catch (error) {
      console.error('[AuthPersistence] Error reading from localStorage:', error);
      return null;
    }
  }

  private setStoredState(state: CachedAuthState | null): void {
    if (typeof window === 'undefined') return;
    
    try {
      if (state) {
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(this.CACHE_KEY);
      }
    } catch (error) {
      console.error('[AuthPersistence] Error writing to localStorage:', error);
    }
  }

  private isExpired(state: CachedAuthState): boolean {
    const now = Date.now();
    const elapsed = now - state.timestamp;
    
    return elapsed > this.CACHE_DURATION;
  }

  getCachedAuthState<T = any>(): T | null {
    const authState = this.getStoredState();
    
    // console.log('[AuthPersistence] Getting cached state from localStorage:', {
    //   hasState: !!authState,
    //   expired: authState ? this.isExpired(authState) : 'N/A',
    //   userId: authState?.user?.id
    // });
    
    if (!authState || this.isExpired(authState)) {
      this.clearCachedAuthState();
      return null;
    }
    
    return authState.user;
  }

  setCachedAuthState<T = any>(user: T | null): void {
    // console.log('[AuthPersistence] Setting cached state for user:', user?.id);
    const state: CachedAuthState = {
      user,
      timestamp: Date.now()
    };
    this.setStoredState(state);
  }

  clearCachedAuthState(): void {
    this.setStoredState(null);
  }

  /**
   * Get the remaining time before the cached auth state expires
   * @returns Time remaining in milliseconds, or 0 if expired/not set
   */
  getRemainingCacheTime(): number {
    const authState = this.getStoredState();
    
    if (!authState || this.isExpired(authState)) {
      return 0;
    }
    
    const elapsed = Date.now() - authState.timestamp;
    const remaining = this.CACHE_DURATION - elapsed;
    
    return Math.max(0, remaining);
  }

  /**
   * Check if the cache is still valid without clearing it
   * @returns boolean indicating if cache is valid
   */
  isCacheValid(): boolean {
    const authState = this.getStoredState();
    return authState !== null && !this.isExpired(authState);
  }

  /**
   * Store JWT tokens separately for security
   */
  setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    if (typeof window === 'undefined') return;
    
    try {
      const tokens = {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + (expiresIn * 1000)
      };
      
      // Store tokens in sessionStorage for better security
      sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error('[AuthPersistence] Error storing tokens:', error);
    }
  }

  /**
   * Get stored JWT tokens
   */
  getTokens(): { accessToken: string; refreshToken: string; expiresAt: number } | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = sessionStorage.getItem(this.TOKEN_KEY);
      if (!stored) return null;
      
      const tokens = JSON.parse(stored);
      
      // Check if access token is expired
      if (Date.now() >= tokens.expiresAt) {
        return { ...tokens, accessToken: null }; // Return with null access token
      }
      
      return tokens;
    } catch (error) {
      console.error('[AuthPersistence] Error reading tokens:', error);
      return null;
    }
  }

  /**
   * Clear stored tokens
   */
  clearTokens(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Clear all auth data
   */
  clearAll(): void {
    this.clearCachedAuthState();
    this.clearTokens();
  }
}

// Export singleton instance methods
const authPersistence = AuthPersistence.getInstance();

export const getCachedAuthState = <T = any>() => authPersistence.getCachedAuthState<T>();
export const setCachedAuthState = <T = any>(user: T | null) => authPersistence.setCachedAuthState<T>(user);
export const clearCachedAuthState = () => authPersistence.clearCachedAuthState();
export const getRemainingCacheTime = () => authPersistence.getRemainingCacheTime();
export const isCacheValid = () => authPersistence.isCacheValid();
export const setAuthTokens = (accessToken: string, refreshToken: string, expiresIn: number) => 
  authPersistence.setTokens(accessToken, refreshToken, expiresIn);
export const getAuthTokens = () => authPersistence.getTokens();
export const clearAuthTokens = () => authPersistence.clearTokens();
export const clearAllAuth = () => authPersistence.clearAll();