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
router.post('/api/contact', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const result = await addMessage(email, subject, message);
    res.status(200).json({ 
      success: true, 
      message: 'Wiadomość została wysłana pomyślnie.',
      messages: 'success',
      code: `${i18n.__('LOGIN.CONTACT_SUCCESS')}`

    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Wystąpił błąd podczas wysyłania wiadomości.',
      messages: 'error',
      code: `${i18n.__('LOGIN.CONTACT_NO_SUCCESS')}`
    });
  }
});
// ==============================================================================
// Funkcja do dodawania wiadomości do bazy danych
// ==============================================================================
async function addMessage(email, subject, message) {
  return new Promise((resolve, reject) => {
    const insertQuery = 'INSERT INTO contact (email, subject, message) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, subject, message], (error, results) => {
      if (error) {
        console.error('Błąd podczas dodawania wiadomości:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
module.exports = router;
