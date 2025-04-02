import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import sequelize from '#config/db.js';

export default function sessionManager(app) {
  const SequelizeStore = connectSessionSequelize(session.Store);

  const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 15 * 60 * 1000, // co 15 minut sprawdzaj wygasłe sesje
    expiration: 24 * 60 * 60 * 1000, // sesje wygasają po 24 godzinach
    extendDefaultFields: (defaults, session) => {
      return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId // przykład dodatkowego pola
      };
    }
  });

  // Konfiguracja sesji
  const sessionConfig = {
    name: process.env.SESSION_COOKIE_NAME || 'sessionId', // lepsze zarządzanie ciasteczkami
    secret: process.env.SESSION_KEY || 'fallback_secret_key_123',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: process.env.NODE_ENV === 'production', // ważne jeśli za proxy
    cookie: {
      maxAge: parseInt(process.env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      domain: process.env.SESSION_DOMAIN || undefined // dla domen krzyżowych
    }
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
  }

  app.use(session(sessionConfig));

  // Synchronizacja store z obsługą błędów
  sessionStore.sync()
    .then(() => console.log('Session store synced successfully'))
    .catch(err => console.error('Error syncing session store:', err));

  // Czyszczenie starych sesji przy starcie
  sessionStore.startExpiringSessions();
}