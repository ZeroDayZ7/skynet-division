import path from "path";
import fs from "fs/promises"; // Używamy promisowego API FS
import Passport from "#models/users/UserPassportData.js"; // Nowy model paszportu
import UserData from "#models/users/UserData.js"; // Model użytkownika
import SystemLog from "#utils/SystemLog.js";
import { defineAssociations } from "#models/associations.js";

// Definiujemy asocjacje po załadowaniu modeli
defineAssociations();

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), "private_uploads/passports"); // Zmieniona ścieżka do zdjęcia

// Pobieranie danych użytkownika paszportu
export async function getUserPassportData(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  SystemLog.info(`Pobieranie danych paszportu dla użytkownika ID: ${userId}`);

  try {
    // Pobieranie danych paszportu oraz danych użytkownika w jednym zapytaniu
    const userPassport = await Passport.findOne({
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
          attributes: ["first_name", "second_name", "last_name", "pesel", "birth_date", "birth_place"], // Imię, drugie imię, nazwisko
        },
      ],
      raw: true, // Otrzymujemy czysty obiekt
    });

    if (!userPassport) {
      return res.status(404).json({ message: "Dane paszportu nie znalezione" });
    }

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
    SystemLog.info(`PASSPORT: ${JSON.stringify(userPassport, null, 2)}`);

    userPassport.photo = photoBase64;

  

    return res.status(200).json(userPassport);
  } catch (error) {
    SystemLog.error("Błąd pobierania danych paszportu", { userId, error });
    return res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
}
