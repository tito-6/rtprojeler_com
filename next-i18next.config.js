// next-i18next.config.js
const path = require('path');

const isBrowser = typeof window !== 'undefined';

module.exports = {
  i18n: {
    locales: ['en', 'ar', 'de', 'es', 'fa', 'nl', 'ru', 'tr', 'zh', 'fr'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  // Only include the backend configuration on the client side
  ...(isBrowser && {
    backend: require('i18next-http-backend'),
  }),
};
