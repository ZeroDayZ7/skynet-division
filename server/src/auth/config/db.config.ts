import SystemLog from '#ro/utils/SystemLog';
import 'dotenv/config'; // Import konfiguracji z pliku .env
import { Sequelize } from 'sequelize'; // Import Sequelize

// Tworzenie instancji Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // Typ bazy danych
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'crimscity',
  logging: false, // Wyłącz logowanie SQL (opcjonalne, możesz ustawić na true dla debugowania)
});

// Testowanie połączenia
sequelize.authenticate()
  .then(() => {
    SystemLog.info(`MySQL Connected via Sequelize...`);
  })
  .catch((err) => {
    SystemLog.error(`Błąd połączenia z MySQL:`);
    
    throw err;
  });

export default sequelize; // Eksport instancji Sequelize