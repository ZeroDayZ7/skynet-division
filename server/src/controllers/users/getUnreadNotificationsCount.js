import UserNotification from "#models/users/UserNotification.js";
import SystemLog from "#utils/SystemLog.js";

// Funkcja do pobierania liczby nieprzeczytanych powiadomień dla użytkownika
export async function getUnreadNotificationsCount(userId) {
  if (!userId) {
    throw new Error("Brak ID użytkownika");
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

    return unreadCount;
  } catch (error) {
    SystemLog.error("Błąd pobierania liczby nieprzeczytanych powiadomień", { userId, error });
    throw new Error("Błąd pobierania liczby nieprzeczytanych powiadomień");
  }
}
