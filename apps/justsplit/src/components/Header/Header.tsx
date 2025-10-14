'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaRocket, FaUser, FaBars, FaTimes, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/JustSplitAuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

// Local navigation configuration to avoid module resolution issues
function getNavLinks(t: (key: string) => string) {
  return [
    { href: '/', label: t('dashboard') },
    { href: '/groups', label: t('groups') },
    { href: '/events', label: t('events') },
    { href: '/expenses', label: t('expenses') },
    { href: '/settlements', label: t('settlements') },
    { href: '/friends', label: t('friends') },
  ];
}
import styles from './Header.module.css';

export default function Header() {
  const { currentUser, userProfile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const justSplitNavLinks = getNavLinks(t);

  // Mobile menu management
  useEffect(() => {
    const savedState = localStorage.getItem('justsplit-menu-state');
    if (savedState === 'true') {
      setIsMobileMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('justsplit-menu-state', isMobileMenuOpen.toString());
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsConfigOpen(false);
  }, [pathname]);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isConfigOpen && !target.closest(`.${styles.configContainer}`)) {
        setIsConfigOpen(false);
      }
      if (isUserMenuOpen && !target.closest(`.${styles.userMenuContainer}`)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isConfigOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isConfigOpen, isUserMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || 'http://localhost:40000';

  const renderUserMenu = () => {
    if (!currentUser || !userProfile) return null;

    return (
      <div className={styles.userMenuContainer}>
        <button 
          className={styles.userMenuButton}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          aria-label="User menu"
        >
          {userProfile.avatarUrl ? (
            <img 
              src={userProfile.avatarUrl} 
              alt={userProfile.name} 
              className={styles.userAvatar}
            />
          ) : (
            <div className={styles.userAvatarPlaceholder}>
              {userProfile.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
        
        {isUserMenuOpen && (
          <div className={styles.userMenuDropdown}>
            <div className={styles.userMenuHeader}>
              <div className={styles.userName}>{userProfile.name}</div>
              <div className={styles.userEmail}>{userProfile.email}</div>
            </div>
            <div className={styles.userMenuDivider} />
            <a 
              href={`${hubUrl}/profile`} 
              className={styles.userMenuItem}
            >
              <FaUser />
              <span>{t('profile')}</span>
            </a>
            <button 
              onClick={() => signOut()}
              className={styles.userMenuItem}
            >
              <FaSignOutAlt />
              <span>{t('signOut')}</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        {/* JustSplit Logo */}
        <Link href="/" className={styles.logoLink}>
          <img 
            src={theme === 'dark' ? "/images/logo-white.svg" : "/images/logo.svg"}
            alt="JustSplit Logo" 
            className={styles.logo}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {justSplitNavLinks.map(link => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className={styles.navActions}>
            <a href={hubUrl} className={styles.actionButton}>
              <FaRocket />
              <span>{t('hub')}</span>
            </a>
            <div className={styles.configContainer}>
              <button 
                className={styles.configButton}
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                aria-label={t('settings')}
              >
                <FaCog />
              </button>
              
              {isConfigOpen && (
                <div className={styles.configDropdown}>
                  <div className={styles.configSection}>
                    <h4>{t('theme')}</h4>
                    <button 
                      className={styles.configOption} 
                      onClick={() => setTheme('light')}
                      style={{ fontWeight: theme === 'light' ? 'bold' : 'normal' }}
                    >
                      {t('light')}
                    </button>
                    <button 
                      className={styles.configOption} 
                      onClick={() => setTheme('dark')}
                      style={{ fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
                    >
                      {t('dark')}
                    </button>
                  </div>
                  <div className={styles.configSection}>
                    <h4>{t('language')}</h4>
                    <button 
                      className={styles.configOption} 
                      onClick={() => setLanguage('en')}
                      style={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}
                    >
                      {t('english')}
                    </button>
                    <button 
                      className={styles.configOption} 
                      onClick={() => setLanguage('es')}
                      style={{ fontWeight: language === 'es' ? 'bold' : 'normal' }}
                    >
                      {t('spanish')}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {renderUserMenu()}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavContent}>
          <div className={styles.mobileNavLinks}>
            {justSplitNavLinks.map(link => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className={styles.mobileNavActions}>
            <a href={hubUrl} className={styles.actionButton}>
              <FaRocket />
              <span>{t('hub')}</span>
            </a>
            {currentUser && userProfile && (
              <>
                <a 
                  href={`${hubUrl}/profile`} 
                  className={styles.actionButton}
                >
                  <FaUser />
                  <span>{t('profile')}</span>
                </a>
                <button 
                  onClick={() => signOut()}
                  className={styles.actionButton}
                >
                  <FaSignOutAlt />
                  <span>{t('signOut')}</span>
                </button>
              </>
            )}
            <button 
              className={styles.configButton}
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              aria-label={t('settings')}
            >
              <FaCog /> {t('settings')}
            </button>
            
            {isConfigOpen && (
              <div className={styles.configDropdown}>
                <div className={styles.configSection}>
                  <h4>{t('theme')}</h4>
                  <button 
                    className={styles.configOption} 
                    onClick={() => setTheme('light')}
                    style={{ fontWeight: theme === 'light' ? 'bold' : 'normal' }}
                  >
                    {t('light')}
                  </button>
                  <button 
                    className={styles.configOption} 
                    onClick={() => setTheme('dark')}
                    style={{ fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
                  >
                    {t('dark')}
                  </button>
                </div>
                <div className={styles.configSection}>
                  <h4>{t('language')}</h4>
                  <button 
                    className={styles.configOption} 
                    onClick={() => setLanguage('en')}
                    style={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}
                  >
                    {t('english')}
                  </button>
                  <button 
                    className={styles.configOption} 
                    onClick={() => setLanguage('es')}
                    style={{ fontWeight: language === 'es' ? 'bold' : 'normal' }}
                  >
                    {t('spanish')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}