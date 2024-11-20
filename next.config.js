module.exports = {
  i18n: {
    locales: ['en', 'ar', 'de', 'es', 'fa', 'nl', 'ru', 'tr', 'zh', 'fr'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    domains: [''], // Add your Strapi server hostname here
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { 
        fs: false,
        path: require.resolve('path-browserify') // Ensure path fallback is configured
      };
    }
    return config;
  },
};
