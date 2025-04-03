import bcrypt from 'bcrypt';
import userService from './user.service.js';
import SystemLog from '#utils/SystemLog.js';

export const validateUser = async (email, password, ip) => {
  const userDetails = await userService.checkUserDetails(email);

  // Debugowanie – sprawdź, co dokładnie zwraca userDetails
  SystemLog.info('userDetails:', userDetails);

  if (!userDetails || userDetails.userBlock === 1 || userDetails.activation_token !== null) {
    return {
      error: true,
      code: userDetails
        ? userDetails.userBlock
          ? 'LOGIN.USER_BLOCKED'
          : 'LOGIN.ACCOUNT_ACTIVATE_FALSE'
        : 'LOGIN.WRONG_DATA'
    };
  }

  const user = await userService.getUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.pass);

  if (!isPasswordValid) {
    return {
      error: true
    };
  }

  if (userDetails.lastLoginIp !== ip) {
    await userService.updateLastLoginIp(email, ip);
  }

  await userService.updateLoginCount(email);

  return {
    error: false,
    user
  };
};

export default { validateUser };