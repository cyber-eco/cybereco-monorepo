'use client';

import React from 'react';
import { FaUser, FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import { Navigation, UserMenu, useLanguage } from '@cybereco/ui-components';
import type { UserMenuItem } from '@cybereco/ui-components';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();
  const { currentUser, signOut } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: t('navigation.dashboard') || 'Dashboard' },
    { href: '/groups', label: t('navigation.groups') || 'Groups' },
    { href: '/events', label: t('navigation.events') || 'Events' },
    { href: '/expenses', label: t('navigation.expenses') || 'Expenses' },
    { href: '/settlements', label: t('navigation.settlements') || 'Settlements' },
    { href: '/friends', label: t('navigation.friends') || 'Friends' },
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
  const userActionButton = currentUser ? {
    href: '#',
    label: '',
    icon: (
      <UserMenu
        user={{
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        }}
        items={userMenuItems}
        avatarIcon={<FaUser />}
      />
    ),
    className: styles.userMenuWrapper,
    onClick: (e: React.MouseEvent) => e.preventDefault() // Prevent navigation
  } : null;

  return (
    <Navigation
      links={navLinks}
      actionButton={userActionButton}
      showConfig={true}
      mobileMenuStorageKey="cybereco-justsplit-menu-state"
      className={styles.header}
      logoHref="/"
    />
  );
}