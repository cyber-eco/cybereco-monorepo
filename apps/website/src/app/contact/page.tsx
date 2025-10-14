'use client';

import React from 'react';
import { useI18n } from '@cybereco/i18n';
import { ContactForm, ContactFormData } from '@cybereco/ui-components';
import styles from './page.module.css';

export default function ContactPage() {
  const { t } = useI18n();
  
  // This is just for consistency - the ContactForm handles submission internally
  const handleSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
  };

  return (
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>
              {t('contact:contactPage.title') || 'Contact Us'}
            </h1>
            <p className={styles.subtitle}>
              {t('contact:contactPage.subtitle') || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </header>
          
          <div className={styles.contactGrid}>
            <ContactForm
              onSubmit={handleSubmit}
              useRecaptcha={true}
              recaptchaSiteKey="6LeQpU8rAAAAAE7_wA-RYz4afnvqN_3_Q02VCVZ3"
              formspreeEndpoint="https://formspree.io/f/xwpbepaz"
              labels={{
                nameLabel: t('contact:contactPage.nameLabel') || 'Name',
                emailLabel: t('contact:contactPage.emailLabel') || 'Email',
                subjectLabel: t('contact:contactPage.subjectLabel') || 'Subject',
                messageLabel: t('contact:contactPage.messageLabel') || 'Message',
                submitButton: t('contact:contactPage.submitButton') || 'Send Message',
                sendingButton: t('contact:contactPage.sendingButton') || 'Sending...',
                successMessage: t('contact:contactPage.successMessage') || "Your message has been sent successfully. We'll get back to you soon!"
              }}
              className={styles.contactForm}
            />
            
            <div className={styles.contactInfo}>
              <h2 className={styles.infoTitle}>
                {t('contact:contactPage.contactInfoTitle') || 'Get in Touch'}
              </h2>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>
                    {t('contact:contactPage.emailContactLabel') || 'Email'}
                  </h3>
                  <p className={styles.infoValue}>info@cybere.co</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoLabel}>
                    {t('contact:contactPage.addressLabel') || 'Address'}
                  </h3>
                  <p className={styles.infoValue}>Mexico City</p>
                </div>
              </div>
              
              <div className={styles.socialLinks}>
                <h3 className={styles.socialTitle}>
                  {t('contact:contactPage.socialTitle') || 'Follow Us'}
                </h3>
                {/* Add your social links here */}
              </div>
            </div>
          </div>
        </div>
  );
}