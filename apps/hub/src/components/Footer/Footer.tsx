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
      title: t('footer.apps') || 'Apps',
      links: [
        { label: 'JustSplit', href: 'https://justsplit.cybere.co', external: true },
        { label: t('footer.allApps') || 'All Apps', href: '/apps' },
        { label: t('footer.marketplace') || 'Marketplace', href: '/marketplace' }
      ]
    },
    {
      title: t('footer.resources') || 'Resources',
      links: [
        { label: t('footer.documentation') || 'Documentation', href: '/docs' },
        { label: t('footer.apiReference') || 'API Reference', href: '/api' },
        { label: t('footer.tutorials') || 'Tutorials', href: '/tutorials' },
        { label: t('footer.community') || 'Community', href: '/community' }
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
      title: t('footer.support') || 'Support',
      links: [
        { label: t('footer.helpCenter') || 'Help Center', href: '/help' },
        { label: t('footer.contactSupport') || 'Contact Support', href: '/support' },
        { label: t('footer.status') || 'System Status', href: 'https://status.cybere.co', external: true },
        { label: t('footer.feedback') || 'Feedback', href: '/feedback' }
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