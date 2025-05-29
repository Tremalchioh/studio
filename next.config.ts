
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
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'papik.pro',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // New domain for the 9th lesson image
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'glazovlib.ru', // New domain for Sabantuy article image
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tatarica.org', 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'histrf.ru', // New domain for "Происхождение татарского народа" article image
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
