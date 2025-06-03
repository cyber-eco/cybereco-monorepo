'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@cybereco/ui-components';
import { getAuthErrorMessage, parseReturnUrl } from '@cybereco/auth';
import { useHubAuth } from '../../../hooks/useHubAuth';
import styles from '../page.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showHostnameWarning, setShowHostnameWarning] = useState(false);
  
  const { userProfile: user, isLoading: loading, signIn, signInWithProvider } = useHubAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get return URL from query params
  const returnUrl = parseReturnUrl(searchParams);

  // Check if using custom hostname with Firebase emulator
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const hostname = window.location.hostname;
      if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        setShowHostnameWarning(true);
      }
    }
  }, []);

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
    setIsSubmitting(true);
    
    try {
      await signIn(email, password);
      // Remove delay - it's making login feel slow
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
      // Remove delay - it's making login feel slow
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
          {t('auth.signIn') || 'Sign In'}
        </h1>
        <p className={styles.subtitle}>
          {t('hub.welcome.subtitle') || 'Sign in to access your digital ecosystem'}
        </p>
        
        {showHostnameWarning && (
          <div className={styles.warningBox}>
            <p className={styles.warningTitle}>
              ⚠️ {t('auth.customHostnameWarning') || 'Custom Hostname Detected'}
            </p>
            <p className={styles.warningText}>
              {t('auth.customHostnameMessage') || 
              `You're accessing via ${window.location.hostname}. For Google Sign-In to work with Firebase emulator, please use:`}
            </p>
            <a href={`http://localhost:40000${window.location.pathname}${window.location.search}`} 
               className={styles.warningLink}>
              http://localhost:40000
            </a>
            <p className={styles.warningNote}>
              {t('auth.emailSignInNote') || 'Email sign-in will work normally.'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <>
                <div className={styles.demoCredentials}>
                  <p>{t('auth.demoCredentialsTitle') || 'Demo Credentials:'}</p>
                  <code>demo@cybere.co / demo123</code>
                </div>
                <div className={styles.demoNote}>
                  <p>{t('auth.demoNoteText') || 'Or create a new account with any email/password'}</p>
                </div>
              </>
            )}
          </div>
        )}
        
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
                autoComplete="current-password"
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
              (t('auth.signingIn') || 'Signing in...') : 
              (t('auth.signIn') || 'Sign In')
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
          <Link href={`/auth/signup?returnUrl=${encodeURIComponent(returnUrl)}`}>
            {t('auth.noAccount') || "Don't have an account? Sign Up"}
          </Link>
          <Link href="/auth/reset-password">
            {t('auth.forgotPassword') || 'Forgot your password?'}
          </Link>
        </div>
      </div>
    </div>
  );
}