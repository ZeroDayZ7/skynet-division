import cors from 'cors';
import { env } from '#ro/config/env/env';

const corsOptions = {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.CORS_EXPIRES || '86400'),
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
