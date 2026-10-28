import type { NextConfig } from "next";

// Static export: the build output (out/) is uploaded to Hostinger public_html.
// No Node.js server is needed on shared hosting.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
