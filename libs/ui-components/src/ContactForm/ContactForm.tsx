'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import styles from './ContactForm.module.css';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  product?: string;
  _gotcha?: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  showProductField?: boolean;
  productOptions?: Array<{ value: string; label: string }>;
  useRecaptcha?: boolean;
  recaptchaSiteKey?: string;
  formspreeEndpoint?: string;
  labels: {
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    productLabel?: string;
    selectProduct?: string;
    submitButton: string;
    sendingButton: string;
    successMessage: string;
  };
  className?: string;
}

export function ContactForm({
  onSubmit,
  showProductField = false,
  productOptions = [],
  useRecaptcha = false,
  recaptchaSiteKey,
  formspreeEndpoint,
  labels,
  className
}: ContactFormProps) {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    product: '',
    _gotcha: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    if (!useRecaptcha || !recaptchaSiteKey) return;
    
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      
      (window as any).onRecaptchaLoad = () => {
        setRecaptchaLoaded(true);
        renderRecaptcha();
      };
      
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      renderRecaptcha();
    }

    return () => {
      delete (window as any).onRecaptchaLoad;
    };
  }, [useRecaptcha, recaptchaSiteKey]);

  const renderRecaptcha = () => {
    if (window.grecaptcha && recaptchaRef.current && !recaptchaRef.current.hasChildNodes() && recaptchaSiteKey) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: recaptchaSiteKey,
          theme: 'light'
        });
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      let submissionData: any = { ...formData };
      
      if (useRecaptcha) {
        const recaptchaResponse = window.grecaptcha?.getResponse();
        if (!recaptchaResponse) {
          setErrorMessage('Please complete the reCAPTCHA verification.');
          setIsSubmitting(false);
          return;
        }
        submissionData['g-recaptcha-response'] = recaptchaResponse;
      }

      // If using Formspree, submit directly
      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            product: '',
            _gotcha: ''
          });
          if (useRecaptcha) {
            window.grecaptcha?.reset();
          }
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error || errorData.errors?.[0]?.message || 
            `Server error (${response.status}). Please try again.`;
          setErrorMessage(errorMsg);
          if (useRecaptcha) {
            window.grecaptcha?.reset();
          }
        }
      } else {
        // Use custom onSubmit handler
        await onSubmit(submissionData);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          product: '',
          _gotcha: ''
        });
        if (useRecaptcha) {
          window.grecaptcha?.reset();
        }
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again.');
      if (useRecaptcha) {
        window.grecaptcha?.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`${styles.contactForm} ${className || ''}`} onSubmit={handleSubmit}>
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      {isSubmitted && (
        <div className={styles.successMessage}>
          {labels.successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          {labels.nameLabel}
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required 
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {labels.emailLabel}
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required 
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          {labels.subjectLabel}
        </label>
        <input 
          type="text" 
          id="subject" 
          name="subject" 
          value={formData.subject}
          onChange={handleChange}
          className={styles.input}
          required 
        />
      </div>
      
      {showProductField && (
        <div className={styles.formGroup}>
          <label htmlFor="product" className={styles.label}>
            {labels.productLabel}
          </label>
          <select 
            id="product" 
            name="product" 
            value={formData.product}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">{labels.selectProduct}</option>
            {productOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          {labels.messageLabel}
        </label>
        <textarea 
          id="message" 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
          required 
        />
      </div>
      
      {useRecaptcha && (
        <div className={styles.recaptchaContainer}>
          <div ref={recaptchaRef}></div>
          {!recaptchaLoaded && (
            <div className={styles.recaptchaLoading}>
              Loading reCAPTCHA...
            </div>
          )}
        </div>
      )}
      
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        <svg className={styles.submitIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
        {isSubmitting ? labels.sendingButton : labels.submitButton}
      </button>
    </form>
  );
}