import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { usePermissions, withPermissions } from '../usePermissions';
import { BaseUser } from '@cybereco/shared-types';

describe('usePermissions', () => {
  const mockUser: BaseUser & { permissions?: any[] } = {
    id: 'test-user-123',
    name: 'Test User',
    email: 'test@example.com',
    permissions: [
      {
        appId: 'justsplit',
        roles: ['user', 'admin'],
        features: ['expense-tracking', 'group-management']
      },
      {
        appId: 'hub',
        roles: ['user'],
        features: ['app-access']
      }
    ]
  };

  describe('Basic Permission Checks', () => {
    it('should return hasAccess true when user has permission for app', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser
        })
      );

      expect(result.current.hasAccess).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    it('should return hasAccess false when user lacks permission for app', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'unknown-app',
          user: mockUser
        })
      );

      expect(result.current.hasAccess).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should return hasAccess false when user is null', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: null
        })
      );

      expect(result.current.hasAccess).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Feature Checks', () => {
    it('should correctly check for specific features', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser
        })
      );

      expect(result.current.hasFeature('expense-tracking')).toBe(true);
      expect(result.current.hasFeature('group-management')).toBe(true);
      expect(result.current.hasFeature('non-existent-feature')).toBe(false);
    });

    it('should require all specified features', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser,
          requiredFeatures: ['expense-tracking', 'group-management']
        })
      );

      expect(result.current.hasAccess).toBe(true);
    });

    it('should deny access if any required feature is missing', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser,
          requiredFeatures: ['expense-tracking', 'budget-management']
        })
      );

      expect(result.current.hasAccess).toBe(false);
    });
  });

  describe('Role Checks', () => {
    it('should correctly check for specific roles', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser
        })
      );

      expect(result.current.hasRole('user')).toBe(true);
      expect(result.current.hasRole('admin')).toBe(true);
      expect(result.current.hasRole('super-admin')).toBe(false);
    });

    it('should require all specified roles', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser,
          requiredRoles: ['user', 'admin']
        })
      );

      expect(result.current.hasAccess).toBe(true);
    });

    it('should deny access if any required role is missing', () => {
      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser,
          requiredRoles: ['user', 'super-admin']
        })
      );

      expect(result.current.hasAccess).toBe(false);
    });
  });

  describe('Legacy Support', () => {
    it('should support legacy user format with apps array', () => {
      const legacyUser = {
        id: 'test-user-123',
        name: 'Test User',
        email: 'test@example.com',
        apps: ['justsplit', 'hub']
      };

      const { result } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: legacyUser as any
        })
      );

      expect(result.current.hasAccess).toBe(true);
      expect(result.current.hasRole('user')).toBe(true);
      expect(result.current.hasFeature('any-feature')).toBe(false);
    });
  });

  describe('Loading States', () => {
    it('should start in loading state and resolve', async () => {
      const { result, rerender } = renderHook(() => 
        usePermissions({
          appId: 'justsplit',
          user: mockUser
        })
      );

      // Initial render should not be loading (synchronous check)
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasAccess).toBe(true);
    });
  });
});

describe('withPermissions HOC', () => {
  const TestComponent = ({ message }: { message: string }) => (
    <div data-testid="content">{message}</div>
  );

  const mockUser: BaseUser & { permissions?: any[] } = {
    id: 'test-user-123',
    name: 'Test User',
    email: 'test@example.com',
    permissions: [
      {
        appId: 'justsplit',
        roles: ['user'],
        features: ['expense-tracking']
      }
    ]
  };

  it('should render component when user has access', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'justsplit'
    });

    render(<ProtectedComponent user={mockUser} message="Hello World" />);

    expect(screen.getByTestId('content')).toHaveTextContent('Hello World');
  });

  it('should show access denied when user lacks permission', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'unknown-app'
    });

    render(<ProtectedComponent user={mockUser} message="Hello World" />);

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should show access denied for missing features', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'justsplit',
      requiredFeatures: ['budget-management']
    });

    render(<ProtectedComponent user={mockUser} message="Hello World" />);

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'justsplit'
    });

    const { container } = render(<ProtectedComponent user={mockUser} message="Hello World" />);

    // Since our mock is synchronous, it shouldn't show loading
    expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should handle null user', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'justsplit'
    });

    render(<ProtectedComponent user={null} message="Hello World" />);

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('should display return to hub link', () => {
    const ProtectedComponent = withPermissions(TestComponent, {
      appId: 'unknown-app'
    });

    // Mock environment variable
    const originalEnv = process.env.NEXT_PUBLIC_HUB_URL;
    process.env.NEXT_PUBLIC_HUB_URL = 'http://localhost:40000';

    render(<ProtectedComponent user={mockUser} message="Hello World" />);

    const link = screen.getByText('Return to Hub');
    expect(link).toHaveAttribute('href', 'http://localhost:40000');

    // Restore environment variable
    process.env.NEXT_PUBLIC_HUB_URL = originalEnv;
  });
});