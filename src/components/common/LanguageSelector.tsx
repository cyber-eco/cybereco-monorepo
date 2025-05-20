import React, { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContextType, ThemeType } from '../../types';
import { LanguageContext } from '../../context/LanguageContext';

interface LanguageButtonProps {
  isActive: boolean;
  theme: ThemeType;
}

interface ThemedProps {
  theme: ThemeType;
}

const LanguageSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--spacing-sm);
`;

const LanguageButton = styled.button<LanguageButtonProps>`
  background: none;
  border: none;
  color: ${({ isActive, theme }) => isActive ? theme.primary : theme.textSecondary};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  padding: var(--spacing-xs);
  margin: 0 2px;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Divider = styled.span<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 2px;
`;

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useContext<LanguageContextType>(LanguageContext);
  
  return (
    <LanguageSelectorContainer>
      <LanguageButton 
        onClick={() => changeLanguage('en')}
        isActive={language === 'en'}
        aria-label="Switch to English"
      >
        EN
      </LanguageButton>
      <Divider>|</Divider>
      <LanguageButton 
        onClick={() => changeLanguage('es')}
        isActive={language === 'es'}
        aria-label="Switch to Spanish"
      >
        ES
      </LanguageButton>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
