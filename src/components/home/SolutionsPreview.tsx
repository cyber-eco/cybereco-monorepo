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

interface CardBadgeProps {
  phase: string;
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
  position: relative;
  
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

const CardBadge = styled.div<CardBadgeProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ phase }) => 
    phase === 'phase1' ? 'rgba(0, 123, 255, 0.85)' :
    phase === 'phase2' ? 'rgba(40, 167, 69, 0.85)' :
    phase === 'phase3' ? 'rgba(255, 193, 7, 0.85)' :
    phase === 'phase4' ? 'rgba(111, 66, 193, 0.85)' :
    'rgba(108, 117, 125, 0.85)'
  };
  color: white;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  z-index: 1;
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

const CardCategory = styled.span<ThemedProps>`
  color: ${({ theme }) => theme.primary};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
  display: block;
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

  const featuredSolutions: (Solution & { category: string, phase: string })[] = [
    {
      id: "justsplit",
      title: portfolio.justSplitTitle || "JustSplit",
      description: portfolio.justSplitDesc || "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances.",
      color: "rgba(0, 98, 65, 0.2)",
      image: `${process.env.PUBLIC_URL}/portfolio/justsplit.png`,
      url: "https://justsplit.cybere.co",
      category: portfolio.financeEconomyTitle || "Finance & Economy",
      phase: "phase1"
    },  
    {
      id: "demos",
      title: portfolio.demosTitle || "Demos",
      description: portfolio.demosDesc || "Transparent voting and decision-making platform for organizations and neighborhoods.",
      color: "rgba(0, 123, 255, 0.2)",
      category: portfolio.communityGovernanceTitle || "Community & Governance",
      phase: "phase1"
    },
    {
      id: "plantopia",
      title: portfolio.plantopiaTitle || "Plantopia",
      description: portfolio.plantopiaDesc || "Smart gardening platform with sensors and personalized recommendations.",
      color: "rgba(40, 167, 69, 0.2)",
      url: "https://plantopia.cybere.co",
      category: portfolio.sustainabilityHomeTitle || "Sustainability & Home",
      phase: "phase2"
    },
    {
      id: "educationhub",
      title: portfolio.educationHubTitle || "Education Hub",
      description: portfolio.educationHubDesc || "Modular platform to access learning paths and educational content in a community-oriented environment.",
      color: "rgba(255, 193, 7, 0.2)",
      category: portfolio.educationTitle || "Education & Growth",
      phase: "phase2"
    }
  ];

  const getPhaseName = (phase: string): string => {
    switch(phase) {
      case "phase1": return portfolio.phaseMvp || "Priority MVP (Phase 1)";
      case "phase2": return portfolio.phaseGreen || "Green Impact (Phase 2)";
      case "phase3": return portfolio.phasePersonal || "Personalization (Phase 3)";
      case "phase4": return portfolio.phaseExpansion || "Expansion (Phase 4)";
      default: return portfolio.phaseFuture || "Future Development";
    }
  };

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
          {featuredSolutions.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <CardImage color={solution.color} image={solution.image} />
              <CardBadge phase={solution.phase}>
                {getPhaseName(solution.phase)}
              </CardBadge>
              <CardContent>
                <CardCategory>{solution.category}</CardCategory>
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
