/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/pages/destination',
        destination: '/destination',
      },
    ];
  },
};

export default nextConfig;
