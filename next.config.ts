import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
          pathname: "/uploads/**", // optional but recommended
      },
    ],
  },
 
};

export default nextConfig;
