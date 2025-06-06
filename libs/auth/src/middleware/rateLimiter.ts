import { NextRequest, NextResponse } from 'next/server';

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean; // Skip counting successful requests
  keyGenerator?: (req: NextRequest) => string; // Custom key generator
  message?: string; // Custom rate limit message
}

export interface RateLimitStore {
  increment(key: string, windowMs: number): Promise<number>;
  reset(key: string): Promise<void>;
}

// In-memory store for development
class InMemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, { count: number; resetAt: number }>();

  async increment(key: string, windowMs: number): Promise<number> {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || record.resetAt < now) {
      this.store.set(key, {
        count: 1,
        resetAt: now + windowMs
      });
      return 1;
    }

    record.count++;
    return record.count;
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key);
  }

  // Cleanup expired entries periodically
  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (record.resetAt < now) {
        this.store.delete(key);
      }
    }
  }

  constructor() {
    // Run cleanup every minute
    setInterval(() => this.cleanup(), 60000);
  }
}

// Redis store for production
class RedisRateLimitStore implements RateLimitStore {
  private redis: any; // Redis client instance

  constructor(redisClient: any) {
    this.redis = redisClient;
  }

  async increment(key: string, windowMs: number): Promise<number> {
    const multi = this.redis.multi();
    multi.incr(key);
    multi.expire(key, Math.ceil(windowMs / 1000));
    const results = await multi.exec();
    return results[0][1];
  }

  async reset(key: string): Promise<void> {
    await this.redis.del(key);
  }
}

// Rate limiter middleware factory
export function createRateLimiter(
  config: RateLimitConfig,
  store: RateLimitStore = new InMemoryRateLimitStore()
) {
  const {
    windowMs,
    maxRequests,
    skipSuccessfulRequests = false,
    keyGenerator = defaultKeyGenerator,
    message = 'Too many requests, please try again later.'
  } = config;

  return async function rateLimiter(
    req: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const key = keyGenerator(req);
    const count = await store.increment(key, windowMs);

    // Check if limit exceeded
    if (count > maxRequests) {
      return NextResponse.json(
        { error: message },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString(),
            'Retry-After': Math.ceil(windowMs / 1000).toString()
          }
        }
      );
    }

    // Process request
    const response = await handler(req);

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', Math.max(0, maxRequests - count).toString());
    response.headers.set('X-RateLimit-Reset', new Date(Date.now() + windowMs).toISOString());

    // Reset count on successful auth if configured
    if (skipSuccessfulRequests && response.status === 200) {
      await store.reset(key);
    }

    return response;
  };
}

// Default key generator using IP address
function defaultKeyGenerator(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
             req.headers.get('x-real-ip') ||
             'unknown';
  return `rate-limit:${ip}`;
}

// Specific rate limiters for different endpoints
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: 'Too many authentication attempts. Please try again later.'
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  message: 'API rate limit exceeded. Please slow down.'
});

export const exportRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 exports per hour
  message: 'Export rate limit exceeded. Please try again later.'
});

// Export store implementations
export { InMemoryRateLimitStore, RedisRateLimitStore };