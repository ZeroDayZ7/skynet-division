import Users from '#ro/auth/models/Users';
import { createError } from '#ro/errors/errorFactory';
import { ERROR_CODES } from '#ro/errors/errorCodes';

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
    throw createError(ERROR_CODES.NOT_FOUND);
  }

  return {
    isPinSet: user.pin !== null,
  };
};

export default { checkPinStatus };