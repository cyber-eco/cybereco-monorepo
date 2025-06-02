import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock document
const documentMock = {
  documentElement: {
    setAttribute: jest.fn(),
  },
};

// Mock window.localStorage and document properly
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, 'document', {
  value: documentMock,
  writable: true,
});

// Test component that uses theme context
function TestComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button data-testid="toggle" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should provide default light theme', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should load saved theme from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    await act(async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should change theme when setTheme is called', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('set-dark'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('justsplit-theme', 'dark');
    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('should toggle theme', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    // Start with light, toggle to dark
    await act(async () => {
      fireEvent.click(screen.getByTestId('toggle'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Toggle back to light
    await act(async () => {
      fireEvent.click(screen.getByTestId('toggle'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
});