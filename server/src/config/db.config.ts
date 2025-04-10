import 'dotenv/config'; // Import konfiguracji z pliku .env
import { Sequelize } from 'sequelize'; // Import Sequelize

// Tworzenie instancji Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // Typ bazy danych
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false, // Wyłącz logowanie SQL (opcjonalne, możesz ustawić na true dla debugowania)
});

// Testowanie połączenia
sequelize.authenticate()
  .then(() => {
    console.log('MySQL Connected via Sequelize...');
  })
  .catch((err) => {
    console.error('Błąd połączenia z MySQL:', err);
    throw err;
  });

export default sequelize; // Eksport instancji Sequelize

// timezone: 'Europe/Warsaw', // Ustawienie strefy czasowej na Warszawę.
// pool: {
//   max: 5, // Maksymalna liczba połączeń w puli.
//   min: 0, // Minimalna liczba połączeń w puli.
//   acquire: 30000, // Maksymalny czas w ms, przez jaki aplikacja będzie czekała na połączenie z pulą.
//   idle: 10000, // Maksymalny czas w ms, po którym nieużywane połączenie w puli zostanie zwolnione.
// }
// retry: {
//   max: 3, // Liczba prób ponowienia zapytania w przypadku błędu.
// }
// define: {
//   timestamps: true, // Automatyczne dodawanie pól `createdAt` i `updatedAt` do modeli.
//   paranoid: true, // Aktywowanie tzw. "miękkiego usuwania" (rekordy są oznaczane jako usunięte, ale nie są fizycznie usuwane).
// }
// sequelize.sync({ force: true }); // Usuwa wszystkie tabele i tworzy je na nowo.
