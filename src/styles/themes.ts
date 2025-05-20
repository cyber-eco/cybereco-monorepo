import { ThemeType } from '../types';

export const lightTheme: ThemeType = {
  primary: 'var(--primary-light)',
  secondary: 'var(--secondary-light)',
  textPrimary: 'var(--text-primary-light)',
  textSecondary: 'var(--text-secondary-light)',
  background: 'var(--background-light)',
  surface: 'var(--surface-light)',
  border: 'var(--border-light)',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  mode: 'light',
  text: 'var(--text-primary-light)',
  primaryDark: 'var(--primary-dark)',
  primaryLight: 'var(--primary-light)',
  secondaryDark: 'var(--secondary-dark)',
  success: '#28a745',
  white: '#ffffff' // Add this property
};

export const darkTheme: ThemeType = {
  primary: 'var(--primary-dark)',
  secondary: 'var(--secondary-dark)',
  textPrimary: 'var(--text-primary-dark)',
  textSecondary: 'var(--text-secondary-dark)',
  background: 'var(--background-dark)',
  surface: 'var(--surface-dark)',
  border: 'var(--border-dark)',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  mode: 'dark',
  text: 'var(--text-primary-dark)',
  primaryDark: 'var(--primary-dark)',
  primaryLight: 'var(--primary-light)',
  secondaryDark: 'var(--secondary-dark)',
  success: '#28a745',
  white: '#ffffff' // Add this property
};