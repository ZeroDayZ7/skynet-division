import express from "express";
import SystemLog from "#utils/SystemLog.js"; // Załóżmy, że masz logger
import { i18n } from "#language/i18nSetup.js"; // Załóżmy, że masz i18n

const router = express.Router();

router.post("/logout", async (req, res) => {
  try {
    // 1. Sprawdź, czy użytkownik jest zalogowany
    if (!req.session.userId) {
      SystemLog.warn("Logout attempt without active session");
      return res.status(401).json({
        success: false,
        message: i18n.__("LOGOUT.NO_ACTIVE_SESSION"),
        isLoggedIn: false,
      });
    }
 
    const userId = req.session.userId; // Pobierz ID użytkownika z sesji

    // 2. Usuń sesję po stronie serwera
    req.session.destroy((err) => {
      if (err) {
        SystemLog.error("Error destroying session", {
          userId,
          error: err.message,
          stack: err.stack,
        });
        return res.status(500).json({
          success: false,
          message: "Błąd podczas usuwania sesji.",
          isLoggedIn: true,
        });
      }

      // 3. Usuń ciasteczka po stronie klienta
      res.clearCookie(process.env.ACCESS_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: 'lax',
        // domain: process.env.COOKIE_DOMAIN,
      });

      res.clearCookie(process.env.SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: 'lax',
        // domain: process.env.COOKIE_DOMAIN,
      });

      // 4. Logowanie wylogowania
      SystemLog.info("User logged out successfully", { userId });

      // 5. Odpowiedź
      return res.status(200).json({
        success: true,
        message: "Wylogowanie przebiegło pomyślnie.",
        isLoggedIn: false,
      });
    });
  } catch (error) {
    SystemLog.error("Logout process failed", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      isLoggedIn: true,
    });
  }
});

export default router;
