export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  trend?: Array<{ date: string; value: number }>;
  icon?: React.ReactNode;
  color?: string;
  format?: 'currency' | 'percentage' | 'number' | 'text';
  loading?: boolean;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'activity';
  size: 'small' | 'medium' | 'large' | 'full';
  data: any;
  loading?: boolean;
  error?: string;
  refreshable?: boolean;
  onRefresh?: () => void;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }>;
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableData {
  columns: TableColumn[];
  rows: Record<string, any>[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export interface DashboardConfig {
  layout: 'grid' | 'masonry' | 'flex';
  columns: number;
  gap: number;
  responsive?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export interface AppDashboardData {
  appId: string;
  appName: string;
  metrics: DashboardMetric[];
  widgets: DashboardWidget[];
  lastUpdated: string;
  status: 'active' | 'inactive' | 'error';
}