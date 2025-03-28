const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const { i18n } = require('../language/i18nSetup');
const { verifyJwtToken } = require('../tools/tokenTools');
const serverLogs = require('../tools/server_logs');
const router = express.Router();

// ==============================================================================
// Zwrócenie roli użytkownika
// ==============================================================================
router.get('/api/user/role', verifyJwtToken, async (req, res, next) => {
  console.log(`/api/user/role`);

  // Tutaj zwracamy fikcyjną rolę użytkownika, np. "admin"
  const userRole = 'admin';

  // Zwracamy rolę użytkownika w formacie JSON
  return res.status(200).json({
    role: userRole,
    message: 'Użytkownik jest zalogowany i jego rola to admin.',
  });
});

module.exports = router;
