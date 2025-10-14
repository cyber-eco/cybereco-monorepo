import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock the i18n module
jest.mock('@cybereco/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common:footer.products': 'Products',
        'common:footer.hub': 'Hub',
        'common:footer.justsplit': 'JustSplit',
        'common:footer.resources': 'Resources',
        'common:footer.documentation': 'Documentation',
        'common:footer.faq': 'FAQ',
        'common:footer.helpCenter': 'Help Center',
        'common:footer.contact': 'Contact',
        'common:footer.support': 'Support',
        'common:footer.privacyPolicy': 'Privacy Policy',
        'common:footer.termsOfService': 'Terms of Service',
        'common:footer.copyright': '© 2024 CyberEco Foundation. All rights reserved.',
        'common:footer.tagline': 'Empowering your digital ecosystem'
      };
      return translations[key] || key;
    }
  })
}));

describe('Footer', () => {
  it('should render all footer sections', () => {
    render(<Footer />);
    
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('should render product links', () => {
    render(<Footer />);
    
    const hubLink = screen.getByRole('link', { name: 'Hub' });
    expect(hubLink).toHaveAttribute('href', 'https://hub.cybere.co');
    
    const justSplitLink = screen.getByRole('link', { name: 'JustSplit' });
    expect(justSplitLink).toHaveAttribute('href', 'https://justsplit.cybere.co');
  });

  it('should render resource links', () => {
    render(<Footer />);
    
    const docLink = screen.getByRole('link', { name: 'Documentation' });
    expect(docLink).toHaveAttribute('href', '/documentation');
    
    const faqLink = screen.getByRole('link', { name: 'FAQ' });
    expect(faqLink).toHaveAttribute('href', '/documentation/faq');
    
    const helpLink = screen.getByRole('link', { name: 'Help Center' });
    expect(helpLink).toHaveAttribute('href', '/help');
  });

  it('should render contact and support links', () => {
    render(<Footer />);
    
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toHaveAttribute('href', '/contact');
    
    const supportLink = screen.getByRole('link', { name: 'Support' });
    expect(supportLink).toHaveAttribute('href', '/support');
  });

  it('should render company info', () => {
    render(<Footer />);
    
    expect(screen.getByText('CyberEco')).toBeInTheDocument();
    expect(screen.getByText('Empowering your digital ecosystem')).toBeInTheDocument();
  });

  it('should render copyright notice', () => {
    render(<Footer />);
    
    expect(screen.getByText('© 2024 CyberEco Foundation. All rights reserved.')).toBeInTheDocument();
  });

  it('should render privacy and terms links', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    
    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toHaveAttribute('href', '/terms');
  });
});