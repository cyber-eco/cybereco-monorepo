import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const Section = styled.section`
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

const SectionImage = styled(motion.div)`
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
    background: url('/mission-image.jpg') center/cover;
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

const SectionSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
`;

const SectionText = styled(motion.p)`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
  font-size: 1rem;
  line-height: 1.8;
`;

const MissionSection = () => {
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
            OUR MISSION
          </SectionSubtitle>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Creating harmony between technology and sustainability
          </SectionTitle>
          
          <SectionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At CyberEco, our mission is to design and implement user-centered digital solutions 
            that automate, optimize, and harmonize domestic, urban, and industrial environments. 
            We integrate principles of cybernetics, regenerative design, and energy efficiency 
            to create systems that allow individuals and communities to live more consciously, 
            connected, and resilient.
          </SectionText>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button to="/about">Learn More About Us</Button>
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
