import cors from 'cors';

const corsOptions = {
  origin: process.env.API_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.CORS_EXPIRES || '86400'),
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
