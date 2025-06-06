/**
 * Client-side security service that calls API routes
 */

export const securityService = {
  async check2FAStatus() {
    const response = await fetch('/api/security/2fa/status');
    if (!response.ok) {
      throw new Error('Failed to check 2FA status');
    }
    return response.json();
  },

  async enable2FA() {
    const response = await fetch('/api/security/2fa/enable', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to enable 2FA');
    }
    return response.json();
  },

  async verify2FA(token: string) {
    const response = await fetch('/api/security/2fa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      throw new Error('Failed to verify 2FA token');
    }
    return response.json();
  },

  async disable2FA(token: string) {
    const response = await fetch('/api/security/2fa/disable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      throw new Error('Failed to disable 2FA');
    }
    return response.json();
  },

  async getSessions() {
    const response = await fetch('/api/security/sessions');
    if (!response.ok) {
      throw new Error('Failed to fetch sessions');
    }
    return response.json();
  },

  async revokeSession(sessionId: string) {
    const response = await fetch(`/api/security/sessions/${sessionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to revoke session');
    }
    return response.json();
  },

  async revokeAllSessions() {
    const response = await fetch('/api/security/sessions/all', {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to revoke all sessions');
    }
    return response.json();
  },
};