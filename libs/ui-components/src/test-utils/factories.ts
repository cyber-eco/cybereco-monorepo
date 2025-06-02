import { NavigationProps, NavigationLink, NavigationActionButton } from '../Navigation';

// Navigation factory
export const createNavigationProps = (overrides: Partial<NavigationProps> = {}): NavigationProps => ({
  links: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  logoHref: '/',
  showConfig: true,
  ...overrides,
});

export const createNavigationLink = (overrides: Partial<NavigationLink> = {}): NavigationLink => ({
  href: '/default',
  label: 'Default Link',
  ...overrides,
});

export const createNavigationActionButton = (
  overrides: Partial<NavigationActionButton> = {}
): NavigationActionButton => ({
  href: '/action',
  label: 'Action',
  ...overrides,
});

// Footer factory (for future use)
export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: Array<{
    url: string;
    icon: React.ReactNode;
    label: string;
  }>;
  copyrightText?: string;
  showLogo?: boolean;
}

export const createFooterProps = (overrides: Partial<FooterProps> = {}): FooterProps => ({
  sections: [
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { href: '/docs', label: 'Documentation' },
        { href: '/support', label: 'Support' },
      ],
    },
  ],
  copyrightText: `© ${new Date().getFullYear()} CyberEco. All rights reserved.`,
  showLogo: true,
  ...overrides,
});

// Common test data
export const mockNavigationLinks: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
  { href: 'https://github.com/cybereco', label: 'GitHub', external: true },
];

export const mockHubActionButton: NavigationActionButton = {
  href: 'https://hub.cybere.co',
  label: 'Hub',
  external: true,
  className: 'hubButton',
};

// Import app-specific navigation configurations from shared-types
// These are now centralized in @cybereco/shared-types for consistency across apps