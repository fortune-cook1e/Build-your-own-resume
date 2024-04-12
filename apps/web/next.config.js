/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  basePath: '/resume-generator-web',
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
};

module.exports = nextConfig;
