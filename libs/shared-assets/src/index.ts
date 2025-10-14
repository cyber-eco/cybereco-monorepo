// Asset paths for components that need string paths
export const BRAND_ASSETS = {
  logoRectangle: '/assets/brand/logo-rectangle.svg',
  logoIcon: '/assets/brand/logo-ico.svg',
  logo: '/assets/brand/logo.svg',
  logoRectanglePng: '/assets/brand/logo-rectangle.png',
  logoPng: '/assets/brand/logo.png',
} as const;

export type BrandAssetKey = keyof typeof BRAND_ASSETS;

// Re-export asset paths for easy access
export const getLogoPath = (variant: 'default' | 'horizontal' | 'icon') => {
  switch (variant) {
    case 'horizontal':
      return BRAND_ASSETS.logoRectangle;
    case 'icon':
      return BRAND_ASSETS.logoIcon;
    default:
      return BRAND_ASSETS.logoRectangle;
  }
};