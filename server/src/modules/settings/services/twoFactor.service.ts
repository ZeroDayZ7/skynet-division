import AppError from '#errors/AppError';
import UserSettings from '../../../models/UserSettings';
/**
 * Włącza lub wyłącza uwierzytelnianie dwuskładnikowe dla użytkownika.
 */
export const setTwoFactorEnabled = async (userId: number, enabled: boolean): Promise<void> => {
  const settings = await UserSettings.findOne({
    where: { user_id: userId },
  });

  if (!settings) {
    throw new AppError('USER_NOT_FOUND', 404);
  }

  settings.two_factor_enabled = enabled;
  await settings.save({ fields: ['two_factor_enabled'] });
};

export default {
  setTwoFactorEnabled,
};
