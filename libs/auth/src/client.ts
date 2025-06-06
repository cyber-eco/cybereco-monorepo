/**
 * Client-safe exports from the auth library
 * These exports don't include server-side dependencies like firebase-admin
 */

// Auth Context exports
export {
  createAuthContext,
  sanitizeForFirestore,
  type AuthConfig,
  type AuthContextType,
  type AuthProviderProps
} from './AuthContext';

// Re-export the default auth context instance
export { AuthProvider, useAuth, AuthContext } from './AuthContext';

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

// Shared auth state exports for cross-app SSO
export {
  saveSharedAuthState,
  getSharedAuthState as getSharedAuth,
  clearSharedAuthState as clearSharedAuth,
  subscribeToAuthStateChanges,
  waitForAuth,
  type SharedAuthUser,
  type SharedAuthState
} from './shared-auth-state';

// Lightweight app auth exports
export {
  useHubAuth,
  type HubUser,
  type HubAuthState
} from './hooks/useHubAuth';

export {
  AuthTokenService,
  type AuthUser
} from './services/authTokenService';

// Logger exports
export {
  log,
  createLogger,
  stream as logStream
} from './utils/logger';

// Error handling exports
export {
  CyberEcoError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalError,
  ServiceUnavailableError,
  TokenExpiredError,
  InvalidTokenError,
  TwoFactorRequiredError,
  InvalidTwoFactorCodeError,
  ConsentRequiredError,
  DataAccessDeniedError,
  ExportLimitExceededError,
  ErrorCode,
  isOperationalError,
  serializeError,
  type ErrorDetails
} from './utils/errors';

// Validation exports
export {
  validate,
  validateSafe,
  validateRequest,
  sanitizeEmail,
  sanitizeDisplayName,
  sanitizeString,
  isValidEmail,
  isValidUserId,
  isValidJWT,
  isValid2FACode,
  // Schemas
  emailSchema,
  passwordSchema,
  userIdSchema,
  displayNameSchema,
  twoFactorCodeSchema,
  backupCodeSchema,
  jwtTokenSchema,
  sessionIdSchema,
  visibilityLevelSchema,
  consentTypeSchema,
  exportFormatSchema,
  dateRangeSchema,
  signInSchema,
  signUpSchema,
  refreshTokenSchema,
  verify2FASchema,
  verifyBackupCodeSchema,
  revokeSessionSchema,
  revokeAllSessionsSchema,
  privacySettingsSchema,
  consentRecordSchema,
  exportRequestSchema,
  deletionRequestSchema,
  dataPortabilitySchema
} from './utils/validation';

// Type exports
export { ConsentType } from './services/gdprService';
export type { 
  ConsentRecord, 
  PrivacyPreferences, 
  DataProcessingActivity 
} from './services/gdprService';

export type { 
  PrivacySettings, 
  PrivacyFilter, 
  DataAccessLog 
} from './services/privacyAwareDataService';

// Cache and performance exports
export {
  cacheService,
  RequestBatcher,
  debounce,
  throttle,
  memoize
} from './services/cacheService';

export {
  useRenderPerformance,
  lazyWithPerformance,
  reportWebVitals,
  optimizeImage,
  useIntersectionObserver,
  requestIdleCallback,
  cancelIdleCallback,
  type PerformanceMetric
} from './utils/performance';

// Error recovery exports
export {
  retryWithBackoff,
  CircuitBreaker,
  useErrorBoundary,
  useOfflineRecovery,
  useAutoSave,
  recoverFromIndexedDBCorruption,
  handleFirebaseError,
  ErrorBoundary,
  DefaultErrorFallback,
  RecoveryStrategy,
  type ErrorRecoveryOptions
} from './utils/errorRecovery';