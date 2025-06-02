'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Logo } from '../Logo/Logo';
import { ConfigDropdown } from '../ConfigDropdown';
import styles from './Navigation.module.css';

export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavigationActionButton {
  href: string;
  label: string;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}

export interface NavigationProps {
  links: NavigationLink[];
  logoHref?: string;
  actionButton?: NavigationActionButton;
  showConfig?: boolean;
  className?: string;
  mobileMenuStorageKey?: string;
}

export default function Navigation({
  links,
  logoHref = '/',
  actionButton,
  showConfig = true,
  className,
  mobileMenuStorageKey = 'navigation-menu-open'
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Load mobile menu state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(mobileMenuStorageKey);
    if (savedState === 'true') {
      setIsMobileMenuOpen(true);
    }
  }, [mobileMenuStorageKey]);

  // Save mobile menu state to localStorage
  useEffect(() => {
    localStorage.setItem(mobileMenuStorageKey, isMobileMenuOpen.toString());
  }, [isMobileMenuOpen, mobileMenuStorageKey]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const renderLink = (link: NavigationLink, isMobile = false) => {
    const isActive = isActiveLink(link.href);
    const linkClass = `${styles.navLink} ${isActive ? styles.active : ''} ${isMobile ? styles.mobileNavLink : ''}`;

    if (link.external) {
      return (
        <a
          key={link.href}
          href={link.href}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={linkClass}
      >
        {link.label}
      </Link>
    );
  };

  const renderActionButton = () => {
    if (!actionButton) return null;

    const buttonElement = (
      <>
        {actionButton.icon}
        {actionButton.label}
      </>
    );

    if (actionButton.external) {
      return (
        <a
          href={actionButton.href}
          className={actionButton.className || styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonElement}
        </a>
      );
    }

    return (
      <Link
        href={actionButton.href}
        className={actionButton.className || styles.actionButton}
      >
        {buttonElement}
      </Link>
    );
  };

  return (
    <nav className={`${styles.navigation} ${className || ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href={logoHref} className={styles.logoLink}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {links.map(link => renderLink(link))}
          </div>
          
          <div className={styles.navActions}>
            {renderActionButton()}
            {showConfig && <ConfigDropdown />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}
        role="navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileNavContent}>
          <div className={styles.mobileNavLinks}>
            {links.map(link => renderLink(link, true))}
          </div>
          
          <div className={styles.mobileNavActions}>
            {renderActionButton()}
            {showConfig && (
              <div className={styles.mobileConfigWrapper}>
                <ConfigDropdown />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}