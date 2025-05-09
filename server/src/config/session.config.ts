// src/config/session.config.ts
import session from 'express-session';
import { Express } from 'express';
import { createSessionStore } from './session-store';
import { env } from './env/env';
import SystemLog from '#ro/common/utils/SystemLog';

export default function sessionManager(app: Express): void {
  const sessionConfig: session.SessionOptions = {
    name: env.SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET_KEY,
    store: createSessionStore(),
    resave: false,
    saveUninitialized: false,
    rolling: false,
    proxy: env.NODE_ENV === 'production',
    cookie: {
      maxAge: env.SESSION_EXPIRES,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'lax' : 'lax',
    },
  };

  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionConfig));

  SystemLog.info('Session configured successfully');
}

