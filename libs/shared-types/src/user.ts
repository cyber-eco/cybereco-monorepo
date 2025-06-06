import { AppPermission } from './auth';

// Base user interface that apps can extend
export interface BaseUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HubUser extends BaseUser {
  // Hub-specific fields
  apps: string[]; // List of app IDs the user has access to
  permissions: AppPermission[]; // App-specific permissions
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'es';
    notifications: boolean;
  };
  lastLoginAt?: string;
  isAdmin?: boolean;
}