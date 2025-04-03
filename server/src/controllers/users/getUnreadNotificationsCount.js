import UserNotification from "#models/users/UserNotification.js"; // Ścieżka do modelu
import SystemLog from "#utils/SystemLog.js"; // Ścieżka do loggera

// Funkcja do pobierania liczby nieprzeczytanych powiadomień dla użytkownika
export async function getUnreadNotificationsCount(req, res) {
  const userId = req.user?.id; // Zakładając, że masz dostęp do ID użytkownika z tokenu JWT lub sesji

  if (!userId) {
    return res.status(401).json({ message: "Brak autoryzacji" });
  }

  SystemLog.info(`Pobieranie liczby nieprzeczytanych powiadomień dla użytkownika ID: ${userId}`);

  try {
    // Zliczanie liczby nieprzeczytanych powiadomień
    const unreadCount = await UserNotification.count({
      where: {
        user_id: userId,
        is_read: 0, // Powiadomienia, które nie zostały przeczytane
      },
    });

    return res.status(200).json({ unreadCount });
  } catch (error) {
    SystemLog.error("Błąd pobierania liczby nieprzeczytanych powiadomień", { userId, error });
    return res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
}
