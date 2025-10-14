'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLifeRing, FaExclamationCircle, FaLightbulb, FaComment } from 'react-icons/fa';
import { useI18n } from '@cybereco/i18n';
import { ContactForm, ContactFormData } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function SupportPage() {
  const { t } = useI18n();
  
  const productOptions = [
    { value: 'justsplit', label: 'JustSplit' },
    { value: 'plantopia', label: 'Plantopia' },
    { value: 'demos', label: 'Demos' },
    { value: 'somos', label: 'Somos' },
    { value: 'nexus', label: 'Nexus' },
    { value: 'tradepilot', label: 'TradePilot' },
    { value: 'communitymanager', label: 'Community Manager' },
    { value: 'other', label: t('support:supportPage.otherProduct') || 'Other' }
  ];
  
  // For future implementation when backend is ready
  const handleSubmit = async (data: ContactFormData) => {
    console.log('Support form submitted:', data);
    // In the future, this will send to your support system
    // For now, we'll use the same Formspree endpoint
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('support:supportPage.title') || "Support Center"}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('support:supportPage.subtitle') || "Get the assistance you need to solve problems and make the most of CyberEco applications"}
        </motion.p>
      </header>

      <div className={styles.supportOptionsGrid}>
        <motion.div
          className={styles.supportCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <FaExclamationCircle />
            </div>
            <h3 className={styles.cardTitle}>{t('support:supportPage.commonIssuesTitle') || "Common Issues"}</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>
              {t('support:supportPage.commonIssuesText') || "Find quick solutions to the most frequently encountered problems with our applications."}
            </p>
            <Link href="/faq" className={styles.cardButton}>{t('support:supportPage.viewCommonIssues') || "View Common Issues"}</Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.supportCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <FaLightbulb />
            </div>
            <h3 className={styles.cardTitle}>{t('support:supportPage.knowledgeBaseTitle') || "Knowledge Base"}</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>
              {t('support:supportPage.knowledgeBaseText') || "Access our detailed documentation and step-by-step guides for all CyberEco applications."}
            </p>
            <Link href="/documentation" className={styles.cardButton}>{t('support:supportPage.browseKnowledgeBase') || "Browse Knowledge Base"}</Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.supportCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <FaComment />
            </div>
            <h3 className={styles.cardTitle}>{t('support:supportPage.communityForumsTitle') || "Community Forums"}</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>
              {t('support:supportPage.communityForumsText') || "Join discussions, share experiences, and find solutions with other users in our community forums."}
            </p>
            <a href="https://github.com/cyber-eco/cybereco-monorepo/discussions" target="_blank" rel="noopener noreferrer" className={styles.cardButton}>
              {t('support:supportPage.visitForums') || "Visit Forums"}
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.supportCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <FaLifeRing />
            </div>
            <h3 className={styles.cardTitle}>{t('support:supportPage.liveChatTitle') || "Live Chat"}</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>
              {t('support:supportPage.liveChatText') || "Connect with our support team in real-time for immediate assistance with urgent issues."}
            </p>
            <button 
              className={styles.cardButton}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                alert('Live chat feature coming soon!');
              }}
            >
              {t('support:supportPage.startChat') || "Start Chat"}
            </button>
          </div>
        </motion.div>
      </div>

      <section className={styles.contactFormSection}>
        <h2 className={styles.contactFormTitle}>{t('support:supportPage.contactSupportTitle') || "Contact Support"}</h2>
        <ContactForm
          onSubmit={handleSubmit}
          showProductField={true}
          productOptions={productOptions}
          useRecaptcha={true}
          recaptchaSiteKey="6LeQpU8rAAAAAE7_wA-RYz4afnvqN_3_Q02VCVZ3"
          formspreeEndpoint="https://formspree.io/f/xwpbepaz"
          labels={{
            nameLabel: t('support:supportPage.nameLabel') || 'Your Name',
            emailLabel: t('support:supportPage.emailLabel') || 'Email Address',
            subjectLabel: t('support:supportPage.subjectLabel') || 'Subject',
            messageLabel: t('support:supportPage.messageLabel') || 'Message',
            productLabel: t('support:supportPage.productLabel') || 'Product',
            selectProduct: t('support:supportPage.selectProduct') || 'Select a product',
            submitButton: t('support:supportPage.submitRequest') || 'Submit Request',
            sendingButton: t('support:supportPage.sendingRequest') || 'Sending...',
            successMessage: t('support:supportPage.successMessage') || 'Thank you for your message. Our support team will get back to you soon!'
          }}
          className={styles.form}
        />
      </section>
    </div>
  );
}