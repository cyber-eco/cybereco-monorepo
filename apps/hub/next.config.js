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
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@cybereco/auth': require('path').resolve(__dirname, '../../libs/auth/src'),
      '@cybereco/shared-types': require('path').resolve(__dirname, '../../libs/shared-types/src'),
      '@cybereco/firebase-config': require('path').resolve(__dirname, '../../libs/firebase-config/src'),
      '@cybereco/ui-components': require('path').resolve(__dirname, '../../libs/ui-components/src'),
      '@cybereco/shared-assets': require('path').resolve(__dirname, '../../libs/shared-assets/src'),
    };
    
    // Ensure TypeScript can resolve the modules
    config.resolve.modules = [
      ...config.resolve.modules,
      require('path').resolve(__dirname, '../../node_modules'),
      require('path').resolve(__dirname, 'node_modules'),
    ];
    
    return config;
  },
}

module.exports = nextConfig