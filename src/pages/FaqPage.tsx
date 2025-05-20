import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface ExpandedItems {
  [key: string]: boolean;
}

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategories {
  general: FaqEntry[];
  technical: FaqEntry[];
  business: FaqEntry[];
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

const FaqSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled.div<ThemedProps>`
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: var(--spacing-md);
`;

interface FaqQuestionProps {
  theme: ThemeType;
}

const FaqQuestion = styled.button<FaqQuestionProps>`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: var(--spacing-sm) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const FaqAnswer = styled(motion.div)<ThemedProps>`
  padding: var(--spacing-md) 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const ChevronIcon = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const FaqCategory = styled.h2<ThemedProps>`
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-xs);
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
`;

const ContactSection = styled.div`
  margin-top: var(--spacing-xl);
  text-align: center;
`;

const ContactText = styled.p`
  margin-bottom: var(--spacing-md);
`;

const ContactButton = styled(motion.a)<ThemedProps>`
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.primary};
    color: white;
  }
`;

const FaqPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.faqPage || {};
  const h = translations.helpPage || {};
  
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  
  // Toggle function for FAQ items
  const toggleItem = (id: string): void => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ data - organized by categories
  const faqData: FaqCategories = {
    general: [
      {
        id: 'what-is-cybereco',
        question: h.faq1Q || "What is CyberEco?",
        answer: h.faq1A || "CyberEco is an innovative company focused on developing digital applications that enhance financial collaboration, community engagement, and social connectivity through user-centered design."
      },
      {
        id: 'getting-started',
        question: h.faq2Q || "How can I start using CyberEco applications?",
        answer: h.faq2A || "You can explore our solutions in the Portfolio section and download or access them through the links provided for each application."
      }
    ],
    technical: [
      {
        id: 'platform-availability',
        question: h.faq3Q || "Are CyberEco's applications available on all platforms?",
        answer: h.faq3A || "Most of our applications are available as web apps, with iOS and Android versions available for our most popular tools like JustSplit and Nexus."
      },
      {
        id: 'data-security',
        question: h.faq4Q || "How does CyberEco ensure data privacy and security?",
        answer: h.faq4A || "We implement strong encryption, secure authentication protocols, and follow industry best practices for data protection. All our applications are designed with security as a priority."
      }
    ],
    business: [
      {
        id: 'business-use',
        question: h.faq5Q || "Can I use CyberEco applications for my organization or business?",
        answer: h.faq5A || "Yes, many of our applications like Demos and Community Manager have business/organization versions with enhanced features for professional use."
      },
      {
        id: 'enterprise-solutions',
        question: t.enterpriseQuestion || "Do you offer enterprise solutions?",
        answer: t.enterpriseAnswer || "Yes, we provide customized enterprise solutions for larger organizations. Please contact our sales team for more information about enterprise pricing and features."
      }
    ]
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || "Frequently Asked Questions"}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || "Find answers to common questions about CyberEco and our applications"}
        </Subtitle>
      </PageHeader>
      
      <FaqSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FaqCategory>{t.generalQuestionsTitle || "General Questions"}</FaqCategory>
          {faqData.general.map((faq) => (
            <FaqItem key={faq.id}>
              <FaqQuestion onClick={() => toggleItem(faq.id)}>
                {faq.question}
                <ChevronIcon
                  animate={{ rotate: expandedItems[faq.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </ChevronIcon>
              </FaqQuestion>
              <AnimatePresence>
                {expandedItems[faq.id] && (
                  <FaqAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FaqAnswer>
                )}
              </AnimatePresence>
            </FaqItem>
          ))}

          <FaqCategory>{t.technicalQuestionsTitle || "Technical Questions"}</FaqCategory>
          {faqData.technical.map((faq) => (
            <FaqItem key={faq.id}>
              <FaqQuestion onClick={() => toggleItem(faq.id)}>
                {faq.question}
                <ChevronIcon
                  animate={{ rotate: expandedItems[faq.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </ChevronIcon>
              </FaqQuestion>
              <AnimatePresence>
                {expandedItems[faq.id] && (
                  <FaqAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FaqAnswer>
                )}
              </AnimatePresence>
            </FaqItem>
          ))}

          <FaqCategory>{t.businessEnterpriseTitle || "Business & Enterprise"}</FaqCategory>
          {faqData.business.map((faq) => (
            <FaqItem key={faq.id}>
              <FaqQuestion onClick={() => toggleItem(faq.id)}>
                {faq.question}
                <ChevronIcon
                  animate={{ rotate: expandedItems[faq.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </ChevronIcon>
              </FaqQuestion>
              <AnimatePresence>
                {expandedItems[faq.id] && (
                  <FaqAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FaqAnswer>
                )}
              </AnimatePresence>
            </FaqItem>
          ))}
        </motion.div>
      </FaqSection>
      
      <ContactSection>
        <ContactText>{t.contactText || "Still have questions? We're here to help."}</ContactText>
        <ContactButton 
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.contactButton || "Contact Support"}
        </ContactButton>
      </ContactSection>
    </PageContainer>
  );
};

export default FaqPage;
