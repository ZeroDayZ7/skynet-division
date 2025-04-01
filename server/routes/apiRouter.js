const express = require('express');
const { authLimiter } = require('../config/rateLimiterConfig').default; 

const router = express.Router();

// Logowanie
router.post('/login', authLimiter, require('../endpoints/loginEndpoint'));

// Wylogowanie
router.post('/logout', require('../endpoints/loginEndpoint')); 

// Rejestracja
// router.post('/register', require('../endpoints/registrationEndpoint'));

// Odświeżanie tokena
// router.post('/refresh-token', require('../endpoints/auth/refreshToken'));

// Obsługuje inne niezdefiniowane trasy (404)
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });


module.exports = router;