const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/resume-generator',
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_PATH,
        basePath: false,
      },
      {
        source: '/resume-generator-board/:path*',
        destination: process.env.BOARD_PATH,
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
