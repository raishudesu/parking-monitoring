import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fcm.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "senkeortgypgwmdhdnoj.supabase.co",
      },
    ],
  },
};

// const withPWA = withPWAInit({
// dest: "public",
// register: true,
// disable: process.env.NODE_ENV === "development", // Optional: disable during development
// buildExcludes: [/app-build-manifest\.json$/], // Recommended for Next.js 13+
// });

// const config = withPWA(nextConfig);

export default nextConfig;
// export default nextCon/fig;
