import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeType } from '../../types';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  to?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  iconOnly?: boolean;
  theme: ThemeType;
}

const baseButtonStyles = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    margin-right: ${props => props.iconOnly ? '0' : '8px'};
  }
`;

const primaryStyles = css<{ theme: ThemeType }>`
  background-color: ${({ theme }) => theme.primary};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(0, 163, 108, 0.8)' 
      : 'rgba(0, 98, 65, 0.9)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const secondaryStyles = css<{ theme: ThemeType }>`
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(0, 163, 108, 0.1)' 
      : 'rgba(0, 98, 65, 0.1)'};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const textStyles = css<{ theme: ThemeType }>`
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  padding: 8px 16px;
  box-shadow: none;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(0, 163, 108, 0.1)' 
      : 'rgba(0, 98, 65, 0.1)'};
  }
`;

const sizeStyles = {
  small: css`
    padding: 6px 16px;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 10px 24px;
    font-size: 1rem;
  `,
  large: css`
    padding: 12px 32px;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button<StyledButtonProps>`
  ${baseButtonStyles}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return secondaryStyles;
      case 'text':
        return textStyles;
      default:
        return primaryStyles;
    }
  }}
  
  ${props => props.size ? sizeStyles[props.size] : sizeStyles.medium}
  
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => props.iconOnly && css`
    padding: ${props.size === 'small' ? '6px' : props.size === 'large' ? '12px' : '10px'};
    border-radius: 50%;
    width: ${props.size === 'small' ? '32px' : props.size === 'large' ? '48px' : '40px'};
    height: ${props.size === 'small' ? '32px' : props.size === 'large' ? '48px' : '40px'};
  `}
`;

const StyledLink = styled(Link)<StyledButtonProps>`
  ${baseButtonStyles}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return secondaryStyles;
      case 'text':
        return textStyles;
      default:
        return primaryStyles;
    }
  }}
  
  ${props => props.size ? sizeStyles[props.size] : sizeStyles.medium}
  
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => props.iconOnly && css`
    padding: ${props.size === 'small' ? '6px' : props.size === 'large' ? '12px' : '10px'};
    border-radius: 50%;
    width: ${props.size === 'small' ? '32px' : props.size === 'large' ? '48px' : '40px'};
    height: ${props.size === 'small' ? '32px' : props.size === 'large' ? '48px' : '40px'};
  `}
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  to, 
  onClick, 
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  type = 'button',
  ...rest 
}) => {
  if (to) {
    return (
      <StyledLink 
        to={to} 
        variant={variant} 
        size={size} 
        fullWidth={fullWidth}
        iconOnly={iconOnly}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconOnly={iconOnly}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;