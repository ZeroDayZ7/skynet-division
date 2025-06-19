import Users from '#ro/models/Users';
import { generateActivationToken, hashValue } from '#ro/common/utils/auth.utils';
import AppError from '#ro/common/errors/AppError';
import { v4 as uuidv4 } from 'uuid'; // ✅ Użyj prawdziwego UUID

/**
 * Sprawdza, czy email jest wolny.
 */
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const existingUser = await Users.findOne({ where: { email } });
  return !existingUser;
};

export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  const existingUsername = await Users.findOne({ where: { username } });
  return !existingUsername;
};


/**
 * Tworzy nowego użytkownika z domyślnymi danymi.
 */
export const createUser = async (email: string, password: string): Promise<Users> => {
  // ✅ Sprawdź email
  const emailFree = await checkEmailAvailability(email);
  if (!emailFree) {
    throw new AppError('EMAIL_ALREADY_TAKEN', 409, false, 'Ten e-mail jest już zajęty.');
  }

  // ✅ Hash hasła
  const hashedPassword = await hashValue(password);

  // ✅ Token aktywacyjny
  const activationToken = generateActivationToken();

  // ✅ Tymczasowa nazwa użytkownika
  const tempUsername = `user-${uuidv4().slice(0, 8)}`;

  // ✅ Utwórz użytkownika z domyślnymi danymi
  const newUser = await Users.create({
    email,
    username: tempUsername,
    pass: hashedPassword,
    points: 0,
    role: 'init',
    userBlock: false,
    loginAttempts: 0,
    login_count: 0,
    activation_token: activationToken,
    pin: null,
    documents: null
  });

  return newUser;
};
