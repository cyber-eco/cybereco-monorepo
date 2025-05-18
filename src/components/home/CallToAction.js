import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const SectionWrapper = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 40, 30, 0.95)' : 'rgba(0, 98, 65, 0.95)'},
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 60, 45, 0.95)' : 'rgba(107, 191, 89, 0.95)'}
  );
  padding: var(--spacing-xl) 0;
  color: white;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  text-align: center;
`;

const Title = styled(motion.h2)`
  margin-bottom: var(--spacing-md);
  color: white;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
`;

const Description = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto var(--spacing-lg);
  font-size: 1.1rem;
  opacity: 0.9;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
`;

const CallToAction = () => {
  return (
    <SectionWrapper>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Relationship with Technology?
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover how CyberEco's innovative solutions can help you create a more efficient, 
          sustainable, and harmonious environment.
        </Description>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button to="/portfolio" size="large" style={{ background: "white", color: "var(--primary-dark)" }}>
            Explore Solutions
          </Button>
          <Button to="/help" variant="secondary" size="large" style={{ borderColor: "white", color: "white" }}>
            Get Support
          </Button>
        </ButtonGroup>
      </Container>
    </SectionWrapper>
  );
};

export default CallToAction;
