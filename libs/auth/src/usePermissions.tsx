'use client';

import { useEffect, useState } from 'react';
import { BaseUser } from './AuthContext';
import type { AppPermission } from './utils';

interface PermissionCheckResult {
  hasAccess: boolean;
  hasFeature: (feature: string) => boolean;
  hasRole: (role: string) => boolean;
  isLoading: boolean;
  error?: Error;
}

interface UsePermissionsConfig {
  appId: string;
  user: BaseUser | null;
  requiredFeatures?: string[];
  requiredRoles?: string[];
}

/**
 * Hook to check user permissions for the current app
 */
export function usePermissions({ 
  appId, 
  user, 
  requiredFeatures = [], 
  requiredRoles = [] 
}: UsePermissionsConfig): PermissionCheckResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [permissions, setPermissions] = useState<AppPermission | null>(null);

  useEffect(() => {
    if (!user) {
      setPermissions(null);
      setIsLoading(false);
      return;
    }

    const checkPermissions = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, this would fetch from the Hub API
        // For now, we'll check the user's local permissions
        const userWithPermissions = user as any;
        
        if (userWithPermissions.permissions) {
          const appPermission = userWithPermissions.permissions.find(
            (p: AppPermission) => p.appId === appId
          );
          setPermissions(appPermission || null);
        } else if (userWithPermissions.apps && userWithPermissions.apps.includes(appId)) {
          // Legacy support - user has app access but no detailed permissions
          setPermissions({
            appId,
            roles: ['user'],
            features: []
          });
        } else {
          setPermissions(null);
        }
      } catch (err) {
        setError(err as Error);
        setPermissions(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissions();
  }, [user, appId]);

  const hasAccess = !!permissions;
  
  const hasFeature = (feature: string): boolean => {
    if (!permissions) return false;
    return permissions.features.includes(feature);
  };
  
  const hasRole = (role: string): boolean => {
    if (!permissions) return false;
    return permissions.roles.includes(role);
  };

  // Check required features and roles
  const meetsRequirements = hasAccess && 
    requiredFeatures.every(feature => hasFeature(feature)) &&
    requiredRoles.every(role => hasRole(role));

  return {
    hasAccess: meetsRequirements,
    hasFeature,
    hasRole,
    isLoading,
    error
  };
}

/**
 * HOC to protect components with permission checks
 */
export function withPermissions<P extends object>(
  Component: React.ComponentType<P>,
  config: Omit<UsePermissionsConfig, 'user'>
) {
  return function ProtectedComponent(props: P & { user: BaseUser | null }) {
    const { user, ...componentProps } = props;
    const { hasAccess, isLoading, error } = usePermissions({
      ...config,
      user
    });

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">
            Error checking permissions: {error.message}
          </div>
        </div>
      );
    }

    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600">
              You do not have permission to access this application.
            </p>
            <a href={process.env.NEXT_PUBLIC_HUB_URL || '/'} className="mt-4 inline-block text-blue-600 hover:underline">
              Return to Hub
            </a>
          </div>
        </div>
      );
    }

    return <Component {...(componentProps as P)} />;
  };
}