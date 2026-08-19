/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 2000,
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 500, 768, 900, 1024, 1366, 1640, 1920, 2560],
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "127.0.0.1" },
      { hostname: "nyc3.digitaloceanspaces.com" },
      { hostname: "lepine-storage.nyc3.digitaloceanspaces.com" },
      { hostname: "lepine.finelineperspectives.dev" },
      { hostname: "lepineapartments.finelineperspectives.dev" },
      { hostname: "www.solutioneers.dev" },
      { hostname: "solutioneers.dev" },
      { hostname: "lepineapartments.com" },
      { hostname: "lepinepreview.solutioneers.dev" },
      { hostname: "walrus-app-59jan.ondigitalocean.app" },
      { hostname: "lepineapartments.rhenti.com" },
      { hostname: "finelinevirtualtours.com" },
      { hostname: "scontent.cdninstagram.com" },
      { hostname: "scontent-lga3-2.cdninstagram.com" },
      { hostname: "scontent-lga3-1.cdninstagram.com" },
      { hostname: "scontent-yyz1-1.cdninstagram.com" },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
