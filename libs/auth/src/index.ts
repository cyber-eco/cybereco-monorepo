// Auth Context exports
export {
  createAuthContext,
  AuthProvider,
  useAuth,
  AuthContext,
  sanitizeForFirestore,
  type BaseUser,
  type AuthConfig,
  type AuthContextType,
  type AuthProviderProps
} from './AuthContext';

// Utility exports
export {
  validateEmail,
  validatePassword,
  generateAuthToken,
  verifyAuthToken,
  generateAuthRedirectUrl,
  parseReturnUrl,
  checkAppPermissions,
  hasIndexedDBCorruption,
  recoverFromCorruption,
  generateDisplayName,
  getAuthErrorMessage,
  type AppPermission,
  type AuthError
} from './utils';

// Re-export common Firebase Auth types for convenience
export type {
  User as FirebaseUser,
  AuthProvider as FirebaseAuthProvider,
  UserCredential,
  AuthError as FirebaseAuthError
} from 'firebase/auth';

// Session synchronization exports
export {
  useSessionSync,
  useSharedAuthState,
  clearSharedAuthState
} from './SessionSync';

// Permission management exports
export {
  usePermissions,
  withPermissions
} from './usePermissions';

// Cross-origin auth exports
export {
  useCrossOriginAuth,
  getSharedAuthState,
  clearSharedAuthState as clearCrossOriginAuth,
  waitForSharedAuth
} from './CrossOriginAuth';