import sequelize from '#auth/config/db'; // Import instancji Sequelize
import User from '#auth/models/Users'; // Import modelu User z typem UserAttributes
import { UserAttributes } from '#auth/types/UserAttributes'; 


// Funkcja do pobierania szczegółów użytkownika na potrzeby walidacji
export const getUserDetailsForValidation = async (email: string): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: { email },
    attributes: ['activation_token', 'userBlock', 'lastLoginIp', 'role', 'pass', 'id', 'points'], // Pobieramy wszystkie potrzebne atrybuty
  });

  return user ? user.get({ plain: true }) : null;
};

// Funkcja do aktualizacji szczegółów logowania
export const updateLoginDetails = async (email: string, currentIp: string, lastLoginIp: string): Promise<void> => {
  const updates: { [key: string]: any } = {
    login_count: sequelize.literal('login_count + 1'),
    login_date: new Date(),
  };

  if (currentIp !== lastLoginIp) {
    updates.lastLoginIp = currentIp;
  }

  await User.update(updates, { where: { email } });
};

export default { getUserDetailsForValidation, updateLoginDetails };
