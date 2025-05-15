// pin.services.ts
import AppError from '#errors/AppError'; // Importujemy AppError
import UserSettings from '../models/UserSettings';

interface PinStatusResult {
  isPinSet: boolean;
}

/**
 * Funkcja sprawdzająca, czy użytkownik ma ustawiony PIN.
 * Zwraca informację, czy pole PIN nie jest null.
 */
export const checkPinStatus = async (userId: number): Promise<PinStatusResult> => {
  const settings = await UserSettings.findOne({
    where: { user_id: userId },
    attributes: ['pin_hash'],
  });

  if (!settings) {
    throw new AppError('USER_NOT_FOUND', 404);
  }

  return {
    isPinSet: settings.pin_hash !== null,
  };
};

/**
 * Ustawia zakodowany PIN użytkownika.
 */
export const setUserPin = async (userId: number, hashedPin: string): Promise<void> => {
const settings = await UserSettings.findOne({
  where: { user_id: userId },
});

if (settings) {
  settings.pin_hash = hashedPin;
  await settings.save({ fields: ['pin_hash'] });
}

};

export default { checkPinStatus, setUserPin };
