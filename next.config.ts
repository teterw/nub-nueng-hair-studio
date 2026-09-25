import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits plain files into `out/`.
  // No server runtime, no API routes, no image optimization service.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Pin the workspace root. A stray package-lock.json further up the tree
  // otherwise makes Turbopack guess the home directory.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
