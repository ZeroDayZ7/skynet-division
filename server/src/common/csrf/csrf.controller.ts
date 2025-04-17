import { Request, Response, NextFunction } from 'express';
import { generateCsrfToken } from '#ro/common/csrf/csrf.utils';
import SystemLog from '#ro/common/utils/SystemLog';
import { setCSRFCookie } from '#ro/common/utils/cookie.utils';

export const getCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = generateCsrfToken();
    
    req.session.csrfToken = token;
    setCSRFCookie(res, token);

    res.json({ csrfToken: token }); // Dodano odpowiedź JSON

  } catch (error) {
    SystemLog.error('Błąd podczas wysyłania tokena CSRF', { error });
    next(error);
  }
};
