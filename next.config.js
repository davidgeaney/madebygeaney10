/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.prod.website-files.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Temporary to test if it's an optimization issue
  },
  // Add basePath if your site is hosted in a subdirectory
  // basePath: '/your-base-path',
};

module.exports = nextConfig;
