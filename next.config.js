/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "sofa-site.vercel.app" },
      { protocol: "https", hostname: "thesofahub.co.uk" },
      { protocol: "https", hostname: "www.thesofahub.co.uk" },
    ],
  },
};
module.exports = nextConfig;
