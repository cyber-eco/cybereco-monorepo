'use client';

import React from 'react';
import { Footer as SharedFooter, FooterSection, GitHubIcon, EmailIcon } from '@cybereco/ui-components';
import { useLanguage } from '@cybereco/ui-components';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  const footerSections: FooterSection[] = [
    {
      title: t('footer.features') || 'Features',
      links: [
        { label: t('footer.expenseSplitting') || 'Expense Splitting', href: '/features#splitting' },
        { label: t('footer.groupManagement') || 'Group Management', href: '/features#groups' },
        { label: t('footer.realTimeSync') || 'Real-time Sync', href: '/features#sync' },
        { label: t('footer.multiCurrency') || 'Multi-currency', href: '/features#currency' },
      ]
    },
    {
      title: t('footer.resources') || 'Resources',
      links: [
        { label: t('footer.userGuide') || 'User Guide', href: '/help' },
        { label: t('footer.faq') || 'FAQ', href: '/help#faq' },
        { label: t('footer.api') || 'API', href: '/api', external: true },
        { label: t('footer.changelog') || 'Changelog', href: '/changelog' },
      ]
    },
    {
      title: t('footer.company') || 'Company',
      links: [
        { label: t('footer.about') || 'About JustSplit', href: '/about' },
        { label: t('footer.cybereco') || 'CyberEco', href: 'https://cybere.co', external: true },
        { label: t('footer.privacy') || 'Privacy', href: '/privacy' },
        { label: t('footer.terms') || 'Terms', href: '/terms' },
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/cyber-eco/justsplit',
      icon: <GitHubIcon />,
      ariaLabel: 'Visit JustSplit on GitHub'
    },
    {
      name: 'Email',
      href: 'mailto:support@justsplit.app',
      icon: <EmailIcon />,
      ariaLabel: 'Email JustSplit support'
    }
  ];

  return (
    <SharedFooter
      companyInfo={{
        name: 'JustSplit',
        tagline: t('footer.tagline') || 'Split expenses, not friendships',
        email: 'support@justsplit.app',
        copyrightPrefix: '©'
      }}
      logo={{
        show: true,
        height: 40
      }}
      socialLinks={socialLinks}
      sections={footerSections}
      className={styles.footer}
      showCopyright={true}
      showSocialLinks={true}
    />
  );
}