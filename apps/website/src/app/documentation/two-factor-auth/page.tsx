'use client';

import React from 'react';
import Link from 'next/link';
import { FaLock, FaMobileAlt, FaQrcode, FaShieldAlt, FaKey, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { DocumentationHero, DocumentationTabs } from '../components';
import type { Tab } from '../components';
import styles from '../page.module.css';

export default function TwoFactorAuthDocumentation() {
  const { t } = useI18n();

  const renderOverviewTab = () => (
    <>
      <section className={styles.contentSection}>
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
            <h3>{t('documentation:documentationPage.twoFactor.features.backupCodes.title') || 'Backup Codes'}</h3>
            <p>{t('documentation:documentationPage.twoFactor.features.backupCodes.description') || 'Recovery codes ensure you\'re never locked out of your account'}</p>
          </div>
          <div className={styles.featureCard}>
            <FaShieldAlt className={styles.featureIcon} />
            <h3>{t('documentation:documentationPage.twoFactor.features.enhanced.title') || 'Enhanced Security'}</h3>
            <p>{t('documentation:documentationPage.twoFactor.features.enhanced.description') || 'Protect against password theft and unauthorized access attempts'}</p>
          </div>
        </div>
      </section>
    </>
  );

  const renderSetupTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.setup.title') || 'Setup Guide'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.setup.step1.title') || 'Step 1: Enable 2FA'}</h3>
        <ol className={styles.numberedList}>
          <li>{t('documentation:documentationPage.twoFactor.setup.step1.item1') || 'Navigate to Hub → Security → Two-Factor Authentication'}</li>
          <li>{t('documentation:documentationPage.twoFactor.setup.step1.item2') || 'Click "Enable Two-Factor Authentication"'}</li>
          <li>{t('documentation:documentationPage.twoFactor.setup.step1.item3') || 'Verify your password to continue'}</li>
        </ol>

        <h3>{t('documentation:documentationPage.twoFactor.setup.step2.title') || 'Step 2: Configure Authenticator App'}</h3>
        <div className={styles.infoBox}>
          <h4>{t('documentation:documentationPage.twoFactor.setup.step2.supportedApps') || 'Supported Apps:'}</h4>
          <ul>
            <li>Google Authenticator</li>
            <li>Microsoft Authenticator</li>
            <li>Authy</li>
            <li>1Password</li>
            <li>{t('documentation:documentationPage.twoFactor.setup.step2.anyTOTP') || 'Any TOTP-compatible app'}</li>
          </ul>
        </div>

        <p>{t('documentation:documentationPage.twoFactor.setup.step2.scanQR') || 'Scan the QR code with your authenticator app or manually enter the secret key:'}</p>
        
        <div className={styles.codeBlock}>
          <pre>{`// Example QR code data format
otpauth://totp/CyberEco%20Hub:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=CyberEco%20Hub`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.twoFactor.setup.step3.title') || 'Step 3: Verify Setup'}</h3>
        <p>{t('documentation:documentationPage.twoFactor.setup.step3.description') || 'Enter the 6-digit code from your authenticator app to complete setup.'}</p>

        <h3>{t('documentation:documentationPage.twoFactor.setup.step4.title') || 'Step 4: Save Backup Codes'}</h3>
        <div className={styles.warningBox}>
          <h4>{t('documentation:documentationPage.twoFactor.setup.step4.important') || 'Important:'}</h4>
          <p>{t('documentation:documentationPage.twoFactor.setup.step4.description') || 'Save your backup codes in a secure location. Each code can only be used once.'}</p>
        </div>
      </section>
    </>
  );

  const renderHowItWorksTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.howItWorks.title') || 'How It Works'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.howItWorks.algorithm.title') || 'TOTP Algorithm'}</h3>
        <p>{t('documentation:documentationPage.twoFactor.howItWorks.algorithm.description') || 'CyberEco uses the Time-based One-Time Password algorithm (RFC 6238) with these parameters:'}</p>
        
        <div className={styles.codeBlock}>
          <pre>{`Configuration:
- Algorithm: SHA-1
- Digits: 6
- Period: 30 seconds
- Secret Length: 32 bytes`}</pre>
        </div>

        <h3>{t('documentation:documentationPage.twoFactor.howItWorks.flow.title') || 'Authentication Flow'}</h3>
        <div className={styles.stepByStepGuide}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step1.title') || 'Enter Credentials'}</h4>
              <p>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step1.description') || 'User provides email and password'}</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step2.title') || 'Verify Password'}</h4>
              <p>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step2.description') || 'System validates credentials'}</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step3.title') || 'Request 2FA Code'}</h4>
              <p>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step3.description') || 'If 2FA enabled, prompt for code'}</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step4.title') || 'Verify TOTP'}</h4>
              <p>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step4.description') || 'Validate 6-digit code'}</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepContent}>
              <h4>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step5.title') || 'Grant Access'}</h4>
              <p>{t('documentation:documentationPage.twoFactor.howItWorks.flow.step5.description') || 'Create authenticated session'}</p>
            </div>
          </div>
        </div>

        <h3>{t('documentation:documentationPage.twoFactor.howItWorks.codeGeneration') || 'Code Generation'}</h3>
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

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.backupCodes.title') || 'Backup Codes'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.backupCodes.what.title') || 'What Are Backup Codes?'}</h3>
        <p>{t('documentation:documentationPage.twoFactor.backupCodes.what.description') || 'Backup codes are single-use codes that can be used to access your account if you lose access to your authenticator device. Each code can only be used once.'}</p>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.twoFactor.backupCodes.features.unique') || '10 unique codes'}</strong> {t('documentation:documentationPage.twoFactor.backupCodes.features.uniqueDesc') || 'generated during 2FA setup'}
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.twoFactor.backupCodes.features.singleUse') || 'Single use only'}</strong> - {t('documentation:documentationPage.twoFactor.backupCodes.features.singleUseDesc') || 'each code becomes invalid after use'}
            </div>
          </div>
          <div className={styles.featureItem}>
            <FaCheckCircle className={styles.checkIcon} />
            <div>
              <strong>{t('documentation:documentationPage.twoFactor.backupCodes.features.regenerate') || 'Regeneratable'}</strong> - {t('documentation:documentationPage.twoFactor.backupCodes.features.regenerateDesc') || 'create new codes anytime'}
            </div>
          </div>
        </div>

        <h3>{t('documentation:documentationPage.twoFactor.backupCodes.usage.title') || 'Using Backup Codes'}</h3>
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

        <h3>{t('documentation:documentationPage.twoFactor.backupCodes.bestPractices.title') || 'Best Practices'}</h3>
        <ul>
          <li>{t('documentation:documentationPage.twoFactor.backupCodes.bestPractices.item1') || 'Store codes in a secure password manager'}</li>
          <li>{t('documentation:documentationPage.twoFactor.backupCodes.bestPractices.item2') || 'Print codes and store in a safe location'}</li>
          <li>{t('documentation:documentationPage.twoFactor.backupCodes.bestPractices.item3') || 'Never share backup codes with anyone'}</li>
          <li>{t('documentation:documentationPage.twoFactor.backupCodes.bestPractices.item4') || 'Regenerate codes if any are compromised'}</li>
        </ul>
      </section>
    </>
  );

  const renderIntegrationTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.integration.title') || 'Integration Guide'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.integration.setup.title') || '1. Setup 2FA Service'}</h3>
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

        <h3>{t('documentation:documentationPage.twoFactor.integration.enable.title') || '2. Enable 2FA'}</h3>
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

        <h3>{t('documentation:documentationPage.twoFactor.integration.signin.title') || '3. Implement in Sign In Flow'}</h3>
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

        <h3>{t('documentation:documentationPage.twoFactor.integration.ui.title') || '4. UI Implementation'}</h3>
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
    </>
  );

  const renderTroubleshootingTab = () => (
    <>
      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.troubleshooting.title') || 'Troubleshooting'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.troubleshooting.common.title') || 'Common Issues'}</h3>
        
        <div className={styles.troubleshootItem}>
          <h4>{t('documentation:documentationPage.twoFactor.troubleshooting.invalidCode.title') || 'Invalid Code Error'}</h4>
          <p>{t('documentation:documentationPage.twoFactor.troubleshooting.invalidCode.description') || 'If codes are consistently invalid:'}</p>
          <ul>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.invalidCode.item1') || 'Verify your device time is synchronized'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.invalidCode.item2') || 'Check timezone settings on both device and server'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.invalidCode.item3') || 'Ensure code is entered within 30-second window'}</li>
          </ul>
        </div>

        <div className={styles.troubleshootItem}>
          <h4>{t('documentation:documentationPage.twoFactor.troubleshooting.lostDevice.title') || 'Lost Authenticator Device'}</h4>
          <ol>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.lostDevice.step1') || 'Use a backup code to sign in'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.lostDevice.step2') || 'Disable 2FA from security settings'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.lostDevice.step3') || 'Re-enable with new device'}</li>
          </ol>
        </div>

        <div className={styles.troubleshootItem}>
          <h4>{t('documentation:documentationPage.twoFactor.troubleshooting.qrCode.title') || 'QR Code Not Scanning'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.qrCode.item1') || 'Ensure adequate lighting'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.qrCode.item2') || 'Try manual entry with the secret key'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.qrCode.item3') || 'Update authenticator app to latest version'}</li>
          </ul>
        </div>

        <h3>{t('documentation:documentationPage.twoFactor.troubleshooting.security.title') || 'Security Considerations'}</h3>
        <div className={styles.warningBox}>
          <h4>{t('documentation:documentationPage.twoFactor.troubleshooting.security.important') || 'Important Security Notes:'}</h4>
          <ul>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.security.item1') || 'Never share your 2FA secret or backup codes'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.security.item2') || 'Use different 2FA secrets for different services'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.security.item3') || 'Regularly review active sessions'}</li>
            <li>{t('documentation:documentationPage.twoFactor.troubleshooting.security.item4') || 'Enable 2FA on your email account as well'}</li>
          </ul>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.twoFactor.api.title') || 'API Reference'}</h3>
        
        <h3>{t('documentation:documentationPage.twoFactor.api.methods.title') || 'TwoFactorService Methods'}</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t('documentation:documentationPage.twoFactor.api.methods.method') || 'Method'}</th>
              <th>{t('documentation:documentationPage.twoFactor.api.methods.description') || 'Description'}</th>
              <th>{t('documentation:documentationPage.twoFactor.api.methods.returns') || 'Returns'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>generateSecret</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.generateSecret') || 'Generate new 2FA secret'}</td>
              <td><code>TwoFactorSecret</code></td>
            </tr>
            <tr>
              <td><code>verifyToken</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.verifyToken') || 'Verify TOTP code'}</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>verifyAndEnable</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.verifyAndEnable') || 'Verify code and enable 2FA'}</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>disable</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.disable') || 'Disable 2FA for user'}</td>
              <td><code>void</code></td>
            </tr>
            <tr>
              <td><code>isEnabled</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.isEnabled') || 'Check if 2FA is enabled'}</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>verifyBackupCode</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.verifyBackupCode') || 'Verify backup code'}</td>
              <td><code>boolean</code></td>
            </tr>
            <tr>
              <td><code>regenerateBackupCodes</code></td>
              <td>{t('documentation:documentationPage.twoFactor.api.methods.regenerateBackupCodes') || 'Generate new backup codes'}</td>
              <td><code>string[]</code></td>
            </tr>
          </tbody>
        </table>

        <h3>{t('documentation:documentationPage.twoFactor.api.types.title') || 'Type Definitions'}</h3>
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
    </>
  );

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: t('documentation:documentationPage.twoFactor.tabs.overview') || 'Overview',
      content: renderOverviewTab()
    },
    {
      id: 'setup',
      label: t('documentation:documentationPage.twoFactor.tabs.setup') || 'Setup Guide',
      content: renderSetupTab()
    },
    {
      id: 'howItWorks',
      label: t('documentation:documentationPage.twoFactor.tabs.howItWorks') || 'How It Works',
      content: renderHowItWorksTab()
    },
    {
      id: 'integration',
      label: t('documentation:documentationPage.twoFactor.tabs.integration') || 'Integration',
      content: renderIntegrationTab()
    },
    {
      id: 'troubleshooting',
      label: t('documentation:documentationPage.twoFactor.tabs.troubleshooting') || 'Troubleshooting',
      content: renderTroubleshootingTab()
    }
  ];
  
  return (
    <div className={styles.pageContainer}>
      <DocumentationHero
        icon={<FaLock />}
        title={t('documentation:documentationPage.twoFactor.title') || 'Two-Factor Authentication (2FA)'}
        subtitle={t('documentation:documentationPage.twoFactor.description') || 'Add an extra layer of security to your CyberEco account with TOTP-based authentication'}
        gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)"
      />

      <DocumentationTabs tabs={tabs} defaultTab="overview" />

      <section className={styles.contentSection}>
        <h3 className={styles.subTitle}>{t('documentation:documentationPage.nextSteps') || 'Next Steps'}</h3>
        <div className={styles.cardGrid}>
          <Link href="/documentation/privacy-controls" className={styles.docCard}>
            <FaShieldAlt />
            <span>{t('documentation:documentationPage.privacy.title') || 'Privacy Controls'}</span>
          </Link>
          <Link href="/documentation/data-export" className={styles.docCard}>
            <FaKey />
            <span>{t('documentation:documentationPage.dataExport.title') || 'Data Export Guide'}</span>
          </Link>
          <Link href="/documentation/authentication" className={styles.docCard}>
            <FaLock />
            <span>{t('documentation:documentationPage.authenticationNavItem') || 'Authentication Overview'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}