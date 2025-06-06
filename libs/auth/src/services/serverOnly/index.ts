// Server-only services that require firebase-admin and other server dependencies
// These must only be imported in API routes, never in client components

export { sessionService } from './sessionService.server';
export { twoFactorService } from './twoFactorService.server';
export { gdprService } from './gdprService.server';
export { privacyAwareDataService } from './privacyAwareDataService.server';
export { ssoService } from './ssoService.server';
export { jwtService } from './jwtService.server';

// Re-export types
export type { Session, DeviceInfo as SessionDeviceInfo, GeolocationData } from '../sessionService';
export type { TwoFactorSecret, DeviceInfo as TwoFactorDeviceInfo } from '../twoFactorService';
export type { ConsentRecord, PrivacyPreferences, DataProcessingActivity, ConsentType } from '../gdprService';
export type { PrivacySettings, PrivacyFilter, DataAccessLog } from '../privacyAwareDataService';
export type { SSOToken, SSOClaims, SSOSessionInfo } from '../ssoService';
export type { TokenPayload, DecodedToken, TokenPair } from '../jwtService';