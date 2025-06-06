/**
 * Permission Service
 * Manages app and resource permissions across the CyberEco ecosystem
 */

import { 
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { getHubFirestore } from '@cybereco/firebase-config';
import { AppPermission, HubUser } from '@cybereco/shared-types';

const db = getHubFirestore();

// ========== App Permissions ==========

/**
 * Permission levels for apps
 */
export enum AppPermissionLevel {
  NONE = 'none',
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin'
}

/**
 * Feature flags that can be enabled per app
 */
export enum AppFeature {
  // JustSplit features
  EXPENSE_TRACKING = 'expense-tracking',
  GROUP_MANAGEMENT = 'group-management',
  SETTLEMENT_TRACKING = 'settlement-tracking',
  BUDGET_MANAGEMENT = 'budget-management',
  
  // Somos features
  FAMILY_TREE = 'family-tree',
  MEMORY_SHARING = 'memory-sharing',
  CULTURAL_HERITAGE = 'cultural-heritage',
  
  // Demos features
  PROPOSAL_CREATION = 'proposal-creation',
  VOTING = 'voting',
  COMMUNITY_MODERATION = 'community-moderation',
  
  // Plantopia features
  GARDEN_MANAGEMENT = 'garden-management',
  PLANT_CARE = 'plant-care',
  HARVEST_TRACKING = 'harvest-tracking',
  
  // Cross-app features
  DATA_EXPORT = 'data-export',
  API_ACCESS = 'api-access',
  ANALYTICS = 'analytics'
}

/**
 * Check if a user has permission to access an app
 */
export async function hasAppAccess(userId: string, appId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) return false;
    
    const user = userDoc.data() as HubUser;
    
    // Admins have access to all apps
    if (user.isAdmin) return true;
    
    // Check if user has explicit permission for this app
    return user.apps.includes(appId);
  } catch (error) {
    console.error('Error checking app access:', error);
    return false;
  }
}

/**
 * Grant app access to a user
 */
export async function grantAppAccess(
  userId: string,
  appId: string,
  features: string[] = [],
  grantedBy: string
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const user = userDoc.data() as HubUser;
    
    // Add app to user's app list if not already present
    if (!user.apps.includes(appId)) {
      user.apps.push(appId);
    }
    
    // Update or add app permission
    const existingPermission = user.permissions.find(p => p.appId === appId);
    
    if (existingPermission) {
      // Merge features
      existingPermission.features = Array.from(new Set([...existingPermission.features, ...features]));
    } else {
      // Add new permission
      user.permissions.push({
        appId,
        roles: ['user'],
        features
      });
    }
    
    // Update user document
    await updateDoc(userRef, {
      apps: user.apps,
      permissions: user.permissions,
      updatedAt: serverTimestamp()
    });
    
    // Log permission grant
    await logPermissionChange({
      userId,
      appId,
      action: 'grant',
      features,
      grantedBy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error granting app access:', error);
    throw error;
  }
}

/**
 * Revoke app access from a user
 */
export async function revokeAppAccess(
  userId: string,
  appId: string,
  revokedBy: string
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const user = userDoc.data() as HubUser;
    
    // Remove app from user's app list
    user.apps = user.apps.filter(id => id !== appId);
    
    // Remove app permission
    user.permissions = user.permissions.filter(p => p.appId !== appId);
    
    // Update user document
    await updateDoc(userRef, {
      apps: user.apps,
      permissions: user.permissions,
      updatedAt: serverTimestamp()
    });
    
    // Log permission revoke
    await logPermissionChange({
      userId,
      appId,
      action: 'revoke',
      features: [],
      grantedBy: revokedBy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revoking app access:', error);
    throw error;
  }
}

/**
 * Check if a user has a specific feature enabled for an app
 */
export async function hasAppFeature(
  userId: string,
  appId: string,
  feature: string
): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) return false;
    
    const user = userDoc.data() as HubUser;
    
    // Admins have all features
    if (user.isAdmin) return true;
    
    // Find app permission
    const appPermission = user.permissions.find(p => p.appId === appId);
    
    if (!appPermission) return false;
    
    // Check if feature is enabled
    return appPermission.features.includes(feature);
  } catch (error) {
    console.error('Error checking app feature:', error);
    return false;
  }
}

/**
 * Get all permissions for a user
 */
export async function getUserPermissions(userId: string): Promise<AppPermission[]> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) return [];
    
    const user = userDoc.data() as HubUser;
    return user.permissions || [];
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return [];
  }
}

// ========== Role Management ==========

/**
 * Add a role to a user for an app
 */
export async function addUserRole(
  userId: string,
  appId: string,
  role: 'user' | 'admin' | 'owner'
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const user = userDoc.data() as HubUser;
    const appPermission = user.permissions.find(p => p.appId === appId);
    
    if (!appPermission) {
      throw new Error('User does not have access to this app');
    }
    
    // Add role if not already present
    if (!appPermission.roles.includes(role)) {
      appPermission.roles.push(role);
      
      await updateDoc(userRef, {
        permissions: user.permissions,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error adding user role:', error);
    throw error;
  }
}

/**
 * Check if a user has a specific role for an app
 */
export async function hasRole(
  userId: string,
  appId: string,
  role: 'user' | 'admin' | 'owner'
): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) return false;
    
    const user = userDoc.data() as HubUser;
    
    // Admins have all roles
    if (user.isAdmin) return true;
    
    const appPermission = user.permissions.find(p => p.appId === appId);
    
    if (!appPermission) return false;
    
    return appPermission.roles.includes(role);
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

// ========== Resource Permissions ==========

/**
 * Check if a user can access a resource
 */
export async function canAccessResource(
  userId: string,
  resourceType: string,
  resourceId: string,
  action: 'read' | 'write' | 'delete'
): Promise<boolean> {
  try {
    // Check resource-specific permissions
    const permissionDoc = await getDoc(
      doc(db, 'resourcePermissions', `${userId}_${resourceType}_${resourceId}`)
    );
    
    if (permissionDoc.exists()) {
      const permissions = permissionDoc.data().permissions as string[];
      return permissions.includes(action);
    }
    
    // Check if user is owner of the resource
    const resourceDoc = await getDoc(doc(db, resourceType, resourceId));
    
    if (resourceDoc.exists()) {
      const resource = resourceDoc.data();
      
      // Owner has full access
      if (resource.ownerId === userId || resource.userId === userId || resource.createdBy === userId) {
        return true;
      }
      
      // Check if user is in a shared group
      if (resource.groupId) {
        const groupDoc = await getDoc(doc(db, 'groups', resource.groupId));
        if (groupDoc.exists()) {
          const group = groupDoc.data();
          const member = group.members.find((m: any) => m.userId === userId);
          
          if (member) {
            // Admins can do everything
            if (member.role === 'admin') return true;
            
            // Members can read, moderators can write
            if (action === 'read') return true;
            if (action === 'write' && member.role === 'moderator') return true;
          }
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking resource access:', error);
    return false;
  }
}

/**
 * Grant resource permission to a user
 */
export async function grantResourcePermission(
  userId: string,
  resourceType: string,
  resourceId: string,
  permissions: string[],
  grantedBy: string,
  expiresAt?: string
): Promise<void> {
  try {
    const permissionId = `${userId}_${resourceType}_${resourceId}`;
    
    await setDoc(doc(db, 'resourcePermissions', permissionId), {
      userId,
      resourceType,
      resourceId,
      permissions,
      grantedBy,
      grantedAt: serverTimestamp(),
      expiresAt: expiresAt || null
    });
  } catch (error) {
    console.error('Error granting resource permission:', error);
    throw error;
  }
}

// ========== Audit Logging ==========

interface PermissionChangeLog {
  userId: string;
  appId: string;
  action: 'grant' | 'revoke' | 'modify';
  features: string[];
  grantedBy: string;
  timestamp: string;
}

async function logPermissionChange(log: PermissionChangeLog): Promise<void> {
  try {
    await setDoc(doc(collection(db, 'permissionLogs')), {
      ...log,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error logging permission change:', error);
    // Don't throw - logging should not break the main operation
  }
}

/**
 * Get permission audit logs for a user
 */
export async function getPermissionLogs(
  userId: string,
  limit = 50
): Promise<PermissionChangeLog[]> {
  try {
    const q = query(
      collection(db, 'permissionLogs'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => doc.data() as PermissionChangeLog)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting permission logs:', error);
    return [];
  }
}

// ========== Permission Middleware ==========

/**
 * Middleware function to check permissions before executing an action
 */
export function requirePermission(
  requiredPermissions: {
    appId?: string;
    feature?: string;
    role?: 'user' | 'admin' | 'owner';
    resourceType?: string;
    resourceId?: string;
    action?: 'read' | 'write' | 'delete';
  }
) {
  return async (userId: string): Promise<boolean> => {
    try {
      // Check app access
      if (requiredPermissions.appId) {
        const hasAccess = await hasAppAccess(userId, requiredPermissions.appId);
        if (!hasAccess) return false;
      }
      
      // Check feature
      if (requiredPermissions.appId && requiredPermissions.feature) {
        const hasFeature = await hasAppFeature(
          userId,
          requiredPermissions.appId,
          requiredPermissions.feature
        );
        if (!hasFeature) return false;
      }
      
      // Check role
      if (requiredPermissions.appId && requiredPermissions.role) {
        const hasRequiredRole = await hasRole(
          userId,
          requiredPermissions.appId,
          requiredPermissions.role
        );
        if (!hasRequiredRole) return false;
      }
      
      // Check resource access
      if (requiredPermissions.resourceType && requiredPermissions.resourceId && requiredPermissions.action) {
        const canAccess = await canAccessResource(
          userId,
          requiredPermissions.resourceType,
          requiredPermissions.resourceId,
          requiredPermissions.action
        );
        if (!canAccess) return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in permission middleware:', error);
      return false;
    }
  };
}