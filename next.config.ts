import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary as an allowed domain
  },
};

export default nextConfig;
