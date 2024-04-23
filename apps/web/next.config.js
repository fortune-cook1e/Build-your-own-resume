/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/resume-generator',
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/resume-generator-api/:path*',
        basePath: false,
      },
      {
        source: '/resume-generator-board/:path*',
        destination: 'http://localhost:5173/resume-generator-board/:path*',
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
