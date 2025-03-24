/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: 'placeholder',
    JWT_SECRET: 'test_jwt_secret',
    STRIPE_PUBLIC_KEY: 'placeholder',
    STRIPE_SECRET_KEY: 'placeholder',
    PAYPAL_CLIENT_ID: 'placeholder',
    FLIGHT_API_KEY: 'placeholder',
    HOTEL_API_KEY: 'placeholder',
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig 