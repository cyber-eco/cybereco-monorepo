import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LanguageContext } from '../../context/LanguageContext';
import { FaUsers, FaLeaf, FaLock, FaLaptopCode } from 'react-icons/fa';

const FeaturesSection = styled.section`
  background-color: ${({ theme }) => theme.background};
  padding: var(--spacing-xl) 0;
`;

const FeaturesContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const SectionSubtitle = styled.h3`
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const FeatureCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => color || theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: white;
  font-size: 1.8rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
  font-size: 1.3rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
`;

const Features = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations?.homePage?.features || {};

  const features = [
    {
      icon: <FaUsers />,
      title: t.communityTitle || 'Community Building',
      description: t.communityDesc || 'Create and nurture thriving digital communities with tools designed for meaningful connection and collaboration.'
    },
    {
      icon: <FaLeaf />,
      title: t.sustainabilityTitle || 'Sustainability',
      description: t.sustainabilityDesc || 'Eco-friendly digital solutions designed with environmental impact in mind, promoting sustainable practices.'
    },
    {
      icon: <FaLock />,
      title: t.securityTitle || 'Enhanced Security',
      description: t.securityDesc || 'State-of-the-art security measures to protect your data and ensure privacy across all our applications.'
    },
    {
      icon: <FaLaptopCode />,
      title: t.innovationTitle || 'Innovative Tech',
      description: t.innovationDesc || 'Cutting-edge technology solutions that anticipate needs and solve problems before they arise.'
    }
  ];

  return (
    <FeaturesSection>
      <FeaturesContainer>
        <SectionTitle>
          {t.sectionTitle || 'Transformative Technology Solutions'}
        </SectionTitle>
        
        <SectionSubtitle>
          {t.sectionSubtitle || 'What sets our solutions apart from the rest'}
        </SectionSubtitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <IconContainer>
                {feature.icon}
              </IconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default Features;
