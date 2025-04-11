import sequelize from '#ro/auth/config/db.config'; // Import instancji Sequelize
import User from '#ro/auth/models/Users'; // Import modelu User z typem UserAttributes
import { UserAttributes } from '#ro/auth/types/UserAttributes'; 


// Funkcja do pobierania szczegółów użytkownika na potrzeby walidacji
export const getUserDetailsForValidation = async (email: string): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: { email },
    attributes: [ 'id', 'pass', 'activation_token', 'userBlock', 'points', 'role'], // Pobieramy wszystkie potrzebne atrybuty
  });

  return user ? user.get({ plain: true }) : null;
};

// Funkcja do pobierania szczegółów użytkownika po ID (po validacji)
export const getUserDetailsById = async (userId: number): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: ['points', 'role'], // Pobieramy dane do zwrócenia użytkownikowi
  });

  return user ? user.get({ plain: true }) : null;
};

// Funkcja do aktualizacji szczegółów logowania
export const updateLoginDetails = async (id: number, currentIp: string, lastLoginIp: string): Promise<void> => {
  const updates: { [key: string]: any } = {
    login_count: sequelize.literal('login_count + 1')
  };

  if (currentIp !== lastLoginIp) {
    updates.lastLoginIp = currentIp;
  }

  await User.update(updates, { where: { id } });
};

export default { getUserDetailsForValidation, getUserDetailsById, updateLoginDetails };
