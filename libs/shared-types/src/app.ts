export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  proxyPath?: string; // Optional path for Hub proxy routing
  category: 'finance' | 'productivity' | 'social' | 'utility' | 'info';
  status: 'active' | 'beta' | 'maintenance' | 'deprecated';
  requiresAuth: boolean;
  minRole?: 'user' | 'admin';
  features: string[];
  createdAt: string;
  updatedAt: string;
}