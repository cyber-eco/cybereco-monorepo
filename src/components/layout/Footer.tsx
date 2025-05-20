import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { LanguageContext } from '../../context/LanguageContext';
import Logo from '../common/Logo';
import { ThemeType } from '../../types';

interface ThemedProps {
  theme: ThemeType;
}

const FooterContainer = styled.footer<ThemedProps>`
  background-color: ${({ theme }) => theme.surface};
  padding: var(--spacing-lg) 0;
  min-height: var(--footer-height);
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md);
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
  
  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const FooterTagline = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
`;

const SocialIcon = styled.a<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.25rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterHeading = styled.h3<ThemedProps>`
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const FooterLink = styled(Link)<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s;
  font-size: 0.95rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ContactInfo = styled.div<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const ContactItem = styled.p`
  margin: 0;
  font-size: 0.95rem;
`;

const FooterBottom = styled.div<ThemedProps>`
  text-align: center;
  padding-top: var(--spacing-md);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: var(--spacing-lg);
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
`;

const Copyright = styled.div<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
`;

const Footer: React.FC = () => {
  const { translations } = useContext(LanguageContext);
  const t = translations.footer || {};
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo height={40} />
          <FooterTagline>
            {t.tagline || 'Digital solutions for a connected world'}
          </FooterTagline>
          <SocialIcons>
            <SocialIcon href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </SocialIcon>
            <SocialIcon href="https://github.com" aria-label="GitHub">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="mailto:info@cybereco.io" aria-label="Email">
              <FaEnvelope />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t.solutions || 'Solutions'}</FooterHeading>
          <FooterLinks>
            <FooterLink to="/portfolio#justsplit">JustSplit</FooterLink>
            <FooterLink to="/portfolio#plantopia">Plantopia</FooterLink>
            <FooterLink to="/portfolio#demos">Demos</FooterLink>
            <FooterLink to="/portfolio#nexus">Nexus</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t.company || 'Company'}</FooterHeading>
          <FooterLinks>
            <FooterLink to="/about">{t.about || 'About Us'}</FooterLink>
            <FooterLink to="/help">{t.support || 'Support'}</FooterLink>
            <FooterLink to="/privacy">{t.privacy || 'Privacy Policy'}</FooterLink>
            <FooterLink to="/terms">{t.terms || 'Terms of Service'}</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t.contact || 'Contact'}</FooterHeading>
          <ContactInfo>
            <ContactItem>info@cybereco.io</ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          © {currentYear} CyberEco. {t.rightsReserved || 'All rights reserved.'}
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
