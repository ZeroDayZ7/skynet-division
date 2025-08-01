import 'dotenv/config';
import { Server } from 'http';
import app from './app';
import { env } from './config/env/env';
import SystemLog from './common/utils/SystemLog';
import { initializeSequelize, disconnectSequelize } from './config/sequelize.config';
import { markShuttingDown } from './utils/health';

let server: Server | null = null;
const SHUTDOWN_TIMEOUT = 30_000;

async function startServer(): Promise<void> {
  try {
    SystemLog.info('🚀 Starting application...');
    SystemLog.info(`Environment: ${env.NODE_ENV}`);
    SystemLog.info(`PID: ${process.pid}`);

    await initializeSequelize();

    server = app.listen(env.PORT, () => {
      SystemLog.info(`✅ Server running on port ${env.PORT}`);
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        SystemLog.error(`❌ Port ${env.PORT} is already in use`);
      } else {
        SystemLog.error('❌ Server error:', err);
      }
      process.exit(1);
    });

    server.on('clientError', (error, socket) => {
      SystemLog.warn(`⚠️ Client error: ${error.message}`);
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
  } catch (error) {
    SystemLog.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Graceful shutdown handler
 */
async function shutdown(signal?: string) {
  markShuttingDown?.();
  SystemLog.info(`🛑 Received ${signal || 'shutdown'}, shutting down gracefully...`);

  const timer = setTimeout(() => {
    SystemLog.error('⏳ Forced shutdown due to timeout');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  try {
    // 1. Zamknij serwer HTTP
    if (server) {
      await new Promise<void>((resolve, reject) => server!.close((err) => (err ? reject(err) : resolve())));
      SystemLog.info('✅ Server closed');
    }

    // 2. Rozłącz bazę danych
    await disconnectSequelize();

    clearTimeout(timer);
    process.exit(0);
  } catch (err) {
    SystemLog.error('❌ Error during shutdown:', err);
    clearTimeout(timer);
    process.exit(1);
  }
}

/**
 * Global error handlers
 */
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (err) => {
  SystemLog.error('💥 Uncaught Exception:', err);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
  SystemLog.error('💥 Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

await startServer();
