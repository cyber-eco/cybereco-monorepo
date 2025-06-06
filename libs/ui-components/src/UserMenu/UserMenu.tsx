'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './UserMenu.module.css';

export type UserMenuItem = 
  | {
      label: string;
      href?: string;
      onClick?: () => void;
      icon?: React.ReactNode;
      divider?: false;
      danger?: boolean;
    }
  | {
      divider: true;
    };

export interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  items: UserMenuItem[];
  className?: string;
  avatarClassName?: string;
  menuClassName?: string;
  avatarIcon?: React.ReactNode;
  LinkComponent?: React.ComponentType<{ href: string; className?: string; children: React.ReactNode; role?: string; onClick?: () => void }>;
}

export function UserMenu({
  user,
  items,
  className,
  avatarClassName,
  menuClassName,
  avatarIcon,
  LinkComponent = ({ href, className, children, role, onClick }) => <a href={href} className={className} role={role} onClick={onClick}>{children}</a>
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: UserMenuItem) => {
    if ('onClick' in item && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  const displayName = user.name || user.email?.split('@')[0] || 'User';

  return (
    <div className={`${styles.userMenu} ${className || ''}`}>
      <button
        ref={buttonRef}
        className={`${styles.userButton} ${avatarClassName || ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`User menu for ${displayName}`}
      >
        <div className={styles.avatar}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {avatarIcon || displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className={styles.userName}>{displayName}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`${styles.menuDropdown} ${menuClassName || ''}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          {/* User info section */}
          <div className={styles.userInfo}>
            <div className={styles.userInfoAvatar}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {avatarIcon || displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.userInfoText}>
              <div className={styles.userInfoName}>{displayName}</div>
              {user.email && (
                <div className={styles.userInfoEmail}>{user.email}</div>
              )}
            </div>
          </div>

          <div className={styles.menuDivider} />

          {/* Menu items */}
          <div className={styles.menuItems}>
            {items.map((item, index) => {
              if ('divider' in item && item.divider) {
                return <div key={index} className={styles.menuDivider} />;
              }

              const itemContent = (
                <>
                  {item.icon && (
                    <span className={styles.menuItemIcon}>{item.icon}</span>
                  )}
                  <span className={styles.menuItemLabel}>{item.label}</span>
                </>
              );

              const itemClassName = `${styles.menuItem} ${
                item.danger ? styles.menuItemDanger : ''
              }`;

              if (item.href) {
                return (
                  <LinkComponent
                    key={index}
                    href={item.href}
                    className={itemClassName}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {itemContent}
                  </LinkComponent>
                );
              }

              return (
                <button
                  key={index}
                  className={itemClassName}
                  role="menuitem"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {itemContent}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}