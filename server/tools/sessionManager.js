// sessionManager.js
require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('../db');

// Opcje sesji
const sessionOptions = {
  checkExpirationInterval: 10000, // Czas w milisekundach między sprawdzeniami wygasłych sesji
  expiration: 3600000, // Czas wygaśnięcia sesji w milisekundach
  schema: {
    tableName: 'sessions_store', // Nazwa tabeli
    columnNames: {
      session_id: 'session_id', // Nazwa kolumny identyfikatora sesji
      expires: 'expires', // Nazwa kolumny daty wygaśnięcia
      data: 'data' // Nazwa kolumny danych sesji
    }
  }
};

// Tworzenie instancji MySQLStore z opcjami
const sessionStore = new MySQLStore(sessionOptions, db, (error) =>{
  if(error) {
    console.log(`SESSION_ERROR: ${error}`);
    return;
  }
});

// Middleware session
const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_KEY || 'default_secret', // Dodanie domyślnej wartości dla bezpieczeństwa
  resave: false, // Ustawienie na false, aby nie zapisywać sesji bez zmian
  saveUninitialized: false, // Nie zapisuj sesji, jeśli nie została zainicjalizowana
  rolling: false, // Automatyczne odświeżanie sesji
  name: process.env.SESSION_NAME || 'default_session_name', // Dodanie domyślnej nazwy sesji
  cookie: {
    maxAge: Number(process.env.C_MAX_AGE) || 900000, // Domyślny czas trwania sesji 15 minut
    secure: process.env.NODE_ENV === "production", // Ustaw na true, jeśli używasz HTTPS
    httpOnly: true, // Ustawienie httpOnly na true dla bezpieczeństwa
    sameSite: false,
    // sameSite: 'strict', // Ograniczenie ciasteczek do tej samej witryny
    // sameSite: 'lax', // Ograniczenie ciasteczek do tej samej witryny
    // sameSite: 'None', // Najmniej restrykcyjne, przesyła ciasteczka we wszystkich żądaniach (wymaga HTTPS).
  }
});

function sessionManager(app) {
  app.use(sessionMiddleware);
}



module.exports = sessionManager;
