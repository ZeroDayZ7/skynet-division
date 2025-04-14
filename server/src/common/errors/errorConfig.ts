// src/errors/errorConfig.ts
import { ERROR_CODES } from '#ro/errors/errorCodes';
import { ERROR_MESSAGES } from '#ro/errors/errorMessages';

export interface ErrorConfig {
  message: string;
  statusCode: number;
}

export const ERROR_CONFIG: Record<string, ErrorConfig> = {
  [ERROR_CODES.INVALID_CREDENTIALS]: { message: ERROR_MESSAGES.INVALID_CREDENTIALS, statusCode: 401 },
  [ERROR_CODES.USER_BLOCKED]: { message: ERROR_MESSAGES.USER_BLOCKED, statusCode: 403 },
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: { message: ERROR_MESSAGES.ACCOUNT_NOT_ACTIVE, statusCode: 403 },
  [ERROR_CODES.INVALID_PASSWORD]: { message: ERROR_MESSAGES.INVALID_PASSWORD, statusCode: 400 },
  [ERROR_CODES.SERVER_ERROR]: { message: ERROR_MESSAGES.SERVER_ERROR, statusCode: 500 },
  [ERROR_CODES.AUTH_TOKEN_MISSING]: { message: ERROR_MESSAGES.AUTH_TOKEN_MISSING, statusCode: 401 },
  [ERROR_CODES.AUTH_TOKEN_EXPIRED]: { message: ERROR_MESSAGES.AUTH_TOKEN_EXPIRED, statusCode: 401 },
  [ERROR_CODES.AUTH_TOKEN_INVALID]: { message: ERROR_MESSAGES.AUTH_TOKEN_INVALID, statusCode: 401 },
  [ERROR_CODES.CSRF_TOKEN_INVALID]: { message: ERROR_MESSAGES.CSRF_TOKEN_INVALID, statusCode: 403 },
  [ERROR_CODES.AUTHENTICATION_FAILED]: { message: ERROR_MESSAGES.AUTHENTICATION_FAILED, statusCode: 401 },
  [ERROR_CODES.INVALID_REQUEST]: { message: ERROR_MESSAGES.INVALID_REQUEST, statusCode: 400 },
};

export const getErrorConfig = (code: string): ErrorConfig =>
  ERROR_CONFIG[code] || { message: ERROR_MESSAGES.SERVER_ERROR, statusCode: 500 };