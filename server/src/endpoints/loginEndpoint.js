const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const { i18n } = require('../language/i18nSetup');

const { generateAccessToken, verifyJwtToken, ClearSessionFromDatabase } = require('../tools/tokenTools');

const router = express.Router();
// ==========================================================================
// Logowanie
// ==========================================================================
router.get('/api/check-user', verifyJwtToken, (req, res) => {
  console.log(`/api/check-user`);
  console.log(req.session.userId);

  return res.json({ isLoggedIn: false, role: 'admin' });
});

// ==========================================================================
// Logowanie
// ==========================================================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    if (!email || !password) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
      });
    }

    const userDetails = await checkUserDetails(email);
    if (!userDetails || userDetails.userBlock === 1 || !userDetails.isActivationTokenNull) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: userDetails
          ? userDetails.userBlock
            ? `${i18n.__('LOGIN.USER_BLOCKED')}`
            : `${i18n.__('LOGIN.ACCOUNT_ACTIVATE_FALSE')}`
          : `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    if (userDetails.lastLoginIp !== userIp) {
      await updateLastLoginIp(email, userIp);
    }

    const user = await getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    if (!isPasswordValid) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    const token = await generateAccessToken(user.ids, user.role);
    if (!token) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    await updateLoginCount(email);
    req.session.userId = user.ids;

    req.session.save((err) => {
      if (err) {
        console.error('Błąd podczas zapisywania sesji:', err);
        return res.status(500).json({ error: 'Błąd logowania' });
      }

      res.cookie(process.env.AT_NAME, token.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.C_MAX_AGE, 10),
        sameSite: false,
      });

      return res.status(200).json({
        message: 'Logowanie przebiegło pomyślnie',
        isLoggedIn: true,
        role: 'admin',
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: `Wystąpił błąd podczas logowania`,
      code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
      messages: 'error',
      isLoggedIn: false,
    });
  }
});

// ==============================================================================
// Logout
// ==============================================================================
router.post('/logout', verifyJwtToken, async (req, res, next) => {
  try {
    const userID = req.user.id;
    console.log(`LOGOUT userID${userID}`);
    // return;
    await ClearSessionFromDatabase(userID);

    // Usuń ciasteczka zawierające token sesji
    res.clearCookie(process.env.AT_NAME);
    res.clearCookie(process.env.ST_NAME);
    // res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json({
      success: true,
      message: 'Wylogowanie przebiegło pomyślnie',
      isLoggedIn: false,
    });
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
async function isActivationTokenNull(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT activation_token FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola activation_token', error);
        serverLogs(`Błąd podczas sprawdzania pola activation_token', ${error}`);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0].activation_token === null);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}

// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
async function checkUserBlock(email) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby sprawdzić pole userBlock
    const query = 'SELECT userBlock FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola userBlock:', error);
        reject(error);
      } else {
        // Jeśli zapytanie zwróciło wynik, zwróć status blokady użytkownika (0 lub 1)
        if (results.length > 0) {
          resolve(results[0].userBlock);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}
// ===============================================================================
// UPDATE LOGIN_COUNT +1
// ===============================================================================
async function updateLoginCount(email) {
  return new Promise((resolve, reject) => {
    // Pobierz aktualną liczbę logowań użytkownika
    const queryGetCount = 'SELECT login_count FROM users WHERE email = ?';
    db.query(queryGetCount, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania liczby logowań użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const loginCount = results[0].login_count;
          const updatedLoginCount = loginCount + 1;

          // Zaktualizuj liczbę logowań użytkownika w bazie danych
          const queryUpdateCount = 'UPDATE users SET login_count = ?, login_date = NOW() WHERE email = ?';
          db.query(queryUpdateCount, [updatedLoginCount, email], (error) => {
            if (error) {
              console.error('Błąd podczas aktualizacji liczby logowań użytkownika:', error);
              reject(error);
            } else {
              resolve(true);
            }
          });
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}
// ===============================================================================
// Sprawdzenie czy użytkownik jest zablokowany i czy aktywował konto
// ===============================================================================
async function checkUserDetails(email) {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT activation_token, userBlock, email, lastLoginIp, loginAttempts, lastLoginAttempt FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const {
            activation_token,
            userBlock,
            email: userEmail,
            lastLoginIp = null,
            loginAttempts = 0,
            lastLoginAttempt = null,
          } = results[0];
          resolve({
            isActivationTokenNull: activation_token === null,
            userBlock,
            email: userEmail,
            lastLoginIp,
            loginAttempts,
            lastLoginAttempt,
          });
        } else {
          resolve(false);
        }
      }
    });
  });
}

// ===============================================================================
// Funkcja do pobierania użytkownika z bazy danych na podstawie adresu e-mail
// ===============================================================================
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT pass, ids, role FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Zwróć użytkownika, jeśli został znaleziony
        } else {
          resolve(false); // Zwróć null, jeśli użytkownik nie został znaleziony
        }
      }
    });
  });
}
// ===============================================================================
// Funkcja dodaje IP
// ===============================================================================
async function updateLastLoginIp(email, ip) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET lastLoginIp = ? WHERE email = ?';
    db.query(query, [ip, email], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji pola lastLoginIp:', error);
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve('Zaktualizowano lastLoginIp');
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}

module.exports = router;
