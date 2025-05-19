import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

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

const Subtitle = styled(motion.p)`
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

const SolutionCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const CardImage = styled.div`
  height: 200px;
  background-color: ${({ theme }) => theme.primary}20;
  position: relative;
  
  &::after {
    content: "Solution Image";
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

const CardDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const PortfolioPage = () => {
  const { translations, language } = useContext(LanguageContext);
  const t = translations.portfolioPage || {};
  
  const solutions = [
    {
      id: "justsplit",
      title: t.justSplitTitle || "JustSplit",
      description: t.justSplitDesc || "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances."
    },
    {
      id: "plantopia",
      title: t.plantopiaTitle || "Plantopia",
      description: t.plantopiaDesc || "Smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably."
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
        {solutions.map((solution, index) => (
          <SolutionCard 
            key={solution.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            id={solution.id}
          >
            <CardImage />
            <CardContent>
              <CardTitle>{solution.title}</CardTitle>
              <CardDescription>{solution.description}</CardDescription>
            </CardContent>
          </SolutionCard>
        ))}
      </SolutionsGrid>
      
      <ComingSoon>
        <p>{t.comingSoon || 'Detailed information about each solution coming soon.'}</p>
      </ComingSoon>
    </PageContainer>
  );
};

export default PortfolioPage;
