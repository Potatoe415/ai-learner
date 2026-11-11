/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old routes from before the Trailhead model (decision 0006).
  async redirects() {
    return [
      { source: "/level/:n", destination: "/module/:n", permanent: true },
      { source: "/trophies", destination: "/profile", permanent: true },
    ];
  },
};
export default nextConfig;
