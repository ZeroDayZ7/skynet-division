import { Sequelize } from 'sequelize';
import SystemLog from '#ro/common/utils/SystemLog';
import { env } from './env/env';

declare global {
  var sequelize: Sequelize | undefined;
}

// Tworzenie instancji Sequelize
const sequelize =
  global.sequelize ||
  new Sequelize({
    dialect: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    logging: false,
    // logging: (msg) => SystemLog.info(msg),
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
    // await sequelize.sync({ alter: false }); // lub false
    // console.log('Models synced');
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