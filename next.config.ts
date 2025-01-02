import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  /* config options here */
  images: {
    domains: ["mint-club-v2.s3.us-west-2.amazonaws.com"],
  },
};

export default nextConfig;
