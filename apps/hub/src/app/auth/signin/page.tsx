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
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [tempUserId, setTempUserId] = useState<string | null>(null);
  
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
      const result = await signIn(email, password);
      
      // TODO: Implement 2FA check via API route
      // Check if user has 2FA enabled
      /*
      if (result && result.user) {
        const response = await fetch('/api/auth/2fa/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: result.user.uid })
        });
        if (response.ok) {
          const { enabled } = await response.json();
          if (enabled) {
            setRequires2FA(true);
            setTempUserId(result.user.uid);
            setIsSubmitting(false);
            return;
          }
        }
      }
      */
      
      // Remove delay - it's making login feel slow
      // Redirect will happen via useEffect
    } catch (err: unknown) {
      const authError = getAuthErrorMessage(err);
      setError(authError.userFriendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handle2FAVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUserId) return;
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // TODO: Implement 2FA verification via API route
      const isValid = false; // await twoFactorService.verifyToken(tempUserId, twoFactorCode);
      
      if (isValid) {
        // 2FA verification successful, complete sign in
        setRequires2FA(false);
        // Redirect will happen via useEffect
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      console.error('2FA verification error:', err);
      setError('Failed to verify code. Please try again.');
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

  // Show 2FA verification form if required
  if (requires2FA) {
    return (
      <div className={styles.container}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>
            {t('auth.twoFactorVerification') || 'Two-Factor Authentication'}
          </h1>
          <p className={styles.subtitle}>
            {t('auth.enterVerificationCode') || 'Enter the verification code from your authenticator app'}
          </p>
          
          <form onSubmit={handle2FAVerification} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="twoFactorCode">
                {t('auth.verificationCode') || 'Verification Code'}
              </label>
              <input
                id="twoFactorCode"
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                required
                autoComplete="one-time-code"
                maxLength={6}
                className={styles.verificationInput}
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
              disabled={isSubmitting || twoFactorCode.length !== 6}
            >
              {isSubmitting ? 
                (t('auth.verifying') || 'Verifying...') : 
                (t('auth.verify') || 'Verify')
              }
            </button>
          </form>
          
          <div className={styles.links}>
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => {
                setRequires2FA(false);
                setTwoFactorCode('');
                setTempUserId(null);
              }}
            >
              {t('auth.backToSignIn') || 'Back to Sign In'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>
          {t('auth:common.signIn') || 'Sign In'}
        </h1>
        <p className={styles.subtitle}>
          {t('hub:welcome.subtitle') || 'Sign in to access your digital ecosystem'}
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
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9em', opacity: 0.8 }}>
                    Note: Google/Facebook/Twitter sign-in will open the Firebase Auth emulator 
                    where you can create a mock account.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              {t('auth:common.email') || 'Email'}
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
              {t('auth:common.password') || 'Password'}
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