import sequelize from '#ro/auth/config/db.config'; // Import instancji Sequelize
import User from '#ro/auth/models/Users'; // Import modelu User z typem UserAttributes
import { UserAttributes } from '#ro/auth/types/UserAttributes'; 
import { Op } from 'sequelize'; // Przydatne do porównań dat

// Funkcja do pobierania szczegółów użytkownika na potrzeby walidacji
export const getUserDetailsForValidation = async (email: string): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'pass', 'activation_token', 'userBlock', 'points', 'role', 'loginAttempts', 'lastLoginAttempt'],
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

// Funkcja do pobierania liczby prób logowania
export const getLoginAttempts = async (email: string): Promise<number> => {
  const user = await User.findOne({
    where: { email },
    attributes: ['loginAttempts'], // Zakładając, że w bazie danych jest pole `loginAttempts`
  });

  return user ? user.loginAttempts : 0;
};

// Funkcja do zwiększania liczby prób logowania
export const incrementLoginAttempts = async (email: string): Promise<void> => {
  await User.update(
    { loginAttempts: sequelize.literal('loginAttempts + 1'), lastLoginAttempt: sequelize.fn('NOW') },
    { where: { email } }
  );
};

// Funkcja do resetowania liczby prób logowania po udanym logowaniu
export const resetLoginAttempts = async (email: string): Promise<void> => {
  await User.update(
    { loginAttempts: 0, lastLoginAttempt: null },
    { where: { email } }
  );
};

// Funkcja do blokowania użytkownika (np. po osiągnięciu zbyt wielu prób logowania)
export const blockUser = async (email: string): Promise<void> => {
  await User.update(
    { userBlock: true },
    { where: { email } }
  );
};

export default { 
  getUserDetailsForValidation, 
  getUserDetailsById, 
  updateLoginDetails,
  getLoginAttempts, 
  incrementLoginAttempts, 
  resetLoginAttempts, 
  blockUser
};
