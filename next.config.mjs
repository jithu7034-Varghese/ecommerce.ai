/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/merchant',
        permanent: false,
      },
      {
        source: '/shop',
        destination: '/merchant/products',
        permanent: false,
      },
      {
        source: '/product/:path*',
        destination: '/merchant/products',
        permanent: false,
      },
      {
        source: '/checkout',
        destination: '/merchant/orders',
        permanent: false,
      },
      {
        source: '/checkout/:path*',
        destination: '/merchant/orders',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
