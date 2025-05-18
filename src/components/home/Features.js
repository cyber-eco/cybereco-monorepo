import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaLeaf, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';

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

const FeatureIcon = styled.div`
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
  const featureVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: i => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: i * 0.1
      }
    })
  };

  const features = [
    {
      id: 1,
      title: 'Smart Home Automation',
      description: 'Intelligent systems that learn from your habits and optimize energy usage while maximizing comfort.',
      icon: <FaHome />,
      color: '#006241'
    },
    {
      id: 2,
      title: 'Sustainable Solutions',
      description: 'Eco-friendly technology that reduces environmental impact without sacrificing functionality.',
      icon: <FaLeaf />,
      color: '#6BBF59'
    },
    {
      id: 3,
      title: 'Integrated Ecosystems',
      description: 'Seamlessly connected devices and platforms that work together to create a comprehensive experience.',
      icon: <FaNetworkWired />,
      color: '#006241'
    },
    {
      id: 4,
      title: 'Enhanced Security',
      description: 'Advanced protection for your data and physical spaces with state-of-the-art cybersecurity measures.',
      icon: <FaShieldAlt />,
      color: '#6BBF59'
    }
  ];

  return (
    <FeaturesSection>
      <FeaturesContainer>
        <SectionTitle>Transformative Technology Solutions</SectionTitle>
        
        <FeaturesGrid>
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={featureVariants}
            >
              <FeatureCard>
                <FeatureIcon color={feature.color}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            </motion.div>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default Features;
