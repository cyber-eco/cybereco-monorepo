import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
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

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }
  
  p {
    margin-bottom: var(--spacing-md);
  }
  
  ul {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-md);
  }
`;

const LastUpdated = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
  margin-top: var(--spacing-xl);
  text-align: center;
`;

const PrivacyPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.privacyPage || {};
  
  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || "Privacy Policy"}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || "How we collect, use, and protect your information"}
        </Subtitle>
      </PageHeader>
      
      <ContentSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>{t.introTitle || "Introduction"}</h2>
          <p>
            {t.introText || "CyberEco (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our applications."}
          </p>
          
          <h2>{t.collectionTitle || "Information We Collect"}</h2>
          <p>
            {t.collectionText || "We may collect information about you in a variety of ways. The information we may collect includes:"}
          </p>
          <ul>
            <li>Personal Data: Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily provide to us.</li>
            <li>Derivative Data: Information our servers automatically collect when you access our platform, such as your IP address, browser type, operating system, access times, and the pages you have viewed.</li>
            <li>Financial Data: Financial information, such as data related to your payment method, that we may collect when you purchase or use our services.</li>
          </ul>
          
          <h2>{t.useTitle || "Use of Your Information"}</h2>
          <p>
            {t.useText || "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you to:"}
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process transactions.</li>
            <li>Send you administrative information, such as updates, security alerts, and support messages.</li>
            <li>Respond to your comments, questions, and requests.</li>
            <li>Develop and display content and advertising tailored to your interests.</li>
          </ul>
          
          <h2>{t.disclosureTitle || "Disclosure of Your Information"}</h2>
          <p>
            {t.disclosureText || "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:"}
          </p>
          <ul>
            <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process or to protect the rights, property, and safety of CyberEco, our users, or others.</li>
            <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf.</li>
            <li>Marketing Communications: With your consent, we may share your information with third parties for marketing purposes.</li>
          </ul>
          
          <h2>{t.securityTitle || "Security of Your Information"}</h2>
          <p>
            {t.securityText || "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable."}
          </p>
          
          <h2>{t.contactTitle || "Contact Us"}</h2>
          <p>
            {t.contactText || "If you have questions or concerns about this Privacy Policy, please contact us at privacy@cybereco.io."}
          </p>
        </motion.div>
        
        <LastUpdated>{t.lastUpdated || "Last updated: January 2023"}</LastUpdated>
      </ContentSection>
    </PageContainer>
  );
};

export default PrivacyPage;
