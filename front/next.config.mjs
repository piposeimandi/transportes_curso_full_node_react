/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  agentRules: false,
  experimental: {
    agentFeedback: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
