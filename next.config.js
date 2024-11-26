/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/algoplay/',
  basePath: '/algoplay',
}

module.exports = nextConfig 