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

const LastUpdated = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
  margin-top: var(--spacing-xl);
  text-align: center;
`;

const TermsPage = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations.termsPage || {};
  
  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || "Terms of Service"}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || "Please read these terms of service carefully before using our platform"}
        </Subtitle>
      </PageHeader>
      
      <ContentSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>{t.agreementTitle || "1. Agreement to Terms"}</h2>
          <p>
            {t.agreementText || "By accessing or using CyberEco's website or applications, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services."}
          </p>
          
          <h2>{t.licenseTitle || "2. Use License"}</h2>
          <p>
            {t.licenseText || "Permission is granted to temporarily access the materials on CyberEco's website or applications for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"}
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on CyberEco's servers</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          
          <h2>{t.accountTitle || "3. Account Responsibilities"}</h2>
          <p>
            {t.accountText || "If you create an account with us, you are responsible for maintaining the confidentiality of your account and password, and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password."}
          </p>
          
          <h2>{t.liabilityTitle || "4. Limitation of Liability"}</h2>
          <p>
            {t.liabilityText || "In no event shall CyberEco or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CyberEco's website, even if CyberEco or a CyberEco authorized representative has been notified orally or in writing of the possibility of such damage."}
          </p>
          
          <h2>{t.accuracyTitle || "5. Accuracy of Materials"}</h2>
          <p>
            {t.accuracyText || "The materials appearing on CyberEco's website or applications could include technical, typographical, or photographic errors. CyberEco does not warrant that any of the materials on its website are accurate, complete, or current."}
          </p>
          
          <h2>{t.linksTitle || "6. Links"}</h2>
          <p>
            {t.linksText || "CyberEco has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CyberEco of the site. Use of any such linked website is at the user's own risk."}
          </p>
          
          <h2>{t.modificationsTitle || "7. Modifications"}</h2>
          <p>
            {t.modificationsText || "CyberEco may revise these terms of service at any time without notice. By using this website or our applications, you are agreeing to be bound by the current version of these Terms of Service."}
          </p>
          
          <h2>{t.contactTitle || "8. Contact Us"}</h2>
          <p>
            {t.contactText || "If you have any questions about these Terms, please contact us at terms@cybereco.io."}
          </p>
        </motion.div>
        
        <LastUpdated>{t.lastUpdated || "Last updated: January 2023"}</LastUpdated>
      </ContentSection>
    </PageContainer>
  );
};

export default TermsPage;
