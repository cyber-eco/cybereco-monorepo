import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const ImagePlaceholder = styled.div`
  background-color: ${({ theme }) => theme.primary}20;
  border-radius: var(--border-radius);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
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

const AboutPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About CyberEco
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Learn about our mission, vision, and the values that guide our innovative technology solutions.
        </Subtitle>
      </PageHeader>

      <Section>
        <AboutContent>
          <TextContent>
            <SectionTitle>Who We Are</SectionTitle>
            <p>
              CyberEco is an innovative parent company dedicated to developing technological solutions 
              that integrate cybernetic control, automation, and sustainability. Our purpose is to transform 
              the relationship between people and their environment through intelligent systems that 
              harmonize technology, efficiency, and well-being.
            </p>
            <p>
              Our team combines expertise in artificial intelligence, IoT, regenerative design, and 
              energy efficiency to create comprehensive solutions for domestic, urban, and industrial environments.
            </p>
          </TextContent>
          <ImagePlaceholder>Team Image</ImagePlaceholder>
        </AboutContent>
      </Section>

      <Section>
        <SectionTitle>Our Vision & Mission</SectionTitle>
        <AboutContent>
          <TextContent>
            <h3>Vision</h3>
            <p>
              To be the global reference in technologies that connect artificial intelligence, the Internet of 
              Things (IoT), and sustainable space management, empowering individuals and communities to live 
              more consciously, connected, and resilient.
            </p>
          </TextContent>
          <TextContent>
            <h3>Mission</h3>
            <p>
              To design and deploy user-centered digital solutions that automate, optimize, and harmonize 
              domestic, urban, and industrial environments, integrating principles of cybernetics, regenerative 
              design, and energy efficiency.
            </p>
          </TextContent>
        </AboutContent>
      </Section>

      <Section>
        <SectionTitle>Our Values</SectionTitle>
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ValueTitle>Innovation with Purpose</ValueTitle>
          <p>We create technology that solves real problems and improves quality of life.</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <ValueTitle>Environmental Stewardship</ValueTitle>
          <p>All our solutions are designed with sustainability and reduced environmental impact in mind.</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ValueTitle>User-Centered Design</ValueTitle>
          <p>We prioritize intuitive, accessible, and enjoyable user experiences in everything we create.</p>
        </ValueCard>
        
        <ValueCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ValueTitle>Collaborative Growth</ValueTitle>
          <p>We believe in building communities and ecosystems where everyone can thrive together.</p>
        </ValueCard>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;
