import sequelize from '../config/db.js'; // Import instancji Sequelize
import User from '#models/auth/user.model.js';

export const getUserDetailsForValidation = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['activation_token', 'userBlock', 'lastLoginIp', 'role', 'pass', 'id', 'points'], // Pobieramy wszystkie potrzebne atrybuty
  });
  return user ? user.get({ plain: true }) : null;
};

export const updateLoginDetails = async (email, currentIp, lastLoginIp) => {
  const updates = {
    login_count: sequelize.literal('login_count + 1'),
    login_date: new Date(),
  };

  if (currentIp !== lastLoginIp) {
    updates.lastLoginIp = currentIp;
  }

  await User.update(updates, { where: { email } });
};

export default { getUserDetailsForValidation, updateLoginDetails };