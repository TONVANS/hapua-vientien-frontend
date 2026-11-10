import type { NextConfig } from "next";

const internalBackendUrl =
  process.env.INTERNAL_BACKEND_URL || 'http://localhost:3001/api/v1';
const backendBaseUrl = internalBackendUrl.replace(/\/api\/v1\/?$/, '');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vientiane';

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    qualities: [70, 75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // 1. Direct calls without basePath (e.g. /api/v1/..., /api/media/..., /uploads/...)
      {
        source: '/api/v1/:path*',
        destination: `${internalBackendUrl}/:path*`,
        basePath: false,
      },
      {
        source: '/api/media/:path*',
        destination: `${backendBaseUrl}/api/media/:path*`,
        basePath: false,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendBaseUrl}/uploads/:path*`,
        basePath: false,
      },

      // 2. Subpath calls under basePath (e.g. /vientiane/api/v1/..., /vientiane/api/media/...)
      {
        source: '/api/v1/:path*',
        destination: `${internalBackendUrl}/:path*`,
      },
      {
        source: '/api/media/:path*',
        destination: `${backendBaseUrl}/api/media/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendBaseUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
