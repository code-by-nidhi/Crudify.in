import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF where the browser accepts it, WebP otherwise. The source files in
    // public/ are already WebP, so even the fallback never serves a JPEG.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tailwind's output is small, so inlining it in <head> removes the
    // render-blocking stylesheet requests for first-time visitors.
    inlineCss: true,
  },
};

export default nextConfig;
