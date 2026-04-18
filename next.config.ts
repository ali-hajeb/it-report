/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['rpt.behums.ac.ir'],
      bodySizeLimit: '10mb'
    },
  },
  assetPrefix: '/itrpt',
};

export default nextConfig;
