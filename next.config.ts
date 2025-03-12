import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ Keeps React in strict mode (recommended)
  images: {
    domains: ["cdn.sanity.io"], // ✅ Allow external images (modify as needed)
  },
};

export default nextConfig;
