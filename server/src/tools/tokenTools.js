import express from 'express';
import SystemLog from './SystemLog';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


// Generowanie unikalnego tokenu sesji
const sessionToken = uuidv4();

// Middleware do weryfikacji tokenu JWT
export const verifyJwtToken = async (req, res, next) => {
  try {


    const ACCESS_TOKEN = req.cookies[process.env.ACCESS_COOKIE_NAME];
    const SESSION_TOKEN = req.cookies[process.env.SESSION_COOKIE_NAME];
    console.log(`ACCESS_TOKEN: ${ACCESS_TOKEN}`);
    console.log(`SESSION_KEY: ${SESSION_TOKEN}`);

    if (!ACCESS_TOKEN || !SESSION_TOKEN) {
      res.clearCookie(process.env.ACCESS_COOKIE_NAME);
      res.clearCookie(process.env.SESSION_COOKIE_NAME);
      return res.status(401).json({
        message: 'Brak tokenu uwierzytelniającego',
        isLoggedIn: false,
      });
    }

    const DECODED_ACCESS_TOKEN = jwt.verify(ACCESS_TOKEN, process.env.JWT_KEY);
    console.log('DECODED_ACCESS_TOKEN: ' + JSON.stringify(DECODED_ACCESS_TOKEN, null, 2));

    const sessionToken = DECODED_ACCESS_TOKEN.sessionId;
    const userID = DECODED_ACCESS_TOKEN.userEmail;

    const loginDate = session.login_date;
    const currentTime = Math.floor(Date.now() / 1000);
    const loginDateTimestamp = Math.floor(new Date(loginDate).getTime() / 1000);
    const IAT = DECODED_ACCESS_TOKEN.iat;
    const EXP = DECODED_ACCESS_TOKEN.exp;
    const tokenVALID = 3600;
    const tokenEXP = IAT + tokenVALID;

    const iatDate = new Date(IAT * 1000);
    const expDate = new Date(EXP * 1000);
    const tokenExpDate = new Date(tokenEXP * 1000);

    console.log(`Aktualny Czas: ${new Date(currentTime * 1000).toLocaleString()}`);
    console.log(`Data Logowania: ${new Date(loginDateTimestamp * 1000).toLocaleString()}`);
    console.log(`IAT: ${iatDate.toLocaleString()}`);
    console.log(`EXP: ${expDate.toLocaleString()}`);
    console.log(`Czas ważności tokenu: ${tokenVALID} sekund`);
    console.log(`Data ważności tokenu: ${tokenExpDate.toLocaleString()}`);

    if (currentTime > tokenEXP) {
      console.log('Token wygasł');
    } else {
      console.log('Token jest nadal ważny');
    }

    if (loginDateTimestamp < IAT) {
      console.log('Data logowania jest przed czasem wystawienia tokenu.');
    } else if (loginDateTimestamp > tokenEXP) {
      console.log('Data logowania jest po czasie wygaśnięcia tokenu.');
    } else {
      console.log('Data logowania mieści się w okresie ważności tokenu.');
    }

    if (userID !== session.email || sessionToken !== session.session_token || loginDateTimestamp !== IAT) {
      return res.status(401).json({ message: 'Nieprawidłowy token sesji' });
    } else {
      req.user = { id: userID };
    }

    console.log(`S:: ${JSON.stringify(session, null, 2)}`);
    next();
  } catch (error) {
    console.error('Błąd (verifyJwtToken):', error);
    res.status(401).json({ message: 'Nieprawidłowy token uwierzytelniający' });
  }
};

// Tworzenie tokenu JWT
export const generateAccessToken = async (id) => {
  try {
    const payload = {
      id
    };

    const sessionJwtToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
    return { accessToken: sessionJwtToken, sessionToken };
  } catch (error) {
    console.error('Błąd podczas generowania tokena sesji:', error);
    throw new Error('Błąd podczas generowania tokena sesji');
  }
};


export default { generateAccessToken, verifyJwtToken };