import bcrypt from 'bcrypt';
import userService from '#ro/auth/services/user.service';  // Usuń '.js' z importu, TypeScript obsługuje automatyczne rozpoznawanie plików TS
import SystemLog from '#ro/utils/SystemLog';  // Zmieniłem import na odpowiednią ścieżkę do SystemLog
import { createError } from '#ro/errors/errorFactory'; // Zaimportuj createError z errorFactory.ts
import { ERROR_CODES } from '#ro/errors/errorCodes';

export const validateUser = async (email: string, password: string, ip: string) => {

  const user = await userService.getUserDetailsForValidation(email);
  if (!user) return createError(ERROR_CODES.INVALID_CREDENTIALS);
  if (user.userBlock === true) return createError(ERROR_CODES.USER_BLOCKED);
  if (user.activation_token !== null) return createError(ERROR_CODES.ACCOUNT_NOT_ACTIVE);

  const isPasswordValid = await bcrypt.compare(password, user.pass);
  if (!isPasswordValid) return createError(ERROR_CODES.INVALID_CREDENTIALS);

  await userService.updateLoginDetails(user.id, ip, user.lastLoginIp ?? "");
  SystemLog.info('AUTH.SERVICES.TS');

  // await userService.getUserDetailsById(user.id);

  return { error: false, user };
};

export default { validateUser };
