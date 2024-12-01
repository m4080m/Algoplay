import type { NextConfig } from "next";

const assetPrefix =
  process.env.NODE_ENV === 'production' ? 'https://m4080m.github.io/Algoplay/' : '';
const basePathPrefix =
  process.env.NODE_ENV === 'production' ? '/Algoplay' : '';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePathPrefix,
};

export default nextConfig;
