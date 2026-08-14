/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/o/:slug", destination: "/overview/:slug", permanent: true },
      { source: "/gu/:slug", destination: "/guide/:slug", permanent: true },
      { source: "/g/:slug", destination: "/generate/:slug", permanent: true },
      { source: "/r/:slug", destination: "/research/:slug", permanent: true },
      { source: "/re/:slug", destination: "/refine/:slug", permanent: true },
      { source: "/c/:slug", destination: "/colorize/:slug", permanent: true },
      { source: "/ch/:slug", destination: "/checkup/:slug", permanent: true },
      { source: "/ste/:slug", destination: "/spot-the-error/:slug", permanent: true },
      { source: "/sc/:slug", destination: "/score-calculator/:slug", permanent: true },
      { source: "/n/:slug", destination: "/note/:slug", permanent: true }
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
