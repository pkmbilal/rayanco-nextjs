import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

// R2 media bucket (custom domain). Listing photos are served from here via next/image.
const mediaUrl = new URL(process.env.NEXT_PUBLIC_MEDIA_URL || "https://media.rayanco.com");

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: mediaUrl.protocol.replace(":", "") as "http" | "https",
        hostname: mediaUrl.hostname,
        pathname: "/**",
      },
    ],
  },
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old static-site URLs (CLAUDE.md §4). permanent → 308, which Google treats like a 301.
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/admin/:path*", headers: noindex },
      { source: "/admin", headers: noindex },
      { source: "/api/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
