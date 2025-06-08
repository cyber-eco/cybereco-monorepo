'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import { useI18n } from '@cybereco/i18n';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function FAQ() {
  const { t } = useI18n();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: t('documentation:documentationPage.generalQuestionsCategory') || 'General Questions',
      icon: '❓',
      items: [
        {
          question: t('documentation:documentationPage.whatIsCyberEco') || 'What is CyberEco?',
          answer: t('documentation:documentationPage.whatIsCyberEcoAnswer') || 'CyberEco is a comprehensive digital ecosystem offering privacy-focused applications for financial collaboration, community governance, and sustainable living. Our platform empowers users with digital sovereignty while fostering human connection.'
        },
        {
          question: t('documentation:documentationPage.howMuchCost') || 'How much does it cost?',
          answer: t('documentation:documentationPage.howMuchCostAnswer') || 'CyberEco offers a freemium model. Basic features are free forever, with premium features available through affordable subscriptions. Each application has its own pricing tier based on usage and features.'
        },
        {
          question: t('documentation:documentationPage.dataPrivacy') || 'How is my data protected?',
          answer: t('documentation:documentationPage.dataPrivacyAnswer') || 'We use end-to-end encryption, store minimal data, and give you complete control over your information. You can export or delete your data at any time. We never sell user data to third parties.'
        }
      ]
    },
    {
      title: t('documentation:documentationPage.accountSecurityCategory') || 'Account & Security',
      icon: '🔐',
      items: [
        {
          question: t('documentation:documentationPage.ssoQuestion') || 'What is Single Sign-On (SSO)?',
          answer: t('documentation:documentationPage.ssoAnswer') || 'SSO allows you to use one CyberEco Hub account to access all applications in our ecosystem. Sign in once, and you\'re authenticated across JustSplit, Somos, Demos, and all other CyberEco apps.'
        },
        {
          question: t('documentation:documentationPage.twoFactorQuestion') || 'How do I enable two-factor authentication?',
          answer: t('documentation:documentationPage.twoFactorAnswer') || 'Go to Hub Settings > Security > Two-Factor Authentication. You can choose between SMS verification or authenticator apps like Google Authenticator or Authy.'
        },
        {
          question: t('documentation:documentationPage.forgotPasswordQuestion') || 'I forgot my password. What should I do?',
          answer: t('documentation:documentationPage.forgotPasswordAnswer') || 'Click "Forgot Password" on the sign-in page. We\'ll send a secure reset link to your registered email. For security, reset links expire after 1 hour.'
        }
      ]
    },
    {
      title: t('documentation:documentationPage.technicalCategory') || 'Technical Questions',
      icon: '⚙️',
      items: [
        {
          question: t('documentation:documentationPage.apiAccessQuestion') || 'Can I access CyberEco APIs?',
          answer: t('documentation:documentationPage.apiAccessAnswer') || 'Yes! We provide comprehensive REST APIs for all our services. You\'ll need to generate API keys from your Hub dashboard. Check our API Reference section for detailed documentation.'
        },
        {
          question: t('documentation:documentationPage.supportedBrowsersQuestion') || 'Which browsers are supported?',
          answer: t('documentation:documentationPage.supportedBrowsersAnswer') || 'We support the latest versions of Chrome, Firefox, Safari, and Edge. Mobile browsers on iOS and Android are fully supported. For the best experience, keep your browser updated.'
        },
        {
          question: t('documentation:documentationPage.offlineQuestion') || 'Do apps work offline?',
          answer: t('documentation:documentationPage.offlineAnswer') || 'Some features work offline with automatic sync when you reconnect. JustSplit saves expenses locally, and Hub caches authentication. Full offline support is on our roadmap.'
        }
      ]
    },
    {
      title: t('documentation:documentationPage.billingCategory') || 'Billing & Subscriptions',
      icon: '💳',
      items: [
        {
          question: t('documentation:documentationPage.paymentMethodsQuestion') || 'What payment methods do you accept?',
          answer: t('documentation:documentationPage.paymentMethodsAnswer') || 'We accept major credit cards, debit cards, and PayPal. Some regions also support local payment methods. All payments are processed securely through Stripe.'
        },
        {
          question: t('documentation:documentationPage.cancelSubscriptionQuestion') || 'Can I cancel my subscription anytime?',
          answer: t('documentation:documentationPage.cancelSubscriptionAnswer') || 'Yes, you can cancel anytime from your Hub billing settings. You\'ll retain access to premium features until the end of your billing period. No cancellation fees apply.'
        },
        {
          question: t('documentation:documentationPage.refundQuestion') || 'What is your refund policy?',
          answer: t('documentation:documentationPage.refundAnswer') || 'We offer a 30-day money-back guarantee for all premium subscriptions. If you\'re not satisfied, contact support for a full refund within 30 days of purchase.'
        }
      ]
    }
  ];

  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.subTitle}>💬 {t('documentation:documentationPage.faqTitle') || 'Frequently Asked Questions'}</h3>
        <p className={styles.contentText}>
          {t('documentation:documentationPage.faqIntro') || 'Find answers to common questions about CyberEco, our applications, and services.'}
        </p>
      </div>

      {faqCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className={styles.contentSection}>
          <h4 className={styles.faqCategoryTitle}>
            <span>{category.icon}</span> {category.title}
          </h4>
          <div className={styles.faqList}>
            {category.items.map((item, itemIndex) => {
              const globalIndex = categoryIndex * 10 + itemIndex;
              const isOpen = openItems.includes(globalIndex);
              
              return (
                <div key={itemIndex} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleItem(globalIndex)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className={styles.contentSection}>
        <div className={styles.helpBox}>
          <h4>{t('documentation:documentationPage.stillNeedHelp') || 'Still need help?'}</h4>
          <p>{t('documentation:documentationPage.stillNeedHelpDesc') || 'Can\'t find what you\'re looking for? Our support team is here to help.'}</p>
          <div className={styles.helpActions}>
            <button className={styles.primaryButton}>
              {t('documentation:documentationPage.contactSupport') || 'Contact Support'} →
            </button>
            <button className={styles.secondaryButton}>
              {t('documentation:documentationPage.joinCommunity') || 'Join Community'} →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}