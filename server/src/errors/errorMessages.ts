// src/errors/errorMessages.ts
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Nieprawidłowy e-mail lub hasło',
  USER_BLOCKED: 'Twoje konto zostało zablokowane.',
  ACCOUNT_NOT_ACTIVE: 'Twoje konto nie zostało jeszcze aktywowane.',
  INVALID_PASSWORD: 'Podane hasło jest nieprawidłowe.',
  SERVER_ERROR: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
  AUTH_TOKEN_MISSING: 'Brak tokena.',
  AUTH_TOKEN_EXPIRED: 'Token wygasł.',
  AUTH_TOKEN_INVALID: 'Token jest nieprawidłowy.',
  CSRF_TOKEN_INVALID: 'Token CSRF jest nieprawidłowy.',
  AUTHENTICATION_FAILED: 'Błąd autoryzacji.',
  INVALID_ADDRESS_IP: 'Nieprawidłowy adres IP.',
  INVALID_REQUEST: 'Nieprawidłowe żądanie.',
  NOT_FOUND: 'Nie znaleziono',
  UNAUTHORIZED: 'Nieautoryzowany dostęp',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
  
} as const; // 'as const' zapewnia, że wartości są traktowane jako literały
