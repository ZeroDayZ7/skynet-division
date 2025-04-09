// src/errors/errorMessages.js
import { ERROR_CODES } from './errorCodes.js';

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Nieprawidłowy e-mail lub hasło',
  [ERROR_CODES.USER_BLOCKED]: 'Twoje konto zostało zablokowane.',
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 'Twoje konto nie zostało jeszcze aktywowane.',
  [ERROR_CODES.INVALID_PASSWORD]: 'Podane hasło jest nieprawidłowe.',
  [ERROR_CODES.SERVER_ERROR]: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
  [ERROR_CODES.AUTH_TOKEN_MISSING]: 'Brak tokena.',
  [ERROR_CODES.AUTH_TOKEN_EXPIRED]: 'Token wygasł.',
  [ERROR_CODES.AUTH_TOKEN_INVALID]: 'AUTH_TOKEN_INVALID',
  [ERROR_CODES.CSRF_TOKEN_INVALID]: 'CSRF_TOKEN_INVALIDD',
  [ERROR_CODES.AUTHENTICATION_FAILED]: 'AUTHENTICATION_FAILED',
  
} as const;