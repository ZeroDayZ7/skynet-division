import { Sequelize } from 'sequelize';
import SystemLog from '#ro/common/utils/SystemLog';

declare global {
  var sequelize: Sequelize | undefined;
}

// Tworzenie instancji Sequelize
const sequelize =
  global.sequelize ||
  new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'crimscity',
    logging: false,
    // logging: process.env.NODE_ENV === 'development' ? (msg) => SystemLog.info(msg) : false,
  });

// Zachowaj instancję globalnie w środowisku deweloperskim
if (process.env.NODE_ENV !== 'production') {
  global.sequelize = sequelize;
}

// Testowanie połączenia
export async function initializeSequelize() {
  try {
    await sequelize.authenticate();
    SystemLog.info('Sequelize connected to MySQL database...');
  } catch (error) {
    SystemLog.error('Sequelize connection failed:', error);
    throw error;
  }
}

// Rozłączenie (dla graceful shutdown)
export async function disconnectSequelize() {
  try {
    await sequelize.close();
    SystemLog.info('Sequelize disconnected from database');
  } catch (error) {
    SystemLog.error('Sequelize disconnection failed:', error);
    throw error;
  }
}

export default sequelize;