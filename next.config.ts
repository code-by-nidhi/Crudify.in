import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF where the browser accepts it, WebP otherwise. The source files in
    // public/ are already WebP, so even the fallback never serves a JPEG.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
