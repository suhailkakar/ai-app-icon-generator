/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "obj-store.livepeer.cloud" }],
  },
};

export default nextConfig;
