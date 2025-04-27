import Users from '#ro/models/Users';
import AppError from '#ro/common/errors/AppError';

export const activateUser = async (activationToken: string): Promise<void> => {
    const user = await Users.findOne({ where: { activation_token: activationToken } });
  
    if (!user) {
      throw new AppError('INVALID_ACTIVATION_TOKEN', 400, false, 'Nieprawidłowy kod aktywacyjny.');
    }
  
    await user.update({
      activation_token: null,
    });
  };
  