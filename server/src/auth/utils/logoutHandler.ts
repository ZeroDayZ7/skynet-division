import { Request, Response } from "express";
import { clearAuthCookie, clearCSRFCookie } from "#ro/auth/utils/cookie.utils";
import SystemLog from "#ro/utils/SystemLog";
// import { AppError } from "#ro/errors/errorFactory";

export const handleLogout = (req: Request, res: Response, error: AppError): void => {
  // Czyszczenie ciasteczek
  clearAuthCookie(res);
  clearCSRFCookie(res);

  // Czyszczenie sesji
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        SystemLog.error("Failed to destroy session during logout", {
          error: err.message,
          ip: req.ip,
          path: req.path,
        });
      }
    });
  }

  // Wysłanie odpowiedzi z błędem
  res.status(401).json({
    success: false,
    message: error.message,
  });
};