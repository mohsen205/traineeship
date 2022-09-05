/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com', 'eu.ui-avatars.com', "drive.google.com"]
  },
}

module.exports = nextConfig
