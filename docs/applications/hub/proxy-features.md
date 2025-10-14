# Hub Proxy Features

## Overview

The CyberEco Hub includes a sophisticated proxy layer that enables seamless navigation between ecosystem applications while maintaining security and performance.

## Core Features

### 1. Intelligent Routing

The Hub automatically routes requests to the appropriate application based on URL patterns:

```typescript
// Example proxy routes
/app/justsplit → JustSplit application (port 40002)
/app/website → Marketing website (port 40001)
/app/somos → Somos application (coming soon)
```

### 2. Authentication Passthrough

- **Shared Sessions**: Authentication state is maintained across all apps
- **Token Forwarding**: JWT tokens are automatically forwarded to proxied apps
- **CORS Handling**: Cross-origin requests are properly configured

### 3. Security Enhancement

#### Request Filtering
- Malicious request patterns blocked
- SQL injection prevention
- XSS protection

#### Header Management
```typescript
// Security headers added to all responses
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

### 4. Performance Optimization

- **Response Caching**: Static assets cached at proxy level
- **Compression**: Gzip/Brotli compression for all responses
- **Connection Pooling**: Efficient backend connections

## Implementation Details

### Next.js Middleware

The proxy is implemented using Next.js middleware for optimal performance:

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if request is for an app
  if (pathname.startsWith('/app/')) {
    // Extract app name
    const appName = pathname.split('/')[2];
    
    // Route to appropriate backend
    return routeToApp(appName, request);
  }
  
  // Add security headers
  return addSecurityHeaders(request);
}
```

### Rewrites Configuration

Backend routing is configured in `next.config.js`:

```javascript
async rewrites() {
  return {
    afterFiles: [
      {
        source: '/app/justsplit/:path*',
        destination: 'http://localhost:40002/:path*',
      },
      // Additional app routes...
    ],
  };
}
```

## Advanced Features

### 1. Load Balancing

For production deployments, the proxy supports:
- Round-robin load balancing
- Health check monitoring
- Automatic failover

### 2. Request Transformation

- **Path Rewriting**: Modify URLs before forwarding
- **Header Injection**: Add custom headers
- **Body Transformation**: Modify request/response bodies

### 3. Analytics & Monitoring

- Request logging
- Performance metrics
- Error tracking
- Usage analytics

### 4. Circuit Breaker

Prevents cascading failures:
```typescript
if (failureRate > threshold) {
  return fallbackResponse();
}
```

## Configuration

### Environment Variables

```env
# Proxy configuration
PROXY_TIMEOUT=30000
PROXY_MAX_REDIRECTS=5
PROXY_COMPRESSION=true
PROXY_CACHE_TTL=3600

# App endpoints
JUSTSPLIT_URL=http://localhost:40002
WEBSITE_URL=http://localhost:40001
```

### Dynamic Configuration

Apps can be configured dynamically:

```typescript
const appConfig = {
  justsplit: {
    url: process.env.JUSTSPLIT_URL,
    timeout: 30000,
    retries: 3,
  },
  // Additional apps...
};
```

## Testing Proxy Features

### Unit Tests

```typescript
describe('Proxy Middleware', () => {
  it('should route to correct app', async () => {
    const req = createMockRequest('/app/justsplit/dashboard');
    const res = await middleware(req);
    expect(res.headers.get('X-Target-App')).toBe('JustSplit');
  });
});
```

### Integration Tests

```bash
# Test proxy routing
npm run test:proxy

# Test with specific app
npm run test:proxy -- --app=justsplit
```

### Load Testing

```bash
# Using k6
k6 run tests/load/proxy.js

# Using Artillery
artillery run tests/load/proxy.yml
```

## Best Practices

### 1. Error Handling

Always provide meaningful error responses:
```typescript
try {
  return await proxyRequest(req);
} catch (error) {
  return new Response('Service temporarily unavailable', {
    status: 503,
    headers: { 'Retry-After': '60' }
  });
}
```

### 2. Timeout Management

Set appropriate timeouts for different operations:
- API calls: 10s
- File uploads: 60s
- Streaming: No timeout

### 3. Logging

Log all proxy operations for debugging:
```typescript
logger.info({
  method: req.method,
  path: req.url,
  target: targetApp,
  duration: responseTime,
  status: res.status
});
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**
   - Check if target app is running
   - Verify network connectivity
   - Check proxy timeout settings

2. **CORS Errors**
   - Verify allowed origins
   - Check preflight handling
   - Review header configuration

3. **Authentication Issues**
   - Verify token forwarding
   - Check cookie settings
   - Review session configuration

### Debug Mode

Enable debug logging:
```env
DEBUG=hub:proxy
```

## Future Enhancements

1. **WebSocket Support**: Proxy WebSocket connections
2. **GraphQL Federation**: Unite multiple GraphQL schemas
3. **Edge Computing**: Deploy proxy to edge locations
4. **AI-Powered Routing**: Intelligent request routing based on patterns

## Related Documentation

- [Hub README](./README.md)
- [Security Guidelines](/docs/operations/security/compliance-framework.md)
- [Performance Optimization](/docs/operations/monitoring/performance-metrics.md)