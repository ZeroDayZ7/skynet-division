// pin.services.ts
import Users from '#ro/modules/auth/models/Users';
import AppError from '#errors/AppError'; // Importujemy AppError
import { ERROR_CODES } from '#errors/errorCodes'; // Importujemy kody błędów

interface PinStatusResult {
  isPinSet: boolean;
}

/**
 * Funkcja sprawdzająca, czy użytkownik ma ustawiony PIN.
 * Zwraca informację, czy pole PIN nie jest null.
 */
export const checkPinStatus = async (userId: number): Promise<PinStatusResult> => {
  const user = await Users.findByPk(userId, {
    attributes: ['pin'],
  });

  if (!user) {
    // Jeżeli użytkownik nie został znaleziony, rzucamy błąd z odpowiednim kodem i wiadomością
    throw new AppError('USER_NOT_FOUND', 404); // Kod błędu 404
  }

  return {
    isPinSet: user.pin !== null, // Jeżeli PIN jest ustawiony, zwróć true
  };
};

/**
 * Ustawia zakodowany PIN użytkownika.
 */
export const setUserPin = async (userId: number, hashedPin: string): Promise<void> => {
  // Jeżeli użytkownik nie istnieje, rzucamy błąd
  const [updated] = await Users.update(
    { pin: hashedPin },
    { where: { id: userId } }
  );

  if (updated === 0) {
    // Jeżeli żaden rekord nie został zaktualizowany (użytkownik nie istnieje), rzucamy błąd
    throw new AppError('USER_NOT_FOUND', 404); // Kod błędu 404
  }
};

export default { checkPinStatus, setUserPin };
