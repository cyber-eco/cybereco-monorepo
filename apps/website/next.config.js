/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  transpilePackages: [
    '@cybereco/shared-types',
    '@cybereco/firebase-config',
    '@cybereco/ui-components',
    '@cybereco/shared-assets'
  ],
  // GitHub Pages deployment - use absolute path for assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@cybereco/shared-assets': require('path').resolve(__dirname, '../../libs/shared-assets/src'),
    };
    return config;
  },
};

module.exports = nextConfig;