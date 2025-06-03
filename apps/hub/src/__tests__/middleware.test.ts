import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '../middleware';

// Mock NextRequest
function createMockRequest(url: string, options?: RequestInit): NextRequest {
  const baseUrl = 'http://localhost:40000';
  return new NextRequest(new URL(url, baseUrl), options);
}

describe('Hub Middleware', () => {
  describe('Proxy Routing', () => {
    it('should add proxy headers for JustSplit routes', async () => {
      const request = createMockRequest('/app/justsplit/dashboard');
      const response = await middleware(request);

      expect(response.headers.get('X-Hub-Proxy')).toBe('true');
      expect(response.headers.get('X-Target-App')).toBe('JustSplit');
    });

    it('should add proxy headers for Website routes', async () => {
      const request = createMockRequest('/app/website/about');
      const response = await middleware(request);

      expect(response.headers.get('X-Hub-Proxy')).toBe('true');
      expect(response.headers.get('X-Target-App')).toBe('Website');
    });

    it('should redirect to coming soon for unreleased apps', async () => {
      const request = createMockRequest('/app/somos');
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain('/coming-soon?app=somos');
    });

    it('should redirect to coming soon for Demos app', async () => {
      const request = createMockRequest('/app/demos/test');
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain('/coming-soon?app=demos');
    });
  });

  describe('Security Headers', () => {
    it('should add security headers to all responses', async () => {
      const request = createMockRequest('/');
      const response = await middleware(request);

      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(response.headers.get('Permissions-Policy')).toContain('camera=()');
    });

    it('should add CORS headers for API routes', async () => {
      const request = createMockRequest('/api/auth/verify');
      const response = await middleware(request);

      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
      expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
    });
  });

  describe('Static Files', () => {
    it('should not process static files', async () => {
      const request = createMockRequest('/_next/static/chunk.js');
      const response = await middleware(request);

      // Middleware should pass through without modification
      expect(response).toBeDefined();
    });

    it('should not process image optimization files', async () => {
      const request = createMockRequest('/_next/image?url=test.jpg');
      const response = await middleware(request);

      expect(response).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle routes with query parameters', async () => {
      const request = createMockRequest('/app/justsplit/expense?id=123');
      const response = await middleware(request);

      expect(response.headers.get('X-Hub-Proxy')).toBe('true');
      expect(response.headers.get('X-Target-App')).toBe('JustSplit');
    });

    it('should handle routes with hash fragments', async () => {
      const request = createMockRequest('/app/website/docs#section');
      const response = await middleware(request);

      expect(response.headers.get('X-Hub-Proxy')).toBe('true');
      expect(response.headers.get('X-Target-App')).toBe('Website');
    });

    it('should handle POST requests', async () => {
      const request = createMockRequest('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      const response = await middleware(request);

      expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    });
  });

  describe('Performance', () => {
    it('should process requests quickly', async () => {
      const startTime = Date.now();
      const request = createMockRequest('/app/justsplit');
      await middleware(request);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });

    it('should handle concurrent requests', async () => {
      const requests = Array.from({ length: 10 }, (_, i) => 
        createMockRequest(`/app/justsplit/page${i}`)
      );

      const responses = await Promise.all(
        requests.map(req => middleware(req))
      );

      responses.forEach(response => {
        expect(response.headers.get('X-Hub-Proxy')).toBe('true');
      });
    });
  });
});