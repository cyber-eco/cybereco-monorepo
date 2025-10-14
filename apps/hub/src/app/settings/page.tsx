'use client';

import { useState } from 'react';
import { useLanguage, Card, useTheme } from '@cybereco/ui-components';
import { useAuth } from '../../components/AuthContext';
import styles from '../page.module.css';

export default function Settings() {
  const { userProfile: user, isLoading: loading, updateProfile } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState<{
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'es';
    notifications: boolean;
  }>({
    theme: user?.preferences?.theme || 'auto',
    language: user?.preferences?.language || 'en',
    notifications: user?.preferences?.notifications ?? true
  });
  const [isUpdating, setIsUpdating] = useState(false);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          {t('hub.loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          {t('auth.signInError') || 'Please sign in to access settings'}
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      // Update local settings
      if (preferences.language !== language) {
        setLanguage(preferences.language as 'en' | 'es');
      }
      
      if (preferences.theme !== theme && (preferences.theme === 'light' || preferences.theme === 'dark')) {
        // Only toggle if the current theme doesn't match the preference
        if ((theme === 'light' && preferences.theme === 'dark') || 
            (theme === 'dark' && preferences.theme === 'light')) {
          toggleTheme();
        }
      }

      // Update user profile
      if (updateProfile) {
        await updateProfile({
          ...user,
          preferences: {
            ...user.preferences,
            ...preferences
          },
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {t('navigation.settings') || 'Settings'}
          </h1>
          <p className={styles.subtitle}>
            Customize your CyberEco experience
          </p>
        </header>

        <div className={styles.formContainer}>
          <Card className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>Appearance</h2>
            
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                {t('theme.title') || 'Theme'}
              </label>
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' | 'auto' })}
                className={styles.select}
              >
                <option value="light">{t('theme.light') || 'Light'}</option>
                <option value="dark">{t('theme.dark') || 'Dark'}</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                {t('language.title') || 'Language'}
              </label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value as 'en' | 'es' })}
                className={styles.select}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </Card>

          <Card className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>Notifications</h2>
            
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                Email Notifications
              </label>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </Card>

          <Card className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>Account Information</h2>
            
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>User ID</label>
              <span className={styles.settingValue}>{user.id}</span>
            </div>
            
            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>Account Created</label>
              <span className={styles.settingValue}>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </span>
            </div>
          </Card>

          <div className={styles.formActions}>
            <button 
              onClick={handleSave}
              disabled={isUpdating}
              className={styles.saveButton}
            >
              {isUpdating ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}