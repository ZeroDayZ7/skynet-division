import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import { Sequelize } from 'sequelize';
import { Express } from 'express';
import sequelize from '#config/db'; // Zakładam, że eksportuje instancję Sequelize
import SystemLog from '#utils/SystemLog';

// Stałe czasu
const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

// Rozszerzony typ sesji z polem userId
declare module 'express-session' {
  interface SessionData {
    userId?: number; // Dodajemy userId jako opcjonalne pole
  }
}

// Typ dla SequelizeStore (connect-session-sequelize nie dostarcza pełnych typów)
interface SequelizeStoreInstance extends session.Store {
  sync(): Promise<void>;
  startExpiringSessions(): void;
}

// Funkcja konfigurująca sesje
export default function sessionManager(app: Express): void {
  const SequelizeStore = connectSessionSequelize(session.Store);

// Inicjalizacja magazynu sesji
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

  // Konfiguracja sesji
  const sessionConfig: session.SessionOptions = {
    name: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Odnawia czas wygaśnięcia przy każdym żądaniu
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXPIRES),
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',  // secure: true tylko w produkcji, jeśli używasz HTTPS
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
      domain: process.env.SESSION_COOKIE_DOMAIN || undefined,
    },
  };

  // Ustawienie trust proxy w środowisku produkcyjnym
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  // Użycie middleware sesji
  app.use(session(sessionConfig));

  // Synchronizacja magazynu sesji z bazą danych
  sessionStore
    .sync()
    .then(() => SystemLog.info('Session store synced successfully'))
    .catch((err: Error) =>
      SystemLog.error('Error syncing session store', {
        error: err.message,
        stack: err.stack,
      })
    );

  // Uruchomienie czyszczenia wygasłych sesji
  sessionStore.startExpiringSessions();
}