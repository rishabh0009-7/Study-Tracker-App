import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint and TypeScript errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
  },

  // Enable compression
  compress: true,

  // Optimize bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
