import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaQuestion, FaBook, FaHeadset, FaEnvelope } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface HelpCardStyledProps extends ThemedProps {
  to: string;
}

const PageContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`;

const Title = styled(motion.h1)`
  margin-bottom: var(--spacing-md);
`;

const Subtitle = styled(motion.p)<ThemedProps>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 700px;
  margin: 0 auto;
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const HelpCard = styled(motion(Link))<HelpCardStyledProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled.div<ThemedProps>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: white;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
`;

const CardDescription = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const HelpPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations?.helpPage || {};

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || 'How Can We Help?'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.subtitle || 'Find the support you need with our help resources and documentation'}
        </Subtitle>
      </PageHeader>

      <HelpGrid>
        <HelpCard
          to="/faq"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconWrapper>
            <FaQuestion />
          </IconWrapper>
          <CardTitle>{t.faqTitle || 'FAQ'}</CardTitle>
          <CardDescription>
            {t.faqDesc || 'Find answers to commonly asked questions about our solutions and the CyberEco ecosystem'}
          </CardDescription>
        </HelpCard>

        <HelpCard
          to="/documentation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <IconWrapper>
            <FaBook />
          </IconWrapper>
          <CardTitle>{t.docsTitle || 'Solution Documentation'}</CardTitle>
          <CardDescription>
            {t.docsDesc || 'Detailed guides and documentation for all solution categories in our digital ecosystem'}
          </CardDescription>
        </HelpCard>

        <HelpCard
          to="/support"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IconWrapper>
            <FaHeadset />
          </IconWrapper>
          <CardTitle>{t.supportTitle || 'Community Support'}</CardTitle>
          <CardDescription>
            {t.supportDesc || 'Get help from our support team and community for any issues across all solution categories'}
          </CardDescription>
        </HelpCard>

        <HelpCard
          to="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <CardTitle>{t.contactTitle || 'Contact'}</CardTitle>
          <CardDescription>
            {t.contactDesc || 'Reach out to us directly for questions about any of our solutions or to suggest new features'}
          </CardDescription>
        </HelpCard>
      </HelpGrid>
    </PageContainer>
  );
};

export default HelpPage;
