import { SessionOptions } from 'express-session';

const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

export const sessionConfig: SessionOptions = {
  name: process.env.SESSION_COOKIE_NAME || 'sessionId',
  secret: process.env.SESSION_SECRET_KEY || 'default-secret-key',
  store: undefined, // Będzie ustawione później
  resave: false,
  saveUninitialized: false,
  rolling: false, // Sesja będzie odnawiana przy każdym żądaniu
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    maxAge: parseInt(process.env.SESSION_EXPIRES || '900000', 10), // Domyślnie 15 minut
    httpOnly: true, // Zabezpieczenie przed dostępem z JS
    secure: process.env.NODE_ENV === 'production', // Tylko HTTPS w produkcji
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax', // 'none' wymaga secure
  },
};

// Stałe czasu
export const TIME_CONSTANTS = TIME;