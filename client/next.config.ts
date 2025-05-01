import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental:{
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_SERV || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login123',
  //       permanent: true,
  //     },
  //   ];
  // },
  async headers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_SERV || 'http://localhost:3001';
    return [
      // 1. Statyczne zasoby Next.js - agresywny cache
      // 1. Statyczne zasoby Next.js - agresywny cache
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private',
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" // Dla dev z Turbopack
                : "script-src 'self' 'unsafe-inline'", // W prod usuń 'unsafe-eval'
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              `connect-src 'self' ${apiUrl}`, // Kluczowe: zezwala na backend
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_SERV || 'http://localhost:3001',
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
