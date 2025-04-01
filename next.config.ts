import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_SERV}/api/:path*`,
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //         {
  //           key: "Strict-Transport-Security",
  //           value: "max-age=63072000; includeSubDomains; preload",
  //         },
  //         {
  //           key: "Permissions-Policy",
  //           value: "geolocation=(), camera=(), microphone=(), payment=(), usb=()",
  //         },
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin",
  //         },
  //         {
  //           key: "Cross-Origin-Embedder-Policy",
  //           value: "require-corp",
  //         },
  //         // CSP możesz odkomentować po przetestowaniu
  //         // {
  //         //   key: "Content-Security-Policy",
  //         //   value: `default-src 'self'; 
  //         //           script-src 'self' 'unsafe-inline' ${process.env.NEXT_PUBLIC_API_SERV ? process.env.NEXT_PUBLIC_API_SERV : ''}; 
  //         //           style-src 'self' 'unsafe-inline'; 
  //         //           img-src 'self' data:; 
  //         //           connect-src 'self' ${process.env.NEXT_PUBLIC_API_SERV ? process.env.NEXT_PUBLIC_API_SERV : ''}; 
  //         //           frame-ancestors 'none';`,
  //         // },
  //       ],
  //     },
  //   ];
  // },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_SERV,
  },
  serverRuntimeConfig: {
    // Tutaj możesz dodać poufne konfiguracje dostępne tylko po stronie serwera
  },
  // Dodatkowe ustawienia dla optymalizacji
  compress: true,
  productionBrowserSourceMaps: false, // Wyłącz w produkcji dla lepszej wydajności
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;