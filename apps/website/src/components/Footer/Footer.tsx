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
      href: 'mailto:info@cybere.co',
      icon: <EmailIcon />,
      ariaLabel: 'Email'
    }
  ];

  const sections = [
    {
      title: t('footer.solutions') || 'Solutions',
      links: [
        { label: t('portfolioPage.allSolutions') || 'All Solutions', href: '/portfolio' },
        { label: t('portfolioPage.financeEconomy') || 'Finance & Economy', href: '/portfolio#finance' },
        { label: t('portfolioPage.communityGovernance') || 'Community & Governance', href: '/portfolio#community' },
        { label: t('portfolioPage.sustainabilityHome') || 'Sustainability & Home', href: '/portfolio#sustainability' },
        { label: t('portfolioPage.educationGrowth') || 'Education & Growth', href: '/portfolio#education' },
        { label: t('portfolioPage.healthWellness') || 'Health & Wellness', href: '/portfolio#health' },
        { label: t('portfolioPage.identityLegal') || 'Identity & Legal', href: '/portfolio#identity' },
        { label: t('portfolioPage.travelDiscovery') || 'Travel & Discovery', href: '/portfolio#travel' },
        { label: t('portfolioPage.techSocial') || 'Tech & Social', href: '/portfolio#tech' }
      ]
    },
    {
      title: t('footer.company') || 'Company',
      links: [
        { label: t('footer.about') || 'About Us', href: '/about' },
        { label: t('footer.status') || 'Status', href: '/status' },
        { label: t('footer.support') || 'Support', href: '/help' },
        { label: t('footer.privacy') || 'Privacy Policy', href: '/privacy' },
        { label: t('footer.terms') || 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  const companyInfo = {
    name: 'CyberEco',
    tagline: t('footer.tagline') || 'Digital solutions for a connected world',
    email: 'info@cybere.co',
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