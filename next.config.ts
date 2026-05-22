import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minskhi.com",
        pathname: "/wp-content/uploads/**"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/our-story", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true }
    ];
  }
};

export default nextConfig;
