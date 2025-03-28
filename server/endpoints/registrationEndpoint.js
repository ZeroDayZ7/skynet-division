const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { sendEmail } = require('../tools/emailUtils');

const server_logs = require('../tools/server_logs');

const router = express.Router();

// =================================================================
// Ustawianie nowego hasła
// =================================================================
router.post('/api/set-new-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Brak wymaganych danych',
        success: true,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
        messages: 'error',
      });
    }

    const user = await getUserByResetToken(token);
    if (!user) {
      return res.status(400).json({
        message: 'Nieprawidłowy lub wygasły token resetowania hasła',
        success: true,
        code: `${i18n.__('INVALID_TOKEN')}`,
        messages: 'error',
      });
    }

    const isStrongPassword = await checkPasswordStrength(newPassword);
    if (!isStrongPassword) {
      return res.status(400).json({
        message: 'Hasło nie spełnia wymagań',
        success: true,
        code: `${i18n.__('WEAK_PASSWORD')}`,
        messages: 'warning',
      });
    }

    const isPasswordUpdated = await updateUserPassword(user, newPassword);
    if (!isPasswordUpdated) {
      return res.status(500).json({
        message: 'Błąd podczas aktualizacji hasła',
        success: true,
        code: `${i18n.__('PASSWORD_UPDATE_ERROR')}`,
        messages: 'error',
      });
    }

    const isTokenCleared = await clearResetToken(user);
    if (!isTokenCleared) {
      return res.status(500).json({
        message: 'Błąd podczas usuwania tokenu resetowania hasła',
        success: false,
        messages: 'error',
      });
    }

    return res.status(200).json({
      message: 'Hasło zostało pomyślnie zaktualizowane',
      success: true,
      code: 'PASSWORD_SUCCESS_UPDATE',
      messages: 'success',
    });
  } catch (error) {
    console.error('Error setting new password:', error);
    return res.status(500).json({
      message: 'Wystąpił błąd wewnętrzny serwera',
      success: true,
      code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
      messages: 'error',
    });
  }
});
// =================================================================
// Endpoint obsługujący resetowanie hasła na podstawie tokena
// =================================================================
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body; // Pobierz token i nowe hasło z ciała żądania
    console.log('reset-password TOKEN: ' + token);

    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Brak wymaganych danych',
        success: true,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
        messages: 'error',
      });
    }

    // Sprawdź, czy token istnieje w bazie danych
    const user = await getUserByResetToken(token);

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired token',
        success: true,
        code: `${i18n.__('NO_TOKEN')}`,
        messages: 'error',
      });
    }

    // Sprawdź siłę hasła
    const isStrongPassword = checkPasswordStrength(newPassword);
    if (!isStrongPassword) {
      return res.status(400).json({
        message: 'Hasło nie spełnia wymagań',
        success: true,
        code: `${i18n.__('WEAK_PASSWORD')}`,
        messages: 'warning',
      });
    }

    // Hashuj nowe hasło
    const hashedPassword = await bcrypt.hash(newPassword, process.env.BCRYPT_ROUND);

    // Zaktualizuj hasło użytkownika i wyczyść token resetowania
    const isPasswordUpdated = await updateUserPassword(user, hashedPassword);
    if (!isPasswordUpdated) {
      return res.status(500).json({
        message: 'Błąd podczas aktualizacji hasła',
        success: true,
        code: `${i18n.__('PASSWORD_UPDATE_ERROR')}`,
        messages: 'error',
      });
    }

    const isTokenCleared = await clearResetToken(user);
    if (!isTokenCleared) {
      return res.status(500).json({
        message: 'Błąd podczas usuwania tokenu resetowania hasła',
        success: true,
        code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
        messages: 'error',
      });
    }

    res.status(200).json({
      message: 'Password has been reset successfully',
      success: true,
      code: `${i18n.__('PASSWORD_SUCCESS_UPDATE')}`,
      messages: 'success',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({
      message: 'Wystąpił błąd wewnętrzny serwera',
      success: true,
      code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
      messages: 'error',
    });
  }
});

// ==============================================================================
// Endpoint obsługujący żądanie przypomnienia hasła
// ==============================================================================
router.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: `Uzupełnij dane`,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
        success: true,
        messages: 'info',
      });
    }

    const userExists = await checkEmailExistence(email);

    if (!userExists) {
      return res.status(404).json({
        message: `Nie ma użytkownika z tym adresem e-mail`,
        code: `${i18n.__('USER_NOT_FOUND')}`,
        success: true,
        messages: 'info',
      });
    }

    const token = generateToken(64);

    // Zapisz token w bazie danych
    const updateTokenQuery = 'UPDATE users SET reset_password_token = ? WHERE email = ?';
    await db.query(updateTokenQuery, [token, email]);

    // Wygeneruj link do resetowania hasła
    const resetLink = `${process.env.API_URL}/reset-password?token=${token}`;
    // Tłumaczenie przed wysłaniem
    const emailSender = i18n.__('email.emailResetName');
    const resetPasswordSubject = i18n.__('email.resetPasswordSubject');
    const resetPasswordBody = i18n.__('email.resetPasswordBody', { resetLink: resetLink });

    // Przygotuj e-mail z linkiem do resetowania hasła
    const mailOptions = {
      from: `${emailSender} <forgotpassword@crims-city.ct8.pl>`,
      to: email,
      subject: resetPasswordSubject,
      html: resetPasswordBody,
    };

    // Wyślij e-mail z linkiem do resetowania hasła
    sendEmail(mailOptions)
      .then(() => {
        console.log('E-mail z linkiem do resetowania hasła został wysłany.');
        res.status(200).json({
          message: 'E-mail z linkiem do resetowania hasła został wysłany.',
          messages: 'success',
          code: `${i18n.__('EMAIL_WITH_RESET')}`,
          success: true,
        });
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania e-maila:', error);
        res.status(500).json({
          message: `Błąd podczas wysyłania e-maila z linkiem resetującym hasło.`,
          success: false,
        });
      });
  } catch (error) {
    console.error('Błąd podczas przetwarzania żądania przypomnienia hasła:', error);
    res.status(500).json({
      message: `Wystąpił błąd podczas przetwarzania żądania przypomnienia hasła.`,
      success: false,
    });
  }
});
// ==============================================================================
// Rejestracja, odbiera dane i łąduje w mysql
// ==============================================================================
router.post('/api/registration', async (req, res) => {
  const { email, password } = req.body;

  console.log(`= >>> req.body:
    ${JSON.stringify(req.body, null, 2)}`);

  if (!email || !password) {
    res.status(400).json({
      messages: 'warning',
      code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
      success: true,
    });
    return;
  }

  try {
    // Sprawdź złożoność hasła
    const isStrongPassword = await checkPasswordStrength(password, 6, 1, 1);

    if (!isStrongPassword) {
      return res.status(400).json({
        messages: 'warning',
        code: `${i18n.__('PASSWORD_TOO_SHORT')}`,
        success: true,
      });
    }

    const emailExists = await checkEmailExistence(email);

    if (emailExists) {
      return res.status(400).json({
        message: 'Email exist',
        messages: 'warning',
        code: `${i18n.__('EMAIL_EXIST')}`,
        success: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_ROUND);

    if (!hashedPassword) {
      return res.status(400).json({
        message: 'Błąd podczas hashowania hasła',
        messages: 'error',
        code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
        success: true,
      });
    }

    const token = generateToken(64);

    const insertUserQuery =
      'INSERT INTO users (email, pass, registration_date, activation_token) VALUES (?, ?, NOW(), ?)';
    db.query(insertUserQuery, [email, hashedPassword, token], (insertError, insertResults) => {
      if (insertError) {
        return res.status(500).json({
          message: `Błąd podczas dodawania nowego użytkownika.`,
          messages: 'error',
          code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
          success: true,
        });
      }

      // Twórz link aktywacyjny zawierający token
      const activationLink = `${process.env.API_URL}/activation?token=${token}`;

      // Pobierz tłumaczenie dla "Activation"
      const emailAcrivateSender = i18n.__('emailActivationSender');
      const subject = i18n.__('activationEmailSubject');
      const activationMessage = i18n.__('activationEmailMessage', { activationLink: activationLink });

      // Przygotuj e-mail z linkiem aktywacyjnym
      const mailOptions = {
        from: `${emailAcrivateSender} <activation@crims-city.ct8.pl>`,
        to: email,
        subject: subject,
        html: activationMessage,
      };

      // Wyślij e-mail
      sendEmail(mailOptions)
        .then(() => console.log('E-mail został wysłany pomyślnie'))
        .catch(() => console.error('Wystąpił błąd podczas wysyłania e-maila'));

      return res.status(200).json({
        messages: 'success',
        code: 'REGISTRATION_SUCCESS',
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: `Błąd podczas rejestracji`,
      messages: `error`,
      code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
      success: true,
    });
  }
});
// ==============================================================================
// Aktywacja konto na podstawie linku wysłanego na e-mail
// ==============================================================================
router.get('/activation/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await findUserByToken(token);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: 'Użytkownik nie istnieje lub konto zostało już aktywowane',
        code: 'ACCOUNT_ACTIVATE_DONE',
      });
    }

    const clearToken = await clearActivationToken(user);

    if (!clearToken) {
      return res.status(400).json({
        success: true,
        messages: 'error',
        message: 'Wystąpił błąd usuwania tokena z bazy danych',
        code: 'TRY_LATER',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Konto zostało pomyślnie aktywowane.',
      code: 'ACCOUNT_ACTIVATE',
    });
  } catch (error) {
    server_logs(`${error}`);
    console.error('Błąd podczas aktywacji konta:', error);
    res.status(500).json({
      success: false,
      message: 'Wystąpił błąd podczas aktywacji konta.',
    });
  }
});

// ==============================================================================
// Funkcja do generowania tokena
// ==============================================================================
function generateToken(length = 64) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}
// ==============================================================================
// Sprawdzanie siły hasła
// 1 Duża litera, 1 znak specdialny, 1 cyfra, minimum 6 znaków
// ==============================================================================
async function checkPasswordStrength(password, minLength = 6, minDigit = 1, minSpecial = 1) {
  return new Promise((resolve, reject) => {
    // Sprawdź minimalną długość hasła
    if (password.length < minLength) {
      return reject(new Error('Password too short'));
    }

    // Sprawdź obecność co najmniej jednej cyfry
    const digitRegex = /\d/;
    if (!digitRegex.test(password) || (password.match(digitRegex) || []).length < minDigit) {
      return reject(new Error('Password must contain at least one digit'));
    }

    // Sprawdź obecność co najmniej jednego znaku specjalnego
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!specialCharRegex.test(password) || (password.match(specialCharRegex) || []).length < minSpecial) {
      return reject(new Error('Password must contain at least one special character'));
    }

    // Sprawdź obecność co najmniej jednej małej i jednej dużej litery
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    if (!lowerCaseRegex.test(password) || !upperCaseRegex.test(password)) {
      return reject(new Error('Password must contain both lower and upper case letters'));
    }

    // Hasło spełnia wszystkie kryteria
    return resolve(true);
  });
}
// ==============================================================================
// Funkcja do aktualizacji pola userBlock w bazie danych
// ==============================================================================
async function updateUserBlock(user) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby zaktualizować pole userBlock
    const query = 'UPDATE users SET userBlock = ? WHERE ids = ?';
    db.query(query, [1, user.ids], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji pola userBlock:', error);
        reject(error);
      } else {
        // Jeśli aktualizacja zakończyła się sukcesem, zwróć sukces
        console.log(`updateUserBlock`);
        resolve();
      }
    });
  });
}
// ==============================================================================
// Funkcja do pobierania użytkownika z bazy danych na podstawie tokenu
// ==============================================================================
async function findUserByToken(token) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby znaleźć użytkownika na podstawie tokenu
    const query = 'SELECT ids FROM users WHERE activation_token = ?';
    db.query(query, [token], (error, results) => {
      if (error) {
        console.error('Błąd podczas wyszukiwania użytkownika:', error);
        reject(error);
      } else {
        // Jeśli użytkownik został znaleziony, zwróć go
        if (results.length > 0) {
          resolve(results[0].ids);
        } else {
          // Jeśli użytkownik nie został znaleziony, zwróć null
          resolve(null);
        }
      }
    });
  });
}
// ==============================================================================
// Funkcja sprawdzająca istnienie adresu e-mail w bazie danych
// ==============================================================================
async function checkEmailExistence(email) {
  return new Promise((resolve, reject) => {
    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania adresu e-mail:', error);
        reject(error);
      } else {
        resolve(results.length > 0); // Zwraca true, jeśli adres e-mail istnieje, w przeciwnym razie false
      }
    });
  });
}
// ==============================================================================
// Funkcja do pobierania użytkownika z bazy danych na podstawie tokenu resetowania hasła
// ==============================================================================
async function getUserByResetToken(token) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT ids FROM users WHERE reset_password_token = ?';
    db.query(query, [token], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Zwróć użytkownika, jeśli został znaleziony
        } else {
          resolve(null); // Zwróć null, jeśli użytkownik nie został znaleziony
        }
      }
    });
  });
}
// ==============================================================================
// Funkcja do aktualizowania hasła użytkownika
// ==============================================================================
function updateUserPassword(userId, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      // Zahaszuj nowe hasło
      const hashedPassword = await bcrypt.hash(newPassword, process.env.BCRYPT_ROUND);
      // Zaktualizuj hasło użytkownika w bazie danych
      const query = 'UPDATE users SET pass = ? WHERE ids = ?';
      db.query(query, [hashedPassword, userId.ids], (error, results) => {
        if (error) {
          console.error('Błąd podczas aktualizacji hasła:', error);
          reject(error);
        } else {
          resolve(true); // Zwróć sukces, jeśli hasło zostało zaktualizowane poprawnie
        }
      });
    } catch (error) {
      console.error('Błąd podczas hashowania hasła:', error);
      reject(error); // Rzuć błąd, aby obsłużyć go na wyższym poziomie
    }
  });
}
// ==============================================================================
// Funkcja do usuwania tokenu resetowania hasła użytkownika
// ==============================================================================
async function clearResetToken(userId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET reset_password_token = NULL WHERE ids = ?';
    db.query(query, [userId.ids], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu resetowania hasła:', error);
        reject(error);
      } else {
        resolve(true); // Zwróć sukces, jeśli token został usunięty poprawnie
      }
    });
  });
}
// ==============================================================================
// Funkcja do usuwania tokenu aktywacyjnego
// ==============================================================================
async function clearActivationToken(userId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET activation_token = NULL WHERE ids = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania tokenu aktywacyjnego:', error);
        reject(error);
      } else {
        resolve(true); // Zwróć sukces, jeśli token został usunięty poprawnie
      }
    });
  });
}

module.exports = router;
