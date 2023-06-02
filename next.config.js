/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["sygescol.uniminuto.sistemasivhorsnet.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
