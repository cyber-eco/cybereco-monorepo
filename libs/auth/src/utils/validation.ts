import { z } from 'zod';
import { ValidationError } from './errors';

/**
 * Common validation schemas
 */

// Email validation
export const emailSchema = z.string().email('Invalid email format').toLowerCase();

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// User ID validation (Firebase UID format)
export const userIdSchema = z.string().regex(/^[a-zA-Z0-9]{28}$/, 'Invalid user ID format');

// Display name validation
export const displayNameSchema = z
  .string()
  .min(2, 'Display name must be at least 2 characters')
  .max(50, 'Display name must be less than 50 characters')
  .regex(/^[a-zA-Z0-9\s\-_.]+$/, 'Display name contains invalid characters');

// 2FA code validation
export const twoFactorCodeSchema = z.string().regex(/^[0-9]{6}$/, 'Code must be 6 digits');

// Backup code validation
export const backupCodeSchema = z.string().regex(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, 'Invalid backup code format');

// JWT token validation
export const jwtTokenSchema = z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'Invalid JWT format');

// Session ID validation
export const sessionIdSchema = z.string().regex(/^sess_[a-zA-Z0-9]{16}$/, 'Invalid session ID format');

// Privacy visibility levels
export const visibilityLevelSchema = z.enum(['everyone', 'friends', 'only-me']);

// Consent types
export const consentTypeSchema = z.enum(['necessary', 'functional', 'analytics', 'marketing', 'personalization']);

// Export formats
export const exportFormatSchema = z.enum(['json', 'csv']);

// Date range validation
export const dateRangeSchema = z.object({
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
}).refine(
  (data) => {
    if (data.start && data.end) {
      return new Date(data.start) <= new Date(data.end);
    }
    return true;
  },
  { message: 'Start date must be before end date' }
);

/**
 * Authentication schemas
 */

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: displayNameSchema.optional(),
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
  marketingConsent: z.boolean().optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: jwtTokenSchema,
});

export const verify2FASchema = z.object({
  userId: userIdSchema,
  code: twoFactorCodeSchema,
});

export const verifyBackupCodeSchema = z.object({
  userId: userIdSchema,
  backupCode: backupCodeSchema,
});

/**
 * Session management schemas
 */

export const revokeSessionSchema = z.object({
  sessionId: sessionIdSchema,
});

export const revokeAllSessionsSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  keepCurrent: z.boolean().optional().default(true),
});

/**
 * Privacy schemas
 */

export const privacySettingsSchema = z.object({
  profileVisibility: visibilityLevelSchema,
  activityVisibility: z.object({
    expenses: visibilityLevelSchema,
    groups: visibilityLevelSchema,
    settlements: visibilityLevelSchema,
    profile: visibilityLevelSchema,
  }).partial(),
  dataSharing: z.object({
    analytics: z.boolean(),
    marketing: z.boolean(),
    thirdParty: z.boolean(),
  }).partial(),
}).partial();

export const consentRecordSchema = z.object({
  consentType: consentTypeSchema,
  granted: z.boolean(),
  metadata: z.record(z.any()).optional(),
});

/**
 * Data export schemas
 */

export const exportRequestSchema = z.object({
  format: exportFormatSchema,
  categories: z.array(z.string()).optional(),
  dateRange: dateRangeSchema.optional(),
  includeMetadata: z.boolean().optional().default(true),
  compress: z.boolean().optional().default(false),
});

/**
 * GDPR schemas
 */

export const deletionRequestSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  reason: z.string().max(500).optional(),
  feedback: z.string().max(1000).optional(),
});

export const dataPortabilitySchema = z.object({
  format: exportFormatSchema,
  includeHistory: z.boolean().optional().default(true),
  targetService: z.string().url().optional(),
});

/**
 * Validation helper functions
 */

/**
 * Validates input against a schema and throws ValidationError if invalid
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = {
        field: error.errors[0]?.path.join('.'),
        constraints: error.errors.map(e => e.message),
      };
      throw new ValidationError('Validation failed', details);
    }
    throw error;
  }
}

/**
 * Validates input and returns result without throwing
 */
export function validateSafe<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Sanitization helpers
 */

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizeDisplayName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function sanitizeString(str: string, maxLength: number = 1000): string {
  return str.trim().slice(0, maxLength);
}

/**
 * Type guards
 */

export function isValidEmail(email: string): boolean {
  return validateSafe(emailSchema, email).success;
}

export function isValidUserId(userId: string): boolean {
  return validateSafe(userIdSchema, userId).success;
}

export function isValidJWT(token: string): boolean {
  return validateSafe(jwtTokenSchema, token).success;
}

export function isValid2FACode(code: string): boolean {
  return validateSafe(twoFactorCodeSchema, code).success;
}

/**
 * Request validation middleware helper
 */
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    return validate(schema, data);
  };
}