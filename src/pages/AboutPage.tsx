import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';
import { FaHandshake } from 'react-icons/fa';

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

const ManifestoQuote = styled.blockquote<ThemedProps>`
  font-style: italic;
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
  border-left: 4px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 40, 30, 0.3)' : 'rgba(0, 98, 65, 0.05)'};
`;

const JoinSection = styled(motion.div)<ThemedProps>`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 40, 30, 0.95)' : 'rgba(0, 98, 65, 0.95)'},
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 60, 45, 0.95)' : 'rgba(107, 191, 89, 0.95)'}
  );
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  color: white;
  text-align: center;
  margin-top: var(--spacing-lg);
`;

const JoinTitle = styled.h2`
  color: white;
  margin-bottom: var(--spacing-md);
`;

const JoinText = styled.p`
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
`;

const IconContainer = styled.div`
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
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
        <SectionTitle>{t.whyWeExistTitle || 'Why We Exist'}</SectionTitle>
        <ManifestoQuote>
          {t.manifestoQuote || 'In a world where digital life is fragmented, extractive, and overwhelming, CyberEco exists to offer a better path — one rooted in sovereignty, community, and balance.'}
        </ManifestoQuote>
        <p>{t.whyWeExistText || 'The digital world has become increasingly disconnected from human values. We created CyberEco to bridge this gap, providing digital solutions that align with how people naturally want to connect, collaborate, and live sustainably.'}</p>
      </Section>

      <Section>
        <SectionTitle>{t.whatWeAreTitle || 'What We Are'}</SectionTitle>
        <p>{t.whatWeAreText || 'CyberEco is not just another app. It is a modular digital ecosystem — an operating system for life — where each platform solves a real need while contributing to a greater whole.'}</p>
        <ul>
          <li>{t.whatWeArePoint1 || 'A place to manage your finances.'}</li>
          <li>{t.whatWeArePoint2 || 'A place to resolve conflicts peacefully.'}</li>
          <li>{t.whatWeArePoint3 || 'A place to grow, learn, vote, connect, and belong.'}</li>
          <li>{t.whatWeArePoint4 || 'A place where your values and data align.'}</li>
        </ul>
        <p>{t.whatWeAreConclusion || 'At the center is the CyberEco Hub — your identity, your dashboard, your digital home.'}</p>
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

      <JoinSection
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <IconContainer>
          <FaHandshake />
        </IconContainer>
        <JoinTitle>{t.joinUsTitle || 'Join Us'}</JoinTitle>
        <JoinText>{t.joinUsText || 'CyberEco is a platform — but also a movement. We welcome creators, collaborators, dreamers, and builders. Let\'s shape a digital future worth living in — together.'}</JoinText>
      </JoinSection>
    </PageContainer>
  );
};

export default AboutPage;
