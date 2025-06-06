'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@cybereco/auth';
import { ConsentType } from '@cybereco/auth';
import { privacyService } from '../../services/privacyService';
import type { PrivacySettings } from '@cybereco/auth';
import { 
  Card, 
  Button, 
  Alert,
  Toast,
  useToast 
} from '@cybereco/ui-components';
import { 
  FaLock, 
  FaUserShield, 
  FaEye, 
  FaEyeSlash,
  FaCog,
  FaDownload,
  FaTrash,
  FaInfoCircle
} from 'react-icons/fa';
import styles from './page.module.css';

export default function PrivacyPage() {
  const { currentUser, userProfile } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);
  const [consents, setConsents] = useState<Record<ConsentType, boolean>>({
    [ConsentType.NECESSARY]: true,
    [ConsentType.FUNCTIONAL]: false,
    [ConsentType.ANALYTICS]: false,
    [ConsentType.MARKETING]: false,
    [ConsentType.PERSONALIZATION]: false
  });

  useEffect(() => {
    if (currentUser) {
      loadPrivacyData();
    }
  }, [currentUser]);

  const loadPrivacyData = async () => {
    if (!currentUser) return;

    try {
      const [settings, userConsents] = await Promise.all([
        privacyService.getUserPrivacySettings(),
        privacyService.getUserConsent()
      ]);

      setPrivacySettings(settings);
      setConsents(userConsents);
    } catch (error) {
      console.error('Error loading privacy data:', error);
      showToast({
        type: 'error',
        message: 'Failed to load privacy settings'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacySettingChange = (
    category: keyof PrivacySettings, 
    field: string, 
    value: any
  ) => {
    if (!privacySettings) return;

    setPrivacySettings(prev => {
      if (!prev) return prev;
      const categoryData = prev[category as keyof PrivacySettings];
      if (typeof categoryData === 'object' && categoryData !== null) {
        return {
          ...prev,
          [category]: {
            ...categoryData,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleConsentChange = async (consentType: ConsentType, granted: boolean) => {
    if (!currentUser) return;

    try {
      await privacyService.recordConsent(consentType, granted);
      setConsents(prev => ({
        ...prev,
        [consentType]: granted
      }));
      
      showToast({
        type: 'success',
        message: `${consentType} consent ${granted ? 'granted' : 'revoked'}`
      });
    } catch (error) {
      console.error('Error updating consent:', error);
      showToast({
        type: 'error',
        message: 'Failed to update consent'
      });
    }
  };

  const savePrivacySettings = async () => {
    if (!currentUser || !privacySettings) return;

    setSaving(true);
    try {
      await privacyService.updatePrivacySettings(privacySettings);
      showToast({
        type: 'success',
        message: 'Privacy settings updated successfully'
      });
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      showToast({
        type: 'error',
        message: 'Failed to save privacy settings'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDataExport = async () => {
    if (!currentUser) return;

    try {
      const report = await privacyService.generatePrivacyReport();
      
      // Create and download the report
      const blob = new Blob([JSON.stringify(report, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `privacy-report-${currentUser?.uid}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast({
        type: 'success',
        message: 'Privacy report downloaded'
      });
    } catch (error) {
      console.error('Error generating privacy report:', error);
      showToast({
        type: 'error',
        message: 'Failed to generate privacy report'
      });
    }
  };

  const handleDataDeletion = async () => {
    if (!currentUser) return;

    const confirmed = window.confirm(
      'Are you sure you want to request deletion of all your data? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      const requestId = await privacyService.requestDataDeletion(
        'User requested data deletion',
        [] // All data types
      );
      
      showToast({
        type: 'success',
        message: `Data deletion request submitted (ID: ${requestId})`
      });
    } catch (error) {
      console.error('Error requesting data deletion:', error);
      showToast({
        type: 'error',
        message: 'Failed to submit data deletion request'
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading privacy settings...</div>
      </div>
    );
  }

  if (!currentUser || !privacySettings) {
    return (
      <div className={styles.container}>
        <Alert type="error">Please sign in to manage your privacy settings</Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FaUserShield /> Privacy Settings
        </h1>
        <p>Control how your data is collected, used, and shared</p>
      </div>

      {/* Consent Management */}
      <Card className={styles.section}>
        <h2><FaLock /> Data Processing Consent</h2>
        <div className={styles.consentGrid}>
          <div className={styles.consentItem}>
            <div className={styles.consentInfo}>
              <h3>Necessary</h3>
              <p>Required for basic functionality</p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled
              className={styles.checkbox}
            />
          </div>

          <div className={styles.consentItem}>
            <div className={styles.consentInfo}>
              <h3>Functional</h3>
              <p>Enhanced features and preferences</p>
            </div>
            <input
              type="checkbox"
              checked={consents[ConsentType.FUNCTIONAL]}
              onChange={(e) => handleConsentChange(ConsentType.FUNCTIONAL, e.target.checked)}
              className={styles.checkbox}
            />
          </div>

          <div className={styles.consentItem}>
            <div className={styles.consentInfo}>
              <h3>Analytics</h3>
              <p>Help us improve our services</p>
            </div>
            <input
              type="checkbox"
              checked={consents[ConsentType.ANALYTICS]}
              onChange={(e) => handleConsentChange(ConsentType.ANALYTICS, e.target.checked)}
              className={styles.checkbox}
            />
          </div>

          <div className={styles.consentItem}>
            <div className={styles.consentInfo}>
              <h3>Marketing</h3>
              <p>Receive promotional content</p>
            </div>
            <input
              type="checkbox"
              checked={consents[ConsentType.MARKETING]}
              onChange={(e) => handleConsentChange(ConsentType.MARKETING, e.target.checked)}
              className={styles.checkbox}
            />
          </div>

          <div className={styles.consentItem}>
            <div className={styles.consentInfo}>
              <h3>Personalization</h3>
              <p>Tailored content and recommendations</p>
            </div>
            <input
              type="checkbox"
              checked={consents[ConsentType.PERSONALIZATION]}
              onChange={(e) => handleConsentChange(ConsentType.PERSONALIZATION, e.target.checked)}
              className={styles.checkbox}
            />
          </div>
        </div>
      </Card>

      {/* Profile Visibility */}
      <Card className={styles.section}>
        <h2><FaEye /> Profile Visibility</h2>
        <div className={styles.visibilityOptions}>
          <label>
            <input
              type="radio"
              name="profileVisibility"
              value="public"
              checked={privacySettings.profileVisibility === 'public'}
              onChange={(e) => setPrivacySettings(prev => ({
                ...prev!,
                profileVisibility: e.target.value as any
              }))}
            />
            <span>Public</span>
            <small>Anyone can see your profile</small>
          </label>

          <label>
            <input
              type="radio"
              name="profileVisibility"
              value="friends"
              checked={privacySettings.profileVisibility === 'friends'}
              onChange={(e) => setPrivacySettings(prev => ({
                ...prev!,
                profileVisibility: e.target.value as any
              }))}
            />
            <span>Friends Only</span>
            <small>Only friends can see your profile</small>
          </label>

          <label>
            <input
              type="radio"
              name="profileVisibility"
              value="private"
              checked={privacySettings.profileVisibility === 'private'}
              onChange={(e) => setPrivacySettings(prev => ({
                ...prev!,
                profileVisibility: e.target.value as any
              }))}
            />
            <span>Private</span>
            <small>Nobody can see your profile</small>
          </label>
        </div>
      </Card>

      {/* Activity Visibility */}
      <Card className={styles.section}>
        <h2><FaCog /> Activity Visibility</h2>
        <div className={styles.activityGrid}>
          {Object.entries(privacySettings.activityVisibility).map(([activity, visibility]) => (
            <div key={activity} className={styles.activityItem}>
              <label>{activity.charAt(0).toUpperCase() + activity.slice(1)}</label>
              <select
                value={visibility}
                onChange={(e) => handlePrivacySettingChange(
                  'activityVisibility', 
                  activity, 
                  e.target.value
                )}
                className={styles.select}
              >
                <option value="everyone">Everyone</option>
                <option value="friends">Friends Only</option>
                <option value="only-me">Only Me</option>
              </select>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Sharing */}
      <Card className={styles.section}>
        <h2><FaInfoCircle /> Data Sharing</h2>
        <div className={styles.dataSharingOptions}>
          <label>
            <input
              type="checkbox"
              checked={privacySettings.dataSharing.analytics}
              onChange={(e) => handlePrivacySettingChange(
                'dataSharing', 
                'analytics', 
                e.target.checked
              )}
            />
            <span>Share usage data for analytics</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={privacySettings.dataSharing.personalizedAds}
              onChange={(e) => handlePrivacySettingChange(
                'dataSharing', 
                'personalizedAds', 
                e.target.checked
              )}
            />
            <span>Allow personalized advertisements</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={privacySettings.dataSharing.thirdPartyApps}
              onChange={(e) => handlePrivacySettingChange(
                'dataSharing', 
                'thirdPartyApps', 
                e.target.checked
              )}
            />
            <span>Share data with connected apps</span>
          </label>
        </div>
      </Card>

      {/* Actions */}
      <Card className={styles.section}>
        <h2>Privacy Actions</h2>
        <div className={styles.actions}>
          <Button
            onClick={savePrivacySettings}
            disabled={saving}
            className={styles.saveButton}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>

          <Button
            variant="secondary"
            onClick={handleDataExport}
            className={styles.actionButton}
          >
            <FaDownload /> Download Privacy Report
          </Button>

          <Button
            variant="danger"
            onClick={handleDataDeletion}
            className={styles.actionButton}
          >
            <FaTrash /> Request Data Deletion
          </Button>
        </div>
      </Card>

    </div>
  );
}