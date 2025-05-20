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
              {t.introductionText || 'Welcome to CyberEco documentation! This guide will help you get started with our platform and applications. CyberEco offers a suite of digital solutions designed to enhance financial collaboration, community engagement, and social connectivity.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.accountCreationTitle || 'Creating Your Account'}</SubTitle>
            <ContentText>
              {t.accountCreationText || 'To get started with any CyberEco application, you\'ll first need to create an account. Visit our website and click on "Sign Up" to create your account. You can sign up using your email address or using a social login option.'}
            </ContentText>
            
            <CodeBlock>
              {`// Sample API request for account creation
fetch('https://api.cybereco.io/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword',
    name: 'John Doe'
  })
})`}
            </CodeBlock>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.exploringSolutionsTitle || 'Exploring Our Solutions'}</SubTitle>
            <ContentText>
              {t.exploringSolutionsText || 'After creating your account, you can explore our various applications from your dashboard. Each application has its own specific functionality, but they all share our commitment to intuitive design and secure operation.'}
            </ContentText>
          </ContentSection>
        </>
      )
    },
    'justsplit': {
      title: t.justSplitTitle || 'JustSplit Documentation',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.justSplitAboutTitle || 'About JustSplit'}</SubTitle>
            <ContentText>
              {t.justSplitAboutText || 'JustSplit is an expense sharing application that helps friends, roommates, and groups easily track and split expenses. It streamlines the process of managing shared finances, ensuring everyone pays their fair share.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.justSplitGroupTitle || 'Creating a Group'}</SubTitle>
            <ContentText>
              {t.justSplitGroupText || 'To start using JustSplit, create a new group by clicking on "New Group" from your dashboard. Give your group a name and invite members using their email addresses or by sharing a unique invite link.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.justSplitExpensesTitle || 'Adding Expenses'}</SubTitle>
            <ContentText>
              {t.justSplitExpensesText || 'Once your group is set up, you can add expenses by clicking the "Add Expense" button. Enter the amount, description, date, and who paid. Then, select how the expense should be split among group members.'}
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
        </>
      )
    },
    'plantopia': {
      title: t.plantopiaTitle || 'Plantopia Documentation',
      content: (
        <>
          <ContentSection>
            <SubTitle>{t.plantopiaAboutTitle || 'About Plantopia'}</SubTitle>
            <ContentText>
              {t.plantopiaAboutText || 'Plantopia is a smart gardening platform that combines IoT technology with plant care knowledge to help users cultivate thriving gardens sustainably.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.plantopiaSetupTitle || 'Setting Up Your Garden'}</SubTitle>
            <ContentText>
              {t.plantopiaSetupText || 'After creating your Plantopia account, set up your digital garden by adding your plants. You can search our extensive database or scan plants using our mobile app for automatic identification.'}
            </ContentText>
          </ContentSection>

          <ContentSection>
            <SubTitle>{t.plantopiaIoTTitle || 'Connecting IoT Devices'}</SubTitle>
            <ContentText>
              {t.plantopiaIoTText || 'Plantopia works best when connected to supported IoT devices like soil moisture sensors and automatic watering systems. To connect a device, go to "Settings" > "Connected Devices" and follow the pairing instructions.'}
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
              onClick={() => setActiveDoc('justsplit')}
              className={activeDoc === 'justsplit' ? 'active' : ''}
            >
              {t.justSplitNavItem || 'JustSplit'}
              <FaChevronRight size={10} />
            </NavItem>
            <NavItem 
              onClick={() => setActiveDoc('plantopia')}
              className={activeDoc === 'plantopia' ? 'active' : ''}
            >
              {t.plantopiaNavItem || 'Plantopia'}
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
