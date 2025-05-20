import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { LanguageContext } from '../../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../../types';

interface ThemedProps {
  theme: ThemeType;
}

const Section = styled.section<ThemedProps>`
  background-color: ${({ theme }) => 
    theme.mode === 'dark' ? 'rgba(0, 30, 25, 0.8)' : 'rgba(240, 255, 245, 0.8)'};
  padding: var(--spacing-xl) 0;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const TextContent = styled.div`
  order: 2;
  
  @media (min-width: 768px) {
    order: 1;
  }
`;

const SectionImage = styled(motion.div)<ThemedProps>`
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.surface};
  order: 1;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/mission-image.png') center/cover;
    opacity: ${({ theme }) => theme.mode === 'dark' ? '0.8' : '1'};
    transition: opacity 0.3s ease;
  }
  
  @media (min-width: 768px) {
    order: 2;
    height: 500px;
  }
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: var(--spacing-md);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
`;

const SectionSubtitle = styled(motion.p)<ThemedProps>`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
`;

const SectionText = styled(motion.p)<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
  font-size: 1rem;
  line-height: 1.8;
`;

const MissionSection: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations?.homePage?.mission || {};

  return (
    <Section>
      <Container>
        <TextContent>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t.sectionTitle || 'OUR MISSION'}
          </SectionSubtitle>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t.sectionSubtitle || 'Creating harmony between technology and sustainability'}
          </SectionTitle>
          
          <SectionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.missionText || 'At CyberEco, our mission is to design and implement user-centered digital applications that enhance financial collaboration, community engagement, and social connectivity. We develop tools that promote transparency, efficiency, and healthy relationships between people and technology, enabling individuals and communities to thrive in our increasingly digital world.'}
          </SectionText>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button to="/about">
              {t.learnMore || 'Learn More About Us'}
            </Button>
          </motion.div>
        </TextContent>
        
        <SectionImage
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </Container>
    </Section>
  );
};

export default MissionSection;
