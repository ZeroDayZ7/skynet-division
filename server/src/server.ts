// server.ts
import 'dotenv/config';
import app from './app';
import { initializePrisma, disconnectPrisma } from '#ro/config/prisma.config';
import SystemLog from '#ro/common/utils/SystemLog';

async function startServer() {
  try {
    // Inicjalizacja Prismy
    await initializePrisma();

    // Start serwera
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      SystemLog.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    SystemLog.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  SystemLog.info('Shutting down server...');
  try {
    await disconnectPrisma();
    SystemLog.info('Server stopped');
    process.exit(0);
  } catch (error) {
    SystemLog.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  SystemLog.info('Received SIGINT, shutting down...');
  await disconnectPrisma();
  process.exit(0);
});