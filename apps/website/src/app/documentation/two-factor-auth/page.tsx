'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLock, FaMobileAlt, FaQrcode, FaShieldAlt, FaKey, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import styles from '../page.module.css';

export default function TwoFactorAuthDocumentation() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {t('documentation:documentationPage.twoFactor.title') || 'Two-Factor Authentication (2FA)'}
        </h1>
        <p className={styles.subtitle}>
          {t('documentation:documentationPage.twoFactor.description') || 'Add an extra layer of security to your CyberEco account with TOTP-based authentication'}
        </p>
      </div>

      <nav className={styles.tableOfContents}>
        <h2>{t('documentation:documentationPage.tableOfContents') || 'Table of Contents'}</h2>
        <ul>
          <li><a href="#overview">{t('documentation:documentationPage.twoFactor.overview.title') || 'Overview'}</a></li>
          <li><a href="#setup-guide">{t('documentation:documentationPage.twoFactor.setup.title') || 'Setup Guide'}</a></li>
          <li><a href="#how-it-works">{t('documentation:documentationPage.twoFactor.howItWorks.title') || 'How It Works'}</a></li>
          <li><a href="#backup-codes">{t('documentation:documentationPage.twoFactor.backupCodes.title') || 'Backup Codes'}</a></li>
          <li><a href="#integration">{t('documentation:documentationPage.twoFactor.integration.title') || 'Integration Guide'}</a></li>
          <li><a href="#troubleshooting">{t('documentation:documentationPage.twoFactor.troubleshooting.title') || 'Troubleshooting'}</a></li>
          <li><a href="#api-reference">{t('documentation:documentationPage.twoFactor.api.title') || 'API Reference'}</a></li>
        </ul>
      </nav>

      <section id="overview" className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.overview.title') || 'Overview'}</h3>
        <p>
          {t('documentation:documentationPage.twoFactor.overview.description') || 
          'Two-Factor Authentication (2FA) provides an additional security layer beyond just a password. CyberEco implements Time-based One-Time Password (TOTP) authentication, compatible with popular authenticator apps like Google Authenticator, Authy, and Microsoft Authenticator.'}
        </p>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaMobileAlt className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.twoFactor.features.mobile.title') || 'Mobile Authentication'}</h3>
            <p>{t('documentation:documentationPage.twoFactor.features.mobile.description') || 'Use your smartphone as a second factor with any TOTP-compatible app'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaQrcode className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.twoFactor.features.easySetup.title') || 'Easy Setup'}</h3>
            <p>{t('documentation:documentationPage.twoFactor.features.easySetup.description') || 'Quick QR code scanning for seamless authenticator app configuration'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaKey className={styles.featureIcon} />
            <h3>Backup Codes</h3>
            <p>Recovery codes ensure you're never locked out of your account</p>
          </div>
          <div className={styles.featureCard}>
            <FaShieldAlt className={styles.featureIcon} />
            <h3>Enhanced Security</h3>
            <p>Protect against password theft and unauthorized access attempts</p>
          </div>
        </div>
      </section>

      <section id="setup-guide" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Setup Guide</h3>
        
        <h3>Step 1: Enable 2FA</h3>
        <ol className={styles.numberedList}>
          <li>Navigate to <strong>Hub → Security → Two-Factor Authentication</strong></li>
          <li>Click "Enable Two-Factor Authentication"</li>
          <li>Verify your password to continue</li>
        </ol>

        <h3>Step 2: Configure Authenticator App</h3>
        <div className={styles.infoBox}>
          <h4>Supported Apps:</h4>
          <ul>
            <li>Google Authenticator</li>
            <li>Microsoft Authenticator</li>
            <li>Authy</li>
            <li>1Password</li>
            <li>Any TOTP-compatible app</li>
          </ul>
        </div>

        <p>Scan the QR code with your authenticator app or manually enter the secret key:</p>
        
        <div className={styles.codeBlock}>
          <pre>{`// Example QR code data format
otpauth://totp/CyberEco%20Hub:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=CyberEco%20Hub`}</pre>
        </div>

        <h3>Step 3: Verify Setup</h3>
        <p>Enter the 6-digit code from your authenticator app to complete setup.</p>

        <h3>Step 4: Save Backup Codes</h3>
        <div className={styles.warningBox}>
          <h4>Important:</h4>
          <p>Save your backup codes in a secure location. Each code can only be used once.</p>
        </div>
      </section>

      <section id="how-it-works" className={styles.contentSection}>
        <h3 className={styles.subTitle}>How It Works</h3>
        
        <h3>TOTP Algorithm</h3>
        <p>
          CyberEco uses the Time-based One-Time Password algorithm (RFC 6238) with these parameters:
        </p>
        
        <div className={styles.codeBlock}>
          <pre>{`Configuration:
- Algorithm: SHA-1
- Digits: 6
- Period: 30 seconds
- Secret Length: 32 bytes`}</pre>
        </div>

        <h3>Authentication Flow</h3>
        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Enter Credentials</h4>
              <p>User provides email and password</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Verify Password</h4>
              <p>System validates credentials</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>Request 2FA Code</h4>
              <p>If 2FA enabled, prompt for code</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h4>Verify TOTP</h4>
              <p>Validate 6-digit code</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepContent}>
              <h4>Grant Access</h4>
              <p>Create authenticated session</p>
            </div>
          </div>
        </div>

        <h3>Code Generation</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Generate 2FA secret
const secret = twoFactorService.generateSecret(
  userId,
  userEmail
);

// Verify TOTP code
const isValid = await twoFactorService.verifyToken(
  userId,
  userInputCode
);`}</pre>
        </div>
      </section>

      <section id="backup-codes" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Backup Codes</h3>
        
        <h3>What Are Backup Codes?</h3>
        <p>
          Backup codes are single-use codes that can be used to access your account if you lose
          access to your authenticator device. Each code can only be used once.
        </p>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>10 unique codes</strong> generated during 2FA setup
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>Single use only</strong> - each code becomes invalid after use
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>Regeneratable</strong> - create new codes anytime
            </div>
          </div>
        </div>

        <h3>Using Backup Codes</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Verify backup code
const isValid = await twoFactorService.verifyBackupCode(
  userId,
  backupCode
);

// Generate new backup codes
const newCodes = await twoFactorService.regenerateBackupCodes(
  userId
);`}</pre>
        </div>

        <h3>Best Practices</h3>
        <ul>
          <li>Store codes in a secure password manager</li>
          <li>Print codes and store in a safe location</li>
          <li>Never share backup codes with anyone</li>
          <li>Regenerate codes if any are compromised</li>
        </ul>
      </section>

      <section id="integration" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Integration Guide</h3>
        
        <h3>1. Setup 2FA Service</h3>
        <div className={styles.codeBlock}>
          <pre>{`import { twoFactorService } from '@cybereco/auth';

// Generate secret for new 2FA setup
async function setupTwoFactor(userId: string, email: string) {
  const secret = await twoFactorService.generateSecret(
    userId,
    email
  );
  
  return {
    secret: secret.base32,
    qrCode: secret.dataURL,
    backupCodes: secret.backupCodes
  };
}`}</pre>
        </div>

        <h3>2. Enable 2FA</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Verify and enable 2FA
async function enableTwoFactor(
  userId: string, 
  verificationCode: string,
  deviceInfo: DeviceInfo
) {
  const verified = await twoFactorService.verifyAndEnable(
    userId,
    verificationCode,
    deviceInfo
  );
  
  if (!verified) {
    throw new Error('Invalid verification code');
  }
  
  return { success: true };
}`}</pre>
        </div>

        <h3>3. Implement in Sign In Flow</h3>
        <div className={styles.codeBlock}>
          <pre>{`// Modified sign in with 2FA check
async function signIn(email: string, password: string) {
  // Verify credentials
  const result = await auth.signIn(email, password);
  
  // Check if 2FA is enabled
  if (await twoFactorService.isEnabled(result.user.uid)) {
    // Return partial auth state
    return {
      requiresTwoFactor: true,
      userId: result.user.uid
    };
  }
  
  // Complete sign in
  return { user: result.user };
}

// Handle 2FA verification
async function verifyTwoFactor(userId: string, code: string) {
  const isValid = await twoFactorService.verifyToken(
    userId,
    code
  );
  
  if (!isValid) {
    throw new Error('Invalid 2FA code');
  }
  
  // Complete authentication
  return completeSignIn(userId);
}`}</pre>
        </div>

        <h3>4. UI Implementation</h3>
        <div className={styles.codeBlock}>
          <pre>{`// React component example
function TwoFactorVerification({ userId, onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      const isValid = await twoFactorService.verifyToken(
        userId,
        code
      );
      
      if (isValid) {
        onSuccess();
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed');
    }
  };
  
  return (
    <form onSubmit={handleVerify}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\\D/g, ''))}
        maxLength={6}
        placeholder="000000"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Verify</button>
    </form>
  );
}`}</pre>
        </div>
      </section>

      <section id="troubleshooting" className={styles.contentSection}>
        <h3 className={styles.subTitle}>Troubleshooting</h3>
        
        <h3>Common Issues</h3>
        
        <div className={styles.troubleshootItem}>
          <h4>Invalid Code Error</h4>
          <p>If codes are consistently invalid:</p>
          <ul>
            <li>Verify your device time is synchronized</li>
            <li>Check timezone settings on both device and server</li>
            <li>Ensure code is entered within 30-second window</li>
          </ul>
        </div>

        <div className={styles.troubleshootItem}>
          <h4>Lost Authenticator Device</h4>
          <ol>
            <li>Use a backup code to sign in</li>
            <li>Disable 2FA from security settings</li>
            <li>Re-enable with new device</li>
          </ol>
        </div>

        <div className={styles.troubleshootItem}>
          <h4>QR Code Not Scanning</h4>
          <ul>
            <li>Ensure adequate lighting</li>
            <li>Try manual entry with the secret key</li>
            <li>Update authenticator app to latest version</li>
          </ul>
        </div>

        <h3>Security Considerations</h3>
        <div className={styles.warningBox}>
          <h4>Important Security Notes:</h4>
          <ul>
            <li>Never share your 2FA secret or backup codes</li>
            <li>Use different 2FA secrets for different services</li>
            <li>Regularly review active sessions</li>
            <li>Enable 2FA on your email account as well</li>
          </ul>
        </div>
      </section>

      <section id="api-reference" className={styles.contentSection}>
        <h3 className={styles.subTitle}>API Reference</h3>
        
        <h3>TwoFactorService Methods</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Description</th>
              <th>Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>generateSecret</code></td>
              <td>Generate new 2FA secret</td>
              <td><code>TwoFactorSecret</code></td>
            </tr>
            <tr>
              <td><code>verifyToken</code></td>
              <td>Verify TOTP code</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>verifyAndEnable</code></td>
              <td>Verify code and enable 2FA</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>disable</code></td>
              <td>Disable 2FA for user</td>
              <td><code>void</code></td>
            </tr>
            <tr>
              <td><code>isEnabled</code></td>
              <td>Check if 2FA is enabled</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>verifyBackupCode</code></td>
              <td>Verify backup code</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>regenerateBackupCodes</code></td>
              <td>Generate new backup codes</td>
              <td><code>string[]</code></td>
            </tr>
          </tbody>
        </table>

        <h3>Type Definitions</h3>
        <div className={styles.codeBlock}>
          <pre>{`interface TwoFactorSecret {
  ascii: string;
  hex: string;
  base32: string;
  qr_code_ascii: string;
  qr_code_hex: string;
  qr_code_base32: string;
  google_auth_qr: string;
  otpauth_url: string;
  dataURL: string;
  backupCodes: string[];
}

interface TwoFactorVerification {
  userId: string;
  enabled: boolean;
  enabledAt?: Date;
  lastUsed?: Date;
  backupCodesUsed: number;
  devices: DeviceInfo[];
}

interface DeviceInfo {
  userAgent: string;
  lastUsed: Date;
  trusted: boolean;
}`}</pre>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>Next Steps</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/privacy-controls" className={styles.docCard}>
            <FaShieldAlt />
            <span>Privacy Controls</span>
          </Link>
          <Link href="/documentation/data-export" className={styles.docCard}>
            <FaKey />
            <span>Data Export Guide</span>
          </Link>
          <Link href="/documentation/authentication" className={styles.docCard}>
            <FaLock />
            <span>Authentication Overview</span>
          </Link>
        </div>
      </section>
    </div>
  );
}