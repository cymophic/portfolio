import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["github.com"],
  },
};

export default nextConfig;