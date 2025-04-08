// src/errors/errorMessages.js
import { ERROR_CODES } from './errorCodes.js';

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Nieprawidłowy e-mail lub hasło',
  [ERROR_CODES.USER_BLOCKED]: 'Twoje konto zostało zablokowane.',
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 'Twoje konto nie zostało jeszcze aktywowane.',
  [ERROR_CODES.INVALID_PASSWORD]: 'Podane hasło jest nieprawidłowe.',
  [ERROR_CODES.SERVER_ERROR]: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
} as const;