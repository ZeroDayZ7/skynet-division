import { Request, Response, NextFunction } from "express";
import SystemLog from "#utils/SystemLog";

export const logoutController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Sprawdź, czy użytkownik jest zalogowany
    if (!req.session?.userId) {
      SystemLog.warn("Logout attempt without active session");
      res.status(401).json({
        success: false,
        isLoggedIn: false,
      });
      return;
    }

    const userId = req.session.userId;

    // 2. Usuń sesję po stronie serwera
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          SystemLog.error("Error destroying session", {
            userId,
            error: err.message,
            stack: err.stack,
          });
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // 3. Usuń ciasteczka po stronie klienta
    res.clearCookie(process.env.ACCESS_COOKIE_NAME || "accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie(process.env.SESSION_COOKIE_NAME || "sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 4. Logowanie wylogowania
    SystemLog.info("User logged out successfully", { userId });

    // 5. Odpowiedź
    res.status(200).json({
      success: true,
      message: "Wylogowanie przebiegło pomyślnie.",
      isLoggedIn: false,
    });
  } catch (error: any) {
    SystemLog.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Wystąpił błąd serwera",
      isLoggedIn: true,
    });
  }
};
