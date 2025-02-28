module.exports = {
  i18n: {
    locales: ['en', 'ar', 'de', 'es', 'fa', 'nl', 'ru', 'tr', 'zh', 'fr'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    domains: [''], 
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { 
        fs: false,
        path: require.resolve('path-browserify') 
      };
    }
    return config;
  },
};
