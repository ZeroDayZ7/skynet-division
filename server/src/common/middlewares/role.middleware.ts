import { Request, Response, NextFunction } from 'express';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError, { ErrorType } from '#ro/common/errors/AppError';

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // 1. Sprawdzamy, czy użytkownik jest zalogowany (czy jest w sesji)
    if (!req.session || !req.session.userId || !req.session.role) {
      SystemLog.warn('[checkRole] Próba dostępu bez aktywnej sesji lub roli');
      throw new AppError('AUTHENTICATION_FAILED', 401, true, 'Brak autoryzacji');
    }

    const userRole = req.session.role; // Rola użytkownika z sesji
    const userId = req.session.userId; // Id użytkownika z sesji

    // 2. Sprawdzamy, czy rola użytkownika znajduje się w dozwolonych rolach
    if (!allowedRoles.includes(userRole)) {
      SystemLog.warn(`[checkRole] Użytkownik ${userId} nie ma odpowiednich uprawnień`);
      throw new AppError('FORBIDDEN', 403, true, 'Brak uprawnień');
    }

    // 3. Jeśli rola jest poprawna, przechodzimy do następnego middleware lub kontrolera
    SystemLog.info(`[checkRole] Użytkownik ${userId} ma odpowiednią rolę: ${userRole}`);
    next();
  };
};
