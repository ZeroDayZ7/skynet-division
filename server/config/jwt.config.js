import dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'default_strong_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  issuer: process.env.JWT_ISSUER || 'your-app-name',
  encryptionKey: process.env.ENCRYPTION_KEY || '01234567890123456789012345678901',
  cookieName: process.env.ACCESS_COOKIE_NAME || 'at'
};