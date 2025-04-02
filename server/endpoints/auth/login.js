import express from 'express';
import { i18n } from '../../language/i18nSetup.js';
import authService from '../../services/auth.service.js';
import { generateAuthToken } from '../../services/token.service.js';
import SystemLog from '../../utils/SystemLog.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers['x-forwarded-for'] || req.ip; // Używamy req.ip zamiast req.connection.remoteAddress

  try {
    // 1. Walidacja danych wejściowych
    if (!email || !password) {
      SystemLog.warn('Login attempt with incomplete data', { email });
      return res.status(400).json({
        success: false,
        message: i18n.__('LOGIN.INCOMPLETE_DATA'),
        isLoggedIn: false
      });
    }

    // 2. Weryfikacja użytkownika
    const validationResult = await authService.validateUser(email, password, userIp);
    if (validationResult.error) {
      SystemLog.warn('Invalid login attempt', { 
        email,
        reason: validationResult.error 
      });
      return res.status(401).json({
        success: false,
        error: "Wpisz poprawnie dane",
        isLoggedIn: false
      });
    }

    // 3. Generowanie tokena JWT
    const token = generateAuthToken({
      id: validationResult.user.ids,
      // Jeśli potrzebujesz email i role w tokenie:
      // email: validationResult.user.email,
      // role: validationResult.user.role
    });

    // 4. Zapisywanie sesji
    req.session.userId = validationResult.user.ids;
    
    req.session.save(async (err) => {
      if (err) {
        SystemLog.error('Session save error', {
          userId: validationResult.user.ids,
          error: err.message
        });
        return res.status(500).json({ 
          success: false,
          message: i18n.__('INTERNAL_SERVER_ERROR'),
          isLoggedIn: false
        });
      }

      // 5. Ustawienie bezpiecznego ciasteczka
      res.cookie(process.env.ACCESS_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.JWT_EXPIRES_IN_MS || '3600000', 10), // 1h domyślnie
        // sameSite: 'lax',
        // domain: process.env.COOKIE_DOMAIN
      });
 
      // 6. Zwrócenie odpowiedzi
      SystemLog.info('User logged in successfully', { 
        userId: validationResult.user.ids,
        ip: userIp 
      });

      return res.status(200).json({
        success: true,
        message: i18n.__('LOGIN.SUCCESS'),
        isLoggedIn: true,
        user: {
          id: validationResult.user.ids
        }
      });
    });

  } catch (error) {
    SystemLog.error('Login process failed', {
      email,
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({
      success: false,
      message: i18n.__('INTERNAL_SERVER_ERROR'),
      isLoggedIn: false
    });
  }
});

export default router;