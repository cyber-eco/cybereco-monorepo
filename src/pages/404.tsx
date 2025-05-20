import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeType } from '../types';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

interface ThemedProps {
  theme: ThemeType;
}

const NotFoundContainer = styled.div<ThemedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: var(--spacing-lg);
  text-align: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

const Content = styled.div`
  max-width: 600px;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Icon = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: var(--spacing-md);
`;

const Title = styled.h1<ThemedProps>`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  line-height: 1;
  margin-bottom: var(--spacing-sm);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.h2<ThemedProps>`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0;
  margin-bottom: var(--spacing-md);
`;

const Message = styled.p<ThemedProps>`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
`;

const HomeLink = styled(Link)<ThemedProps>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 1.1rem;
  color: ${({ theme }) => theme.white};
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: ${({ theme }) => theme.primary};
  border-radius: var(--border-radius);
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

const NotFoundPage: React.FC = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations.notFoundPage || {};

  return (
    <NotFoundContainer>
      <Content>
        <Icon>
          <FaExclamationTriangle />
        </Icon>
        <Title>404</Title>
        <Subtitle>{t.title || "Page Not Found"}</Subtitle>
        <Message>
          {t.message || "Oops! The page you are looking for doesn't exist or has been moved."}
        </Message>
        <HomeLink to="/">
          <FaHome /> {t.goHomeLinkText || 'Back to Homepage'}
        </HomeLink>
      </Content>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
