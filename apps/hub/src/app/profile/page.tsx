'use client';

import { useState, useEffect } from 'react';
import { useLanguage, Card } from '@cybereco/ui-components';
import { useHubAuth } from '../../hooks/useHubAuth';
import { 
  type PrivacySettings 
} from '@cybereco/auth';
import { FaUser, FaEdit, FaRocket, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Profile() {
  const { userProfile: user, isLoading: loading, updateProfile } = useHubAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  useEffect(() => {
    if (user) {
      loadPrivacySettings();
    }
  }, [user]);

  const loadPrivacySettings = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/privacy/settings');
      if (!response.ok) throw new Error('Failed to load privacy settings');
      const settings = await response.json();
      setPrivacySettings(settings);
    } catch (error) {
      console.error('Error loading privacy settings:', error);
    }
  };

  const handlePrivacyChange = (
    category: keyof PrivacySettings, 
    field: string, 
    value: any
  ) => {
    if (!privacySettings) return;

    setPrivacySettings(prev => {
      const categoryData = prev![category as keyof PrivacySettings];
      return {
        ...prev!,
        [category]: {
          ...(typeof categoryData === 'object' && categoryData !== null ? categoryData : {}),
          [field]: value
        }
      };
    });
  };

  const savePrivacySettings = async () => {
    if (!user || !privacySettings) return;

    setSavingPrivacy(true);
    try {
      const response = await fetch('/api/privacy/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(privacySettings)
      });
      if (!response.ok) throw new Error('Failed to update privacy settings');
      alert('Privacy settings updated successfully!');
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      alert('Failed to save privacy settings');
    } finally {
      setSavingPrivacy(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>{t('hub.loading') || 'Loading your profile...'}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaRocket className={styles.titleIcon} />
          <h2>{t('auth.signInError') || 'Please sign in to access your profile'}</h2>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditForm({
      name: user.name,
      email: user.email || ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (updateProfile) {
        await updateProfile({
          ...user,
          name: editForm.name,
          email: editForm.email,
          updatedAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ name: '', email: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaUser className={styles.titleIcon} />
            {t('navigation.profile') || 'Profile'}
          </h1>
          <p className={styles.subtitle}>
            Manage your personal information and preferences
          </p>
        </header>

        <div className={styles.formContainer}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarSection}>
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt="Profile" 
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {!isEditing && (
                <button 
                  onClick={handleEdit}
                  className={styles.editButton}
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            <div className={styles.profileInfo}>
              {isEditing ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button 
                      onClick={handleSave}
                      className={styles.saveButton}
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancel}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.profileDetails}>
                  <div className={styles.detailGroup}>
                    <label>Full Name</label>
                    <span>{user.name}</span>
                  </div>
                  
                  <div className={styles.detailGroup}>
                    <label>Email</label>
                    <span>{user.email}</span>
                  </div>
                  
                  <div className={styles.detailGroup}>
                    <label>Member Since</label>
                    <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  
                  <div className={styles.detailGroup}>
                    <label>Last Login</label>
                    <span>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className={styles.profileCard} style={{ marginTop: '2rem' }}>
            <div className={styles.profileHeader}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaShieldAlt /> Privacy Settings
              </h2>
              <button 
                onClick={() => setShowPrivacySettings(!showPrivacySettings)}
                className={styles.editButton}
              >
                {showPrivacySettings ? <FaEyeSlash /> : <FaEye />} 
                {showPrivacySettings ? 'Hide' : 'Show'} Settings
              </button>
            </div>

            {showPrivacySettings && privacySettings && (
              <div className={styles.privacySettings}>
                <div className={styles.privacySection}>
                  <h3>Profile Visibility</h3>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => setPrivacySettings(prev => ({
                      ...prev!,
                      profileVisibility: e.target.value as any
                    }))}
                    className={styles.select}
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className={styles.privacySection}>
                  <h3>Activity Visibility</h3>
                  {Object.entries(privacySettings.activityVisibility).map(([activity, visibility]) => (
                    <div key={activity} className={styles.privacyOption}>
                      <label>{activity.charAt(0).toUpperCase() + activity.slice(1)}</label>
                      <select
                        value={visibility}
                        onChange={(e) => handlePrivacyChange(
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

                <div className={styles.privacySection}>
                  <h3>Data Sharing</h3>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing.analytics}
                      onChange={(e) => handlePrivacyChange(
                        'dataSharing', 
                        'analytics', 
                        e.target.checked
                      )}
                    />
                    Share usage data for analytics
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing.personalizedAds}
                      onChange={(e) => handlePrivacyChange(
                        'dataSharing', 
                        'personalizedAds', 
                        e.target.checked
                      )}
                    />
                    Allow personalized advertisements
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing.thirdPartyApps}
                      onChange={(e) => handlePrivacyChange(
                        'dataSharing', 
                        'thirdPartyApps', 
                        e.target.checked
                      )}
                    />
                    Share data with connected apps
                  </label>
                </div>

                <div className={styles.formActions}>
                  <button 
                    onClick={savePrivacySettings}
                    className={styles.saveButton}
                    disabled={savingPrivacy}
                  >
                    {savingPrivacy ? 'Saving...' : 'Save Privacy Settings'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}