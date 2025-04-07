import path from "path";
import fs from "fs/promises"; // Używamy promisowego API FS
import UserEIDData from "#models/users/UserEIDData.js";
import UserData from "#models/users/UserData.js";
import SystemLog from "#utils/SystemLog.js";

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), "private_uploads/users");

// Pobieranie danych użytkownika
export async function getUserEIDData(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  SystemLog.info(`Pobieranie danych e-dowodu dla użytkownika ID: ${userId}`);
  
  try {
    const userEIDInstance = await UserEIDData.findOne({
      where: { user_id: userId },
      attributes: [
        "document_number",
        "issue_date",
        "expiration_date",
      ],
      include: [
        {
          model: UserData,
          as: "user", // upewnij się, że alias jest poprawny w associations
          attributes: [
            "first_name",
            "second_name",
            "last_name",
            "pesel",
            "birth_date",
            "birth_place",
            "gender"
          ],
        },
      ],
      // raw: true, // Otrzymujemy czysty obiekt
    });

    if (!userEIDInstance) {
      return res.status(404).json({ message: "Dane nie znalezione" });
    }
    
    const plainUserEID = userEIDInstance.get({ plain: true });

    // Pobranie zdjęcia
    const photoPath = path.join(PHOTO_UPLOAD_DIR, `${userId}.jpg`);
    let photoBase64 = null;

    try {
      await fs.access(photoPath, fs.constants.R_OK);
      const imageBuffer = await fs.readFile(photoPath);
      photoBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    } catch (error) {
      SystemLog.warn(`Zdjęcie nie znalezione: ${photoPath}`);
    }

    plainUserEID.photo = photoBase64;

    return res.status(200).json(plainUserEID);
  } catch (error) {
    SystemLog.error("Błąd pobierania danych e-dowodu", { userId, error });
    return res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
}
