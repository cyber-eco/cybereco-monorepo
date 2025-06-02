'use client';

import React from 'react';
import { FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import { Navigation, useLanguage } from '@cybereco/ui-components';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('navigation.home') || 'Home' },
    { href: '/portfolio', label: t('navigation.portfolio') || 'Solutions' },
    { href: '/documentation', label: t('navigation.documentation') || 'Documentation' },
    { href: '/about', label: t('navigation.about') || 'About Us' },
    { href: '/help', label: t('navigation.help') || 'Help' },
  ];

  const hubActionButton = {
    href: 'https://hub.cybere.co',
    label: t('navigation.hub') || 'Hub',
    icon: (
      <>
        <FaRocket className={styles.hubButtonIcon} />
        <span className={styles.hubButtonText}>
          {t('navigation.hub') || 'Hub'}
        </span>
        <FaExternalLinkAlt className={styles.hubButtonExternal} />
      </>
    ),
    external: true,
    className: styles.hubButton,
  };

  return (
    <Navigation
      links={navLinks}
      actionButton={hubActionButton}
      showConfig={true}
      mobileMenuStorageKey="cybereco-website-menu-state"
      className={styles.header}
    />
  );
}