import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaSearch, FaChevronRight } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface DocContent {
  title: string;
  content: JSX.Element;
}

interface DocSections {
  [key: string]: DocContent;
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

const SearchContainer = styled.div`
  max-width: 600px;
  margin: var(--spacing-lg) auto;
  position: relative;
`;

const SearchInput = styled.input<ThemedProps>`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  padding-left: 3rem;
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SearchIcon = styled.div<ThemedProps>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
`;

const DocGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  
  @media (min-width: 768px) {
    grid-template-columns: 250px 1fr;
  }
`;

const SidebarNav = styled.nav<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
`;

const NavSection = styled.div`
  margin-bottom: var(--spacing-md);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NavTitle = styled.h3<ThemedProps>`
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
  color: ${({ theme }) => theme.textPrimary};
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

interface NavItemProps extends ThemedProps {
  className?: string;
}

const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: var(--spacing-xs) 0;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  transition: color 0.2s;
  font-size: 0.95rem;
  
  &:hover, &.active {
    color: ${({ theme }) => theme.primary};
  }
  
  &.active {
    font-weight: 500;
  }
`;

const MainContent = styled.main<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
`;

const ContentTitle = styled.h2<ThemedProps>`
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ContentSection = styled.section`
  margin-bottom: var(--spacing-lg);
`;

const SubTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
`;

const ContentText = styled.p`
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
`;

const CodeBlock = styled.pre<ThemedProps>`
  background: ${({ theme }) => theme.backgroundAlt || theme.background};
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  overflow-x: auto;
  margin-bottom: var(--spacing-md);
  border-left: 3px solid ${({ theme }) => theme.primary};
  font-family: 'Courier New', monospace;
`;

const DocumentationPage: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.documentationPage || {};
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const docs: DocSections = {
    'getting-started': {
      title: t.gettingStartedTitle || 'Getting Started with CyberEco',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.introductionTitle || 'Introduction'}</SubTitle>
            <ContentText>
              {t.introductionText || 'Welcome to CyberEco documentation! This guide will help you get started with our digital ecosystem. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity, all within a human-centered framework for conscious, connected, and sustainable living.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.accountCreationTitle || 'Digital Sovereignty'}</SubTitle>
            <ContentText>
              {t.digitalSovereigntyText || 'At the core of CyberEco is the principle of digital sovereignty. You own your identity, your data, and your narrative. All our applications are designed with this principle in mind, ensuring that your digital presence empowers you, not exploits you.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.exploringSolutionsTitle || 'Exploring Our Solutions'}</SubTitle>
            <ContentText>
              {t.exploringSolutionsText || 'CyberEco is not just another app. It is a modular digital ecosystem — an operating system for life — where each platform solves a real need while contributing to a greater whole. Our solutions are organized into categories that cover different aspects of life, from community governance to sustainability, from finance to education.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'community-governance': {
      title: t.communityGovernanceTitle || 'Community & Governance',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.demosTitle || 'Demos'}</SubTitle>
            <ContentText>
              {t.demosDesc || 'A participatory digital democracy platform that enables transparent voting and decision-making for organizations and neighborhoods.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.communityManagerTitle || 'Community Manager'}</SubTitle>
            <ContentText>
              {t.communityManagerDesc || 'Advanced tools to create, organize, and govern digital or physical communities with ease and transparency.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.myCommunityTitle || 'MyCommunity'}</SubTitle>
            <ContentText>
              {t.myCommunityDesc || 'A platform to discover relevant local resources, events, and initiatives in your environment and strengthen community ties.'}
            </ContentText>
          </ContentSection>
          
          <ContentSection>
            <SubTitle>{t.conciliationTitle || 'Conciliation'}</SubTitle>
            <ContentText>
              {t.conciliationDesc || 'Conflict resolution tools with neutral human or AI mediators to resolve disputes in a fair and constructive manner.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'finance-economy': {
      title: t.financeEconomyTitle || 'Finance & Collaborative Economy',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.justSplitTitle || 'JustSplit'}</SubTitle>
            <ContentText>
              {t.justSplitAboutText || 'A simple and intuitive expense tracking and sharing app that helps friends, roommates, and groups easily manage shared finances.'}
            </ContentText>
            
            <CodeBlock>
              {`// Example expense object
{
  "id": "exp_12345",
  "amount": 45.60,
  "description": "Dinner at Restaurant",
  "date": "2023-01-15",
  "paidBy": "user_789",
  "splitType": "equal",
  "participants": ["user_789", "user_456", "user_123"]
}`}
            </CodeBlock>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.myWealthTitle || 'MyWealth'}</SubTitle>
            <ContentText>
              {t.myWealthDesc || 'A comprehensive platform to visualize and control personal finances and investments in one secure place.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.myBusinessTitle || 'MyBusiness'}</SubTitle>
            <ContentText>
              {t.myBusinessDesc || 'A lightweight tool for entrepreneurs that combines operational and accounting management in a single interface.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'sustainability-home': {
      title: t.sustainabilityHomeTitle || 'Sustainability & Home Life',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.plantopiaTitle || 'Plantopia'}</SubTitle>
            <ContentText>
              {t.plantopiaAboutText || 'A smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.ecoTulTitle || 'EcoTul'}</SubTitle>
            <ContentText>
              {t.ecoTulDesc || 'A curated recommender of eco-friendly products and services evaluated by real environmental impact.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.myHomeTitle || 'MyHome'}</SubTitle>
            <ContentText>
              {t.myHomeDesc || 'A comprehensive app to organize home maintenance, track expenses, and plan improvements for sustainable living.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'education-growth': {
      title: t.educationTitle || 'Education & Personal Growth',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.educationHubTitle || 'Education Hub'}</SubTitle>
            <ContentText>
              {t.educationHubDesc || 'A modular platform to access learning paths and educational content in a community-oriented environment.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.skillShareTitle || 'Skill Share'}</SubTitle>
            <ContentText>
              {t.skillShareDesc || 'A collaborative network where people can share and teach their skills to others in the community.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.habitsTitle || 'Habits'}</SubTitle>
            <ContentText>
              {t.habitsDesc || 'A tool to record and track habits to achieve personal goals and foster continuous improvement.'}
            </ContentText>
          </ContentSection>
          
          <ContentSection>
            <SubTitle>{t.oneStepTitle || 'One Step'}</SubTitle>
            <ContentText>
              {t.oneStepDesc || 'A micro-action system designed to help you advance toward big goals with manageable small steps.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'api-reference': {
      title: t.apiReferenceTitle || 'API Reference',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.apiOverviewTitle || 'Overview'}</SubTitle>
            <ContentText>
              {t.apiOverviewText || 'CyberEco provides RESTful APIs for all our applications, allowing developers to integrate our services into their own solutions. Our APIs use standard HTTP methods and return responses in JSON format.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.apiAuthTitle || 'Authentication'}</SubTitle>
            <ContentText>
              {t.apiAuthText || 'All API requests require authentication using OAuth 2.0 bearer tokens. To obtain a token, make a POST request to our authentication endpoint with your client credentials.'}
            </ContentText>
            
            <CodeBlock>
              {`// Authentication request
fetch('https://api.cybereco.io/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    grant_type: 'client_credentials'
  })
})`}
            </CodeBlock>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.apiRequestsTitle || 'Making API Requests'}</SubTitle>
            <ContentText>
              {t.apiRequestsText || 'Once you have your token, include it in the Authorization header for all subsequent requests. Our API endpoints follow a consistent structure for all applications.'}
            </ContentText>
            
            <CodeBlock>
              {`// Example API request
fetch('https://api.cybereco.io/justsplit/expenses', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
})`}
            </CodeBlock>
          </ContentSection>
        </>
      )
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
          {t.title || 'Documentation'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || 'Comprehensive guides and technical documentation for CyberEco applications'}
        </Subtitle>
      </PageHeader>

      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder={t.searchPlaceholder || "Search documentation..."} 
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>
      
      <DocGrid>
        <SidebarNav>
          <NavSection>
            <NavTitle>{t.gettingStartedNavTitle || 'Getting Started'}</NavTitle>
            <NavItem 
              onClick={() => setActiveDoc('getting-started')}
              className={activeDoc === 'getting-started' ? 'active' : ''}
            >
              {t.introductionNavItem || 'Introduction'}
              <FaChevronRight size={10} />
            </NavItem>
          </NavSection>
          
          <NavSection>
            <NavTitle>{t.applicationsNavTitle || 'Applications'}</NavTitle>
            <NavItem 
              onClick={() => setActiveDoc('community-governance')}
              className={activeDoc === 'community-governance' ? 'active' : ''}
            >
              {t.communityGovernanceNavItem || 'Community & Governance'}
              <FaChevronRight size={10} />
            </NavItem>
            <NavItem 
              onClick={() => setActiveDoc('finance-economy')}
              className={activeDoc === 'finance-economy' ? 'active' : ''}
            >
              {t.financeEconomyNavItem || 'Finance & Economy'}
              <FaChevronRight size={10} />
            </NavItem>
            <NavItem 
              onClick={() => setActiveDoc('sustainability-home')}
              className={activeDoc === 'sustainability-home' ? 'active' : ''}
            >
              {t.sustainabilityHomeNavItem || 'Sustainability & Home'}
              <FaChevronRight size={10} />
            </NavItem>
            <NavItem 
              onClick={() => setActiveDoc('education-growth')}
              className={activeDoc === 'education-growth' ? 'active' : ''}
            >
              {t.educationGrowthNavItem || 'Education & Growth'}
              <FaChevronRight size={10} />
            </NavItem>
          </NavSection>
          
          <NavSection>
            <NavTitle>{t.developerNavTitle || 'Developer'}</NavTitle>
            <NavItem 
              onClick={() => setActiveDoc('api-reference')}
              className={activeDoc === 'api-reference' ? 'active' : ''}
            >
              {t.apiReferenceNavItem || 'API Reference'}
              <FaChevronRight size={10} />
            </NavItem>
          </NavSection>
        </SidebarNav>
        
        <MainContent>
          <motion.div
            key={activeDoc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ContentTitle>
              <FaBook style={{ marginRight: '10px', verticalAlign: 'text-top' }} />
              {docs[activeDoc].title}
            </ContentTitle>
            {docs[activeDoc].content}
          </motion.div>
        </MainContent>
      </DocGrid>
    </PageContainer>
  );
};

export default DocumentationPage;
