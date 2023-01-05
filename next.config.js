/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
      {
        protocol: 'https',
        hostname: 'assets.story.xyz',
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/nip/:path*',
        destination: 'https://nip.ogn-review.net/v1/:path*',
      },
    ]
  }
}

module.exports = nextConfig
