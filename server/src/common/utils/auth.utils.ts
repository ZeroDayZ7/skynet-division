// auth/utils/auth.utils.ts
import bcrypt from 'bcrypt';
import Users from '#ro/modules/auth/models/Users';
import { createError } from '#ro/errors/errorFactory';
import { ERROR_CODES } from '#ro/errors/errorCodes';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export const hashValue = async (value: string): Promise<string> => {
    return bcrypt.hash(value, SALT_ROUNDS);
  };

export const verifyUserPassword = async (userId: number | string, password: string): Promise<boolean> => {
  const user = await Users.findByPk(userId, {
    attributes: ['pass'], // Upewnij się, że 'pass' to dokładna nazwa kolumny w bazie
  });

  if (!user) {
    throw createError(ERROR_CODES.NOT_FOUND, {
        description: 'Użytkownik nie istnieje w bazie danych',
      });
  }

  // Użyj getDataValue, jeśli pole jest chronione lub wymaga jawnego dostępu
  const hashedPassword = user.getDataValue('pass');
  return bcrypt.compare(password, hashedPassword);
};

