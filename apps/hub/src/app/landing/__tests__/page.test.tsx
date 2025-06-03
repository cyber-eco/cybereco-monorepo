import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LandingPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock UI components
jest.mock('@cybereco/ui-components', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

describe('Landing Page', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the hero section', () => {
    render(<LandingPage />);

    expect(screen.getByText(/Welcome to/)).toBeInTheDocument();
    expect(screen.getByText(/CyberEco Hub/)).toBeInTheDocument();
    expect(screen.getByText(/Your gateway to a sustainable digital lifestyle/)).toBeInTheDocument();
  });

  it('should render call-to-action buttons', () => {
    render(<LandingPage />);

    const getStartedButton = screen.getByText(/Get Started Free/);
    const signInButton = screen.getByText(/Sign In/);

    expect(getStartedButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(getStartedButton.closest('a')).toHaveAttribute('href', '/auth/signup');
    expect(signInButton.closest('a')).toHaveAttribute('href', '/auth/signin');
  });

  it('should display statistics', () => {
    render(<LandingPage />);

    expect(screen.getByText('100K+')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('Connected Apps')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
  });

  it('should render all feature cards', () => {
    render(<LandingPage />);

    expect(screen.getByText('Secure Authentication')).toBeInTheDocument();
    expect(screen.getByText('Unified Access')).toBeInTheDocument();
    expect(screen.getByText('Privacy First')).toBeInTheDocument();
    expect(screen.getByText('Global Scale')).toBeInTheDocument();
  });

  it('should display app showcase', () => {
    render(<LandingPage />);

    // Check app names
    expect(screen.getByText('JustSplit')).toBeInTheDocument();
    expect(screen.getByText('Somos')).toBeInTheDocument();
    expect(screen.getByText('Demos')).toBeInTheDocument();
    expect(screen.getByText('Plantopia')).toBeInTheDocument();

    // Check coming soon badges
    const comingSoonBadges = screen.getAllByText('Coming Soon');
    expect(comingSoonBadges).toHaveLength(3); // Somos, Demos, Plantopia

    // Check live app link
    const accessNowLink = screen.getByText(/Access Now/);
    expect(accessNowLink).toBeInTheDocument();
    expect(accessNowLink.closest('a')).toHaveAttribute('href', '/app/justsplit');
  });

  it('should render technical features section', () => {
    render(<LandingPage />);

    expect(screen.getByText('Built for Developers')).toBeInTheDocument();
    expect(screen.getByText(/RESTful API with GraphQL support/)).toBeInTheDocument();
    expect(screen.getByText(/Real-time analytics and monitoring/)).toBeInTheDocument();
    expect(screen.getByText(/Carbon-neutral infrastructure/)).toBeInTheDocument();
  });

  it('should display code example', () => {
    render(<LandingPage />);

    expect(screen.getByText(/Authenticate once, access everywhere/)).toBeInTheDocument();
    expect(screen.getByText(/cybereco.auth.signIn/)).toBeInTheDocument();
  });

  it('should render final CTA section', () => {
    render(<LandingPage />);

    expect(screen.getByText('Ready to join the ecosystem?')).toBeInTheDocument();
    
    const createAccountButtons = screen.getAllByText(/Create Free Account/);
    expect(createAccountButtons.length).toBeGreaterThan(0);
    
    const learnMoreLink = screen.getByText('Learn More');
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('should have proper link navigation', () => {
    render(<LandingPage />);

    const links = screen.getAllByRole('link');
    
    // Check that all links have href attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });

    // Check specific important links
    expect(screen.getByText('View Documentation →').closest('a')).toHaveAttribute('href', '/docs');
  });
});