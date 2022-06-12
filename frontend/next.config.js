/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
  },
  images: {
    deviceSizes: [320, 375, 425, 768, 1024, 1200, 1536, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [process.env.IMAGES_DOMAIN],
    path: "/_next/image",
    loader: 'default',
  },
};

module.exports = nextConfig;
