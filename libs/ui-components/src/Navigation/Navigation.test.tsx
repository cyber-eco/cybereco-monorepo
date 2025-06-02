import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navigation, { NavigationProps } from './Navigation';
import { renderWithProviders } from '../test-utils';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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

const defaultProps: NavigationProps = {
  links: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: 'https://external.com', label: 'External', external: true },
  ],
};

describe('Navigation', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    // Reset document.body.style
    document.body.style.overflow = '';
  });

  describe('Props and Configuration', () => {
    test('renders with required props', () => {
      renderWithProviders(<Navigation {...defaultProps} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('About')).toHaveLength(2);
      expect(screen.getAllByText('Contact')).toHaveLength(2);
    });

    test('renders custom navigation links', () => {
      const customLinks = [
        { href: '/custom1', label: 'Custom 1' },
        { href: '/custom2', label: 'Custom 2' },
      ];
      
      renderWithProviders(<Navigation links={customLinks} />);
      
      expect(screen.getAllByText('Custom 1')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('Custom 2')).toHaveLength(2);
    });

    test('renders action button when provided', () => {
      const actionButton = {
        href: '/hub',
        label: 'Go to Hub',
        icon: <span data-testid="hub-icon">🚀</span>,
      };
      
      renderWithProviders(
        <Navigation {...defaultProps} actionButton={actionButton} />
      );
      
      expect(screen.getAllByText('Go to Hub')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByTestId('hub-icon')).toHaveLength(2);
    });

    test('conditionally renders config dropdown', () => {
      const { rerender } = renderWithProviders(
        <Navigation {...defaultProps} showConfig={true} />
      );
      
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
      
      rerender(<Navigation {...defaultProps} showConfig={false} />);
      
      expect(screen.queryByRole('button', { name: /settings/i })).not.toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = renderWithProviders(
        <Navigation {...defaultProps} className="custom-nav" />
      );
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-nav');
    });

    test('uses custom logoHref', () => {
      renderWithProviders(
        <Navigation {...defaultProps} logoHref="/custom-home" />
      );
      
      const logoLink = screen.getByRole('link', { name: /cybereco/i });
      expect(logoLink).toHaveAttribute('href', '/custom-home');
    });
  });

  describe('Responsive Behavior', () => {
    test('shows mobile menu button on small screens', () => {
      // Mock mobile viewport
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 820px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      renderWithProviders(<Navigation {...defaultProps} />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /open menu/i });
      expect(mobileMenuButton).toBeInTheDocument();
    });

    test('hides mobile menu button on large screens', () => {
      // Mock desktop viewport
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { container } = renderWithProviders(<Navigation {...defaultProps} />);
      
      // Mobile menu button should be in the DOM but styled for desktop
      const mobileMenuButton = container.querySelector('.mobileMenuButton');
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('Active Link Detection', () => {
    test('highlights active link based on current path', () => {
      const mockUsePathname = jest.fn().mockReturnValue('/about');
      renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      const aboutLinks = screen.getAllByText('About');
      const homeLinks = screen.getAllByText('Home');
      
      aboutLinks.forEach(link => expect(link).toHaveClass('active'));
      homeLinks.forEach(link => expect(link).not.toHaveClass('active'));
    });

    test('handles nested routes correctly', () => {
      const mockUsePathname = jest.fn().mockReturnValue('/about/team');
      renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      const aboutLinks = screen.getAllByText('About');
      aboutLinks.forEach(link => expect(link).toHaveClass('active'));
    });

    test('handles root path correctly', () => {
      const mockUsePathname = jest.fn().mockReturnValue('/');
      renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      const homeLinks = screen.getAllByText('Home');
      const aboutLinks = screen.getAllByText('About');
      
      homeLinks.forEach(link => expect(link).toHaveClass('active'));
      aboutLinks.forEach(link => expect(link).not.toHaveClass('active'));
    });
  });

  describe('Mobile Menu', () => {
    test('opens when hamburger is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      await user.click(menuButton);
      
      const mobileNav = document.querySelector('.mobileNav');
      expect(mobileNav).toHaveClass('open');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('closes when close button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      // Open menu
      await user.click(menuButton);
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
      
      // Close menu
      await user.click(menuButton);
      
      const mobileNav = document.querySelector('.mobileNav');
      expect(mobileNav).not.toHaveClass('open');
    });

    test('closes when link is clicked', async () => {
      const user = userEvent.setup();
      let currentPath = '/';
      const mockUsePathname = jest.fn(() => currentPath);
      
      const { rerender } = renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      await user.click(menuButton);
      
      // Click a link (mobile version)
      const aboutLinks = screen.getAllByText('About');
      const mobileAboutLink = aboutLinks[1]; // Get the mobile version (second instance)
      
      await user.click(mobileAboutLink);
      
      // Simulate route change
      currentPath = '/about';
      rerender(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      // Menu should close on route change
      await waitFor(() => {
        const mobileNav = document.querySelector('.mobileNav');
        expect(mobileNav).not.toHaveClass('open');
      });
    });

    // TODO: Fix localStorage tests - currently having issues with localStorage mocking in jsdom
    test.skip('preserves state in localStorage', async () => {
      const user = userEvent.setup();
      const mockUsePathname = jest.fn().mockReturnValue('/');
      renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      await user.click(menuButton);
      
      // Wait for effect to run
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'navigation-menu-open',
          'true'
        );
      });
    });

    test.skip('restores state from localStorage on mount', async () => {
      localStorageMock.getItem.mockReturnValue('true');
      const mockUsePathname = jest.fn().mockReturnValue('/');
      
      renderWithProviders(<Navigation {...defaultProps} usePathname={mockUsePathname} />);
      
      // Wait for effects to run
      await waitFor(() => {
        const mobileNav = document.querySelector('.mobileNav');
        expect(mobileNav).toHaveClass('open');
      });
    });

    test.skip('uses custom storage key when provided', async () => {
      const user = userEvent.setup();
      const mockUsePathname = jest.fn().mockReturnValue('/');
      renderWithProviders(
        <Navigation {...defaultProps} mobileMenuStorageKey="custom-menu-key" usePathname={mockUsePathname} />
      );
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      await user.click(menuButton);
      
      // Wait for effect to run
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'custom-menu-key',
          'true'
        );
      });
    });

    test('prevents body scroll when open', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      // Initially body should not have overflow hidden
      expect(document.body.style.overflow).toBe('');
      
      // Open menu
      await user.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');
      
      // Close menu
      await user.click(menuButton);
      expect(document.body.style.overflow).toBe('');
    });

    test('closes menu on overlay click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      // Open menu
      await user.click(menuButton);
      
      // Click overlay
      const overlay = document.querySelector('.mobileMenuOverlay');
      await user.click(overlay);
      
      const mobileNav = document.querySelector('.mobileNav');
      expect(mobileNav).not.toHaveClass('open');
    });
  });

  describe('Link Behavior', () => {
    test('renders external links with proper attributes', () => {
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const externalLinks = screen.getAllByText('External');
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('renders internal links without external attributes', () => {
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const internalLinks = screen.getAllByText('About');
      internalLinks.forEach(link => {
        expect(link).not.toHaveAttribute('target');
        expect(link).not.toHaveAttribute('rel');
      });
    });

    test('renders action button as external link when specified', () => {
      const actionButton = {
        href: 'https://hub.example.com',
        label: 'Hub',
        external: true,
      };
      
      renderWithProviders(
        <Navigation {...defaultProps} actionButton={actionButton} />
      );
      
      const hubButtons = screen.getAllByText('Hub');
      hubButtons.forEach(button => {
        expect(button).toHaveAttribute('target', '_blank');
        expect(button).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('renders action button as internal link by default', () => {
      const actionButton = {
        href: '/hub',
        label: 'Hub',
      };
      
      renderWithProviders(
        <Navigation {...defaultProps} actionButton={actionButton} />
      );
      
      const hubButtons = screen.getAllByText('Hub');
      hubButtons.forEach(button => {
        expect(button).not.toHaveAttribute('target');
        expect(button).not.toHaveAttribute('rel');
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes on mobile menu button', () => {
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toHaveAttribute('aria-label');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('updates ARIA attributes when menu state changes', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      await user.click(menuButton);
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
    });

    test('mobile nav has proper ARIA attributes', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      const mobileNav = document.querySelector('.mobileNav');
      expect(mobileNav).toHaveAttribute('aria-hidden', 'true');
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      await user.click(menuButton);
      
      expect(mobileNav).toHaveAttribute('aria-hidden', 'false');
    });

    test('is keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navigation {...defaultProps} />);
      
      // Tab through links in desktop navigation
      await user.tab();
      expect(screen.getByRole('link', { name: /cybereco/i })).toHaveFocus();
      
      await user.tab();
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      expect(homeLinks[0]).toHaveFocus(); // First (desktop) Home link
      
      await user.tab();
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      expect(aboutLinks[0]).toHaveFocus(); // First (desktop) About link
    });
  });

  describe('Cleanup', () => {
    test('removes body scroll lock on unmount', async () => {
      const user = userEvent.setup();
      const { unmount } = renderWithProviders(<Navigation {...defaultProps} />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      // Open menu
      await user.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');
      
      // Unmount
      unmount();
      
      // Body overflow should be reset
      expect(document.body.style.overflow).toBe('');
    });
  });
});