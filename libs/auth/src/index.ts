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
  AuthProvider,
  UserCredential,
  AuthError as FirebaseAuthError
} from 'firebase/auth';