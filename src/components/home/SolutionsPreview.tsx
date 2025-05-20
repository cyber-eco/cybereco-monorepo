import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { LanguageContext } from '../../context/LanguageContext';
import { LanguageContextType, Solution, ThemeType } from '../../types';

interface ThemedProps {
  theme: ThemeType;
}

interface CardImageProps extends ThemedProps {
  color?: string;
  image?: string;
}

const SectionWrapper = styled.section<ThemedProps>`
  background-color: ${({ theme }) => theme.background};
  padding: var(--spacing-xl) 0;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: var(--spacing-sm);
`;

const SectionSubtitle = styled(motion.p)<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  max-width: 700px;
  margin: 0 auto;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SolutionCard = styled(motion.div)<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div<CardImageProps>`
  height: 160px;
  background-color: ${({ theme, color }) => color || `${theme.primary}20`};
  position: relative;
  background-image: ${({ image }) => image ? `url(${image})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const CardContent = styled.div`
  padding: var(--spacing-md);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin-bottom: var(--spacing-xs);
`;

const CardDescription = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
`;

const CardLink = styled(Link)<ThemedProps>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  
  &:after {
    content: "→";
    margin-left: var(--spacing-xs);
    transition: transform 0.2s ease;
  }
  
  &:hover:after {
    transform: translateX(4px);
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const SolutionsPreview: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations?.homePage?.solutions || {};
  const portfolio = translations?.portfolioPage || {};

  const solutions: Solution[] = [
    {
      id: "justsplit",
      title: portfolio.justSplitTitle || "JustSplit",
      description: portfolio.justSplitDesc || "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances.",
      color: "rgba(0, 98, 65, 0.2)",
      image: `${process.env.PUBLIC_URL}/portfolio/justsplit.png`,
      url: "https://justsplit.cybere.co"
    },  
    {
      id: "plantopia",
      title: portfolio.plantopiaTitle || "Plantopia",
      description: portfolio.plantopiaDesc || "Smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably.",
      color: "rgba(107, 191, 89, 0.2)",
      url: "https://plantopia.cybere.co"
    },
    {
      id: "demos",
      title: portfolio.demosTitle || "Demos",
      description: portfolio.demosDesc || "Smart democracy platform that facilitates transparent decision-making processes for organizations, communities, and civic engagement.",
      color: "rgba(0, 98, 65, 0.2)"
    },
    {
      id: "nexus",
      title: portfolio.nexusTitle || "Nexus",
      description: portfolio.nexusDesc || "Integrated social media hub that helps users manage multiple platforms while preserving digital wellbeing and meaningful connections.",
      color: "rgba(107, 191, 89, 0.2)"
    }
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t.sectionTitle || 'Our Solutions'}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.sectionSubtitle || 'Explore our diverse portfolio of digital applications designed to enhance productivity, connectivity, and community engagement'}
          </SectionSubtitle>
        </SectionHeader>

        <SolutionsGrid>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <CardImage color={solution.color} image={solution.image} />
              <CardContent>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
                <CardLink to={solution.url || `/portfolio#${solution.id}`}>
                  {t.learnMore || 'Learn more'}
                </CardLink>
              </CardContent>
            </SolutionCard>
          ))}
        </SolutionsGrid>

        <ButtonContainer>
          <Button to="/portfolio" variant="secondary" size="large">
            {t.viewAll || 'View All Solutions'}
          </Button>
        </ButtonContainer>
      </Container>
    </SectionWrapper>
  );
};

export default SolutionsPreview;
