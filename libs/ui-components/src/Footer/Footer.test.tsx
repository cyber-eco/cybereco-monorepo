import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer, { FooterProps, LinkedInIcon, GitHubIcon, EmailIcon } from './Footer';
import { renderWithProviders } from '../test-utils';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

const defaultProps: FooterProps = {
  companyInfo: {
    name: 'Test Company',
    tagline: 'Test tagline',
    email: 'test@example.com',
    copyrightPrefix: '©'
  },
  logo: {
    show: true,
    height: 50
  },
  socialLinks: [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/test',
      icon: <LinkedInIcon />,
      ariaLabel: 'LinkedIn Profile'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/test',
      icon: <GitHubIcon />
    }
  ],
  sections: [
    {
      title: 'Products',
      links: [
        { label: 'Product 1', href: '/product1' },
        { label: 'Product 2', href: '/product2' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: 'https://blog.example.com', external: true }
      ]
    }
  ]
};

describe('Footer', () => {
  describe('Configuration', () => {
    test('renders with default props', () => {
      renderWithProviders(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    test('renders configurable sections', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      // Check section titles
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      
      // Check section links
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    test('renders social links when provided', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const linkedInLink = screen.getByRole('link', { name: 'LinkedIn Profile' });
      const githubLink = screen.getByRole('link', { name: 'GitHub' });
      
      expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/company/test');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
      
      // Check that links open in new tab
      expect(linkedInLink).toHaveAttribute('target', '_blank');
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('shows/hides logo based on prop', () => {
      const { rerender } = renderWithProviders(
        <Footer {...defaultProps} logo={{ show: true, height: 50 }} />
      );
      
      expect(screen.getByRole('link', { name: /cybereco/i })).toBeInTheDocument();
      
      rerender(
        <Footer {...defaultProps} logo={{ show: false }} />
      );
      
      expect(screen.queryByRole('link', { name: /cybereco/i })).not.toBeInTheDocument();
    });

    test('renders company info when provided', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      // Expects the translation text, not the prop text
      expect(screen.getByText('Building a sustainable digital future')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = renderWithProviders(
        <Footer className="custom-footer" />
      );
      
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Link Behavior', () => {
    test('renders external links with proper attributes', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const blogLink = screen.getByText('Blog');
      expect(blogLink).toHaveAttribute('target', '_blank');
      expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders internal links without external attributes', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const aboutLink = screen.getByText('About');
      expect(aboutLink).not.toHaveAttribute('target');
      expect(aboutLink).not.toHaveAttribute('rel');
    });

    test('email link has correct mailto format', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const emailLink = screen.getByText('test@example.com');
      expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });

    test('logo link points to home', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const logoLink = screen.getByRole('link', { name: /cybereco/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Copyright', () => {
    test('displays copyright with current year', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const currentYear = new Date().getFullYear();
      const copyright = screen.getByText(new RegExp(`© ${currentYear} Test Company`));
      expect(copyright).toBeInTheDocument();
    });

    test('hides copyright when showCopyright is false', () => {
      renderWithProviders(
        <Footer {...defaultProps} showCopyright={false} />
      );
      
      const currentYear = new Date().getFullYear();
      expect(screen.queryByText(new RegExp(`© ${currentYear}`))).not.toBeInTheDocument();
    });

    test('uses custom copyright prefix', () => {
      renderWithProviders(
        <Footer 
          {...defaultProps} 
          companyInfo={{ ...defaultProps.companyInfo, copyrightPrefix: 'Copyright' }}
        />
      );
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`Copyright ${currentYear}`))).toBeInTheDocument();
    });
  });

  describe('Social Links', () => {
    test('hides social links when showSocialLinks is false', () => {
      renderWithProviders(
        <Footer {...defaultProps} showSocialLinks={false} />
      );
      
      expect(screen.queryByRole('link', { name: 'LinkedIn Profile' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
    });

    test('renders custom social icons', () => {
      const customIcon = <span data-testid="custom-icon">X</span>;
      const customSocialLinks = [
        {
          name: 'Custom',
          href: 'https://custom.com',
          icon: customIcon
        }
      ];
      
      renderWithProviders(
        <Footer {...defaultProps} socialLinks={customSocialLinks} />
      );
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('uses aria-label when provided', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const linkedInLink = screen.getByRole('link', { name: 'LinkedIn Profile' });
      expect(linkedInLink).toHaveAttribute('aria-label', 'LinkedIn Profile');
    });

    test('falls back to name when aria-label not provided', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const githubLink = screen.getByRole('link', { name: 'GitHub' });
      expect(githubLink).toHaveAttribute('aria-label', 'GitHub');
    });
  });

  describe('Sections', () => {
    test('renders multiple sections in order', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const sectionTitles = screen.getAllByRole('heading', { level: 3 });
      expect(sectionTitles[0]).toHaveTextContent('Products');
      expect(sectionTitles[1]).toHaveTextContent('Company');
    });

    test('renders empty state when no sections provided', () => {
      renderWithProviders(
        <Footer {...defaultProps} sections={[]} />
      );
      
      expect(screen.queryByRole('heading', { level: 3, name: 'Products' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 3, name: 'Company' })).not.toBeInTheDocument();
    });

    test('handles sections with empty links', () => {
      const sectionsWithEmptyLinks = [
        {
          title: 'Empty Section',
          links: []
        }
      ];
      
      renderWithProviders(
        <Footer {...defaultProps} sections={sectionsWithEmptyLinks} />
      );
      
      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    test('uses translation keys for standard text', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      // These would be translated by the language provider
      expect(screen.getByText('All rights reserved.')).toBeInTheDocument();
    });

    test('renders contact section with translations', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      // Contact section should be present
      const contactHeading = screen.getByRole('heading', { name: /contact/i });
      expect(contactHeading).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('footer has proper role', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    test('section headings have proper hierarchy', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBeGreaterThan(0);
    });

    test('links are keyboard accessible', () => {
      renderWithProviders(<Footer {...defaultProps} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeVisible();
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined company info gracefully', () => {
      renderWithProviders(<Footer companyInfo={undefined} />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    test('handles missing email in company info', () => {
      const companyInfoWithoutEmail = {
        name: 'Test Company',
        tagline: 'Test tagline'
      };
      
      renderWithProviders(
        <Footer {...defaultProps} companyInfo={companyInfoWithoutEmail} />
      );
      
      // Contact section should not be rendered
      expect(screen.queryByRole('heading', { name: /contact/i })).not.toBeInTheDocument();
    });

    test('renders with minimal configuration', () => {
      renderWithProviders(
        <Footer 
          companyInfo={{ name: 'Minimal Co' }}
          sections={[]}
          socialLinks={[]}
          logo={{ show: false }}
        />
      );
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      expect(screen.getByText(/Minimal Co/)).toBeInTheDocument();
    });
  });
});