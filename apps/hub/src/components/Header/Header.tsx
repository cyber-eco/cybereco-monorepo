'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaUserCircle, FaShieldAlt, FaCreditCard, FaDatabase } from 'react-icons/fa';
import { Navigation, UserMenu, useLanguage } from '@cybereco/ui-components';
import type { UserMenuItem } from '@cybereco/ui-components';
import { useHubAuth } from '../../hooks/useHubAuth';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();
  const { userProfile: user, signOut } = useHubAuth();
  const router = useRouter();

  // Only show navigation links if user is authenticated
  const navLinks = user ? [
    { href: '/dashboard', label: t('navigation.dashboard') || 'Dashboard' },
    { href: '/apps', label: t('navigation.apps') || 'Apps' },
    { href: '/my-data', label: t('navigation.myData') || 'My Data' },
  ] : [];

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  // User menu items
  const userMenuItems: UserMenuItem[] = [
    {
      label: t('navigation.profile') || 'Profile',
      href: '/profile',
      icon: <FaUserCircle />
    },
    {
      label: t('navigation.settings') || 'Settings',
      href: '/settings',
      icon: <FaCog />
    },
    {
      label: t('footer.security') || 'Security',
      href: '/security',
      icon: <FaShieldAlt />
    },
    {
      label: t('footer.billing') || 'Billing',
      href: '/billing',
      icon: <FaCreditCard />
    },
    { divider: true },
    {
      label: t('auth.logout') || 'Logout',
      onClick: handleLogout,
      icon: <FaSignOutAlt />,
      danger: true
    }
  ];

  // User menu action button with UserMenu component
  const userActionButton = user ? {
    element: (
      <UserMenu
        user={{
          name: user.name,
          email: user.email,
          photoURL: user.avatarUrl
        }}
        items={userMenuItems}
        avatarIcon={<FaUser />}
        LinkComponent={Link}
      />
    ),
    className: styles.userMenuWrapper
  } : {
    href: '/auth/signin',
    label: t('navigation.signIn') || 'Sign In',
    className: styles.signInButton,
  };

  return (
    <Navigation
      links={navLinks}
      actionButton={userActionButton}
      showConfig={true}
      mobileMenuStorageKey="cybereco-hub-menu-state"
      className={styles.header}
      LinkComponent={Link}
      usePathname={usePathname}
    />
  );
}