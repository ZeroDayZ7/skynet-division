// auth/services/auth.services.ts
import userService from '#ro/modules/auth/services/user.service';
import SystemLog from '#ro/common/utils/SystemLog';
import AppError, { ErrorType } from '#errors/AppError';
import { UserAttributes } from '#ro/modules/auth/types/UserAttributes';
import { verifyUserPassword } from '#ro/common/utils/auth.utils';

// Usuń ErrorResult, SuccessResult i ValidationResult - nie są już potrzebne

export const validateUser = async (
  email: string,
  password: string,
  ip: string
): Promise<UserAttributes> => { // Zwracamy bezpośrednio UserAttributes
  const loginAttempts = await userService.getLoginAttempts(email);
  if (loginAttempts >= 555) {
    await userService.blockUser(email);
    throw new AppError('USER_BLOCKED', 403);
  }

  const user = await userService.getUserDetailsForValidation(email);
  if (!user) {
    await userService.incrementLoginAttempts(email);
    throw new AppError('INVALID_CREDENTIALS', 401);
  }

  if (user.userBlock === true) {
    throw new AppError('USER_BLOCKED', 403, false, 'Użytkownik zablokowany');
  }

  if (user.activation_token !== null) {
    throw new AppError('ACCOUNT_NOT_ACTIVE', 400, false, 'Konto nie zostało aktywowane');
  }

  const isPasswordValid = await verifyUserPassword(user.id, password);
  if (!isPasswordValid) {
    await userService.incrementLoginAttempts(email);
    throw new AppError('INVALID_CREDENTIALS', 401);
  }

  await userService.updateAfterLoginSuccess(user.id, ip, user.lastLoginIp ?? '');
  SystemLog.info('Authentication successful');

  return user; // Zwracamy tylko user, bez obiektu { error: false, user }
};

// Eksportujemy obiekt serwisu z funkcjami
const authService = {
  validateUser,
  // inne funkcje serwisu jeśli są...
};

export default authService; // Eksport domyślny jako obiekt