'use client';

import React from 'react';
import Link from 'next/link';
import { Footer as SharedFooter, LinkedInIcon, GitHubIcon, EmailIcon } from '@cybereco/ui-components';
import { useI18n } from '@cybereco/i18n';

export default function Footer() {
  const { t } = useI18n();

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
      title: t('common:footer.solutions') || 'Solutions',
      links: [
        { label: 'All Solutions', href: '/portfolio' },
        { label: t('common:footer.financeEconomyTitle') || 'Finance & Economy', href: '/portfolio#finance' },
        { label: t('common:footer.communityGovernanceTitle') || 'Community & Governance', href: '/portfolio#community' },
        { label: t('common:footer.sustainabilityHomeTitle') || 'Sustainability & Home', href: '/portfolio#sustainability' },
        { label: t('common:footer.educationTitle') || 'Education & Growth', href: '/portfolio#education' },
        { label: t('common:footer.healthWellnessTitle') || 'Health & Wellness', href: '/portfolio#health' },
        { label: 'Identity & Legal', href: '/portfolio#identity' },
        { label: 'Travel & Discovery', href: '/portfolio#travel' },
        { label: 'Tech & Social', href: '/portfolio#tech' }
      ]
    },
    {
      title: t('common:footer.company') || 'Company',
      links: [
        { label: t('common:footer.about') || 'About Us', href: '/about' },
        { label: t('common:footer.status') || 'Status', href: '/status' },
        { label: t('common:footer.support') || 'Support', href: '/help' },
        { label: t('common:footer.privacy') || 'Privacy Policy', href: '/privacy' },
        { label: t('common:footer.terms') || 'Terms of Service', href: '/terms' }
      ]
    },
    {
      title: t('common:footer.contact') || 'Contact',
      links: [
        { label: 'info@cybere.co', href: 'mailto:info@cybere.co' }
      ]
    }
  ];

  const companyInfo = {
    name: 'CyberEco',
    tagline: t('common:footer.tagline') || 'Digital solutions for a connected world',
    copyrightPrefix: '©',
    copyrightSuffix: t('common:footer.allRightsReserved') || 'All rights reserved'
  };

  return (
    <SharedFooter
      companyInfo={companyInfo}
      socialLinks={socialLinks}
      sections={sections}
      logo={{ show: true, height: 40 }}
      showCopyright={true}
      showSocialLinks={true}
      LinkComponent={Link}
    />
  );
}