/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adu23ievdvvmzyds72amfc27mq0fvsxh.lambda-url.ap-southeast-2.on.aws",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For your background image
      },
      {
        protocol: "https",
        hostname: "**", // (Optional) allow all HTTPS domains
      },
    ],
  },
};

module.exports = nextConfig;
