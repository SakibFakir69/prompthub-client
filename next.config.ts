// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "example.com" },        // whatever this placeholder domain actually is
      { protocol: "https", hostname: "res.cloudinary.com" },  // your real Cloudinary avatars
    ],
  },
};

module.exports = nextConfig;