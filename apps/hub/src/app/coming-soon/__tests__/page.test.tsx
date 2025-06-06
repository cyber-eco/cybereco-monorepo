import { render, screen, fireEvent, waitFor } from '../../../test-utils';
import { useSearchParams, useRouter } from 'next/navigation';
import ComingSoonPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Coming Soon Page', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Somos App', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('somos');
    });

    it('should display Somos app information', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Somos is Coming Soon!')).toBeInTheDocument();
      expect(screen.getByText('Explore your family roots and heritage')).toBeInTheDocument();
      expect(screen.getByText('🌳')).toBeInTheDocument();
    });

    it('should display Somos features', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Interactive family tree builder')).toBeInTheDocument();
      expect(screen.getByText('Cultural heritage documentation')).toBeInTheDocument();
      expect(screen.getByText('Photo and story archiving')).toBeInTheDocument();
      expect(screen.getByText('DNA integration support')).toBeInTheDocument();
    });
  });

  describe('Demos App', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('demos');
    });

    it('should display Demos app information', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Demos is Coming Soon!')).toBeInTheDocument();
      expect(screen.getByText('Community governance made simple')).toBeInTheDocument();
      expect(screen.getByText('🗳️')).toBeInTheDocument();
    });

    it('should display Demos features', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Transparent voting systems')).toBeInTheDocument();
      expect(screen.getByText('Proposal management')).toBeInTheDocument();
      expect(screen.getByText('Community discussions')).toBeInTheDocument();
      expect(screen.getByText('Decision tracking')).toBeInTheDocument();
    });
  });

  describe('Plantopia App', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('plantopia');
    });

    it('should display Plantopia app information', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Plantopia is Coming Soon!')).toBeInTheDocument();
      expect(screen.getByText('Smart gardening companion')).toBeInTheDocument();
      expect(screen.getByText('🌱')).toBeInTheDocument();
    });

    it('should display Plantopia features', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Plant care reminders')).toBeInTheDocument();
      expect(screen.getByText('Garden planning tools')).toBeInTheDocument();
      expect(screen.getByText('Weather integration')).toBeInTheDocument();
      expect(screen.getByText('Community plant exchange')).toBeInTheDocument();
    });
  });

  describe('Unknown App', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('unknown');
    });

    it('should default to Somos for unknown apps', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText('Somos is Coming Soon!')).toBeInTheDocument();
    });
  });

  describe('Email Subscription', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('somos');
    });

    it('should display email subscription form', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText(/Get notified when Somos launches/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByText('Notify Me')).toBeInTheDocument();
    });

    it('should handle email submission', async () => {
      render(<ComingSoonPage />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByText('Notify Me');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Thanks! We'll notify you when Somos is ready/)).toBeInTheDocument();
      });
    });

    it('should require valid email', () => {
      render(<ComingSoonPage />);

      const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      // Try to submit without email
      fireEvent.submit(form);

      expect(emailInput.validity.valid).toBe(false);
    });

    it('should hide form after successful submission', async () => {
      render(<ComingSoonPage />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByText('Notify Me');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Enter your email')).not.toBeInTheDocument();
        expect(screen.queryByText('Notify Me')).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue('somos');
    });

    it('should display back to dashboard link', () => {
      render(<ComingSoonPage />);

      const backLink = screen.getByText(/Back to Dashboard/);
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/dashboard');
    });

    it('should display expected launch timeline', () => {
      render(<ComingSoonPage />);

      expect(screen.getByText(/Expected launch:/)).toBeInTheDocument();
      expect(screen.getByText('Q2 2025')).toBeInTheDocument();
    });
  });
});