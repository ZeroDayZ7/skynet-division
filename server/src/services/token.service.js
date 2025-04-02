import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import SystemLog from '#utils/SystemLog.js';
import jwtConfig from '#config/jwt.config.js';

// Funkcja pomocnicza do szyfrowania ID
const encryptId = (id) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(jwtConfig.encryptionKey),
    iv
  );
  let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

/**
 * Generuje token JWT z zaszyfrowanym ID użytkownika
 * @param {Object} user - Obiekt użytkownika
 * @param {string|number} user.id - ID użytkownika do zaszyfrowania
 * @param {string} user.email - Email użytkownika
 * @param {string} user.role - Rola użytkownika
 * @returns {string} Wygenerowany token JWT
 * @throws {Error} Jeśli generowanie tokena się nie powiedzie
 */
export const generateAuthToken = (user) => {
  try {
    // Podstawowe dane tokena
    const payload = {
      sub: encryptId(user.id), // Zaszyfrowane ID jako subject
    //   usr: user.email,         // Email jako dodatkowe pole
    //   rol: user.role,          // Rola użytkownika
      iss: jwtConfig.issuer,   // Issuer z konfiguracji
      iat: Math.floor(Date.now() / 1000) // Automatycznie doda exp
    };

    // Generowanie tokena
    const token = jwt.sign(
      payload,
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
        algorithm: 'HS256'
      }
    );

    // Logowanie sukcesu (bez wrażliwych danych)
    SystemLog.info('Authentication token generated', {
      action: 'token_generation',
      userId: user.id,
      tokenPreview: token.slice(-8) // Logowanie tylko fragmentu tokena
    });

    return token;
  } catch (error) {
    SystemLog.error('Token generation failed', {
      action: 'token_generation_error',
      error: error.message,
      stack: error.stack
    });
    throw new Error('Failed to generate authentication token');
  }
};