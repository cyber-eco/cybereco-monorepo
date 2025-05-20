import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLifeRing, FaExclamationCircle, FaLightbulb, FaComment, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { LanguageContextType, ThemeType } from '../types';

interface ThemedProps {
  theme: ThemeType;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  product: string;
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

const SupportOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SupportCard = styled(motion.div)<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const IconWrapper = styled.div<ThemedProps>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-md);
  color: white;
  font-size: 1.2rem;
`;

const CardTitle = styled.h3`
  margin: 0;
`;

const CardContent = styled.div`
  flex-grow: 1;
`;

const CardText = styled.p<ThemedProps>`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: var(--spacing-md);
`;

const CardButton = styled(Link)<ThemedProps>`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.secondary};
    color: white;
  }
`;

const ExternalButton = styled.a<ThemedProps>`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.secondary};
    color: white;
  }
`;

const ContactFormSection = styled.section<ThemedProps>`
  background: ${({ theme }) => theme.surface};
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-xl);
`;

const ContactFormTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
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
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select<ThemedProps>`
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea<ThemedProps>`
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  font-family: inherit;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled(motion.button)<ThemedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || theme.secondary};
  }
`;

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    product: '',
    message: ''
  });
  
  const { translations } = useContext<LanguageContextType>(LanguageContext);
  const t = translations.supportPage || {};
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message. Our support team will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      product: '',
      message: ''
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title || "Support Center"}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.subtitle || "Get the assistance you need to solve problems and make the most of CyberEco applications"}
        </Subtitle>
      </PageHeader>

      <SupportOptionsGrid>
        <SupportCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader>
            <IconWrapper>
              <FaExclamationCircle />
            </IconWrapper>
            <CardTitle>{t.commonIssuesTitle || "Common Issues"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardText>
              {t.commonIssuesText || "Find quick solutions to the most frequently encountered problems with our applications."}
            </CardText>
            <CardButton to="/faq">{t.viewCommonIssues || "View Common Issues"}</CardButton>
          </CardContent>
        </SupportCard>

        <SupportCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <IconWrapper>
              <FaLightbulb />
            </IconWrapper>
            <CardTitle>{t.knowledgeBaseTitle || "Knowledge Base"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardText>
              {t.knowledgeBaseText || "Access our detailed documentation and step-by-step guides for all CyberEco applications."}
            </CardText>
            <CardButton to="/documentation">{t.browseKnowledgeBase || "Browse Knowledge Base"}</CardButton>
          </CardContent>
        </SupportCard>

        <SupportCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <IconWrapper>
              <FaComment />
            </IconWrapper>
            <CardTitle>{t.communityForumsTitle || "Community Forums"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardText>
              {t.communityForumsText || "Join discussions, share experiences, and find solutions with other users in our community forums."}
            </CardText>
            <ExternalButton href="https://community.cybereco.io" target="_blank">
              {t.visitForums || "Visit Forums"}
            </ExternalButton>
          </CardContent>
        </SupportCard>

        <SupportCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardHeader>
            <IconWrapper>
              <FaLifeRing />
            </IconWrapper>
            <CardTitle>{t.liveChatTitle || "Live Chat"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardText>
              {t.liveChatText || "Connect with our support team in real-time for immediate assistance with urgent issues."}
            </CardText>
            <ExternalButton 
              href="#chat" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                alert('Live chat feature coming soon!');
              }}
            >
              {t.startChat || "Start Chat"}
            </ExternalButton>
          </CardContent>
        </SupportCard>
      </SupportOptionsGrid>

      <ContactFormSection>
        <ContactFormTitle>{t.contactSupportTitle || "Contact Support"}</ContactFormTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">{t.nameLabel || "Your Name"}</Label>
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
            <Label htmlFor="email">{t.emailLabel || "Email Address"}</Label>
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
            <Label htmlFor="subject">{t.subjectLabel || "Subject"}</Label>
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
            <Label htmlFor="product">{t.productLabel || "Product"}</Label>
            <Select 
              id="product" 
              name="product" 
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="">{t.selectProduct || "Select a product"}</option>
              <option value="justsplit">JustSplit</option>
              <option value="plantopia">Plantopia</option>
              <option value="demos">Demos</option>
              <option value="nexus">Nexus</option>
              <option value="tradepilot">TradePilot</option>
              <option value="communitymanager">Community Manager</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">{t.messageLabel || "Message"}</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane /> {t.submitRequest || "Submit Request"}
          </SubmitButton>
        </Form>
      </ContactFormSection>
    </PageContainer>
  );
};

export default SupportPage;
