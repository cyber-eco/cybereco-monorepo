'use client';

import { useI18n } from '@cybereco/i18n';
import { FaRocket, FaLock, FaShieldAlt, FaUserPlus, FaKey, FaMobileAlt, FaEnvelope, FaArrowRight, FaExclamationTriangle, FaLightbulb, FaCheck, FaClock, FaChartLine, FaBullseye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AccountSetupGuidePage() {
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
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/documentation" className={styles.breadcrumbLink}>
          {t('documentation:accountSetupGuide.documentation') || 'Documentation'}
        </Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>
          {t('documentation:accountSetupGuide.title') || 'Account Creation & Setup'}
        </span>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>
          <FaRocket /> {t('documentation:accountSetupGuide.title') || 'Account Creation & Setup'}
        </h1>
        <div className={styles.guideMeta}>
          <div className={styles.metaItem}>
            <FaClock />
            <span className={styles.metaLabel}>
              {t('documentation:accountSetupGuide.duration') || 'Duration'}:
            </span>
            <span className={styles.metaValue}>
              10-15 {t('documentation:accountSetupGuide.minutes') || 'minutes'}
            </span>
          </div>
          <div className={styles.metaItem}>
            <FaChartLine />
            <span className={styles.metaLabel}>
              {t('documentation:accountSetupGuide.level') || 'Level'}:
            </span>
            <span className={styles.metaValue}>
              {t('documentation:accountSetupGuide.beginner') || 'Beginner'}
            </span>
          </div>
          <div className={styles.metaItem}>
            <FaBullseye />
            <span className={styles.metaLabel}>
              {t('documentation:accountSetupGuide.goal') || 'Goal'}:
            </span>
            <span className={styles.metaValue}>
              {t('documentation:accountSetupGuide.goalText') || 'Complete account setup with security'}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {/* Welcome Section */}
        <section className={styles.introSection}>
          <h2 className={styles.sectionTitle}>
            <FaUserPlus /> {t('documentation:accountSetupGuide.introTitle') || 'Welcome to CyberEco'}
          </h2>
          <p className={styles.introText}>
            {t('documentation:accountSetupGuide.introText') || 'This guide will walk you through creating your CyberEco Hub account - your single identity for accessing all applications in our ecosystem. We\'ll cover account creation, security setup, privacy controls, and initial configuration.'}
          </p>
          
          <div className={styles.infoBox}>
            <FaLightbulb className={styles.infoIcon} />
            <div className={styles.infoContent}>
              <h4>{t('documentation:accountSetupGuide.privacyFirstTitle') || 'Privacy-First Design'}</h4>
              <p>
                {t('documentation:accountSetupGuide.privacyFirstText') || 'Your CyberEco account is designed with privacy at its core. You own your data, control what you share, and can export or delete your information anytime.'}
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>
            <FaLock /> {t('documentation:accountSetupGuide.stepsTitle') || 'Step-by-Step Setup'}
          </h2>

          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step1Title') || 'Visit the Registration Page'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step1Desc') || 'Navigate to the CyberEco Hub registration page. You can access this from any CyberEco application or directly at hub.cybere.co/signup.'}
              </p>
              <div className={styles.stepActions}>
                <a 
                  href="https://hub.cybere.co/signup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  {t('documentation:accountSetupGuide.signUpNow') || 'Sign Up Now'} <FaArrowRight />
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step2Title') || 'Choose Your Identity'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step2Desc') || 'Select a unique username and provide your email address. Your username will be your public identifier across all CyberEco applications.'}
              </p>
              <div className={styles.tipBox}>
                <FaLightbulb className={styles.tipIcon} />
                <div className={styles.tipContent}>
                  <strong>{t('documentation:accountSetupGuide.usernameTitle') || 'Username Tips'}</strong>
                  <ul>
                    <li>{t('documentation:accountSetupGuide.usernameTip1') || 'Choose something memorable and professional'}</li>
                    <li>{t('documentation:accountSetupGuide.usernameTip2') || 'Avoid personal information like birthdate'}</li>
                    <li>{t('documentation:accountSetupGuide.usernameTip3') || 'You can change it later, but connections may be affected'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step3Title') || 'Create a Strong Password'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step3Desc') || 'Your password protects access to all your CyberEco applications. Choose a strong, unique password that you don\'t use elsewhere.'}
              </p>
              <div className={styles.requirementsBox}>
                <h4>{t('documentation:accountSetupGuide.passwordRequirements') || 'Password Requirements'}</h4>
                <ul className={styles.requirementsList}>
                  <li className={styles.requirement}>
                    <FaCheck className={styles.requirementCheck} />
                    {t('documentation:accountSetupGuide.passReq1') || 'At least 12 characters long'}
                  </li>
                  <li className={styles.requirement}>
                    <FaCheck className={styles.requirementCheck} />
                    {t('documentation:accountSetupGuide.passReq2') || 'Mix of uppercase and lowercase letters'}
                  </li>
                  <li className={styles.requirement}>
                    <FaCheck className={styles.requirementCheck} />
                    {t('documentation:accountSetupGuide.passReq3') || 'At least one number and special character'}
                  </li>
                  <li className={styles.requirement}>
                    <FaCheck className={styles.requirementCheck} />
                    {t('documentation:accountSetupGuide.passReq4') || 'Not used on any other accounts'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step4Title') || 'Enable Two-Factor Authentication'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step4Desc') || 'Add an extra layer of security to your account. We support authenticator apps, SMS, and hardware keys.'}
              </p>
              <div className={styles.optionsGrid}>
                <div className={styles.optionCard}>
                  <FaMobileAlt className={styles.optionIcon} />
                  <h4>{t('documentation:accountSetupGuide.authenticatorApp') || 'Authenticator App'}</h4>
                  <p>{t('documentation:accountSetupGuide.authenticatorDesc') || 'Most secure option using apps like Google Authenticator or Authy'}</p>
                  <span className={styles.recommended}>
                    {t('documentation:accountSetupGuide.recommended') || 'Recommended'}
                  </span>
                </div>
                <div className={styles.optionCard}>
                  <span className={styles.optionIcon}>💬</span>
                  <h4>{t('documentation:accountSetupGuide.smsOption') || 'SMS Code'}</h4>
                  <p>{t('documentation:accountSetupGuide.smsDesc') || 'Receive codes via text message to your phone'}</p>
                </div>
                <div className={styles.optionCard}>
                  <FaKey className={styles.optionIcon} />
                  <h4>{t('documentation:accountSetupGuide.hardwareKey') || 'Hardware Key'}</h4>
                  <p>{t('documentation:accountSetupGuide.hardwareDesc') || 'Physical security keys like YubiKey for maximum security'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step5Title') || 'Configure Privacy Settings'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step5Desc') || 'Set your default privacy preferences. You can always adjust these later for specific applications or sharing scenarios.'}
              </p>
              <div className={styles.privacySettings}>
                <div className={styles.privacySetting}>
                  <div className={styles.settingHeader}>
                    <h4>{t('documentation:accountSetupGuide.profileVisibility') || 'Profile Visibility'}</h4>
                    <span className={styles.settingRecommended}>
                      {t('documentation:accountSetupGuide.friendsOnly') || 'Friends Only'}
                    </span>
                  </div>
                  <p>{t('documentation:accountSetupGuide.profileVisibilityDesc') || 'Who can see your basic profile information and activity across applications.'}</p>
                </div>
                <div className={styles.privacySetting}>
                  <div className={styles.settingHeader}>
                    <h4>{t('documentation:accountSetupGuide.activitySharing') || 'Activity Sharing'}</h4>
                    <span className={styles.settingRecommended}>
                      {t('documentation:accountSetupGuide.selective') || 'Selective'}
                    </span>
                  </div>
                  <p>{t('documentation:accountSetupGuide.activitySharingDesc') || 'How your activity in applications (like expenses or events) is shared with others.'}</p>
                </div>
                <div className={styles.privacySetting}>
                  <div className={styles.settingHeader}>
                    <h4>{t('documentation:accountSetupGuide.dataCollection') || 'Data Collection'}</h4>
                    <span className={styles.settingRecommended}>
                      {t('documentation:accountSetupGuide.minimal') || 'Minimal'}
                    </span>
                  </div>
                  <p>{t('documentation:accountSetupGuide.dataCollectionDesc') || 'What usage data we collect for improving applications (always anonymized).'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>6</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>
                {t('documentation:accountSetupGuide.step6Title') || 'Verify Your Email'}
              </h3>
              <p className={styles.stepDescription}>
                {t('documentation:accountSetupGuide.step6Desc') || 'Check your email for a verification message. Click the verification link to activate your account and enable all features.'}
              </p>
              <div className={styles.warningBox}>
                <FaExclamationTriangle className={styles.warningIcon} />
                <div className={styles.warningContent}>
                  <strong>{t('documentation:accountSetupGuide.verificationImportant') || 'Verification Required'}</strong>
                  <p>
                    {t('documentation:accountSetupGuide.verificationText') || 'Some features like password reset and security notifications require a verified email address.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className={styles.nextStepsSection}>
          <h2 className={styles.sectionTitle}>
            <FaArrowRight /> {t('documentation:accountSetupGuide.nextStepsTitle') || 'Next Steps'}
          </h2>
          <div className={styles.nextStepsGrid}>
            <div className={styles.nextStepCard}>
              <span className={styles.nextStepIcon}>💰</span>
              <h3>{t('documentation:accountSetupGuide.exploreJustSplit') || 'Explore JustSplit'}</h3>
              <p>{t('documentation:accountSetupGuide.exploreJustSplitDesc') || 'Start sharing expenses with friends and family using our most popular application.'}</p>
              <Link href="/documentation/guides/justsplit" className={styles.nextStepLink}>
                {t('documentation:accountSetupGuide.getStarted') || 'Get Started'} →
              </Link>
            </div>
            <div className={styles.nextStepCard}>
              <FaLock className={styles.nextStepIcon} />
              <h3>{t('documentation:accountSetupGuide.securityDeepDive') || 'Security Deep Dive'}</h3>
              <p>{t('documentation:accountSetupGuide.securityDeepDiveDesc') || 'Learn advanced security features and privacy controls for your account.'}</p>
              <Link href="/documentation/guides/privacy-settings" className={styles.nextStepLink}>
                {t('documentation:accountSetupGuide.learnMore') || 'Learn More'} →
              </Link>
            </div>
            <div className={styles.nextStepCard}>
              <span className={styles.nextStepIcon}>🤝</span>
              <h3>{t('documentation:accountSetupGuide.joinCommunity') || 'Join the Community'}</h3>
              <p>{t('documentation:accountSetupGuide.joinCommunityDesc') || 'Connect with other users and participate in shaping the platform\'s future.'}</p>
              <Link href="/documentation/community" className={styles.nextStepLink}>
                {t('documentation:accountSetupGuide.join') || 'Join'} →
              </Link>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className={styles.supportSection}>
          <div className={styles.supportBox}>
            <h3>{t('documentation:accountSetupGuide.needHelp') || 'Need Help?'}</h3>
            <p>
              {t('documentation:accountSetupGuide.supportText') || 'If you encounter any issues during setup, our support team is here to help.'}
            </p>
            <div className={styles.supportActions}>
              <Link href="/support" className={styles.supportLink}>
                {t('documentation:accountSetupGuide.contactSupport') || 'Contact Support'}
              </Link>
              <Link href="/documentation" className={styles.supportLink}>
                {t('documentation:accountSetupGuide.documentation') || 'Documentation'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}