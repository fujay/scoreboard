import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      {
        hostname: "openweathermap.org",
      },
      {
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

export default nextConfig;
