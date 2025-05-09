// src/middleware/session.middleware.ts

import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import { Express } from 'express';
import { Sequelize } from 'sequelize';
import { sessionConfig, TIME_CONSTANTS } from '#ro/config/constants';
import sequelize from '#ro/config/sequelize.config';
import SystemLog from '#ro/common/utils/SystemLog';

interface SequelizeStoreInstance extends session.Store {
  sync(): Promise<void>;
  startExpiringSessions(): void;
}

export default function sessionManager(app: Express): void {
  const SequelizeStore = connectSessionSequelize(session.Store);

  const sessionStore = new SequelizeStore({
    db: sequelize as Sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 5 * TIME_CONSTANTS.MINUTE,
    expiration: 15 * TIME_CONSTANTS.MINUTE,
    extendDefaultFields: (defaults, session) => {
      return {
        data: defaults.data,
        expires: new Date(Date.now() + 15 * TIME_CONSTANTS.MINUTE),
        userId: session.userId,
      };
    },
  }) as unknown as SequelizeStoreInstance;

  // Ustawienie store w konfiguracji sesji
  sessionConfig.store = sessionStore;

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionConfig));

  sessionStore
    .sync()
    .then(() => SystemLog.info('Session store synced successfully'))
    .catch((err: Error) =>
      SystemLog.error('Error syncing session store', {
        error: err.message,
        stack: err.stack,
      })
    );

  sessionStore.startExpiringSessions();
}
