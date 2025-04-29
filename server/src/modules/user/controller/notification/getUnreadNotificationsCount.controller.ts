import UserNotification from "#ro/models/UserNotification";
import SystemLog from "#ro/common/utils/SystemLog";

// Typowanie funkcji, zakładając, że userId jest stringiem lub numerem
export async function getUnreadNotificationsCount(userId: number): Promise<number> {
  if (!userId) {
    throw new Error("Brak ID użytkownika");
  }

  SystemLog.info(`Pobieranie liczby nieprzeczytanych powiadomień dla użytkownika ID: ${userId}`);

  try {
    // Zliczanie liczby nieprzeczytanych powiadomień
    // is_read = true (czyli 1) → przeczytane
    const unreadCount = await UserNotification.count({
      where: {
        user_id: userId,
        is_read: 0, // Powiadomienia, które nie zostały przeczytane
      },
    });

    return unreadCount;
  } catch (error) {
    SystemLog.error("Błąd pobierania powiadomień", { userId, error });
    throw new Error("Błąd pobierania powiadomień");
  }
}
