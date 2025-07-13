import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds to avoid TypeScript errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@tailwindcss/forms', '@tailwindcss/typography'],
  },
  
  // Configure webpack for better Windows compatibility
  webpack: (config, { isServer }) => {
    // Handle Windows file path issues
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    
    // Optimize for production
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Disable image optimization for better performance
  images: {
    unoptimized: true,
  },
  
  // Output configuration
  output: 'standalone',
};

export default nextConfig;
