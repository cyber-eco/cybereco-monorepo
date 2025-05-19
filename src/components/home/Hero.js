import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

const HeroContainer = styled.section`
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-lg) var(--spacing-md);
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 20, 15, 0.9)' : 'rgba(235, 255, 245, 0.9)'},
    ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 40, 30, 0.9)' : 'rgba(220, 255, 235, 0.9)'}
  );
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: var(--spacing-xl) var(--spacing-lg);
  }
`;

const HeroContentWrapper = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-xl);
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  flex: 1;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
    max-width: 50%;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.2;
  margin-bottom: var(--spacing-sm);
  color: ${({ theme }) => theme.text};
`;

const PrimaryText = styled.span`
  color: ${({ theme }) => theme.secondary};
  display: block;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    max-width: 90%;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  justify-content: center;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${({ theme }) => theme.secondary};
  color: #fff;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  text-align: center;
  display: inline-block;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.secondaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: var(--border-radius);
  text-align: center;
  display: inline-block;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
  }
`;

const HeroImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-lg);
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const HeroImage = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/hero-image.png') center/cover;
    opacity: ${({ theme }) => theme.mode === 'dark' ? '0.7' : '1'};
    transition: opacity 0.3s ease, transform 0.5s ease;
  }
  
  &:hover:before {
    transform: scale(1.03);
  }

  @media (max-width: 480px) {
    aspect-ratio: 4 / 3;
    max-width: 300px;
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
  z-index: 1;
  
  &.circle1 {
    top: -150px;
    right: -100px;
  }
  
  &.circle2 {
    bottom: -200px;
    left: -150px;
  }
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    
    &.circle1 {
      top: -100px;
      right: -80px;
    }
    
    &.circle2 {
      bottom: -100px;
      left: -80px;
    }
  }
`;

const Hero = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations?.homePage?.hero || {};

  return (
    <HeroContainer>
      <CircleDecoration className="circle1" aria-hidden="true" />
      <CircleDecoration className="circle2" aria-hidden="true" />
      
      <HeroContentWrapper>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <PrimaryText>
              {t.title || 'Digital Solutions for a Connected World'}
            </PrimaryText>
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t.subtitle || 'CyberEco creates innovative applications that enhance how people manage finances, engage with communities, and connect with each other in the digital age.'}
          </Description>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <PrimaryButton to="/portfolio">
              {t.exploreSolutions || 'Explore Solutions'}
            </PrimaryButton>
            <SecondaryButton to="/about">
              {t.learnAboutUs || 'Learn About Us'}
            </SecondaryButton>
          </ButtonContainer>
        </HeroContent>
        
        <HeroImageWrapper>
          <HeroImage
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            role="img" 
            aria-label="Digital collaboration illustration"
          />
        </HeroImageWrapper>
      </HeroContentWrapper>
    </HeroContainer>
  );
};

export default Hero;
