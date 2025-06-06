/**
 * Custom error classes for CyberEco authentication system
 */

export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  REFRESH_TOKEN_INVALID = 'AUTH_REFRESH_TOKEN_INVALID',
  UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  
  // 2FA errors
  TWO_FACTOR_REQUIRED = 'AUTH_2FA_REQUIRED',
  TWO_FACTOR_INVALID = 'AUTH_2FA_INVALID',
  BACKUP_CODE_INVALID = 'AUTH_BACKUP_CODE_INVALID',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Session errors
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // Permission errors
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Privacy/GDPR errors
  CONSENT_REQUIRED = 'CONSENT_REQUIRED',
  DATA_ACCESS_DENIED = 'DATA_ACCESS_DENIED',
  
  // Export errors
  EXPORT_LIMIT_EXCEEDED = 'EXPORT_LIMIT_EXCEEDED',
  EXPORT_NOT_FOUND = 'EXPORT_NOT_FOUND',
  EXPORT_FAILED = 'EXPORT_FAILED',
  
  // General errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  BAD_REQUEST = 'BAD_REQUEST',
}

export interface ErrorDetails {
  field?: string;
  value?: any;
  constraints?: string[];
  hint?: string;
}

/**
 * Base error class for all CyberEco errors
 */
export class CyberEcoError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: ErrorDetails;
  public readonly timestamp: Date;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number = 500,
    details?: ErrorDetails
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
    
    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
        timestamp: this.timestamp,
      },
    };
  }
}

/**
 * Authentication error (401)
 */
export class AuthenticationError extends CyberEcoError {
  constructor(message: string = 'Authentication failed', code: ErrorCode = ErrorCode.UNAUTHORIZED, details?: ErrorDetails) {
    super(code, message, 401, details);
  }
}

/**
 * Authorization error (403)
 */
export class AuthorizationError extends CyberEcoError {
  constructor(message: string = 'Access denied', code: ErrorCode = ErrorCode.PERMISSION_DENIED, details?: ErrorDetails) {
    super(code, message, 403, details);
  }
}

/**
 * Validation error (400)
 */
export class ValidationError extends CyberEcoError {
  constructor(message: string = 'Validation failed', details?: ErrorDetails) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details);
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends CyberEcoError {
  constructor(message: string = 'Resource not found', details?: ErrorDetails) {
    super(ErrorCode.NOT_FOUND, message, 404, details);
  }
}

/**
 * Conflict error (409)
 */
export class ConflictError extends CyberEcoError {
  constructor(message: string = 'Resource conflict', details?: ErrorDetails) {
    super(ErrorCode.CONFLICT, message, 409, details);
  }
}

/**
 * Rate limit error (429)
 */
export class RateLimitError extends CyberEcoError {
  public readonly retryAfter?: number;

  constructor(message: string = 'Too many requests', retryAfter?: number) {
    super(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429);
    this.retryAfter = retryAfter;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      retryAfter: this.retryAfter,
    };
  }
}

/**
 * Internal server error (500)
 */
export class InternalError extends CyberEcoError {
  constructor(message: string = 'Internal server error', details?: ErrorDetails) {
    super(ErrorCode.INTERNAL_ERROR, message, 500, details);
  }
}

/**
 * Service unavailable error (503)
 */
export class ServiceUnavailableError extends CyberEcoError {
  public readonly retryAfter?: number;

  constructor(message: string = 'Service temporarily unavailable', retryAfter?: number) {
    super(ErrorCode.SERVICE_UNAVAILABLE, message, 503);
    this.retryAfter = retryAfter;
  }
}

/**
 * Token-specific errors
 */
export class TokenExpiredError extends AuthenticationError {
  constructor(message: string = 'Token has expired') {
    super(message, ErrorCode.TOKEN_EXPIRED);
  }
}

export class InvalidTokenError extends AuthenticationError {
  constructor(message: string = 'Invalid token') {
    super(message, ErrorCode.TOKEN_INVALID);
  }
}

/**
 * 2FA-specific errors
 */
export class TwoFactorRequiredError extends CyberEcoError {
  constructor(message: string = '2FA verification required') {
    super(ErrorCode.TWO_FACTOR_REQUIRED, message, 200); // 200 because it's not an error, just a requirement
  }
}

export class InvalidTwoFactorCodeError extends AuthenticationError {
  constructor(message: string = 'Invalid 2FA code') {
    super(message, ErrorCode.TWO_FACTOR_INVALID);
  }
}

/**
 * Privacy/GDPR-specific errors
 */
export class ConsentRequiredError extends AuthorizationError {
  constructor(message: string = 'User consent required', details?: ErrorDetails) {
    super(message, ErrorCode.CONSENT_REQUIRED, details);
  }
}

export class DataAccessDeniedError extends AuthorizationError {
  constructor(message: string = 'Data access denied due to privacy settings', details?: ErrorDetails) {
    super(message, ErrorCode.DATA_ACCESS_DENIED, details);
  }
}

/**
 * Export-specific errors
 */
export class ExportLimitExceededError extends CyberEcoError {
  constructor(message: string = 'Export limit exceeded', details?: ErrorDetails) {
    super(ErrorCode.EXPORT_LIMIT_EXCEEDED, message, 429, details);
  }
}

/**
 * Error handler utility
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof CyberEcoError) {
    return true;
  }
  return false;
}

/**
 * Error serializer for API responses
 */
export function serializeError(error: Error): any {
  if (error instanceof CyberEcoError) {
    return error.toJSON();
  }

  // For non-operational errors, return generic message in production
  if (process.env.NODE_ENV === 'production') {
    return {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An unexpected error occurred',
        timestamp: new Date(),
      },
    };
  }

  // In development, include stack trace
  return {
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
    },
  };
}