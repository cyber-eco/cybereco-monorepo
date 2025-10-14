'use client';

import React from 'react';
import { Footer as SharedFooter } from '@cybereco/ui-components';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  const footerConfig = {
    companyInfo: {
      name: 'JustSplit',
      tagline: t('tagline'),
      email: 'info@cybere.co'
    },
    sections: [
      {
        title: t('features'),
        links: [
          { label: t('expenseTracking'), href: '/expenses' },
          { label: t('groupManagement'), href: '/groups' },
          { label: t('eventPlanning'), href: '/events' },
          { label: t('settlements'), href: '/settlements' }
        ]
      },
      {
        title: t('support'),
        links: [
          { label: t('helpCenter'), href: '/help' },
          { label: t('about'), href: '/about' },
          { label: t('contact'), href: 'mailto:info@cybere.co' }
        ]
      },
      {
        title: t('legal'),
        links: [
          { label: t('privacyPolicy'), href: 'https://cybere.co/privacy' },
          { label: t('termsOfService'), href: 'https://cybere.co/terms' },
          { label: t('license'), href: 'https://cybere.co/license' }
        ]
      }
    ],
    socialLinks: [
      {
        name: 'GitHub',
        href: 'https://github.com/cyber-eco/cybereco-monorepo',
        icon: <FaGithub />
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/cyberecotech',
        icon: <FaLinkedin />
      },
      {
        name: 'Email',
        href: 'mailto:info@cybere.co',
        icon: <FaEnvelope />
      }
    ]
  };

  return <SharedFooter {...footerConfig} />;
}