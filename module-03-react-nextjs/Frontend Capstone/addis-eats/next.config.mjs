/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    // This forces Turbopack to use your local project directory as the root
    root: '.', 
  },
};

export default nextConfig;
