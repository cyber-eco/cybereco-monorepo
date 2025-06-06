/**
 * Shared data models that are centralized in Hub and consumed by apps
 * These models enable data reusability across the CyberEco ecosystem
 */

import { BaseUser } from './user';

// ========== User Management ==========

/**
 * Extended user profile stored in Hub
 * This is the central user record that all apps reference
 */
export interface SharedUserProfile extends BaseUser {
  // Personal information
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  languages: string[];
  
  // Location
  location?: {
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
  };
  
  // Preferences shared across apps
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    currency: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  
  // Social connections
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  
  // App-specific data references
  appData: {
    [appId: string]: {
      profileId: string; // Reference to app-specific profile
      lastAccessed?: string;
      settings?: Record<string, any>;
    };
  };
}

// ========== Financial Data (Shared by JustSplit, future finance apps) ==========

/**
 * Bank account information for payments and settlements
 */
export interface BankAccount {
  id: string;
  userId: string;
  nickname: string;
  accountType: 'checking' | 'savings';
  lastFourDigits: string;
  bankName?: string;
  isDefault: boolean;
  createdAt: string;
  verifiedAt?: string;
}

/**
 * Transaction record that can be used across financial apps
 */
export interface Transaction {
  id: string;
  userId: string;
  type: 'expense' | 'income' | 'transfer' | 'settlement';
  amount: number;
  currency: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  appId: string; // Which app created this transaction
  appSpecificId?: string; // Reference to app-specific record
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Budget that can be shared across financial apps
 */
export interface Budget {
  id: string;
  userId: string;
  name: string;
  amount: number;
  currency: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  categories?: string[];
  startDate: string;
  endDate?: string;
  appIds: string[]; // Apps that contribute to this budget
  createdAt: string;
  updatedAt?: string;
}

// ========== Social/Group Data (Shared by JustSplit, Somos, Demos) ==========

/**
 * Generic group that can be used across apps
 */
export interface SharedGroup {
  id: string;
  name: string;
  description?: string;
  type: 'family' | 'friends' | 'community' | 'organization' | 'other';
  members: GroupMember[];
  admins: string[]; // User IDs
  settings: {
    isPrivate: boolean;
    requireApproval: boolean;
    allowInvites: boolean;
  };
  appContexts: {
    [appId: string]: {
      groupId: string; // App-specific group ID
      features: string[];
    };
  };
  createdAt: string;
  updatedAt?: string;
}

/**
 * Group member with role and permissions
 */
export interface GroupMember {
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  invitedBy?: string;
  permissions?: string[];
}

/**
 * Relationship between users (for family trees, social graphs)
 */
export interface UserRelationship {
  id: string;
  user1Id: string;
  user2Id: string;
  type: 'family' | 'friend' | 'colleague' | 'partner' | 'other';
  subtype?: string; // e.g., 'parent', 'sibling', 'spouse'
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  metadata?: Record<string, any>;
}

// ========== Activity/Event Data ==========

/**
 * Generic activity that can be used across apps
 */
export interface SharedActivity {
  id: string;
  name: string;
  description?: string;
  type: string; // App-specific type
  appId: string;
  participants: string[]; // User IDs
  startDate: string;
  endDate?: string;
  location?: {
    name?: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  tags?: string[];
  visibility: 'public' | 'private' | 'group';
  groupId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  createdBy: string;
}

// ========== Notification System ==========

/**
 * Cross-app notification
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  appId: string;
  actionUrl?: string;
  actionLabel?: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

// ========== Permission System ==========

/**
 * Resource permission for fine-grained access control
 */
export interface ResourcePermission {
  id: string;
  resourceType: string; // e.g., 'group', 'transaction', 'activity'
  resourceId: string;
  userId: string;
  permissions: string[]; // e.g., ['read', 'write', 'delete']
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
}

// ========== Data Aggregation ==========

/**
 * Aggregated financial summary across apps
 */
export interface FinancialSummary {
  userId: string;
  period: {
    start: string;
    end: string;
  };
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  byCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  byApp: {
    appId: string;
    income: number;
    expenses: number;
  }[];
  currency: string;
  lastUpdated: string;
}

/**
 * User activity summary across apps
 */
export interface ActivitySummary {
  userId: string;
  period: {
    start: string;
    end: string;
  };
  totalActivities: number;
  byApp: {
    appId: string;
    count: number;
    lastActivity?: string;
  }[];
  mostActiveGroups: string[];
  lastUpdated: string;
}

// ========== Data Sync ==========

/**
 * Sync status for cross-app data
 */
export interface DataSyncStatus {
  userId: string;
  appId: string;
  lastSyncAt: string;
  syncStatus: 'synced' | 'pending' | 'error';
  pendingChanges: number;
  errorMessage?: string;
}

// ========== Export all types ==========
export type {
  SharedUserProfile as UserProfile,
  SharedGroup as Group,
  SharedActivity as Activity,
};