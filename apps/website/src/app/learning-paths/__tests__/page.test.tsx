import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LearningPathsRedirect from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LearningPathsRedirect', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /documentation/learning-paths', () => {
    render(<LearningPathsRedirect />);
    
    expect(mockReplace).toHaveBeenCalledWith('/documentation/learning-paths');
  });

  it('should display redirect message', () => {
    render(<LearningPathsRedirect />);
    
    expect(screen.getByText('Redirecting to documentation...')).toBeInTheDocument();
  });

  it('should display fallback link', () => {
    render(<LearningPathsRedirect />);
    
    const fallbackLink = screen.getByRole('link', { name: /click here/i });
    expect(fallbackLink).toHaveAttribute('href', '/documentation/learning-paths');
  });

  it('should include noscript meta redirect', () => {
    const { container } = render(<LearningPathsRedirect />);
    
    const noscript = container.querySelector('noscript');
    expect(noscript).toBeInTheDocument();
    expect(noscript?.innerHTML).toContain('content="0; url=/documentation/learning-paths"');
  });
});