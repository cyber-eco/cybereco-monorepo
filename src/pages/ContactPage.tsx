import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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

const Subtitle = styled(motion.p)<ThemedProps>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 700px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled(motion.form)<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
`;

const Input = styled.input<ThemedProps>`
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea<ThemedProps>`
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button<ThemedProps>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primaryDark || theme.primary};
  }
`;

const ContactInfo = styled(motion.div)<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: ${({ theme }) => theme.shadow};
`;

const InfoTitle = styled.h2<ThemedProps>`
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
`;

const IconWrapper = styled.div<ThemedProps>`
  margin-right: var(--spacing-sm);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryLight || theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
`;

const InfoValue = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
`;

const SocialLinks = styled.div`
  margin-top: var(--spacing-lg);
`;

const SocialTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
`;

const SuccessMessage = styled(motion.div)<ThemedProps>`
  background: ${({ theme }) => theme.success || '#4caf50'};
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
`;

const ContactPage: React.FC = () => {
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.contactPage || {};
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here you would usually send the form data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setIsSubmitted(true);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || 'Contact Us'}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
        </Subtitle>
      </PageHeader>
      
      <ContactGrid>
        <ContactForm
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          {isSubmitted && (
            <SuccessMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {t.successMessage || "Your message has been sent successfully. We'll get back to you soon!"}
            </SuccessMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">{t.nameLabel || 'Name'}</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">{t.emailLabel || 'Email'}</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">{t.subjectLabel || 'Subject'}</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">{t.messageLabel || 'Message'}</Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <Button type="submit">
            <FaPaperPlane />
            {t.submitButton || 'Send Message'}
          </Button>
        </ContactForm>
        
        <ContactInfo
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <InfoTitle>{t.contactInfoTitle || 'Get in Touch'}</InfoTitle>
          
          <InfoItem>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <InfoContent>
              <InfoLabel>{t.emailContactLabel || 'Email'}</InfoLabel>
              <InfoValue>info@cybereco.io</InfoValue>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <IconWrapper>
              <FaMapMarkerAlt />
            </IconWrapper>
            <InfoContent>
              <InfoLabel>{t.addressLabel || 'Address'}</InfoLabel>
              <InfoValue>Mexico City</InfoValue>
            </InfoContent>
          </InfoItem>
          
          <SocialLinks>
            <SocialTitle>{t.socialTitle || 'Follow Us'}</SocialTitle>
            {/* Add your social links here */}
          </SocialLinks>
        </ContactInfo>
      </ContactGrid>
    </PageContainer>
  );
};

export default ContactPage;
