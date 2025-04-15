import 'dotenv/config';
import app from './app';
import { initializePrisma, disconnectPrisma } from '#ro/config/prisma.config';
import { initializeSequelize, disconnectSequelize } from '#ro/config/sequelize.config';
import SystemLog from '#ro/common/utils/SystemLog';

async function startServer() {
  try {
    // Inicjalizacja Prisma i Sequelize
    await initializePrisma();
    await initializeSequelize();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      SystemLog.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    SystemLog.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown() {
  SystemLog.info('Shutting down server...');
  try {
    await disconnectPrisma();
    await disconnectSequelize();
    SystemLog.info('Server stopped');
    process.exit(0);
  } catch (error) {
    SystemLog.error('Error during shutdown:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();