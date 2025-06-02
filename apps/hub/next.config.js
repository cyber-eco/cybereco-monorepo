/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@cybereco/auth',
    '@cybereco/shared-types',
    '@cybereco/firebase-config',
    '@cybereco/ui-components',
    '@cybereco/shared-assets'
  ],
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@cybereco/auth': require('path').resolve(__dirname, '../../libs/auth/src'),
      '@cybereco/shared-assets': require('path').resolve(__dirname, '../../libs/shared-assets/src'),
    };
    return config;
  },
}

module.exports = nextConfig