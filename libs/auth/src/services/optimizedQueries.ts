import { createLogger } from '../utils/logger';
import { DocumentSnapshot } from 'firebase/firestore';
import { useState, useCallback } from 'react';

const logger = createLogger('OptimizedQueries');

export interface PaginationOptions {
  pageSize: number;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface QueryOptions extends PaginationOptions {
  filters?: Record<string, any>;
  cacheKey?: string;
  cacheTTL?: number;
}

// Client-side stub implementation
export async function paginatedQuery(
  collectionPath: string,
  options: QueryOptions,
  lastDoc?: DocumentSnapshot
): Promise<{ docs: any[]; lastDoc: DocumentSnapshot | null }> {
  logger.warn('paginatedQuery called on client - use API routes instead');
  throw new Error('Firestore operations must be performed server-side');
}

export async function batchGetDocument(
  collectionPath: string,
  docIds: string[]
): Promise<any[]> {
  logger.warn('batchGetDocument called on client - use API routes instead');
  throw new Error('Firestore operations must be performed server-side');
}

export function subscribeTo(
  collectionPath: string,
  filters: QueryOptions,
  callback: (data: any[]) => void
): () => void {
  logger.warn('subscribeTo called on client - use API routes instead');
  return () => {};
}

export async function prefetchCommonData(
  userId: string,
  dataTypes: string[]
): Promise<void> {
  logger.warn('prefetchCommonData called on client - use API routes instead');
  throw new Error('Firestore operations must be performed server-side');
}

export async function getCount(
  collectionPath: string,
  filters?: Record<string, any>
): Promise<number> {
  logger.warn('getCount called on client - use API routes instead');
  throw new Error('Firestore operations must be performed server-side');
}

export function useLazyLoad(
  collectionPath: string,
  options: QueryOptions
): {
  data: any[];
  loading: boolean;
  error: Error | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  refresh: () => Promise<void>;
} {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    logger.warn('useLazyLoad.loadMore called on client - use API routes instead');
    setError(new Error('Firestore operations must be performed server-side'));
  }, []);

  const refresh = useCallback(async () => {
    logger.warn('useLazyLoad.refresh called on client - use API routes instead');
    setError(new Error('Firestore operations must be performed server-side'));
  }, []);

  return { data, loading, error, loadMore, hasMore, refresh };
}