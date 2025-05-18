import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = styled.section`
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 20, 15, 0.9)' : 'rgba(235, 255, 245, 0.9)'},
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 40, 30, 0.9)' : 'rgba(220, 255, 235, 0.9)'}
  );
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  z-index: 2;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 3.5rem);
  line-height: 1.2;
  margin-bottom: var(--spacing-sm);
`;

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.secondary};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.25rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const HeroImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius);
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/hero-image.jpg') center/cover;
    opacity: ${({ theme }) => theme.mode === 'dark' ? '0.7' : '1'};
    transition: opacity 0.3s ease;
  }

  @media (max-width: 767px) {
    height: 300px;
  }
`;

const CircleDecoration = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(0, 163, 108, 0.2) 0%, rgba(0, 98, 65, 0.05) 70%, rgba(0, 0, 0, 0) 100%'
      : 'rgba(107, 191, 89, 0.2) 0%, rgba(0, 98, 65, 0.05) 70%, rgba(255, 255, 255, 0) 100%'
    }
  );
  
  &.circle1 {
    top: -150px;
    right: -100px;
  }
  
  &.circle2 {
    bottom: -200px;
    left: -150px;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <CircleDecoration className="circle1" />
      <CircleDecoration className="circle2" />
      
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Intelligent Systems for a <HighlightedText>Sustainable Future</HighlightedText>
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CyberEco connects innovative technology with sustainability, creating intelligent systems 
            that transform how people interact with their environments.
          </HeroSubtitle>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button to="/portfolio" size="large">Explore Solutions</Button>
            <Button to="/about" variant="secondary" size="large">Learn About Us</Button>
          </ButtonGroup>
        </HeroContent>
        
        <HeroImage
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
