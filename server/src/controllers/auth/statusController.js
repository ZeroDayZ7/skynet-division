import SystemLog from "#utils/SystemLog.js"; // Załóżmy, że masz logger

export const checkSessionStatus = async (req, res) => {
  if (req.session.userId) {
    try {
      SystemLog.info(`SESSION is ACTIVE: ${JSON.stringify(req.session, null, 2)}`);
      return res.status(200).json({
        user: {
          role: req.session.role,
          points: req.session.points,
          notifications: req.session.notifications
        },
        isAuthenticated: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error retrieving session status." });
    }
  } else {
    // 3. Usuń ciasteczka po stronie klienta
    res.clearCookie(process.env.ACCESS_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie(process.env.SESSION_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    SystemLog.info("User logged out and deleted Cookies");

    return res.status(200).json({ isAuthenticated: false });
  }
};
