// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //  (https://via.placeholder.com/
      { protocol: "https", hostname: "example.com" },        // whatever this placeholder domain actually is
      { protocol: "https", hostname: "res.cloudinary.com" },  // your real Cloudinary avatars
      { protocol: "https", hostname: "via.placeholder.com" },
    
    ],
  },
};

module.exports = nextConfig;