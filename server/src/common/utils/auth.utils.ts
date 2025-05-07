import bcrypt from 'bcrypt';
import Users from '#ro/models/Users';
import AppError from '#errors/AppError';
import { ERROR_CODES } from '#errors/errorCodes';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);

export const generateActivationToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // losowy 6-cyfrowy kod
};

export const hashValue = async (value: string): Promise<string> => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

export const verifyUserPassword = async (userId: number, password: string): Promise<boolean> => {
  const user = await Users.findByPk(userId, {
    attributes: ['pass'], // Pobieramy tylko hasło
  });

  // console.log(user); // Sprawdź, co zwraca `user`

  if (!user) {
    throw new AppError(ERROR_CODES.NOT_FOUND, 404, true, 'Użytkownik nie istnieje w bazie danych');
  }

  const hashedPassword = user.pass; // Bezpośredni dostęp do atrybutu `pass`
  const isPasswordValid = await bcrypt.compare(password, hashedPassword); // Zwracamy wynik porównania
  return isPasswordValid; // `true` lub `false`
};
