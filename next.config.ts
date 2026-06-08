// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // allow all external image hosts
      },
    ],
  },
}

export default nextConfig