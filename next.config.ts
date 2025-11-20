import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "imgs.search.brave.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "lorenza.mx" },
    ],
  },
};

export default nextConfig;
