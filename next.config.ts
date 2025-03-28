import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig:{
    apiUrl: process.env.NEXT_PUBLIC_API_SERV,
  },
  serverRuntimeConfig:{
    
  }
};

export default nextConfig;
