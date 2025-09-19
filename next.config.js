/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    // Disable image optimization in development
    unoptimized: true,
    // Allow all image domains in development
    domains: ['*'],
    // Disable image optimization API route in development
    ...(process.env.NODE_ENV === 'development' ? {
      loader: 'custom',
      loaderFile: './imageLoader.js',
    } : {}),
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

// Create a custom image loader for development
const fs = require('fs');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  fs.writeFileSync(
    path.join(__dirname, 'imageLoader.js'),
    `module.exports = function imageLoader({ src, width, quality }) {
      return '${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}' + src;
    }`
  );
}

module.exports = nextConfig;
