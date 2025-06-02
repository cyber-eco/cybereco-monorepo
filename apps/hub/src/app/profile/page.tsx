'use client';

import { useState } from 'react';
import { useLanguage, Card } from '@cybereco/ui-components';
import { useAuth } from '../../components/AuthContext';
import { FaUser, FaEdit, FaRocket } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Profile() {
  const { userProfile: user, isLoading: loading, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });

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
      email: user.email
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
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className={styles.detailGroup}>
                    <label>Last Login</label>
                    <span>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}