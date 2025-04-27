import Users from '#ro/models/Users';
import { generateActivationToken } from '#ro/common/utils/auth.utils';
import AppError from '#ro/common/errors/AppError';
import { hashValue } from '#ro/common/utils/auth.utils';

/**
 * Sprawdza, czy email jest wolny.
 */
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const existingUser = await Users.findOne({ where: { email } });
  return !existingUser;
};

/**
 * Tworzy nowego użytkownika.
 */
export const createUser = async (email: string, password: string): Promise<Users> => {
  const emailFree = await checkEmailAvailability(email);
  
  if (!emailFree) {
    throw new AppError('EMAIL_ALREADY_TAKEN', 409, false, 'Ten e-mail jest już zajęty.');
  }

  const hashedPassword = await hashValue(password);
  const activationToken = generateActivationToken();

  const newUser = await Users.create({
    email,
    pass: hashedPassword,
    points: 0,
    role: 'user',
    userBlock: false,
    loginAttempts: 0,
    login_count: 0,
    activation_token: activationToken
  });

  return newUser;
};
