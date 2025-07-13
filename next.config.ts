import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@tailwindcss/forms', '@tailwindcss/typography'],
  },
  
  // Configure webpack for better Windows compatibility and pdfjs-dist browser build
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pdfjs-dist$': 'pdfjs-dist/build/pdf',
      'pdfjs-dist/legacy/build/pdf$': 'pdfjs-dist/build/pdf',
    };
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false, // Disable canvas for browser environment
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
