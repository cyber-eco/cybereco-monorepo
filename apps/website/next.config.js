/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // GitHub Pages deployment - use absolute path for assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
};

module.exports = nextConfig;