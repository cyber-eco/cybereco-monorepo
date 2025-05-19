import React, { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext } from '../../context/LanguageContext';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  padding: 0.3rem 0.5rem;
  color: ${({ active, theme }) => active ? theme.primary : theme.textSecondary};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme, active }) => !active && theme.text};
  }
`;

const Separator = styled.span`
  margin: 0 0.2rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  
  // For debugging - remove in production
  console.log('Current language:', language);
  
  return (
    <SwitcherContainer>
      <LanguageButton 
        active={language === 'en'} 
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </LanguageButton>
      <Separator>|</Separator>
      <LanguageButton 
        active={language === 'es'} 
        onClick={() => changeLanguage('es')}
        aria-label="Switch to Spanish"
      >
        ES
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
