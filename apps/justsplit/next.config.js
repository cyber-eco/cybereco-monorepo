/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    '@cybereco/shared-types',
    '@cybereco/firebase-config',
    '@cybereco/ui-components',
    '@cybereco/shared-assets'
  ],
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
  webpack: (config) => {
    const path = require('path');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@cybereco/shared-types': path.resolve(__dirname, '../../libs/shared-types/src'),
      '@cybereco/firebase-config': path.resolve(__dirname, '../../libs/firebase-config/src'),
      '@cybereco/ui-components': path.resolve(__dirname, '../../libs/ui-components/src'),
      '@cybereco/shared-assets': path.resolve(__dirname, '../../libs/shared-assets/src'),
    };
    return config;
  },
  eslint: {
    // Temporarily disable ESLint during builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
