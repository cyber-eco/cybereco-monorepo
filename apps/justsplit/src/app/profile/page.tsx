'use client';

import Image from 'next/image';
import { useAuth } from '../../context/JustSplitAuthContext';
import NotificationModule from '../../context/NotificationContext';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function ProfilePage() {
  const { userProfile, signOut, redirectToHub } = useAuth();
  const { showNotification } = NotificationModule.useNotification();
  
  const handleEditProfile = () => {
    // Profile updates must be done through Hub
    showNotification('Redirecting to Hub to update profile...', 'info');
    redirectToHub('profile');
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification('You have been signed out successfully', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      showNotification('Failed to sign out: ' + errorMessage, 'error');
    }
  };
  
  if (!userProfile) {
    return (
      <div className={styles.container}>
        <h1>Profile Not Found</h1>
        <p>No user profile has been set up yet.</p>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <h1>Your Profile</h1>
      
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {userProfile?.avatarUrl ? (
              <Image 
                src={userProfile.avatarUrl} 
                alt={`${userProfile.name}'s avatar`} 
                className={styles.avatarImage}
                width={100}
                height={100}
              />
            ) : (
              <span>{userProfile?.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2>{userProfile?.name}</h2>
            {userProfile?.email && <p>{userProfile.email}</p>}
          </div>
        </div>
        
        <div className={styles.profileSection}>
          <h3>Personal Information</h3>
          
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name:</span>
              <span className={styles.infoValue}>{userProfile.name}</span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>
                {userProfile.email ?? 'Not provided'}
              </span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Hub User ID:</span>
              <span className={styles.infoValue}>
                {userProfile.hubUserId}
              </span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Preferred Currency:</span>
              <span className={styles.infoValue}>
                {userProfile.preferredCurrency ?? 'USD'}
              </span>
            </div>
          </div>
          
          <p className={styles.infoNote}>
            To update your profile information, please visit the Hub.
          </p>
          
          <button onClick={handleEditProfile} className={styles.editButton}>
            Edit Profile in Hub
          </button>
        </div>
        
        <div className={styles.profileSection}>
          <h3>JustSplit Balance</h3>
          
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Current Balance:</span>
              <span className={styles.infoValue}>
                {userProfile.balance} {userProfile.preferredCurrency ?? 'USD'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Sign out button at bottom */}
        <div className={styles.signOutSection}>
          <Button 
            onClick={handleSignOut} 
            variant="secondary"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}