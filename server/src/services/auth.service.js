import bcrypt from 'bcrypt';
import userService from './user.service.js';
import SystemLog from '#utils/SystemLog.js';

export const validateUser = async (email, password, ip) => {
  const user = await userService.getUserDetailsForValidation(email);

  SystemLog.info('userDetails:', user);

  if (!user || user.userBlock === 1 || user.activation_token !== null) {
    return {
      error: true,
      code: user
        ? user.userBlock
          ? 'LOGIN.USER_BLOCKED'
          : 'LOGIN.ACCOUNT_ACTIVATE_FALSE'
        : 'LOGIN.WRONG_DATA'
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.pass);
  if (!isPasswordValid) {
    return {
      error: true
    };
  }

  // Zoptymalizowana aktualizacja licznika logowań i adresu IP
  await userService.updateLoginDetails(email, ip, user.lastLoginIp);

  // Nie trzeba tworzyć `userWithRole`, ponieważ `user` już zawiera `role`
  SystemLog.warn('USR:', user);

  return {
    error: false,
    user
  };
};

export default { validateUser };
