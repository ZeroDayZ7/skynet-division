import { Secret } from "jsonwebtoken";

// JWT configuration interface
export interface JwtConfig {
  secret: string | Buffer;
  expiresIn: string | number;
  issuer: string;
  cookieName: string;
  encryptionKey: string;
  encryptionAlgorithm?: string;
  cookieOptions?: {
    domain?: string;
    path?: string;
    sameSite?: 'strict' | 'lax' | 'none';
    secure?: boolean;
  };
}

// JWT configuration
export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  issuer: process.env.JWT_ISSUER,
  cookieName: process.env.JWT_COOKIE_NAME,
  encryptionKey: process.env.ENCRYPTION_KEY, // 32 bytes, example only
  encryptionAlgorithm: 'aes-256-cbc',
  cookieOptions: {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
};

// Validate JWT configuration
export const validateJwtConfig = (config: JwtConfig): void => {
  if (!config.secret) throw new Error('JWT secret is required');
  if (!config.expiresIn) throw new Error('JWT expiresIn is required');
  if (!config.issuer) throw new Error('JWT issuer is required');
  if (!config.cookieName) throw new Error('JWT cookieName is required');
  
  // Check encryption key length
  const keyBuffer = Buffer.from(config.encryptionKey, 'hex');
  if (keyBuffer.length !== 32) {
    throw new Error(`Encryption key must be 32 bytes (current: ${keyBuffer.length})`);
  }
};

validateJwtConfig(jwtConfig);