import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

// Stałe czasu
const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

export default function sessionManagerPrisma(app: Express): void {
  const prisma = new PrismaClient();

  // Konfiguracja Prisma Session Store
  const sessionStore = new PrismaSessionStore(prisma, {
    checkPeriod: 5 * TIME.MINUTE, // Sprawdzaj wygasłe sesje co 5 minut
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  });

  // Konfiguracja sesji (zachowujemy te same ustawienia)
  const sessionConfig: session.SessionOptions = {
    name: process.env.SESSION_COOKIE_NAME || 'sessionId',
    secret: process.env.SESSION_SECRET_KEY || 'default-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXPIRES || '900000', 10),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    },
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionConfig));

  // Prisma nie wymaga ręcznej synchronizacji jak Sequelize
  SystemLog.info('Prisma session store initialized');
}