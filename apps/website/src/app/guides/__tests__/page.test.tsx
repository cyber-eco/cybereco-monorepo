import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import GuidesRedirect from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GuidesRedirect', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /documentation/guides', () => {
    render(<GuidesRedirect />);
    
    expect(mockReplace).toHaveBeenCalledWith('/documentation/guides');
  });

  it('should display redirect message', () => {
    render(<GuidesRedirect />);
    
    expect(screen.getByText('Redirecting to documentation...')).toBeInTheDocument();
  });

  it('should display fallback link', () => {
    render(<GuidesRedirect />);
    
    const fallbackLink = screen.getByRole('link', { name: /click here/i });
    expect(fallbackLink).toHaveAttribute('href', '/documentation/guides');
  });

  it('should include noscript meta redirect', () => {
    const { container } = render(<GuidesRedirect />);
    
    const noscript = container.querySelector('noscript');
    expect(noscript).toBeInTheDocument();
    expect(noscript?.innerHTML).toContain('content="0; url=/documentation/guides"');
  });
});