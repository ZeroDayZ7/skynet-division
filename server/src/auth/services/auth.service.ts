// auth/services/auth.services.ts
import { isIP } from 'is-ip';
import userService from '#ro/auth/services/user.login.service';
import SystemLog from '#ro/utils/SystemLog';
import { createError } from '#ro/errors/errorFactory';
import { ERROR_CODES } from '#ro/errors/errorCodes';
import { UserAttributes } from '#ro/auth/types/UserAttributes';
import { verifyUserPassword } from '#ro/auth/utils/auth.utils';

interface ErrorResult {
  error: true;
  message: string;
  code: string;
  statusCode: number;
  [key: string]: any;
}

interface SuccessResult {
  error: false;
  user: UserAttributes;
}

type ValidationResult = ErrorResult | SuccessResult;

export const validateUser = async (email: string, password: string, ip: string): Promise<ValidationResult> => {
  if (!ip || !isIP(ip)) {
    return createError(ERROR_CODES.INVALID_REQUEST);
  }

  const loginAttempts = await userService.getLoginAttempts(email);
  if (loginAttempts >= 555) {
    await userService.blockUser(email);
    return createError(ERROR_CODES.USER_BLOCKED);
  }

  const user = await userService.getUserDetailsForValidation(email);
  if (!user) {
    await userService.incrementLoginAttempts(email);
    return createError(ERROR_CODES.INVALID_CREDENTIALS);
  }

  if (user.userBlock === true) {
    return createError(ERROR_CODES.USER_BLOCKED);
  }

  if (user.activation_token !== null) {
    return createError(ERROR_CODES.ACCOUNT_NOT_ACTIVE);
  }

  const isPasswordValid = await verifyUserPassword(user.id, password);
  if (!isPasswordValid) {
    await userService.incrementLoginAttempts(email);
    return createError(ERROR_CODES.INVALID_CREDENTIALS);
  }

  await userService.updateAfterLoginSuccess(user.id, ip, user.lastLoginIp ?? '');
  SystemLog.info('Authentication successful');

  return { error: false, user };
};

export default { validateUser };