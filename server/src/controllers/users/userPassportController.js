import path from "path";
import fs from "fs/promises"; // Używamy promisowego API FS
import Passport from "#models/users/UserPassportData.js"; // Nowy model paszportu
import UserData from "#models/users/UserData.js"; // Model użytkownika
import SystemLog from "#utils/SystemLog.js";
import { defineAssociations } from "#models/associations.js";

// Definiujemy asocjacje po załadowaniu modeli
defineAssociations();

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), "private_uploads/passports");

export async function getUserPassportData(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  SystemLog.info(`Pobieranie danych paszportu dla użytkownika ID: ${userId}`);

  try {
    // Pobieranie danych BEZ raw: true
    const userPassportInstance = await Passport.findOne({
      where: { user_id: userId },
      attributes: [
        "passport_number",
        "issue_date",
        "expiration_date",
        "country_code",
        "passport_type",
      ],
      include: [
        {
          model: UserData,
          as: "user", // Asocjacja z modelem User
          attributes: ["first_name", "second_name", "last_name", "pesel", "birth_date", "birth_place", "gender", "nationality"],
        },
      ],
      // raw: true, // USUNIĘTE
    });

    if (!userPassportInstance) {
      return res.status(404).json({ message: "Dane paszportu nie znalezione" });
    }

    // Konwersja instancji modelu do zwykłego obiektu JS
    const plainUserPassport = userPassportInstance.get({ plain: true });

    // Pobranie zdjęcia paszportu
    const photoPath = path.join(PHOTO_UPLOAD_DIR, `${userId}.jpg`);
    let photoBase64 = null;

    try {
      await fs.access(photoPath, fs.constants.R_OK);
      const imageBuffer = await fs.readFile(photoPath);
      photoBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    } catch (error) {
      SystemLog.warn(`Zdjęcie paszportu nie znalezione: ${photoPath}`);
    }

    // Dodanie zdjęcia do ZWYKŁEGO obiektu
    plainUserPassport.photo = photoBase64;

    // Logowanie obiektu, który zostanie wysłany
    SystemLog.info(`PASSPORT DATA TO SEND: ${JSON.stringify(plainUserPassport, null, 2)}`);

    // Wysłanie ZWYKŁEGO obiektu w odpowiedzi
    return res.status(200).json(plainUserPassport);

  } catch (error) {
    SystemLog.error("Błąd pobierania danych paszportu", { userId, error });
    return res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
}