import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType, Solution } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface CardImageProps extends ThemedProps {
  color?: string;
  image?: string;
}

interface SolutionCardProps extends ThemedProps {
  isClickable?: boolean;
}

interface CardWrapperProps {
  children: React.ReactNode;
  url?: string;
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

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SolutionCard = styled(motion.div)<SolutionCardProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${({ isClickable }) => isClickable && `
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const CardImage = styled.div<CardImageProps>`
  height: 200px;
  background-color: ${({ theme, color }) => color || `${theme.primary}20`};
  position: relative;
  background-image: ${({ image }) => image ? `url(${image})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  
  &::after {
    content: ${({ image }) => image ? '""' : '"Solution Image"'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }
`;

const CardContent = styled.div`
  padding: var(--spacing-md);
`;

const CardTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
`;

const CardDescription = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
`;

const ComingSoon = styled.div<ThemedProps>`
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: ${({ theme }) => theme.textSecondary};
`;

// Wrapper component that conditionally wraps content in a Link or div
const CardWrapper: React.FC<CardWrapperProps> = ({ children, url }) => {
  if (url) {
    return <Link to={url} style={{ textDecoration: 'none', display: 'block' }}>{children}</Link>;
  }
  return <>{children}</>;
};

const PortfolioPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.portfolioPage || {};
  
  const solutions: Solution[] = [
    {
      id: "justsplit",
      title: t.justSplitTitle || "JustSplit",
      description: t.justSplitDesc || "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances.",
      image: `${process.env.PUBLIC_URL}/portfolio/justsplit.png`,
      url: "https://justsplit.cybere.co"
    },
    {
      id: "plantopia",
      title: t.plantopiaTitle || "Plantopia",
      description: t.plantopiaDesc || "Smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably.",
      url: "https://plantopia.cybere.co"
    },
    {
      id: "demos",
      title: t.demosTitle || "Demos",
      description: t.demosDesc || "Smart democracy platform that facilitates transparent decision-making processes for organizations, communities, and civic engagement."
    },
    {
      id: "nexus",
      title: t.nexusTitle || "Nexus",
      description: t.nexusDesc || "Integrated social media hub that helps users manage multiple platforms while preserving digital wellbeing and meaningful connections."
    },
    {
      id: "tradepilot",
      title: t.tradePilotTitle || "TradePilot",
      description: t.tradePilotDesc || "Advanced trading tool with analytics, automation, and educational resources for both novice and experienced investors."
    },
    {
      id: "community-manager",
      title: t.communityManagerTitle || "Community Manager",
      description: t.communityManagerDesc || "Comprehensive platform to create, grow, and manage communities with powerful tools for engagement, governance, and resource sharing."
    }
  ];

  // Function to handle external URLs
  const handleCardClick = (url: string): void => {
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || 'Our Solutions'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || 'Explore our diverse portfolio of digital solutions designed to enhance productivity, sustainability, connectivity, and community engagement through innovative technology.'}
        </Subtitle>
      </PageHeader>

      <SolutionsGrid>
        {solutions.map((solution, index) => {
          const isExternalLink = solution.url && solution.url.startsWith('http');
          
          return (
            <SolutionCard 
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              id={solution.id}
              isClickable={!!solution.url}
              onClick={isExternalLink ? () => handleCardClick(solution.url as string) : undefined}
            >
              <CardWrapper url={!isExternalLink ? solution.url : undefined}>
                <CardImage image={solution.image} color={solution.color} />
                <CardContent>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                  {solution.url && (
                    <p style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                      {t.viewSolution || 'View Solution'} →
                    </p>
                  )}
                </CardContent>
              </CardWrapper>
            </SolutionCard>
          );
        })}
      </SolutionsGrid>
      
      <ComingSoon>
        <p>{t.comingSoon || 'Detailed information about each solution coming soon.'}</p>
      </ComingSoon>
    </PageContainer>
  );
};

export default PortfolioPage;
