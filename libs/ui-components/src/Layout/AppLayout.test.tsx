import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppLayout from './AppLayout';

describe('AppLayout', () => {
  test('renders children content', () => {
    render(
      <AppLayout>
        <div data-testid="child-content">Test Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('conditionally renders header', () => {
    const { rerender } = render(
      <AppLayout header={<header data-testid="header">Header</header>}>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    
    // Re-render without header
    rerender(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
  });

  test('conditionally renders footer', () => {
    const { rerender } = render(
      <AppLayout footer={<footer data-testid="footer">Footer</footer>}>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // Re-render without footer
    rerender(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  test('wraps with provided providers', () => {
    const Provider1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div data-testid="provider-1">{children}</div>
    );
    
    const Provider2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div data-testid="provider-2">{children}</div>
    );
    
    render(
      <AppLayout providers={[Provider1, Provider2]}>
        <div data-testid="content">Content</div>
      </AppLayout>
    );
    
    // Check that providers are applied in the correct order
    const provider1 = screen.getByTestId('provider-1');
    const provider2 = screen.getByTestId('provider-2');
    const content = screen.getByTestId('content');
    
    expect(provider1).toBeInTheDocument();
    expect(provider2).toBeInTheDocument();
    expect(provider1).toContainElement(provider2);
    expect(provider2).toContainElement(content);
  });

  test('maintains proper layout structure', () => {
    const { container } = render(
      <AppLayout
        header={<header>Header</header>}
        footer={<footer>Footer</footer>}
      >
        <div>Main Content</div>
      </AppLayout>
    );
    
    const appLayout = container.firstChild;
    expect(appLayout).toHaveClass('appLayout');
    
    const main = container.querySelector('main');
    expect(main).toHaveClass('main');
    expect(main).toContainHTML('<div>Main Content</div>');
  });

  test('applies correct CSS classes', () => {
    const { container } = render(
      <AppLayout className="custom-layout">
        <div>Content</div>
      </AppLayout>
    );
    
    const appLayout = container.firstChild;
    expect(appLayout).toHaveClass('appLayout');
    expect(appLayout).toHaveClass('custom-layout');
  });

  test('renders complete layout with all components', () => {
    const Header = () => <header>Test Header</header>;
    const Footer = () => <footer>Test Footer</footer>;
    const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div data-testid="test-provider">{children}</div>
    );
    
    render(
      <AppLayout
        header={<Header />}
        footer={<Footer />}
        providers={[Provider]}
      >
        <div>Page Content</div>
      </AppLayout>
    );
    
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
    expect(screen.getByTestId('test-provider')).toBeInTheDocument();
  });
});