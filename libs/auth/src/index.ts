// Auth Context exports
export {
  createAuthContext,
  sanitizeForFirestore,
  type AuthConfig,
  type AuthContextType,
  type AuthProviderProps,
  type BaseUserConstraint
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
  withPermissions,
  type UserWithPermissions,
  type PermissionCheck
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

export {
  JWTAuthService,
  type JWTPayload,
  type TokenPair
} from './services/jwtAuthService';

export {
  authLogger,
  AuthEventType,
  LogLevel,
  type AuthLogEntry,
  type AuthMetrics
} from './services/authLogger';

// Rate limiting exports
export {
  createRateLimiter,
  authRateLimiter,
  apiRateLimiter,
  exportRateLimiter,
  InMemoryRateLimitStore,
  RedisRateLimitStore,
  type RateLimitConfig,
  type RateLimitStore
} from './middleware/rateLimiter';

// Services that require server-side dependencies are not exported here
// Import them directly from @cybereco/auth/src/services/serverOnly in API routes
// For client-side code, use the API routes instead

// Type exports
export { 
  type TwoFactorSecret,
  type DeviceInfo as TwoFactorDeviceInfo
} from './services/twoFactorService';

export {
  type Session,
  type DeviceInfo as SessionDeviceInfo,
  type GeolocationData
} from './services/sessionService';

// Cache and performance exports
export {
  cacheService,
  RequestBatcher,
  debounce,
  throttle,
  memoize
} from './services/cacheService';

// Optimized queries are not exported as they require firebase-config
// Use these functions only in server-side code
// export {
//   paginatedQuery,
//   batchGetDocument,
//   subscribeTo,
//   prefetchCommonData,
//   getCount,
//   useLazyLoad,
//   type PaginationOptions,
//   type QueryOptions
// } from './services/optimizedQueries';

export {
  performanceMonitor,
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

// GDPR compliance type exports - services must be used via API routes
export {
  ConsentType,
  type ConsentRecord,
  type PrivacyPreferences,
  type DataProcessingActivity
} from './services/gdprService';

// Privacy-aware data type exports - services must be used via API routes
export {
  type PrivacySettings,
  type PrivacyFilter,
  type DataAccessLog
} from './services/privacyAwareDataService';

// Note: gdprService and privacyAwareDataService are not exported here
// because they depend on firebase-config which is not available client-side.
// Use the API routes in apps/hub/src/app/api/privacy/ instead.

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

// JWT type exports
export {
  type TokenPayload,
  type DecodedToken,
  type TokenPair as JWTTokenPair
} from './services/jwtService';

// SSO type exports
export {
  type SSOToken,
  type SSOClaims,
  type SSOSessionInfo
} from './services/ssoService';

// Additional type exports are included above with their respective services