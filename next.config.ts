import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@tailwindcss/forms', '@tailwindcss/typography'],
  },
  
  // Configure webpack for better Windows compatibility and pdfjs-dist browser build
  webpack: (config, { isServer }) => {
    // Ensure we use the browser-compatible build of pdfjs-dist
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pdfjs-dist$': 'pdfjs-dist/legacy/build/pdf',
      'pdfjs-dist/legacy/build/pdf$': 'pdfjs-dist/legacy/build/pdf',
    };
    
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Essential Node.js modules that pdfjs-dist might try to import
        canvas: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
        // Additional modules that might cause issues
        net: false,
        tls: false,
        url: false,
        querystring: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        constants: false,
        events: false,
        punycode: false,
        string_decoder: false,
        sys: false,
        timers: false,
        tty: false,
        vm: false,
        _stream_duplex: false,
        _stream_passthrough: false,
        _stream_readable: false,
        _stream_transform: false,
        _stream_writable: false,
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
