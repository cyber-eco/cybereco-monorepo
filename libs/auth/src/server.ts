// Server-only exports that don't include React hooks
// Use this for API routes and server-side code

// Logger exports
export {
  log,
  createLogger,
  LogLevel,
  setLogLevel,
  getLogLevel
} from './utils/logger';

// Error exports
export {
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalError,
  InvalidTokenError,
  TokenExpiredError,
  InvalidTwoFactorCodeError,
  createError,
  isAuthError
} from './utils/errors';

// Validation exports
export {
  validate,
  createSchema,
  emailSchema,
  passwordSchema,
  userIdSchema,
  phoneSchema,
  sessionIdSchema,
  tokenSchema,
  jwtTokenSchema,
  twoFactorCodeSchema,
  backupCodeSchema,
  type ValidationResult
} from './utils/validation';

// Auth logger service
export {
  authLogger,
  AuthEventType,
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

// Type exports
export type {
  TwoFactorSecret,
  DeviceInfo as TwoFactorDeviceInfo
} from './services/twoFactorService';

export type {
  Session,
  DeviceInfo as SessionDeviceInfo,
  GeolocationData
} from './services/sessionService';

export type {
  ConsentRecord,
  PrivacyPreferences,
  DataProcessingActivity,
  ConsentType
} from './services/gdprService';

export type {
  PrivacySettings,
  PrivacyFilter,
  DataAccessLog
} from './services/privacyAwareDataService';

export type {
  TokenPayload,
  DecodedToken,
  TokenPair
} from './services/jwtService';

export type {
  SSOToken,
  SSOClaims,
  SSOSessionInfo
} from './services/ssoService';