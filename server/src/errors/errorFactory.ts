import { ERROR_MESSAGES } from './errorMessages';

interface ErrorDetails {
  [key: string]: any;  // Może zawierać dodatkowe właściwości, np. { field: 'email' }
}

export const createError = (code: keyof typeof ERROR_MESSAGES, details: ErrorDetails = {}): { error: boolean, code: string, message: string, [key: string]: any } => {
  if (!ERROR_MESSAGES[code]) {
    throw new Error(`Unknown error code: ${code}`);
  }

  return {
    error: true,
    code,
    message: ERROR_MESSAGES[code],
    ...details, // Dodatkowe dane
  };
};
