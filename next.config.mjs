import nextPwa from "next-pwa";
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

const withPWA = nextPwa({
  dest: "public",
  register: true,
});

const config = withPWA({
  ...nextConfig,
});

export default config;
