import UserNotification from "#models/users/UserNotification.js";
import NotificationTemplate from "#models/users/NotificationTemplate.js";
import SystemLog from "#utils/SystemLog.js";

export async function getUserNotifications(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  const { page = 1 } = req.body; // Odbieranie paginacji przez POST
  const limit = 10;
  const offset = (page - 1) * limit;

  SystemLog.info(`Pobieranie powiadomień dla użytkownika ID: ${userId}`);

  try {
    const notifications = await UserNotification.findAll({
      where: { user_id: userId, is_read: 0 },
      limit,
      offset,
      order: [["received_at", "DESC"]],
      include: [
        {
          model: NotificationTemplate,
          as: "template",
          attributes: ["type", "message"],
        },
      ],
      attributes: [] //// Brak pól z UserNotification, tylko powiązane template
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    SystemLog.error("Błąd pobierania powiadomień", { userId, error });
    return res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
}
