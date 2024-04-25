const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/resume-generator',
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      {
        source: '/resume-generator-api/:path*',
        destination: isDev
          ? 'http://localhost:3000/resume-generator-api/:path*'
          : 'https://fortunecookie.top/resume-generator-api/:path*',
        basePath: false,
      },
      {
        source: '/resume-generator-board/:path*',
        destination: isDev
          ? 'http://localhost:5173/resume-generator-board/:path*'
          : 'https://fortunecookie.top/resume-generator-board/:path*',
        basePath: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cdn.fortunecookie.top',
      },
    ],
  },
};

module.exports = nextConfig;
