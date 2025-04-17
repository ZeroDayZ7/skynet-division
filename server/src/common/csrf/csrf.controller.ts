import { Request, Response, NextFunction } from 'express';
import { generateCsrfToken } from '#ro/common/csrf/csrf.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import { setCSRFCookie } from '#ro/common/utils/cookie.utils';

export const getCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = generateCsrfToken();

    // Zapisz token w sesji
    req.session.csrfToken = token;

    // Ustaw ciasteczko
    setCSRFCookie(res, token);

    // Zwróć token (można go użyć od razu na froncie)
    res.status(200).json({ csrfToken: token });

  } catch (error) {
    SystemLog.error('Błąd podczas wysyłania tokena CSRF', { error });
    next(error);
  }
};
