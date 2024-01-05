/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname:
          process.env.NODE_ENV === "production" ? "hostName" : "localhost",
        port: process.env.NODE_ENV === "production" ? "443" : "4000",
        pathname: "/uploads/*",
      },
    ],
  },
};

module.exports = nextConfig;
