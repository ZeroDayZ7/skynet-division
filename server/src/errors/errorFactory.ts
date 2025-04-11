import { ERROR_MESSAGES } from '#ro/errors/errorMessages';
import { ERROR_CODES } from '#ro/errors/errorCodes';

interface ErrorDetails {
  [key: string]: any;
}

export const createError = (code: keyof typeof ERROR_MESSAGES, details: ErrorDetails = {}): {
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
    [ERROR_CODES.SERVER_ERROR]: 500,
    // Dodaj inne kody, jeśli są używane
  };

  return {
    error: true,
    code,
    message: ERROR_MESSAGES[code],
    statusCode: statusMap[code] || 500,
    ...details,
  };
};