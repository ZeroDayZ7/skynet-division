import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";
import UserEIDData from "#auth/models/UserEIDData";
import UserData from "#auth/models/UserData";
import SystemLog from "#utils/SystemLog.js";

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), "private_uploads/users");

export async function getUserEIDData(req: Request, res: Response, next: NextFunction) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Brak autoryzacji" });

  try {
    const userEIDInstance = await UserEIDData.findOne({
      where: { user_id: userId },
      attributes: ["document_number", "issue_date", "expiration_date"],
      include: [
        {
          model: UserData,
          as: "user",
          attributes: ["first_name", "second_name", "last_name", "pesel", "birth_date", "birth_place", "gender"],
        },
      ],
    });

    if (!userEIDInstance) {
      return res.status(404).json({ message: "Dane nie znalezione" });
    }

    const plainUserEID = userEIDInstance.get({ plain: true });

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
  } catch (error: unknown) {
    SystemLog.error("Błąd pobierania danych e-dowodu", { userId, error: error instanceof Error ? error.message : "Unknown error" });
    next(error); // Przekazujemy błąd do middleware obsługującego błędy
  }
}