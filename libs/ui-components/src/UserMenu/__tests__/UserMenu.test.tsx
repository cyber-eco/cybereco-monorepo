import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserMenu } from '../UserMenu';
import type { UserMenuItem } from '../UserMenu';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('UserMenu', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://example.com/photo.jpg',
  };

  const mockItems: UserMenuItem[] = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { divider: true },
    { label: 'Logout', onClick: jest.fn(), danger: true },
  ];

  it('renders user avatar and name', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', mockUser.photoURL);
  });

  it('renders placeholder avatar when no photo URL', () => {
    const userWithoutPhoto = { ...mockUser, photoURL: null };
    render(<UserMenu user={userWithoutPhoto} items={mockItems} />);

    expect(screen.getByText('J')).toBeInTheDocument(); // First letter of name
  });

  it('uses email when name is not provided', () => {
    const userWithoutName = { ...mockUser, name: null };
    render(<UserMenu user={userWithoutName} items={mockItems} />);

    expect(screen.getByText('john.doe')).toBeInTheDocument(); // Email prefix
  });

  it('opens menu on click', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('shows user info in dropdown', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    // Check for user info in dropdown
    const dropdownName = screen.getAllByText('John Doe')[1]; // Second occurrence is in dropdown
    expect(dropdownName).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('closes menu when clicking outside', async () => {
    render(
      <div>
        <UserMenu user={mockUser} items={mockItems} />
        <button data-testid="outside">Outside</button>
      </div>
    );

    // Open menu
    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes menu on escape key', async () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    // Open menu
    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Press escape
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('renders link items correctly', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    const profileLink = screen.getByRole('menuitem', { name: 'Profile' });
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('handles onClick for button items', () => {
    const mockOnClick = jest.fn();
    const items = [{ label: 'Logout', onClick: mockOnClick }];

    render(<UserMenu user={mockUser} items={items} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    const logoutButton = screen.getByRole('menuitem', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders dividers', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    const menu = screen.getByRole('menu');
    const dividers = menu.querySelectorAll('.menuDivider');
    expect(dividers.length).toBeGreaterThan(0);
  });

  it('applies danger styling to danger items', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    const logoutButton = screen.getByRole('menuitem', { name: 'Logout' });
    expect(logoutButton).toHaveClass('menuItemDanger');
  });

  it('renders custom avatar icon', () => {
    const customIcon = <span data-testid="custom-icon">👤</span>;
    const userWithoutPhoto = { ...mockUser, photoURL: null };

    render(<UserMenu user={userWithoutPhoto} items={mockItems} avatarIcon={customIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    const { container } = render(
      <UserMenu
        user={mockUser}
        items={mockItems}
        className="custom-menu"
        avatarClassName="custom-avatar"
        menuClassName="custom-dropdown"
      />
    );

    expect(container.querySelector('.custom-menu')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    expect(button).toHaveClass('custom-avatar');

    fireEvent.click(button);
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('custom-dropdown');
  });

  it('closes menu after clicking a link', () => {
    render(<UserMenu user={mockUser} items={mockItems} />);

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    const profileLink = screen.getByRole('menuitem', { name: 'Profile' });
    fireEvent.click(profileLink);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('toggles chevron rotation when menu opens/closes', () => {
    const { container } = render(<UserMenu user={mockUser} items={mockItems} />);

    const chevron = container.querySelector('.chevron');
    expect(chevron).not.toHaveClass('chevronOpen');

    const button = screen.getByRole('button', { name: /user menu for john doe/i });
    fireEvent.click(button);

    expect(chevron).toHaveClass('chevronOpen');
  });
});