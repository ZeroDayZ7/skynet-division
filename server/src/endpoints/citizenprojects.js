const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt');
const { i18n } = require('../language/i18nSetup');
const { verifyJwtToken } = require('../tools/tokenTools');

const router = express.Router();

router.post('/api/citizen-projects-list', verifyJwtToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const projects = await getCitizenProjects(limit, offset);
    const total = await getTotalProjectsCount();
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      projects,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Błąd podczas pobierania listy projektów:', error);
    return res.status(500).json({
      message: 'Wystąpił błąd serwera',
      error: error.message || 'Nieznany błąd',
    });
  }
});

// ==============================================================================
// Funkcja pobierająca listę projektów obywatelskich z paginacją
// ==============================================================================
async function getCitizenProjects(limit, offset) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, title, description, location, budget, category, upvotes
      FROM citizen_projects
      LIMIT ? OFFSET ?;
    `;

    db.query(query, [limit, offset], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania listy projektów:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// ==============================================================================
// Funkcja pobierająca całkowitą liczbę projektów
// ==============================================================================
async function getTotalProjectsCount() {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS total FROM citizen_projects;`;
    
    db.query(query, (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania liczby projektów:', error);
        reject(error);
      } else {
        resolve(results[0].total);
      }
    });
  });
}

module.exports = router;
