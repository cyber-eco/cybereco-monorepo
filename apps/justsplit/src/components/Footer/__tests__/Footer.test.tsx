import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { GlobalProvider } from '@cybereco/ui-components';

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('JustSplit Footer', () => {
  const renderFooter = () => {
    return render(
      <GlobalProvider>
        <Footer />
      </GlobalProvider>
    );
  };

  it('renders company info', () => {
    renderFooter();

    expect(screen.getByText(/JustSplit/)).toBeInTheDocument();
    expect(screen.getByText(/Split expenses, not friendships/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument(); // Copyright year
  });

  it('renders all footer sections', () => {
    renderFooter();

    // Check section titles
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders feature links', () => {
    renderFooter();

    expect(screen.getByText('Expense Splitting')).toBeInTheDocument();
    expect(screen.getByText('Group Management')).toBeInTheDocument();
    expect(screen.getByText('Real-time Sync')).toBeInTheDocument();
    expect(screen.getByText('Multi-currency')).toBeInTheDocument();
  });

  it('renders resource links', () => {
    renderFooter();

    expect(screen.getByText('User Guide')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('renders company links', () => {
    renderFooter();

    expect(screen.getByText('About JustSplit')).toBeInTheDocument();
    expect(screen.getByText('CyberEco')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders contact email', () => {
    renderFooter();

    const emailLink = screen.getByText('support@justsplit.app');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:support@justsplit.app');
  });

  it('renders social links with correct hrefs', () => {
    renderFooter();

    const links = screen.getAllByRole('link');
    
    // Find GitHub link
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/cyber-eco/justsplit');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('aria-label', 'Visit JustSplit on GitHub');

    // Find Email social link
    const emailSocialLink = links.find(link => 
      link.getAttribute('href') === 'mailto:support@justsplit.app' && 
      link.getAttribute('aria-label') === 'Email JustSplit support'
    );
    expect(emailSocialLink).toBeInTheDocument();
  });

  it('renders logo link to home', () => {
    renderFooter();

    const logoLink = screen.getByRole('link', { name: /cybereco home/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders external links with correct attributes', () => {
    renderFooter();

    const cyberEcoLink = screen.getByText('CyberEco');
    expect(cyberEcoLink).toHaveAttribute('href', 'https://cybere.co');
    expect(cyberEcoLink).toHaveAttribute('target', '_blank');
    expect(cyberEcoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies correct CSS classes', () => {
    const { container } = renderFooter();

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('footer');
  });
});