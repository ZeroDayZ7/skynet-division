const express = require('express');
const router = express.Router();
const { i18n } = require('../../language/i18nSetup');
const authService = require('../../services/authService');
// const userService = require('../../services/userService');
const { generateAccessToken } = require('../../tools/tokenTools');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    if (!email || !password) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: i18n.__('LOGIN.INCOMPLETE_DATA')
      });
    }

    // Walidacja użytkownika
    const validationResult = await authService.validateUser(email, password, userIp);
    if (validationResult.error) {
      return res.status(400).json(validationResult);
    }

    // Generowanie tokenu
    const token = await generateAccessToken(validationResult.user.ids, validationResult.user.role);
    if (!token) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: i18n.__('LOGIN.WRONG_DATA')
      });
    }

    // Zapis sesji
    req.session.userId = validationResult.user.ids;
    
    req.session.save((err) => {
      if (err) {
        console.error('Błąd sesji:', err);
        return res.status(500).json({ error: 'Błąd logowania' });
      }

      res.cookie(process.env.AT_NAME, token.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.C_MAX_AGE, 10),
        sameSite: false,
      });

      return res.status(200).json({
        message: 'Logowanie pomyślne',
        isLoggedIn: true,
        role: validationResult.user.role,
      });
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Błąd serwera',
      code: i18n.__('INTERNAL_SERVER_ERROR'),
      messages: 'error',
      isLoggedIn: false,
    });
  }
});

module.exports = router;