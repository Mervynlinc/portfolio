/** @type {import('next').NextConfig} */
const projectRoot = process.cwd();

const nextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
};

export default nextConfig;
