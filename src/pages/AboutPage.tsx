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

const Section = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2<ThemedProps>`
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

const ValueCard = styled(motion.div)<ThemedProps>`
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

const LogoContainer = styled.div<ThemedProps>`
  background-color: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const AboutPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
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
              {t.whoWeAreP1 || 'CyberEco is a human-centered digital ecosystem for conscious, connected, and sustainable living. In a world where digital life is fragmented, extractive, and overwhelming, CyberEco exists to offer a better path — one rooted in sovereignty, community, and balance.'}
            </p>
            <p>
              {t.whoWeAreP2 || 'We believe your digital presence should empower you, not exploit you. Your identity should belong to you. Your data should serve you. Your actions should connect you with others meaningfully.'}
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
              {t.visionText || 'To empower millions of people — not with more notifications, but with clarity, autonomy, and connection. To create a digital environment as human, intentional, and resilient as the world we deserve offline.'}
            </p>
          </TextContent>
          <TextContent>
            <h3>{t.missionTitle || 'Mission'}</h3>
            <p>
              {t.missionText || 'To create a modular digital ecosystem — an operating system for life — where each platform solves a real need while contributing to a greater whole, centered around the CyberEco Hub as your identity, your dashboard, your digital home.'}
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
          <ValueTitle>{t.value1Title || 'Digital Sovereignty'}</ValueTitle>
          <p>{t.value1Text || 'You own your identity, your data, your narrative. We create technology that empowers rather than exploits.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value2Title || 'Wellbeing by Design'}</ValueTitle>
          <p>{t.value2Text || 'Tech must serve your life — not consume it. We design solutions that enhance your wellbeing rather than draining it.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value3Title || 'Interconnection with Purpose'}</ValueTitle>
          <p>{t.value3Text || 'Every platform is useful alone, but transformative together. We create an ecosystem of solutions that complement each other.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value4Title || 'Community is Core'}</ValueTitle>
          <p>{t.value4Text || 'We build tools for individuals, powered by the collective. Community engagement and collaborative growth are at the heart of our ecosystem.'}</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ValueTitle>{t.value5Title || 'Open by Nature'}</ValueTitle>
          <p>{t.value5Text || 'Wherever possible, CyberEco is modular, transparent, and interoperable. We embrace openness and collaboration in our development approach.'}</p>
        </ValueCard>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;
