// Navigation types - copied from ui-components to avoid circular dependency
export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface NavigationActionButton {
  href?: string;
  label?: string;
  onClick?: () => void;
  element?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface NavigationProps {
  links: NavigationLink[];
  actionButton?: NavigationActionButton;
  showConfig?: boolean;
  mobileMenuStorageKey?: string;
  className?: string;
  LinkComponent?: React.ComponentType<any>;
  usePathname?: () => string;
}

// Website Navigation Configuration
export const websiteNavLinks: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Solutions' },
  { href: '/documentation', label: 'Documentation' },
  { href: '/about', label: 'About Us' },
  { href: '/help', label: 'Help' },
];

export const websiteHubButton: NavigationActionButton = {
  href: 'https://hub.cybere.co',
  label: 'Hub',
  external: true,
};

export const websiteNavConfig: Partial<NavigationProps> = {
  links: websiteNavLinks,
  showConfig: true,
  mobileMenuStorageKey: 'cybereco-website-menu-state',
};

// Hub Navigation Configuration
export const hubNavLinks: NavigationLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/apps', label: 'Apps' },
  { href: '/profile', label: 'Profile' },
  { href: '/settings', label: 'Settings' },
];

export const hubNavConfig: Partial<NavigationProps> = {
  links: hubNavLinks,
  showConfig: true,
  mobileMenuStorageKey: 'cybereco-hub-menu-state',
};

// JustSplit Navigation Configuration
export const justSplitNavLinks: NavigationLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/groups', label: 'Groups' },
  { href: '/events', label: 'Events' },
  { href: '/expenses', label: 'Expenses' },
  { href: '/settlements', label: 'Settlements' },
  { href: '/friends', label: 'Friends' },
];

export const justSplitNavConfig: Partial<NavigationProps> = {
  links: justSplitNavLinks,
  showConfig: true,
  mobileMenuStorageKey: 'cybereco-justsplit-menu-state',
};

// App Configuration Interface
export interface AppConfig {
  name: string;
  navigation: Partial<NavigationProps>;
  theme?: {
    primaryColor?: string;
    accentColor?: string;
  };
  features?: {
    auth?: boolean;
    notifications?: boolean;
    search?: boolean;
  };
}