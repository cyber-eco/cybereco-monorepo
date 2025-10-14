import { getHubFirestore } from '../../../../firebase-config/src/index';
import { 
  collection, 
  doc,
  getDoc,
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  getDocs,
  DocumentSnapshot,
  QueryConstraint,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { cacheService, RequestBatcher } from './cacheService';
import { useState, useCallback } from 'react';

export interface PaginationOptions {
  pageSize: number;
  lastDoc?: DocumentSnapshot;
}

export interface QueryOptions {
  useCache?: boolean;
  cacheTTL?: number;
  realtime?: boolean;
}

/**
 * Optimized paginated query with caching
 */
export async function paginatedQuery<T>(
  collectionName: string,
  constraints: QueryConstraint[],
  pagination: PaginationOptions,
  options: QueryOptions = {}
): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null }> {
  const { useCache = true, cacheTTL = 300 } = options;
  const db = getHubFirestore();
  
  // Generate cache key
  const cacheKey = `query:${collectionName}:${JSON.stringify(constraints)}:${pagination.pageSize}:${pagination.lastDoc?.id || 'first'}`;
  
  // Check cache first
  if (useCache) {
    const cached = cacheService.get<{ data: T[]; lastDoc: DocumentSnapshot | null }>(cacheKey);
    if (cached) {
      return cached;
    }
  }
  
  // Build query
  const queryConstraints = [...constraints, limit(pagination.pageSize)];
  
  if (pagination.lastDoc) {
    queryConstraints.push(startAfter(pagination.lastDoc));
  }
  
  const q = query(collection(db, collectionName), ...queryConstraints);
  const snapshot = await getDocs(q);
  
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as T));
  
  const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
  
  const result = { data, lastDoc };
  
  // Cache result
  if (useCache) {
    cacheService.set(cacheKey, result, cacheTTL);
  }
  
  return result;
}

/**
 * Batch fetch documents by IDs
 */
const documentBatcher = new RequestBatcher<string, any>(
  async (ids: string[]) => {
    const db = getHubFirestore();
    const results = await Promise.all(
      ids.map(async (id) => {
        const [collectionName, docId] = id.split(':');
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      })
    );
    return results;
  },
  50, // Max batch size
  10  // Max wait time in ms
);

export async function batchGetDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const result = await documentBatcher.add(`${collectionName}:${docId}`);
  return result as T | null;
}

/**
 * Optimized real-time subscription with automatic cleanup
 */
export function subscribeTo<T>(
  collectionName: string,
  constraints: QueryConstraint[],
  callback: (data: T[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const db = getHubFirestore();
  const q = query(collection(db, collectionName), ...constraints);
  
  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
      callback(data);
    },
    onError
  );
}

/**
 * Prefetch and cache commonly used data
 */
export async function prefetchCommonData(): Promise<void> {
  const db = getHubFirestore();
  
  // Prefetch apps list
  const appsQuery = query(collection(db, 'apps'), where('status', '==', 'active'));
  const appsSnapshot = await getDocs(appsQuery);
  const apps = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  cacheService.set('common:apps', apps, 3600); // Cache for 1 hour
  
  // Prefetch other common data...
}

/**
 * Optimized count query
 */
export async function getCount(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<number> {
  const cacheKey = `count:${collectionName}:${JSON.stringify(constraints)}`;
  
  // Check cache
  const cached = cacheService.get<number>(cacheKey);
  if (cached !== null) {
    return cached;
  }
  
  const db = getHubFirestore();
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  const count = snapshot.size;
  
  // Cache for 5 minutes
  cacheService.set(cacheKey, count, 300);
  
  return count;
}

/**
 * Lazy loading hook for infinite scroll
 */
export function useLazyLoad<T>(
  collectionName: string,
  constraints: QueryConstraint[],
  pageSize: number = 20
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const result = await paginatedQuery<T>(
        collectionName,
        constraints,
        { pageSize, lastDoc }
      );
      
      setData(prev => [...prev, ...result.data]);
      setLastDoc(result.lastDoc);
      setHasMore(result.data.length === pageSize);
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setLoading(false);
    }
  }, [collectionName, constraints, pageSize, lastDoc, loading, hasMore]);
  
  return { data, loading, hasMore, loadMore };
}