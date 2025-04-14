import bcrypt from 'bcrypt';
import Users from '#ro/modules/auth/models/Users';
import AppError, { ErrorType } from '#errors/AppError';
import { ERROR_CODES } from '#errors/errorCodes';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export const hashValue = async (value: string): Promise<string> => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

export const verifyUserPassword = async (userId: number | string, password: string): Promise<boolean> => {
  const user = await Users.findByPk(userId, {
    attributes: ['pass'],
  });

  if (!user) {
    throw new AppError(ERROR_CODES.NOT_FOUND, 404, true, 'Użytkownik nie istnieje w bazie danych', ErrorType.NOT_FOUND);
  }

  const hashedPassword = user.getDataValue('pass');
  return bcrypt.compare(password, hashedPassword);
};
