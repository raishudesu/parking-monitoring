import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
});

const config = withPWA({
  ...nextConfig,
});

export default config;
