import bcrypt from 'bcrypt';
import userService from './user.service.js';
import SystemLog from '#utils/SystemLog.js';

const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_BLOCKED: 'USER_BLOCKED',
  ACCOUNT_NOT_ACTIVE: 'ACCOUNT_NOT_ACTIVE',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
};

const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Nieprawidłowy e-mail lub hasło',
  [ERROR_CODES.USER_BLOCKED]: 'Twoje konto zostało zablokowane.',
  [ERROR_CODES.ACCOUNT_NOT_ACTIVE]: 'Twoje konto nie zostało jeszcze aktywowane.',
  [ERROR_CODES.INVALID_PASSWORD]: 'Podane hasło jest nieprawidłowe.',
};

const createError = (code) => ({
  error: true,
  message: ERROR_MESSAGES[code],
});

export const validateUser = async (email, password, ip) => {
  const user = await userService.getUserDetailsForValidation(email);

  if (!user) return createError(ERROR_CODES.INVALID_CREDENTIALS);
  if (user.userBlock === 1) return createError(ERROR_CODES.USER_BLOCKED);
  if (user.activation_token !== null) return createError(ERROR_CODES.ACCOUNT_NOT_ACTIVE);

  const isPasswordValid = await bcrypt.compare(password, user.pass);
  if (!isPasswordValid) return createError(ERROR_CODES.INVALID_CREDENTIALS);

  await userService.updateLoginDetails(email, ip, user.lastLoginIp);
  SystemLog.info('User logged in successfully:', { email, ip });

  return { error: false, user };
};

export default { validateUser };