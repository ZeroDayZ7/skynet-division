// controllers/auth/loginController.js

import authService from "#services/auth.service.js";
import { generateAuthToken } from "#services/token.service.js";
import SystemLog from "#utils/SystemLog.js";
import { getUnreadNotificationsCount } from "#controllers/users/getUnreadNotificationsCount.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers["x-forwarded-for"] || req.ip; // Używamy req.ip zamiast req.connection.remoteAddress

  try {
    //  if (req.session.userId) {
    //     try {
    //       SystemLog.info(`SESSION is ACTIVE: ${JSON.stringify(req.session, null, 2)}`);
    //       return res.status(200).json({ message: "Jesteś już zalogowany" });
    //     } catch (error) {
    //       return res
    //         .status(500)
    //         .json({ message: "Error retrieving session status." });
    //     }
    //   }

    // 1. Walidacja danych wejściowych
    if (!email || !password) {
      SystemLog.warn("Login attempt with incomplete data", { email });
      return res.status(400).json({
        isAuthenticated: false,
        message: "Uzupełnij poprawnie dane"
      });
    }

    // 2. Weryfikacja użytkownika
    const validationResult = await authService.validateUser(
      email,
      password,
      userIp
    );
    if (validationResult.error) {
      SystemLog.warn("Invalid login attempt", {
        email,
        reason: validationResult.message,
      });
      return res.status(401).json({
        isAuthenticated: false,
        message: validationResult.message,
      });
    }

    // 3. Generowanie tokena JWT
    const token = generateAuthToken({
      id: validationResult.user.id,
      // Jeśli chcesz dodać role, dodaj je do tokenu
    });

    // 6. Zwrócenie liczby nieprzeczytanych powiadomień
    const unreadCount = await getUnreadNotificationsCount(validationResult.user.id);
    // 4. Zapisywanie sesji
    req.session.userId = validationResult.user.id;
    req.session.role = validationResult.user.role;
    req.session.points = validationResult.user.points;
    req.session.notifications = unreadCount;

    req.session.save(async (err) => {
      if (err) {
        SystemLog.error("Session save error", {
          userId: validationResult.user.id,
          error: err.message,
        });
        return res.status(500).json({
          isAuthenticated: false,
        });
      }

      // 5. Ustawienie bezpiecznego ciasteczka
      res.cookie(process.env.ACCESS_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: parseInt(process.env.JWT_EXPIRES_IN_MS || "900000", 10), // 15min domyślnie
      });

      SystemLog.info("User logged in successfully", {
        userId: validationResult.user.id,
        role: validationResult.user.role,
        ip: userIp,
      });
 
      return res.status(200).json({
        isAuthenticated: true,
        user: {
          role: validationResult.user.role,
          points: validationResult.user.points,
          notifications: unreadCount
        },
        token: token

      });
    });
  } catch (error) {
    SystemLog.error("Login process failed", {
      email,
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      isAuthenticated: false,
    });
  }
};
