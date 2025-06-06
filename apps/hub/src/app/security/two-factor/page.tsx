'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHubAuth } from '../../../hooks/useHubAuth';
import { securityService } from '../../../services/securityService';
import { 
  FaShieldAlt, 
  FaQrcode, 
  FaMobileAlt,
  FaKey,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaCopy,
  FaExclamationTriangle
} from 'react-icons/fa';
import styles from './page.module.css';

export default function TwoFactorSetupPage() {
  const { userProfile: user, isLoading } = useHubAuth();
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'backup' | 'complete'>('intro');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    checkExisting2FA();
  }, [user]);

  const checkExisting2FA = async () => {
    if (!user) return;
    
    try {
      const { enabled } = await securityService.check2FAStatus();
      setIs2FAEnabled(enabled);
      if (enabled) {
        setStep('complete');
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const handleSetupStart = async () => {
    if (!user || !user.email) return;
    
    try {
      const secretData = await securityService.enable2FA();
      setQrCode(secretData.dataURL || '');
      setSecret(secretData.tempSecret || '');
      setBackupCodes(secretData.backupCodes || []);
      setStep('setup');
    } catch (error) {
      setError('Failed to generate 2FA secret. Please try again.');
    }
  };

  const handleVerification = async () => {
    if (!user || !verificationCode) return;
    
    setIsVerifying(true);
    setError('');
    
    try {
      const verified = await securityService.verify2FA(verificationCode);
      
      if (verified) {
        setStep('backup');
        setIs2FAEnabled(true);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
      return;
    }
    
    try {
      await securityService.disable2FA(verificationCode);
      setIs2FAEnabled(false);
      setStep('intro');
    } catch (error) {
      setError('Failed to disable 2FA. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const downloadBackupCodes = () => {
    const content = `CyberEco Hub - 2FA Backup Codes\n\nThese codes can be used to access your account if you lose your 2FA device.\nEach code can only be used once.\n\n${backupCodes.join('\n')}\n\nGenerated: ${new Date().toISOString()}\n\nKeep these codes safe!`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cybereco-2fa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaShieldAlt className={styles.titleIcon} />
            Two-Factor Authentication
          </h1>
        </header>

        {error && (
          <div className={styles.errorMessage}>
            <FaExclamationTriangle /> {error}
          </div>
        )}

        {step === 'intro' && (
          <div className={styles.introSection}>
            <div className={styles.infoCard}>
              <h2>Secure Your Account</h2>
              <p>
                Two-factor authentication adds an extra layer of security to your account 
                by requiring a verification code in addition to your password.
              </p>
              
              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <FaShieldAlt className={styles.benefitIcon} />
                  <div>
                    <h3>Enhanced Security</h3>
                    <p>Protect against unauthorized access even if your password is compromised</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <FaMobileAlt className={styles.benefitIcon} />
                  <div>
                    <h3>Easy to Use</h3>
                    <p>Use any authenticator app on your phone to generate codes</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <FaKey className={styles.benefitIcon} />
                  <div>
                    <h3>Backup Codes</h3>
                    <p>Recovery codes ensure you never lose access to your account</p>
                  </div>
                </div>
              </div>
              
              <button 
                className={styles.primaryButton} 
                onClick={handleSetupStart}
              >
                Set Up Two-Factor Authentication
              </button>
            </div>
          </div>
        )}

        {step === 'setup' && (
          <div className={styles.setupSection}>
            <div className={styles.setupCard}>
              <h2>Set Up Your Authenticator App</h2>
              
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h3>Install an Authenticator App</h3>
                    <p>We recommend Google Authenticator or Microsoft Authenticator</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h3>Scan the QR Code</h3>
                    <div className={styles.qrCodeContainer}>
                      <img src={qrCode} alt="2FA QR Code" className={styles.qrCode} />
                    </div>
                    <p className={styles.alternativeText}>
                      Can't scan? Enter this code manually:
                    </p>
                    <div className={styles.secretCode}>
                      <code>{secret}</code>
                      <button 
                        className={styles.copyButton}
                        onClick={() => copyToClipboard(secret)}
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className={styles.primaryButton}
                onClick={() => setStep('verify')}
              >
                Continue to Verification
              </button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className={styles.verifySection}>
            <div className={styles.verifyCard}>
              <h2>Verify Your Setup</h2>
              <p>Enter the 6-digit code from your authenticator app</p>
              
              <div className={styles.codeInput}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className={styles.verificationInput}
                />
              </div>
              
              <button 
                className={styles.primaryButton}
                onClick={handleVerification}
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? (
                  <><FaSpinner className={styles.spinner} /> Verifying...</>
                ) : (
                  'Verify and Enable 2FA'
                )}
              </button>
              
              <button 
                className={styles.secondaryButton}
                onClick={() => setStep('setup')}
              >
                Back to QR Code
              </button>
            </div>
          </div>
        )}

        {step === 'backup' && (
          <div className={styles.backupSection}>
            <div className={styles.backupCard}>
              <h2>Save Your Backup Codes</h2>
              <p>
                These codes can be used to access your account if you lose your authenticator device. 
                Each code can only be used once.
              </p>
              
              <div className={styles.backupCodes}>
                {backupCodes.map((code, index) => (
                  <div key={index} className={styles.backupCode}>
                    <code>{code}</code>
                    <button 
                      className={styles.copyCodeButton}
                      onClick={() => copyToClipboard(code)}
                    >
                      {copiedCode === code ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className={styles.backupActions}>
                <button 
                  className={styles.downloadButton}
                  onClick={downloadBackupCodes}
                >
                  Download Codes
                </button>
                <button 
                  className={styles.primaryButton}
                  onClick={() => setStep('complete')}
                >
                  I've Saved My Codes
                </button>
              </div>
              
              <p className={styles.warning}>
                <FaExclamationTriangle /> Store these codes in a safe place. 
                You won't be able to see them again.
              </p>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className={styles.completeSection}>
            <div className={styles.completeCard}>
              <div className={styles.successIcon}>
                <FaCheck />
              </div>
              <h2>Two-Factor Authentication is {is2FAEnabled ? 'Enabled' : 'Disabled'}</h2>
              {is2FAEnabled ? (
                <>
                  <p>Your account is now protected with two-factor authentication.</p>
                  <div className={styles.completeActions}>
                    <button 
                      className={styles.secondaryButton}
                      onClick={handleDisable2FA}
                    >
                      Disable 2FA
                    </button>
                    <button 
                      className={styles.primaryButton}
                      onClick={() => router.push('/security')}
                    >
                      Back to Security Settings
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>You can enable two-factor authentication to secure your account.</p>
                  <button 
                    className={styles.primaryButton}
                    onClick={() => setStep('intro')}
                  >
                    Enable 2FA
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}