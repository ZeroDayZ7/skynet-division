import sequelize from '../config/db.js'; // Import instancji Sequelize
import { Model, DataTypes } from 'sequelize';

// Definiowanie modelu User
const User = sequelize.define('users', {
  ids: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  lastLoginIp: {
    type: DataTypes.STRING,
  },
  login_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  login_date: {
    type: DataTypes.DATE,
  },
  userBlock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  activation_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users', // Nazwa tabeli w bazie danych
  timestamps: false, // Wyłącz automatyczne createdAt/updatedAt, jeśli nie używasz
});

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
    attributes: ['pass', 'ids'],
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