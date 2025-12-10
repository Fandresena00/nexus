import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  /* config options here */
};

export default nextConfig;
