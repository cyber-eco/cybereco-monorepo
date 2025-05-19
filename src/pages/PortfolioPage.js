import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  const solutions = [
    {
      id: "justsplit",
      title: "JustSplit",
      description: "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances."
    },
    {
      id: "platopio",
      title: "Platopio",
      description: "Smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably."
    },
    {
      id: "demos",
      title: "Demos",
      description: "Smart democracy platform that facilitates transparent decision-making processes for organizations, communities, and civic engagement."
    },
    {
      id: "nexus",
      title: "Nexus",
      description: "Integrated social media hub that helps users manage multiple platforms while preserving digital wellbeing and meaningful connections."
    },
    {
      id: "tradepilot",
      title: "TradePilot",
      description: "Advanced trading tool with analytics, automation, and educational resources for both novice and experienced investors."
    },
    {
      id: "community-manager",
      title: "Community Manager",
      description: "Comprehensive platform to create, grow, and manage communities with powerful tools for engagement, governance, and resource sharing."
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
          Our Solutions
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our diverse portfolio of digital solutions designed to enhance productivity, sustainability,
          connectivity, and community engagement through innovative technology.
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
        <p>Detailed information about each solution coming soon.</p>
      </ComingSoon>
    </PageContainer>
  );
};

export default PortfolioPage;
