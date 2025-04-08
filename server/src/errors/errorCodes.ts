// src/errors/errorCodes.js
export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_BLOCKED: 'USER_BLOCKED',
  ACCOUNT_NOT_ACTIVE: 'ACCOUNT_NOT_ACTIVE',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  SERVER_ERROR: 'SERVER_ERROR', // Przykładowy dodatkowy kod
} as const; // 'as const' zapewnia, że wartości są traktowane jako literały