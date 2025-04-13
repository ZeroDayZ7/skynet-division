import { ERROR_MESSAGES } from '#ro/errors/errorMessages';
import { ERROR_CODES } from '#ro/errors/errorCodes';

interface ErrorDetails {
  [key: string]: any;
}

/**
 * [ENG] Creates a standardized error object for internal use and API responses.
 * 
 * @param code - A key from ERROR_MESSAGES and ERROR_CODES.
 * @param details - Additional fields to include in the error (e.g., custom fields for context).
 * @returns An object with error metadata: code, message, HTTP status, and additional details.
 * 
 * @example
 * ```ts
 * throw createError(ERROR_CODES.NOT_FOUND, { description: 'User not found by ID' });
 * ```
 * 
 * [PL] Tworzy ustandaryzowany obiekt błędu do użycia wewnętrznego i odpowiedzi API.
 * 
 * @param code - Klucz z ERROR_MESSAGES i ERROR_CODES.
 * @param details - Dodatkowe pola do dołączenia do błędu (np. niestandardowe informacje).
 * @returns Obiekt zawierający dane błędu: kod, wiadomość, status HTTP i inne szczegóły.
 * 
 * @example
 * ```ts
 * throw createError(ERROR_CODES.NOT_FOUND, { description: 'Nie znaleziono użytkownika po ID' });
 * ```
 */
export const createError = (
  code: keyof typeof ERROR_MESSAGES,
  details: ErrorDetails = {}
): {
  error: true;
  code: string;
  message: string;
  statusCode: number;
  [key: string]: any;
} => {
  if (!ERROR_MESSAGES[code]) {
    throw new Error(`Unknown error code: ${code}`);
  }

  const statusMap: Record<string, number> = {
    [ERROR_CODES.INVALID_CREDENTIALS]: 401,
    [ERROR_CODES.USER_BLOCKED]: 403,
    [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 403,
    [ERROR_CODES.INVALID_REQUEST]: 400,
    [ERROR_CODES.NOT_FOUND]: 404,
    [ERROR_CODES.SERVER_ERROR]: 500,
    // [PL] Dodaj inne kody w razie potrzeby
    // [ENG] Add more codes if necessary
  };

  return {
    error: true,
    code,
    message: ERROR_MESSAGES[code],
    statusCode: statusMap[code] || 500,
    ...details,
  };
};
