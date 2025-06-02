'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@cybereco/ui-components';
import { getAuthErrorMessage, validateEmail } from '@cybereco/auth';
import { useAuth } from '../../../components/AuthContext';
import styles from '../page.module.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { resetPassword } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!validateEmail(email)) {
      setError(t('auth.invalidEmail') || 'Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err: unknown) {
      const authError = getAuthErrorMessage(err);
      setError(authError.userFriendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>
            {t('auth.checkEmail') || 'Check Your Email'}
          </h1>
          <p className={styles.subtitle}>
            {t('auth.resetEmailSent') || 'We sent a password reset link to your email address.'}
          </p>
          <div className={styles.links}>
            <Link href="/auth/signin">
              {t('auth.backToSignIn') || 'Back to Sign In'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>
          {t('auth.resetPassword') || 'Reset Password'}
        </h1>
        <p className={styles.subtitle}>
          {t('auth.resetPasswordSubtitle') || 'Enter your email address and we\'ll send you a link to reset your password.'}
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              {t('auth.email') || 'Email'}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder') || 'Enter your email'}
              required
              autoComplete="email"
            />
          </div>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              (t('auth.sendingReset') || 'Sending reset link...') : 
              (t('auth.sendResetLink') || 'Send Reset Link')
            }
          </button>
        </form>
        
        <div className={styles.links}>
          <Link href="/auth/signin">
            {t('auth.backToSignIn') || 'Back to Sign In'}
          </Link>
          <Link href="/auth/signup">
            {t('auth.noAccount') || "Don't have an account? Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
}