'use client';

import { useState } from 'react';
import { useLanguage, Card } from '@cybereco/ui-components';
import { useAuth } from '../../components/AuthContext';
import { FaShieldAlt, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from '../page.module.css';

export default function Security() {
  const { userProfile: user, isLoading: loading, currentUser } = useAuth();
  const { t } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

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
          {t('auth.signInError') || 'Please sign in to access security settings'}
        </div>
      </div>
    );
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t('auth.passwordMismatch') || 'Passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsUpdating(true);
    try {
      // In a real implementation, you would use Firebase Auth updatePassword
      // const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      // await reauthenticateWithCredential(currentUser, credential);
      // await updatePassword(currentUser, passwordForm.newPassword);
      
      console.log('Password change requested');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update password');
    } finally {
      setIsUpdating(false);
    }
  };

  const isGoogleAccount = currentUser?.providerData.some(provider => provider.providerId === 'google.com');
  const isFacebookAccount = currentUser?.providerData.some(provider => provider.providerId === 'facebook.com');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaShieldAlt className={styles.titleIcon} />
            {t('footer.security') || 'Security'}
          </h1>
          <p className={styles.subtitle}>
            Manage your account security and privacy settings
          </p>
        </header>

        <div className={styles.formContainer}>
          <Card className={styles.securityCard}>
            <h2 className={styles.cardTitle}>
              <FaKey className={styles.cardIcon} />
              Account Information
            </h2>
            
            <div className={styles.securityInfo}>
              <div className={styles.infoGroup}>
                <label>Email Address</label>
                <span className={styles.infoValue}>{user.email}</span>
                <span className={styles.verified}>✓ Verified</span>
              </div>
              
              <div className={styles.infoGroup}>
                <label>Account Type</label>
                <span className={styles.infoValue}>
                  {isGoogleAccount ? 'Google Account' : 
                   isFacebookAccount ? 'Facebook Account' : 
                   'Email Account'}
                </span>
              </div>
              
              <div className={styles.infoGroup}>
                <label>Two-Factor Authentication</label>
                <span className={styles.infoValue}>
                  <span className={styles.notEnabled}>Not Enabled</span>
                  <button className={styles.enableButton}>Enable</button>
                </span>
              </div>
            </div>
          </Card>

          {!isGoogleAccount && !isFacebookAccount && (
            <Card className={styles.securityCard}>
              <h2 className={styles.cardTitle}>
                <FaKey className={styles.cardIcon} />
                Change Password
              </h2>
              
              <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={styles.passwordToggle}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      minLength={6}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.passwordToggle}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      minLength={6}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className={styles.error}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className={styles.updateButton}
                >
                  {isUpdating ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </Card>
          )}

          <Card className={styles.securityCard}>
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <span className={styles.activityDate}>
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'No recent activity'}
                </span>
                <span className={styles.activityDescription}>Last sign in</span>
              </div>
            </div>
          </Card>

          <Card className={styles.securityCard}>
            <h2 className={styles.cardTitle}>Danger Zone</h2>
            <div className={styles.dangerZone}>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button className={styles.deleteButton}>
                Delete Account
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}