
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avtonomiya.tatar',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'realnoevremya.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rinfom.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'efspb.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tripster.ru',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;


    
