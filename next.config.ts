import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return[{
      source: "/",
      destination: "/login",
      permanent: true,
    }]
  },
  /* config options here */
  publicRuntimeConfig:{
    apiUrl: process.env.NEXT_PUBLIC_API_SERV,
  },
  serverRuntimeConfig:{
    
  }
};

export default nextConfig;
