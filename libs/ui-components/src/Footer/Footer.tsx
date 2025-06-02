'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../Logo/Logo';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Footer.module.css';

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface CompanyInfo {
  name?: string;
  tagline?: string;
  email?: string;
  copyrightPrefix?: string;
}

export interface FooterProps {
  companyInfo?: CompanyInfo;
  logo?: {
    show?: boolean;
    height?: number;
  };
  socialLinks?: SocialLink[];
  sections?: FooterSection[];
  className?: string;
  showCopyright?: boolean;
  showSocialLinks?: boolean;
}

// Default social icons as components
const LinkedInIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={styles.socialIcon}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={styles.socialIcon}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const EmailIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.socialIcon}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function Footer({
  companyInfo = {
    name: 'CyberEco',
    tagline: 'Building a sustainable digital future',
    email: 'hello@cybere.co',
    copyrightPrefix: '©'
  },
  logo = {
    show: true,
    height: 50
  },
  socialLinks = [],
  sections = [],
  className,
  showCopyright = true,
  showSocialLinks = true
}: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const renderLink = (link: FooterLink) => {
    if (link.external) {
      return (
        <a
          key={link.href}
          href={link.href}
          className={styles.footerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={styles.footerLink}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className={`${styles.footer} ${className || ''}`} role="contentinfo">
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            {logo.show && (
              <Link href="/" className={styles.logoLink}>
                <Logo height={logo.height} />
              </Link>
            )}
            {companyInfo.tagline && (
              <p className={styles.tagline}>
                {t('footer.tagline') || companyInfo.tagline}
              </p>
            )}
            {showSocialLinks && socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.ariaLabel || social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={section.title} className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.sectionLinks}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section - if email is provided */}
          {companyInfo.email && (
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>
                {t('footer.contact') || 'Contact'}
              </h3>
              <ul className={styles.sectionLinks}>
                <li>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className={styles.footerLink}
                  >
                    {companyInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        {showCopyright && (
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              {companyInfo.copyrightPrefix} {currentYear} {companyInfo.name}. {t('footer.allRightsReserved') || 'All rights reserved.'}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}

// Export default icons for convenience
export { LinkedInIcon, GitHubIcon, EmailIcon };