import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import { Sequelize } from 'sequelize';
import { Express } from 'express';
import sequelize from '#ro/config/sequelize.config'; // Zakładam, że eksportuje instancję Sequelize
import SystemLog from '#ro/common/utils/SystemLog';

// Stałe czasu
const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

// Typ dla SequelizeStore
interface SequelizeStoreInstance extends session.Store {
  sync(): Promise<void>;
  startExpiringSessions(): void;
}

export default function sessionManager(app: Express): void {
  const SequelizeStore = connectSessionSequelize(session.Store);

  const sessionStore = new SequelizeStore({
    db: sequelize as Sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 5 * TIME.MINUTE,
    expiration: 15 * TIME.MINUTE,
    extendDefaultFields: (defaults, session) => {
      return {
        data: defaults.data,
        expires: new Date(Date.now() + 15 * TIME.MINUTE),
        userId: session.userId,
      };
    },
  }) as unknown as SequelizeStoreInstance;

  // Konfiguracja sesji z domyślnymi wartościami
  const sessionConfig: session.SessionOptions = {
    name: process.env.SESSION_COOKIE_NAME || 'sessionId',
    secret: process.env.SESSION_SECRET_KEY || 'default-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Sesja będzie odnawiana przy każdym żądaniu
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXPIRES || '900000', 10), // Domyślnie 15 minut
      httpOnly: true, // Zabezpieczenie przed dostępem z JS
      secure: process.env.NODE_ENV === 'production', // Tylko HTTPS w produkcji
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict', // 'none' wymaga secure
      // domain: process.env.SESSION_COOKIE_DOMAIN || undefined,
      // path: '/', // Domyślna ścieżka
    },
  };

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