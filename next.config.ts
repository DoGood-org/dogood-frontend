import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  transpilePackages: ['leaflet', 'react-leaflet'],
  experimental: {
    esmExternals: 'loose', // This helps with some module resolution issues
  },
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
