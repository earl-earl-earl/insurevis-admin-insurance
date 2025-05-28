import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: ['recharts', 'lucide-react']
  }
};

export default nextConfig;
