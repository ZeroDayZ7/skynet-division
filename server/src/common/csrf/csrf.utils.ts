import { v4 as uuidv4 } from 'uuid';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError from '#errors/AppError';

export const generateCsrfToken = (): string => {
  try {
    return uuidv4();
  } catch (error) {
    SystemLog.error('Błąd generowania tokena CSRF', { error: (error as Error).message });
    throw new AppError('CSRF_GENERATION_FAILED', 500, true);
  }
};

export const verifyCsrfToken = (csrfToken: string, expectedToken: string): void => {
  if (!csrfToken || !expectedToken) {
    SystemLog.warn('Brak CSRF lub oczekiwanego tokenu podczas weryfikacji');
    throw new AppError('CSRF_TOKEN_INVALID', 403, true);
  }
  if (csrfToken !== expectedToken) {
    SystemLog.warn('Niezgodność tokena CSRF', { csrfToken: csrfToken.slice(0, 10) + '...' });
    throw new AppError('CSRF_TOKEN_INVALID', 403, true);
  }
};