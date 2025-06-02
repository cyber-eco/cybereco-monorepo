'use client';

import React, { useState, useEffect, ReactNode } from 'react';
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
  href?: string;
  label?: string;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  element?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavigationProps {
  links: NavigationLink[];
  logoHref?: string;
  actionButton?: NavigationActionButton;
  showConfig?: boolean;
  className?: string;
  mobileMenuStorageKey?: string;
  LinkComponent?: React.ComponentType<{ href: string; className?: string; children: React.ReactNode }>;
  usePathname?: () => string;
}

export default function Navigation({
  links,
  logoHref = '/',
  actionButton,
  showConfig = true,
  className,
  mobileMenuStorageKey = 'navigation-menu-open',
  LinkComponent = ({ href, className, children }) => <a href={href} className={className}>{children}</a>,
  usePathname = () => '/'
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
      <LinkComponent
        key={link.href}
        href={link.href}
        className={linkClass}
      >
        {link.label}
      </LinkComponent>
    );
  };

  const renderActionButton = () => {
    if (!actionButton) return null;

    // If a custom element is provided, render it directly
    if (actionButton.element) {
      return (
        <div className={actionButton.className}>
          {actionButton.element}
        </div>
      );
    }

    const buttonElement = (
      <>
        {actionButton.icon}
        {actionButton.label}
      </>
    );

    if (actionButton.external && actionButton.href) {
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

    if (actionButton.href) {
      return (
        <LinkComponent
          href={actionButton.href}
          className={actionButton.className || styles.actionButton}
        >
          {buttonElement}
        </LinkComponent>
      );
    }

    // For onClick handlers without href
    return (
      <button
        className={actionButton.className || styles.actionButton}
        onClick={actionButton.onClick}
      >
        {buttonElement}
      </button>
    );
  };

  return (
    <nav className={`${styles.navigation} ${className || ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <LinkComponent href={logoHref} className={styles.logoLink}>
          <Logo />
        </LinkComponent>

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