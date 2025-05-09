import { cleanEnv, str, num } from 'envalid';
import { SESSION_DEFAULTS } from '../constants';

export const env = cleanEnv(process.env, {
  // DATABASE
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: num({ default: 3306 }),
  DB_DATABASE: str({ default: 'crimscity' }),
  DB_USERNAME: str({ default: 'root' }),
  DB_PASSWORD: str({ default: 'root' }),

  // SERVER
  PORT: num({ default: 3001 }),

  // URL
  API_URL: str({ default: 'http://localhost:3000' }),

  // BCRYPT
  BCRYPT_SALT_ROUNDS: num({ default: 10 }),

  // JWT
  JWT_COOKIE_NAME: str({ default: 'ACCESS_KEY' }),
  JWT_SECRET: str({ default: '0b01410f14d7b92be698e30bf2156b0f3a0986c7a5cb67f11dcac23f2f8b0008' }),
  JWT_EXPIRES_IN: num({ default: 90000000 }), // 15 minut = 900000 ms
  JWT_ISSUER: str({ default: 'your-app-name' }),

  // SESSION
  SESSION_COOKIE_NAME: str({ default: 'SESSION_KEY' }),
  SESSION_SECRET_KEY: str({ default: 'ABC' }),
  SESSION_EXPIRES: num({ default: 90000000 }),
  SESSION_COOKIE_DOMAIN: str({ default: 'your-app-name' }),

  // CSRF
  CSRF_COOKIE_NAME: str({ default: 'csrf' }),

  // CORS
  CORS_EXPIRES: num({ default: 3600 }),

  // PHOTO UPLOAD DIR
  PHOTO_UPLOAD_DIR: str({ default: 'private_uploads/users' }),

  // Encryption Config
  ENCRYPTION_KEY: str({ default: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' }),
  ENCRYPTION_ALGORITHM: str({ default: 'aes-256-gcm' }),
  IV_LENGTH: num({ default: 12 }),
  TAG_LENGTH: num({ default: 16 }),

  // NODE_ENV
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),

  // REDIS
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: 'redis_password' }),
});
