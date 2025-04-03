import sequelize from '../config/db.js'; // Import instancji Sequelize
import User from '#models/auth/user.model.js'

export const checkUserDetails = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['activation_token', 'userBlock', 'lastLoginIp'],
  });
  return user ? user.get({ plain: true }) : null;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ['pass', 'id'],
  });
  return user ? user.get({ plain: true }) : null;
};

export const updateLoginCount = async (email) => {
  await User.update(
    { login_count: sequelize.literal('login_count + 1'), login_date: new Date() },
    { where: { email } }
  );
};

export const updateLastLoginIp = async (email, ip) => {
  await User.update({ lastLoginIp: ip }, { where: { email } });
};

export default { checkUserDetails, getUserByEmail, updateLoginCount, updateLastLoginIp };