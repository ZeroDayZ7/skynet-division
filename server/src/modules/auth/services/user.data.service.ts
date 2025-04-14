import path from 'path';
import fs from 'fs/promises';
import UserEIDData from '#ro/modules/auth/models/UserEIDData';
import UserData from '#ro/modules/auth/models/UserData';
import SystemLog from '#ro/common/utils/SystemLog.js';

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), 'private_uploads/users');
// ======================================================
// Interfejs dla danych zwracanych przez serwis
// ======================================================
export interface UserEIDDataResponse {
  document_number: string;
  issue_date: Date;
  expiration_date: Date;
  user: string;
  first_name: string;
  second_name: string;
  last_name: string;
  pesel: string;
  birth_date: Date;
  birth_place: string;
  gender: string;
  photo?: string | null;
} 
// Funkcja pobierająca dane e-dowodu
export const fetchUserEIDData: (userId: number) => Promise<UserEIDDataResponse | null> = async (userId) => {
  try {
    const userEIDInstance = await UserEIDData.findOne({
      where: { user_id: userId },
      attributes: ['document_number', 'issue_date', 'expiration_date'],
      include: [
        {
          model: UserData,
          as: 'user',
          attributes: [
            'first_name',
            'second_name',
            'last_name',
            'pesel',
            'birth_date',
            'birth_place',
            'gender',
          ],
          // required: false,
        },
      ],
    });

    if (!userEIDInstance) {
      SystemLog.warn(`Dane e-dowodu nie znalezione dla użytkownika: ${userId}`);
      return null;
    }

    const plainUserEID = userEIDInstance.get({ plain: true}) as unknown as UserEIDDataResponse;

    const photoPath = path.join(PHOTO_UPLOAD_DIR, `${userId}.jpg`);
    let photoBase64 = null;

    try {
      await fs.access(photoPath, fs.constants.R_OK);
      const imageBuffer = await fs.readFile(photoPath);
      photoBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      SystemLog.warn(`Zdjęcie nie znalezione: ${photoPath}`);
    }

    plainUserEID.photo = photoBase64;
    return plainUserEID as UserEIDDataResponse;
  } catch (error) {
    SystemLog.error('Błąd pobierania danych e-dowodu w serwisie', {
      userId,
      error,
    });
    throw error; // Rzucamy błąd, aby kontroler mógł go obsłużyć
  }
};


