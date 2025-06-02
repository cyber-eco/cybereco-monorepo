import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ConfigDropdown from './ConfigDropdown';
import { ThemeProvider } from '../theme/ThemeContext';
import { LanguageProvider } from '../i18n/LanguageContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Helper function to render with providers
const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </ThemeProvider>,
    options
  );
};

describe('ConfigDropdown', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  describe('Rendering', () => {
    test('renders with default props', () => {
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    test('renders in controlled mode', () => {
      const onToggle = jest.fn();
      renderWithProviders(<ConfigDropdown isOpen={true} onToggle={onToggle} />);
      
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = renderWithProviders(<ConfigDropdown className="custom-class" />);
      
      const dropdown = container.firstChild;
      expect(dropdown).toHaveClass('custom-class');
    });
  });

  describe('Interaction', () => {
    test('opens dropdown on button click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      
      await user.click(button);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('closes dropdown on button click when open', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      // Open dropdown
      await user.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Close dropdown
      await user.click(button);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('closes dropdown on outside click', async () => {
      const user = userEvent.setup();
      const { container } = renderWithProviders(
        <div>
          <ConfigDropdown />
          <div data-testid="outside">Outside element</div>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      // Open dropdown
      await user.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Click outside
      const outsideElement = screen.getByTestId('outside');
      await user.click(outsideElement);
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    test('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      // Open dropdown
      await user.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Press Escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    test('calls onToggle callback when provided', async () => {
      const user = userEvent.setup();
      const onToggle = jest.fn();
      renderWithProviders(<ConfigDropdown onToggle={onToggle} />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      await user.click(button);
      expect(onToggle).toHaveBeenCalledWith(true);
      
      await user.click(button);
      expect(onToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('Theme Integration', () => {
    test('toggles theme when theme toggle is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Click light theme button
      const lightThemeButton = screen.getByRole('menuitem', { name: /light/i });
      await user.click(lightThemeButton);
      
      // Verify theme was toggled (localStorage would be called)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', expect.any(String));
    });

    test('reflects current theme state', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check that one theme option is selected
      const themeButtons = screen.getAllByRole('menuitem').filter(item => 
        item.textContent?.includes('Light') || item.textContent?.includes('Dark')
      );
      
      const selectedButtons = themeButtons.filter(btn => 
        btn.classList.contains('selected')
      );
      
      expect(selectedButtons).toHaveLength(1);
    });

    test('shows correct theme icons', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check for theme section
      expect(screen.getByText(/theme/i)).toBeInTheDocument();
      expect(screen.getByText(/light/i)).toBeInTheDocument();
      expect(screen.getByText(/dark/i)).toBeInTheDocument();
    });
  });

  describe('Language Integration', () => {
    test('changes language when language selector is used', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Click Spanish language button
      const spanishButton = screen.getByRole('menuitem', { name: /español/i });
      await user.click(spanishButton);
      
      // Verify language was changed (localStorage would be called)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'es');
    });

    test('reflects current language state', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check that one language option is selected
      const languageButtons = screen.getAllByRole('menuitem').filter(item => 
        item.textContent?.includes('English') || item.textContent?.includes('Español')
      );
      
      const selectedButtons = languageButtons.filter(btn => 
        btn.classList.contains('selected')
      );
      
      expect(selectedButtons).toHaveLength(1);
    });

    test('displays language flags', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check for language flags
      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
      expect(screen.getByText('🇪🇸')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    test('is keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      // Tab to button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Enter to open
      await user.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Tab through menu items
      await user.tab();
      const firstMenuItem = screen.getAllByRole('menuitem')[0];
      expect(firstMenuItem).toHaveFocus();
    });

    test('menu items have proper role', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
      
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('role', 'menuitem');
      });
    });

    test('announces state changes to screen readers', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      // Initially closed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      // Open dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      // Close dropdown
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Visual States', () => {
    test('applies active class when open', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      
      expect(button).not.toHaveClass('active');
      
      await user.click(button);
      expect(button).toHaveClass('active');
    });

    test('applies spinning animation to icon when opening', async () => {
      const user = userEvent.setup();
      const { container } = renderWithProviders(<ConfigDropdown />);
      
      const button = screen.getByRole('button', { name: /settings/i });
      const icon = container.querySelector('.configIcon');
      
      expect(icon).not.toHaveClass('spinning');
      
      await user.click(button);
      expect(icon).toHaveClass('spinning');
    });

    test('highlights selected theme option', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check that exactly one theme option is selected
      const themeOptions = screen.getAllByRole('menuitem').filter(item => 
        item.textContent?.includes('Light') || item.textContent?.includes('Dark')
      );
      
      const selectedOptions = themeOptions.filter(option => 
        option.classList.contains('selected')
      );
      
      expect(selectedOptions).toHaveLength(1);
    });

    test('highlights selected language option', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ConfigDropdown />);
      
      // Open dropdown
      const button = screen.getByRole('button', { name: /settings/i });
      await user.click(button);
      
      // Check that exactly one language option is selected
      const languageOptions = screen.getAllByRole('menuitem').filter(item => 
        item.textContent?.includes('English') || item.textContent?.includes('Español')
      );
      
      const selectedOptions = languageOptions.filter(option => 
        option.classList.contains('selected')
      );
      
      expect(selectedOptions).toHaveLength(1);
    });
  });
});