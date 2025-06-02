'use client';

import React from 'react';
import { FaHome, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Navigation, UserMenu, useLanguage } from '@cybereco/ui-components';
import type { UserMenuItem } from '@cybereco/ui-components';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: t('navigation.dashboard') || 'Dashboard' },
    { href: '/apps', label: t('navigation.apps') || 'Apps' },
  ];

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
    href: '#',
    label: '',
    icon: (
      <UserMenu
        user={{
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }}
        items={userMenuItems}
        avatarIcon={<FaUser />}
      />
    ),
    className: styles.userMenuWrapper,
    onClick: (e: React.MouseEvent) => e.preventDefault() // Prevent navigation
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
    />
  );
}