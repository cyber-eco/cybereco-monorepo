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

const Section = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  color: ${({ theme }) => theme.primary};
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContent = styled.div`
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
  }
`;

const ValueCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: var(--spacing-md);
`;

const ValueTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const AboutPage = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations.aboutPage || {};

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || 'About CyberEco'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || 'Learn about our mission, vision, and the values that guide our innovative technology solutions.'}
        </Subtitle>
      </PageHeader>

      <Section>
        <AboutContent>
          <TextContent>
            <SectionTitle>{t.whoWeAreTitle || 'Who We Are'}</SectionTitle>
            <p>
              {t.whoWeAreP1 || 'CyberEco is an innovative parent company dedicated to developing digital applications that enhance financial collaboration, community engagement, and social connectivity. Our purpose is to transform how people manage resources, make decisions collectively, and interact with technology through intuitive, user-centered solutions.'}
            </p>
            <p>
              {t.whoWeAreP2 || 'Our team combines expertise in software development, user experience design, financial systems, and community building to create comprehensive digital tools for individuals and groups.'}
            </p>
          </TextContent>
          <LogoContainer>
            <LogoImage src={`${process.env.PUBLIC_URL}/logo.svg`} alt="CyberEco Logo" />
          </LogoContainer>
        </AboutContent>
      </Section>

      <Section>
        <SectionTitle>{t.visionMissionTitle || 'Our Vision & Mission'}</SectionTitle>
        <AboutContent>
          <TextContent>
            <h3>{t.visionTitle || 'Vision'}</h3>
            <p>
              {t.visionText || 'To be a leading creator of digital applications that empower individuals and communities to collaborate more effectively, make better decisions, and form meaningful connections in an increasingly digital world.'}
            </p>
          </TextContent>
          <TextContent>
            <h3>{t.missionTitle || 'Mission'}</h3>
            <p>
              {t.missionText || 'To design and deploy user-centered digital solutions that simplify financial management, facilitate community engagement, and enhance social connections while promoting transparency, sustainability, and digital wellbeing.'}
            </p>
          </TextContent>
        </AboutContent>
      </Section>

      <Section>
        <SectionTitle>{t.valuesTitle || 'Our Values'}</SectionTitle>
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value1Title || 'Innovation with Purpose'}</ValueTitle>
          <p>{t.value1Text || 'We create technology that solves real problems and improves quality of life.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value2Title || 'Environmental Stewardship'}</ValueTitle>
          <p>{t.value2Text || 'All our solutions are designed with sustainability and reduced environmental impact in mind.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value3Title || 'User-Centered Design'}</ValueTitle>
          <p>{t.value3Text || 'We prioritize intuitive, accessible, and enjoyable user experiences in everything we create.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value4Title || 'Collaborative Growth'}</ValueTitle>
          <p>{t.value4Text || 'We believe in building communities and ecosystems where everyone can thrive together.'}</p>
        </ValueCard>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;
