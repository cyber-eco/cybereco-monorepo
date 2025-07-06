'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRocket, FaExternalLinkAlt } from 'react-icons/fa';
import { Navigation } from '@cybereco/ui-components';
import { useI18n } from '@cybereco/i18n';
import ConfigDropdownWrapper from '../ConfigDropdownWrapper';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useI18n();

  const navLinks = [
    { href: '/', label: t('common:navigation.home') || 'Home' },
    { href: '/portfolio', label: t('common:navigation.portfolio') || 'Solutions' },
    { href: '/documentation', label: t('common:navigation.documentation') || 'Documentation' },
    { href: '/community', label: t('common:navigation.community') || 'Community' },
    { href: '/about', label: t('common:navigation.about') || 'About Us' },
    { href: '/help', label: t('common:navigation.help') || 'Help' },
  ];

  const hubActionButton = {
    href: 'https://hub.cybere.co',
    label: '',  // Empty label since we're using icon with text
    icon: (
      <>
        <FaRocket className={styles.hubButtonIcon} />
        <span className={styles.hubButtonText}>
          {t('common:navigation.hub') || 'Hub'}
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
      configElement={<ConfigDropdownWrapper />}
      mobileMenuStorageKey="cybereco-website-menu-state"
      className={styles.header}
      LinkComponent={Link}
      usePathname={usePathname}
      disableBodyLock={true}
      persistMenuState={false}
    />
  );
}