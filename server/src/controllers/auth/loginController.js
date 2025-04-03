// controllers/auth/loginController.js

import authService from '#services/auth.service.js';
import { generateAuthToken } from '#services/token.service.js';
import SystemLog from '#utils/SystemLog.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers['x-forwarded-for'] || req.ip; // Używamy req.ip zamiast req.connection.remoteAddress

  try {
    // 1. Walidacja danych wejściowych
    if (!email || !password) {
      SystemLog.warn('Login attempt with incomplete data', { email });
      return res.status(400).json({
        isAuthenticated: false
      });
    }

    // 2. Weryfikacja użytkownika
    const validationResult = await authService.validateUser(email, password, userIp);
    if (validationResult.error) {
      SystemLog.warn('Invalid login attempt', { 
        email,
        reason: validationResult.code
      });
      return res.status(401).json({
        isAuthenticated: false,
        message: validationResult.code
      });
    }

    // 3. Generowanie tokena JWT
    const token = generateAuthToken({
      id: validationResult.user.id
      // Jeśli chcesz dodać role, dodaj je do tokenu
    });

    // 4. Zapisywanie sesji
    req.session.userId = validationResult.user.id;

    req.session.save(async (err) => {
      if (err) {
        SystemLog.error('Session save error', {
          userId: validationResult.user.id,
          error: err.message
        });
        return res.status(500).json({ 
          isAuthenticated: false
        });
      }

      // 5. Ustawienie bezpiecznego ciasteczka
      res.cookie(process.env.ACCESS_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.JWT_EXPIRES_IN_MS || '900000', 10), // 15min domyślnie
      });

      // 6. Zwrócenie odpowiedzi
      SystemLog.info('User logged in successfully', { 
        userId: validationResult.user.id,
        ip: userIp 
      });

      return res.status(200).json({
        isAuthenticated: true
      });
    });

  } catch (error) {
    SystemLog.error('Login process failed', {
      email,
      error: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      isAuthenticated: false
    });
  }
};
