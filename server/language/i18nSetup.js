// middleware.js

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'pl',
  objectNotation: true,
  register: global,
});

function setLocale(req, res, next) {
  const preferredLanguage = req.headers['accept-language'].split(',')[0];
  if (preferredLanguage) {
    const supportedLanguages = ['pl', 'en'];
    const locale = supportedLanguages.find(lang => preferredLanguage.includes(lang));
    if (locale) {
      i18n.setLocale(locale);
    }
  }
  console.log(`= 7 => next(i18n)`);
  next();
}

module.exports = { i18n, setLocale };
