'use client';

import React from 'react';
import { Footer as SharedFooter, LinkedInIcon, GitHubIcon, EmailIcon, useLanguage } from '@cybereco/ui-components';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/cybere-co',
      icon: <LinkedInIcon />,
      ariaLabel: 'LinkedIn'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/cyber-eco',
      icon: <GitHubIcon />,
      ariaLabel: 'GitHub'
    },
    {
      name: 'Email',
      href: 'mailto:support@cybere.co',
      icon: <EmailIcon />,
      ariaLabel: 'Email Support'
    }
  ];

  const sections = [
    {
      title: t('footer.resources') || 'Resources',
      links: [
        { label: t('footer.documentation') || 'Documentation', href: 'https://cybere.co/documentation', external: true },
        { label: t('footer.apiReference') || 'API Reference', href: 'https://cybere.co/documentation#api', external: true },
        { label: t('footer.tutorials') || 'Tutorials', href: 'https://cybere.co/guides', external: true },
        { label: t('footer.community') || 'Community', href: 'https://cybere.co/about', external: true }
      ]
    },
    {
      title: t('footer.account') || 'Account',
      links: [
        { label: t('footer.profile') || 'Profile', href: '/profile' },
        { label: t('footer.settings') || 'Settings', href: '/settings' },
        { label: t('footer.billing') || 'Billing', href: '/billing' },
        { label: t('footer.security') || 'Security', href: '/security' }
      ]
    },
    {
      title: t('footer.company') || 'Company',
      links: [
        { label: t('footer.about') || 'About', href: 'https://cybere.co/about', external: true },
        { label: t('footer.philosophy') || 'Philosophy', href: 'https://cybere.co/philosophy', external: true },
        { label: t('footer.privacy') || 'Privacy', href: 'https://cybere.co/privacy', external: true },
        { label: t('footer.terms') || 'Terms', href: 'https://cybere.co/terms', external: true }
      ]
    },
    {
      title: t('footer.support') || 'Support',
      links: [
        { label: t('footer.helpCenter') || 'Help Center', href: 'https://cybere.co/help', external: true },
        { label: t('footer.contactSupport') || 'Contact Support', href: 'https://cybere.co/support', external: true },
        { label: t('footer.status') || 'System Status', href: 'https://cybere.co/status', external: true },
        { label: t('footer.feedback') || 'Feedback', href: 'https://cybere.co/contact', external: true }
      ]
    }
  ];

  const companyInfo = {
    name: 'CyberEco Hub',
    tagline: t('footer.hubTagline') || 'Your digital ecosystem gateway',
    email: 'support@cybere.co',
    copyrightPrefix: '©'
  };

  return (
    <SharedFooter
      companyInfo={companyInfo}
      socialLinks={socialLinks}
      sections={sections}
      logo={{ show: true, height: 40 }}
      showCopyright={true}
      showSocialLinks={true}
    />
  );
}