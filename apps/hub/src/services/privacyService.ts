import { ConsentType } from '@cybereco/auth';

export const privacyService = {
  async getUserPrivacySettings() {
    const response = await fetch('/api/privacy/settings');
    if (!response.ok) {
      throw new Error('Failed to fetch privacy settings');
    }
    return response.json();
  },

  async updatePrivacySettings(settings: any) {
    const response = await fetch('/api/privacy/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update privacy settings');
    }
    return response.json();
  },

  async getUserConsent() {
    const response = await fetch('/api/privacy/consent');
    if (!response.ok) {
      throw new Error('Failed to fetch consent');
    }
    return response.json();
  },

  async recordConsent(consentType: ConsentType, granted: boolean) {
    const response = await fetch('/api/privacy/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ consentType, granted }),
    });
    if (!response.ok) {
      throw new Error('Failed to record consent');
    }
    return response.json();
  },

  async generatePrivacyReport() {
    const response = await fetch('/api/privacy/report');
    if (!response.ok) {
      throw new Error('Failed to generate privacy report');
    }
    return response.json();
  },

  async requestDataDeletion(reason: string, dataTypes: string[]) {
    const response = await fetch('/api/privacy/deletion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason, dataTypes }),
    });
    if (!response.ok) {
      throw new Error('Failed to request data deletion');
    }
    return response.json();
  },
};