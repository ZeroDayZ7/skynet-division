const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const sessionToken = uuidv4();
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

// ==================== Middleware do weryfikacji tokenu JWT ==========================
async function verifyJwtToken(req, res, next) {
  try {
    // Pobierz token JWT z ciasteczek
    const AT_TOKEN = req.cookies[process.env.AT_NAME];
    const ST_TOKEN = req.cookies[process.env.ST_NAME];
    console.log(`ACCESS_TOKEN: ${AT_TOKEN}`);
    console.log(`SESSION_KEY: ${ST_TOKEN}`);

    if (!AT_TOKEN && !ST_TOKEN) {
      res.clearCookie(process.env.AT_NAME);
      res.clearCookie(process.env.ST_NAME);
      return res.status(401).json({ 
        message: 'Brak tokenu uwierzytelniającego',
        isLoggedIn: false,
       });
    }

    // Weryfikacja tokenu JWT
    const DECODED_AT_TOKEN = jwt.verify(AT_TOKEN, process.env.JWT_KEY);
    console.log('DECODED_AT_TOKEN: ' + JSON.stringify(DECODED_AT_TOKEN, null, 2));

    // return;

    // Sprawdzenie, czy token sesji istnieje w bazie danych
    const sessionToken = DECODED_AT_TOKEN.sessionId;
    const userID = DECODED_AT_TOKEN.userEmail;
    const session = await getSessionFromDatabase(sessionToken, userID);

    const loginDate = session.login_date;
    const currentTime = Math.floor(Date.now() / 1000);
    const loginDateTimestamp = Math.floor(new Date(loginDate).getTime() / 1000); // Konwersja na sekundy
    const IAT = DECODED_AT_TOKEN.iat;
    const EXP = DECODED_AT_TOKEN.exp;
    const tokenVALID = 3600;
    const tokenEXP = IAT + tokenVALID;
        
    const iatDate = new Date(IAT * 1000); // Czas wystawienia tokenu
    const expDate = new Date(EXP * 1000); // Czas wygaśnięcia tokenu
    const tokenExpDate = new Date(tokenEXP * 1000); // Czas wygaśnięcia tokenu obliczony
    
    console.log(`Aktualny Czas: ${new Date(currentTime * 1000).toLocaleString()}`);
    console.log(`Data Logowania: ${new Date(loginDateTimestamp * 1000).toLocaleString()}`);
    console.log(`IAT: ${iatDate.toLocaleString()}`);
    console.log(`EXP: ${expDate.toLocaleString()}`);
    console.log(`Czas ważności tokenu: ${tokenVALID} sekund`);
    console.log(`Data ważności tokenu: ${tokenExpDate.toLocaleString()}`);
    
    // Sprawdź, czy token wygasł
    if (currentTime > tokenEXP) {
      console.log('Token wygasł');
    } else {
      console.log('Token jest nadal ważny');
    }
    
    // Dodatkowo, porównanie z datą logowania
    if (loginDateTimestamp < IAT) {
      console.log('Data logowania jest przed czasem wystawienia tokenu.');
    } else if (loginDateTimestamp > tokenEXP) {
      console.log('Data logowania jest po czasie wygaśnięcia tokenu.');
    } else {
      console.log('Data logowania mieści się w okresie ważności tokenu.');
    }
    
    // return;


    if (userID !== session.email && sessionToken !== session.session_token && loginDateTimestamp !== IAT) {
      return res.status(401).json({ message: 'Nieprawidłowy token sesji' });
    } else {
      req.user = {
        id: userID,
      };
    }

    console.log(`S:: ${JSON.stringify(session, null, 2)}`);

    next();

    return;
  } catch (error) {
    console.error('Błąd (verifyJwtToken):', error);
    res.status(401).json({ message: 'Nieprawidłowy token uwierzytelniający' });
  }
}

// ========================= Tworzenie tokenu JWT httpOnly ==========================
async function generateAccessToken(userEmail, userRole) {
  try {

    const clear = await ClearSessionFromDatabase(userEmail);
    console.log(`${JSON.stringify(clear)}`);
    // Dane do zapisania w tokenie
    const payload = {
      userEmail: userEmail,
      sessionId: sessionToken,
      role: userRole,// Generowanie unikalnego identyfikatora sesji
      // Dodaj dodatkowe dane, jeśli są potrzebne
    };

    // Wygenerowanie tokenu JWT
    const sessionJwtToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }); // Ustawienie czasu wygaśnięcia na 1 godzinę

    // Zwróć wygenerowany token sesji
    saveSessionTokenInDatabase(userEmail, sessionJwtToken, sessionToken);
    return { accessToken: sessionJwtToken, sessionToken: sessionToken };
  } catch (error) {
    console.error('Błąd podczas generowania tokena sesji:', error);
    throw new Error('Błąd podczas generowania tokena sesji');
  }
}

// Funkcja zapisująca token sesji w bazie danych
async function saveSessionTokenInDatabase(userEmail, sessionJwtToken, sessionToken) {
  return new Promise((resolve, reject) => {
    // Tutaj używamy zapytania INSERT, aby wstawić nowy rekord z tokenem sesji
    const saveTokenQuery =
      'INSERT INTO sessions (email, access_token, session_token, login_date) VALUES (?, ?, ?, NOW())';
    db.query(saveTokenQuery, [userEmail, sessionJwtToken, sessionToken], (error, results) => {
      if (error) {
        console.error('Błąd podczas zapisywania tokenu sesji w bazie danych:', error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function ClearSessionFromDatabase(userID) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM sessions WHERE  email = ?';
    db.query(query, [userID], (error, results) => {
      if (error) {
        console.error('Błąd podczas usuwania sesji z bazy danych:', error);
        reject(error);
      } else {
        resolve({ message: 'Sesja została usunięta.' });
      }
    });
  });
}


// Funkcja do pobrania sesji z bazy danych
async function getSessionFromDatabase(sessionToken, userID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT email, session_token, login_date FROM sessions WHERE session_token = ? && email = ?';
    db.query(query, [sessionToken, userID], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania sesji z bazy danych:', error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Eksportowanie obu funkcji
module.exports = {
  generateAccessToken,
  ClearSessionFromDatabase,
  verifyJwtToken,
};
