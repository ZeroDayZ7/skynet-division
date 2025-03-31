const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { verifyJwtToken } = require('../tools/tokenTools');
const serverLogs = require('../tools/server_logs');

const router = express.Router();

// ==============================================================================
// Endpoint do dodawania oferty pracy
// ==============================================================================

router.post('/api/add-job', verifyJwtToken, async (req, res) => {
  const { title, company, location, category, postalCode, salaryMin, salaryMax, description, requirements } = req.body;
  const userId = req.user.id; // zakładając, że userId jest dostępne po weryfikacji tokena

  console.log(`USER ID::::: ${userId}`);

  if (!title || !company || !location || !category || !postalCode || !description || !requirements) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane!' });
  }

  try {
    // Wywołanie funkcji do wstawiania danych do bazy
    const jobId = await addJobPosting(title, company, location, category, postalCode, salaryMin, salaryMax, description, requirements, userId);
    
    res.status(201).json({ message: 'Oferta pracy została dodana', jobId });
  } catch (error) {
    console.error('Błąd podczas dodawania oferty:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania oferty pracy.' });
  }
});

// ==============================================================================
// Funkcja do dodawania oferty pracy do bazy danych
// ==============================================================================

async function addJobPosting(title, company, location, category, postalCode, salaryMin, salaryMax, description, requirements, userId) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO job_postings (title, company, location, category, postal_code, salary_min, salary_max, description, requirements, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    
    db.query(query, [title, company, location, category, postalCode, salaryMin, salaryMax, description, requirements, userId], (error, results) => {
      if (error) {
        console.error('Błąd podczas dodawania oferty pracy:', error);
        reject(error);
      } else {
        resolve(results.insertId); // Zwracamy ID nowej oferty pracy
      }
    });
  });
}

module.exports = router;