import path from 'path';
import fs from 'fs/promises';
import Passport from '../../../models/UserPassportData';
import UserData from '#ro/models/UserData';
import SystemLog from '#ro/common/utils/SystemLog.js';

const PHOTO_UPLOAD_DIR = path.join(process.cwd(), 'private_uploads/users');
// ======================================================
// Interfejs dla danych zwracanych przez serwis
// ======================================================
export interface UserPassportDataResponse {
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
export const getUserPassportDataService: (userId: number) => Promise<UserPassportDataResponse | null> = async (userId) => {
try {
  const userPassportInstance = await Passport.findOne({
    where: { user_id: userId },
    attributes: [
      'passport_number',
      'issue_date',
      'expiration_date',
      'country_code',
      'passport_type',
    ],
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
          'nationality',
        ],
        // required: false, 
      },
    ],
  });

  if (!userPassportInstance) {
    SystemLog.warn(`Dane paszportu nie znalezione dla użytkownika ID:`);
    return null;
  }

  const plainUserPassport = userPassportInstance.get({ plain: true}) as unknown as UserPassportDataResponse;
  const photoPath = path.join(PHOTO_UPLOAD_DIR, `${userId}.jpg`);
  let photoBase64: string | null = null;

  try {
    await fs.access(photoPath, fs.constants.R_OK);
    const imageBuffer = await fs.readFile(photoPath);
    photoBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    SystemLog.warn(`Zdjęcie paszportu nie znalezione: ${photoPath}`);
    throw error;
  }

  plainUserPassport.photo = photoBase64;

  SystemLog.info(`Dane paszportu do wysłania`);
  
  return plainUserPassport as UserPassportDataResponse;
} catch (error) {
  SystemLog.error('Błąd pobierania danych passportu user.data.service.ts', {
    userId,
    error,
  });
  throw error; 
}
}



