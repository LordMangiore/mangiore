/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static by construction. The site is its own proof of the service:
  // no server runtime, nothing to fall over, fast everywhere.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
