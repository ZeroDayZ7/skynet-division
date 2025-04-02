import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'pl',
  objectNotation: true,
  register: global,
});

export const setLocale = (req, res, next) => {
  const langHeader = req.headers['accept-language'];
  
  if (!langHeader) { // Jeśli brak nagłówka, ustaw domyślny język
    i18n.setLocale('pl');
    return next();
  }

  const preferredLanguage = langHeader.split(',')[0];
  if (preferredLanguage) {
    const supportedLanguages = ['pl', 'en'];
    const locale = supportedLanguages.find((lang) => preferredLanguage.includes(lang));
    if (locale) {
      i18n.setLocale(locale);
    } else {
      i18n.setLocale('pl'); // Domyślny język, jeśli preferowany nie jest obsługiwany
    }
  }
  console.log(`= 8 => next(i18n)`);
  next();
};

export { i18n }; // Eksport nazwanego i18n
export default { i18n, setLocale }; // Domyślny eksport dla kompatybilności