/**
 * Shared Data Service
 * Manages centralized data that can be consumed by all CyberEco apps
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  QueryConstraint,
  serverTimestamp,
  writeBatch,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { getHubFirestore } from '@cybereco/firebase-config';
import {
  SharedUserProfile,
  Transaction,
  Budget,
  SharedGroup,
  SharedActivity,
  Notification,
  ResourcePermission,
  FinancialSummary,
  ActivitySummary,
  DataSyncStatus
} from '@cybereco/shared-types';
import { createLogger } from '@cybereco/auth';

const logger = createLogger('SharedDataService');
const db = getHubFirestore();

// ========== User Profile Management ==========

/**
 * Get user preferences
 */
async function getUserPreferences(userId: string): Promise<{ currency?: string; locale?: string } | null> {
  try {
    const prefsDoc = await getDoc(doc(db, 'userPreferences', userId));
    if (prefsDoc.exists()) {
      return prefsDoc.data() as { currency?: string; locale?: string };
    }
    return null;
  } catch (error) {
    logger.error('Failed to get user preferences', { error, userId });
    return null;
  }
}

export async function getSharedUserProfile(userId: string): Promise<SharedUserProfile | null> {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as SharedUserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching shared user profile:', error);
    throw error;
  }
}

export async function updateSharedUserProfile(
  userId: string, 
  updates: Partial<SharedUserProfile>
): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating shared user profile:', error);
    throw error;
  }
}

export async function linkAppToUserProfile(
  userId: string,
  appId: string,
  appProfileId: string,
  settings?: Record<string, any>
): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      [`appData.${appId}`]: {
        profileId: appProfileId,
        lastAccessed: serverTimestamp(),
        settings: settings || {}
      },
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error linking app to user profile:', error);
    throw error;
  }
}

// ========== Transaction Management ==========

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'transactions'));
    await setDoc(docRef, {
      ...transaction,
      id: docRef.id,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function getUserTransactions(
  userId: string,
  filters?: {
    appId?: string;
    type?: Transaction['type'];
    startDate?: string;
    endDate?: string;
    limit?: number;
  }
): Promise<Transaction[]> {
  try {
    const constraints: QueryConstraint[] = [where('userId', '==', userId)];
    
    if (filters?.appId) {
      constraints.push(where('appId', '==', filters.appId));
    }
    if (filters?.type) {
      constraints.push(where('type', '==', filters.type));
    }
    if (filters?.startDate) {
      constraints.push(where('date', '>=', filters.startDate));
    }
    if (filters?.endDate) {
      constraints.push(where('date', '<=', filters.endDate));
    }
    
    const q = query(collection(db, 'transactions'), ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as Transaction);
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw error;
  }
}

// ========== Group Management ==========

export async function createSharedGroup(group: Omit<SharedGroup, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'groups'));
    await setDoc(docRef, {
      ...group,
      id: docRef.id,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating shared group:', error);
    throw error;
  }
}

export async function getUserGroups(userId: string): Promise<SharedGroup[]> {
  try {
    const q = query(
      collection(db, 'groups'),
      where('members', 'array-contains', { userId, role: 'member' })
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as SharedGroup);
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
}

export async function linkGroupToApp(
  groupId: string,
  appId: string,
  appGroupId: string,
  features: string[]
): Promise<void> {
  try {
    const docRef = doc(db, 'groups', groupId);
    await updateDoc(docRef, {
      [`appContexts.${appId}`]: {
        groupId: appGroupId,
        features
      },
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error linking group to app:', error);
    throw error;
  }
}

// ========== Notification Management ==========

export async function createNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt'>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'notifications'));
    await setDoc(docRef, {
      ...notification,
      id: docRef.id,
      read: false,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function getUserNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
  try {
    const constraints: QueryConstraint[] = [where('userId', '==', userId)];
    
    if (unreadOnly) {
      constraints.push(where('read', '==', false));
    }
    
    const q = query(collection(db, 'notifications'), ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => doc.data() as Notification);
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  try {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

// ========== Permission Management ==========

export async function grantPermission(permission: Omit<ResourcePermission, 'id' | 'grantedAt'>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'permissions'));
    await setDoc(docRef, {
      ...permission,
      id: docRef.id,
      grantedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error granting permission:', error);
    throw error;
  }
}

export async function checkPermission(
  userId: string,
  resourceType: string,
  resourceId: string,
  requiredPermission: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'permissions'),
      where('userId', '==', userId),
      where('resourceType', '==', resourceType),
      where('resourceId', '==', resourceId)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return false;
    
    const permission = snapshot.docs[0].data() as ResourcePermission;
    
    // Check if permission has expired
    if (permission.expiresAt && new Date(permission.expiresAt) < new Date()) {
      return false;
    }
    
    return permission.permissions.includes(requiredPermission);
  } catch (error) {
    logger.error('Error checking permission', { error, userId, resourceId, requiredPermission });
    return false;
  }
}

// ========== Data Aggregation ==========

export async function generateFinancialSummary(
  userId: string,
  startDate: string,
  endDate: string
): Promise<FinancialSummary> {
  try {
    const transactions = await getUserTransactions(userId, { startDate, endDate });
    
    // Get user preferences for currency
    const userPrefs = await getUserPreferences(userId);
    const currency = userPrefs?.currency || 'USD';
    
    const summary: FinancialSummary = {
      userId,
      period: { start: startDate, end: endDate },
      totalIncome: 0,
      totalExpenses: 0,
      netAmount: 0,
      byCategory: [],
      byApp: [],
      currency,
      lastUpdated: new Date().toISOString()
    };
    
    // Calculate totals
    const categoryMap = new Map<string, number>();
    const appMap = new Map<string, { income: number; expenses: number }>();
    
    transactions.forEach(tx => {
      if (tx.type === 'income') {
        summary.totalIncome += tx.amount;
      } else if (tx.type === 'expense' || tx.type === 'settlement') {
        summary.totalExpenses += tx.amount;
      }
      
      // By category
      if (tx.category) {
        categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + tx.amount);
      }
      
      // By app
      if (!appMap.has(tx.appId)) {
        appMap.set(tx.appId, { income: 0, expenses: 0 });
      }
      const appData = appMap.get(tx.appId)!;
      if (tx.type === 'income') {
        appData.income += tx.amount;
      } else {
        appData.expenses += tx.amount;
      }
    });
    
    summary.netAmount = summary.totalIncome - summary.totalExpenses;
    
    // Convert maps to arrays
    summary.byCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / summary.totalExpenses) * 100
    }));
    
    summary.byApp = Array.from(appMap.entries()).map(([appId, data]) => ({
      appId,
      ...data
    }));
    
    return summary;
  } catch (error) {
    console.error('Error generating financial summary:', error);
    throw error;
  }
}

// ========== Real-time Subscriptions ==========

export function subscribeToUserNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false)
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => doc.data() as Notification);
    callback(notifications);
  });
}

export function subscribeToDataSyncStatus(
  userId: string,
  callback: (status: DataSyncStatus[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'dataSyncStatus'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const statuses = snapshot.docs.map(doc => doc.data() as DataSyncStatus);
    callback(statuses);
  });
}

// ========== Batch Operations ==========

export async function batchCreateTransactions(transactions: Omit<Transaction, 'id' | 'createdAt'>[]): Promise<string[]> {
  try {
    const batch = writeBatch(db);
    const ids: string[] = [];
    
    transactions.forEach(transaction => {
      const docRef = doc(collection(db, 'transactions'));
      batch.set(docRef, {
        ...transaction,
        id: docRef.id,
        createdAt: serverTimestamp()
      });
      ids.push(docRef.id);
    });
    
    await batch.commit();
    return ids;
  } catch (error) {
    console.error('Error batch creating transactions:', error);
    throw error;
  }
}