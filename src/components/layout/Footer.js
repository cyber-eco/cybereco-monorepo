import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from '../common/Logo';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.surface};
  padding: var(--spacing-lg) 0;
  height: var(--footer-height);
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md);
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
  color: ${({ theme }) => theme.textPrimary};
`;

const FooterLink = styled(Link)`
  margin-bottom: var(--spacing-xs);
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: var(--spacing-sm);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: var(--spacing-md);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: var(--spacing-md);
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <Logo height={40} />
          <FooterText>
            CyberEco: the balance between intelligent control and sustainable living. Your home, your life.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://github.com/cybereco" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Explore</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/portfolio">Solutions</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/help">Help</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Solutions</FooterTitle>
          <FooterLink to="/portfolio#smart-home">Smart Home</FooterLink>
          <FooterLink to="/portfolio#energy">Energy Management</FooterLink>
          <FooterLink to="/portfolio#community">Community Resources</FooterLink>
          <FooterLink to="/portfolio#analytics">Analytics Systems</FooterLink>
        </FooterSection>
      </FooterContainer>

      <Copyright>
        © {currentYear} CyberEco. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
