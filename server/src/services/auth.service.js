import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';
import userService from './user.service.js';

export const validateUser = async (email, password, ip) => {
  const userDetails = await userService.checkUserDetails(email);

  // Debugowanie – sprawdź, co dokładnie zwraca userDetails
  console.log('userDetails:', userDetails);

  if (!userDetails || userDetails.userBlock === 1 || userDetails.activation_token !== null) {
    return {
      error: true,
      messages: 'error',
      isLoggedIn: false,
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
      error: true,
      messages: 'error',
      isLoggedIn: false,
      code: 'LOGIN.WRONG_DATA'
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