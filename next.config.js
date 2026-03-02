/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 2000,
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 500, 768, 900, 1024, 1366, 1640, 1920, 2560],
    domains: [
      "localhost",
      "127.0.0.1",
      "nyc3.digitaloceanspaces.com",
      "lepine-storage.nyc3.digitaloceanspaces.com",
      "lepine.finelineperspectives.dev",
      "https://lepine.finelineperspectives.dev/",
      "lepineapartments.finelineperspectives.dev",
      "www.solutioneers.dev",
      "solutioneers.dev",
      "lepineapartments.com",
      "lepinepreview.solutioneers.dev",
      "walrus-app-59jan.ondigitalocean.app",
      "lepineapartments.rhenti.com",
      "finelinevirtualtours.com",
      "scontent.cdninstagram.com",
      "scontent-lga3-2.cdninstagram.com",
      "scontent-lga3-1.cdninstagram.com",
      "scontent-yyz1-1.cdninstagram.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
