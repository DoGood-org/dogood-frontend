import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  transpilePackages: [
    'leaflet',
    'react-leaflet',
    'framer-motion',
    'react-scroll',
    'swiper',
  ],
  // experimental: {
  //   esmExternals: 'loose', // This helps with some module resolution issues
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ];
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
