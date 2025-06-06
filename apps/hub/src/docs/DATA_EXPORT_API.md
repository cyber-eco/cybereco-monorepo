# Data Export API Documentation

## Overview
The Data Export API allows authenticated users to export their personal data from the CyberEco Hub in various formats. This supports data portability and GDPR compliance.

## Endpoints

### POST /api/export
Export user data in specified format.

#### Authentication
Requires Bearer token authentication via Firebase ID token.

```
Authorization: Bearer <firebase-id-token>
```

#### Request Body
```json
{
  "format": "json" | "csv",
  "includeMetadata": boolean,
  "dateRange": {
    "start": "ISO 8601 date string",
    "end": "ISO 8601 date string"
  },
  "dataTypes": ["profile", "permissions", "activities", "sessions", "applications"]
}
```

#### Parameters
- `format` (required): Export format - either "json" or "csv"
- `includeMetadata` (optional): Include export metadata (default: true)
- `dateRange` (optional): Filter activities by date range
- `dataTypes` (optional): Specific data types to export (default: all)

#### Response
- **Success (200)**: File download with appropriate content-type
  - JSON: `application/json`
  - CSV: `text/csv`
- **Unauthorized (401)**: Missing or invalid authentication token
- **Server Error (500)**: Export failed

#### Example Request
```bash
curl -X POST https://hub.cybere.co/api/export \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "format": "json",
    "includeMetadata": true,
    "dateRange": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-12-31T23:59:59Z"
    }
  }'
```

### GET /api/export
Get available export options and limits.

#### Authentication
Requires Bearer token authentication.

#### Response
```json
{
  "formats": ["json", "csv"],
  "dataTypes": ["profile", "permissions", "activities", "sessions", "applications"],
  "features": {
    "dateRange": true,
    "includeMetadata": true,
    "selectiveExport": true
  },
  "limits": {
    "maxActivities": 1000,
    "maxSessions": 100
  }
}
```

## Data Export Service

### Exported Data Structure

#### JSON Format
```json
{
  "profile": {
    "uid": "string",
    "email": "string",
    "displayName": "string",
    "createdAt": "ISO 8601 date",
    "photoURL": "string"
  },
  "permissions": [
    {
      "id": "string",
      "appId": "string",
      "permissions": ["read", "write"],
      "grantedAt": "ISO 8601 date"
    }
  ],
  "activities": [
    {
      "id": "string",
      "type": "string",
      "timestamp": "ISO 8601 date",
      "details": {}
    }
  ],
  "sessions": [
    {
      "id": "string",
      "createdAt": "ISO 8601 date",
      "lastActive": "ISO 8601 date",
      "userAgent": "string"
    }
  ],
  "applications": [
    {
      "id": "string",
      "appId": "string",
      "authorizedAt": "ISO 8601 date",
      "scopes": ["string"]
    }
  ],
  "metadata": {
    "exportDate": "ISO 8601 date",
    "userId": "string",
    "version": "string"
  }
}
```

#### CSV Format
Data is organized in sections with headers:
```
=== USER PROFILE ===
uid,email,displayName,createdAt,photoURL
...

=== PERMISSIONS ===
id,userId,appId,permissions,grantedAt
...

=== ACTIVITIES ===
id,userId,type,timestamp,details
...
```

### Data Sanitization
The following sensitive fields are automatically removed:
- `password`
- `passwordHash`
- `salt`
- `sessionToken`
- `refreshToken`
- `apiKey`
- `secretKey`

### Timestamp Handling
All Firestore timestamps are converted to ISO 8601 format for consistency.

## UI Integration

### Export Modal
The My Data page (`/my-data`) includes an export modal with:
- Format selection (JSON/CSV)
- Metadata inclusion toggle
- Optional date range filter
- Real-time export progress
- Error handling with user feedback

### Usage Example
```typescript
const handleExport = async () => {
  const token = await auth.currentUser?.getIdToken();
  
  const response = await fetch('/api/export', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      format: 'json',
      includeMetadata: true
    })
  });
  
  if (response.ok) {
    const blob = await response.blob();
    // Download file
  }
};
```

## Security Considerations

1. **Authentication**: All requests require valid Firebase ID tokens
2. **Authorization**: Users can only export their own data
3. **Rate Limiting**: Consider implementing rate limits to prevent abuse
4. **Data Sanitization**: Sensitive fields are automatically removed
5. **HTTPS Only**: All requests must use HTTPS in production

## Error Handling

### Common Errors
- `401 Unauthorized`: Invalid or missing authentication token
- `500 Internal Server Error`: Database query failed or export processing error

### Client-Side Error Handling
```typescript
try {
  const response = await fetch('/api/export', ...);
  if (!response.ok) {
    throw new Error('Export failed');
  }
  // Handle success
} catch (error) {
  console.error('Export error:', error);
  alert('Failed to export data. Please try again.');
}
```

## Testing

Comprehensive test suites are available:
- `dataExportService.test.ts`: Unit tests for export service
- `route.test.ts`: API endpoint tests
- `page.test.tsx`: Integration tests for UI components

Run tests with:
```bash
npm test -- --testPathPattern="dataExport"
```