/* eslint-disable node/prefer-global/process */
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: process.env.analyze === 'true',
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['***'],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
