'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaCog, FaSun, FaMoon, FaGlobe, FaCheck } from 'react-icons/fa';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n';
import styles from './ConfigDropdown.module.css';

export interface ConfigDropdownProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function ConfigDropdown({ 
  className,
  isOpen: controlledIsOpen,
  onToggle
}: ConfigDropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [changingLanguage, setChangingLanguage] = useState<string | null>(null);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, setIsOpen]);

  const handleThemeToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggleTheme();
    // Keep dropdown open for consistency with language toggle
  };

  // Debounce timer ref
  const languageChangeTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLanguageChange = useCallback((lang: 'en' | 'es', e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (language !== lang) {
      // Clear any pending language changes
      if (languageChangeTimer.current) {
        clearTimeout(languageChangeTimer.current);
      }
      
      // Show loading state immediately
      setChangingLanguage(lang);
      
      // Debounce the language change to prevent rapid switching
      languageChangeTimer.current = setTimeout(() => {
        setLanguage(lang);
        // Clear loading state after a short delay
        setTimeout(() => {
          setChangingLanguage(null);
        }, 300);
      }, 100);
    }
  }, [language, setLanguage]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (languageChangeTimer.current) {
        clearTimeout(languageChangeTimer.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.configDropdown} ${className || ''}`} ref={dropdownRef}>
      <button
        className={`${styles.configButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('navigation.settings') || 'Settings'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaCog className={`${styles.configIcon} ${isOpen ? styles.spinning : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="menu">
          <div className={styles.dropdownHeader}>
            <h3 className={styles.dropdownTitle}>
              {t('navigation.settings') || 'Settings'}
            </h3>
          </div>

          <div className={styles.dropdownSection}>
            <div className={styles.sectionHeader}>
              <FaSun className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>
                {t('theme.title') || 'Theme'}
              </span>
            </div>
            <div className={styles.themeOptions}>
              <button
                className={`${styles.themeOption} ${theme === 'light' ? styles.selected : ''}`}
                onClick={handleThemeToggle}
                role="menuitem"
                type="button"
              >
                <FaSun className={styles.themeIcon} />
                <span>{t('theme.light') || 'Light'}</span>
                {theme === 'light' && <FaCheck className={styles.checkIcon} />}
              </button>
              <button
                className={`${styles.themeOption} ${theme === 'dark' ? styles.selected : ''}`}
                onClick={handleThemeToggle}
                role="menuitem"
                type="button"
              >
                <FaMoon className={styles.themeIcon} />
                <span>{t('theme.dark') || 'Dark'}</span>
                {theme === 'dark' && <FaCheck className={styles.checkIcon} />}
              </button>
            </div>
          </div>

          <div className={styles.dropdownSection}>
            <div className={styles.sectionHeader}>
              <FaGlobe className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>
                {t('language.title') || 'Language'}
              </span>
            </div>
            <div className={styles.languageOptions}>
              <button
                className={`${styles.languageOption} ${language === 'en' ? styles.selected : ''} ${changingLanguage === 'en' ? styles.changing : ''}`}
                onClick={(e) => {
                  handleLanguageChange('en', e);
                }}
                role="menuitem"
                type="button"
              >
                <span className={styles.languageFlag}>🇺🇸</span>
                <span>English</span>
                {language === 'en' && <FaCheck className={styles.checkIcon} />}
              </button>
              <button
                className={`${styles.languageOption} ${language === 'es' ? styles.selected : ''} ${changingLanguage === 'es' ? styles.changing : ''}`}
                onClick={(e) => {
                  handleLanguageChange('es', e);
                }}
                role="menuitem"
                type="button"
              >
                <span className={styles.languageFlag}>🇲🇽</span>
                <span>Español</span>
                {language === 'es' && <FaCheck className={styles.checkIcon} />}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}