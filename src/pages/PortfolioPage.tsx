import React, { useState, useContext } from 'react';
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

interface SolutionWithMetaProps extends Solution {
  category: string;
  phase: string;
}

type Category = {
  id: string;
  title: string;
};

const PageContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: var(--spacing-lg);
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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
`;

const FilterLabel = styled.div<ThemedProps>`
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
  margin-right: var(--spacing-sm);
  display: flex;
  align-items: center;
`;

interface FilterButtonProps extends ThemedProps {
  isActive: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background: ${({ theme, isActive }) => isActive ? theme.primary : theme.surface};
  color: ${({ theme, isActive }) => isActive ? theme.white : theme.textPrimary};
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.primary : theme.border};
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ theme, isActive }) => isActive ? theme.primary : `${theme.primary}20`};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const CategoryTitle = styled.h2`
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
  color: ${({ theme }: ThemedProps) => theme.primary};
  border-bottom: 1px solid ${({ theme }: ThemedProps) => theme.border};
  padding-bottom: var(--spacing-xs);
`;

const CategoryDescription = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-lg);
  max-width: 800px;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SolutionCard = styled(motion.div)<SolutionCardProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  ${({ isClickable }) => isClickable && `
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const CardImage = styled.div<CardImageProps>`
  height: 180px;
  background-color: ${({ theme, color }) => color || `${theme.primary}20`};
  position: relative;
  background-image: ${({ image }) => image ? `url(${image})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  
  &::after {
    content: ${({ image }) => image ? '""' : '"Coming Soon"'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }
`;

interface CardBadgeProps {
  phase: string;
}

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
  margin-bottom: var(--spacing-sm);
`;

const CardDescription = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  grid-column: 1 / -1;
`;

const EmptyStateText = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
`;

// Wrapper component that conditionally wraps content in a Link or div
const CardWrapper: React.FC<CardWrapperProps> = ({ children, url }) => {
  if (url) {
    return <Link to={url} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{children}</Link>;
  }
  return <>{children}</>;
};

const PortfolioPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.portfolioPage || {};
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Define categories
  const categories: Category[] = [
    { id: 'all', title: t.filterAll || 'All Solutions' },
    { id: 'community', title: t.communityGovernanceTitle || 'Community & Governance' },
    { id: 'finance', title: t.financeEconomyTitle || 'Finance & Economy' },
    { id: 'sustainability', title: t.sustainabilityHomeTitle || 'Sustainability & Home' },
    { id: 'education', title: t.educationTitle || 'Education & Growth' },
    { id: 'health', title: t.healthWellnessTitle || 'Health & Wellness' },
    { id: 'identity', title: t.identityDataLegalTitle || 'Identity, Data & Legal' },
    { id: 'family', title: t.familyMemoryTitle || 'Family & Memory' },
    { id: 'travel', title: t.travelLocalDiscoveryTitle || 'Travel, Events & Local Discovery' },
    { id: 'tech', title: t.techProductivityTitle || 'Tech, Productivity & Career' }
  ];

  const getCategoryDescription = (categoryId: string): string => {
    switch(categoryId) {
      case 'community': return t.communityGovernanceDesc || '';
      case 'finance': return t.financeEconomyDesc || '';
      case 'sustainability': return t.sustainabilityHomeDesc || '';
      case 'education': return t.educationDesc || '';
      case 'health': return t.healthWellnessDesc || '';
      case 'identity': return t.identityDataLegalDesc || '';
      case 'family': return t.familyMemoryDesc || '';
      case 'travel': return t.travelLocalDiscoveryDesc || '';
      case 'tech': return t.techProductivityDesc || '';
      default: return '';
    }
  };

  // Define solution categories and phases
  const solutions: SolutionWithMetaProps[] = [
    // Community & Governance
    {
      id: "demos",
      title: t.demosTitle || "Demos",
      description: t.demosDesc || "Transparent voting and decision-making platform for organizations and neighborhoods.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "community",
      phase: "phase1"
    },
    {
      id: "community-manager",
      title: t.communityManagerTitle || "Community Manager",
      description: t.communityManagerDesc || "Tools to create, organize, and govern digital or physical communities.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "community",
      phase: "phase4"
    },
    {
      id: "mycommunity",
      title: t.myCommunityTitle || "MyCommunity",
      description: t.myCommunityDesc || "Discover relevant local resources, events, and initiatives in your environment.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "community",
      phase: "phase3"
    },
    {
      id: "conciliation",
      title: t.conciliationTitle || "Conciliation",
      description: t.conciliationDesc || "Conflict resolution with neutral human or AI mediators in a fair manner.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "community",
      phase: "phase1"
    },
    {
      id: "crowdpool",
      title: t.crowdPoolTitle || "CrowdPool", 
      description: t.crowdPoolDesc || "System to assign community tasks or micro-jobs with incentives.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "community",
      phase: "phase3"
    },
    
    // Finance & Collaborative Economy
    {
      id: "justsplit",
      title: t.justSplitTitle || "JustSplit",
      description: t.justSplitDesc || "A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances.",
      image: `${process.env.PUBLIC_URL}/portfolio/justsplit.png`,
      url: "https://justsplit.cybere.co",
      color: "rgba(0, 98, 65, 0.2)",
      category: "finance",
      phase: "phase1"
    },
    {
      id: "mywealth",
      title: t.myWealthTitle || "MyWealth",
      description: t.myWealthDesc || "Platform to visualize and control personal finances and investments.",
      color: "rgba(0, 98, 65, 0.2)",
      category: "finance",
      phase: "phase3"
    },
    {
      id: "mybusiness",
      title: t.myBusinessTitle || "MyBusiness",
      description: t.myBusinessDesc || "Lightweight tool for entrepreneurs that combines operational and accounting management.",
      color: "rgba(0, 98, 65, 0.2)",
      category: "finance",
      phase: "phase2"
    },
    {
      id: "crowdfund",
      title: t.crowdFundTitle || "CrowdFund",
      description: t.crowdFundDesc || "Create collective funding campaigns for ideas, causes, or products.",
      color: "rgba(0, 98, 65, 0.2)",
      category: "finance",
      phase: "phase2"
    },
    {
      id: "offerme",
      title: t.offerMeTitle || "OfferMe",
      description: t.offerMeDesc || "Find verified local offers, discounts, and promotions.",
      color: "rgba(0, 98, 65, 0.2)",
      category: "finance",
      phase: "phase4"
    },
    
    // Sustainability & Home
    {
      id: "plantopia",
      title: t.plantopiaTitle || "Plantopia",
      description: t.plantopiaDesc || "Smart gardening platform with sensors and personalized recommendations.",
      color: "rgba(40, 167, 69, 0.2)",
      url: "https://plantopia.cybere.co",
      category: "sustainability",
      phase: "phase2"
    },
    {
      id: "ecotul",
      title: t.ecoTulTitle || "EcoTul",
      description: t.ecoTulDesc || "Recommender of eco-friendly products and services curated by real impact.",
      color: "rgba(40, 167, 69, 0.2)",
      category: "sustainability",
      phase: "phase2"
    },
    {
      id: "myhome",
      title: t.myHomeTitle || "MyHome",
      description: t.myHomeDesc || "App to organize home maintenance, expenses, and improvements.",
      color: "rgba(40, 167, 69, 0.2)",
      category: "sustainability",
      phase: "phase3"
    },
    
    // Education & Personal Growth
    {
      id: "educationhub",
      title: t.educationHubTitle || "Education Hub",
      description: t.educationHubDesc || "Modular platform to access learning paths and educational content.",
      color: "rgba(255, 193, 7, 0.2)",
      category: "education",
      phase: "phase2"
    },
    {
      id: "skillshare",
      title: t.skillShareTitle || "Skill Share",
      description: t.skillShareDesc || "Collaborative network where people share and teach their skills.",
      color: "rgba(255, 193, 7, 0.2)",
      category: "education",
      phase: "phase3"
    },
    {
      id: "habits",
      title: t.habitsTitle || "Habits",
      description: t.habitsDesc || "Record and track habits to achieve personal goals.",
      color: "rgba(255, 193, 7, 0.2)",
      category: "education",
      phase: "phase3"
    },
    {
      id: "onestep",
      title: t.oneStepTitle || "One Step",
      description: t.oneStepDesc || "Micro-action system to advance toward big goals with small steps.",
      color: "rgba(255, 193, 7, 0.2)",
      category: "education",
      phase: "phase3"
    },
    
    // Health & Wellness
    {
      id: "healthy",
      title: t.healthyTitle || "Healthy",
      description: t.healthyDesc || "Personalized recommendations to improve physical and mental health.",
      color: "rgba(220, 53, 69, 0.2)",
      category: "health",
      phase: "phase2"
    },
    {
      id: "petpal",
      title: t.petPalTitle || "PetPal",
      description: t.petPalDesc || "App to manage pet health and wellness with veterinary connection.",
      color: "rgba(220, 53, 69, 0.2)",
      category: "health",
      phase: "phase3"
    },
    
    // Identity, Data & Legal
    {
      id: "lawpal",
      title: t.lawPalTitle || "LawPal",
      description: t.lawPalDesc || "AI-powered legal assistant with human support.",
      color: "rgba(111, 66, 193, 0.2)",
      category: "identity",
      phase: "phase1"
    },
    {
      id: "mydata",
      title: t.myDataTitle || "MyData",
      description: t.myDataDesc || "Control panel to manage, authorize, and track use of your personal data.",
      color: "rgba(111, 66, 193, 0.2)",
      category: "identity",
      phase: "phase1"
    },
    {
      id: "digitalme",
      title: t.digitalMeTitle || "DigitalMe",
      description: t.digitalMeDesc || "Central management of digital identity, reputation, and online presence.",
      color: "rgba(111, 66, 193, 0.2)",
      category: "identity",
      phase: "phase3"
    },
    {
      id: "mydocs",
      title: t.myDocsTitle || "MyDocs",
      description: t.myDocsDesc || "Secure storage for legal, personal, and educational documents.",
      color: "rgba(111, 66, 193, 0.2)",
      category: "identity",
      phase: "phase4"
    },
    {
      id: "govaccess",
      title: t.govAccessTitle || "GovAccess",
      description: t.govAccessDesc || "Unified and simplified access to government procedures and services.",
      color: "rgba(111, 66, 193, 0.2)",
      category: "identity",
      phase: "phase4"
    },
    
    // Other categories from solutions map
    {
      id: "somos",
      title: t.somosTitle || "Somos",
      description: t.somosDesc || "Platform to explore family roots, cultural history, and sense of identity.",
      color: "rgba(108, 117, 125, 0.2)",
      category: "family",
      phase: "phase3"
    },
    {
      id: "rememberme",
      title: t.rememberMeTitle || "Remember Me",
      description: t.rememberMeDesc || "Tool to save memories, stories, and intergenerational messages.",
      color: "rgba(108, 117, 125, 0.2)",
      category: "family",
      phase: "phase3"
    },
    {
      id: "travelmate",
      title: t.travelMateTitle || "TravelMate",
      description: t.travelMateDesc || "Trip planner with local guides and personalized recommendations.",
      color: "rgba(23, 162, 184, 0.2)",
      category: "travel",
      phase: "phase4"
    },
    {
      id: "eventconnect",
      title: t.eventConnectTitle || "EventConnect",
      description: t.eventConnectDesc || "Discover or create community events with local impact.",
      color: "rgba(23, 162, 184, 0.2)",
      category: "travel",
      phase: "phase3"
    },
    {
      id: "tradepilot",
      title: t.tradePilotTitle || "TradePilot",
      description: t.tradePilotDesc || "Platform for traders with analytics, automation, and educational simulation.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "tech",
      phase: "phase4"
    },
    {
      id: "nexus",
      title: t.nexusTitle || "Nexus",
      description: t.nexusDesc || "Social media hub focused on digital wellbeing.",
      color: "rgba(0, 123, 255, 0.2)",
      category: "tech",
      phase: "phase3"
    }
  ];

  // Filter solutions by category
  const filteredSolutions = activeCategory === 'all' 
    ? solutions 
    : solutions.filter(solution => solution.category === activeCategory);
  
  // Group solutions by category when viewing all
  const groupedSolutions = activeCategory === 'all'
    ? categories.slice(1).map(category => ({
        category,
        solutions: solutions.filter(solution => solution.category === category.id)
      }))
    : [];

  // Function to handle external URLs
  const handleCardClick = (url: string): void => {
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Function to get phase name from phase ID
  const getPhaseName = (phase: string): string => {
    switch(phase) {
      case "phase1": return t.phaseMvp || "Priority MVP (Phase 1)";
      case "phase2": return t.phaseGreen || "Green Impact (Phase 2)";
      case "phase3": return t.phasePersonal || "Personalization (Phase 3)";
      case "phase4": return t.phaseExpansion || "Expansion (Phase 4)";
      default: return t.phaseFuture || "Future Development";
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

      {/* Category Filter */}
      <FilterContainer>
        <FilterLabel>{t.filterLabel || 'Filter by category:'}</FilterLabel>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.title}
          </FilterButton>
        ))}
      </FilterContainer>

      {/* Displaying solutions when a specific category is selected */}
      {activeCategory !== 'all' && (
        <>
          <SolutionsGrid>
            {filteredSolutions.length > 0 ? (
              filteredSolutions.map((solution, index) => {
                const isExternalLink = solution.url && solution.url.startsWith('http');
                
                return (
                  <SolutionCard 
                    key={solution.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * Math.min(index, 5) }}
                    id={solution.id}
                    isClickable={!!solution.url}
                    onClick={isExternalLink ? () => handleCardClick(solution.url as string) : undefined}
                  >
                    <CardWrapper url={!isExternalLink ? solution.url : undefined}>
                      <CardImage image={solution.image} color={solution.color} />
                      <CardBadge phase={solution.phase}>
                        {getPhaseName(solution.phase)}
                      </CardBadge>
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
              })
            ) : (
              <EmptyState>
                <EmptyStateText>No solutions found in this category.</EmptyStateText>
              </EmptyState>
            )}
          </SolutionsGrid>
        </>
      )}

      {/* Displaying solutions grouped by category when "All" is selected */}
      {activeCategory === 'all' && groupedSolutions.map(group => (
        group.solutions.length > 0 ? (
          <div key={group.category.id}>
            <CategoryTitle id={group.category.id}>{group.category.title}</CategoryTitle>
            <CategoryDescription>{getCategoryDescription(group.category.id)}</CategoryDescription>
            <SolutionsGrid>
              {group.solutions.map((solution, index) => {
                const isExternalLink = solution.url && solution.url.startsWith('http');
                
                return (
                  <SolutionCard 
                    key={solution.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * Math.min(index, 5) }}
                    id={solution.id}
                    isClickable={!!solution.url}
                    onClick={isExternalLink ? () => handleCardClick(solution.url as string) : undefined}
                  >
                    <CardWrapper url={!isExternalLink ? solution.url : undefined}>
                      <CardImage image={solution.image} color={solution.color} />
                      <CardBadge phase={solution.phase}>
                        {getPhaseName(solution.phase)}
                      </CardBadge>
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
          </div>
        ) : null
      ))}
    </PageContainer>
  );
};

export default PortfolioPage;
