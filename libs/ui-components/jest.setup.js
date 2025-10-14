// Add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
import React from 'react';

// Make React available globally
global.React = React;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockedLink = ({ children, href, ...props }) => {
    return React.createElement('a', { href, ...props }, children);
  };
  MockedLink.displayName = 'Link';
  return MockedLink;
});

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});