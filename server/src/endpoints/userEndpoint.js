const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { verifyJwtToken } = require('../tools/tokenTools');

const router = express.Router();

// ==============================================================================
// Endpoint do pobrania danych e-dowodu użytkownika + zdjęcia
// ==============================================================================
router.post('/user-eid', verifyJwtToken, async (req, res) => {
  const userId = req.user.id; // Pobranie ID użytkownika z tokena

  console.log(`Pobieranie danych e-dowodu dla użytkownika ID: ${userId}`);

  try {
    // Pobranie danych użytkownika
    const userEID = await getUserEID(userId);

    if (!userEID) {
      return res.status(404).json({ message: 'Dane e-dowodu nie znalezione' });
    }

    // Pobranie ścieżki do zdjęcia
    const photoPath = path.join(__dirname, `../private_uploads/users/${userId}.jpg`);

    console.log(`EEE:  ${photoPath}`);

    let photoBase64 = null;
    if (fs.existsSync(photoPath)) {
      // Odczytanie zdjęcia i zakodowanie do base64
      const imageBuffer = fs.readFileSync(photoPath);
      photoBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    }

    // Dodanie zdjęcia do obiektu użytkownika
    userEID.photo = photoBase64;

    return res.status(200).json(userEID);

  } catch (error) {
    console.error('Błąd podczas pobierania danych e-dowodu:', error);
    return res.status(500).json({
      message: 'Wystąpił błąd serwera',
      error: error.message || 'Nieznany błąd',
    });
  }
});

// ==============================================================================
// Funkcja pobierająca dane użytkownika
// ==============================================================================
async function getUserEID(userId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT first_name, second_name, last_name, pesel, birth_date, birth_place, document_number, issue_date, expiration_date
      FROM user_eid_data
      WHERE user_id = ? LIMIT 1;
    `;

    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania danych e-dowodu:', error);
        reject(error);
      } else {
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
}

module.exports = router;
