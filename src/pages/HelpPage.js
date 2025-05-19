import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaQuestion, FaBook, FaHeadset, FaEnvelope } from 'react-icons/fa';
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

const HelpCard = styled(motion(Link))`
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

const IconWrapper = styled.div`
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

const CardDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
`;

const FaqSection = styled.section`
  margin-top: var(--spacing-xl);
`;

const FaqTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const FaqItem = styled(motion.div)`
  margin-bottom: var(--spacing-md);
`;

const FaqQuestion = styled.h4`
  margin-bottom: var(--spacing-xs);
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const FaqAnswer = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

const HelpPage = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations.helpPage || {};

  const helpOptions = [
    {
      icon: <FaQuestion />,
      title: t.faqsTitle || "FAQs",
      description: t.faqsDesc || "Find answers to the most commonly asked questions about our products and services.",
      path: "/faq"
    },
    {
      icon: <FaBook />,
      title: t.docsTitle || "Documentation",
      description: t.docsDesc || "Detailed guides and technical documentation for all our solutions.",
      path: "/documentation"
    },
    {
      icon: <FaHeadset />,
      title: t.supportTitle || "Support",
      description: t.supportDesc || "Get help from our support team for any issues or questions.",
      path: "/support"
    },
    {
      icon: <FaEnvelope />,
      title: t.contactTitle || "Contact Us",
      description: t.contactDesc || "Reach out to us directly for sales inquiries or partnership opportunities.",
      path: "/contact"
    }
  ];

  const faqs = [
    {
      question: t.faq1Q || "What is CyberEco?",
      answer: t.faq1A || "CyberEco is an innovative company focused on developing digital applications that enhance financial collaboration, community engagement, and social connectivity through user-centered design."
    },
    {
      question: t.faq2Q || "How can I start using CyberEco applications?",
      answer: t.faq2A || "You can explore our solutions in the Portfolio section and download or access them through the links provided for each application."
    },
    {
      question: t.faq3Q || "Are CyberEco's applications available on all platforms?",
      answer: t.faq3A || "Most of our applications are available as web apps, with iOS and Android versions available for our most popular tools like JustSplit and Nexus."
    },
    {
      question: t.faq4Q || "How does CyberEco ensure data privacy and security?",
      answer: t.faq4A || "We implement strong encryption, secure authentication protocols, and follow industry best practices for data protection. All our applications are designed with security as a priority."
    },
    {
      question: t.faq5Q || "Can I use CyberEco applications for my organization or business?",
      answer: t.faq5A || "Yes, many of our applications like Demos and Community Manager have business/organization versions with enhanced features for professional use."
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
          {t.title || 'Help & Support'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || 'Find the resources and assistance you need to get the most out of CyberEco solutions.'}
        </Subtitle>
      </PageHeader>

      <HelpGrid>
        {helpOptions.map((option, index) => (
          <HelpCard
            key={index}
            to={option.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <IconWrapper>
              {option.icon}
            </IconWrapper>
            <CardTitle>{option.title}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </HelpCard>
        ))}
      </HelpGrid>

      <FaqSection>
        <FaqTitle>{t.faqSectionTitle || 'Frequently Asked Questions'}</FaqTitle>
        
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 * index }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <FaqQuestion>{faq.question}</FaqQuestion>
            <FaqAnswer>{faq.answer}</FaqAnswer>
          </FaqItem>
        ))}
      </FaqSection>
    </PageContainer>
  );
};

export default HelpPage;
