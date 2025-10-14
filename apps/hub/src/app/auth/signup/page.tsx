'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@cybereco/ui-components';
import { getAuthErrorMessage, parseReturnUrl, validatePassword } from '@cybereco/auth';
import { useHubAuth } from '../../../hooks/useHubAuth';
import styles from '../page.module.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { userProfile: user, isLoading: loading, signUp, signInWithProvider } = useHubAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get return URL from query params
  const returnUrl = parseReturnUrl(searchParams);

  useEffect(() => {
    if (user && !loading) {
      // Check if returnUrl is an external app URL
      if (returnUrl && returnUrl !== '/' && (returnUrl.startsWith('http://') || returnUrl.startsWith('https://'))) {
        // For external URLs (like JustSplit), use window.location
        window.location.href = returnUrl;
      } else {
        // For internal routes, use Next.js router
        router.push(returnUrl || '/dashboard');
      }
    }
  }, [user, loading, router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate password match
    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch') || 'Passwords do not match');
      return;
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signUp(email, password, name);
      // Redirect will happen via useEffect
    } catch (err: unknown) {
      const authError = getAuthErrorMessage(err);
      setError(authError.userFriendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    setError('');
    try {
      await signInWithProvider(provider);
      // Redirect will happen via useEffect
    } catch (err: unknown) {
      const authError = getAuthErrorMessage(err);
      setError(authError.userFriendlyMessage);
    }
  };

  // If user is already signed in, show redirecting message
  // Don't wait for loading to finish - check user immediately
  if (user && !loading) {
    return (
      <div className={styles.container}>
        <div className={styles.authCard}>
          <div className={styles.loading}>
            {t('hub.loading') || 'Redirecting...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>
          {t('auth.signUp') || 'Sign Up'}
        </h1>
        <p className={styles.subtitle}>
          {t('auth.signUpSubtitle') || 'Create your CyberEco account'}
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              {t('auth.fullName') || 'Full Name'}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('auth.namePlaceholder') || 'Enter your full name'}
              required
              autoComplete="name"
            />
          </div>
          
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
          
          <div className={styles.formGroup}>
            <label htmlFor="password">
              {t('auth.password') || 'Password'}
            </label>
            <div className={styles.passwordInput}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder') || 'Enter your password'}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (t('auth.hide') || 'Hide') : (t('auth.show') || 'Show')}
              </button>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              {t('auth.confirmPassword') || 'Confirm Password'}
            </label>
            <div className={styles.passwordInput}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.confirmPasswordPlaceholder') || 'Confirm your password'}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (t('auth.hide') || 'Hide') : (t('auth.show') || 'Show')}
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
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              (t('auth.signingUp') || 'Creating account...') : 
              (t('auth.signUp') || 'Sign Up')
            }
          </button>
        </form>
        
        <div className={styles.divider}>
          {t('auth.or') || 'or'}
        </div>
        
        <div className={styles.socialButtons}>
          <button 
            className={`${styles.socialButton} ${styles.google}`}
            onClick={() => handleSocialSignIn('google')}
            type="button"
          >
            {t('auth.continueWithGoogle') || 'Continue with Google'}
          </button>
          <button 
            className={`${styles.socialButton} ${styles.facebook}`}
            onClick={() => handleSocialSignIn('facebook')}
            type="button"
          >
            {t('auth.continueWithFacebook') || 'Continue with Facebook'}
          </button>
          <button 
            className={`${styles.socialButton} ${styles.twitter}`}
            onClick={() => handleSocialSignIn('twitter')}
            type="button"
          >
            {t('auth.continueWithTwitter') || 'Continue with Twitter'}
          </button>
        </div>
        
        <div className={styles.links}>
          <Link href={`/auth/signin?returnUrl=${encodeURIComponent(returnUrl)}`}>
            {t('auth.hasAccount') || 'Already have an account? Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
}